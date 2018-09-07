# -*- coding: utf-8 -*-

from odoo import models, fields, api
import requests
import json

class Conference(models.Model):
	_name = 'etraining.conference'

	name = fields.Char(string='Name')
	class_id = fields.Many2one('etraining.course_class', string='Course class')
	name = fields.Char(related='class_id.name', string='Conference name', readonly=True)
	room_ref = fields.Char(string='Room reference')
	room_pass = fields.Char(string='Room password')
	status = fields.Selection(
		[('open', 'Open'), ('closed', 'Closed'), ('initial', 'Initial')],default="open")
	member_ids = fields.One2many('etraining.conference_member', 'conference_id', string='Members')

	@api.model
	def create(self, vals):
		cr,uid, context = self.env.args
		if "account" in context:
			account = context["account"]
			room = {'name':vals["name"],'category':'one-to-many'}
			headers = { "Authorization": account.meeting_cloudid}
			r = requests.post(account.api_endpoint+"/api/create", data={"model":"emeeting.room","values":room}, headers=headers)
			resp = json.loads(r.read())
			vals["room_ref"] = room.ref
			vals["room_pass"] = room.password
			conference = super(Conference, self).create(vals)
			return conference

	@api.multi
	def createConferenceMember(self, course_member):
		cr,uid, context = self.env.args
		if "account" in context:
			account = context["account"]
			for conference in self:
				member  = {'name':course_member.name,'avatar':course_member.image, 'email':course_member.email, 'is_supervisor':course_member.role =='teacher' or course_member.role =='supervisor'} 
				headers = { "Authorization": account.meeting_cloudid}
				r = requests.post(account.api_endpoint+"/api/execute", data={"model":"emeeting.room", "method":"add_member","paramList": {"room_ref":self.room_ref, "member":member}})
				resp = json.loads(r.read())
				conf_member  = self.env["etraining.conference_member"].create({'conference_id':self.id, 'course_member_id':course_member.id,'room_member_ref': resp["member"]["ref"]},headers=headers)
				return conf_member


	@api.model
	def open(self, params):
		conferenceId = +params["conferenceId"]
		for conference in self.env["etraining.conference"].browse(conferenceId):
			for member in self.env['etraining.conference_member'].search([('conference_id','=',conferenceId)]):
				member.write({'is_active':True})
			conference.write({'status':'open'})
		return True

	@api.model
	def close(self, params):
		conferenceId = +params["conferenceId"]
		for conference in self.env["etraining.conference"].browse(conferenceId):
			for member in self.env['etraining.conference_member'].search([('conference_id','=',conferenceId)]):
				member.write({'is_active':False})
			conference.write({'status':'closed'})
		return True

class ConferenceMember(models.Model):
	_name = 'etraining.conference_member'

	conference_status = fields.Selection(
		[('open', 'Open'), ('closed', 'Closed')],related="conference_id.status", default="open")
	conference_id = fields.Many2one('etraining.conference', string='Conference')
	course_member_id = fields.Many2one('etraining.course_member', string='Course member')
	class_id = fields.Many2one('etraining.course_class',related="course_member_id.class_id", string='Course class')
	room_member_ref = fields.Char(string='Room member reference')
	is_active = fields.Boolean(string="Is Active",default=True)
	group_id = fields.Many2one('res.groups',related='course_member_id.group_id', string='Training group', readonly=True)
	name = fields.Char(related='course_member_id.name', string='User name', readonly=True)
	group_name = fields.Char(related='group_id.name', string='Group name', readonly=True)
	user_id = fields.Many2one('res.users',related='course_member_id.user_id', string='User ID', readonly=True)

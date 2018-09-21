# -*- coding: utf-8 -*-

from odoo import models, fields, api
import requests
import json
import erppeek

class Conference(models.Model):
	_name = 'etraining.conference'

	name = fields.Char(string='Name')
	class_id = fields.Many2one('etraining.course_class', string='Course class')
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
			meeting_account = context[account["meeting_cloudid"]]
			client = erppeek.Client(meeting_account["db_endpoint"],meeting_account["db"],meeting_account["db_user"],meeting_account["db_pass"])
			room = {'name':vals["name"],'category':'one-to-many'}
			resp = client.execute('emeeting.room','add_room',{"room":room})
			if resp["success"]:
				vals["room_ref"] = resp["room"]["ref"]
				vals["room_pass"] = resp["room"]["password"]
		conference = super(Conference, self).create(vals)
		return conference

	@api.model
	def register_conference_member(self, params):
		cr,uid, context = self.env.args
		if "account" in context:
			account = context["account"]
			meeting_account = context[account["meeting_cloudid"]]
			memberIds = params["memberIds"]
			conferenceId = params["conferenceId"]
			client = erppeek.Client(meeting_account["db_endpoint"],meeting_account["db"],meeting_account["db_user"],meeting_account["db_pass"])
			for course_member in self.env['etraining.course_member'].browse(memberIds):
				for conference in self.env['etraining.conference'].browse(conferenceId):
					member  = {'name':course_member.name,'avatar':course_member.image, 'email':course_member.email, 'is_supervisor':course_member.role =='teacher' or course_member.role =='supervisor'} 
					resp = client.execute('emeeting.room','add_member',{"room_ref":self.room_ref, "member":member})
					if resp["success"]:
						role ='member'
						if course_member.role =='teacher' or course_member.role =='supervisor':
							role = 'supervisor'
						conf_member  = self.env["etraining.conference_member"].create({'conference_id':self.id, 'course_member_id':course_member.id,'room_member_ref': resp["member"]["ref"],'role':role})
						member.write({'conference_member_id':conf_member.id}) 
			return {'success':True}
		return {'success':False, 'message':'Meeting Cloud not defined'}

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
	role = fields.Selection(
		[('member', 'Member'),  ('supervisor', 'Supervisor')])
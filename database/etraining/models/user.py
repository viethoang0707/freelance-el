# -*- coding: utf-8 -*-

from odoo import models, fields, api

class Partner(models.Model):
	_name = 'res.partner'
	_inherit = 'res.partner'

	position = fields.Char( string="Position")
	social_id = fields.Char( string="Social ID")
	dob = fields.Datetime( string="Date of birth")
	gender = fields.Selection(
		[('male', 'Male'), ('female', 'Female'), ('other', 'Other')])


class User(models.Model):
	_name = 'res.users'
	_inherit = 'res.users'

	gender = fields.Selection(related='partner_id.gender')
	social_id = fields.Char(related="partner_id.social_id", string="Social ID")
	is_admin = fields.Boolean(default=False, string="Is admin")
	course_member_ids = fields.One2many('etraining.course_member','user_id', string='Course member')
	group_id = fields.Many2one('res.groups', string='Group')
	group_name = fields.Char(related="group_id.name", string="Group Name")
	group_code = fields.Char(related="group_id.code", string="Code")
	permission_id = fields.Many2one('etraining.permission', string='Permission')
	permission_name = fields.Char(related="permission_id.name", string="Permission Name",readonly=True)
	permission_group_id = fields.Many2one('res.groups', related="permission_id.user_group_id", string="Permission Group",readonly=True)
	name = fields.Char(related="partner_id.name", string="Name")
	email = fields.Char(related="partner_id.email", string="Email")
	phone = fields.Char(related="partner_id.phone", string="Phone")
	position = fields.Char(related="partner_id.position", string="Position")
	dob = fields.Datetime(related="partner_id.dob", string="Date of birth")
	banned = fields.Boolean(default=False, string="Is banned")
	supervisor_id = fields.Many2one('res.users', string='Supervisor')
	supervisor_name = fields.Char(related="supervisor_id.name", string="Supervisor Name",readonly=True)
	achivement_ids = fields.One2many('etraining.achivement', 'user_id', string='Achivements')
	course_member_ids = fields.One2many('etraining.course_member', 'user_id', string='Course members')
	exam_member_ids = fields.One2many('etraining.exam_member', 'user_id', string='Exam members')
	survey_member_ids = fields.One2many('etraining.survey_member', 'user_id', string='Survey members')
	conference_member_ids = fields.One2many('etraining.conference_member', 'user_id', string='Conference members')
	certificate_ids = fields.One2many('etraining.course_certificate', 'user_id', string='Certiicates')
	exam_record_ids = fields.One2many('etraining.exam_record', 'user_id', string='Exam record')
	submission_ids = fields.One2many('etraining.submission', 'user_id', string='Exam submission')
	project_submission_ids = fields.One2many('etraining.project_submission', 'user_id', string='Project submission')
	manage_course_ids = fields.One2many('etraining.course', 'supervisor_id', string='Supervised courses ')
	manage_class_ids = fields.One2many('etraining.course_class', 'supervisor_id', string='Supervised classes ')
	manage_exam_ids = fields.One2many('etraining.exam', 'supervisor_id', string='Supervised exams ')
	manage_survey_ids = fields.One2many('etraining.survey', 'supervisor_id', string='Supervised surveys ')
	review_tickets_ids = fields.One2many('etraining.ticket', 'approve_user_id', string='Pending review tickets')
	submit_ticket_ids = fields.One2many('etraining.ticket', 'submit_user_id', string='Pending submit tickets')

	@api.model
	def create(self, vals):
		vals["login"] = vals["login"].lower()
		user = super(User, self).create(vals)
		return user

class Permission(models.Model):
	_name = 'etraining.permission'

	name = fields.Char( string="Name")
	menu_access = fields.Text( string="Menu access")
	user_ids = fields.One2many('res.users', 'permission_id',string='Users')
	user_group_id = fields.Many2one('res.groups', string='Group')
	user_group_name = fields.Char(related="user_group_id.name", string="Group Name", readonly=True)
	user_count = fields.Integer( compute='_compute_user_count', string='User count')

	def _compute_user_count(self):
		for perm in self:
			perm.user_count =  len(perm.user_ids)

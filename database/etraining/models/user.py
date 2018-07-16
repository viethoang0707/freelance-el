# -*- coding: utf-8 -*-

from odoo import models, fields, api

class Partner(models.Model):
	_name = 'res.partner'
	_inherit = 'res.partner'

	position = fields.Char( string="Position")
	dob = fields.Datetime( string="Date of birth")
	gender = fields.Selection(
		[('male', 'Male'), ('female', 'Female'), ('other', 'Other')])


class User(models.Model):
	_name = 'res.users'
	_inherit = 'res.users'

	gender = fields.Selection(related='partner_id.gender')
	is_admin = fields.Boolean(default=False, string="Is admin")
	course_member_ids = fields.One2many('etraining.course_member','user_id', string='Course member')
	group_id = fields.Many2one('res.groups', string='Group')
	group_code = fields.Char(related="group_id.code", string="Code")
	permission_id = fields.Many2one('etraining.permission', string='Permission')
	name = fields.Char(related="partner_id.name", string="Name")
	email = fields.Char(related="partner_id.email", string="Email")
	phone = fields.Char(related="partner_id.phone", string="Phone")
	position = fields.Char(related="partner_id.position", string="Position")
	dob = fields.Datetime(related="partner_id.dob", string="Date of birth")
	banned = fields.Boolean(default=False, string="Is banned")
	supervisor_id = fields.Many2one('res.users', string='Supervisor')

class Permission(models.Model):
	_name = 'etraining.permission'

	name = fields.Char( string="Name")
	menu_access = fields.Text( string="Menu access")
	user_ids = fields.One2many('res.users', 'permission_id',string='Users')
	user_group_id = fields.Many2one('res.groups', string='Group')


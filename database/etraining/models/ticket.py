# -*- coding: utf-8 -*-

from odoo import models, fields, api

class Ticket(models.Model):
	_name = 'etraining.ticket'

	title = fields.Char(string='Title')
	content = fields.Html(string='Content')
	approve_user_id = fields.Many2one('res.users',string='Approval user')
	submit_user_id = fields.Many2one('res.users',string='Submit user')
	res_model = fields.Char('Resource Model',help="The database object this attachment will be attached to.")
	res_id = fields.Integer('Resource ID', help="The record id this is attached to.")
	status = fields.Selection(
		[('open', 'Open'), ('approved', 'Approved'),  ('pending', 'Pending'),('rejected', 'Rejected')], default="open")
	date_open = fields.Datetime('Open date')
	date_close = fields.Datetime('Close date')
	code = fields.Char(string='Code')

class Notification(models.Model):
	_name = 'etraining.notification'

	title = fields.Char(string='Title')
	target_user_id = fields.Many2one('res.users',string='Target user')
	ticket_id = fields.Many2one('etraining.ticket',string='Ticket')
	date_open = fields.Datetime('Open date')

class Comment(models.Model):
	_name = 'etraining.comment'

	content = fields.Text(string='Content')
	submit_user_id = fields.Many2one('res.users',string='Target user')
	ticket_id = fields.Many2one('etraining.ticket',string='Ticket')
	date_submit = fields.Datetime('Submit date')
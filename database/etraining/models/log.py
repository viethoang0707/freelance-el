# -*- coding: utf-8 -*-

from odoo import models, fields, api

class CourseLog(models.Model):
	_name = 'etraining.course_log'

	res_model = fields.Char('Resource Model',help="The database object this attachment will be attached to.")
	res_id = fields.Integer('Resource ID', help="The record id this is attached to.")
	start = fields.Datetime('Start time')
	note = fields.Text('Note')
	code = fields.Char('Code')
	attachment_id = fields.Many2one('ir.attachment', string="Attachment")
	attachment_url = fields.Char(related="attachment_id.url", string="Attachment URL")
	user_id = fields.Many2one('res.users',related='member_id.user_id', string="Target user")
	member_id = fields.Many2one('etraining.course_member', string="Target member")
	class_id = fields.Many2one('etraining.course_class',related='member_id.class_id', string="Class")
	course_id = fields.Many2one('etraining.course',related='member_id.course_id', string="Course")

class ExamLog(models.Model):
	_name = 'etraining.exam_log'

	res_model = fields.Char('Resource Model',help="The database object this attachment will be attached to.")
	res_id = fields.Integer('Resource ID', help="The record id this is attached to.")
	start = fields.Datetime('Start time')
	note = fields.Text('Note')
	code = fields.Char('Code')
	attachment_id = fields.Many2one('ir.attachment', string="Attachment")
	attachment_url = fields.Char(related="attachment_id.url", string="Attachment URL")
	user_id = fields.Many2one('res.users',related='member_id.user_id', string="Target user")
	member_id = fields.Many2one('etraining.exam_member', string="Target member")
	exam_id = fields.Many2one('etraining.exam',related='member_id.exam_id',string="Exam")


class UserLog(models.Model):
	_name = 'etraining.user_log'

	res_model = fields.Char('Resource Model',help="The database object this attachment will be attached to.")
	res_id = fields.Integer('Resource ID', help="The record id this is attached to.")
	start = fields.Datetime('Start time')
	note = fields.Text('Note')
	code = fields.Char('Code')
	user_id = fields.Many2one('res.users', string="Target user")

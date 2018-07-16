# -*- coding: utf-8 -*-

from odoo import models, fields, api

class Discussion(models.Model):
	_name = 'etraining.discussion'

	start = fields.Datetime(string='Start time')
	name = fields.Char(string='Name', required=True)
	author_id = fields.Many2one('etraining.course_member', string='Owner')
	course_id = fields.Many2one('etraining.course', related="author_id.course_id", string='Course', readonly=True)
	class_id = fields.Many2one('etraining.course_class', related="author_id.class_id", string='Class', readonly=True)
	user_id = fields.Many2one('res.users', related="author_id.user_id", string='User', readonly=True)

class DiscussionPost(models.Model):
	_name = 'etraining.discussion_post'

	start = fields.Datetime(string='Start time')
	name = fields.Char(string='Name', required=True)
	discussion_id = fields.Many2one('etraining.discussion', string='Discussion')
	author_id = fields.Many2one('etraining.course_member', string='Poster')
	




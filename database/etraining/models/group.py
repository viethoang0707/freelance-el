# -*- coding: utf-8 -*-

from odoo import models, fields, api

class OrderGroup(models.Model):
	_name = 'res.groups'
	_inherit = 'res.groups'

	parent_id = fields.Many2one('res.groups', string='Parent group')
	child_ids = fields.One2many('res.groups', 'parent_id', string='Child groups')
	order = fields.Integer(string="Order", default=0)
	code = fields.Char(string="Code")
	category = fields.Selection(
		[('organization', 'Organization'),('competency', 'Competency'),  ('question', 'Question'), ('course', 'Course'),  ('syllabus', 'Syllabus')])

	achivement_ids = fields.One2many('etraining.achivement', 'user_group_id', string='Achivements')
	user_ids = fields.One2many('res.users', 'group_id', string='Users')
	competency_ids = fields.One2many('etraining.competency', 'group_id', string='Competencies')
	question_ids = fields.One2many('etraining.question', 'group_id', string='Questions')
	course_ids = fields.One2many('etraining.course', 'group_id', string='Courses')
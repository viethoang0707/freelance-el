# -*- coding: utf-8 -*-

from odoo import models, fields, api

class Group(models.Model):
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

	user_count = fields.Integer( compute='_compute_user_count', string='User count')
	question_count = fields.Integer( compute='_compute_question_count', string='Question count')
	course_count = fields.Integer( compute='_compute_course_count', string='Course count')
	competency_count = fields.Integer( compute='_compute_competency_count', string='Competency count')

	def _compute_user_count(self):
		for group in self:
			group.user_count =  len(group.user_ids)

	def _compute_question_count(self):
		for group in self:
			group.question_count =  len(group.question_ids)

	def _compute_course_count(self):
		for group in self:
			group.course_count =  len(group.course_ids)

	def _compute_competency_count(self):
		for group in self:
			group.competency_count =  len(group.competency_ids)
# -*- coding: utf-8 -*-

from odoo import models, fields, api

class Competency(models.Model):
	_name = 'etraining.competency'

	group_id = fields.Many2one('res.groups', string='Parent group')
	name = fields.Char(string="Name")
	category = fields.Selection(
		[('score-based', 'Base on score'), ('level-based', 'Base on level ')],default='level-based')
	group_name = fields.Char( related='group_id.name', string='Group name', readonly=True)
	level_ids = fields.One2many('etraining.competency_level', 'competency_id', string='Levels')
	achivement_ids = fields.One2many('etraining.achivement', 'competency_id', string='Achivements')
	level_summary = fields.Text( compute='_compute_level_summary', string='Group name')
	course_ids = fields.One2many('etraining.course', 'competency_id', string='Courses')

	achivement_count = fields.Integer( compute='_compute_achivement_count', string='Achivement count')

	def _compute_achivement_count(self):
		for competency in self:
			competency.achivement_count =  len(competency.achivement_ids)

	def _compute_level_summary(self):
		for competency in self:
			competency.level_summary =  ','.join([level.name for level in competency.level_ids])

class CompetencyLevel(models.Model):
	_name = 'etraining.competency_level'

	competency_id = fields.Many2one('etraining.competency', string='CompetencyLevel level')
	name = fields.Char(string="Code")
	order = fields.Integer(string="Order")
	competency_group_id = fields.Many2one('res.groups', related='competency_id.group_id', string='Group', readonly=True)
	competency_name = fields.Char( related='competency_id.name', string='Competency name', readonly=True)
	competency_group_name = fields.Char( related='competency_id.group_name', string='Group name', readonly=True)

	achivement_ids = fields.One2many('etraining.achivement', 'competency_level_id', string='Achivements')
	achivement_count = fields.Integer( compute='_compute_achivement_count', string='Achivement count')

	def _compute_achivement_count(self):
		for level in self:
			level.achivement_count =  len(level.achivement_ids)

class Achivement(models.Model):
	_name = 'etraining.achivement'

	competency_level_id = fields.Many2one('etraining.competency_level', string='Competency level')
	competency_level_name = fields.Char(related='competency_level_id.name', string='Competency name', readonly=True)
	course_id = fields.Many2one('etraining.course', string='Course')
	exam_id = fields.Many2one('etraining.exam', string='Exam')
	user_id = fields.Many2one('res.users', string='User ID')
	user_group_id = fields.Many2one('res.groups',related='user_id.group_id', string='Group', readonly=True)
	date_acquire = fields.Datetime(string='Acquire date')
	competency_group_id = fields.Many2one('res.groups', related='competency_level_id.competency_group_id', string='Competency', readonly=True)
	competency_group_name = fields.Char(related='competency_group_id.name', string='Group name', readonly=True)
	competency_id = fields.Many2one('etraining.competency', related='competency_level_id.competency_id', string='Competency level', readonly=True)
	competency_name = fields.Char(related='competency_id.name', string='Competency name', readonly=True)
	
	@api.model
	def create(self, vals):
		achivement = super(Achivement, self).create(vals)
		for skill in self.env['etraining.achivement'].search([('competency_id','=',vals["competency_id"]),('user_id','=',vals["user_id"])]):
			if skill.id != achivement.id:
				skill.unlink()
		return achivement
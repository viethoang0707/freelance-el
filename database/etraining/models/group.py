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

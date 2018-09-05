# -*- coding: utf-8 -*-

from odoo import models, fields, api


class Question(models.Model):
	_name = 'etraining.question'

	group_id = fields.Many2one('res.groups', string='Group')
	group_name = fields.Char(related="group_id.name", string="Group Name")
	option_ids = fields.One2many('etraining.option','question_id', string="Options")
	content = fields.Html(string="Content")
	title = fields.Text(string="Title")
	max_rating = fields.Integer(string="Max rating")
	explanation = fields.Text(string="Explanation")
	level = fields.Selection(
		[('easy', 'Easy'), ('medium','Medium'), ('hard','Hard')],default='easy')
	type = fields.Selection(
		[('sc', 'Single-choice'), ('rate', 'Rating'), ('mc','Multi-choice'), ('ext','Open end')], required=True)

	@api.model
	def import_question(self, params):
		questions = params['questions']
		options = params['options']
		for i in range(len(questions)):
			questionVal = questions[i]
			optionsVal = options[i]
			question = super(Question, self).create(questionVal)
			for optionVal in optionsVal:
				option = self.env['etraining.option'].create(optionVal)
				option.write({'question_id': question.id})
		return True

	@api.multi
	def unlink(self, vals):
		for option in self.option_ids:
			option.unlink()
		return super(Question, self).unlink()

class QuestionOption(models.Model):
	_name = 'etraining.option'

	question_id = fields.Many2one('etraining.question', string='Question')
	content = fields.Text(string="Content")
	is_correct = fields.Boolean(string="Is correct", default=False)
from odoo import models, fields, api

class ExamGrade(models.Model):
	_name = 'etraining.exam_grade'

	min_score = fields.Float(string='Min score', default=0.0)
	max_score = fields.Float(string='Max score')
	name = fields.Char(string='Name')
	exam_id = fields.Many2one('etraining.exam', string='Exam')

class ExamSetting(models.Model):
	_name = 'etraining.exam_setting'

	exam_id = fields.Many2one('etraining.exam', string='Exam')
	scale = fields.Float(string='Scale')
	take_picture_on_submit = fields.Boolean(string='Take picture on submit',default=True)
	max_attempt = fields.Integer(string='Max attempt', default=1)
	allow_navigate = fields.Boolean(string='Allow navigate question', default=True)
	allow_review_answer = fields.Boolean(string='Allow review answer', default=True)
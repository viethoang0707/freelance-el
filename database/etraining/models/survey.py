# -*- coding: utf-8 -*-
import datetime
from odoo import models, fields, api
from string import ascii_uppercase, digits
import random

class Survey(models.Model):
	_name = 'etraining.survey'

	supervisor_id = fields.Many2one('res.users', string='Supervisor')
	sheet_id = fields.Many2one('etraining.survey_sheet', string='Survey sheet')
	sheet_status = fields.Selection(related='sheet_id.status', string='Sheet status')
	question_count = fields.Integer(related='sheet_id.question_count', string='Sheet question count', readonly=True)
	supervisor_name = fields.Char(related='supervisor_id.name', string='Author name', readonly=True)
	question_ids = fields.One2many('etraining.survey_question','survey_id', string="Question list")
	start = fields.Datetime(string='Start time')
	end = fields.Datetime(string='End time')
	name = fields.Char(string='Name', required=True)
	summary = fields.Text(string='Summary')
	instruction = fields.Text(string='Instruction')
	is_public = fields.Boolean(string='Is public')
	status = fields.Selection(
		[('open', 'Open'), ('closed', 'Closed'), ('initial', 'Initial')], default="initial")
	review_state = fields.Selection(
		[('initial', 'initial'), ('rejected', 'Rejected'), ('pending' ,'Pending'),  ('approved', 'Approved')], default="initial")
	course_class_id = fields.Many2one('etraining.course_class', string='Course class')
	member_ids = fields.One2many('etraining.survey_member','survey_id', string='Survey members')
	answer_ids = fields.One2many('etraining.survey_answer', 'survey_id', string='Answers')

	@api.multi
	def unlink(self):
		if self.sheet_id:
			self.sheet_id.unlink()
		for member in self.member_ids:
			member.unlink()
		for question in self.question_ids:
			question.unlink()
		for answer in self.answer_ids:
			answer.unlink()
		return super(Survey, self).unlink()

	@api.model
	def create(self, vals):
		survey = super(Survey, self).create(vals)
		sheet = self.env['etraining.survey_sheet'].create({'survey_id':survey.id, 'name': survey.name})
		supervisor = self.env['etraining.survey_member'].create({'survey_id':survey.id, 'user_id': survey.supervisor_id.id,'role':'supervisor'})
		if "course_class_id" in vals:
			for course_member in self.env['etraining.course_member'].search([('user_id','=',survey.supervisor_id.id),('class_id','=',vals["course_class_id"])]):
				supervisor.write({'course_member_id':course_member.id})
		survey.write({"sheet_id": sheet.id})
		return survey

	@api.model
	def open(self, params):
		surveyId = +params["surveyId"]
		for survey in self.env["etraining.survey"].browse(surveyId):
			for candidate in self.env['etraining.survey_member'].search([('survey_id','=',survey.id),('role','=','candidate'),('enroll_status','!=','completed')]):
				token = ''.join(random.choice(ascii_uppercase + digits) for _ in range(24))
				candidate.write({'survey_token': token, 'survey_link':'/lms/survey/study/%s' % token})
				if candidate.email:
						self.env.ref(self._module +"."+ "survey_invite_template").send_mail(candidate.id,force_send=False)
			survey.write({'status':'open'})
		return {'success':True}

	@api.model
	def close(self, params):
		surveyId = +params["surveyId"]
		for survey in self.env["etraining.survey"].browse(surveyId):
			survey.write({'status':'closed'})
		return {'success':True}

	@api.model
	def enroll(self, params):
		surveyId = params["surveyId"]
		userIds = params["userIds"]
		for survey in self.env['etraining.survey'].browse(surveyId):
			for user in self.env['res.users'].browse(userIds):
				survey.registerSurveyMember(user, 'candidate')
		return {'success':True}

	@api.model
	def enroll_supervisor(self, params):
		surveyId = params["surveyId"]
		userIds = params["userIds"]
		for survey in self.env['etraining.survey'].browse(surveyId):
			for user in self.env['res.users'].browse(userIds):
				survey.registerSurveyMember(user, 'supervisor')
		return {'success':True}

	def registerSurveyMember(self, user, role):
		member =  self.env['etraining.survey_member'].create({'survey_id':self.id,'role':role,
			'user_id': user.id, 'status':'active', 'enroll_status':'registered', 'date_register':datetime.datetime.now()})
		if self.course_class_id:
			for course_member in self.env['etraining.course_member'].search([('class_id','=',self.course_class_id.id),('user_id','=',user.id)]):
				member.write({'course_member_id':course_member.id})
		return member



class SurveyQuestion(models.Model):
	_name = 'etraining.survey_question'

	question_id = fields.Many2one('etraining.question',string="Question")
	survey_id = fields.Many2one('etraining.survey', related="sheet_id.survey_id", string='Survey')
	sheet_id = fields.Many2one('etraining.survey_sheet',string="Survey sheet")
	order = fields.Integer(string='Order')
	group_id = fields.Many2one('res.groups', related="question_id.group_id", string='Group', readonly=True)
	group_name = fields.Char(related="group_id.name", string="Group Name")
	option_ids = fields.One2many('etraining.option','question_id', related="question_id.option_ids", string="Options", readonly=True)
	content = fields.Html(string="Content",related="question_id.content", readonly=True)
	title = fields.Text(string="Title",related="question_id.title", readonly=True)
	type = fields.Selection(
		[('sc', 'Single-choice'), ('ext','Open end')],related="question_id.type", readonly=True)

class SurveySheet(models.Model):
	_name = 'etraining.survey_sheet'

	finalized = fields.Boolean(string="Finalized")
	question_ids = fields.One2many('etraining.survey_question',"sheet_id", string='Exam questions')
	survey_id = fields.Many2one('etraining.survey',  string='Survey')
	supervisor_id = fields.Many2one('res.users', related="survey_id.supervisor_id", string='Administrator')
	question_count = fields.Integer( compute='_compute_question_count', string='Question count')
	status = fields.Selection(
		[('draft', 'draft'), ('published', 'Published'),  ('unpublished', 'unpublished')], default="draft")

	def _compute_question_count(self):
		for sheet in self:
			questions = self.env['etraining.survey_question'].search([('sheet_id', '=', sheet.id)])
			sheet.question_count =  len(questions)

	@api.multi
	def unlink(self):
		for question in self.question_ids:
			question.unlink()
		return super(SurveySheet, self).unlink()

class SurveyMember(models.Model):
	_name = 'etraining.survey_member'

	survey_id = fields.Many2one('etraining.survey', string='Survey')
	supervisor_id = fields.Many2one('res.users', related="survey_id.supervisor_id", string='Supervisor')
	user_id = fields.Many2one('res.users', string='User')
	name = fields.Char(related='user_id.name', string='User name', readonly=True)
	login = fields.Char(related='user_id.login', string='User login', readonly=True)
	email = fields.Char(related='user_id.email', string='Email', readonly=True)
	phone = fields.Char(related='user_id.phone', string='Phone', readonly=True)
	group_id = fields.Many2one('res.groups',related='user_id.group_id', readonly=True)
	group_name = fields.Char(related='group_id.name', string='Group name', readonly=True)
	date_register = fields.Datetime('Register date')
	role = fields.Selection(
		[('candidate', 'Candidate'), ('editor', 'Editor'),  ('supervisor', 'Supervisor')])
	enroll_status = fields.Selection(
		[('in-progress', 'In-progress'), ('completed', 'Completed'), ('registered', 'Registered')], default="registered")
	survey_review_state = fields.Selection(related='survey_id.review_state', string='Survey review state', readonly=True)
	course_member_id = fields.Many2one('etraining.course_member', string='Course member')
	survey_link = fields.Text(string="Survey link")
	survey_token = fields.Char(string="Token")
	sheet_id = fields.Many2one('etraining.survey_sheet', related='survey_id.sheet_id', string='Survey sheet', readonly=True)
	submission_id = fields.Many2one('etraining.survey_submission', string='Submission')
	class_id = fields.Many2one('etraining.course_class', related="course_member_id.class_id", string='Class')

	@api.multi
	def unlink(self):
		if self.submission_id:
			self.submission_id.unlink()
		return super(SurveyMember, self).unlink()

	@api.model
	def create(self, vals):
		members = []
		if 'user_id' in vals and vals['user_id']:
			members = self.env['etraining.survey_member'].search([('user_id','=',vals['user_id']),('role','=',vals["role"]),('survey_id','=',vals['survey_id'])])
		if len(members) > 0:
			m =  members[0]
		else:
			m = super(SurveyMember, self).create(vals)
			submission = self.env['etraining.survey_submission'].create({'member_id':m.id})
			m.write({'submission_id':submission.id})
		return m


class SurveyAnswer(models.Model):
	_name = 'etraining.survey_answer'

	question_id = fields.Many2one('etraining.question', string='Question')
	question_type = fields.Selection(
		[('sc', 'Single-choice'), ('ext','Open end')],related="question_id.type", readonly=True)
	option_id = fields.Many2one('etraining.option', string='Option')
	text = fields.Text(string="Text")
	submission_id = fields.Many2one('etraining.survey_submission',string="Submission")
	survey_id = fields.Many2one('etraining.survey', related="submission_id.survey_id", readonly=True,string='Survey')
	json = fields.Text(string="JSON data")

class SurveySubmission(models.Model):
	_name = 'etraining.survey_submission'

	member_id = fields.Many2one('etraining.survey_member', string='Survey member')
	user_id = fields.Many2one('res.users', string='User', related="member_id.user_id", readonly=True)
	survey_id = fields.Many2one('etraining.survey', related="member_id.survey_id", readonly=True,string='Survey')
	answer_ids = fields.One2many('etraining.survey_answer','submission_id', string="Submission")
	start = fields.Datetime(string='Start time')
	end = fields.Datetime(string='End time')

	answer_ids = fields.One2many('etraining.survey_answer', 'submission_id', string='Answers')

	@api.multi
	def unlink(self):
		for answer in self.answer_ids:
			answer.unlink()
		return super(SurveySubmission, self).unlink()
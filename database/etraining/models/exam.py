# -*- coding: utf-8 -*-

from odoo import models, fields, api
import datetime

class Exam(models.Model):
	_name = 'etraining.exam'

	supervisor_id = fields.Many2one('res.users', string='Supervisor')
	supervisor_group_id = fields.Many2one('res.groups',related='supervisor_id.group_id', string='Supervisor Group')
	sheet_id = fields.Many2one('etraining.question_sheet', string='Question sheet')
	sheet_status = fields.Selection(related='sheet_id.status', string='Sheet status')
	question_count = fields.Integer(related='sheet_id.question_count', string='Sheet question count', readonly=True)
	supervisor_name = fields.Char(related='supervisor_id.name', string='Author name', readonly=True)
	question_ids = fields.One2many('etraining.exam_question','exam_id', string="Question list")
	duration = fields.Integer(string='Duration', related='setting_id.duration')	
	start = fields.Datetime(string='Start time')
	end = fields.Datetime(string='End time')
	name = fields.Char(string='Name', required=True)
	summary = fields.Text(string='Summary')
	instruction = fields.Text(string='Instruction')
	exam_mode = fields.Selection(
		[ ('offline', 'Offline'), ('online', 'Online')], default="online")
	status = fields.Selection(
		[('open', 'Open'), ('closed', 'Closed'), ('initial', 'Initial')], default="initial")
	is_public = fields.Boolean(string='Is public')
	is_test = fields.Boolean(string='Is test')
	publish_score = fields.Boolean(string="Publish score", default=False)
	competency_level_id = fields.Many2one('etraining.competency_level', string='Acquired competency level')
	competency_id = fields.Many2one('etraining.competency',related='competency_level_id.competency_id', string="Competency", readonly=True)
	competency_level_name = fields.Char(related='competency_level_id.name', string='Competency level name')
	competency_name = fields.Char(related='competency_id.name', string='Competency name')
	review_state = fields.Selection(
		[('initial', 'initial'), ('rejected', 'Rejected'), ('pending', 'Pending'),  ('approved', 'Approved')], default="initial")
	course_class_id = fields.Many2one('etraining.course_class', string='Course class')
	member_ids = fields.One2many('etraining.exam_member','exam_id', string='Exam members')
	submission_ids = fields.One2many('etraining.submission','exam_id', string='Exam submission')
	answer_ids = fields.One2many('etraining.answer', 'exam_id', string='Answers')
	grade_ids = fields.One2many('etraining.exam_grade', 'exam_id', string='Grades')
	setting_id = fields.Many2one('etraining.exam_setting', string='Exam setting')


	@api.model
	def create(self, vals):
		exam = super(Exam, self).create(vals)
		sheet = self.env['etraining.question_sheet'].create({'exam_id':exam.id, 'name': exam.name})
		setting = self.env['etraining.exam_setting'].create({'exam_id':exam.id})
		supervisor = self.env['etraining.exam_member'].create({'exam_id':exam.id, 'user_id': exam.supervisor_id.id,'role':'supervisor'})
		if "course_class_id" in vals:
			for course_member in self.env['etraining.course_member'].search([('user_id','=',exam.supervisor_id.id),('class_id','=',vals["course_class_id"])]):
				supervisor.write({'course_member_id':course_member.id})
		exam.write({"sheet_id": sheet.id, 'setting_id': setting.id})
		return exam

	@api.multi
	def unlink(self):
		if self.sheet_id:
			self.sheet_id.unlink()
		if self.setting_id:
			self.setting_id.unlink()
		for grade in self.grades:
			grade.unlink()
		for member in self.member_ids:
			member.unlink()
		for submit in self.submission_ids:
			submit.unlink()
		for question in self.question_ids:
			question.unlink()
		for answer in self.answer_ids:
			answer.unlink()
		return super(Exam, self).unlink()

	@api.model
	def enroll(self, params):
		examId = params["examId"]
		userIds = params["userIds"]
		for exam in self.env['etraining.exam'].browse(examId):
			for user in self.env['res.users'].browse(userIds):
				exam.registerExamMember(user,'candidate')
		return {"success":True}

	@api.model
	def enroll_supervisor(self, params):
		examId = params["examId"]
		userIds = params["userIds"]
		for exam in self.env['etraining.exam'].browse(examId):
			for user in self.env['res.users'].browse(userIds):
				exam.registerExamMember(user,'supervisor')
		return {"success":True}

	def registerExamMember(self, user, role):
		member =  self.env['etraining.exam_member'].create({'exam_id':self.id,'role':role,
			'user_id': user.id, 'status':'active', 'enroll_status':'registered', 'date_register':datetime.datetime.now()})
		if self.course_class_id:
			for course_member in self.env['etraining.course_member'].search([('class_id','=',self.course_class_id.id),('user_id','=',user.id)]):
				member.write({'course_member_id':course_member.id})
		if member.email:
				self.env.ref(self._module +"."+ "exam_register_template").send_mail(member.id,force_send=False)
		return member

	@api.multi
	def unlink(self):
		for member in self.env['etraining.exam_member'].search([('exam_id','=',self.id)]):
			member.unlink()
		return super(Exam, self).unlink()


	@api.model
	def open(self, params):
		examId = +params["examId"]
		for exam in self.env["etraining.exam"].browse(examId):
			for candidate in self.env['etraining.exam_member'].search([('exam_id','=',exam.id),('role','=','candidate')]):
				if candidate.enroll_status != 'completed' and candidate.email:
					self.env.ref(self._module +"."+ "exam_open_template").send_mail(candidate.id,force_send=False)
			exam.write({'status':'open'})
		return {"success":True}

	@api.model
	def close(self, params):
		examId = +params["examId"]
		for exam in self.env["etraining.exam"].browse(examId):
			for candidate in self.env['etraining.exam_member'].search([('exam_id','=',exam.id),('role','=','candidate')]):
				if not candidate.exam_record_id:
					candidate.computeExamRecord()
				if candidate.exam_record_id:
					candidate.computeExamRecord()
			exam.write({'status':'closed'})
		return {"success":True}


class ExamMember(models.Model):
	_name = 'etraining.exam_member'

	exam_id = fields.Many2one('etraining.exam', string='Exam')
	sheet_id = fields.Many2one('etraining.question_sheet', related='exam_id.sheet_id', string='Exam sheet', readonly=True)
	submission_id = fields.Many2one('etraining.submission', string='Submission')
	exam_name = fields.Char(related='exam_id.name', string='Exam name', readonly=True)
	exam_mode = fields.Selection(related='exam_id.exam_mode', string='Exam mode', readonly=True)
	user_id = fields.Many2one('res.users', string='User')
	name = fields.Char(related='user_id.name', string='User name', readonly=True)
	login = fields.Char(related='user_id.login', string='User login', readonly=True)
	email = fields.Char(related='user_id.email', string='Email', readonly=True)
	phone = fields.Char(related='user_id.phone', string='Phone', readonly=True)
	group_id = fields.Many2one('res.groups',related='user_id.group_id', readonly=True)
	group_name = fields.Char(related='group_id.name', string='Group name', readonly=True)
	status = fields.Selection(
		[('active', 'Active'), ('withdraw', 'Withdraw'), ('suspend', 'Suspend')], default='active')
	role = fields.Selection(
		[('candidate', 'Candidate'), ('editor', 'Editor'), ('supervisor', 'Supervisor')])
	enroll_status = fields.Selection(
		[('in-progress', 'In-progress'), ('completed', 'Completed'), ('registered', 'Registered')], default="registered")
	date_register = fields.Datetime('Register date')
	exam_review_state = fields.Selection(related='exam_id.review_state', string='Exam review state', readonly=True)
	course_member_id = fields.Many2one('etraining.course_member', string='Course member')
	supervisor_id = fields.Many2one('res.users', related="exam_id.supervisor_id", string='Supervisor')
	exam_record_id = fields.Many2one('etraining.exam_record', string='Exam record')
	score = fields.Float(string="Score",related="exam_record_id.score")
	grade = fields.Char(string="Grade",related="exam_record_id.grade")
	class_id = fields.Many2one('etraining.course_class', related="course_member_id.class_id", readonly=True,string='Exam')
	submission_ids = fields.One2many('etraining.submission','member_id', string='Submission history')

	@api.multi
	def unlink(self):
		if self.exam_record_id:
			self.exam_record_id.unlink()
		if self.submission_id:
			self.submission_id.unlink()
		for submit in self.submission_ids:
			submit.unlink()
		return super(ExamMember, self).unlink()


	@api.model
	def create(self, vals):
		members = []
		if 'user_id' in vals and vals['user_id']:
			members = self.env['etraining.exam_member'].search([('user_id','=',vals['user_id']),('role','=',vals["role"]),('exam_id','=',vals['exam_id'])])
		if len(members) > 0:
			m =  members[0]
		else:
			m = super(ExamMember, self).create(vals)
			submission = self.env['etraining.submission'].create({'member_id':m.id})
			m.write({'submission_id':submission.id})

		return m

	@api.multi
	def computeExamRecord(self):
		grades = self.env["etraining.exam_grade"].search([('exam_id','=',self.exam_id.id)])
		if not self.submission_id:
			exam_record = self.env["etraining.exam_record"].create({'score':0,'grade':'','member_id':self.id})
			self.write({'exam_record_id':exam_record.id})
		else:
			score = 0
			if self.exam_id.exam_mode == 'offline':
				question_ids = set()
				score = self.submission_id.score
			else:
				question_ids = set()
				for answer in self.env['etraining.answer'].search([('submission_id','=',self.submission_id.id)]):
					if answer.question_id and answer.question_id.id not in question_ids:
						score += answer.score
						question_ids.add(answer.question_id.id)
					else:
						answer.unlink()
			grade_name =''
			for grade in grades:
				if grade.max_score >= score and grade.min_score <= score:
					grade_name = grade.name
					break
			exam_record = self.env["etraining.exam_record"].create({'score':score,'grade':grade_name,'member_id':self.id})
			self.submission_id.write({'score':score,'grade':grade_name})
			self.write({'exam_record_id':exam_record.id})
		return True

	@api.model
	def submit_exam(self, params):
		memberId = +params["memberId"]
		for member in self.env["etraining.exam_member"].browse(memberId):
			member.computeExamRecord()
			member.write({'enroll_status':'completed'})
		return {'success':True}

	@api.model
	def submit_answer(self, params):
		answerId = +params["answerId"]
		optionIds = params["optionIds"]
		is_correct = False;
		score = 0
		for answer in self.env['etraining.answer'].browse(answerId):
			if answer.question_type == 'sc':
				if len(optionIds) == 0:
					is_correct = False
					score = 0
				optionId = optionIds[0]
				for option in self.env['etraining.option'].browse(optionId):
					if option.is_correct:
						is_correct = True
						score = answer.exam_question_id.score
			if answer.question_type == 'mc':
				is_correct = True
				for option in answer.question_id.option_ids:
					if option.id not in optionIds:
						is_correct = False
				for optionId in optionIds:
					if optionId not in answer.question_id.option_ids.ids:
						is_correct = False
				answer.write({'is_correct':is_correct,'score':score})
		return {'success':True}

	@api.model
	def redo_exam(self,params):
		memberId = params["memberId"]
		for exam_member in self.env['etraining.exam_member'].browse(memberId):
				if exam_member.submission_id:
					exam_member.submission_id.unlink()
 				submission = self.env['etraining.submission'].create({'member_id':exam_member.id})
				exam_member.write({'submission_id':submission.id,"enroll_status":"registered"})
				return {'success':True}

	@api.model
	def join_exam(self,params):
		memberId = params["memberId"]
		for member in self.env['etraining.exam_member'].browse(memberId):
			if member.enroll_status == 'registered':
				member.write({'enroll_status':'in-progress'})
			return {'success':True}

class QuestionSheetSection(models.Model):
	_name = 'etraining.question_sheet_section'

	name = fields.Char(string="Name")
	sheet_id = fields.Many2one('etraining.question_sheet',string='Sheet')
	exam_id = fields.Many2one('etraining.exam', related='sheet_id.exam_id', string='Exam', readonly=True)
	order = fields.Integer(string="Order")
	question_ids = fields.One2many('etraining.exam_question',"section_id", string='Exam questions')
	
	@api.multi
	def unlink(self):
		for question in self.question_ids:
			question.unlink()
		return super(QuestionSheetSection, self).unlink()

class ExamRecord(models.Model):
	_name = 'etraining.exam_record'

	score = fields.Float(string="Score", default=0)
	grade = fields.Char(string="Grade")
	member_id = fields.Many2one('etraining.exam_member', string='Exam member')
	class_id = fields.Many2one('etraining.course_class', related="member_id.class_id", readonly=True,string='Exam')
	submission_id = fields.Many2one('etraining.submission', related="member_id.submission_id", string='Submissin')
	user_id = fields.Many2one('res.users', string='User', related="member_id.user_id", readonly=True)
	exam_id = fields.Many2one('etraining.exam', related="member_id.exam_id", readonly=True,string='Exam')
	start = fields.Datetime(related="submission_id.start",string='Start submit')
	end = fields.Datetime(related="submission_id.end",string='End submit')
	course_member_id = fields.Many2one('etraining.course_member', related="member_id.course_member_id", readonly=True,string='Course member')


class ExamQuestion(models.Model):
	_name = 'etraining.exam_question'

	question_id = fields.Many2one('etraining.question',string="Question")
	exam_id = fields.Many2one('etraining.exam', related="sheet_id.exam_id", string='Exam')
	sheet_id = fields.Many2one('etraining.question_sheet',string="Question sheet")
	section_id = fields.Many2one('etraining.question_sheet_section',string="Section")
	section_name = fields.Char(related="section_id.name", string="Section Name")
	section_order = fields.Integer(related="section_id.order", string="Section Order")
	score = fields.Float(string='Score')
	sheet_layout = fields.Selection(related="sheet_id.layout", string="Sheet layout")
	order = fields.Integer(string='Order')
	group_id = fields.Many2one('res.groups', related="question_id.group_id", string='Group', readonly=True)
	group_name = fields.Char(related="group_id.name", string="Group Name")
	option_ids = fields.One2many('etraining.option','question_id', related="question_id.option_ids", string="Options", readonly=True)
	content = fields.Text(string="Content",related="question_id.content", readonly=True)
	title = fields.Text(string="Title",related="question_id.title", readonly=True)
	explanation = fields.Text(string="Explanation",related="question_id.explanation", readonly=True)
	level = fields.Selection(string="Level",related="question_id.level", readonly=True)
	type = fields.Selection(
		[('sc', 'Single-choice'), ('ext','Open end')],related="question_id.type", readonly=True)

class QuestionSheet(models.Model):
	_name = 'etraining.question_sheet'

	seed = fields.Integer(string="Seed")
	name = fields.Char(string="Name")
	finalized = fields.Boolean(string="Finalized")
	exam_id = fields.Many2one('etraining.exam',string="Exam")
	question_ids = fields.One2many('etraining.exam_question',"sheet_id", string='Exam questions')
	section_ids = fields.One2many('etraining.question_sheet_section',"sheet_id", string='Exam sections')
	supervisor_id = fields.Many2one('res.users', related="exam_id.supervisor_id", string='Administrator')
	question_count = fields.Integer( compute='_compute_question_count', string='Question count')
	status = fields.Selection(
		[('draft', 'draft'), ('published', 'Published'),  ('unpublished', 'unpublished')], default="published")
	layout = fields.Selection(
		[('single', 'Single-section'), ('multiple', 'Multiple-section')], default="single")

	@api.model
	def replicate(self,params):
		sheetId = +params["sheetId"]
		name = params["name"]
		for sheet in self.env['etraining.question_sheet'].browse(sheetId):
			clone_sheet = self.env['etraining.question_sheet'].create({'seed':sheet.seed, 'name':name, 'layout':sheet.layout})
			section_map = {}
			for section_id in sheet.section_ids:
				clone_section = self.env['etraining.question_sheet_section'].create({'order':section_id.order, 'name':section_id.name, 'sheet_id':clone_sheet.id})
				section_map[section_id.id] = clone_section.id
			for question_id in sheet.question_ids:
				if question_id.section_id:
					section = section_map[question_id.section_id.id]
				else:
					section = None
				clone_question = self.env['etraining.exam_question'].create({'question_id':question_id.question_id.id, 'sheet_id':clone_sheet.id, 'section_id':section,
					'score':question_id.score,'order':question_id.order})
		return True

	def _compute_question_count(self):
		for sheet in self:
			questions = self.env['etraining.exam_question'].search(
				[('sheet_id', '=', sheet.id)])
			sheet.question_count =  len(questions)

	@api.multi
	def unlink(self):
		for question in self.question_ids:
			question.unlink()
		return super(QuestionSheet, self).unlink()


class Answer(models.Model):
	_name = 'etraining.answer'

	question_id = fields.Many2one('etraining.question', string='Question')
	question_level = fields.Selection(string="Level",related="question_id.level", readonly=True)
	question_type = fields.Selection(
		[('sc', 'Single-choice'), ('ext','Open end')],related="question_id.type", readonly=True)
	is_correct = fields.Boolean(default=False, string="Is correct")
	option_id = fields.Many2one('etraining.option', string='Option')
	text = fields.Text(string="Text")
	score = fields.Float(string="Score")
	submission_id = fields.Many2one('etraining.submission',string="Submission")
	exam_id = fields.Many2one('etraining.exam', related="submission_id.exam_id", readonly=True,string='Exam')
	json = fields.Text(string="JSON data")
	exam_question_id = fields.Many2one('etraining.exam_question', string='Exam question')
	section_id = fields.Many2one('etraining.question_sheet_section',string="Section",related="exam_question_id.section_id", readonly=True)
	section_name = fields.Char(related="section_id.name", string="Section Name", readonly=True)

class Submission(models.Model):
	_name = 'etraining.submission'

	score = fields.Float(string="Score", default=0)
	grade = fields.Char(string="Grade")
	member_id = fields.Many2one('etraining.exam_member', string='Exam member')
	user_id = fields.Many2one('res.users', string='User', related="member_id.user_id", readonly=True)
	exam_id = fields.Many2one('etraining.exam', related="member_id.exam_id", readonly=True,string='Exam')
	exam_mode = fields.Selection(related='exam_id.exam_mode', string='Exam mode', readonly=True)
	answer_ids = fields.One2many('etraining.answer','submission_id', string="Submission")
	start = fields.Datetime(string='Start time')
	end = fields.Datetime(string='End time')
	picture = fields.Binary(string='Picture')
	study_time = fields.Integer( compute='_compute_study_time', string='Study time')
	filename = fields.Text(string='Filename')
	file_url = fields.Text(string='Entry file')
	submission_file_id = fields.Many2one('ir.attachment', string='Submission file')
	submit_user_id = fields.Many2one('res.users', string='Submit user in case of offline exam')

	@api.multi
	def unlink(self):
		for answer in self.answer_ids:
			answer.unlink()
		return super(Submission, self).unlink()


	def _compute_study_time(self):
		for submit in self:
			if submit.start and submit.end:
				start = datetime.datetime.strptime(submit.start, "%Y-%m-%d %H:%M:%S")
				end = datetime.datetime.strptime(submit.end, "%Y-%m-%d %H:%M:%S")
				elaspe = end - start
				submit.study_time =  elaspe.total_seconds()
			else:
				submit.study_time = 0


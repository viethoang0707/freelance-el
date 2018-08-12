# -*- coding: utf-8 -*-

from odoo import models, fields, api
import datetime

class Course(models.Model):
	_name = 'etraining.course'

	supervisor_id = fields.Many2one('res.users', string='Supervisor')
	supervisor_group_id = fields.Many2one('res.groups',related='supervisor_id.group_id', string='Supervisor Group')
	supervisor_name = fields.Char(related='supervisor_id.name', string='Supervisor name', readonly=True)
	name = fields.Char(string='Name', required=True)
	summary = fields.Text(string='Summary')
	description = fields.Text(string='Description')
	code = fields.Char(string='Code')
	status = fields.Selection(
		[('open', 'Open'), ('closed', 'Closed'), ('initial', 'Initial')], default="initial")
	mode = fields.Selection(
		[('self-study', 'Self-study'), ('group', 'Group')], default="self-study")
	review_state = fields.Selection(
		[('initial', 'initial'), ('rejected', 'Rejected'), ('pending','Pending'), ('approved', 'Approved')], default="initial")
	logo = fields.Binary(string='Logo')
	group_id = fields.Many2one('res.groups', string='Group')
	group_name = fields.Char(related='group_id.name', string='Group name', readonly=True)
	faq_ids = fields.One2many('etraining.course_faq','course_id', string='FAQ list')
	material_ids = fields.One2many('etraining.course_material','course_id', string='Material list')
	unit_ids = fields.One2many('etraining.course_unit','course_id', string='Unit list')
	competency_level_id = fields.Many2one('etraining.competency_level', string='Acquired competency level')
	competency_id = fields.Many2one('etraining.competency',related='competency_level_id.competency_id', string="Competency", readonly=True)
	competency_level_name = fields.Char(related='competency_level_id.name', string='Competency level name')
	competency_name = fields.Char(related='competency_id.name', string='Competency name')
	competency_group_id = fields.Many2one('res.groups', related='competency_id.group_id', string='Group', readonly=True)
	competency_group_name = fields.Char( related='competency_id.group_name', string='Group name', readonly=True)
	prequisite_course_id = fields.Many2one('etraining.course', string='Course name')
	prequisite_course_name = fields.Char( related='prequisite_course_id.name', string='Preqiosite course name', readonly=True)
	syllabus_id = fields.Many2one('etraining.syllabus', string='Syllabus')
	syllabus_status = fields.Selection( related='syllabus_id.status', string='Syllabus status', readonly=True)
	complete_unit_by_order = fields.Boolean( related='syllabus_id.complete_unit_by_order', string='Complete unit by order')
	unit_count = fields.Integer(related='syllabus_id.unit_count', string='Course unit count', readonly=True)
	member_ids = fields.One2many('etraining.course_member','course_id', string='Course members')
	class_ids = fields.One2many('etraining.course_class','course_id', string='Course classes')

	@api.model
	def create(self, vals):
		course = super(Course, self).create(vals)
		syllabus = self.env['etraining.syllabus'].create({'course_id':course.id, 'name': course.name})
		self.env['etraining.course_member'].create({'course_id':course.id, 'user_id': course.supervisor_id.id,'role':'supervisor'})
		course.write({'syllabus_id': syllabus.id})
		return course

	@api.multi
	def unlink(self):
		for clazz in self.class_ids:
			clazz.unlink()
		for member in self.member_ids:
			member.unlink()
		if self.syllabus_id:
			self.syllabus_id.unlink()
		for material in self.material_ids:
			material.unlink()
		for unit in self.unit_ids:
			unit.unlink()
		for faq in self.faq_ids:
			faq.unlink()
		return super(Course, self).unlink()

	@api.model
	def enroll(self, params):
		successList = []
		failList = []
		courseId = params["courseId"]
		userIds = params["userIds"]
		for course in self.env['etraining.course'].browse(courseId):
			if course.prequisite_course_id:
				for user in self.env['res.users'].browse(userIds):
					fail = True
					for member in user.course_member_ids:
						if member.course_id.id == course.prequisite_course_id.id and member.enroll_status =='completed':
							fail = False
							break
					if fail:
						failList.append(user.id)
					else:
						successList.append(user.id)
			else:
				successList =  userIds
			for user in self.env['res.users'].browse(successList):
				course.registerCourseMember(user,'student')
			return {'success':True,'successIds':successList, 'failIds':failList}

	@api.model
	def enroll_staff(self, params):
		courseId = params["courseId"]
		userIds = params["userIds"]
		for course in self.env['etraining.course'].browse(courseId):
			for user in self.env['res.users'].browse(userIds):
				course.registerCourseMember(user, 'teacher')
			return {'success':True,'successIds':userIds, 'failIds':[]}

	@api.model
	def open(self, params):
		courseId = params["courseId"]
		for course in self.env["etraining.course"].browse(courseId):
			if course.mode =='group':
				for teacher in self.env['etraining.course_member'].search([('course_id','=',courseId),('role','=','teacher'),('class_id','=',None)]):
					if teacher.class_id.status =='open' and teacher.email:
						self.env.ref(self._module +"."+ "course_open_template").send_mail(teacher.id,force_send=False)
			elif course.mode == 'self-study':	
				for student in self.env['etraining.course_member'].search([('course_id','=',courseId),('role','=','student')]):
					if student.enroll_status != 'completed' and student.email:
						self.env.ref(self._module +"."+ "course_open_template").send_mail(student.id,force_send=False)
			course.write({'status':'open'})
			return {'success':True}

	@api.model
	def close(self, params):
		courseId = params["courseId"]
		for course in self.env["etraining.course"].browse(courseId):
			if course.mode =='group':
				for teacher in self.env['etraining.course_member'].search([('course_id','=',courseId),('role','=','teacher'),('class_id','=',None)]):
					if teacher.class_id.status =='open' and teacher.email:
						self.env.ref(self._module +"."+ "course_close_template").send_mail(teacher.id,force_send=False)
			elif course.mode == 'self-study':	
				for student in self.env['etraining.course_member'].search([('course_id','=',courseId),('role','=','student')]):
					if student.enroll_status != 'completed' and student.email:
						self.env.ref(self._module +"."+ "course_close_template").send_mail(student.id,force_send=False)
			course.write({'status':'closed'})
			return {'success':True}


	def registerCourseMember(self, user, role):
		member =  self.env['etraining.course_member'].create({'role':role,
			'course_id':self.id, 'user_id': user.id, 'status':'active', 
			'enroll_status':'registered', 'date_register':datetime.datetime.now()})
		if member.email:
			self.env.ref(self._module +"."+ "course_register_template").send_mail(member.id,force_send=False)
		return member


class CourseSyllabus(models.Model):
	_name = 'etraining.syllabus'

	complete_unit_by_order = fields.Boolean(name="Complete unit by order", default=False)
	course_id = fields.Many2one('etraining.course', string='Course')
	supervisor_id = fields.Many2one('res.users', related="course_id.supervisor_id", string='Administrator')
	supervisor_name = fields.Char(related='course_id.supervisor_name', string='Supervisor name', readonly=True)
	unit_ids = fields.One2many('etraining.course_unit','syllabus_id', string='Course units')
	member_ids = fields.One2many('etraining.course_member','syllabus_id', string='Course members')
	name = fields.Char(string='Name')
	status = fields.Selection(
		[('draft', 'draft'), ('published', 'Published'),  ('unpublished', 'unpublished')], default="published")
	unit_count = fields.Integer( compute='_compute_unit_count', string='Unit count')

	def _compute_unit_count(self):
		for syllabus in self:
			units = self.env['etraining.course_unit'].search([('syllabus_id', '=', syllabus.id),('type','!=','folder')])
			syllabus.unit_count =  len(units)

class CourseUnit(models.Model):
	_name = 'etraining.course_unit'

	supervisor_id = fields.Many2one('res.users', related="syllabus_id.supervisor_id", string='Administrator')
	parent_id = fields.Many2one('etraining.course_unit', string='Parent')
	order = fields.Integer(string='Order', default=0)
	syllabus_id = fields.Many2one('etraining.syllabus', string='Syllabus')
	course_id = fields.Many2one('etraining.course',related='syllabus_id.course_id', string='Course', readonly=True)
	name = fields.Char(string='Name', required=True)
	icon = fields.Char(name="Icon")
	status = fields.Selection(
		[('draft', 'draft'), ('published', 'Published'),  ('unpublished', 'unpublished')], default="published")
	type = fields.Selection(
		[('folder', 'Folder'), ('html', 'HTML'),('self-assess', 'Self-assessment'), ('slide', 'Slide'), ('scorm', 'SCORM'),('exercise', 'Exercise'), ('video', 'Video')])
	slide_lecture_id = fields.Many2one('etraining.slide_lecture', string='Slide lecture')
	html_lecture_id = fields.Many2one('etraining.html_lecture', string='HTML lecture')
	video_lecture_id = fields.Many2one('etraining.video_lecture', string='Video lecture')
	scorm_lecture_id = fields.Many2one('etraining.scorm_lecture', string='SCORM lecture')
	self_assessment_id = fields.Many2one('etraining.self_assessment', string='Self-assessment')
	exercise_id = fields.Many2one('etraining.exercise', string='Exercise')

	@api.model
	def create(self, vals):
		unit = super(CourseUnit, self).create(vals)
		if unit.type == 'html':
			html_lecture = self.env['etraining.html_lecture'].create({'unit_id': unit.id})
			unit.write({'html_lecture_id': html_lecture.id})
		if unit.type == 'slide':
			slide_lecture = self.env['etraining.slide_lecture'].create({'unit_id': unit.id})
			unit.write({'slide_lecture_id': slide_lecture.id})
		if unit.type == 'video':
			video_lecture = self.env['etraining.video_lecture'].create({'unit_id': unit.id})
			unit.write({'video_lecture_id': video_lecture.id})
		if unit.type == 'scorm':
			scorm_lecture = self.env['etraining.scorm_lecture'].create({'unit_id': unit.id})
			unit.write({'scorm_lecture_id': scorm_lecture.id})
		if unit.type == 'self-assess':
			exam = self.env['etraining.exam'].create({'name':vals["name"],"is_public":False,"is_test":True,"status":"open","review_state":"approved","supervisor_id":unit.supervisor_id.id})
			self_assess = self.env['etraining.self_assessment'].create({'unit_id': unit.id ,'exam_id':exam.id})
			unit.write({'self_assessment_id': self_assess.id})
		if unit.type == 'exercise':
			sheet = self.env['etraining.question_sheet'].create({'name':vals["name"]})
			exercise = self.env['etraining.exercise'].create({'unit_id': unit.id ,'sheet_id':sheet.id})
			unit.write({'exercise_id': exercise.id})
		return unit

	@api.multi
	def write(self, vals):
		unit =  super(CourseUnit, self).write(vals)  
		if self.self_assessment_id and self.self_assessment_id.exam_id:
			self.self_assessment_id.exam_id.write({'name':self.name})
		return unit

	@api.multi
	def unlink(self):
		if self.slide_lecture_id:
			self.slide_lecture_id.unlink()
		if self.html_lecture_id:
			self.html_lecture_id.unlink()
		if self.video_lecture_id:
			self.video_lecture_id.unlink()
		if self.scorm_lecture_id:
			self.scorm_lecture_id.unlink()
		return super(CourseUnit, self).unlink()

class SlideLecture(models.Model):
	_name = 'etraining.slide_lecture'

	slide_url = fields.Char(string='Slide URL',related='slide_file_id.url')
	slide_file_id = fields.Many2one('ir.attachment', string='Slide file')
	filename = fields.Text(string='Filename')
	unit_id = fields.Many2one('etraining.course_unit', string='Course unit')
	course_id = fields.Many2one('etraining.course',related='unit_id.course_id', string='Course', readonly=True)
	
	@api.multi
	def write(self, vals):
		if self.slide_file_id and "slide_file_id" in vals and self.slide_file_id.id != vals["slide_file_id"]:
			self.slide_file_id.unlink()
		return super(SlideLecture, self).write(vals)

	@api.multi
	def unlink(self):
		if self.slide_file_id:
			self.slide_file_id.unlink()
		return super(SlideLecture, self).unlink()

class HtmlLecture(models.Model):
	_name = 'etraining.html_lecture'

	content = fields.Text(string='Content')
	unit_id = fields.Many2one('etraining.course_unit', string='Course unit')
	course_id = fields.Many2one('etraining.course',related='unit_id.course_id', string='Course', readonly=True)

class VideoLecture(models.Model):
	_name = 'etraining.video_lecture'

	transcript = fields.Text(string='Transcript')
	video_url = fields.Char(string='Video URL', related='attachment_id.url', stored=True)
	attachment_id = fields.Many2one('ir.attachment', string='Attachment')
	unit_id = fields.Many2one('etraining.course_unit', string='Course unit')
	length = fields.Integer(string='Length in minutes')
	course_id = fields.Many2one('etraining.course',related='unit_id.course_id', string='Course', readonly=True)

	@api.multi
	def write(self, vals):
		if self.attachment_id and "attachment_id" in vals and self.attachment_id.id != vals["attachment_id"]:
			self.attachment_id.unlink()
		return super(VideoLecture, self).write(vals)

	@api.multi
	def unlink(self):
		if self.attachment_id:
			self.attachment_id.unlink()
		return super(VideoLecture, self).unlink()

class SelfAssessment(models.Model):
	_name = 'etraining.self_assessment'

	exam_id = fields.Many2one('etraining.exam', string='Exam')
	sheet_id = fields.Many2one('etraining.question_sheet', string='Question sheet', related="exam_id.sheet_id")
	unit_id = fields.Many2one('etraining.course_unit', string='Course unit')
	course_id = fields.Many2one('etraining.course',related='unit_id.course_id', string='Course', readonly=True)


class Exerise(models.Model):
	_name = 'etraining.exercise'

	sheet_id = fields.Many2one('etraining.question_sheet', string='Question sheet')
	unit_id = fields.Many2one('etraining.course_unit', string='Course unit')
	course_id = fields.Many2one('etraining.course',related='unit_id.course_id', string='Course', readonly=True)


class SCORMLecture(models.Model):
	_name = 'etraining.scorm_lecture'

	base_url = fields.Char(string='Base URL')
	entry_file = fields.Text(string='Entry file')
	package_url = fields.Char(string='Package URL',related='package_file_id.url')
	package_file_id = fields.Many2one('ir.attachment', string='Package file')
	unit_id = fields.Many2one('etraining.course_unit', string='Course unit')
	course_id = fields.Many2one('etraining.course',related='unit_id.course_id', string='Course', readonly=True)

	@api.multi
	def write(self, vals):
		if self.package_file_id and "package_file_id" in vals and self.package_file_id.id != vals["package_file_id"]:
			self.package_file_id.unlink()
		return super(SCORMLecture, self).write(vals)

	@api.multi
	def unlink(self):
		if self.package_file_id:
			self.package_file_id.unlink()
		return super(SCORMLecture, self).unlink()
		
class Project(models.Model):
	_name = 'etraining.project'

	name = fields.Char(string='Name')
	filename = fields.Text(string='Filename')
	file_url = fields.Text(string='Entry file')
	project_file_id = fields.Many2one('ir.attachment', string='Project file')
	content = fields.Text(string='Project content')
	class_id = fields.Many2one('etraining.course_class', string='Class')
	course_id = fields.Many2one('etraining.course', string='Course')
	start = fields.Datetime(string='Start time')
	end = fields.Datetime(string='End time')
	submission_ids = fields.One2many('etraining.project_submission','project_id', string='Project Submission members')
	status = fields.Selection(
		[('draft', 'Draft'), ('open', 'Open'), ('closed', 'Closed')], default="published")

	@api.multi
	def write(self, vals):
		if self.project_file_id and "project_file_id" in vals and self.project_file_id.id != vals["project_file_id"]:
			self.project_file_id.unlink()
		return super(Project, self).write(vals)

	@api.multi
	def unlink(self):
		if self.project_file_id:
			self.project_file_id.unlink()
		for submit in self.submission_ids:
			submit.unlink()
		return super(Project, self).unlink()

class ProjectSubmission(models.Model):
	_name = 'etraining.project_submission'

	score = fields.Integer(string='Score')
	member_id = fields.Many2one('etraining.course_member', string='Course member')
	user_id = fields.Many2one('res.users', string='User', related="member_id.user_id", readonly=True)
	project_id = fields.Many2one('etraining.project',string='Project')
	filename = fields.Text(string='Filename')
	file_url = fields.Text(string='Entry file')
	submission_file_id = fields.Many2one('ir.attachment', string='Submission file')
	course_id = fields.Many2one('etraining.course', related="member_id.course_id", readonly=True,string='Course')
	class_id = fields.Many2one('etraining.course_class', related="member_id.class_id", readonly=True,string='Class')
	date_submit = fields.Datetime(string='Date submit')
	start = fields.Datetime(string='Start time', related="project_id.start")
	end = fields.Datetime(string='End time',related="project_id.end")

	@api.multi
	def write(self, vals):
		if self.submission_file_id and "submission_file_id" in vals and self.submission_file_id.id != vals["submission_file_id"]:
			self.submission_file_id.unlink()
		return super(ProjectSubmission, self).write(vals)
		
	@api.multi
	def unlink(self):
		if self.submission_file_id:
			self.submission_file_id.unlink()
		return super(ProjectSubmission, self).unlink()

class CourseClass(models.Model):
	_name = 'etraining.course_class'

	start = fields.Datetime(string='Start time')
	end = fields.Datetime(string='End time')
	conference_id = fields.Many2one('etraining.conference', string='Conference')
	course_id = fields.Many2one('etraining.course', string='Course')
	supervisor_id = fields.Many2one('res.users', related="course_id.supervisor_id", string='Administrator')
	course_name = fields.Char(related='course_id.name', string='Course name', readonly=True)
	member_ids = fields.One2many('etraining.course_member','class_id', string='Course members')
	name = fields.Char(string='Name', required=True)
	status = fields.Selection(
		[('open', 'Open'), ('closed', 'Closed'), ('initial', 'Initial')], default="initial")
	certificate_ids = fields.One2many('etraining.course_certificate', 'class_id', string='Certiicates')
	project_ids = fields.One2many('etraining.project','class_id', string='Course members')
	exam_ids = fields.One2many('etraining.exam','course_class_id', string='Course exams')
	survey_ids = fields.One2many('etraining.survey','course_class_id', string='Course surveys')
	unit_count = fields.Integer(related='course_id.unit_count', string='Course unit count', readonly=True)
	member_count = fields.Integer( compute='_compute_member_count', string='Member count')

	def _compute_member_count(self):
		for clazz in self:
			clazz.member_count =  len(clazz.member_ids)

	@api.model
	def create(self, vals):
		course_class = super(CourseClass, self).create(vals)
		conference = self.env['etraining.conference'].create({'name':course_class.name,'class_id':course_class.id})
		course_class.write({ 'conference_id': conference.id})
		self.env['etraining.course_member'].create({'class_id':course_class.id, 'course_id':course_class.course_id.id, 'user_id': course_class.course_id.supervisor_id.id,'role':'supervisor'})
		return course_class

	@api.multi
	def unlink(self):
		if self.conference_id:
			self.conference_id.unlink()
		for project in self.project_ids:
			project.unlink()
		for survey in self.survey_ids:
			survey.unlink()
		for exam in self.exam_ids:
			exam.unlink()
		for member in self.member_ids:
			member.unlink()
		return super(CourseClass, self).unlink()

	@api.model
	def enroll(self, params):
		successList = []
		failList = []
		classId = params["classId"]
		userIds = params["userIds"]
		for course_class in self.env['etraining.course_class'].browse(classId):
			if course_class.course_id.prequisite_course_id:
				for user in self.env['res.users'].browse(userIds):
					fail = True
					for member in user.course_member_ids:
						if member.course_id.id == course.prequisite_course_id.id and member.enroll_status =='completed':
							fail = False
							break
					if fail:
						failList.append(user.id)
					else:
						successList.append(user.id)
			else:
				successList =  userIds
			for user in self.env['res.users'].browse(successList):
				course_class.registerClassMember(user, 'student')
			return {'success':True, 'successIds':successList, 'failIds':failList}

	@api.model
	def enroll_staff(self, params):
		successList = []
		failList = []
		classId = params["classId"]
		userIds = params["userIds"]
		for course_class in self.env['etraining.course_class'].browse(classId):
			for user in self.env['res.users'].browse(userIds):
				course_class.registerClassMember(user, 'teacher')
			return {'success':True,'successIds':userIds, 'failIds':[]}

	def registerClassMember(self, user, role):
		member =  self.env['etraining.course_member'].create({'class_id':self.id,'role':role,
			'course_id':self.course_id.id, 'user_id': user.id, 'status':'active', 
			'enroll_status':'registered', 'date_register':datetime.datetime.now()})
		if member.email:
				self.env.ref(self._module +"."+ "course_register_template").send_mail(member.id,force_send=False)
		return member

	@api.model
	def open(self, params):
		classId = +params["classId"]
		for clazz in self.env["etraining.course_class"].browse(classId):
			for student in self.env['etraining.course_member'].search([('class_id','=',clazz.id),('role','=','student')]):
				if student.enroll_status != 'completed' and student.email:
					self.env.ref(self._module +"."+ "class_open_template").send_mail(student.id,force_send=False)
			clazz.write({'status':'open'})
			return {'success':True}

	@api.model
	def close(self, params):
		classId = +params["classId"]
		for clazz in self.env["etraining.course_class"].browse(classId):
			for student in self.env['etraining.course_member'].search([('class_id','=',clazz.id),('role','=','student')]):
				if student.enroll_status != 'completed' and student.email:
					self.env.ref(self._module +"."+ "class_close_template").send_mail(student.id,force_send=False)
			clazz.write({'status':'closed'})
			return {'success':True}



class CourseMember(models.Model):
	_name = 'etraining.course_member'

	syllabus_id = fields.Many2one('etraining.syllabus', string='Syllabus', readonly=True)
	class_id = fields.Many2one('etraining.course_class', string='Class')
	course_id = fields.Many2one('etraining.course', string='Course')
	conference_member_id = fields.Many2one('etraining.conference_member', string='Confernce member')
	certificate_id = fields.Many2one('etraining.course_certificate', string='Certificate')
	user_id = fields.Many2one('res.users', string='User')
	email = fields.Char(related='user_id.email', string='Email', readonly=True)
	phone = fields.Char(related='user_id.phone', string='Phone', readonly=True)
	group_id = fields.Many2one('res.groups',related='user_id.group_id', string='Training group', readonly=True)
	group_name = fields.Char(related='group_id.name', string='Group name', readonly=True)
	name = fields.Char(related='user_id.name', string='User name', readonly=True)
	image = fields.Binary(related='user_id.image', string='Image', readonly=True)
	login = fields.Char(related='user_id.login', string='User login', readonly=True)
	course_name = fields.Char(related='course_id.name', string='Course name', readonly=True)
	course_code = fields.Char(related='course_id.code', string='Course code', readonly=True)
	course_mode = fields.Selection(related='course_id.mode', string='Course mode', readonly=True)
	course_review_state = fields.Selection(related='course_id.review_state', string='Course review state', readonly=True)
	status = fields.Selection(
		[('active', 'Active'), ('withdraw', 'Withdraw'), ('suspend', 'Suspend')], default="active")
	role = fields.Selection(
		[('student', 'Student'), ('teacher', 'Teacher'), ('editor', 'Editor'),  ('supervisor', 'Supervisor')])
	enroll_status = fields.Selection(
		[('in-study', 'In-study'), ('completed', 'Completed'),('await-certificate', 'Awaiting for certificate'), ('registered', 'Registered')], default="registered")
	date_register = fields.Datetime('Register date')
	exam_record_ids = fields.One2many('etraining.exam_record','course_member_id', string='Exam records')
	project_submission_ids = fields.One2many('etraining.project_submission','member_id', string='Project Submission')
	exam_member_ids = fields.One2many('etraining.exam_member','course_member_id', string='Exam members')
	survey_member_ids = fields.One2many('etraining.survey_member','course_member_id', string='Survey members')

	@api.multi
	def unlink(self):
		if self.conference_member_id:
			self.conference_member_id.unlink()
		if self.certificate_id:
			self.certificate_id.unlink()
		for record in self.exam_record_ids:
			record.unlink()
		for submit in self.project_submission_ids:
			submit.unlink()
		for member in self.exam_member_ids:
			member.unlink()
		for member in self.survey_member_ids:
			member.unlink()
		return super(CourseMember, self).unlink()

	@api.model
	def create(self, vals):
		members = []
		if 'user_id' in vals and vals['user_id']:
			if 'class_id' in vals and vals['class_id']:
				members = self.env['etraining.course_member'].search([('user_id','=',vals['user_id']),('role','=',vals['role']),('course_id','=',vals['course_id']),('class_id','=',vals['class_id'])])
			else:
				members = self.env['etraining.course_member'].search([('user_id','=',vals['user_id']),('role','=',vals['role']),('course_id','=',vals['course_id'])])
		if len(members) > 0:
			m =  members[0]
		else:
			m = super(CourseMember, self).create(vals)
		return m

	@api.model
	def complete_course(self,params):
		memberId = params["memberId"]
		for member in self.env['etraining.course_member'].browse(memberId):
			if member.course_id.competency_id and member.course_id.competency_level_id:
				self.env['etraining.achivement'].create({'competency_level_id':member.course_id.competency_level_id.id,
					'user_id':member.user_id.id, 'course_id':member.course_id.id, 'date_acquire':datetime.datetime.now()})
			return {'success':True}

	@api.model
	def grant_certificate(self,params):
		memberId = +params["memberId"]
		staffId = +params["staffId"]
		certificateId = +params["certificateId"]
		for member in self.env['etraining.course_member'].browse(memberId):
			for certificate in self.env['etraining.course_certificate'].browse(certificateId):
				certificate.write({'issue_member_id':staffId})
				member.write({'enroll_status':'completed','certificate_id':certificateId})
				if member.email:
					self.env.ref(self._module +"."+ "certificate_grant_template").send_mail(member.id,force_send=False)
				return {'success':True}

	@api.model
	def join_course(self,params):
		memberId = params["memberId"]
		for member in self.env['etraining.course_member'].browse(memberId):
			if member.enroll_status == 'registered':
				member.write({'enroll_status':'in-study'})
			return {'success':True}

	@api.model
	def request_certificate(self,params):
		memberId = params["memberId"]
		for member in self.env['etraining.course_member'].browse(memberId):
			if member.enroll_status == 'in-study':
				member.write({'enroll_status':'await-certificate'})
				if member.course_id.supervisor_id.email:
					self.env.ref(self._module +"."+ "certificate_request_template").send_mail(member.id,force_send=False)
			return {'success':True}

	@api.model
	def do_assessment(self,params):
		memberId = params["memberId"]
		assessmentId = params["assessmentId"]
		examMemberId = params["examMemberId"]
		for exam_member in self.env['etraining.exam_member'].browse(examMemberId):
			for assessment in self.env['etraining.self_assessment'].browse(assessmentId):
				if exam_member.enroll_status =='completed':
					submission = self.env['etraining.submission'].create({'member_id':exam_member.id})
					exam_member.write({'submission_id':submission.id, "enroll_status":"registered"})
					return {'success':True,'submission_id':submission.id}
				else:
					return {'success':True,'submission_id':exam_member.submission_id.id} 

	@api.model
	def get_assessment_info(self,params):
		memberId = params["memberId"]
		assessmentId = params["assessmentId"]
		for member in self.env['etraining.course_member'].browse(memberId):
			for assessment in self.env['etraining.self_assessment'].browse(assessmentId):
				exam_member = self.env["etraining.exam_member"].create({"user_id":member.user_id.id,"exam_id":assessment.exam_id.id,"role":'candidate','course_member_id':memberId})
				return {'success':True,'exam_member_id':exam_member.id, 'exam_id':assessment.exam_id.id,'exam_setting_id':assessment.exam_id.setting_id.id}


class CourseMaterial(models.Model):
	_name = 'etraining.course_material'

	course_id = fields.Many2one('etraining.course', string='Course')
	name = fields.Char(string='Name')
	type = fields.Selection(
		[('video', 'Video'), ('audio', 'Audio'), ('file','File')])
	url = fields.Text( string='Attachment URL')
	filename = fields.Char( string='Attachment Filename')
	material_file_id = fields.Many2one('ir.attachment', string='Material file')

	@api.multi
	def write(self, vals):
		if self.material_file_id and "material_file_id" in vals and self.material_file_id.id != vals["material_file_id"]:
			self.material_file_id.unlink()
		return super(CourseMaterial, self).write(vals)

	@api.multi
	def unlink(self):
		if self.material_file_id:
			self.material_file_id.unlink()
		return super(CourseMaterial, self).unlink()
		
class Certificate(models.Model):
	_name = 'etraining.course_certificate'

	course_id = fields.Many2one('etraining.course', string='Course')
	class_id = fields.Many2one('etraining.course_class',related='member_id.class_id', string='Class', readonly=True)
	member_id = fields.Many2one('etraining.course_member', string='Member')
	user_id = fields.Many2one('res.users',related='member_id.user_id', string='User ID', readonly=True)
	date_issue = fields.Datetime(string='Issue date')
	qualification = fields.Char( string='Qualification')
	summary = fields.Text( string='Summary')
	name = fields.Char(string='Name')
	issue_member_id = fields.Many2one('etraining.course_member', string='Issuer')
	member_name = fields.Char(related='member_id.name', string='User name', readonly=True)
	member_image = fields.Binary(related='member_id.image', string='Image', readonly=True)
	member_login = fields.Char(related='member_id.login', string='User login', readonly=True)
	course_name = fields.Char(related='course_id.name', string='Course name', readonly=True)
	course_code = fields.Char(related='course_id.code', string='Course code', readonly=True)
	course_mode = fields.Selection(related='course_id.mode', string='Course mode', readonly=True)

class FAQ(models.Model):
	_name = 'etraining.course_faq'

	question = fields.Text(string='Question')
	answer = fields.Text(string='Answer')
	course_id = fields.Many2one('etraining.course', string='Course')

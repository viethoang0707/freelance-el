# -*- coding: utf-8 -*-

from odoo import models, fields, api
import time


class Partner(models.Model):
	_name = 'res.partner'
	_inherit = 'res.partner'

	position = fields.Char( string="Position")
	social_id = fields.Char( string="Social ID")
	dob = fields.Datetime( string="Date of birth")
	gender = fields.Selection(
		[('male', 'Male'), ('female', 'Female'), ('other', 'Other')])


class User(models.Model):
	_name = 'res.users'
	_inherit = 'res.users'

	gender = fields.Selection(related='partner_id.gender',store=True)
	social_id = fields.Char(related="partner_id.social_id", string="Social ID",store=True)
	is_admin = fields.Boolean(default=False, string="Is admin")
	course_member_ids = fields.One2many('etraining.course_member','user_id', string='Course member')
	group_id = fields.Many2one('res.groups', string='Group')
	group_name = fields.Char(related="group_id.name", string="Group Name",readonly=True)
	group_code = fields.Char(related="group_id.code", string="Code",readonly=True)
	permission_id = fields.Many2one('etraining.permission', string='Permission')
	permission_name = fields.Char(related="permission_id.name", string="Permission Name",readonly=True)
	name = fields.Char(related="partner_id.name", string="Name",store=True)
	email = fields.Char(related="partner_id.email", string="Email",store=True)
	phone = fields.Char(related="partner_id.phone", string="Phone",store=True)
	position = fields.Char(related="partner_id.position", string="Position",store=True)
	dob = fields.Datetime(related="partner_id.dob", string="Date of birth",store=True)
	banned = fields.Boolean(default=False, string="Is banned")
	ban_date = fields.Datetime( string="Ban date")
	unban_date = fields.Datetime( string="Unban date")
	supervisor_id = fields.Many2one('res.users', string='Supervisor')
	supervisor_name = fields.Char(related="supervisor_id.name", string="Supervisor Name",readonly=True)
	achivement_ids = fields.One2many('etraining.achivement', 'user_id', string='Achivements')
	course_member_ids = fields.One2many('etraining.course_member', 'user_id', string='Course members')
	exam_member_ids = fields.One2many('etraining.exam_member', 'user_id', string='Exam members')
	survey_member_ids = fields.One2many('etraining.survey_member', 'user_id', string='Survey members')
	conference_member_ids = fields.One2many('etraining.conference_member', 'user_id', string='Conference members')
	certificate_ids = fields.One2many('etraining.course_certificate', 'user_id', string='Certiicates')
	exam_record_ids = fields.One2many('etraining.exam_record', 'user_id', string='Exam record')
	submission_ids = fields.One2many('etraining.submission', 'user_id', string='Exam submission')
	project_submission_ids = fields.One2many('etraining.project_submission', 'user_id', string='Project submission')
	manage_course_ids = fields.One2many('etraining.course', 'supervisor_id', string='Supervised courses ')
	manage_class_ids = fields.One2many('etraining.course_class', 'supervisor_id', string='Supervised classes ')
	manage_exam_ids = fields.One2many('etraining.exam', 'supervisor_id', string='Supervised exams ')
	manage_survey_ids = fields.One2many('etraining.survey', 'supervisor_id', string='Supervised surveys ')
	review_tickets_ids = fields.One2many('etraining.ticket', 'approve_user_id', string='Pending review tickets')
	submit_ticket_ids = fields.One2many('etraining.ticket', 'submit_user_id', string='Pending submit tickets')

	@api.model
	def create(self, vals):
		vals["login"] = vals["login"].lower()
		user = super(User, self).create(vals)
		return user

	@api.model
	def register(self, params):
		user = params["user"]
		if self.env["res.users"].search([("login","=",user["login"])]):
			return {"success":False, "code":"USER_EXIST", "message":"Username exist" }
		user = super(User, self).create(user)
		return {"success":True, "user_id": user.id}

	@api.model
	def change_password(self, params):
		userId = +params["userId"]
		old_passwd = params["old_pass"]
		new_passwd = params["new_pass"]
		self.check(self._cr.dbname, userId, old_passwd)
		if new_passwd:
				for user in self.env['res.users'].browse(userId):
					if user.login =='admin':
						raise UserError(_("Setting passwords for superadmin is forbidden!"))
					user.write({'password': new_passwd})
					return {"success":True}
		raise UserError(_("Setting empty passwords is not allowed for security reasons!"))

	@api.model
	def _search(self, args, offset=0, limit=None, order=None, count=False, access_rights_uid=None):
		def is_child_of_group(user, group):
			user_group_id = user.group_id
			while user_group_id:
				if user_group_id.id == group_id.id:
					return True
				user_group_id =  user_group_id.parent_id
			return False
		# TODO: Hack fix to erppeek since service API chang in Odoo 10
		context = count
		if context and isinstance(context, dict):
			count = None
		else:
			context = None
		res = super(User, self)._search(args, offset=offset, limit=limit, order=order, count=count,
                                          access_rights_uid=access_rights_uid)
		if res and context and  "user_id" in context:
			for user in self.env['res.users'].browse([context["user_id"]]):
				if user.permission_id:
					res_filter = []
					for res_id in self.env['res.users'].browse(res):
						for group_id in user.permission_id.user_group_ids:
							if is_child_of_group(res_id, group_id):
								res_filter.append(res_id)
					return res_filter
		return res



class ResetPassToken(models.Model):
	_name = 'etraining.reset_pass_token'

	code = fields.Char(string='Token')
	date_expire = fields.Float(string='Time in millseconds')
	login = fields.Char(string='Login')
	email = fields.Char(string='Email')
	reset_link = fields.Text(string="Reset link")
	user_id = fields.Many2one('res.users')

	@api.model
	def create(self, vals):
		cr,uid, context = self.env.args
		if "account" in context:
			account = context["account"]
			for user in self.env['res.users'].search([("login","=",vals["login"])]):
				vals["email"] = user.email
				var["user_id"] = user.id
			vals['code'] = ''.join(random.choice(ascii_uppercase + digits) for _ in range(24))
			vals["date_expire"] = int(round(time.time() * 1000)) + 1000 * 60 * 60 *24
			vals["reset_link"] =  '%s/auth/reset-pass/%s' % (account["domain"] ,vals['code'])
		return super(ResetPassToken, self).create(vals)

	@api.model
	def request_reset_password(self, params):
		login = params["login"]
		token = self.env['etraining.reset_pass_token'].create({'login': login, 'cloud_id':self.id})
		self.env.ref(self._module +"."+"reset_password_template").send_mail(token.id,force_send=False)
		return {'success':True}

	@api.model
	def apply_reset_password(self,params):
		code = params['token']
		new_pass = params['new_pass']
		for token in self.env["reset_pass_token"].get([('code','=',code)]):
				currentTime = int(round(time.time() * 1000)) 
				if token.date_expire < currentTime:
					return {'success':False,'message':'Token expired'}
				user.write({'password':new_pass})
				return {'success':True}


class Permission(models.Model):
	_name = 'etraining.permission'

	name = fields.Char( string="Name")
	menu_access = fields.Text( string="Menu access")
	user_ids = fields.One2many('res.users', 'permission_id',string='Users')
	user_count = fields.Integer( compute='_compute_user_count', string='User count')
	group_name = fields.Char( compute='_compute_group_name', string='Group name')
	user_group_ids = fields.Many2many('res.groups', string='Group')

	def _compute_user_count(self):
		for perm in self:
			perm.user_count =  len(perm.user_ids)

	def _compute_group_name(self):
		for perm in self:
			perm.group_name =  ','.join([group.name for group in perm.user_group_ids])

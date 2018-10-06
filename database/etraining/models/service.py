from odoo import models, fields, api,tools
from odoo.osv import osv
from datetime import datetime

class NotificationService(osv.AbstractModel):
    _name = 'etraining.notification_service'

    @api.model
    def sendSingleMail(self, params):
    	email_from = self.env.ref('base.main_company').email
        email_to = params["email_to"]
        email_body = params["body"]
        email_subject = params["subject"]
        mail = self.env["mail.mail"].create({'email_from':email_from,'body_html':email_body,
            'subject':email_subject,'email_to':email_to})
        mail.send()
        return True

    @api.model
    def broadcastMail(self, params):
        email_from = self.env.ref('base.main_company').email
        email_cc = params["recipients"]
        email_body = params["body"]
        email_subject = params["subject"]
        mail = self.env["mail.mail"].create({'email_from':email_from,'body_html':email_body,
            'subject':email_subject,'email_to':email_from, 'email_cc':email_cc})
        mail.send()
        return True

    @api.model
    def sendCourseRegistrationNotification(self, params):
        pass

    @api.model
    def sendExamRegistrationNotification(self, params):
        pass

    @api.model
    def sendCoursePublishedNotification(self, params):
        pass

    @api.model
    def sendExamPublishedNotification(self, params):
        pass

class ReportService(osv.AbstractModel):
    _name = 'etraining.report_service'

    @api.model
    def sample(self):
        pass

class AccountService(osv.AbstractModel):
    _name = 'etraining.account_service'

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
        for token in self.env["etraining.reset_pass_token"].get([('code','=',code)]):
            currentTime = int(round(time.time() * 1000)) 
            if token.date_expire < currentTime:
                return {'success':False,'message':'Token expired'}
            token.user_id.write({'password':new_pass})
            return {'success':True}

class WorkflowService(osv.AbstractModel):
    _name = 'etraining.workflow_service'

    @api.model
    def submitReview(self, params):
        params["status"] = "pending"
        ticket = self.env['etraining.ticket'].create(params)
        approver = ticket.approve_user_id
        params = {};
        params["email_to"] = approver.email
        params["subject"] = "E-learning notification - %s" % ticket.title
        params["body"] = "You have pending ticket to be reviewed: %s" % ticket.content
        self.env[ticket.res_model].browse(ticket.res_id).write({'review_state':'pending'})
        self.env["etraining.notification_service"].sendSingleMail(params)
        return {"success":True}

    @api.model
    def approveTicket(self, params):
        ticketId = params["ticketId"]
        for ticket in self.env['etraining.ticket'].browse(ticketId):
            if ticket.code == 'REVIEW_COURSE':
                self.approveCourse(ticket.res_id)
            if ticket.code == 'REVIEW_EXAM':
                self.approveExam(ticket.res_id)
            if ticket.code == 'REVIEW_SURVEY':
                self.approveSurvey(ticket.res_id)
            ticket.write({'status':'approved','date_close':datetime.now()})
        return {"success":True}

    @api.model
    def rejectTicket(self, params):
        ticketId = params["ticketId"]
        for ticket in self.env['etraining.ticket'].browse(ticketId):
            if ticket.code == 'REVIEW_COURSE':
                self.approveCourse(ticket.res_id)
            if ticket.code == 'REVIEW_EXAM':
                self.approveExam(ticket.res_id)
            if ticket.code == 'REVIEW_SURVEY':
                self.approveSurvey(ticket.res_id)
            ticket.write({'status':'rejected','date_close':datetime.now()})
        return {"success":True}

    def approveCourse(self, courseId):
        for course in self.env['etraining.course'].browse(courseId):
            course.write({'review_state': 'approved'})
            supervisor = course.supervisor_id
            params = {};
            params["email_to"] = supervisor.email
            params["subject"] = "E-learning notification"
            params["body"] = "Course %s has been approved" % course.name
            self.env["etraining.notification_service"].sendSingleMail(params)
            return {"success":True}
        return {"success":False}

    def rejectCourse(self, courseId):
        for course in self.env['etraining.course'].browse(courseId):
            course.write({'review_state': 'rejected'})
            supervisor = course.supervisor_id
            params = {};
            params["email_to"] = supervisor.email
            params["subject"] = "E-learning notification"
            params["body"] = "Course %s has been rejected" % course.name
            self.env["etraining.notification_service"].sendSingleMail(params)
            return {"success":True}
        return {"success":False}

    def approveExam(self, examId):
        for exam in self.env['etraining.exam'].browse(examId):
            exam.write({'review_state': 'approved'})
            supervisor = exam.supervisor_id
            params = {};
            params["email_to"] = supervisor.email
            params["subject"] = "E-learning notification"
            params["body"] = "Exam %s has been approved" % exam.name
            self.env["etraining.notification_service"].sendSingleMail(params)
            return {"success":True}
        return {"success":False}

    def rejectExam(self, examId):
        for exam in self.env['etraining.exam'].browse(examId):
            exam.write({'review_state': 'approved'})
            supervisor = exam.supervisor_id
            params = {};
            params["email_to"] = supervisor.email
            params["subject"] = "E-learning notification"
            params["body"] = "Exam %s has been rejected" % exam.name
            self.env["etraining.notification_service"].sendSingleMail(params)
            return {"success":True}
        return {"success":False}

    def approveSurvey(self, surveyId):
        for survey in self.env['etraining.survey'].browse(surveyId):
            survey.write({'review_state': 'approved'})
            supervisor = survey.supervisor_id
            params = {};
            params["email_to"] = supervisor.email
            params["subject"] = "E-learning notification"
            params["body"] = "Survey %s has been rejected" % survey.name
            self.env["etraining.notification_service"].sendSingleMail(params)
            return {"success":True}
        return {"success":False}

    def rejectSurvey(self, surveyId):
        for survey in self.env['etraining.survey'].browse(surveyId):
            survey.write({'review_state': 'rejected'})
            supervisor = survey.supervisor_id
            params = {};
            params["email_to"] = supervisor.email
            params["subject"] = "E-learning notification"
            params["body"] = "Survey %s has been rejected" % survey.name
            self.env["etraining.notification_service"].sendSingleMail(params)
            return {"success":True}
        return {"success":False}
        
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/mergeMap");
var auth_service_1 = require("../../shared/services/auth.service");
var ticket_model_1 = require("../models/elearning/ticket.model");
var course_model_1 = require("../models/elearning/course.model");
var exam_model_1 = require("../models/elearning/exam.model");
var survey_model_1 = require("../models/elearning/survey.model");
var execute_api_1 = require("../../shared/services/api/execute.api");
var WorkflowService = (function () {
    function WorkflowService(authService) {
        this.authService = authService;
    }
    WorkflowService.prototype.createCourseReviewTicket = function (context, course) {
        var user = this.authService.UserProfile;
        var ticket = new ticket_model_1.Ticket();
        ticket.res_id = course.id;
        ticket.res_model = course_model_1.Course.Model;
        ticket.content = "Course " + course.name + " is request to be reviewed";
        ticket.date_open = new Date();
        ticket.submit_user_id = user.id;
        ticket.approve_user_id = user.supervisor_id;
        ticket.title = 'Course review request';
        ticket.code = 'REVIEW_COURSE';
        var executeApi = new execute_api_1.ExecuteAPI('etraining.workflow_service', 'submitReview', ticket, null);
        return context.apiService.execute(executeApi, context.authService.LoginToken);
    };
    WorkflowService.prototype.createExamReviewTicket = function (context, exam) {
        var user = this.authService.UserProfile;
        var ticket = new ticket_model_1.Ticket();
        ticket.res_id = exam.id;
        ticket.res_model = exam_model_1.Exam.Model;
        ticket.content = "Exan " + exam.name + " is request to be reviewed";
        ticket.date_open = new Date();
        ticket.submit_user_id = user.id;
        ticket.approve_user_id = user.supervisor_id;
        ticket.title = 'Exam review request';
        ticket.code = 'REVIEW_EXAM';
        var executeApi = new execute_api_1.ExecuteAPI('etraining.workflow_service', 'submitReview', ticket, null);
        return context.apiService.execute(executeApi, context.authService.LoginToken);
    };
    WorkflowService.prototype.createSurveyReviewTicket = function (context, survey) {
        var user = this.authService.UserProfile;
        var ticket = new ticket_model_1.Ticket();
        ticket.res_id = survey.id;
        ticket.res_model = survey_model_1.Survey.Model;
        ticket.content = "Survey " + survey.name + " is request to be reviewed";
        ticket.date_open = new Date();
        ticket.submit_user_id = user.id;
        ticket.approve_user_id = user.supervisor_id;
        ticket.title = 'Survey review request';
        ticket.code = 'REVIEW_SURVEY';
        var executeApi = new execute_api_1.ExecuteAPI('etraining.workflow_service', 'submitReview', ticket, null);
        return context.apiService.execute(executeApi, context.authService.LoginToken);
    };
    WorkflowService.prototype.approveTicket = function (context, ticketId) {
        var params = { ticketId: ticketId };
        var executeApi = new execute_api_1.ExecuteAPI('etraining.workflow_service', 'approveTicket', params, null);
        return context.apiService.execute(executeApi, context.authService.LoginToken);
    };
    WorkflowService.prototype.rejectTicket = function (context, ticketId) {
        var params = { ticketId: ticketId };
        var executeApi = new execute_api_1.ExecuteAPI('etraining.workflow_service', 'rejectTicket', params, null);
        return context.apiService.execute(executeApi, context.authService.LoginToken);
    };
    WorkflowService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [auth_service_1.AuthService])
    ], WorkflowService);
    return WorkflowService;
}());
exports.WorkflowService = WorkflowService;

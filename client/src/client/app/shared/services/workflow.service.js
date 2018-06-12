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
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/mergeMap");
var auth_service_1 = require("../../shared/services/auth.service");
var ticket_model_1 = require("../models/ticket/ticket.model");
var notification_model_1 = require("../models/ticket/notification.model");
var course_model_1 = require("../models/elearning/course.model");
var course_syllabus_model_1 = require("../models/elearning/course-syllabus.model");
var socket_service_1 = require("../../shared/services/socket.service");
var WorkflowService = (function () {
    function WorkflowService(authService, socketService) {
        this.authService = authService;
        this.socketService = socketService;
    }
    WorkflowService.prototype.createCoursePublishTicket = function (context, course) {
        var _this = this;
        var user = this.authService.UserProfile;
        var ticket = new ticket_model_1.Ticket();
        ticket.res_id = course.id;
        ticket.res_model = course_model_1.Course.Model;
        ticket.content = "Course " + course.name + " is request to be published";
        ticket.date_open = new Date();
        ticket.submit_user_id = user.id;
        ticket.approve_user_id = user.supervisor_id;
        ticket.title = 'Course published request';
        ticket.code = 'PUBLISH_COURSE';
        return ticket.save(context).flatMap(function () {
            var notification = new notification_model_1.Notification();
            notification.title = "Ticket #" + ticket.id + " has been opened by " + user.name;
            notification.date_open = new Date();
            notification.ticket_id = ticket.id;
            notification.target_user_id = ticket.approve_user_id;
            _this.socketService.notify(notification.title, course.supervisor_id, _this.authService.CloudAcc.id);
            return notification.save(context);
        });
    };
    WorkflowService.prototype.createCourseSyllabusPublishTicket = function (context, syl) {
        var _this = this;
        var user = this.authService.UserProfile;
        var ticket = new ticket_model_1.Ticket();
        ticket.res_id = syl.id;
        ticket.res_model = course_syllabus_model_1.CourseSyllabus.Model;
        ticket.content = "Course syllabus " + syl.name + " is request to be published";
        ticket.date_open = new Date();
        ticket.submit_user_id = user.id;
        ticket.approve_user_id = user.supervisor_id;
        ticket.title = 'Course syllabus published request';
        ticket.code = 'PUBLISH_COURSE_SYLLABUS';
        return ticket.save(context).flatMap(function () {
            var notification = new notification_model_1.Notification();
            notification.title = "Ticket #" + ticket.id + " has been opened by " + user.name;
            notification.date_open = new Date();
            notification.ticket_id = ticket.id;
            notification.target_user_id = ticket.approve_user_id;
            _this.socketService.notify(notification.title, syl.supervisor_id, _this.authService.CloudAcc.id);
            return notification.save(context);
        });
    };
    WorkflowService.prototype.approveTicket = function (context, ticket) {
        var _this = this;
        if (ticket.code == 'PUBLISH_COURSE') {
            return course_model_1.Course.get(context, ticket.res_id).flatMap(function (course) {
                course.status = 'published';
                ticket.status = 'approved';
                var notification = new notification_model_1.Notification();
                notification.title = "Your ticket #" + ticket.id + " has been approved";
                notification.date_open = new Date();
                notification.ticket_id = ticket.id;
                notification.target_user_id = ticket.submit_user_id;
                return Rx_1.Observable.forkJoin(course.save(context), ticket.save(context), notification.save(context)).do(function () {
                    _this.socketService.notify(notification.title, ticket.submit_user_id, _this.authService.CloudAcc.id);
                });
            });
        }
        if (ticket.code == 'PUBLISH_COURSE_SYLLABUS') {
            return course_syllabus_model_1.CourseSyllabus.get(context, ticket.res_id).flatMap(function (syl) {
                syl.status = 'published';
                ticket.status = 'approved';
                var notification = new notification_model_1.Notification();
                notification.title = "Your ticket #" + ticket.id + " has been approved";
                notification.date_open = new Date();
                notification.ticket_id = ticket.id;
                notification.target_user_id = ticket.submit_user_id;
                return Rx_1.Observable.forkJoin(syl.save(context), ticket.save(context), notification.save(context)).do(function () {
                    _this.socketService.notify(notification.title, ticket.submit_user_id, _this.authService.CloudAcc.id);
                });
            });
        }
        return Rx_1.Observable.of(null);
    };
    WorkflowService.prototype.rejectTicket = function (context, ticket) {
        var _this = this;
        ticket.status = 'rejected';
        var notification = new notification_model_1.Notification();
        notification.title = "Your ticket #" + ticket.id + " has been rejected";
        notification.date_open = new Date();
        notification.ticket_id = ticket.id;
        notification.target_user_id = ticket.submit_user_id;
        return Rx_1.Observable.forkJoin(ticket.save(context), notification.save(context)).do(function () {
            _this.socketService.notify(notification.title, ticket.submit_user_id, _this.authService.CloudAcc.id);
        });
    };
    WorkflowService.prototype.updateTicket = function (context, ticket) {
        var _this = this;
        var source_user = this.authService.UserProfile;
        var target_user_id = (source_user.id == ticket.approve_user_id ? ticket.submit_user_id : ticket.approve_user_id);
        var notification = new notification_model_1.Notification();
        notification.title = "The ticket #" + ticket.id + " has been updated";
        notification.date_open = new Date();
        notification.ticket_id = ticket.id;
        notification.target_user_id = target_user_id;
        return notification.save(context).do(function () {
            _this.socketService.notify(notification.title, target_user_id, _this.authService.CloudAcc.id);
        });
    };
    WorkflowService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [auth_service_1.AuthService, socket_service_1.WebSocketService])
    ], WorkflowService);
    return WorkflowService;
}());
exports.WorkflowService = WorkflowService;
//# sourceMappingURL=workflow.service.js.map
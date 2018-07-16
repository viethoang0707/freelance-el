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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvd29ya2Zsb3cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUUzQyxzQ0FBb0M7QUFJcEMsbUVBQWlFO0FBQ2pFLGlFQUEwRDtBQUMxRCxpRUFBMEQ7QUFLMUQsNkRBQXNEO0FBQ3RELGlFQUEwRDtBQUMxRCxxRUFBbUU7QUFJbkU7SUFFRSx5QkFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFDNUMsQ0FBQztJQUVELGtEQUF3QixHQUF4QixVQUF5QixPQUFtQixFQUFFLE1BQWM7UUFDMUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFDeEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxxQkFBTSxFQUFFLENBQUM7UUFDMUIsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxTQUFTLEdBQUcscUJBQU0sQ0FBQyxLQUFLLENBQUM7UUFDaEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxZQUFVLE1BQU0sQ0FBQyxJQUFJLCtCQUE0QixDQUFDO1FBQ25FLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUM5QixNQUFNLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDaEMsTUFBTSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsdUJBQXVCLENBQUM7UUFDdkMsTUFBTSxDQUFDLElBQUksR0FBRyxlQUFlLENBQUM7UUFDOUIsSUFBSSxVQUFVLEdBQUcsSUFBSSx3QkFBVSxDQUFDLDRCQUE0QixFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDM0YsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FB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RUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzNGLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFaEYsQ0FBQztJQTdEVSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBR3NCLDBCQUFXO09BRmpDLGVBQWUsQ0ErRDNCO0lBQUQsc0JBQUM7Q0EvREQsQUErREMsSUFBQTtBQS9EWSwwQ0FBZSIsImZpbGUiOiJhcHAvc2hhcmVkL3NlcnZpY2VzL3dvcmtmbG93LnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21lcmdlTWFwJztcbmltcG9ydCB7IENyZWRlbnRpYWwgfSBmcm9tICcuLi9tb2RlbHMvY3JlZGVudGlhbC5tb2RlbCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCB7IE1hcFV0aWxzIH0gZnJvbSAnLi4vaGVscGVycy9tYXAudXRpbHMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFRpY2tldCB9IGZyb20gJy4uL21vZGVscy9lbGVhcm5pbmcvdGlja2V0Lm1vZGVsJztcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gJy4uL21vZGVscy9lbGVhcm5pbmcvY291cnNlLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZVN5bGxhYnVzIH0gZnJvbSAnLi4vbW9kZWxzL2VsZWFybmluZy9jb3Vyc2Utc3lsbGFidXMubW9kZWwnO1xuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICcuLi9tb2RlbHMvY2xvdWQvdG9rZW4ubW9kZWwnO1xuaW1wb3J0IHsgQVBJQ29udGV4dCB9IGZyb20gJy4uL21vZGVscy9jb250ZXh0JztcbmltcG9ydCB7IFdlYlNvY2tldFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvc29ja2V0LnNlcnZpY2UnO1xuaW1wb3J0IHsgRXhhbSB9IGZyb20gJy4uL21vZGVscy9lbGVhcm5pbmcvZXhhbS5tb2RlbCc7XG5pbXBvcnQgeyBTdXJ2ZXkgfSBmcm9tICcuLi9tb2RlbHMvZWxlYXJuaW5nL3N1cnZleS5tb2RlbCc7XG5pbXBvcnQgeyBFeGVjdXRlQVBJIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9leGVjdXRlLmFwaSc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdvcmtmbG93U2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcbiAgfVxuXG4gIGNyZWF0ZUNvdXJzZVJldmlld1RpY2tldChjb250ZXh0OiBBUElDb250ZXh0LCBjb3Vyc2U6IENvdXJzZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdmFyIHVzZXIgPSB0aGlzLmF1dGhTZXJ2aWNlLlVzZXJQcm9maWxlO1xuICAgIHZhciB0aWNrZXQgPSBuZXcgVGlja2V0KCk7XG4gICAgdGlja2V0LnJlc19pZCA9IGNvdXJzZS5pZDtcbiAgICB0aWNrZXQucmVzX21vZGVsID0gQ291cnNlLk1vZGVsO1xuICAgIHRpY2tldC5jb250ZW50ID0gYENvdXJzZSAke2NvdXJzZS5uYW1lfSBpcyByZXF1ZXN0IHRvIGJlIHJldmlld2VkYDtcbiAgICB0aWNrZXQuZGF0ZV9vcGVuID0gbmV3IERhdGUoKTtcbiAgICB0aWNrZXQuc3VibWl0X3VzZXJfaWQgPSB1c2VyLmlkO1xuICAgIHRpY2tldC5hcHByb3ZlX3VzZXJfaWQgPSB1c2VyLnN1cGVydmlzb3JfaWQ7XG4gICAgdGlja2V0LnRpdGxlID0gJ0NvdXJzZSByZXZpZXcgcmVxdWVzdCc7XG4gICAgdGlja2V0LmNvZGUgPSAnUkVWSUVXX0NPVVJTRSc7XG4gICAgdmFyIGV4ZWN1dGVBcGkgPSBuZXcgRXhlY3V0ZUFQSSgnZXRyYWluaW5nLndvcmtmbG93X3NlcnZpY2UnLCAnc3VibWl0UmV2aWV3JywgdGlja2V0LCBudWxsKVxuICAgIHJldHVybiBjb250ZXh0LmFwaVNlcnZpY2UuZXhlY3V0ZShleGVjdXRlQXBpLCBjb250ZXh0LmF1dGhTZXJ2aWNlLkxvZ2luVG9rZW4pO1xuICB9XG5cbiAgY3JlYXRlRXhhbVJldmlld1RpY2tldChjb250ZXh0OiBBUElDb250ZXh0LCBleGFtOiBFeGFtKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB2YXIgdXNlciA9IHRoaXMuYXV0aFNlcnZpY2UuVXNlclByb2ZpbGU7XG4gICAgdmFyIHRpY2tldCA9IG5ldyBUaWNrZXQoKTtcbiAgICB0aWNrZXQucmVzX2lkID0gZXhhbS5pZDtcbiAgICB0aWNrZXQucmVzX21vZGVsID0gRXhhbS5Nb2RlbDtcbiAgICB0aWNrZXQuY29udGVudCA9IGBFeGFuICR7ZXhhbS5uYW1lfSBpcyByZXF1ZXN0IHRvIGJlIHJldmlld2VkYDtcbiAgICB0aWNrZXQuZGF0ZV9vcGVuID0gbmV3IERhdGUoKTtcbiAgICB0aWNrZXQuc3VibWl0X3VzZXJfaWQgPSB1c2VyLmlkO1xuICAgIHRpY2tldC5hcHByb3ZlX3VzZXJfaWQgPSB1c2VyLnN1cGVydmlzb3JfaWQ7XG4gICAgdGlja2V0LnRpdGxlID0gJ0V4YW0gcmV2aWV3IHJlcXVlc3QnO1xuICAgIHRpY2tldC5jb2RlID0gJ1JFVklFV19FWEFNJztcbiAgICB2YXIgZXhlY3V0ZUFwaSA9IG5ldyBFeGVjdXRlQVBJKCdldHJhaW5pbmcud29ya2Zsb3dfc2VydmljZScsICdzdWJtaXRSZXZpZXcnLCB0aWNrZXQsIG51bGwpXG4gICAgcmV0dXJuIGNvbnRleHQuYXBpU2VydmljZS5leGVjdXRlKGV4ZWN1dGVBcGksIGNvbnRleHQuYXV0aFNlcnZpY2UuTG9naW5Ub2tlbik7XG4gIH1cblxuICBjcmVhdGVTdXJ2ZXlSZXZpZXdUaWNrZXQoY29udGV4dDogQVBJQ29udGV4dCwgc3VydmV5OiBTdXJ2ZXkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHZhciB1c2VyID0gdGhpcy5hdXRoU2VydmljZS5Vc2VyUHJvZmlsZTtcbiAgICB2YXIgdGlja2V0ID0gbmV3IFRpY2tldCgpO1xuICAgIHRpY2tldC5yZXNfaWQgPSBzdXJ2ZXkuaWQ7XG4gICAgdGlja2V0LnJlc19tb2RlbCA9IFN1cnZleS5Nb2RlbDtcbiAgICB0aWNrZXQuY29udGVudCA9IGBTdXJ2ZXkgJHtzdXJ2ZXkubmFtZX0gaXMgcmVxdWVzdCB0byBiZSByZXZpZXdlZGA7XG4gICAgdGlja2V0LmRhdGVfb3BlbiA9IG5ldyBEYXRlKCk7XG4gICAgdGlja2V0LnN1Ym1pdF91c2VyX2lkID0gdXNlci5pZDtcbiAgICB0aWNrZXQuYXBwcm92ZV91c2VyX2lkID0gdXNlci5zdXBlcnZpc29yX2lkO1xuICAgIHRpY2tldC50aXRsZSA9ICdTdXJ2ZXkgcmV2aWV3IHJlcXVlc3QnO1xuICAgIHRpY2tldC5jb2RlID0gJ1JFVklFV19TVVJWRVknO1xuICAgIHZhciBleGVjdXRlQXBpID0gbmV3IEV4ZWN1dGVBUEkoJ2V0cmFpbmluZy53b3JrZmxvd19zZXJ2aWNlJywgJ3N1Ym1pdFJldmlldycsIHRpY2tldCwgbnVsbClcbiAgICByZXR1cm4gY29udGV4dC5hcGlTZXJ2aWNlLmV4ZWN1dGUoZXhlY3V0ZUFwaSwgY29udGV4dC5hdXRoU2VydmljZS5Mb2dpblRva2VuKTtcbiAgfVxuXG4gIGFwcHJvdmVUaWNrZXQoY29udGV4dDogQVBJQ29udGV4dCwgdGlja2V0SWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdmFyIHBhcmFtcyA9IHsgdGlja2V0SWQ6IHRpY2tldElkIH07XG4gICAgdmFyIGV4ZWN1dGVBcGkgPSBuZXcgRXhlY3V0ZUFQSSgnZXRyYWluaW5nLndvcmtmbG93X3NlcnZpY2UnLCAnYXBwcm92ZVRpY2tldCcsIHBhcmFtcywgbnVsbClcbiAgICByZXR1cm4gY29udGV4dC5hcGlTZXJ2aWNlLmV4ZWN1dGUoZXhlY3V0ZUFwaSwgY29udGV4dC5hdXRoU2VydmljZS5Mb2dpblRva2VuKTtcbiAgfVxuXG4gIHJlamVjdFRpY2tldChjb250ZXh0OiBBUElDb250ZXh0LCB0aWNrZXRJZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB2YXIgcGFyYW1zID0geyB0aWNrZXRJZDogdGlja2V0SWQgfTtcbiAgICB2YXIgZXhlY3V0ZUFwaSA9IG5ldyBFeGVjdXRlQVBJKCdldHJhaW5pbmcud29ya2Zsb3dfc2VydmljZScsICdyZWplY3RUaWNrZXQnLCBwYXJhbXMsIG51bGwpXG4gICAgcmV0dXJuIGNvbnRleHQuYXBpU2VydmljZS5leGVjdXRlKGV4ZWN1dGVBcGksIGNvbnRleHQuYXV0aFNlcnZpY2UuTG9naW5Ub2tlbik7XG5cbiAgfVxuXG59XG4iXX0=

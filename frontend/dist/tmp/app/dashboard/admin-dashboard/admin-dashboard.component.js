"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var class_dialog_component_1 = require("../../course/enrollment/class-dialog/class-dialog.component");
var base_component_1 = require("../../shared/components/base/base.component");
var exam_model_1 = require("../../shared/models/elearning/exam.model");
var date_utils_1 = require("../../shared/helpers/date.utils");
var exam_dialog_component_1 = require("../../assessment/exam/exam-dialog/exam-dialog.component");
var _ = require("underscore");
var constants_1 = require("../../shared/models/constants");
var base_model_1 = require("../../shared/models/base.model");
var course_class_model_1 = require("../../shared/models/elearning/course-class.model");
var ticket_model_1 = require("../../shared/models/elearning/ticket.model");
var AdminDashboardComponent = (function (_super) {
    __extends(AdminDashboardComponent, _super);
    function AdminDashboardComponent() {
        var _this = _super.call(this) || this;
        _this.TICKET_STATUS = constants_1.TICKET_STATUS;
        _this.header = constants_1.SCHEDULER_HEADER;
        _this.dateUtils = new date_utils_1.DateUtils();
        return _this;
    }
    AdminDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        var now = new Date();
        this.events = [];
        this.approvalTickets = [];
        base_model_1.BaseModel
            .bulk_search(this, exam_model_1.Exam.__api__listBySupervisorAndDate(this.ContextUser.id, this.dateUtils.firstDateOfMonth(now), this.dateUtils.lastDateOfMonth(now)), course_class_model_1.CourseClass.__api__listBySupervisorAndDate(this.ContextUser.id, this.dateUtils.firstDateOfMonth(now), this.dateUtils.lastDateOfMonth(now)), ticket_model_1.Ticket.__api__listPendingByApproveUser(this.ContextUser.id))
            .subscribe(function (jsonArr) {
            _this.exams = _.filter(exam_model_1.Exam.toArray(jsonArr[0]), function (exam) {
                return exam.IsAvailable;
            });
            var examEvents = _.map(_this.exams, function (exam) {
                return {
                    title: exam.name,
                    start: exam.start,
                    end: exam.end,
                    id: exam_model_1.Exam.Model + ':' + exam.id,
                    allDay: true
                };
            });
            _this.classes = _.filter(course_class_model_1.CourseClass.toArray(jsonArr[1]), function (clz) {
                return clz.IsAvailable;
            });
            var classEvents = _.map(_this.classes, function (clazz) {
                return {
                    title: clazz.name,
                    start: clazz.start,
                    end: clazz.end,
                    id: course_class_model_1.CourseClass.Model + ':' + clazz.id,
                    allDay: true
                };
            });
            _this.events = _this.events.concat(examEvents).concat(classEvents);
            _this.approvalTickets = ticket_model_1.Ticket.toArray(jsonArr[2]);
        });
    };
    AdminDashboardComponent.prototype.onEventClick = function (event) {
        var eventId = event.calEvent.id;
        var model = eventId.split(':')[0];
        var id = eventId.split(':')[1];
        if (model == exam_model_1.Exam.Model) {
            var exam = _.find(this.exams, function (exam) {
                return exam.id == id;
            });
            this.examDialog.show(exam);
        }
        if (model == course_class_model_1.CourseClass.Model) {
            var clazz = _.find(this.classes, function (clazz) {
                return clazz.id == id;
            });
            this.classDialog.show(clazz);
        }
    };
    AdminDashboardComponent.prototype.approveTicket = function (ticket) {
        var _this = this;
        if (ticket.status == 'pending') {
            this.workflowService.approveTicket(this, ticket.id).subscribe(function () {
                _this.info(_this.translateService.instant('Ticket approved'));
                _this.approvalTickets = _.reject(_this.approvalTickets, function (obj) {
                    return obj.id == ticket.id;
                });
            });
        }
    };
    AdminDashboardComponent.prototype.rejectTicket = function (ticket) {
        var _this = this;
        if (ticket.status == 'pending') {
            this.workflowService.rejectTicket(this, ticket.id).subscribe(function () {
                _this.info(_this.translateService.instant('Ticket rejected'));
                _this.approvalTickets = _.reject(_this.approvalTickets, function (obj) {
                    return obj.id == ticket.id;
                });
            });
        }
    };
    __decorate([
        core_1.ViewChild(exam_dialog_component_1.ExamDialog),
        __metadata("design:type", exam_dialog_component_1.ExamDialog)
    ], AdminDashboardComponent.prototype, "examDialog", void 0);
    __decorate([
        core_1.ViewChild(class_dialog_component_1.CourseClassDialog),
        __metadata("design:type", class_dialog_component_1.CourseClassDialog)
    ], AdminDashboardComponent.prototype, "classDialog", void 0);
    AdminDashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin-dashboard',
            template: "<p-tabView [style]=\"{width: '100%', height: '720px'}\">     <p-tabPanel header=\"{{'Calendar'|translate}}\" leftIcon=\"ui-icon-date-range\">         <div style=\"text-align:center\">             <p-schedule [events]=\"events\"  [editable]=\"true\" (onEventClick)=\"onEventClick($event)\" [header]=\"header\" [height]=\"640\"></p-schedule>         </div>     </p-tabPanel>     <p-tabPanel header=\"{{'Ticket'|translate}} ({{approvalTickets.length}})\" leftIcon=\"ui-icon-widgets\">          <p-dataList [value]=\"approvalTickets\" [paginator]=\"true\" [rows]=\"5\" styleClass=\"lms-course-list\">                 <ng-template let-ticket pTemplate=\"item\">                     <p-card styleClass=\"lms-course-list-item\">                         <div class=\"ui-g\">                             <div class=\"ui-g-9\">                                 <div class=\"ui-g-12 border\">                                     <button pButton type=\"button\" icon=\"ui-icon-check\" title=\"{{'Approve'| translate}}\" label=\"{{'Approve'|translate}}\" class=\" green-btn\" style=\"margin-right:4px;\" (click)=\"approveTicket(ticket)\" [disabled]=\"ticket.status=='approved'\"></button>                                     <button pButton type=\"button\" icon=\"ui-icon-block\" title=\"{{'Reject'| translate}}\" label=\"{{'Reject'|translate}}\" class=\" red-btn\" style=\"margin-right:4px;\" (click)=\"rejectTicket(ticket)\" [disabled]=\"ticket.status=='rejected'\"></button>                                 </div>                                 <div class=\"ui-g-12\">                                     <h4 class=\"heading-course\">                                         <span>{{ticket.title}}</span>                                     </h4>                                     <span class=\"c-status\">                                         {{TICKET_STATUS[ticket.status]|translate}}                                     </span>                                     <div class=\"clearfix\"></div>                                     <p-accordion styleClass=\"cont\">                                         <p-accordionTab header=\"{{'Content' | translate}}\">                                             <p [innerHTML]= \"ticket.content\" ></p>                                         </p-accordionTab>                                     </p-accordion>                                 </div>                             </div>                             <div class=\"ui-g-3\">                                 <p-card styleClass=\"lms-course-detail\">                                     <ul class=\"list-cmt\">                                         <li class=\"clearfix\">                                             <i class=\"material-icons\">date_range</i>                                             <span class=\"cmt-title\">{{'Open date'|translate}}</span>                                             <span class=\"cmt-detail\">{{ticket.date_open | date : \"dd/MM/yyyy\"}}</span>                                         </li>                                         <li class=\"clearfix\">                                             <i class=\"material-icons\">date_range</i>                                             <span class=\"cmt-title\">{{'Close date'|translate}}</span>                                             <span class=\"cmt-detail\">{{ticket.date_close | date : \"dd/MM/yyyy\"}}</span>                                         </li>                                         <li class=\"clearfix\">                                             <i class=\"material-icons\">people</i>                                             <span class=\"cmt-title\">{{'Submit by)'|translate}}</span>                                             <span class=\"cmt-detail\">{{ticket.submit_user_id__DESC__}}</span>                                         </li>                                         <li class=\"clearfix\" style=\"border-bottom: none;\">                                             <i class=\"material-icons\">done</i>                                             <span class=\"cmt-title\">{{'Approve by'|translate}}</span>                                             <span class=\"cmt-detail\">{{ticket.approve_user_id__DESC__}}</span>                                         </li>                                     </ul>                                 </p-card>                             </div>                         </div>                     </p-card>                 </ng-template>             </p-dataList>     </p-tabPanel> </p-tabView> <exam-dialog></exam-dialog> <class-dialog></class-dialog>",
            styles: [".mrg-bt{margin-bottom:15px}.list-cmt{padding-left:0}.list-cmt li{list-style:none;padding:10px 14px;border-bottom:1px solid #dbdbdb}.list-cmt li i{font-size:24px;margin-right:8px;width:32px;vertical-align:middle;color:#757575}.list-cmt li .cmt-title{font-weight:700;margin-right:8px}.list-cmt li .cmt-detail{color:#283593;float:right}.c-title{font-size:15px}.c-status{background-color:#e91e63;border-radius:9px;padding:2px 8px;color:#fff}.profile-image-wrapper img{width:100%;border:1px solid #dbdbdb}.border{border-bottom:1px solid #dbdbdb}.heading-course{font-weight:600;color:#192fa9;float:left;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:5px 10px 0 0}.display-none{display:none}.search input{border:1px solid #bdbdbd;width:400px;border-bottom-left-radius:3px;border-top-left-radius:3px}.search button{border-bottom-left-radius:0;border-top-left-radius:0}"],
        }),
        __metadata("design:paramtypes", [])
    ], AdminDashboardComponent);
    return AdminDashboardComponent;
}(base_component_1.BaseComponent));
exports.AdminDashboardComponent = AdminDashboardComponent;

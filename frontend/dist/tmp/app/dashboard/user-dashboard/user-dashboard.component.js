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
var router_1 = require("@angular/router");
var base_component_1 = require("../../shared/components/base/base.component");
var meeting_service_1 = require("../../shared/services/meeting.service");
var constants_1 = require("../../shared/models/constants");
var course_syllabus_dialog_component_1 = require("../../cms/course/course-syllabus/course-syllabus.dialog.component");
var exam_content_dialog_component_1 = require("../../cms/exam/content-dialog/exam-content.dialog.component");
var exam_study_dialog_component_1 = require("../../lms/exam/exam-study/exam-study.dialog.component");
var survey_study_dialog_component_1 = require("../../lms/survey/survey-study/survey-study.dialog.component");
var course_publish_dialog_component_1 = require("../../cms/course/course-publish/course-publish.dialog.component");
var _ = require("underscore");
var UserDashboardComponent = (function (_super) {
    __extends(UserDashboardComponent, _super);
    function UserDashboardComponent(meetingSerivce, router) {
        var _this = _super.call(this) || this;
        _this.meetingSerivce = meetingSerivce;
        _this.router = router;
        _this.CONFERENCE_STATUS = constants_1.CONFERENCE_STATUS;
        _this.COURSE_MODE = constants_1.COURSE_MODE;
        _this.EXAM_STATUS = constants_1.EXAM_STATUS;
        _this.conferenceMembers = [];
        _this.exams = [];
        _this.courses = [];
        _this.events = [];
        _this.header = constants_1.SCHEDULER_HEADER;
        return _this;
    }
    UserDashboardComponent.prototype.displayCourses = function (courses) {
        var _this = this;
        _.each(courses, function (course) {
            course['student'] = _this.lmsProfileService.getCourseMemberByRole('student', course.id);
            course['teacher'] = _this.lmsProfileService.getCourseMemberByRole('teacher', course.id);
            course['editor'] = _this.lmsProfileService.getCourseMemberByRole('editor', course.id);
            course['supervisor'] = _this.lmsProfileService.getCourseMemberByRole('supervisor', course.id);
            if (course['supervisor'])
                course['teacher'] = course['editor'] = course['supervisor'];
        });
        this.courses = _.sortBy(courses, function (course) {
            return -_this.lmsProfileService.getLastCourseTimestamp(course);
        });
        var classList = this.lmsProfileService.MyClasses;
        _.each(classList, function (clazz) {
            if (clazz.IsAvailable)
                _this.events.push({
                    title: clazz.name,
                    start: clazz.start,
                    end: clazz.end,
                    id: clazz.id,
                    allDay: true
                });
        });
    };
    UserDashboardComponent.prototype.displayExams = function (exams) {
        var _this = this;
        _.each(exams, function (exam) {
            exam['candidate'] = _this.lmsProfileService.getExamMemberByRole('candidate', exam.id);
            exam['editor'] = _this.lmsProfileService.getExamMemberByRole('editor', exam.id);
            exam['supervisor'] = _this.lmsProfileService.getExamMemberByRole('supervisor', exam.id);
            if (exam['supervisor'])
                exam['editor'] = exam['supervisor'];
            if (exam.IsAvailable)
                _this.events.push({
                    title: exam.name,
                    start: exam.start,
                    end: exam.end,
                    id: exam.id,
                    allDay: true
                });
        });
        exams.sort(function (exam1, exam2) {
            return _this.lmsProfileService.getLastExamTimestamp(exam2) - _this.lmsProfileService.getLastExamTimestamp(exam1);
        });
        this.exams = exams;
    };
    UserDashboardComponent.prototype.displayConferences = function (conferenceMembers) {
        var _this = this;
        conferenceMembers = _.sortBy(conferenceMembers, function (member) {
            return -_this.lmsProfileService.getLastConferenceTimestamp(member);
        });
        this.conferenceMembers = conferenceMembers;
    };
    UserDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.lmsProfileService.init(this).subscribe(function () {
            var courses = _this.lmsProfileService.MyCourses;
            var exams = _this.lmsProfileService.MyExams;
            var conferenceMembers = _this.lmsProfileService.MyConferenceMembers;
            _this.displayCourses(courses);
            _this.displayExams(exams);
            _this.displayConferences(conferenceMembers);
        });
    };
    UserDashboardComponent.prototype.joinConference = function (conference, member) {
        if (member.is_active)
            this.meetingSerivce.join(conference.room_ref, member.room_member_ref);
        else
            this.error('You are  not allowed to join the conference');
    };
    UserDashboardComponent.prototype.studyCourse = function (course, member) {
        this.router.navigate(['/lms/courses/study', course.id, member.id]);
    };
    UserDashboardComponent.prototype.viewCourse = function (course) {
        this.router.navigate(['/lms/courses/view', course.id]);
    };
    UserDashboardComponent.prototype.editSyllabus = function (course, member) {
        this.router.navigate(['/lms/courses/edit', course.id, member.id]);
    };
    UserDashboardComponent.prototype.publishCourse = function (course) {
        this.publisiDialog.show(course);
    };
    UserDashboardComponent.prototype.manageCourse = function (course, member) {
        this.router.navigate(['/lms/courses/manage', course.id, member.id]);
    };
    UserDashboardComponent.prototype.manageExam = function (exam, member) {
        this.router.navigate(['/lms/exams/manage', exam.id, member.id]);
    };
    UserDashboardComponent.prototype.editExamContent = function (exam) {
        this.examContentDialog.show(exam);
    };
    UserDashboardComponent.prototype.startExam = function (exam, member) {
        var _this = this;
        this.confirm('Are you sure to start ?', function () {
            _this.examStudyDialog.show(exam, member);
        });
    };
    UserDashboardComponent.prototype.publishExam = function (exam) {
        exam.sheet_status = 'published';
        exam.save(this).subscribe();
    };
    UserDashboardComponent.prototype.unpublishExam = function (exam) {
        exam.sheet_status = 'unpublished';
        exam.save(this).subscribe();
    };
    __decorate([
        core_1.ViewChild(course_syllabus_dialog_component_1.CourseSyllabusDialog),
        __metadata("design:type", course_syllabus_dialog_component_1.CourseSyllabusDialog)
    ], UserDashboardComponent.prototype, "syllabusDialog", void 0);
    __decorate([
        core_1.ViewChild(exam_content_dialog_component_1.ExamContentDialog),
        __metadata("design:type", exam_content_dialog_component_1.ExamContentDialog)
    ], UserDashboardComponent.prototype, "examContentDialog", void 0);
    __decorate([
        core_1.ViewChild(exam_study_dialog_component_1.ExamStudyDialog),
        __metadata("design:type", exam_study_dialog_component_1.ExamStudyDialog)
    ], UserDashboardComponent.prototype, "examStudyDialog", void 0);
    __decorate([
        core_1.ViewChild(survey_study_dialog_component_1.SurveyStudyDialog),
        __metadata("design:type", survey_study_dialog_component_1.SurveyStudyDialog)
    ], UserDashboardComponent.prototype, "surveyStudyDialog", void 0);
    __decorate([
        core_1.ViewChild(course_publish_dialog_component_1.CoursePublishDialog),
        __metadata("design:type", course_publish_dialog_component_1.CoursePublishDialog)
    ], UserDashboardComponent.prototype, "publisiDialog", void 0);
    UserDashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-dashboard',
            template: "<p-tabView [style]=\"{width: '100%'}\">     <p-tabPanel header=\"{{'Calendar'|translate}}\" leftIcon=\"ui-icon-date-range\">         <div style=\"text-align:center\">             <p-schedule #lmsSchedule [events]=\"events\" [editable]=\"true\" styleClass=\"schedule-dashboard\" [header]=\"header\" [height]=\"640\"></p-schedule>         </div>     </p-tabPanel>     <p-tabPanel header=\"{{'Recent course'|translate}}\" leftIcon=\"ui-icon-school\">         <div class=\"ui-g user-dashboard\">             <div class=\"ui-lg-12 ui-g-12 dashboard-courses-list\">                 <div class=\"ui-lg-3 ui-md-6 ui-g-12 image-box card-course\" *ngFor=\"let course of courses | slice:0:4\">                     <div class=\"card\">                         <div class=\"course-card-header\">                             <img [ngClass]=\"{'display-none' : !course.logo}\" [src]='course.logo | imageBase64' height=\"180\" width=\"100%\" />                             <img *ngIf=\"!course.logo\" src=\"assets/images/logo/logo-course.jpg\" height=\"180\" width=\"100%\">                         </div>                         <div class=\"image-box-content\">                             <h4 class=\"title\">{{course.name}}</h4>                             <span class=\"image-box-tag\">{{COURSE_MODE[course.mode]}}</span>                             <p class=\"summary\">{{course.summary}}</p>                             <ul class=\"list-cmt\">                                 <li class=\"clearfix\">                                     <ng-container *ngIf=\"!course.IsAvailable\">                                         <i class=\"material-icons fail\">error</i>                                         <span class=\"cmt-title\">{{'Course not available'|translate}}</span>                                     </ng-container>                                     <ng-container *ngIf=\"course.IsAvailable\">                                         <i class=\"material-icons success\">check</i>                                         <span class=\"cmt-title\">{{'Course is available'|translate}}</span>                                     </ng-container>                                 </li>                                 <li class=\"clearfix\">                                     <i class=\"material-icons\">toys</i>                                     <span class=\"cmt-title\">{{'Code'|translate}}</span>                                     <span class=\"cmt-detail\">{{course.code}}</span>                                 </li>                                 <li class=\"clearfix\" style=\"border-bottom: none;\">                                     <i class=\"material-icons\">toc</i>                                     <span class=\"cmt-title\">{{'Group'|translate}}</span>                                     <span class=\"cmt-detail\">{{course.group_id__DESC__}}</span>                                 </li>                             </ul>                         </div>                         <div class=\"image-box-footer\">                             <button pButton type=\"button\" icon=\"ui-icon-arrow-forward\" title=\"{{'Join'| translate}}\" label=\"{{'Join'|translate}}\" class=\"mr4 mb6 green-btn\" (click)=\"studyCourse(course, course.student)\" *ngIf=\"course.student!=null\" [disabled]=\"! course.IsAvailable\"></button>                             <button pButton type=\"button\" icon=\"ui-icon-visibility\" title=\"{{'View'| translate}}\" label=\"{{'View'|translate}}\" class=\"mr4 mb6 blue-grey-btn\" (click)=\"viewCourse(course)\" *ngIf=\"course.teacher!=null\"></button>                             <button pButton type=\"button\" icon=\"ui-icon-publish\" title=\"{{'Publish'| translate}}\" label=\"{{'Publish'|translate}}\" class=\"mr4 mb6 blue-grey-btn\" (click)=\"publishCourse(course)\" *ngIf=\"course.supervisor!=null\"></button>                             <button pButton type=\"button\" icon=\"ui-icon-edit\" title=\"{{'Edit course'| translate}}\" label=\"{{'Edit'|translate}}\" class=\"mr4 mb6 blue-grey-btn\" (click)=\"editSyllabus(course, course.editor)\" *ngIf=\"course.editor!=null\"></button>                             <button pButton type=\"button\" icon=\"ui-icon-supervisor-account\" title=\"{{'Manage course'| translate}}\" label=\"{{'Manage'|translate}}\" class=\"mr4 mb6 orange-btn\" (click)=\"manageCourse(course, course.teacher)\" *ngIf=\"course.teacher !=null \" [disabled]=\"!course.IsAvailable\"></button>                         </div>                     </div>                 </div>             </div>         </div>     </p-tabPanel>     <p-tabPanel header=\"{{'Recent exam'|translate}}\" leftIcon=\"ui-icon-grade\">         <div class=\"ui-g user-dashboard\">             <div class=\"ui-lg-12 ui-g-12 dashboard-exam-list\">                 <div class=\"ui-lg-3 ui-md-6 ui-g-12 image-box card-exam\" *ngFor=\"let exam of exams | slice:0:4\">                     <div class=\"card\">                         <div class=\"exam-card-header\">                             <img src=\"assets/layout/images/dashboard/usercard.png\" library=\"serenity-layout\" width=\"100\" height=\"60\" />                         </div>                         <div class=\"exam-card-content image-box-content\">                             <div class=\"exam-card-name\">                                 <span>{{exam.name}}</span>                             </div>                             <div class=\"exam-detail\">                                 <ul class=\"list-cmt\">                                     <li class=\"clearfix\">                                         <i class=\"material-icons\">date_range</i>                                         <span class=\"cmt-title\">{{'Start date'|translate}}</span>                                         <span class=\"cmt-detail\">{{exam.start | date : \"dd/MM/yyyy\"}}</span>                                     </li>                                     <li class=\"clearfix\">                                         <i class=\"material-icons\">date_range</i>                                         <span class=\"cmt-title\">{{'End date'|translate}}</span>                                         <span class=\"cmt-detail\">{{exam.end | date : \"dd/MM/yyyy\"}}</span>                                     </li>                                     <li class=\"clearfix\">                                         <i class=\"material-icons\">alarm</i>                                         <span class=\"cmt-title\">{{'Duration (mintes)'|translate}}</span>                                         <span class=\"cmt-detail\">{{exam.duration}}</span>                                     </li>                                     <li class=\"clearfix\">                                         <i class=\"material-icons\">done</i>                                         <span class=\"cmt-title\">{{'Number of question'|translate}}</span>                                         <span class=\"cmt-detail\">{{exam.question_count}}</span>                                     </li>                                 </ul>                             </div>                         </div>                         <div class=\"user-card-footer\">                             <button pButton type=\"button\" icon=\"ui-icon-arrow-forward\" title=\"{{'Join'| translate}}\" label=\"{{'Join'|translate}}\" class=\"green-btn mr4\" (click)=\"startExam(exam, exam.candidate)\" *ngIf=\"exam.candidate !=null\" [disabled]=\"!exam.IsAvailable || exam.candidate.enroll_status=='completed'\"></button>                             <button pButton type=\"button\" icon=\"ui-icon-publish\" title=\"{{'Publish'| translate}}\" label=\"{{'Publish'|translate}}\" class=\"mr4 blue-grey-btn\" (click)=\"publishExam(exam)\" *ngIf=\"exam.supervisor!=null && exam.sheet_status!='published'\"></button>                             <button pButton type=\"button\" icon=\"ui-icon-publish\" title=\"{{'Unpublish'| translate}}\" label=\"{{'Unpublish'|translate}}\" class=\"mr4 red-btn\" (click)=\"unpublishExam(exam)\" *ngIf=\"exam.supervisor!=null && exam.sheet_status!='unpublished'\"></button>                             <button pButton type=\"button\" icon=\"ui-icon-edit\" title=\"{{'Edit content'| translate}}\" label=\"{{'Edit'|translate}}\" class=\"blue-grey-btn mr4\" (click)=\"editExamContent(exam)\" *ngIf=\"exam.editor != null\"></button>                             <button pButton type=\"button\" icon=\"ui-icon-star\" title=\"{{'Manage exam'| translate}}\" label=\"{{'Manage'|translate}}\" class=\"orange-btn mr4\" (click)=\"manageExam(exam, exam.supervisor)\" *ngIf=\"exam.supervisor !=null\"></button>                         </div>                     </div>                 </div>             </div>         </div>     </p-tabPanel>     <p-tabPanel header=\"{{'Live conference'|translate}}\" leftIcon=\"ui-icon-call\">         <div class=\"ui-g user-dashboard\">             <div class=\"ui-lg-12 ui-g-12 dashboard-live-conference\">                 <div class=\"ui-lg-3 ui-md-6 ui-g-12\" *ngFor=\"let member of conferenceMembers | slice:0:4; let i = index \">                     <div class=\"task-box task-box-{{i%4 +1}}\">                         <div class=\"task-box-header\">                             <span class=\"task-status\">{{CONFERENCE_STATUS[member.conference.status] | translate}}</span>                         </div>                         <div class=\"task-box-content\">                             <h4>{{member.conference.name}}</h4>                             <p class=\"mb10\">{{'Room password'|translate}} {{':'+member.conference.room_pass}}                             </p>                         </div>                         <div class=\"task-box-footer\">                             <button pButton type=\"button \" label=\"{{ 'Join'|translate}} \" class=\"btn-footer\" icon=\"ui-icon-call \" (click)=\"joinConference(member.conference, member) \" [disabled]=\"member.conference.status!='open'\"></button>                         </div>                     </div>                 </div>             </div>         </div>     </p-tabPanel> </p-tabView> <exam-content-dialog></exam-content-dialog> <exam-study-dialog></exam-study-dialog> <course-publish-dialog></course-publish-dialog>",
            styles: [".mrg-bt{margin-bottom:15px}.list-cmt{padding-left:0;margin-bottom:0;margin-top:0}.list-cmt li{list-style:none;padding:10px 14px;border-bottom:1px solid #dbdbdb}.list-cmt li i{font-size:24px;margin-right:8px;width:32px;vertical-align:middle}.list-cmt li .cmt-title{font-weight:700;margin-right:8px}.list-cmt li .cmt-detail{color:#283593;float:right}.profile-image-wrapper img{width:100%;border:1px solid #dbdbdb}.border{border-bottom:1px solid #dbdbdb}.heading-course{font-weight:600;color:#192fa9;float:left;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:5px 10px 0 0}.display-none{display:none}.search input{border:1px solid #bdbdbd;width:400px;border-bottom-left-radius:3px;border-top-left-radius:3px}.search button{border-bottom-left-radius:0;border-top-left-radius:0}.summary{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}h4.title{margin-top:0;margin-bottom:15px;font-weight:600}.exam-card-name{font-size:20px;color:#212121;position:absolute;top:-45px;margin-left:30px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.exam-card-content{background-color:#fff;position:relative}.user-card-footer{text-align:center;padding-bottom:10px}i.success{color:green}i.fail{color:red}"],
        }),
        __metadata("design:paramtypes", [meeting_service_1.MeetingService, router_1.Router])
    ], UserDashboardComponent);
    return UserDashboardComponent;
}(base_component_1.BaseComponent));
exports.UserDashboardComponent = UserDashboardComponent;

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
var base_component_1 = require("../../../shared/components/base/base.component");
var common_1 = require("@angular/common");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var course_unit_model_1 = require("../../../shared/models/elearning/course-unit.model");
var course_certificate_model_1 = require("../../../shared/models/elearning/course-certificate.model");
var log_model_1 = require("../../../shared/models/elearning/log.model");
var report_utils_1 = require("../../../shared/helpers/report.utils");
var time_pipe_1 = require("../../../shared/pipes/time.pipe");
var gradebook_dialog_component_1 = require("../gradebook/gradebook.dialog.component");
var base_model_1 = require("../../../shared/models/base.model");
var lms_profile_dialog_component_1 = require("../../course/lms-profile/lms-profile-dialog.component");
var router_1 = require("@angular/router");
var project_model_1 = require("../../../shared/models/elearning/project.model");
var exam_dialog_component_1 = require("../../../assessment/exam/exam-dialog/exam-dialog.component");
var project_manage_dialog_component_1 = require("../project-manage/project-manage.dialog.component");
var project_content_dialog_component_1 = require("../../../cms/project/content-dialog/project-content.dialog.component");
var exam_model_1 = require("../../../shared/models/elearning/exam.model");
var class_exam_enroll_dialog_component_1 = require("../class-exam-enroll/class-exam-enroll.dialog.component");
var exam_content_dialog_component_1 = require("../../../cms/exam/content-dialog/exam-content.dialog.component");
var survey_model_1 = require("../../../shared/models/elearning/survey.model");
var survey_dialog_component_1 = require("../../../assessment/survey/survey-dialog/survey-dialog.component");
var survey_content_dialog_component_1 = require("../../../cms/survey/content-dialog/survey-content.dialog.component");
var class_survey_enroll_dialog_component_1 = require("../class-survey-enroll/class-survey-enroll.dialog.component");
var survey_stats_dialog_component_1 = require("../../survey/survey-stats/survey-stats.dialog.component");
var class_member_activity_dialog_component_1 = require("../class-member-activity/class-member-activity.dialog.component");
var ClassManageComponent = (function (_super) {
    __extends(ClassManageComponent, _super);
    function ClassManageComponent(router, route, datePipe, timePipe) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.route = route;
        _this.datePipe = datePipe;
        _this.timePipe = timePipe;
        _this.PROJECT_STATUS = constants_1.PROJECT_STATUS;
        _this.COURSE_MEMBER_ENROLL_STATUS = constants_1.COURSE_MEMBER_ENROLL_STATUS;
        _this.EXAM_STATUS = constants_1.EXAM_STATUS;
        _this.SURVEY_STATUS = constants_1.SURVEY_STATUS;
        _this.reportUtils = new report_utils_1.ReportUtils();
        _this.viewModes = [
            { value: 'outline', title: 'Outline', icon: 'ui-icon-dehaze' },
            { value: 'detail', title: 'Detail', icon: 'ui-icon-apps' },
        ];
        _this.viewModes = _this.viewModes.map(function (viewMode) {
            return {
                label: viewMode.title,
                value: viewMode.value,
            };
        });
        _this.classSurveys = [];
        _this.classExams = [];
        return _this;
    }
    ClassManageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var courseId = +params['courseId'];
            var classId = +params['classId'];
            _this.memberId = +params['memberId'];
            _this.viewMode = "outline";
            _this.lmsProfileService.init(_this).subscribe(function () {
                _this.courseClass = _this.lmsProfileService.classById(classId);
                _this.course = _this.lmsProfileService.courseById(courseId);
                _this.classExams = _this.lmsProfileService.examsByClass(classId) || [];
                _this.classSurveys = _this.lmsProfileService.surveysByClass(classId) || [];
                _this.lmsProfileService.getClassContent(classId).subscribe(function (classContent) {
                    _this.projects = classContent["projects"];
                    base_model_1.BaseModel.bulk_search(_this, course_member_model_1.CourseMember.__api__listByClass(classId), course_certificate_model_1.Certificate.__api__listByClass(classId), log_model_1.CourseLog.__api__classActivity(classId))
                        .subscribe(function (jsonArr) {
                        _this.courseMembers = course_member_model_1.CourseMember.toArray(jsonArr[0]);
                        _this.certificates = course_certificate_model_1.Certificate.toArray(jsonArr[1]);
                        _this.logs = log_model_1.CourseLog.toArray(jsonArr[2]);
                        _this.lmsProfileService.getCourseContent(courseId).subscribe(function (courseContent) {
                            _this.courseUnits = courseContent["units"];
                            _this.loadMemberStats(_this.logs);
                        });
                    });
                });
            });
        });
    };
    ClassManageComponent.prototype.viewChart = function (record) {
        this.memberActivityChart.show(record);
    };
    ClassManageComponent.prototype.viewGradebook = function () {
        if (this.selectedRecord)
            this.gradebookDialog.show(this.selectedRecord);
    };
    ClassManageComponent.prototype.viewLMSProfile = function () {
        if (this.selectedRecord)
            this.lmsProfileDialog.show(this.selectedRecord);
    };
    ClassManageComponent.prototype.loadMemberStats = function (logs) {
        var _this = this;
        this.studentRecords = _.filter(this.courseMembers, function (member) {
            return member.role == 'student';
        });
        var totalUnit = this.course.unit_count;
        _.each(this.studentRecords, (function (record) {
            var certificate = _.find(_this.certificates, function (cert) {
                return cert.member_id == record["id"];
            });
            if (certificate)
                record["certificate"] = certificate.name;
            else
                record["certificate"] = '';
            var memberLogs = _.filter(logs, function (log) {
                return log.member_id == record["id"];
            });
            var result = _this.reportUtils.analyzeCourseMemberActivity(memberLogs);
            if (result[0])
                record["first_attempt"] = _this.datePipe.transform(result[0], constants_1.EXPORT_DATETIME_FORMAT);
            if (result[1])
                record["last_attempt"] = _this.datePipe.transform(result[1], constants_1.EXPORT_DATETIME_FORMAT);
            record["time_spent"] = _this.timePipe.transform(+result[2], 'min');
            if (totalUnit)
                record["completion"] = Math.floor(+result[3] * 100 / +totalUnit);
            else
                record["completion"] = 0;
            record["logs"] = memberLogs;
        }));
    };
    ClassManageComponent.prototype.checkUnitComplete = function (record, unit) {
        var log = _.find(record["logs"], function (log) {
            return log.res_model == course_unit_model_1.CourseUnit.Model && log.res_id == unit.id && log.code == 'COMPLETE_COURSE_UNIT';
        });
        if (log)
            return 'Finished';
        else
            return 'Unfinished';
    };
    ClassManageComponent.prototype.addProject = function () {
        var _this = this;
        var project = new project_model_1.Project();
        project.class_id = this.courseClass.id;
        project.course_id = this.courseClass.course_id;
        this.projectContentDialog.show(project);
        this.projectContentDialog.onCreateComplete.subscribe(function () {
            _this.lmsProfileService.addProject(project);
            _this.lmsProfileService.getClassContent(_this.courseClass.id).subscribe(function (content) {
                _this.projects = content["projects"];
            });
        });
    };
    ClassManageComponent.prototype.editProject = function () {
        this.projectContentDialog.show(this.selectedProject);
    };
    ClassManageComponent.prototype.deleteProject = function () {
        var _this = this;
        this.confirm(this.translateService.instant('Are you sure to delete?'), function () {
            _this.selectedProject.delete(_this).subscribe(function () {
                _this.success(_this.translateService.instant('Project deleted'));
                _this.lmsProfileService.removeProject(_this.selectedProject);
                _this.lmsProfileService.getClassContent(_this.courseClass.id).subscribe(function (content) {
                    _this.projects = content["projects"];
                });
            });
        });
    };
    ClassManageComponent.prototype.markProject = function () {
        this.projectManageDialog.show(this.selectedProject);
    };
    ClassManageComponent.prototype.addExam = function () {
        var _this = this;
        var exam = new exam_model_1.Exam();
        exam.is_public = false;
        exam.supervisor_id = this.ContextUser.id;
        exam.course_class_id = this.courseClass.id;
        this.examDialog.show(exam);
        this.examDialog.onCreateComplete.subscribe(function () {
            _this.lmsProfileService.addExam(exam).subscribe(function () {
                _this.classExams = _this.lmsProfileService.examsByClass(_this.courseClass.id) || [];
            });
        });
    };
    ClassManageComponent.prototype.editExam = function () {
        this.examDialog.show(this.selectedClassExam);
    };
    ClassManageComponent.prototype.enrollExam = function () {
        this.examEnrollDialog.show(this.selectedClassExam);
    };
    ClassManageComponent.prototype.manageExam = function () {
        var supervisor = this.lmsProfileService.getExamMemberByRole('supervisor', this.selectedClassExam.id);
        var teacher = this.lmsProfileService.getExamMemberByRole('teacher', this.selectedClassExam.id);
        if (supervisor || teacher)
            this.router.navigate(['/lms/exams/manage', this.selectedClassExam.id, supervisor.id]);
    };
    ClassManageComponent.prototype.editExamContent = function () {
        this.examContentDialog.show(this.selectedClassExam);
    };
    ClassManageComponent.prototype.enrollSurvey = function () {
        this.enrollDialog.show(this.selectedClassSurvey);
    };
    ClassManageComponent.prototype.addSurvey = function () {
        var _this = this;
        var survey = new survey_model_1.Survey();
        survey.is_public = false;
        survey.supervisor_id = this.ContextUser.id;
        survey.course_class_id = this.courseClass.id;
        this.surveyDialog.show(survey);
        this.surveyDialog.onCreateComplete.subscribe(function () {
            _this.lmsProfileService.addSurvey(survey).subscribe(function () {
                _this.classSurveys = _this.lmsProfileService.surveysByClass(_this.courseClass.id) || [];
            });
        });
    };
    ClassManageComponent.prototype.editSurvey = function () {
        this.surveyDialog.show(this.selectedClassSurvey);
    };
    ClassManageComponent.prototype.viewReportSurvey = function () {
        this.statsDialog.show(this.selectedClassSurvey);
    };
    ClassManageComponent.prototype.editSurveyContent = function () {
        this.surveyContentDialog.show(this.selectedClassSurvey);
    };
    __decorate([
        core_1.ViewChild(gradebook_dialog_component_1.GradebookDialog),
        __metadata("design:type", gradebook_dialog_component_1.GradebookDialog)
    ], ClassManageComponent.prototype, "gradebookDialog", void 0);
    __decorate([
        core_1.ViewChild(lms_profile_dialog_component_1.LMSProfileDialog),
        __metadata("design:type", lms_profile_dialog_component_1.LMSProfileDialog)
    ], ClassManageComponent.prototype, "lmsProfileDialog", void 0);
    __decorate([
        core_1.ViewChild(project_content_dialog_component_1.ProjectContentDialog),
        __metadata("design:type", project_content_dialog_component_1.ProjectContentDialog)
    ], ClassManageComponent.prototype, "projectContentDialog", void 0);
    __decorate([
        core_1.ViewChild(project_manage_dialog_component_1.ProjectManageDialog),
        __metadata("design:type", project_manage_dialog_component_1.ProjectManageDialog)
    ], ClassManageComponent.prototype, "projectManageDialog", void 0);
    __decorate([
        core_1.ViewChild(exam_dialog_component_1.ExamDialog),
        __metadata("design:type", exam_dialog_component_1.ExamDialog)
    ], ClassManageComponent.prototype, "examDialog", void 0);
    __decorate([
        core_1.ViewChild(class_exam_enroll_dialog_component_1.ClassExamEnrollDialog),
        __metadata("design:type", class_exam_enroll_dialog_component_1.ClassExamEnrollDialog)
    ], ClassManageComponent.prototype, "examEnrollDialog", void 0);
    __decorate([
        core_1.ViewChild(exam_content_dialog_component_1.ExamContentDialog),
        __metadata("design:type", exam_content_dialog_component_1.ExamContentDialog)
    ], ClassManageComponent.prototype, "examContentDialog", void 0);
    __decorate([
        core_1.ViewChild(survey_dialog_component_1.SurveyDialog),
        __metadata("design:type", survey_dialog_component_1.SurveyDialog)
    ], ClassManageComponent.prototype, "surveyDialog", void 0);
    __decorate([
        core_1.ViewChild(class_survey_enroll_dialog_component_1.ClassSurveyEnrollDialog),
        __metadata("design:type", class_survey_enroll_dialog_component_1.ClassSurveyEnrollDialog)
    ], ClassManageComponent.prototype, "enrollDialog", void 0);
    __decorate([
        core_1.ViewChild(survey_content_dialog_component_1.SurveyContentDialog),
        __metadata("design:type", survey_content_dialog_component_1.SurveyContentDialog)
    ], ClassManageComponent.prototype, "surveyContentDialog", void 0);
    __decorate([
        core_1.ViewChild(survey_stats_dialog_component_1.SurveyStatsDialog),
        __metadata("design:type", survey_stats_dialog_component_1.SurveyStatsDialog)
    ], ClassManageComponent.prototype, "statsDialog", void 0);
    __decorate([
        core_1.ViewChild(class_member_activity_dialog_component_1.ClassMemberActivityDialog),
        __metadata("design:type", class_member_activity_dialog_component_1.ClassMemberActivityDialog)
    ], ClassManageComponent.prototype, "memberActivityChart", void 0);
    ClassManageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'class-manage',
            template: "<div class=\"card card-w-title\">     <h1>{{'Class'|translate}}: {{courseClass.name}} </h1>         <p-tabView [style]=\"{width: '100%', height: '600px'}\">         <p-tabPanel header=\"{{'Student list'|translate}}\" leftIcon=\"ui-icon-people\">             <p-toolbar>                 <div class=\"ui-toolbar-group-left\">                     <button pButton type=\"button\" label=\"{{ 'Gradebook'|translate}}\" class=\"blue-grey-btn \" icon=\"ui-icon-visibility\" (click)=\"viewGradebook()\" *ngIf=\"selectedRecord\"></button>                     <button pButton type=\"button\" label=\"{{ 'Study history'|translate}}\" class=\"blue-grey-btn \" icon=\"ui-icon-visibility\" (click)=\"viewLMSProfile()\" *ngIf=\"selectedRecord\"></button>                 </div>                 <div class=\"ui-toolbar-group-right\">                     <p-selectButton [options]=\"viewModes\" [(ngModel)]=\"viewMode\"></p-selectButton>                 </div>             </p-toolbar>             <div [hidden]=\"viewMode=='detail'\">                 <p-table #outlineTable [value]=\"studentRecords\" [paginator]=\"true\" [rows]=\"10\" selectionMode=\"single\" [(selection)]=\"selectedRecord\" [responsive]=\"true\">                     <ng-template pTemplate=\"header\">                         <tr>                             <th [pSortableColumn]=\"'name'\">                                 {{'Name'|translate}}                                 <p-sortIcon [field]=\"'name'\"></p-sortIcon>                             </th>                             <th style=\"width: 15%\" [pSortableColumn]=\"'email'\">                                 {{'Email'|translate}}                                 <p-sortIcon [field]=\"'email'\"></p-sortIcon>                             </th>                             <th [pSortableColumn]=\"'group_id__DESC__'\">                                 {{'Group'|translate}}                                 <p-sortIcon [field]=\"'group_id__DESC__'\"></p-sortIcon>                             </th>                             <th [pSortableColumn]=\"'enroll_status'\">                                 {{'Enroll status'|translate}}                                 <p-sortIcon [field]=\"'enroll_status'\"></p-sortIcon>                             </th>                             <th>                                 {{'First attempt'|translate}}                             </th>                             <th>                                 {{'Last attempt'|translate}}                             </th>                             <th>                                 {{'Time spend'|translate}}                             </th>                             <th style=\"width: 8%\">                                 {{'Completion'|translate}}                             </th>                             <th>                                 {{'Certificate'|translate}}                             </th>                         </tr>                     </ng-template>                     <ng-template pTemplate=\"body\" let-record>                         <tr [pSelectableRow]=\"record\">                             <td>{{record.name}}</td>                             <td class=\"email\">{{record.email}}</td>                             <td>{{record.group_id__DESC__}}</td>                             <td>{{COURSE_MEMBER_ENROLL_STATUS[record.enroll_status]}} </td>                             <td>{{record.first_attempt}} </td>                             <td>{{record.last_attempt}} </td>                             <td>{{record.time_spent}} {{'minute'|translate}}</td>                             <td>{{record.completion}} %</td>                             <td>{{record.certificate}} </td>                         </tr>                     </ng-template>                     <ng-template pTemplate=\"summary\">                         {{'Total records'|translate}} : {{records?.length}}                     </ng-template>                 </p-table>             </div>             <div [hidden]=\"viewMode=='outline'\">                 <p-table #detailTable [value]=\"studentRecords\" [paginator]=\"true\" [rows]=\"10\" selectionMode=\"single\" [(selection)]=\"selectedRecord\" [responsive]=\"true\">                     <ng-template pTemplate=\"header\">                         <tr>                             <th [pSortableColumn]=\"'name'\">                                 {{'Name'|translate}}                                 <p-sortIcon [field]=\"'name'\"></p-sortIcon>                             </th>                             <th [pSortableColumn]=\"'group_id__DESC__'\">                                 {{'Group'|translate}}                                 <p-sortIcon [field]=\"'group_id__DESC__'\"></p-sortIcon>                             </th>                             <th *ngFor=\"let unit of courseUnits\">                                 {{unit.name}}                             </th>                             <th>                                 {{'Chart' | translate}}                             </th>                         </tr>                     </ng-template>                     <ng-template pTemplate=\"body\" let-record>                         <tr [pSelectableRow]=\"record\">                             <td>{{record.name}}</td>                             <td>{{record.group_id__DESC__}}</td>                             <td *ngFor=\"let unit of courseUnits\">{{checkUnitComplete(record,unit)}}</td>                             <td>                                 <button pButton type=\"button\" label=\"{{'Chart'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-timeline\" (click)=\"viewChart(record)\"></button>                             </td>                         </tr>                     </ng-template>                     <ng-template pTemplate=\"summary\">                         {{'Total records'|translate}} : {{records?.length}}                     </ng-template>                 </p-table>             </div>         </p-tabPanel>         <p-tabPanel header=\"{{'Project'|translate}}\" leftIcon=\"ui-icon-assignment\">             <p-toolbar>                 <div class=\"ui-toolbar-group-left\">                     <button pButton type=\"button\" label=\"{{'New'|translate}}\" class=\"green-btn\" (click)=\"addProject()\" icon=\"ui-icon-add\"></button>                     <button pButton type=\"button\" label=\"{{'Edit'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-mode-edit\" (click)=\"editProject()\" *ngIf=\"selectedProject\"></button>                     <button pButton type=\"button\" label=\"{{'Delete'|translate}}\" class=\"red-btn\" icon=\"ui-icon-delete\" (click)=\"deleteProject()\" *ngIf=\"selectedProject\"></button>                 </div>                 <div class=\"ui-toolbar-group-right\">                     <button pButton type=\"button \" label=\"{{ 'Mark'|translate}} \" class=\"blue-grey-btn \" icon=\"ui-icon-local-offer\" (click)=\"markProject()\" [disabled]=\"!selectedProject\"></button>                 </div>             </p-toolbar>             <p-table #examTable [value]=\"projects\" [paginator]=\"true\" [rows]=\"10\" selectionMode=\"single\" [(selection)]=\"selectedProject\" [responsive]=\"true\">                 <ng-template pTemplate=\"header\">                     <tr>                         <th [pSortableColumn]=\"'name'\">                             {{'Name'|translate}}                             <p-sortIcon [field]=\"'name'\"></p-sortIcon>                         </th>                         <th>                             {{'Start'|translate}}                         </th>                         <th>                             {{'End'|translate}}                         </th>                         <th [pSortableColumn]=\"'status'\">                             {{'Status'|translate}}                             <p-sortIcon [field]=\"'status'\"></p-sortIcon>                         </th>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"body\" let-project>                     <tr [pSelectableRow]=\"project\">                         <td>{{project.name}}</td>                         <td>{{project.start | date : \"dd/MM/yyyy\"}}</td>                         <td>{{project.end | date : \"dd/MM/yyyy\"}}</td>                         <td>{{PROJECT_STATUS[project.status] | translate}}</td>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"summary\">                     {{'Total records'|translate}} : {{projects?.length}}                 </ng-template>             </p-table>         </p-tabPanel>         <p-tabPanel header=\"{{'Exam'|translate}}\" leftIcon=\"ui-icon-grade\">             <p-toolbar>                 <div class=\"ui-toolbar-group-left\">                     <button pButton type=\"button\" label=\"{{'New'|translate}}\" class=\"green-btn\" (click)=\"addExam()\" icon=\"ui-icon-add\"></button>                     <button pButton type=\"button\" label=\"{{'Edit'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-mode-edit\" (click)=\"editExam()\" *ngIf=\"selectedClassExam\"></button>                     <button pButton type=\"button\" label=\"{{'Enroll'|translate}}\" class=\"green-btn\" icon=\"ui-icon-people\" (click)=\"enrollExam()\" *ngIf=\"selectedClassExam\"></button>                 </div>                 <div class=\"ui-toolbar-group-right\">                     <button pButton type=\"button\" icon=\"ui-icon-star\" title=\"{{'Manage'| translate}}\" *ngIf=\"selectedClassExam\" label=\"{{'Manage'|translate}}\" (click)=\"manageExam()\" class=\"orange-btn\">                     </button>                 </div>             </p-toolbar>             <p-table #examTable [value]=\"classExams\" [paginator]=\"true\" [rows]=\"10\" selectionMode=\"single\" [(selection)]=\"selectedClassExam\" [responsive]=\"true\">                 <ng-template pTemplate=\"header\">                     <tr>                         <th [pSortableColumn]=\"'name'\">                             {{'Name'|translate}}                             <p-sortIcon [field]=\"'name'\"></p-sortIcon>                         </th>                         <th>                             {{'Start'|translate}}                         </th>                         <th>                             {{'End'|translate}}                         </th>                         <th [pSortableColumn]=\"'status'\">                             {{'Status'|translate}}                             <p-sortIcon [field]=\"'status'\"></p-sortIcon>                         </th>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"body\" let-exam>                     <tr [pSelectableRow]=\"exam\">                         <td>{{exam.name}}</td>                         <td>{{exam.start | date : \"dd/MM/yyyy\"}}</td>                         <td>{{exam.end | date : \"dd/MM/yyyy\"}}</td>                         <td>{{EXAM_STATUS[exam.status] | translate}}</td>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"summary\">                     {{'Total records'|translate}} : {{classExams?.length}}                 </ng-template>             </p-table>         </p-tabPanel>         <p-tabPanel header=\"{{'Survey'|translate}}\" leftIcon=\"ui-icon-question-answer\">             <p-toolbar>                 <div class=\"ui-toolbar-group-left\">                     <button pButton type=\"button\" label=\"{{'New'|translate}}\" class=\"green-btn\" (click)=\"addSurvey()\" icon=\"ui-icon-add\"></button>                     <button pButton type=\"button\" label=\"{{'Edit'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-mode-edit\" (click)=\"editSurvey()\" *ngIf=\"selectedClassSurvey\"></button>                     <button pButton type=\"button\" label=\"{{'Compose'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-mode-edit\" (click)=\"editSurveyContent()\" *ngIf=\"selectedClassSurvey\"></button>                 </div>                 <div class=\"ui-toolbar-group-right\">                     <button pButton type=\"button\" label=\"{{'Enroll'|translate}}\" class=\"green-btn\" icon=\"ui-icon-people\" (click)=\"enrollSurvey()\" *ngIf=\"selectedClassSurvey\"></button>                     <button pButton type=\"button\" icon=\"ui-icon-data-usage\" title=\"{{'Stats'| translate}}\" *ngIf=\"selectedClassSurvey\" label=\"{{'Statistics'|translate}}\" (click)=\"viewReportSurvey()\" class=\"blue-grey-btn\">                     </button>                 </div>             </p-toolbar>             <p-table #examTable [value]=\"classSurveys\" [paginator]=\"true\" [rows]=\"10\" selectionMode=\"single\" [(selection)]=\"selectedClassSurvey\" [responsive]=\"true\">                 <ng-template pTemplate=\"header\">                     <tr>                         <th [pSortableColumn]=\"'name'\">                             {{'Name'|translate}}                             <p-sortIcon [field]=\"'name'\"></p-sortIcon>                         </th>                         <th>                             {{'Start'|translate}}                         </th>                         <th>                             {{'End'|translate}}                         </th>                         <th [pSortableColumn]=\"'status'\">                             {{'Status'|translate}}                             <p-sortIcon [field]=\"'status'\"></p-sortIcon>                         </th>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"body\" let-survey>                     <tr [pSelectableRow]=\"survey\">                         <td>{{survey.name}}</td>                         <td>{{survey.start | date : \"dd/MM/yyyy\"}}</td>                         <td>{{survey.end | date : \"dd/MM/yyyy\"}}</td>                         <td>{{SURVEY_STATUS[survey.status] | translate}}</td>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"summary\">                     {{'Total records'|translate}} : {{classSurveys?.length}}                 </ng-template>                 <ng-template pTemplate=\"emptymessage\">                     <tr>                         <td [attr.colspan]=\"4\">                             {{'No records found'|translate}}                         </td>                     </tr>                 </ng-template>             </p-table>         </p-tabPanel>     </p-tabView>     <lms-profile-dialog></lms-profile-dialog>     <gradebook-dialog></gradebook-dialog>     <project-manage-dialog></project-manage-dialog>     <project-content-dialog></project-content-dialog>     <exam-dialog></exam-dialog>     <class-exam-enroll-dialog></class-exam-enroll-dialog>     <exam-content-dialog></exam-content-dialog>     <survey-dialog></survey-dialog>     <survey-content-dialog></survey-content-dialog>     <class-survey-enroll-dialog></class-survey-enroll-dialog>     <survey-stats-dialog></survey-stats-dialog>     <class-member-activity-dialog></class-member-activity-dialog> </div>",
            styles: [".email{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"],
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, common_1.DatePipe, time_pipe_1.TimeConvertPipe])
    ], ClassManageComponent);
    return ClassManageComponent;
}(base_component_1.BaseComponent));
exports.ClassManageComponent = ClassManageComponent;

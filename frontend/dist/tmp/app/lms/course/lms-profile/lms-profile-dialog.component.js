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
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var course_certificate_model_1 = require("../../../shared/models/elearning/course-certificate.model");
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var certificate_print_dialog_component_1 = require("../../../lms/course/certificate-print/certificate-print.dialog.component");
var base_model_1 = require("../../../shared/models/base.model");
var achievement_model_1 = require("../../../shared/models/elearning/achievement.model");
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var submission_model_1 = require("../../../shared/models/elearning/submission.model");
var exam_grade_model_1 = require("../../../shared/models/elearning/exam-grade.model");
var excel_service_1 = require("../../../shared/services/excel.service");
var LMSProfileDialog = (function (_super) {
    __extends(LMSProfileDialog, _super);
    function LMSProfileDialog(excelService) {
        var _this = _super.call(this) || this;
        _this.excelService = excelService;
        _this.COURSE_MEMBER_ENROLL_STATUS = constants_1.COURSE_MEMBER_ENROLL_STATUS;
        _this.EXAM_MEMBER_ENROLL_STATUS = constants_1.EXAM_MEMBER_ENROLL_STATUS;
        _this.courseMembers = [];
        _this.skills = [];
        _this.examMembers = [];
        return _this;
    }
    LMSProfileDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            _this.courseMembers = [];
            _this.skills = [];
            _this.examMembers = [];
            base_model_1.BaseModel
                .bulk_search(_this, course_member_model_1.CourseMember.__api__listByUser(object.user_id), course_certificate_model_1.Certificate.__api__listByUser(object.user_id), achievement_model_1.Achivement.__api__listByUser(object.user_id), exam_member_model_1.ExamMember.__api__listByUser(object.user_id), submission_model_1.Submission.__api__listByUser(object.user_id))
                .subscribe(function (jsonArr) {
                _this.courseMembers = course_member_model_1.CourseMember.toArray(jsonArr[0]);
                _this.certificates = course_certificate_model_1.Certificate.toArray(jsonArr[1]);
                _this.skills = achievement_model_1.Achivement.toArray(jsonArr[2]);
                _this.examMembers = exam_member_model_1.ExamMember.toArray(jsonArr[3]);
                var submits = submission_model_1.Submission.toArray(jsonArr[4]);
                _this.displayExams(submits);
                _this.displayCourseHistory();
                _this.displaySkills();
            });
        });
    };
    LMSProfileDialog.prototype.displayCourseHistory = function () {
        var _this = this;
        this.courseMembers = _.filter(this.courseMembers, function (member) {
            return member.role == 'student';
        });
        _.each(this.courseMembers, function (member) {
            member["certificate"] = _.find(_this.certificates, function (cert) {
                return cert.member_id == member.id;
            });
        });
    };
    LMSProfileDialog.prototype.displaySkills = function () {
        this.skills.sort(function (s1, s2) {
            return s1.date_acquire.getTime() - s2.date_acquire.getTime();
        });
    };
    LMSProfileDialog.prototype.displayExams = function (submits) {
        var _this = this;
        this.examMembers = _.filter(this.examMembers, function (member) {
            return (member.exam_id && member.status == 'active' && member.role == 'candidate');
        });
        this.examMembers.sort(function (member1, member2) {
            return (member1.exam.create_date < member1.exam.create_date);
        });
        var examIds = _.pluck(this.examMembers, 'exam_id');
        exam_grade_model_1.ExamGrade.listByExams(this, examIds).subscribe(function (grades) {
            _.each(_this.examMembers, function (member) {
                var examGrades = _.filter(grades, function (grade) {
                    return grade.exam_id == member.exam_id;
                });
                member["submit"] = _.find(submits, function (submit) {
                    return submit.member_id == member.id && submit.exam_id == member.exam_id;
                });
                if (member["submit"]) {
                    member["score"] = member["submit"].score;
                    member["grade"] = exam_grade_model_1.ExamGrade.gradeScore(examGrades, member["score"]);
                }
                else
                    member["score"] = '';
            });
        });
    };
    LMSProfileDialog.prototype.printCertificate = function (certificate) {
        this.certPrintDialog.show(certificate);
    };
    LMSProfileDialog.prototype.exportCourse = function () {
        var output = _.map(this.courseMembers, function (courseMember) {
            return {
                'Course': courseMember['course_name'], 'Register date': courseMember['date_register'], 'Enrollment status': courseMember['enroll_status'], 'Certificate': courseMember['certificate'] ? 'Yes' : 'No'
            };
        });
        this.excelService.exportAsExcelFile(output, 'course_history_report');
    };
    LMSProfileDialog.prototype.exportExam = function () {
        var output = _.map(this.examMembers, function (examMember) {
            return { 'Exam': examMember['exam_name'], 'Register date': examMember['date_register'], 'Enrollment status': examMember['enroll_status'], 'Grade': examMember['grade'] ? examMember['grade'].name : '' };
        });
        this.excelService.exportAsExcelFile(output, 'exam_history_report');
    };
    LMSProfileDialog.prototype.exportSkill = function () {
        var output = _.map(this.skills, function (skill) {
            return { 'Competency': skill['competency_name'], 'Level': skill['competency_level_name'], 'Date acquired': skill['date_acquire'] };
        });
        this.excelService.exportAsExcelFile(output, 'skill_report');
    };
    __decorate([
        core_1.ViewChild(certificate_print_dialog_component_1.CertificatePrintDialog),
        __metadata("design:type", certificate_print_dialog_component_1.CertificatePrintDialog)
    ], LMSProfileDialog.prototype, "certPrintDialog", void 0);
    LMSProfileDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'lms-profile-dialog',
            template: "<form novalidate (ngSubmit)=\"save()\" #f=\"ngForm\" autocomplete=\"off\">   <p-dialog header=\"{{'User profile'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"1000\" [responsive]=\"true\" [positionTop]=\"20\"     appendTo=\"body\">     <div class=\"spinner\" [hidden]=\"!loading\"></div>     <p-tabView styleClass=\"profile-dialog\">       <p-tabPanel header=\"{{'Course history'|translate}}\" leftIcon=\"ui-icon-school\" [style]=\"{width: '100%', height: '430px'}\">         <p-table [value]=\"courseMembers\">           <ng-template pTemplate=\"header\">             <tr>               <th>{{'Course'|translate}}</th>               <th>{{'Register date'|translate}}</th>               <th>{{'Enrollment status'|translate}}</th>               <th>{{'Certificate'|translate}}</th>               <th>                 <button pButton type=\"button\" label=\"{{'Export course'|translate}}\" class=\"purple-btn\" icon=\"ui-icon-file-download\" (click)=\"exportCourse()\"></button>               </th>             </tr>           </ng-template>           <ng-template pTemplate=\"body\" let-member>             <tr>               <td>{{member.course_name}}</td>               <td>{{member.date_register}}</td>               <td>{{COURSE_MEMBER_ENROLL_STATUS[member.enroll_status] | translate}}</td>               <td>                 <a style=\"cursor: pointer; color: seagreen\" *ngIf=\"member.certificate\" (click)=\"printCertificate(member.certificate)\">{{'Print'|translate}}</a>               </td>             </tr>           </ng-template>         </p-table>       </p-tabPanel>        <p-tabPanel header=\"{{'Exam history'|translate}}\" leftIcon=\"ui-icon-grade\" [style]=\"{width: '100%', height: '430px'}\">         <p-table [value]=\"examMembers\">           <ng-template pTemplate=\"header\">             <tr>               <th>{{'Exam'|translate}}</th>               <th>{{'Register date'|translate}}</th>               <th>{{'Enrollment status'|translate}}</th>               <th>{{'Grade'|translate}}</th>               <th>                 <button pButton type=\"button\" label=\"{{'Export exam'|translate}}\" class=\"purple-btn\" icon=\"ui-icon-file-download\" (click)=\"exportExam()\"></button>               </th>             </tr>           </ng-template>           <ng-template pTemplate=\"body\" let-member>             <tr>               <td>{{member.exam_name}}</td>               <td>{{member.date_register}}</td>               <td>{{EXAM_MEMBER_ENROLL_STATUS[member.enroll_status] | translate}}</td>               <td>{{member.grade?.name}}</td>             </tr>           </ng-template>         </p-table>       </p-tabPanel>         <p-tabPanel header=\"{{'Skill'|translate}}\" leftIcon=\"ui-icon-linear-scale\" [style]=\"{width: '100%', height: '430px'}\">         <p-table [value]=\"skills\">           <ng-template pTemplate=\"header\">             <tr>               <th>{{'Competency'|translate}}</th>               <th>{{'Level'|translate}}</th>               <th>{{'Date acquired'|translate}}</th>               <th>                 <button pButton type=\"button\" label=\"{{'Export skill'|translate}}\" class=\"purple-btn\" icon=\"ui-icon-file-download\" (click)=\"exportSkill()\"></button>               </th>             </tr>           </ng-template>           <ng-template pTemplate=\"body\" let-skill>             <tr>               <td>{{skill.competency_name}}</td>               <td>{{skill.competency_level_name}}</td>               <td>{{skill.date_acquire}}</td>             </tr>           </ng-template>         </p-table>       </p-tabPanel>     </p-tabView>     <certificate-print-dialog></certificate-print-dialog>     <p-footer>       <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>     </p-footer>   </p-dialog> </form>",
            styles: [".form-group{max-height:450px}.mb25{margin-bottom:25px}"],
        }),
        __metadata("design:paramtypes", [excel_service_1.ExcelService])
    ], LMSProfileDialog);
    return LMSProfileDialog;
}(base_dialog_1.BaseDialog));
exports.LMSProfileDialog = LMSProfileDialog;

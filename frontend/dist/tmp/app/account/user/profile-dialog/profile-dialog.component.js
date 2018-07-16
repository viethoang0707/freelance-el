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
var group_model_1 = require("../../../shared/models/elearning/group.model");
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var course_certificate_model_1 = require("../../../shared/models/elearning/course-certificate.model");
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var _ = require("underscore");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var constants_1 = require("../../../shared/models/constants");
var certificate_print_dialog_component_1 = require("../../../lms/course/certificate-print/certificate-print.dialog.component");
var base_model_1 = require("../../../shared/models/base.model");
var achievement_model_1 = require("../../../shared/models/elearning/achievement.model");
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var submission_model_1 = require("../../../shared/models/elearning/submission.model");
var exam_grade_model_1 = require("../../../shared/models/elearning/exam-grade.model");
var UserProfileDialog = (function (_super) {
    __extends(UserProfileDialog, _super);
    function UserProfileDialog() {
        var _this = _super.call(this) || this;
        _this.COURSE_MEMBER_ENROLL_STATUS = constants_1.COURSE_MEMBER_ENROLL_STATUS;
        _this.EXAM_MEMBER_ENROLL_STATUS = constants_1.EXAM_MEMBER_ENROLL_STATUS;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        _this.courseMembers = [];
        _this.skills = [];
        _this.examMembers = [];
        return _this;
    }
    UserProfileDialog.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            this.object.group_id = this.selectedNode.data.id;
            this.object.group_id__DESC__ = this.selectedNode.data.name;
        }
    };
    UserProfileDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            _this.courseMembers = [];
            _this.skills = [];
            _this.examMembers = [];
            base_model_1.BaseModel
                .bulk_search(_this, group_model_1.Group.__api__listUserGroup(), course_member_model_1.CourseMember.__api__listByUser(object.id), course_certificate_model_1.Certificate.__api__listByUser(object.id), achievement_model_1.Achivement.__api__listByUser(object.id), exam_member_model_1.ExamMember.__api__listByUser(_this.ContextUser.id), submission_model_1.Submission.__api__listByUser(_this.ContextUser.id))
                .subscribe(function (jsonArr) {
                _this.groups = group_model_1.Group.toArray(jsonArr[0]);
                _this.courseMembers = course_member_model_1.CourseMember.toArray(jsonArr[1]);
                _this.certificates = course_certificate_model_1.Certificate.toArray(jsonArr[2]);
                _this.skills = achievement_model_1.Achivement.toArray(jsonArr[3]);
                _this.examMembers = exam_member_model_1.ExamMember.toArray(jsonArr[4]);
                var submits = submission_model_1.Submission.toArray(jsonArr[5]);
                _this.displayExams(submits);
                _this.displayGroupTree();
                _this.displayCourseHistory();
                _this.displaySkills();
            });
        });
    };
    UserProfileDialog.prototype.displayGroupTree = function () {
        this.tree = this.treeUtils.buildGroupTree(this.groups);
        if (this.object.group_id) {
            this.selectedNode = this.treeUtils.findTreeNode(this.tree, this.object.group_id);
        }
    };
    UserProfileDialog.prototype.displayCourseHistory = function () {
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
    UserProfileDialog.prototype.displaySkills = function () {
        this.skills.sort(function (s1, s2) {
            return s1.date_acquire.getTime() - s2.date_acquire.getTime();
        });
    };
    UserProfileDialog.prototype.displayExams = function (submits) {
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
    UserProfileDialog.prototype.printCertificate = function (certificate) {
        this.certPrintDialog.show(certificate);
    };
    __decorate([
        core_1.ViewChild(certificate_print_dialog_component_1.CertificatePrintDialog),
        __metadata("design:type", certificate_print_dialog_component_1.CertificatePrintDialog)
    ], UserProfileDialog.prototype, "certPrintDialog", void 0);
    UserProfileDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-profile-dialog',
            template: "<form novalidate (ngSubmit)=\"save()\" #f=\"ngForm\" autocomplete=\"off\">     <p-dialog header=\"{{'User profile'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"1000\" [responsive]=\"true\" [positionTop]=\"20\">         <div class=\"spinner\" [hidden]=\"!loading\"></div>         <p-tabView styleClass=\"profile-dialog\">             <p-tabPanel header=\"{{'Account info'|translate}}\" leftIcon=\"ui-icon-people\">                 <div class=\"ui-g ui-fluid form-group\">                     <div class=\"ui-g-4\">                         <label>{{'Avatar'|translate}}</label>                         <image-base64 [(src64)]=\"object.image\"></image-base64>                     </div>                     <div class=\"ui-g-8\">                         <label>{{'Parent group'|translate}}</label>                         <p-tree [value]=\"tree\" selectionMode=\"single\" [(selection)]=\"selectedNode\" (onNodeSelect)=\"nodeSelect($event)\"></p-tree>                     </div>                     <div class=\"ui-g-6 \">                         <span class=\"md-inputfield\">           <input type=\"text\" pInputText [(ngModel)]=\"object.name\" #name=\"ngModel\" name=\"name\" required>           <label>{{'Name'|translate}}</label>           <div *ngIf=\"name.invalid && (name.dirty || name.touched)\" class=\"ui-message ui-messages-error ui-corner-all\">             <div *ngIf=\"name.errors.required\">               {{'Name is required' | translate}}             </div>           </div>         </span>                     </div>                     <div class=\"ui-g-6\">                         <span class=\"md-inputfield\">                   <input type=\"text\" pInputText [(ngModel)]=\"object.login\" name=\"login\" [disabled]=\"true\">                   <label>{{'Login'|translate}}</label>                 </span>                     </div>                     <div class=\"ui-g-6\">                         <div class=\"mb10\" *ngIf=\"ContextUser.IsAdmin\">                             <p-checkbox name=\"admin\" binary=\"true\" label=\"{{'Admin user'|translate}}\" [(ngModel)]=\"object.is_admin\"></p-checkbox>                         </div>                         <div *ngIf=\"ContextUser.IsAdmin\">                             <p-checkbox name=\"banned\" binary=\"true\" label=\"{{'Banned from access'|translate}}\" [(ngModel)]=\"object.banned\"></p-checkbox>                         </div>                     </div>                 </div>             </p-tabPanel>             <p-tabPanel header=\"{{'Contact info'|translate}}\" leftIcon=\"ui-icon-phone\">                 <div class=\"ui-g ui-fluid form-group pt20\">                     <div class=\"ui-g-6\">                         <span class=\"md-inputfield\">               <input type=\"text\" pInputText [(ngModel)]=\"object.email\" name=\"email\" pKeyFilter=\"email\" [disabled]=\"true\">               <label>{{'Email'|translate}}</label>             </span>                     </div>                     <div class=\"ui-g-6\">                         <span class=\"md-inputfield\">               <input type=\"text\" pInputText [(ngModel)]=\"object.phone\" name=\"phone\">               <label>{{'Mobile'|translate}}</label>             </span>                     </div>                     <div class=\"ui-g-6\">                         <span class=\"md-inputfield\">           <input type=\"text\" pInputText [(ngModel)]=\"object.position\" #position=\"ngModel\" name=\"department\" required>           <label>{{'Position'|translate}}</label>         </span>                     </div>                     <div class=\"ui-g-6\">                         <label>{{'Gender'|translate}}</label>                         <p-radioButton name=\"gender\" value=\"male\" label=\"{{'Male'|translate}}\" [(ngModel)]=\"object.gender\" inputId=\"opt1\" #gender=\"ngModel\"></p-radioButton>                         <p-radioButton name=\"gender\" value=\"female\" label=\"{{'Female'|translate}}\" [(ngModel)]=\"object.gender\" inputId=\"opt2\"></p-radioButton>                     </div>                     <div *ngIf=\"gender.invalid\" class=\"ui-message ui-messages-error ui-corner-all\" style=\"margin-top: 10px;\">                         <div *ngIf=\"gender.errors.required\">                             {{'Gender is required' | translate}}                         </div>                     </div>                     <div class=\"ui-g-6\">                         <span class=\"md-inputfield\">           <p-calendar [(ngModel)]=\"object.dob\" #dob=\"ngModel\" name=\"dob\" [showIcon]=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\"             yearRange=\"1918:2099\" required=\"true\" dateFormat=\"dd/mm/yy\"></p-calendar>           <label>{{'Birthday'|translate}}</label>           <div *ngIf=\"dob.invalid\" class=\"ui-message ui-messages-error ui-corner-all\" style=\"margin: 10px 0 20px;\">             <div *ngIf=\"dob.errors.required\">               {{'Birthday is required' | translate}}             </div>           </div>         </span>                     </div>                 </div>             </p-tabPanel>             <p-tabPanel header=\"{{'Course history'|translate}}\" leftIcon=\"ui-icon-school\" [style]=\"{width: '100%', height: '430px'}\">                 <p-table [value]=\"courseMembers\">                     <ng-template pTemplate=\"header\">                         <tr>                             <th>{{'Course'|translate}}</th>                             <th>{{'Register date'|translate}}</th>                             <th>{{'Enrollment status'|translate}}</th>                             <th>{{'Certificate'|translate}}</th>                         </tr>                     </ng-template>                     <ng-template pTemplate=\"body\" let-member>                         <tr>                             <td>{{member.course_name}}</td>                             <td>{{member.date_register}}</td>                             <td>{{COURSE_MEMBER_ENROLL_STATUS[member.enroll_status] | translate}}</td>                             <td>                                 <a *ngIf=\"member.certificate\" (click)=\"printCertificate(member.certificate)\">{{'Print'|translate}}</a>                             </td>                         </tr>                     </ng-template>                 </p-table>             </p-tabPanel>             <p-tabPanel header=\"{{'Exam history'|translate}}\" leftIcon=\"ui-icon-grade\" [style]=\"{width: '100%', height: '430px'}\">                 <p-table [value]=\"examMembers\">                     <ng-template pTemplate=\"header\">                         <tr>                             <th>{{'Exam'|translate}}</th>                             <th>{{'Register date'|translate}}</th>                             <th>{{'Enrollment status'|translate}}</th>                             <th>{{'Grade'|translate}}</th>                         </tr>                     </ng-template>                     <ng-template pTemplate=\"body\" let-member>                         <tr>                             <td>{{member.exam_name}}</td>                             <td>{{member.date_register}}</td>                             <td>{{EXAM_MEMBER_ENROLL_STATUS[member.enroll_status] | translate}}</td>                             <td>{{member.grade}}</td>                         </tr>                     </ng-template>                 </p-table>             </p-tabPanel>             <p-tabPanel header=\"{{'Skill'|translate}}\" leftIcon=\"ui-icon-linear-scale\" [style]=\"{width: '100%', height: '430px'}\">                 <p-table [value]=\"skills\">                     <ng-template pTemplate=\"header\">                         <tr>                             <th>{{'Competency'|translate}}</th>                             <th>{{'Level'|translate}}</th>                             <th>{{'Date acquired'|translate}}</th>                         </tr>                     </ng-template>                     <ng-template pTemplate=\"body\" let-skill>                         <tr>                             <td>{{skill.competency_name}}</td>                             <td>{{skill.competency_level_name}}</td>                             <td>{{skill.date_acquire}}</td>                         </tr>                     </ng-template>                 </p-table>             </p-tabPanel>         </p-tabView>         <certificate-print-dialog></certificate-print-dialog>         <p-footer>             <button type=\"submit\" pButton icon=\"fa-check\" label=\"{{'Save'|translate}}\"></button>             <button type=\"button\" pButton icon=\"fa-close\" (click)=\"cancel()\" label=\"{{'Close'|translate}}\"></button>         </p-footer>     </p-dialog> </form>",
            styles: [".form-group{max-height:450px}.mb25{margin-bottom:25px}"],
        }),
        __metadata("design:paramtypes", [])
    ], UserProfileDialog);
    return UserProfileDialog;
}(base_dialog_1.BaseDialog));
exports.UserProfileDialog = UserProfileDialog;

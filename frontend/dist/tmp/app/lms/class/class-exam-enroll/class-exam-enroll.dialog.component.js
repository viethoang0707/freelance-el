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
var _ = require("underscore");
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var exam_model_1 = require("../../../shared/models/elearning/exam.model");
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var base_model_1 = require("../../../shared/models/base.model");
var ClassExamEnrollDialog = (function (_super) {
    __extends(ClassExamEnrollDialog, _super);
    function ClassExamEnrollDialog() {
        var _this = _super.call(this) || this;
        _this.display = false;
        _this.examMembers = [];
        _this.courseMembers = [];
        _this.exam = new exam_model_1.Exam();
        return _this;
    }
    ClassExamEnrollDialog.prototype.show = function (exam) {
        var _this = this;
        this.display = true;
        this.examMembers = [];
        this.courseMembers = [];
        this.exam = exam;
        base_model_1.BaseModel
            .bulk_search(this, course_member_model_1.CourseMember.__api__listByClass(exam.course_class_id), exam_member_model_1.ExamMember.__api__listByExam(exam.id))
            .subscribe(function (jsonArr) {
            var courseMembers = course_member_model_1.CourseMember.toArray(jsonArr[0]);
            _this.courseMembers = _.filter(courseMembers, function (member) {
                return member.role == 'student';
            });
            var examMembers = exam_member_model_1.ExamMember.toArray(jsonArr[1]);
            _this.examMembers = _.filter(examMembers, function (member) {
                return member.role == 'candidate';
            });
        });
    };
    ClassExamEnrollDialog.prototype.hide = function () {
        this.display = false;
    };
    ClassExamEnrollDialog.prototype.enrollAll = function () {
        var _this = this;
        var userIds = _.pluck(this.courseMembers, 'user_id');
        this.exam.enroll(this, userIds).subscribe(function () {
            exam_member_model_1.ExamMember.listByExam(_this, _this.exam.id).subscribe(function (members) {
                _this.examMembers = members;
            });
            _this.info('Register all successfully');
        });
    };
    ClassExamEnrollDialog.prototype.activateMember = function (member) {
        member.status = 'active';
        member.save(this).subscribe();
    };
    ClassExamEnrollDialog.prototype.suspendMember = function (member) {
        member.status = 'suspend';
        member.save(this).subscribe();
    };
    ClassExamEnrollDialog.prototype.closeExam = function () {
        var _this = this;
        this.confirm('Are you sure to proceed ?', function () {
            _this.exam.close(_this).subscribe(function () {
                _this.exam.status = 'closed';
                _this.success('Exam close');
            });
        });
    };
    ClassExamEnrollDialog.prototype.openExam = function () {
        var _this = this;
        this.confirm('Are you sure to proceed ? You will not be able to enroll students after the exam is opened', function () {
            _this.exam.open(_this).subscribe(function () {
                _this.exam.status = 'open';
                _this.success('Exam open');
            });
        });
    };
    ClassExamEnrollDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'class-exam-enroll-dialog',
            template: "<p-dialog header=\"{{'Class exam enroll'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"800\" [responsive]=\"true\" appendTo=\"body\">     <div class=\"spinner\" [hidden]=\"!loading\"></div>     <p-scrollPanel [style]=\"{width: '100%', height: '480px'}\">         <div class=\"ui-g-12 \">             <p-toolbar>                 <div class=\"ui-toolbar-group-left \">                     <button pButton type=\"button \" label=\"{{ 'Register all'|translate}} \" class=\"green-btn \" icon=\"ui-icon-lock-open\" (click)=\"enrollAll() \" *ngIf=\"examMembers.length==0\"></button>                 </div>                 <div class=\"ui-toolbar-group-right\">                      <button pButton type=\"button \" label=\"{{ 'Open'|translate}} \" class=\"green-btn \" icon=\"ui-icon-lock-open\" (click)=\"openExam() \" [disabled]=\" exam.status!='initial'\" ></button>                      <button pButton type=\"button \" label=\"{{ 'Close'|translate}} \" class=\"orange-btn \" icon=\"ui-icon-lock\" (click)=\"closeExam() \" [disabled]=\" exam.status=='closed'\" ></button>                 </div>             </p-toolbar>             <p-table #candidateTable [value]=\"examMembers\" [paginator]=\"true \" [rows]=\"10\" selectionMode=\"single\" [(selection)]=\"selectedMember \" [responsive]=\"true \" sortField=\"name\">                 <ng-template pTemplate=\"header\">                     <tr>                         <th [pSortableColumn]=\"'name'\">                             {{'Name'|translate}}                             <p-sortIcon [field]=\"'name'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'email'\">                             {{'Email'|translate}}                             <p-sortIcon [field]=\"'email'\"></p-sortIcon>                         </th>                         <th>{{'Phone'|translate}}</th>                         <th [pSortableColumn]=\"'group_id__DESC__'\">                             {{'Group'|translate}}                             <p-sortIcon [field]=\"'group_id__DESC__'\"></p-sortIcon>                         </th>                         <th>{{'Suspend/Activate'|translate}}</th>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"body\" let-member>                     <tr [pSelectableRow]=\"member \">                         <td>{{member.name}}</td>                         <td>{{member.email}}</td>                         <td>{{member.phone}}</td>                         <td>{{member.group_id__DESC__}}</td>                         <td>                             <button pButton type=\"button \" label=\"{{ 'Activate'|translate}} \" class=\"green-btn \" (click)=\"activateMember(member) \" *ngIf=\"member.status=='suspend'\"></button>                             <button pButton type=\"button \" label=\"{{ 'Suspend'|translate}} \" class=\"orange-btn \" icon=\"ui-icon-lock\" (click)=\"suspendMember(member) \" *ngIf=\"member.status=='active'\"></button>                         </td>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"summary\">                     {{'Total records'|translate}} : {{examMembers?.length}}                 </ng-template>             </p-table>         </div>     </p-scrollPanel>     <p-footer>         <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>     </p-footer> </p-dialog>",
        }),
        __metadata("design:paramtypes", [])
    ], ClassExamEnrollDialog);
    return ClassExamEnrollDialog;
}(base_component_1.BaseComponent));
exports.ClassExamEnrollDialog = ClassExamEnrollDialog;

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
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var course_model_1 = require("../../../shared/models/elearning/course.model");
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var select_user_dialog_component_1 = require("../../../shared/components/select-user-dialog/select-user-dialog.component");
var CourseEnrollDialog = (function (_super) {
    __extends(CourseEnrollDialog, _super);
    function CourseEnrollDialog() {
        var _this = _super.call(this) || this;
        _this.COURSE_MODE = constants_1.COURSE_MODE;
        _this.CONTENT_STATUS = constants_1.CONTENT_STATUS;
        _this.COURSE_MEMBER_ROLE = constants_1.COURSE_MEMBER_ROLE;
        _this.COURSE_MEMBER_STATUS = constants_1.COURSE_MEMBER_STATUS;
        _this.COURSE_MEMBER_ENROLL_STATUS = constants_1.COURSE_MEMBER_ENROLL_STATUS;
        _this.items = [
            { label: _this.translateService.instant('Student'), value: 'student', command: function () { _this.addStudent(); } },
            { label: _this.translateService.instant('Teacher'), value: 'teacher', command: function () { _this.addTeacher(); } },
        ];
        _this.course = new course_model_1.Course();
        return _this;
    }
    CourseEnrollDialog.prototype.enrollCourse = function (course) {
        this.course = course;
        this.courseClass = null;
        this.display = true;
        this.selectedStudents = [];
        this.selectedTeachers = [];
        this.loadMembers();
    };
    CourseEnrollDialog.prototype.enrollClass = function (course, courseClass) {
        this.course = course;
        this.courseClass = courseClass;
        this.display = true;
        this.selectedStudents = [];
        this.selectedTeachers = [];
        this.loadMembers();
    };
    CourseEnrollDialog.prototype.hide = function () {
        this.display = false;
    };
    CourseEnrollDialog.prototype.addStudent = function () {
        var _this = this;
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.first().subscribe(function (users) {
            var userIds = _.pluck(users, 'id');
            if (_this.course.mode == 'group')
                _this.courseClass.enroll(_this, userIds).subscribe(function (result) {
                    _this.loadMembers();
                    var failList = result['failList'];
                    _.each(failList, function (userId) {
                        var user = _.find(users, function (obj) {
                            return obj.id == userId;
                        });
                        _this.warn("User " + user.name + " does not meet course requirement");
                    });
                });
            if (_this.course.mode == 'self-study')
                _this.course.enroll(_this, userIds).subscribe(function (result) {
                    _this.loadMembers();
                    var failList = result['failList'];
                    _.each(failList, function (userId) {
                        var user = _.find(users, function (obj) {
                            return obj.id == userId;
                        });
                        _this.warn("User " + user.name + " does not meet course requirement");
                    });
                });
        });
    };
    CourseEnrollDialog.prototype.addTeacher = function () {
        var _this = this;
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.first().subscribe(function (users) {
            var userIds = _.pluck(users, 'id');
            if (_this.course.mode == 'group')
                _this.courseClass.enrollStaff(_this, userIds).subscribe(function (result) {
                    _this.loadMembers();
                    var failList = result['failList'];
                    _.each(failList, function (userId) {
                        var user = _.find(users, function (obj) {
                            return obj.id == userId;
                        });
                        _this.warn("User " + user.name + " does not meet course requirement");
                    });
                });
            if (_this.course.mode == 'self-study')
                _this.course.enrollStaff(_this, userIds).subscribe(function (result) {
                    _this.loadMembers();
                    var failList = result['failList'];
                    _.each(failList, function (userId) {
                        var user = _.find(users, function (obj) {
                            return obj.id == userId;
                        });
                        _this.warn("User " + user.name + " does not meet course requirement");
                    });
                });
        });
    };
    CourseEnrollDialog.prototype.deleteMembers = function (members) {
        var _this = this;
        if (members && members.length)
            this.confirm(this.translateService.instant('Are you sure to delete?'), function () {
                course_member_model_1.CourseMember.deleteArray(_this, members).subscribe(function () {
                    _this.selectedStudents = [];
                    _this.selectedTeachers = [];
                    _this.loadMembers();
                });
            });
    };
    CourseEnrollDialog.prototype.loadMembers = function () {
        var _this = this;
        if (this.course && !this.courseClass) {
            course_member_model_1.CourseMember.listByCourse(this, this.course.id).subscribe(function (members) {
                _this.students = _.filter(members, function (member) {
                    return member.role == 'student';
                });
                _this.selectedStudents = [];
                _this.teachers = _.filter(members, function (member) {
                    return member.role == 'teacher';
                });
                _this.selectedTeachers = [];
            });
        }
        if (this.courseClass && this.courseClass) {
            course_member_model_1.CourseMember.listByClass(this, this.courseClass.id).subscribe(function (members) {
                _this.students = _.filter(members, function (member) {
                    return member.role == 'student';
                });
                _this.selectedStudents = [];
                _this.teachers = _.filter(members, function (member) {
                    return member.role == 'teacher';
                });
                _this.selectedTeachers = [];
            });
        }
    };
    __decorate([
        core_1.ViewChild(select_user_dialog_component_1.SelectUsersDialog),
        __metadata("design:type", select_user_dialog_component_1.SelectUsersDialog)
    ], CourseEnrollDialog.prototype, "usersDialog", void 0);
    CourseEnrollDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-enrollment-dialog',
            template: "<p-dialog header=\"{{'Course enrollment'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"1200\" height=\"100%\" [responsive]=\"true\" appendTo=\"body\"> <div class=\"spinner\" [hidden]=\"!loading\"></div>   <p-scrollPanel [style]=\"{width: '100%', height: '460px'}\">     <p-tabView [style]=\"{width: '100%', height: '460px'}\">       <p-tabPanel header=\"{{'Students'|translate}}\" leftIcon=\"ui-icon-people\">         <div class=\"ui-g-12 \">           <p-toolbar>             <div class=\"ui-toolbar-group-left \">               <button pButton type=\"button \" label=\"{{ 'Add'|translate}} \" class=\"green-btn \" icon=\"ui-icon-add \" (click)=\"addStudent() \"></button>               <button pButton type=\"button \" label=\"{{ 'Delete'|translate}} \" class=\"red-btn \" icon=\"ui-icon-delete \" (click)=\"deleteMembers(selectedStudents) \" *ngIf=\"selectedStudents && selectedStudents.length \"></button>             </div>           </p-toolbar>           <p-table #studentTable [value]=\"students\" [paginator]=\"true \" [rows]=\"10\" selectionMode=\"multiple\" [(selection)]=\"selectedStudents \" [responsive]=\"true \" sortField=\"name\">             <ng-template pTemplate=\"header\">               <tr>                 <th style=\"width: 2.25em\">                   <p-tableHeaderCheckbox></p-tableHeaderCheckbox>                 </th>                 <th [pSortableColumn]=\"'name'\">                   {{'Name'|translate}}                   <p-sortIcon [field]=\"'name'\"></p-sortIcon>                 </th>                 <th width=\"250px\" [pSortableColumn]=\"'email'\">                   {{'Email'|translate}}                   <p-sortIcon [field]=\"'email'\"></p-sortIcon>                 </th>                 <th>{{'Phone'|translate}}</th>                 <th [pSortableColumn]=\"'group_id__DESC__'\">                   {{'Group'|translate}}                   <p-sortIcon [field]=\"'group_id__DESC__'\"></p-sortIcon>                 </th>                 <th [pSortableColumn]=\"'status'\">                   {{'Status'|translate}}                   <p-sortIcon [field]=\"'status'\"></p-sortIcon>                 </th>                 <th [pSortableColumn]=\"'enroll_status'\">                   {{'Enroll status'|translate}}                   <p-sortIcon [field]=\"'enroll_status'\"></p-sortIcon>                 </th>               </tr>             </ng-template>             <ng-template pTemplate=\"body\" let-member>               <tr [pSelectableRow]=\"member \">                 <td>                   <p-tableCheckbox [value]=\"member\"></p-tableCheckbox>                 </td>                 <td style=\"text-align: left;\">{{member.name}}</td>                 <td style=\"text-align: left;\" width=\"250px\">{{member.email}}</td>                 <td>{{member.phone}}</td>                 <td>{{member.group_id__DESC__}}</td>                 <td>{{COURSE_MEMBER_STATUS[member.status] | translate}}</td>                 <td>{{COURSE_MEMBER_ENROLL_STATUS[member.enroll_status] | translate}}</td>               </tr>             </ng-template>             <ng-template pTemplate=\"summary\">               {{'Total records'|translate}} : {{students?.length}}             </ng-template>           </p-table>         </div>       </p-tabPanel>       <p-tabPanel header=\"{{'Teachers'|translate}}\" leftIcon=\"ui-icon-people\">         <div class=\"ui-g-12 \">           <p-toolbar>             <div class=\"ui-toolbar-group-left \">               <button pButton type=\"button \" label=\"{{ 'Add'|translate}} \" class=\"green-btn \" icon=\"ui-icon-add \" (click)=\"addTeacher() \"></button>               <button pButton type=\"button \" label=\"{{ 'Delete'|translate}} \" class=\"red-btn \" icon=\"ui-icon-delete \" (click)=\"deleteMembers(selectedTeachers) \" *ngIf=\"selectedTeachers && selectedTeachers.length \"></button>             </div>           </p-toolbar>           <p-table #candidateTable [value]=\"teachers\" [paginator]=\"true \" [rows]=\"10\" selectionMode=\"multiple\" [(selection)]=\"selectedTeachers \" [responsive]=\"true \" sortField=\"name\">             <ng-template pTemplate=\"header\">               <tr>                 <th style=\"width: 2.25em\">                   <p-tableHeaderCheckbox></p-tableHeaderCheckbox>                 </th>                 <th [pSortableColumn]=\"'name'\">                   {{'Name'|translate}}                   <p-sortIcon [field]=\"'name'\"></p-sortIcon>                 </th>                 <th [pSortableColumn]=\"'email'\">                   {{'Email'|translate}}                   <p-sortIcon [field]=\"'email'\"></p-sortIcon>                 </th>                 <th>{{'Phone'|translate}}</th>                 <th [pSortableColumn]=\"'group_id__DESC__'\">                   {{'Group'|translate}}                   <p-sortIcon [field]=\"'group_id__DESC__'\"></p-sortIcon>                 </th>                 <th [pSortableColumn]=\"'status'\">                   {{'Status'|translate}}                   <p-sortIcon [field]=\"'status'\"></p-sortIcon>                 </th>               </tr>             </ng-template>             <ng-template pTemplate=\"body\" let-member>               <tr [pSelectableRow]=\"member \">                 <td>                   <p-tableCheckbox [value]=\"member\"></p-tableCheckbox>                 </td>                 <td>{{member.name}}</td>                 <td>{{member.email}}</td>                 <td>{{member.phone}}</td>                 <td>{{member.group_id__DESC__}}</td>                 <td>{{COURSE_MEMBER_STATUS[member.status]}}</td>               </tr>             </ng-template>             <ng-template pTemplate=\"summary\">               {{'Total records'|translate}} : {{members?.length}}             </ng-template>           </p-table>         </div>       </p-tabPanel>     </p-tabView>   </p-scrollPanel>   <select-user-dialog></select-user-dialog>   <p-footer>     <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>   </p-footer> </p-dialog>",
        }),
        __metadata("design:paramtypes", [])
    ], CourseEnrollDialog);
    return CourseEnrollDialog;
}(base_dialog_1.BaseDialog));
exports.CourseEnrollDialog = CourseEnrollDialog;

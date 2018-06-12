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
var Observable_1 = require("rxjs/Observable");
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var course_model_1 = require("../../../shared/models/elearning/course.model");
var course_class_model_1 = require("../../../shared/models/elearning/course-class.model");
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
            { label: _this.translateService.instant('Student'), value: 'student', command: function () { _this.addMembers('student'); } },
            { label: _this.translateService.instant('Teacher'), value: 'teacher', command: function () { _this.addMembers('teacher'); } },
        ];
        _this.course = new course_model_1.Course();
        return _this;
    }
    CourseEnrollDialog.prototype.enrollCourse = function (course) {
        this.course = course;
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
    CourseEnrollDialog.prototype.addMembers = function (role) {
        var _this = this;
        this.usersDialog.show();
        this.subscription = this.usersDialog.onSelectUsers.subscribe(function (users) {
            var userIds = _.pluck(users, 'id');
            course_class_model_1.CourseClass.enroll(_this.courseClass.id, userIds).subscribe(function (result) {
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
                var subscriptions = _.map(members, function (member) {
                    return member.delete(_this);
                });
                Observable_1.Observable.forkJoin.apply(Observable_1.Observable, subscriptions).subscribe(function () {
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
            templateUrl: 'enrollment-dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], CourseEnrollDialog);
    return CourseEnrollDialog;
}(base_dialog_1.BaseDialog));
exports.CourseEnrollDialog = CourseEnrollDialog;
//# sourceMappingURL=enrollment-dialog.component.js.map
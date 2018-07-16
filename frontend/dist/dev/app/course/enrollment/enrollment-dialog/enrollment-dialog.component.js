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
            templateUrl: 'enrollment-dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], CourseEnrollDialog);
    return CourseEnrollDialog;
}(base_dialog_1.BaseDialog));
exports.CourseEnrollDialog = CourseEnrollDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb3Vyc2UvZW5yb2xsbWVudC9lbnJvbGxtZW50LWRpYWxvZy9lbnJvbGxtZW50LWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBR3BFLDJFQUF5RTtBQUN6RSw4RUFBdUU7QUFJdkUsNEZBQW9GO0FBQ3BGLDhCQUFnQztBQUloQyw4REFHeUM7QUFDekMsMkhBQStHO0FBUS9HO0lBQXdDLHNDQUFrQjtJQW1CekQ7UUFBQSxZQUNDLGlCQUFPLFNBTVA7UUFiRCxpQkFBVyxHQUFHLHVCQUFXLENBQUM7UUFDMUIsb0JBQWMsR0FBRywwQkFBYyxDQUFDO1FBQ2hDLHdCQUFrQixHQUFHLDhCQUFrQixDQUFDO1FBQ3hDLDBCQUFvQixHQUFHLGdDQUFvQixDQUFDO1FBQzVDLGlDQUEyQixHQUFHLHVDQUEyQixDQUFDO1FBSXpELEtBQUksQ0FBQyxLQUFLLEdBQUc7WUFDWixFQUFFLEtBQUssRUFBRSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLGNBQVEsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFBLENBQUMsQ0FBQyxFQUFFO1lBQzNHLEVBQUUsS0FBSyxFQUFFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsY0FBUSxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUEsQ0FBQSxDQUFDLEVBQUU7U0FDMUcsQ0FBQTtRQUNELEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxxQkFBTSxFQUFFLENBQUM7O0lBQzVCLENBQUM7SUFFRCx5Q0FBWSxHQUFaLFVBQWEsTUFBYztRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FB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VyxrQkFBa0IsQ0FrSjlCO0lBQUQseUJBQUM7Q0FsSkQsQUFrSkMsQ0FsSnVDLHdCQUFVLEdBa0pqRDtBQWxKWSxnREFBa0IiLCJmaWxlIjoiYXBwL2NvdXJzZS9lbnJvbGxtZW50L2Vucm9sbG1lbnQtZGlhbG9nL2Vucm9sbG1lbnQtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgQmFzZURpYWxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5kaWFsb2cnO1xuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLm1vZGVsJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZUNsYXNzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLWNsYXNzLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZVN5bGxhYnVzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLXN5bGxhYnVzLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFRyZWVVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3RyZWUudXRpbHMnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBTZWxlY3RJdGVtLCBNZW51SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7XG5cdEdST1VQX0NBVEVHT1JZLCBDT05URU5UX1NUQVRVUywgQ09VUlNFX01PREUsIENPVVJTRV9NRU1CRVJfUk9MRSxcblx0Q09VUlNFX01FTUJFUl9TVEFUVVMsIENPVVJTRV9NRU1CRVJfRU5ST0xMX1NUQVRVU1xufSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IFNlbGVjdFVzZXJzRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0LXVzZXItZGlhbG9nL3NlbGVjdC11c2VyLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdjb3Vyc2UtZW5yb2xsbWVudC1kaWFsb2cnLFxuXHR0ZW1wbGF0ZVVybDogJ2Vucm9sbG1lbnQtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQ291cnNlRW5yb2xsRGlhbG9nIGV4dGVuZHMgQmFzZURpYWxvZzxDb3Vyc2U+IHtcblxuXHRwcml2YXRlIHNlbGVjdGVkU3R1ZGVudHM6IGFueTtcblx0cHJpdmF0ZSBzdHVkZW50czogQ291cnNlTWVtYmVyW107XG5cdHByaXZhdGUgc2VsZWN0ZWRUZWFjaGVyczogYW55O1xuXHRwcml2YXRlIHRlYWNoZXJzOiBDb3Vyc2VNZW1iZXJbXTtcblx0cHJpdmF0ZSBjb3Vyc2U6IENvdXJzZTtcblx0cHJpdmF0ZSBjb3Vyc2VDbGFzczogQ291cnNlQ2xhc3M7XG5cdHByaXZhdGUgaXRlbXM6IGFueVtdO1xuXHRwdWJsaWMgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cdHByaXZhdGUgcHJvY2Vzc2luZzogYm9vbGVhbjtcblx0QFZpZXdDaGlsZChTZWxlY3RVc2Vyc0RpYWxvZykgdXNlcnNEaWFsb2c6IFNlbGVjdFVzZXJzRGlhbG9nO1xuXG5cdENPVVJTRV9NT0RFID0gQ09VUlNFX01PREU7XG5cdENPTlRFTlRfU1RBVFVTID0gQ09OVEVOVF9TVEFUVVM7XG5cdENPVVJTRV9NRU1CRVJfUk9MRSA9IENPVVJTRV9NRU1CRVJfUk9MRTtcblx0Q09VUlNFX01FTUJFUl9TVEFUVVMgPSBDT1VSU0VfTUVNQkVSX1NUQVRVUztcblx0Q09VUlNFX01FTUJFUl9FTlJPTExfU1RBVFVTID0gQ09VUlNFX01FTUJFUl9FTlJPTExfU1RBVFVTO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5pdGVtcyA9IFtcblx0XHRcdHsgbGFiZWw6IHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdTdHVkZW50JyksIHZhbHVlOiAnc3R1ZGVudCcsIGNvbW1hbmQ6ICgpID0+IHsgdGhpcy5hZGRTdHVkZW50KCkgfSB9LFxuXHRcdFx0eyBsYWJlbDogdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ1RlYWNoZXInKSwgdmFsdWU6ICd0ZWFjaGVyJywgY29tbWFuZDogKCkgPT4geyB0aGlzLmFkZFRlYWNoZXIoKX0gfSxcblx0XHRdXG5cdFx0dGhpcy5jb3Vyc2UgPSBuZXcgQ291cnNlKCk7XG5cdH1cblxuXHRlbnJvbGxDb3Vyc2UoY291cnNlOiBDb3Vyc2UpIHtcblx0XHR0aGlzLmNvdXJzZSA9IGNvdXJzZTtcblx0XHR0aGlzLmNvdXJzZUNsYXNzID0gbnVsbDtcblx0XHR0aGlzLmRpc3BsYXkgPSB0cnVlO1xuXHRcdHRoaXMuc2VsZWN0ZWRTdHVkZW50cyA9IFtdO1xuXHRcdHRoaXMuc2VsZWN0ZWRUZWFjaGVycyA9IFtdO1xuXHRcdHRoaXMubG9hZE1lbWJlcnMoKTtcblx0fVxuXG5cdGVucm9sbENsYXNzKGNvdXJzZTogQ291cnNlLCBjb3Vyc2VDbGFzczogQ291cnNlQ2xhc3MpIHtcblx0XHR0aGlzLmNvdXJzZSA9IGNvdXJzZTtcblx0XHR0aGlzLmNvdXJzZUNsYXNzID0gY291cnNlQ2xhc3M7XG5cdFx0dGhpcy5kaXNwbGF5ID0gdHJ1ZTtcblx0XHR0aGlzLnNlbGVjdGVkU3R1ZGVudHMgPSBbXTtcblx0XHR0aGlzLnNlbGVjdGVkVGVhY2hlcnMgPSBbXTtcblx0XHR0aGlzLmxvYWRNZW1iZXJzKCk7XG5cdH1cblxuXHRoaWRlKCkge1xuXHRcdHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuXHR9XG5cblxuXHRhZGRTdHVkZW50KCkge1xuXHRcdHRoaXMudXNlcnNEaWFsb2cuc2hvdygpO1xuXHRcdHRoaXMudXNlcnNEaWFsb2cub25TZWxlY3RVc2Vycy5maXJzdCgpLnN1YnNjcmliZSh1c2VycyA9PiB7XG5cdFx0XHR2YXIgdXNlcklkcyA9IF8ucGx1Y2sodXNlcnMsICdpZCcpO1xuXHRcdFx0aWYgKHRoaXMuY291cnNlLm1vZGUgPT0nZ3JvdXAnKVxuXHRcdFx0XHR0aGlzLmNvdXJzZUNsYXNzLmVucm9sbCh0aGlzLCB1c2VySWRzKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMubG9hZE1lbWJlcnMoKTtcblx0XHRcdFx0XHR2YXIgZmFpbExpc3QgPSByZXN1bHRbJ2ZhaWxMaXN0J107XG5cdFx0XHRcdFx0Xy5lYWNoKGZhaWxMaXN0LCB1c2VySWQgPT4ge1xuXHRcdFx0XHRcdFx0bGV0IHVzZXI6IFVzZXIgPSBfLmZpbmQodXNlcnMsIChvYmo6IFVzZXIpID0+IHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG9iai5pZCA9PSB1c2VySWQ7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdHRoaXMud2FybihgVXNlciAke3VzZXIubmFtZX0gZG9lcyBub3QgbWVldCBjb3Vyc2UgcmVxdWlyZW1lbnRgKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHRpZiAodGhpcy5jb3Vyc2UubW9kZSA9PSdzZWxmLXN0dWR5Jylcblx0XHRcdFx0dGhpcy5jb3Vyc2UuZW5yb2xsKHRoaXMsIHVzZXJJZHMpLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5sb2FkTWVtYmVycygpO1xuXHRcdFx0XHRcdHZhciBmYWlsTGlzdCA9IHJlc3VsdFsnZmFpbExpc3QnXTtcblx0XHRcdFx0XHRfLmVhY2goZmFpbExpc3QsIHVzZXJJZCA9PiB7XG5cdFx0XHRcdFx0XHRsZXQgdXNlcjogVXNlciA9IF8uZmluZCh1c2VycywgKG9iajogVXNlcikgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gb2JqLmlkID09IHVzZXJJZDtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0dGhpcy53YXJuKGBVc2VyICR7dXNlci5uYW1lfSBkb2VzIG5vdCBtZWV0IGNvdXJzZSByZXF1aXJlbWVudGApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGFkZFRlYWNoZXIoKSB7XG5cdFx0dGhpcy51c2Vyc0RpYWxvZy5zaG93KCk7XG5cdFx0dGhpcy51c2Vyc0RpYWxvZy5vblNlbGVjdFVzZXJzLmZpcnN0KCkuc3Vic2NyaWJlKHVzZXJzID0+IHtcblx0XHRcdHZhciB1c2VySWRzID0gXy5wbHVjayh1c2VycywgJ2lkJyk7XG5cdFx0XHRpZiAodGhpcy5jb3Vyc2UubW9kZSA9PSdncm91cCcpXG5cdFx0XHRcdHRoaXMuY291cnNlQ2xhc3MuZW5yb2xsU3RhZmYodGhpcywgdXNlcklkcykuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcblx0XHRcdFx0XHR0aGlzLmxvYWRNZW1iZXJzKCk7XG5cdFx0XHRcdFx0dmFyIGZhaWxMaXN0ID0gcmVzdWx0WydmYWlsTGlzdCddO1xuXHRcdFx0XHRcdF8uZWFjaChmYWlsTGlzdCwgdXNlcklkID0+IHtcblx0XHRcdFx0XHRcdGxldCB1c2VyOiBVc2VyID0gXy5maW5kKHVzZXJzLCAob2JqOiBVc2VyKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBvYmouaWQgPT0gdXNlcklkO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR0aGlzLndhcm4oYFVzZXIgJHt1c2VyLm5hbWV9IGRvZXMgbm90IG1lZXQgY291cnNlIHJlcXVpcmVtZW50YCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0aWYgKHRoaXMuY291cnNlLm1vZGUgPT0nc2VsZi1zdHVkeScpXG5cdFx0XHRcdHRoaXMuY291cnNlLmVucm9sbFN0YWZmKHRoaXMsIHVzZXJJZHMpLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5sb2FkTWVtYmVycygpO1xuXHRcdFx0XHRcdHZhciBmYWlsTGlzdCA9IHJlc3VsdFsnZmFpbExpc3QnXTtcblx0XHRcdFx0XHRfLmVhY2goZmFpbExpc3QsIHVzZXJJZCA9PiB7XG5cdFx0XHRcdFx0XHRsZXQgdXNlcjogVXNlciA9IF8uZmluZCh1c2VycywgKG9iajogVXNlcikgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gb2JqLmlkID09IHVzZXJJZDtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0dGhpcy53YXJuKGBVc2VyICR7dXNlci5uYW1lfSBkb2VzIG5vdCBtZWV0IGNvdXJzZSByZXF1aXJlbWVudGApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGRlbGV0ZU1lbWJlcnMobWVtYmVycykge1xuXHRcdGlmIChtZW1iZXJzICYmIG1lbWJlcnMubGVuZ3RoKVxuXHRcdFx0dGhpcy5jb25maXJtKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdBcmUgeW91IHN1cmUgdG8gZGVsZXRlPycpLCAoKSA9PiB7XG5cdFx0XHRcdENvdXJzZU1lbWJlci5kZWxldGVBcnJheSh0aGlzLCBtZW1iZXJzKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuc2VsZWN0ZWRTdHVkZW50cyA9IFtdO1xuXHRcdFx0XHRcdHRoaXMuc2VsZWN0ZWRUZWFjaGVycyA9IFtdO1xuXHRcdFx0XHRcdHRoaXMubG9hZE1lbWJlcnMoKTtcblx0XHRcdFx0fSlcblx0XHRcdH0pO1xuXHR9XG5cblx0bG9hZE1lbWJlcnMoKSB7XG5cdFx0aWYgKHRoaXMuY291cnNlICYmICF0aGlzLmNvdXJzZUNsYXNzKSB7XG5cdFx0XHRDb3Vyc2VNZW1iZXIubGlzdEJ5Q291cnNlKHRoaXMsIHRoaXMuY291cnNlLmlkKS5zdWJzY3JpYmUobWVtYmVycyA9PiB7XG5cdFx0XHRcdHRoaXMuc3R1ZGVudHMgPSBfLmZpbHRlcihtZW1iZXJzLCAobWVtYmVyKSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIG1lbWJlci5yb2xlID09ICdzdHVkZW50Jztcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRTdHVkZW50cyA9IFtdO1xuXHRcdFx0XHR0aGlzLnRlYWNoZXJzID0gXy5maWx0ZXIobWVtYmVycywgKG1lbWJlcikgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBtZW1iZXIucm9sZSA9PSAndGVhY2hlcic7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHR0aGlzLnNlbGVjdGVkVGVhY2hlcnMgPSBbXTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRpZiAodGhpcy5jb3Vyc2VDbGFzcyAmJiB0aGlzLmNvdXJzZUNsYXNzKSB7XG5cdFx0XHRDb3Vyc2VNZW1iZXIubGlzdEJ5Q2xhc3ModGhpcywgdGhpcy5jb3Vyc2VDbGFzcy5pZCkuc3Vic2NyaWJlKG1lbWJlcnMgPT4ge1xuXHRcdFx0XHR0aGlzLnN0dWRlbnRzID0gXy5maWx0ZXIobWVtYmVycywgKG1lbWJlcikgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBtZW1iZXIucm9sZSA9PSAnc3R1ZGVudCc7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHR0aGlzLnNlbGVjdGVkU3R1ZGVudHMgPSBbXTtcblx0XHRcdFx0dGhpcy50ZWFjaGVycyA9IF8uZmlsdGVyKG1lbWJlcnMsIChtZW1iZXIpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gbWVtYmVyLnJvbGUgPT0gJ3RlYWNoZXInO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0dGhpcy5zZWxlY3RlZFRlYWNoZXJzID0gW107XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn1cblxuIl19

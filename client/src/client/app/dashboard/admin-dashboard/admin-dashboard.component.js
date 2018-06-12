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
var user_model_1 = require("../../shared/models/elearning/user.model");
var course_model_1 = require("../../shared/models/elearning/course.model");
var course_dialog_component_1 = require("../../course/course/course-dialog/course-dialog.component");
var course_member_model_1 = require("../../shared/models/elearning/course-member.model");
var base_component_1 = require("../../shared/components/base/base.component");
var exam_model_1 = require("../../shared/models/elearning/exam.model");
var date_utils_1 = require("../../shared/helpers/date.utils");
var exam_dialog_component_1 = require("../../assessment/exam/exam-dialog/exam-dialog.component");
var _ = require("underscore");
var constants_1 = require("../../shared/models/constants");
var base_model_1 = require("../../shared/models/base.model");
var AdminDashboardComponent = (function (_super) {
    __extends(AdminDashboardComponent, _super);
    function AdminDashboardComponent(dateUtils) {
        var _this = _super.call(this) || this;
        _this.dateUtils = dateUtils;
        _this.COURSE_MODE = constants_1.COURSE_MODE;
        _this.CONTENT_STATUS = constants_1.CONTENT_STATUS;
        _this.header = constants_1.SCHEDULER_HEADER;
        _this.now = new Date();
        _this.course = new course_model_1.Course();
        return _this;
    }
    AdminDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        base_model_1.BaseModel
            .bulk_count(this, user_model_1.User.__api__countAll(), course_model_1.Course.__api__countAll(), course_member_model_1.CourseMember.__api__countTeacher(), course_member_model_1.CourseMember.__api__countStudent())
            .map(function (jsonArray) {
            return _.flatten(jsonArray);
        })
            .subscribe(function (counts) {
            _this.userCount = counts[0];
            _this.courseCount = counts[1];
            _this.teacherCount = counts[2];
            _this.studentCount = counts[3];
        });
        this.loadExams();
        this.loadCourses();
    };
    AdminDashboardComponent.prototype.addExam = function () {
        var _this = this;
        this.examDialog.show(new exam_model_1.Exam());
        this.examDialog.onCreateComplete.subscribe(function () {
            _this.loadExams();
        });
    };
    AdminDashboardComponent.prototype.editExam = function (exam) {
        var _this = this;
        this.examDialog.show(exam);
        this.examDialog.onUpdateComplete.subscribe(function () {
            _this.loadExams();
        });
    };
    AdminDashboardComponent.prototype.editCourse = function (course) {
        var _this = this;
        this.courseDialog.show(course);
        this.courseDialog.onUpdateComplete.subscribe(function () {
            _this.loadCourses();
        });
    };
    AdminDashboardComponent.prototype.onDayClick = function () {
        this.addExam();
    };
    AdminDashboardComponent.prototype.onEventClick = function (event) {
        var examId = event.calEvent.id;
        var exam = _.find(this.exams, function (exam) {
            return exam.id == examId;
        });
        this.editExam(exam);
    };
    AdminDashboardComponent.prototype.loadExams = function () {
        var _this = this;
        exam_model_1.Exam.searchByDate(this, this.dateUtils.firstDateOfMonth(this.now), this.dateUtils.lastDateOfMonth(this.now)).subscribe(function (exams) {
            _this.exams = exams;
            _this.events = _.map(exams, function (exam) {
                return {
                    title: exam.name,
                    start: exam.start,
                    end: exam.end,
                    id: exam.id,
                    allDay: true
                };
            });
        });
    };
    AdminDashboardComponent.prototype.loadCourses = function () {
        var _this = this;
        course_model_1.Course.searchByDate(this, this.dateUtils.firstDateOfMonth(this.now), this.dateUtils.lastDateOfMonth(this.now)).subscribe(function (courses) {
            _this.courses = courses;
            _this.courses.sort(function (course1, course2) {
                return (course1.create_date < course2.create_date);
            });
        });
    };
    __decorate([
        core_1.ViewChild(exam_dialog_component_1.ExamDialog),
        __metadata("design:type", exam_dialog_component_1.ExamDialog)
    ], AdminDashboardComponent.prototype, "examDialog", void 0);
    __decorate([
        core_1.ViewChild(course_dialog_component_1.CourseDialog),
        __metadata("design:type", course_dialog_component_1.CourseDialog)
    ], AdminDashboardComponent.prototype, "courseDialog", void 0);
    AdminDashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin-dashboard',
            templateUrl: 'admin-dashboard.component.html'
        }),
        __metadata("design:paramtypes", [date_utils_1.DateUtils])
    ], AdminDashboardComponent);
    return AdminDashboardComponent;
}(base_component_1.BaseComponent));
exports.AdminDashboardComponent = AdminDashboardComponent;
//# sourceMappingURL=admin-dashboard.component.js.map
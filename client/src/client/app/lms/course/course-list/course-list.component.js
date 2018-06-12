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
var Observable_1 = require("rxjs/Observable");
var base_component_1 = require("../../../shared/components/base/base.component");
var report_utils_1 = require("../../../shared/helpers/report.utils");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var course_model_1 = require("../../../shared/models/elearning/course.model");
var course_unit_model_1 = require("../../../shared/models/elearning/course-unit.model");
var course_syllabus_model_1 = require("../../../shared/models/elearning/course-syllabus.model");
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var course_syllabus_dialog_component_1 = require("../../../cms/course/course-syllabus/course-syllabus.dialog.component");
var CourseListComponent = (function (_super) {
    __extends(CourseListComponent, _super);
    function CourseListComponent(router) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.CONTENT_STATUS = constants_1.CONTENT_STATUS;
        _this.COURSE_MODE = constants_1.COURSE_MODE;
        _this.reportUtils = new report_utils_1.ReportUtils();
        return _this;
    }
    CourseListComponent.prototype.ngOnInit = function () {
        this.currentUser = this.authService.UserProfile;
        this.loadCourses();
    };
    CourseListComponent.prototype.loadCourses = function () {
        var _this = this;
        course_member_model_1.CourseMember.listByUser(this, this.currentUser.id).subscribe(function (members) {
            members = _.filter(members, (function (member) {
                return member.course_id && (member.course_mode == 'self-study' || member.class_id) && member.status == 'active';
            }));
            var courseIds = _.pluck(members, 'course_id');
            Observable_1.Observable.zip(course_model_1.Course.array(_this, courseIds), course_model_1.Course.listByAuthor(_this, _this.currentUser.id))
                .map(function (courses) {
                var courstList = _.flatten(courses);
                return _.uniq(courstList, function (course) {
                    return course.id;
                });
            })
                .subscribe(function (courses) {
                _this.courses = courses;
                _.each(_this.courses, function (course) {
                    course["courseMemberData"] = {};
                    course_member_model_1.CourseMember.listByCourse(_this, course.id).subscribe(function (members) {
                        course["courseMemberData"] = _this.reportUtils.analyseCourseMember(course, members);
                    });
                    if (course.syllabus_id)
                        course_unit_model_1.CourseUnit.countBySyllabus(_this, course.syllabus_id).subscribe(function (count) {
                            course["unit_count"] = count;
                        });
                    else
                        course["unit_count"] = 0;
                    course["member"] = _.find(members, function (member) {
                        return member.course_id == course.id;
                    });
                });
                _this.courses.sort(function (course1, course2) {
                    if (course1.create_date > course2.create_date)
                        return -1;
                    else if (course1.create_date < course2.create_date)
                        return 1;
                    else
                        return 0;
                });
            });
        });
    };
    CourseListComponent.prototype.getCourseSyllabus = function (course) {
        var _this = this;
        return course_syllabus_model_1.CourseSyllabus.byCourse(this, course.id).flatMap(function (syllabus) {
            if (syllabus)
                return Observable_1.Observable.of(syllabus);
            else {
                var syllabus = new course_syllabus_model_1.CourseSyllabus();
                syllabus.course_id = course.id;
                syllabus.name = course.name;
                return syllabus.save(_this);
            }
        });
    };
    CourseListComponent.prototype.editSyllabus = function (course) {
        var _this = this;
        this.getCourseSyllabus(course).subscribe(function (syllabus) {
            _this.syllabusDialog.show(syllabus);
        });
    };
    CourseListComponent.prototype.studyCourse = function (course, member) {
        var _this = this;
        if (course.status == 'published') {
            course_syllabus_model_1.CourseSyllabus.byCourse(this, course.id).subscribe(function (syl) {
                if (syl && syl.status == 'published')
                    _this.router.navigate(['/lms/courses/study', course.id, member.id]);
                else
                    _this.error('The course has not been published');
            });
        }
        else {
            this.error('The course has not been published');
        }
    };
    CourseListComponent.prototype.manageCourse = function (course, member) {
        var _this = this;
        if (course.status == 'published') {
            course_syllabus_model_1.CourseSyllabus.byCourse(this, course.id).subscribe(function (syl) {
                if (syl && syl.status == 'published')
                    _this.router.navigate(['/lms/courses/manage', course.id]);
                else
                    _this.error('The course has not been published');
            });
        }
        else {
            this.error('The course has not been published');
        }
    };
    __decorate([
        core_1.ViewChild(course_syllabus_dialog_component_1.CourseSyllabusDialog),
        __metadata("design:type", course_syllabus_dialog_component_1.CourseSyllabusDialog)
    ], CourseListComponent.prototype, "syllabusDialog", void 0);
    CourseListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'lms-course-list',
            templateUrl: 'course-list.component.html',
            styleUrls: ['course-list.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], CourseListComponent);
    return CourseListComponent;
}(base_component_1.BaseComponent));
exports.CourseListComponent = CourseListComponent;
//# sourceMappingURL=course-list.component.js.map
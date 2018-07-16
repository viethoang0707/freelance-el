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
var base_model_1 = require("../base.model");
var Rx_1 = require("rxjs/Rx");
var decorator_1 = require("../decorator");
var conference_member_model_1 = require("./conference-member.model");
var search_read_api_1 = require("../../services/api/search-read.api");
var search_count_api_1 = require("../../services/api/search-count.api");
var course_model_1 = require("./course.model");
var course_certificate_model_1 = require("./course-certificate.model");
var list_api_1 = require("../../services/api/list.api");
var _ = require("underscore");
var execute_api_1 = require("../../services/api/execute.api");
var course_class_model_1 = require("./course-class.model");
var CourseMember = (function (_super) {
    __extends(CourseMember, _super);
    function CourseMember() {
        var _this = _super.call(this) || this;
        _this.course_id = undefined;
        _this.class_id = undefined;
        _this.date_register = undefined;
        _this.status = undefined;
        _this.role = undefined;
        _this.name = undefined;
        _this.course_name = undefined;
        _this.course_code = undefined;
        _this.course_mode = undefined;
        _this.enroll_status = undefined;
        _this.email = undefined;
        _this.phone = undefined;
        _this.user_id = undefined;
        _this.login = undefined;
        _this.image = undefined;
        _this.group_id = undefined;
        _this.group_id__DESC__ = undefined;
        _this.course = new course_model_1.Course();
        _this.clazz = new course_class_model_1.CourseClass();
        _this.certificate = new course_certificate_model_1.Certificate();
        _this.certificate_id = undefined;
        _this.conference_member_id = undefined;
        _this.conference_member = new conference_member_model_1.ConferenceMember();
        _this.course_review_state = undefined;
        return _this;
    }
    CourseMember_1 = CourseMember;
    CourseMember.__api__listByUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(CourseMember_1.Model, [], "[('user_id','='," + userId + ")]");
    };
    CourseMember.listByUser = function (context, userId) {
        return CourseMember_1.search(context, [], "[('user_id','='," + userId + ")]");
    };
    CourseMember.__api__listByClass = function (courseId) {
        return new search_read_api_1.SearchReadAPI(CourseMember_1.Model, [], "[('class_id','='," + courseId + ")]");
    };
    CourseMember.listByClass = function (context, classId) {
        return CourseMember_1.search(context, [], "[('class_id','='," + classId + ")]");
    };
    CourseMember.__api__listByCourse = function (courseId) {
        return new search_read_api_1.SearchReadAPI(CourseMember_1.Model, [], "[('course_id','='," + courseId + ")]");
    };
    CourseMember.listByCourse = function (context, courseId) {
        return CourseMember_1.search(context, [], "[('course_id','='," + courseId + ")]");
    };
    CourseMember.__api__countTeacher = function () {
        return new search_count_api_1.SearchCountAPI(CourseMember_1.Model, "[('role','=','teacher')]");
    };
    CourseMember.countTeacher = function (context) {
        return CourseMember_1.count(context, "[('role','=','teacher')]");
    };
    CourseMember.__api__countStudent = function () {
        return new search_count_api_1.SearchCountAPI(CourseMember_1.Model, "[('role','=','student')]");
    };
    CourseMember.countStudent = function (context) {
        return CourseMember_1.count(context, "[('role','=','student')]");
    };
    CourseMember.__api__byCourseAndUser = function (userId, courseId) {
        return new search_read_api_1.SearchReadAPI(CourseMember_1.Model, [], "[('user_id','='," + userId + "),('course_id','='," + courseId + ")]");
    };
    CourseMember.byCourseAndUser = function (context, userId, courseId) {
        return CourseMember_1.search(context, [], "[('user_id','='," + userId + "),('course_id','='," + courseId + ")]");
    };
    CourseMember.__api__courseEditor = function (courseId) {
        return new search_read_api_1.SearchReadAPI(CourseMember_1.Model, [], "[('role','=','editor'),('course_id','='," + courseId + ")]");
    };
    CourseMember.courseEditor = function (context, courseId) {
        return CourseMember_1.single(context, [], "[('role','=','editor'),('course_id','='," + courseId + ")]");
    };
    CourseMember.__api__courseSupervisor = function (courseId) {
        return new search_read_api_1.SearchReadAPI(CourseMember_1.Model, [], "[('role','=','supervisor'),('course_id','='," + courseId + ")]");
    };
    CourseMember.courseSupervisor = function (context, courseId) {
        return CourseMember_1.single(context, [], "[('role','=','supervisor'),('course_id','='," + courseId + ")]");
    };
    CourseMember.prototype.__api__populateCourse = function () {
        return new list_api_1.ListAPI(course_model_1.Course.Model, [this.course_id], []);
    };
    CourseMember.prototype.populateCourse = function (context) {
        var _this = this;
        if (!this.course_id)
            return Rx_1.Observable.of(null);
        return course_model_1.Course.get(context, this.course_id).do(function (course) {
            _this.course = course;
        });
    };
    CourseMember.populateCourses = function (context, members) {
        var courseIds = _.pluck(members, 'course_id');
        courseIds = _.filter(courseIds, function (id) {
            return id;
        });
        return course_model_1.Course.array(context, courseIds).do(function (courses) {
            _.each(members, function (member) {
                member.course = _.find(courses, function (course) {
                    return member.course_id == course.id;
                });
            });
        });
    };
    CourseMember.prototype.__api__complete_course = function (memberId, certificateId) {
        return new execute_api_1.ExecuteAPI(CourseMember_1.Model, 'complete_course', { memberId: memberId, certificateId: certificateId }, null);
    };
    CourseMember.prototype.completeCourse = function (context, certificateId) {
        return context.apiService.execute(this.__api__complete_course(this.id, certificateId), context.authService.LoginToken);
    };
    CourseMember.prototype.__api__populateClass = function () {
        return new list_api_1.ListAPI(course_class_model_1.CourseClass.Model, [this.class_id], []);
    };
    CourseMember.prototype.populateClass = function (context) {
        var _this = this;
        if (!this.course_id)
            return Rx_1.Observable.of(null);
        return course_class_model_1.CourseClass.get(context, this.class_id).do(function (clazz) {
            _this.clazz = clazz;
        });
    };
    CourseMember.populateClasses = function (context, members) {
        var classIds = _.pluck(members, 'class_id');
        classIds = _.filter(classIds, function (id) {
            return id;
        });
        return course_class_model_1.CourseClass.array(context, classIds).do(function (classList) {
            _.each(members, function (member) {
                member.clazz = _.find(classList, function (clazz) {
                    return member.class_id == clazz.id;
                });
            });
        });
    };
    CourseMember.prototype.__api__populateConferenceMember = function () {
        return new list_api_1.ListAPI(conference_member_model_1.ConferenceMember.Model, [this.conference_member_id], []);
    };
    CourseMember.prototype.populateConferenceMember = function (context) {
        var _this = this;
        if (!this.conference_member_id)
            return Rx_1.Observable.of(null);
        return conference_member_model_1.ConferenceMember.get(context, this.conference_member_id).do(function (member) {
            _this.conference_member = member;
        });
    };
    CourseMember.populateConferenceMembers = function (context, members) {
        var memberIds = _.pluck(members, 'conference_member_id');
        memberIds = _.filter(memberIds, function (id) {
            return id;
        });
        return conference_member_model_1.ConferenceMember.array(context, memberIds).do(function (memberList) {
            _.each(members, function (member) {
                member.conference_member = _.find(memberList, function (confMember) {
                    return member.conference_member_id == confMember.id;
                });
            });
        });
    };
    var CourseMember_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], CourseMember.prototype, "date_register", void 0);
    CourseMember = CourseMember_1 = __decorate([
        decorator_1.Model('etraining.course_member'),
        __metadata("design:paramtypes", [])
    ], CourseMember);
    return CourseMember;
}(base_model_1.BaseModel));
exports.CourseMember = CourseMember;

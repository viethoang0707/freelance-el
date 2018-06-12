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
var search_read_api_1 = require("../../services/api/search-read.api");
var search_count_api_1 = require("../../services/api/search-count.api");
var course_model_1 = require("./course.model");
var log_model_1 = require("./log.model");
var list_api_1 = require("../../services/api/list.api");
var _ = require("underscore");
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
    CourseMember.prototype.completeUnit = function (context, unitId) {
        var domain = "[('member_id','='," + this.id + "),('res_id','='," + unitId + "),('res_model','=','" + CourseUnit.Model + "'),('code','=','COMPLETE_COURSE_UNIT')]";
        return log_model_1.CourseLog.search(context, [], domain).flatMap(function (logs) {
            if (logs.length == 0)
                return Rx_1.Observable.of(false);
            else
                return Rx_1.Observable.of(true);
        });
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
    CourseMember.populateCourseForArray = function (context, members) {
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
//# sourceMappingURL=course-member.model.js.map
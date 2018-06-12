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
var cache_utils_1 = require("../../helpers/cache.utils");
var search_read_api_1 = require("../../services/api/search-read.api");
var moment = require("moment");
var constants_1 = require("../constants");
var Course = (function (_super) {
    __extends(Course, _super);
    function Course() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.summary = undefined;
        _this.description = undefined;
        _this.code = undefined;
        _this.status = undefined;
        _this.mode = undefined;
        _this.logo = undefined;
        _this.group_id = undefined;
        _this.author_id = undefined;
        _this.author_name = undefined;
        _this.syllabus_id = undefined;
        _this.group_id__DESC__ = undefined;
        _this.supervisor_id = undefined;
        _this.supervisor_name = undefined;
        _this.competency_id = undefined;
        _this.competency_name = undefined;
        _this.competency_group_id = undefined;
        _this.competency_group_name = undefined;
        _this.competency_level_id = undefined;
        _this.competency_level_name = undefined;
        _this.prequisite_course_id = undefined;
        _this.prequisite_course_id__DESC__ = undefined;
        _this.complete_unit_by_order = undefined;
        return _this;
    }
    Course_1 = Course;
    Course.__api__listByAuthor = function (authorId) {
        return new search_read_api_1.SearchReadAPI(Course_1.Model, [], "[('author_id','=','" + authorId + "')]");
    };
    Course.listByAuthor = function (context, authorId) {
        if (cache_utils_1.Cache.hit(Course_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Course_1.Model)).map(function (courses) {
                return _.filter(courses, function (course) {
                    return course.author_id == authorId;
                });
            });
        return Course_1.search(context, [], "[('author_id','=','" + authorId + "')]");
    };
    Course.__api__listByGroup = function (groupId) {
        return new search_read_api_1.SearchReadAPI(Course_1.Model, [], "[('group_id','=','" + groupId + "')]");
    };
    Course.listByGroup = function (context, groupId) {
        if (cache_utils_1.Cache.hit(Course_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Course_1.Model)).map(function (courses) {
                return _.filter(courses, function (course) {
                    return course.group_id == groupId;
                });
            });
        return Course_1.search(context, [], "[('group_id','=','" + groupId + "')]");
    };
    Course.__api__listByGroupAndMode = function (groupId, mode) {
        return new search_read_api_1.SearchReadAPI(Course_1.Model, [], "[('group_id','=','" + groupId + "'),('mode','=','" + mode + "')]");
    };
    Course.listByGroupAndMode = function (context, groupId, mode) {
        if (cache_utils_1.Cache.hit(Course_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Course_1.Model)).map(function (courses) {
                return _.filter(courses, function (course) {
                    return course.group_id == groupId && course.mode == mode;
                });
            });
        return Course_1.search(context, [], "[('group_id','=','" + groupId + "'),('mode','=','" + mode + "')]");
    };
    Course.__api__searchByDate = function (start, end) {
        var startDateStr = moment(start).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(constants_1.SERVER_DATETIME_FORMAT);
        return new search_read_api_1.SearchReadAPI(Course_1.Model, [], "[('create_date','>=','" + startDateStr + "'),('create_date','<=','" + endDateStr + "')]");
    };
    Course.searchByDate = function (context, start, end) {
        if (cache_utils_1.Cache.hit(Course_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Course_1.Model)).map(function (courses) {
                return _.filter(courses, function (course) {
                    return course.create_date.getTime() >= start.getTime() && course.create_date.getTime() <= end.getTime();
                });
            });
        var startDateStr = moment(start).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(constants_1.SERVER_DATETIME_FORMAT);
        return Course_1.search(context, [], "[('create_date','>=','" + startDateStr + "'),('create_date','<=','" + endDateStr + "')]");
    };
    var Course_1;
    Course = Course_1 = __decorate([
        decorator_1.Model('etraining.course'),
        __metadata("design:paramtypes", [])
    ], Course);
    return Course;
}(base_model_1.BaseModel));
exports.Course = Course;
//# sourceMappingURL=course.model.js.map
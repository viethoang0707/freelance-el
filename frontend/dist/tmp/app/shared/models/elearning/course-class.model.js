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
var cache_utils_1 = require("../../helpers/cache.utils");
var moment = require("moment");
var constants_1 = require("../constants");
var execute_api_1 = require("../../services/api/execute.api");
var _ = require("underscore");
var CourseClass = (function (_super) {
    __extends(CourseClass, _super);
    function CourseClass() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.course_name = undefined;
        _this.course_id = undefined;
        _this.supervisor_id = undefined;
        _this.supervisor_name = undefined;
        _this.start = undefined;
        _this.conference_id = undefined;
        _this.end = undefined;
        _this.status = undefined;
        return _this;
    }
    CourseClass_1 = CourseClass;
    Object.defineProperty(CourseClass.prototype, "IsAvailable", {
        get: function () {
            if (this.status != 'open')
                return false;
            if (!this.end)
                return false;
            var now = new Date();
            if (this.end.getTime() < now.getTime())
                return false;
            return true;
        },
        enumerable: true,
        configurable: true
    });
    CourseClass.__api__listByCourse = function (courseId) {
        return new search_read_api_1.SearchReadAPI(CourseClass_1.Model, [], "[('course_id','='," + courseId + ")]");
    };
    CourseClass.listByCourse = function (context, courseId) {
        return CourseClass_1.search(context, [], "[('course_id','='," + courseId + ")]");
    };
    CourseClass.prototype.__api__enroll = function (classId, userIds) {
        return new execute_api_1.ExecuteAPI(CourseClass_1.Model, 'enroll', { classId: classId, userIds: userIds }, null);
    };
    CourseClass.prototype.enroll = function (context, userIds) {
        return context.apiService.execute(this.__api__enroll(this.id, userIds), context.authService.LoginToken);
    };
    CourseClass.prototype.__api__enroll_staff = function (classId, userIds) {
        return new execute_api_1.ExecuteAPI(CourseClass_1.Model, 'enroll_staff', { classId: classId, userIds: userIds }, null);
    };
    CourseClass.prototype.enrollStaff = function (context, userIds) {
        return context.apiService.execute(this.__api__enroll_staff(this.id, userIds), context.authService.LoginToken);
    };
    CourseClass.__api__listBySupervisor = function (supervisorId) {
        return new search_read_api_1.SearchReadAPI(CourseClass_1.Model, [], "[('supervisor_id','='," + supervisorId + ")]");
    };
    CourseClass.listBySupervisor = function (context, supervisorId) {
        if (cache_utils_1.Cache.hit(CourseClass_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(CourseClass_1.Model)).map(function (classList) {
                return _.filter(classList, function (clazz) {
                    return clazz.supervisor_id == supervisorId;
                });
            });
        return CourseClass_1.search(context, [], "[('supervisor_id','='," + supervisorId + ")]");
    };
    CourseClass.__api__listBySupervisorAndDate = function (supervisorId, start, end) {
        var startDateStr = moment(start).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(constants_1.SERVER_DATETIME_FORMAT);
        return new search_read_api_1.SearchReadAPI(CourseClass_1.Model, [], "[('start','>=','" + startDateStr + "'),('start','<=','" + endDateStr + "'),('supervisor_id','='," + supervisorId + ")]");
    };
    CourseClass.listBySupervisorAndDate = function (context, supervisorId, start, end) {
        var startDateStr = moment(start).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(constants_1.SERVER_DATETIME_FORMAT);
        if (cache_utils_1.Cache.hit(CourseClass_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(CourseClass_1.Model)).map(function (classList) {
                return _.filter(classList, function (clazz) {
                    return clazz.start.getTime() >= start.getTime() && clazz.start.getTime() <= end.getTime() && clazz.supervisor_id == supervisorId;
                });
            });
        return CourseClass_1.search(context, [], "[('start','>=','" + startDateStr + "'),('start','<=','" + endDateStr + "'),('supervisor_id','='," + supervisorId + ")]");
    };
    CourseClass.prototype.__api__open = function (classId) {
        return new execute_api_1.ExecuteAPI(CourseClass_1.Model, 'open', { classId: classId }, null);
    };
    CourseClass.prototype.open = function (context) {
        return context.apiService.execute(this.__api__open(this.id), context.authService.LoginToken);
    };
    CourseClass.prototype.__api__close = function (classId) {
        return new execute_api_1.ExecuteAPI(CourseClass_1.Model, 'close', { classId: classId }, null);
    };
    CourseClass.prototype.close = function (context) {
        return context.apiService.execute(this.__api__close(this.id), context.authService.LoginToken);
    };
    var CourseClass_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], CourseClass.prototype, "start", void 0);
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], CourseClass.prototype, "end", void 0);
    CourseClass = CourseClass_1 = __decorate([
        decorator_1.Model('etraining.course_class'),
        __metadata("design:paramtypes", [])
    ], CourseClass);
    return CourseClass;
}(base_model_1.BaseModel));
exports.CourseClass = CourseClass;

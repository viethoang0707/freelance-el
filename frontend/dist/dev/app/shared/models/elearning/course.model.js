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
var execute_api_1 = require("../../services/api/execute.api");
var moment = require("moment");
var constants_1 = require("../constants");
var _ = require("underscore");
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
        _this.prequisite_course_name = undefined;
        _this.complete_unit_by_order = undefined;
        _this.competency_group_id = undefined;
        _this.competency_group_name = undefined;
        _this.review_state = undefined;
        _this.syllabus_id = undefined;
        _this.unit_count = undefined;
        _this.syllabus_status = undefined;
        return _this;
    }
    Course_1 = Course;
    Object.defineProperty(Course.prototype, "IsAvailable", {
        get: function () {
            if (this.review_state != 'approved')
                return false;
            if (this.status != 'open')
                return false;
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Course.__api__listByGroup = function (groupId) {
        return new search_read_api_1.SearchReadAPI(Course_1.Model, [], "[('group_id','='," + groupId + ")]");
    };
    Course.listByGroup = function (context, groupId) {
        if (cache_utils_1.Cache.hit(Course_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Course_1.Model)).map(function (courses) {
                return _.filter(courses, function (course) {
                    return course.group_id == groupId;
                });
            });
        return Course_1.search(context, [], "[('group_id','='," + groupId + ")]");
    };
    Course.__api__allForEnroll = function () {
        return new search_read_api_1.SearchReadAPI(Course_1.Model, [], "[('review_state','=','approved')]");
    };
    Course.allForEnroll = function (context) {
        if (cache_utils_1.Cache.hit(Course_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Course_1.Model)).map(function (courses) {
                return _.filter(courses, function (course) {
                    return course.review_state == 'approved';
                });
            });
        return Course_1.search(context, [], "[('review_state','=','approved')]");
    };
    Course.__api__listByCompetency = function (competencyId) {
        return new search_read_api_1.SearchReadAPI(Course_1.Model, [], "[('competency_id','='," + competencyId + ")]");
    };
    Course.listByCompetency = function (context, competencyId) {
        if (cache_utils_1.Cache.hit(Course_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Course_1.Model)).map(function (courses) {
                return _.filter(courses, function (course) {
                    return course.competency_id == competencyId;
                });
            });
        return Course_1.search(context, [], "[('competency_id','='," + competencyId + ")]");
    };
    Course.__api__listBySupervisor = function (supervisorId) {
        return new search_read_api_1.SearchReadAPI(Course_1.Model, [], "[('supervisor_id','='," + supervisorId + ")]");
    };
    Course.listBySupervisor = function (context, supervisorId) {
        if (cache_utils_1.Cache.hit(Course_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Course_1.Model)).map(function (courses) {
                return _.filter(courses, function (course) {
                    return course.supervisor_id == supervisorId;
                });
            });
        return Course_1.search(context, [], "[('supervisor_id','='," + supervisorId + ")]");
    };
    Course.__api__listByGroupAndMode = function (groupId, mode) {
        return new search_read_api_1.SearchReadAPI(Course_1.Model, [], "[('group_id','='," + groupId + "),('mode','=','" + mode + "')]");
    };
    Course.listByGroupAndMode = function (context, groupId, mode) {
        if (cache_utils_1.Cache.hit(Course_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Course_1.Model)).map(function (courses) {
                return _.filter(courses, function (course) {
                    return course.group_id == groupId && course.mode == mode;
                });
            });
        return Course_1.search(context, [], "[('group_id','='," + groupId + "),('mode','=','" + mode + "')]");
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
    Course.prototype.__api__enroll = function (courseId, userIds) {
        return new execute_api_1.ExecuteAPI(Course_1.Model, 'enroll', { courseId: courseId, userIds: userIds }, null);
    };
    Course.prototype.enroll = function (context, userIds) {
        return context.apiService.execute(this.__api__enroll(this.id, userIds), context.authService.LoginToken);
    };
    Course.prototype.__api__enroll_staff = function (courseId, userIds) {
        return new execute_api_1.ExecuteAPI(Course_1.Model, 'enroll_staff', { courseId: courseId, userIds: userIds }, null);
    };
    Course.prototype.enrollStaff = function (context, userIds) {
        return context.apiService.execute(this.__api__enroll_staff(this.id, userIds), context.authService.LoginToken);
    };
    Course.prototype.__api__open = function (courseId) {
        return new execute_api_1.ExecuteAPI(Course_1.Model, 'open', { courseId: courseId }, null);
    };
    Course.prototype.open = function (context) {
        return context.apiService.execute(this.__api__open(this.id), context.authService.LoginToken);
    };
    Course.prototype.__api__close = function (courseId) {
        return new execute_api_1.ExecuteAPI(Course_1.Model, 'close', { courseId: courseId }, null);
    };
    Course.prototype.close = function (context) {
        return context.apiService.execute(this.__api__close(this.id), context.authService.LoginToken);
    };
    var Course_1;
    Course = Course_1 = __decorate([
        decorator_1.Model('etraining.course'),
        __metadata("design:paramtypes", [])
    ], Course);
    return Course;
}(base_model_1.BaseModel));
exports.Course = Course;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQTBDO0FBQzFDLDhCQUE4QztBQUM5QywwQ0FBcUM7QUFFckMseURBQWtEO0FBQ2xELHNFQUFtRTtBQUNuRSw4REFBNEQ7QUFDNUQsK0JBQWlDO0FBQ2pDLDBDQUFvRDtBQUNwRCw4QkFBZ0M7QUFHaEM7SUFBNEIsMEJBQVM7SUFHakM7UUFBQSxZQUNJLGlCQUFPLFNBOEJiO1FBNUJBLEtBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLEtBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO1FBQzdCLEtBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ2hCLEtBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBQ3hCLEtBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQzFCLEtBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO1FBQzdCLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7UUFDbEMsS0FBSSxDQUFDLGFBQWEsR0FBSSxTQUFTLENBQUM7UUFDaEMsS0FBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7UUFDakMsS0FBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7UUFDL0IsS0FBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7UUFDakMsS0FBSSxDQUFDLG1CQUFtQixHQUFJLFNBQVMsQ0FBQztRQUN0QyxLQUFJLENBQUMscUJBQXFCLEdBQUksU0FBUyxDQUFDO1FBQ3hDLEtBQUksQ0FBQyxtQkFBbUIsR0FBSSxTQUFTLENBQUM7UUFD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QUFDLEVBQUUsQ0FBQyxFQUN2RCxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCw2QkFBWSxHQUFaLFVBQWEsUUFBZ0I7UUFDekIsT0FBTyxJQUFJLHdCQUFVLENBQUMsUUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUMsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELHNCQUFLLEdBQUwsVUFBTSxPQUFrQjtRQUNwQixPQUFPLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUN4RCxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7O0lBak1RLE1BQU07UUFEbEIsaUJBQUssQ0FBQyxrQkFBa0IsQ0FBQzs7T0FDYixNQUFNLENBbU1sQjtJQUFELGFBQUM7Q0FuTUQsQUFtTUMsQ0FuTTJCLHNCQUFTLEdBbU1wQztBQW5NWSx3QkFBTSIsImZpbGUiOiJhcHAvc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLm1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uL2RlY29yYXRvcic7XG5pbXBvcnQgeyBBUElDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgeyBDYWNoZSB9IGZyb20gJy4uLy4uL2hlbHBlcnMvY2FjaGUudXRpbHMnO1xuaW1wb3J0IHsgU2VhcmNoUmVhZEFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9zZWFyY2gtcmVhZC5hcGknO1xuaW1wb3J0IHsgRXhlY3V0ZUFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9leGVjdXRlLmFwaSc7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7U0VSVkVSX0RBVEVUSU1FX0ZPUk1BVH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5cbkBNb2RlbCgnZXRyYWluaW5nLmNvdXJzZScpXG5leHBvcnQgY2xhc3MgQ291cnNlIGV4dGVuZHMgQmFzZU1vZGVse1xuXG4gICAgLy8gRGVmYXVsdCBjb25zdHJ1Y3RvciB3aWxsIGJlIGNhbGxlZCBieSBtYXBwZXJcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXHRcdFxuXHRcdHRoaXMubmFtZSA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLnN1bW1hcnkgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5kZXNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLmNvZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm1vZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubG9nbyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5ncm91cF9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zeWxsYWJ1c19pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5ncm91cF9pZF9fREVTQ19fID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN1cGVydmlzb3JfaWQgPSAgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN1cGVydmlzb3JfbmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jb21wZXRlbmN5X2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvbXBldGVuY3lfbmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jb21wZXRlbmN5X2dyb3VwX2lkID0gIHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jb21wZXRlbmN5X2dyb3VwX25hbWUgPSAgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvbXBldGVuY3lfbGV2ZWxfaWQgPSAgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvbXBldGVuY3lfbGV2ZWxfbmFtZSA9ICB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucHJlcXVpc2l0ZV9jb3Vyc2VfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucHJlcXVpc2l0ZV9jb3Vyc2VfaWRfX0RFU0NfXyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5wcmVxdWlzaXRlX2NvdXJzZV9uYW1lPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY29tcGxldGVfdW5pdF9ieV9vcmRlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jb21wZXRlbmN5X2dyb3VwX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvbXBldGVuY3lfZ3JvdXBfbmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5yZXZpZXdfc3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc3lsbGFidXNfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMudW5pdF9jb3VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zeWxsYWJ1c19zdGF0dXMgPSB1bmRlZmluZWQ7XG5cdH1cblxuICAgIGNvbXBsZXRlX3VuaXRfYnlfb3JkZXI6IGJvb2xlYW47XG4gICAgY29tcGV0ZW5jeV9pZDogbnVtYmVyO1xuICAgIHN5bGxhYnVzX2lkOiBudW1iZXI7XG4gICAgdW5pdF9jb3VudDogbnVtYmVyO1xuICAgIHN5bGxhYnVzX3N0YXR1czogc3RyaW5nO1xuICAgIGNvbXBldGVuY3lfbmFtZTogc3RyaW5nO1xuICAgIHJldmlld19zdGF0ZTogc3RyaW5nO1xuICAgIGNvbXBldGVuY3lfZ3JvdXBfaWQ6IG51bWJlcjtcbiAgICBjb21wZXRlbmN5X2dyb3VwX25hbWU6IHN0cmluZztcbiAgICBjb21wZXRlbmN5X2xldmVsX2lkOiBudW1iZXI7XG4gICAgY29tcGV0ZW5jeV9sZXZlbF9uYW1lOiBzdHJpbmc7XG4gICAgcHJlcXVpc2l0ZV9jb3Vyc2VfaWQ6bnVtYmVyO1xuICAgIHByZXF1aXNpdGVfY291cnNlX25hbWU6IHN0cmluZztcbiAgICBwcmVxdWlzaXRlX2NvdXJzZV9pZF9fREVTQ19fOnN0cmluZztcbiAgICBuYW1lOnN0cmluZztcbiAgICBncm91cF9pZDpudW1iZXI7XG4gICAgc3VwZXJ2aXNvcl9pZDogbnVtYmVyO1xuICAgIHN1cGVydmlzb3JfbmFtZTogc3RyaW5nO1xuICAgIGdyb3VwX2lkX19ERVNDX186IHN0cmluZztcbiAgICBzdW1tYXJ5OiBzdHJpbmc7XG4gICAgY29kZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgc3RhdHVzOiBzdHJpbmc7XG4gICAgbW9kZTogc3RyaW5nO1xuICAgIGxvZ286IHN0cmluZztcblxuICAgIGdldCBJc0F2YWlsYWJsZSgpOmJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5yZXZpZXdfc3RhdGUgIT0gJ2FwcHJvdmVkJylcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzICE9J29wZW4nKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeUdyb3VwKGdyb3VwSWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoQ291cnNlLk1vZGVsLCBbXSxcIlsoJ2dyb3VwX2lkJywnPScsXCIrZ3JvdXBJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsaXN0QnlHcm91cChjb250ZXh0OkFQSUNvbnRleHQsIGdyb3VwSWQpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmIChDYWNoZS5oaXQoQ291cnNlLk1vZGVsKSlcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKENhY2hlLmxvYWQoQ291cnNlLk1vZGVsKSkubWFwKGNvdXJzZXM9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKGNvdXJzZXMsIChjb3Vyc2U6Q291cnNlKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZS5ncm91cF9pZCA9PSBncm91cElkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBDb3Vyc2Uuc2VhcmNoKGNvbnRleHQsW10sXCJbKCdncm91cF9pZCcsJz0nLFwiK2dyb3VwSWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2FsbEZvckVucm9sbCgpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKENvdXJzZS5Nb2RlbCwgW10sXCJbKCdyZXZpZXdfc3RhdGUnLCc9JywnYXBwcm92ZWQnKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGFsbEZvckVucm9sbChjb250ZXh0OkFQSUNvbnRleHQpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmIChDYWNoZS5oaXQoQ291cnNlLk1vZGVsKSlcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKENhY2hlLmxvYWQoQ291cnNlLk1vZGVsKSkubWFwKGNvdXJzZXM9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKGNvdXJzZXMsIChjb3Vyc2U6Q291cnNlKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZS5yZXZpZXdfc3RhdGUgPT0gJ2FwcHJvdmVkJyA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIENvdXJzZS5zZWFyY2goY29udGV4dCxbXSxcIlsoJ3Jldmlld19zdGF0ZScsJz0nLCdhcHByb3ZlZCcpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeUNvbXBldGVuY3koY29tcGV0ZW5jeUlkOiBudW1iZXIpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKENvdXJzZS5Nb2RlbCwgW10sXCJbKCdjb21wZXRlbmN5X2lkJywnPScsXCIrY29tcGV0ZW5jeUlkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RCeUNvbXBldGVuY3koY29udGV4dDpBUElDb250ZXh0LCBjb21wZXRlbmN5SWQpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmIChDYWNoZS5oaXQoQ291cnNlLk1vZGVsKSlcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKENhY2hlLmxvYWQoQ291cnNlLk1vZGVsKSkubWFwKGNvdXJzZXM9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKGNvdXJzZXMsIChjb3Vyc2U6Q291cnNlKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZS5jb21wZXRlbmN5X2lkID09IGNvbXBldGVuY3lJZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gQ291cnNlLnNlYXJjaChjb250ZXh0LFtdLFwiWygnY29tcGV0ZW5jeV9pZCcsJz0nLFwiK2NvbXBldGVuY3lJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdEJ5U3VwZXJ2aXNvcihzdXBlcnZpc29ySWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoQ291cnNlLk1vZGVsLCBbXSxcIlsoJ3N1cGVydmlzb3JfaWQnLCc9JyxcIitzdXBlcnZpc29ySWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5U3VwZXJ2aXNvcihjb250ZXh0OkFQSUNvbnRleHQsIHN1cGVydmlzb3JJZDogbnVtYmVyKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBpZiAoQ2FjaGUuaGl0KENvdXJzZS5Nb2RlbCkpXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihDYWNoZS5sb2FkKENvdXJzZS5Nb2RlbCkpLm1hcChjb3Vyc2VzPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmZpbHRlcihjb3Vyc2VzLCAoY291cnNlOkNvdXJzZSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2Uuc3VwZXJ2aXNvcl9pZCA9PSBzdXBlcnZpc29ySWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIENvdXJzZS5zZWFyY2goY29udGV4dCxbXSxcIlsoJ3N1cGVydmlzb3JfaWQnLCc9JyxcIitzdXBlcnZpc29ySWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeUdyb3VwQW5kTW9kZShncm91cElkOiBudW1iZXIsIG1vZGU6c3RyaW5nKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShDb3Vyc2UuTW9kZWwsIFtdLFwiWygnZ3JvdXBfaWQnLCc9JyxcIitncm91cElkK1wiKSwoJ21vZGUnLCc9JywnXCIrbW9kZStcIicpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5R3JvdXBBbmRNb2RlKGNvbnRleHQ6QVBJQ29udGV4dCwgZ3JvdXBJZCwgbW9kZTpzdHJpbmcpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmIChDYWNoZS5oaXQoQ291cnNlLk1vZGVsKSlcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKENhY2hlLmxvYWQoQ291cnNlLk1vZGVsKSkubWFwKGNvdXJzZXM9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKGNvdXJzZXMsIChjb3Vyc2U6Q291cnNlKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZS5ncm91cF9pZCA9PSBncm91cElkICYmIGNvdXJzZS5tb2RlID09IG1vZGU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIENvdXJzZS5zZWFyY2goY29udGV4dCxbXSxcIlsoJ2dyb3VwX2lkJywnPScsXCIrZ3JvdXBJZCtcIiksKCdtb2RlJywnPScsJ1wiK21vZGUrXCInKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19zZWFyY2hCeURhdGUoc3RhcnQ6RGF0ZSwgZW5kOkRhdGUpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgdmFyIHN0YXJ0RGF0ZVN0ciA9IG1vbWVudChzdGFydCkuZm9ybWF0KFNFUlZFUl9EQVRFVElNRV9GT1JNQVQpO1xuICAgICAgICB2YXIgZW5kRGF0ZVN0ciA9IG1vbWVudChlbmQpLmZvcm1hdChTRVJWRVJfREFURVRJTUVfRk9STUFUKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKENvdXJzZS5Nb2RlbCwgW10sXCJbKCdjcmVhdGVfZGF0ZScsJz49JywnXCIrc3RhcnREYXRlU3RyK1wiJyksKCdjcmVhdGVfZGF0ZScsJzw9JywnXCIrZW5kRGF0ZVN0citcIicpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2VhcmNoQnlEYXRlKGNvbnRleHQ6QVBJQ29udGV4dCwgc3RhcnQ6RGF0ZSwgZW5kOkRhdGUpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmIChDYWNoZS5oaXQoQ291cnNlLk1vZGVsKSlcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKENhY2hlLmxvYWQoQ291cnNlLk1vZGVsKSkubWFwKGNvdXJzZXM9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKGNvdXJzZXMsIChjb3Vyc2U6Q291cnNlKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZS5jcmVhdGVfZGF0ZS5nZXRUaW1lKCkgPj0gIHN0YXJ0LmdldFRpbWUoKSAmJiBjb3Vyc2UuY3JlYXRlX2RhdGUuZ2V0VGltZSgpIDw9IGVuZC5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgdmFyIHN0YXJ0RGF0ZVN0ciA9IG1vbWVudChzdGFydCkuZm9ybWF0KFNFUlZFUl9EQVRFVElNRV9GT1JNQVQpO1xuICAgICAgICB2YXIgZW5kRGF0ZVN0ciA9IG1vbWVudChlbmQpLmZvcm1hdChTRVJWRVJfREFURVRJTUVfRk9STUFUKTtcbiAgICAgICAgcmV0dXJuIENvdXJzZS5zZWFyY2goY29udGV4dCxbXSxcIlsoJ2NyZWF0ZV9kYXRlJywnPj0nLCdcIitzdGFydERhdGVTdHIrXCInKSwoJ2NyZWF0ZV9kYXRlJywnPD0nLCdcIitlbmREYXRlU3RyK1wiJyldXCIpO1xuICAgIH1cblxuICAgIF9fYXBpX19lbnJvbGwoY291cnNlSWQ6IG51bWJlciwgdXNlcklkczogbnVtYmVyW10pOiBFeGVjdXRlQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFeGVjdXRlQVBJKENvdXJzZS5Nb2RlbCwgJ2Vucm9sbCcse2NvdXJzZUlkOmNvdXJzZUlkLHVzZXJJZHM6dXNlcklkc30sIG51bGwpO1xuICAgIH1cblxuICAgIGVucm9sbChjb250ZXh0OkFQSUNvbnRleHQsIHVzZXJJZHM6IG51bWJlcltdKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gY29udGV4dC5hcGlTZXJ2aWNlLmV4ZWN1dGUodGhpcy5fX2FwaV9fZW5yb2xsKHRoaXMuaWQsIHVzZXJJZHMpLCBcbiAgICAgICAgICAgIGNvbnRleHQuYXV0aFNlcnZpY2UuTG9naW5Ub2tlbik7XG4gICAgfVxuXG4gICAgX19hcGlfX2Vucm9sbF9zdGFmZihjb3Vyc2VJZDogbnVtYmVyLCB1c2VySWRzOiBudW1iZXJbXSk6IEV4ZWN1dGVBUEkge1xuICAgICAgICByZXR1cm4gbmV3IEV4ZWN1dGVBUEkoQ291cnNlLk1vZGVsLCAnZW5yb2xsX3N0YWZmJyx7Y291cnNlSWQ6IGNvdXJzZUlkLHVzZXJJZHM6dXNlcklkc30sIG51bGwpO1xuICAgIH1cblxuICAgIGVucm9sbFN0YWZmKGNvbnRleHQ6QVBJQ29udGV4dCwgdXNlcklkczogbnVtYmVyW10pOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBjb250ZXh0LmFwaVNlcnZpY2UuZXhlY3V0ZSh0aGlzLl9fYXBpX19lbnJvbGxfc3RhZmYodGhpcy5pZCwgdXNlcklkcyksIFxuICAgICAgICAgICAgY29udGV4dC5hdXRoU2VydmljZS5Mb2dpblRva2VuKTtcblxuICAgIH1cblxuICAgIF9fYXBpX19vcGVuKGNvdXJzZUlkOiBudW1iZXIpOiBFeGVjdXRlQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFeGVjdXRlQVBJKENvdXJzZS5Nb2RlbCwgJ29wZW4nLHtjb3Vyc2VJZDpjb3Vyc2VJZH0sIG51bGwpO1xuICAgIH1cblxuICAgIG9wZW4oY29udGV4dDpBUElDb250ZXh0KTpPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gY29udGV4dC5hcGlTZXJ2aWNlLmV4ZWN1dGUodGhpcy5fX2FwaV9fb3Blbih0aGlzLmlkKSwgXG4gICAgICAgICAgICBjb250ZXh0LmF1dGhTZXJ2aWNlLkxvZ2luVG9rZW4pO1xuICAgIH1cblxuICAgIF9fYXBpX19jbG9zZShjb3Vyc2VJZDogbnVtYmVyKTogRXhlY3V0ZUFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgRXhlY3V0ZUFQSShDb3Vyc2UuTW9kZWwsICdjbG9zZScse2NvdXJzZUlkOmNvdXJzZUlkfSwgbnVsbCk7XG4gICAgfVxuXG4gICAgY2xvc2UoY29udGV4dDpBUElDb250ZXh0KTpPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gY29udGV4dC5hcGlTZXJ2aWNlLmV4ZWN1dGUodGhpcy5fX2FwaV9fY2xvc2UodGhpcy5pZCksIFxuICAgICAgICAgICAgY29udGV4dC5hdXRoU2VydmljZS5Mb2dpblRva2VuKTtcbiAgICB9XG5cbn1cbiJdfQ==

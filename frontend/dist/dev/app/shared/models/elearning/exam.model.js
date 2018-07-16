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
var _ = require("underscore");
var cache_utils_1 = require("../../helpers/cache.utils");
var search_read_api_1 = require("../../services/api/search-read.api");
var moment = require("moment");
var constants_1 = require("../constants");
var execute_api_1 = require("../../services/api/execute.api");
var Exam = (function (_super) {
    __extends(Exam, _super);
    function Exam() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.summary = undefined;
        _this.instruction = undefined;
        _this.start = undefined;
        _this.end = undefined;
        _this.selector_id = undefined;
        _this.status = undefined;
        _this.duration = undefined;
        _this.publish_score = undefined;
        _this.supervisor_id = undefined;
        _this.supervisor_name = undefined;
        _this.competency_id = undefined;
        _this.competency_name = undefined;
        _this.competency_group_id = undefined;
        _this.competency_group_name = undefined;
        _this.competency_level_id = undefined;
        _this.competency_level_name = undefined;
        _this.is_public = undefined;
        _this.review_state = undefined;
        _this.course_class_id = undefined;
        _this.sheet_id = undefined;
        _this.question_count = undefined;
        _this.sheet_status = undefined;
        return _this;
    }
    Exam_1 = Exam;
    Object.defineProperty(Exam.prototype, "IsAvailable", {
        get: function () {
            if (this.review_state != 'approved')
                return false;
            if (this.status != 'open')
                return false;
            if (!this.end)
                return false;
            var now = new Date();
            if (this.start.getTime() > now.getTime())
                return false;
            if (this.end.getTime() < now.getTime())
                return false;
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Exam.__api__searchByDate = function (start, end) {
        var startDateStr = moment(start).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(constants_1.SERVER_DATETIME_FORMAT);
        return new search_read_api_1.SearchReadAPI(Exam_1.Model, [], "[('start','>=','" + startDateStr + "'),('start','<=','" + endDateStr + "')]");
    };
    Exam.searchByDate = function (context, start, end) {
        if (cache_utils_1.Cache.hit(Exam_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Exam_1.Model)).map(function (exams) {
                return _.filter(exams, function (exam) {
                    return exam.start.getTime() >= start.getTime() && exam.start.getTime() <= end.getTime();
                });
            });
        var startDateStr = moment(start).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(constants_1.SERVER_DATETIME_FORMAT);
        return Exam_1.search(context, [], "[('start','>=','" + startDateStr + "'),('start','<=','" + endDateStr + "')]");
    };
    Exam.__api__allForEnrollPublic = function () {
        return new search_read_api_1.SearchReadAPI(Exam_1.Model, [], "[('review_state','=','approved'),('is_public','=',True)]");
    };
    Exam.allForEnrollPublic = function (context) {
        if (cache_utils_1.Cache.hit(Exam_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Exam_1.Model)).map(function (exams) {
                return _.filter(exams, function (exam) {
                    return exam.review_state == 'approved' && exam.is_public;
                });
            });
        return Exam_1.search(context, [], "[('review_state','=','approved'),('is_public','=',True)]");
    };
    Exam.prototype.__api__enroll = function (examId, userIds) {
        return new execute_api_1.ExecuteAPI(Exam_1.Model, 'enroll', { userIds: userIds, examId: examId }, null);
    };
    Exam.prototype.enroll = function (context, userIds) {
        return context.apiService.execute(this.__api__enroll(this.id, userIds), context.authService.LoginToken);
    };
    Exam.__api__listPublicExam = function () {
        return new search_read_api_1.SearchReadAPI(Exam_1.Model, [], "[('is_public','=',True)");
    };
    Exam.listPublicExam = function (context) {
        return Exam_1.search(context, [], "[('is_public','=',True)]");
    };
    Exam.__api__listBySupervisor = function (supervisorId) {
        return new search_read_api_1.SearchReadAPI(Exam_1.Model, [], "[('supervisor_id','='," + supervisorId + ")]");
    };
    Exam.listBySupervisor = function (context, supervisorId) {
        if (cache_utils_1.Cache.hit(Exam_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Exam_1.Model)).map(function (exams) {
                return _.filter(exams, function (exam) {
                    return exam.supervisor_id == supervisorId;
                });
            });
        return Exam_1.search(context, [], "[('supervisor_id','='," + supervisorId + ")]");
    };
    Exam.__api__listBySupervisorAndDate = function (supervisorId, start, end) {
        var startDateStr = moment(start).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(constants_1.SERVER_DATETIME_FORMAT);
        return new search_read_api_1.SearchReadAPI(Exam_1.Model, [], "[('start','>=','" + startDateStr + "'),('start','<=','" + endDateStr + "'),('supervisor_id','='," + supervisorId + ")]");
    };
    Exam.listBySupervisorAndDate = function (context, supervisorId, start, end) {
        var startDateStr = moment(start).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(constants_1.SERVER_DATETIME_FORMAT);
        if (cache_utils_1.Cache.hit(Exam_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Exam_1.Model)).map(function (exams) {
                return _.filter(exams, function (exam) {
                    return exam.start.getTime() >= start.getTime() && exam.start.getTime() <= end.getTime() && exam.supervisor_id == supervisorId;
                });
            });
        return Exam_1.search(context, [], "[('start','>=','" + startDateStr + "'),('start','<=','" + endDateStr + "'),('supervisor_id','='," + supervisorId + ")]");
    };
    Exam.__api__listByClass = function (classId) {
        return new search_read_api_1.SearchReadAPI(Exam_1.Model, [], "[('course_class_id','='," + classId + ")]");
    };
    Exam.listByClass = function (context, classId) {
        if (cache_utils_1.Cache.hit(Exam_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Exam_1.Model)).map(function (exams) {
                return _.filter(exams, function (exam) {
                    return exam.supervisor_id == classId;
                });
            });
        return Exam_1.search(context, [], "[('course_class_id','='," + classId + ")]");
    };
    Exam.prototype.__api__open = function (examId) {
        return new execute_api_1.ExecuteAPI(Exam_1.Model, 'open', { examId: examId }, null);
    };
    Exam.prototype.open = function (context) {
        return context.apiService.execute(this.__api__open(this.id), context.authService.LoginToken);
    };
    Exam.prototype.__api__close = function (examId) {
        return new execute_api_1.ExecuteAPI(Exam_1.Model, 'close', { examId: examId }, null);
    };
    Exam.prototype.close = function (context) {
        return context.apiService.execute(this.__api__close(this.id), context.authService.LoginToken);
    };
    Exam.prototype.__api__enroll_supervior = function (examId, userIds) {
        return new execute_api_1.ExecuteAPI(Exam_1.Model, 'enroll_supervisor', { userIds: userIds, examId: examId }, null);
    };
    Exam.prototype.enrollSupervisor = function (context, userIds) {
        return context.apiService.execute(this.__api__enroll_supervior(this.id, userIds), context.authService.LoginToken);
    };
    var Exam_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], Exam.prototype, "start", void 0);
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], Exam.prototype, "end", void 0);
    Exam = Exam_1 = __decorate([
        decorator_1.Model('etraining.exam'),
        __metadata("design:paramtypes", [])
    ], Exam);
    return Exam;
}(base_model_1.BaseModel));
exports.Exam = Exam;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUEwQztBQUMxQyw4QkFBOEM7QUFDOUMsMENBQW1EO0FBR25ELDhCQUFnQztBQUNoQyx5REFBa0Q7QUFDbEQsc0VBQW1FO0FBQ25FLCtCQUFpQztBQUNqQywwQ0FBb0Q7QUFDcEQsOERBQTREO0FBRzVEO0lBQTBCLHdCQUFTO0lBRy9CO1FBQUEsWUFDSSxpQkFBTyxTQXlCYjtRQXZCQSxLQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QixLQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUN6QixLQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztRQUNyQixLQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUM3QixLQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUN4QixLQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUMxQixLQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztRQUMvQixLQUFJLENBQUMsYUFBYSxHQUFJLFNBQVMsQ0FBQztRQUNoQyxLQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztRQUNqQyxLQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztRQUMvQixLQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztRQUNqQyxLQUFJLENBQUMsbUJBQW1CLEdBQUksU0FBUyxDQUFDO1FBQ3RDLEtBQUksQ0FBQyxxQkFBcUIsR0FBSSxTQUFTLENBQUM7UUFDeEMsS0FBSSxDQUFDLG1CQUFtQixHQUFJLFNBQVMsQ0FBQztRQUN0QyxLQUFJLENBQUMscUJBQXFCLEdBQUksU0FBUyxDQUFDO1FBQ3hD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QUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELG9CQUFLLEdBQUwsVUFBTSxPQUFrQjtRQUNwQixPQUFPLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUN4RCxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxzQ0FBdUIsR0FBdkIsVUFBd0IsTUFBYyxFQUFFLE9BQWlCO1FBQ3JELE9BQU8sSUFBSSx3QkFBVSxDQUFDLE1BQUksQ0FBQyxLQUFLLEVBQUUsbUJBQW1CLEVBQUMsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBQyxNQUFNLEVBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRyxDQUFDO0lBRUQsK0JBQWdCLEdBQWhCLFVBQWlCLE9BQWtCLEVBQUUsT0FBaUI7UUFDbEQsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFDNUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QyxDQUFDOztJQWpKRDtRQURDLHlCQUFhLEVBQVE7a0NBQ2YsSUFBSTt1Q0FBQztJQUVaO1FBREMseUJBQWEsRUFBUTtrQ0FDakIsSUFBSTtxQ0FBQztJQWpERCxJQUFJO1FBRGhCLGlCQUFLLENBQUMsZ0JBQWdCLENBQUM7O09BQ1gsSUFBSSxDQWlNaEI7SUFBRCxXQUFDO0NBak1ELEFBaU1DLENBak15QixzQkFBUyxHQWlNbEM7QUFqTVksb0JBQUkiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0ubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi9iYXNlLm1vZGVsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsLEZpZWxkUHJvcGVydHkgfSBmcm9tICcuLi9kZWNvcmF0b3InO1xuaW1wb3J0IHsgQVBJQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgRXhhbVF1ZXN0aW9uIH0gZnJvbSAnLi9leGFtLXF1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBDYWNoZSB9IGZyb20gJy4uLy4uL2hlbHBlcnMvY2FjaGUudXRpbHMnO1xuaW1wb3J0IHsgU2VhcmNoUmVhZEFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9zZWFyY2gtcmVhZC5hcGknO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge1NFUlZFUl9EQVRFVElNRV9GT1JNQVR9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBFeGVjdXRlQVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL2V4ZWN1dGUuYXBpJztcblxuQE1vZGVsKCdldHJhaW5pbmcuZXhhbScpXG5leHBvcnQgY2xhc3MgRXhhbSBleHRlbmRzIEJhc2VNb2RlbHtcblxuICAgIC8vIERlZmF1bHQgY29uc3RydWN0b3Igd2lsbCBiZSBjYWxsZWQgYnkgbWFwcGVyXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblx0XHRcblx0XHR0aGlzLm5hbWUgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5zdW1tYXJ5ID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuaW5zdHJ1Y3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc3RhcnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZW5kID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnNlbGVjdG9yX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5wdWJsaXNoX3Njb3JlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN1cGVydmlzb3JfaWQgPSAgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN1cGVydmlzb3JfbmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jb21wZXRlbmN5X2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvbXBldGVuY3lfbmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jb21wZXRlbmN5X2dyb3VwX2lkID0gIHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jb21wZXRlbmN5X2dyb3VwX25hbWUgPSAgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvbXBldGVuY3lfbGV2ZWxfaWQgPSAgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvbXBldGVuY3lfbGV2ZWxfbmFtZSA9ICB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuaXNfcHVibGljID0gIHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5yZXZpZXdfc3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY291cnNlX2NsYXNzX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnNoZWV0X2lkID0gIHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5xdWVzdGlvbl9jb3VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zaGVldF9zdGF0dXMgPSB1bmRlZmluZWQ7XG5cdH1cblxuICAgIHNoZWV0X2lkOiBudW1iZXI7XG4gICAgcXVlc3Rpb25fY291bnQ6IG51bWJlcjtcbiAgICBzaGVldF9zdGF0dXM6IHN0cmluZztcbiAgICByZXZpZXdfc3RhdGU6c3RyaW5nO1xuICAgIGNvdXJzZV9jbGFzc19pZDpudW1iZXI7XG4gICAgY29tcGV0ZW5jeV9pZDogbnVtYmVyO1xuICAgIGNvbXBldGVuY3lfbmFtZTogc3RyaW5nO1xuICAgIGNvbXBldGVuY3lfZ3JvdXBfaWQ6IG51bWJlcjtcbiAgICBjb21wZXRlbmN5X2dyb3VwX25hbWU6IHN0cmluZztcbiAgICBjb21wZXRlbmN5X2xldmVsX2lkOiBudW1iZXI7XG4gICAgY29tcGV0ZW5jeV9sZXZlbF9uYW1lOiBzdHJpbmc7XG4gICAgbmFtZTpzdHJpbmc7XG4gICAgaXNfcHVibGljOmJvb2xlYW47XG4gICAgc3VtbWFyeTogc3RyaW5nO1xuICAgIGluc3RydWN0aW9uOiBzdHJpbmc7XG4gICAgQEZpZWxkUHJvcGVydHk8RGF0ZT4oKVxuICAgIHN0YXJ0OiBEYXRlO1xuICAgIEBGaWVsZFByb3BlcnR5PERhdGU+KClcbiAgICBlbmQ6IERhdGU7XG4gICAgc2VsZWN0b3JfaWQ6IG51bWJlcjtcbiAgICBzdGF0dXM6IHN0cmluZztcbiAgICBkdXJhdGlvbjogbnVtYmVyO1xuICAgIHB1Ymxpc2hfc2NvcmU6IGJvb2xlYW47XG4gICAgc3VwZXJ2aXNvcl9pZDogbnVtYmVyO1xuICAgIHN1cGVydmlzb3JfbmFtZTogc3RyaW5nO1xuXG4gICAgZ2V0IElzQXZhaWxhYmxlKCk6Ym9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnJldmlld19zdGF0ZSAhPSAnYXBwcm92ZWQnKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5zdGF0dXMgIT0nb3BlbicpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICghdGhpcy5lbmQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBpZiAodGhpcy5zdGFydC5nZXRUaW1lKCkgPiBub3cuZ2V0VGltZSgpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5lbmQuZ2V0VGltZSgpIDwgbm93LmdldFRpbWUoKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19zZWFyY2hCeURhdGUoc3RhcnQ6RGF0ZSwgZW5kOkRhdGUpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgdmFyIHN0YXJ0RGF0ZVN0ciA9IG1vbWVudChzdGFydCkuZm9ybWF0KFNFUlZFUl9EQVRFVElNRV9GT1JNQVQpO1xuICAgICAgICB2YXIgZW5kRGF0ZVN0ciA9IG1vbWVudChlbmQpLmZvcm1hdChTRVJWRVJfREFURVRJTUVfRk9STUFUKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKEV4YW0uTW9kZWwsIFtdLFwiWygnc3RhcnQnLCc+PScsJ1wiK3N0YXJ0RGF0ZVN0citcIicpLCgnc3RhcnQnLCc8PScsJ1wiK2VuZERhdGVTdHIrXCInKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIHNlYXJjaEJ5RGF0ZShjb250ZXh0OkFQSUNvbnRleHQsIHN0YXJ0OkRhdGUsIGVuZDpEYXRlKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBpZiAoQ2FjaGUuaGl0KEV4YW0uTW9kZWwpKVxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YoQ2FjaGUubG9hZChFeGFtLk1vZGVsKSkubWFwKGV4YW1zPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmZpbHRlcihleGFtcywgKGV4YW06RXhhbSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBleGFtLnN0YXJ0LmdldFRpbWUoKSA+PSAgc3RhcnQuZ2V0VGltZSgpICYmIGV4YW0uc3RhcnQuZ2V0VGltZSgpIDw9IGVuZC5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgdmFyIHN0YXJ0RGF0ZVN0ciA9IG1vbWVudChzdGFydCkuZm9ybWF0KFNFUlZFUl9EQVRFVElNRV9GT1JNQVQpO1xuICAgICAgICB2YXIgZW5kRGF0ZVN0ciA9IG1vbWVudChlbmQpLmZvcm1hdChTRVJWRVJfREFURVRJTUVfRk9STUFUKTtcbiAgICAgICAgcmV0dXJuIEV4YW0uc2VhcmNoKGNvbnRleHQsW10sXCJbKCdzdGFydCcsJz49JywnXCIrc3RhcnREYXRlU3RyK1wiJyksKCdzdGFydCcsJzw9JywnXCIrZW5kRGF0ZVN0citcIicpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2FsbEZvckVucm9sbFB1YmxpYygpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKEV4YW0uTW9kZWwsIFtdLFwiWygncmV2aWV3X3N0YXRlJywnPScsJ2FwcHJvdmVkJyksKCdpc19wdWJsaWMnLCc9JyxUcnVlKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGFsbEZvckVucm9sbFB1YmxpYyhjb250ZXh0OkFQSUNvbnRleHQpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmIChDYWNoZS5oaXQoRXhhbS5Nb2RlbCkpXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihDYWNoZS5sb2FkKEV4YW0uTW9kZWwpKS5tYXAoZXhhbXM9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKGV4YW1zLCAoZXhhbTpFeGFtKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4YW0ucmV2aWV3X3N0YXRlID09ICdhcHByb3ZlZCcgICYmIGV4YW0uaXNfcHVibGljO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBFeGFtLnNlYXJjaChjb250ZXh0LFtdLFwiWygncmV2aWV3X3N0YXRlJywnPScsJ2FwcHJvdmVkJyksKCdpc19wdWJsaWMnLCc9JyxUcnVlKV1cIik7XG4gICAgfVxuXG4gICAgX19hcGlfX2Vucm9sbChleGFtSWQ6IG51bWJlciwgdXNlcklkczogbnVtYmVyW10pOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFeGVjdXRlQVBJKEV4YW0uTW9kZWwsICdlbnJvbGwnLHt1c2VySWRzOnVzZXJJZHMsIGV4YW1JZDpleGFtSWR9LCBudWxsKTtcbiAgICB9XG5cbiAgICBlbnJvbGwoY29udGV4dDpBUElDb250ZXh0LCB1c2VySWRzOiBudW1iZXJbXSk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQuYXBpU2VydmljZS5leGVjdXRlKHRoaXMuX19hcGlfX2Vucm9sbCh0aGlzLmlkLCB1c2VySWRzKSwgXG4gICAgICAgICAgICBjb250ZXh0LmF1dGhTZXJ2aWNlLkxvZ2luVG9rZW4pO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdFB1YmxpY0V4YW0oKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShFeGFtLk1vZGVsLCBbXSxcIlsoJ2lzX3B1YmxpYycsJz0nLFRydWUpXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsaXN0UHVibGljRXhhbShjb250ZXh0OkFQSUNvbnRleHQpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBFeGFtLnNlYXJjaChjb250ZXh0LFtdLFwiWygnaXNfcHVibGljJywnPScsVHJ1ZSldXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdEJ5U3VwZXJ2aXNvcihzdXBlcnZpc29ySWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoRXhhbS5Nb2RlbCwgW10sXCJbKCdzdXBlcnZpc29yX2lkJywnPScsXCIrc3VwZXJ2aXNvcklkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RCeVN1cGVydmlzb3IoY29udGV4dDpBUElDb250ZXh0LCBzdXBlcnZpc29ySWQ6IG51bWJlcik6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgaWYgKENhY2hlLmhpdChFeGFtLk1vZGVsKSlcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKENhY2hlLmxvYWQoRXhhbS5Nb2RlbCkpLm1hcChleGFtcz0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5maWx0ZXIoZXhhbXMsIChleGFtOkV4YW0pPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXhhbS5zdXBlcnZpc29yX2lkID09IHN1cGVydmlzb3JJZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gRXhhbS5zZWFyY2goY29udGV4dCxbXSxcIlsoJ3N1cGVydmlzb3JfaWQnLCc9JyxcIitzdXBlcnZpc29ySWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeVN1cGVydmlzb3JBbmREYXRlKHN1cGVydmlzb3JJZDogbnVtYmVyLCBzdGFydDpEYXRlLCBlbmQ6RGF0ZSk6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICB2YXIgc3RhcnREYXRlU3RyID0gbW9tZW50KHN0YXJ0KS5mb3JtYXQoU0VSVkVSX0RBVEVUSU1FX0ZPUk1BVCk7XG4gICAgICAgIHZhciBlbmREYXRlU3RyID0gbW9tZW50KGVuZCkuZm9ybWF0KFNFUlZFUl9EQVRFVElNRV9GT1JNQVQpO1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoRXhhbS5Nb2RlbCwgW10sXCJbKCdzdGFydCcsJz49JywnXCIrc3RhcnREYXRlU3RyK1wiJyksKCdzdGFydCcsJzw9JywnXCIrZW5kRGF0ZVN0citcIicpLCgnc3VwZXJ2aXNvcl9pZCcsJz0nLFwiK3N1cGVydmlzb3JJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsaXN0QnlTdXBlcnZpc29yQW5kRGF0ZShjb250ZXh0OkFQSUNvbnRleHQsIHN1cGVydmlzb3JJZDogbnVtYmVyLCBzdGFydDpEYXRlLCBlbmQ6RGF0ZSk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdmFyIHN0YXJ0RGF0ZVN0ciA9IG1vbWVudChzdGFydCkuZm9ybWF0KFNFUlZFUl9EQVRFVElNRV9GT1JNQVQpO1xuICAgICAgICB2YXIgZW5kRGF0ZVN0ciA9IG1vbWVudChlbmQpLmZvcm1hdChTRVJWRVJfREFURVRJTUVfRk9STUFUKTtcbiAgICAgICAgaWYgKENhY2hlLmhpdChFeGFtLk1vZGVsKSlcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKENhY2hlLmxvYWQoRXhhbS5Nb2RlbCkpLm1hcChleGFtcz0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5maWx0ZXIoZXhhbXMsIChleGFtOkV4YW0pPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXhhbS5zdGFydC5nZXRUaW1lKCkgPj0gIHN0YXJ0LmdldFRpbWUoKSAmJiBleGFtLnN0YXJ0LmdldFRpbWUoKSA8PSBlbmQuZ2V0VGltZSgpICYmIGV4YW0uc3VwZXJ2aXNvcl9pZCA9PSBzdXBlcnZpc29ySWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIEV4YW0uc2VhcmNoKGNvbnRleHQsW10sXCJbKCdzdGFydCcsJz49JywnXCIrc3RhcnREYXRlU3RyK1wiJyksKCdzdGFydCcsJzw9JywnXCIrZW5kRGF0ZVN0citcIicpLCgnc3VwZXJ2aXNvcl9pZCcsJz0nLFwiK3N1cGVydmlzb3JJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdEJ5Q2xhc3MoY2xhc3NJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShFeGFtLk1vZGVsLCBbXSxcIlsoJ2NvdXJzZV9jbGFzc19pZCcsJz0nLFwiK2NsYXNzSWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5Q2xhc3MoY29udGV4dDpBUElDb250ZXh0LCBjbGFzc0lkOiBudW1iZXIpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmIChDYWNoZS5oaXQoRXhhbS5Nb2RlbCkpXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihDYWNoZS5sb2FkKEV4YW0uTW9kZWwpKS5tYXAoZXhhbXM9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKGV4YW1zLCAoZXhhbTpFeGFtKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4YW0uc3VwZXJ2aXNvcl9pZCA9PSBjbGFzc0lkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBFeGFtLnNlYXJjaChjb250ZXh0LFtdLFwiWygnY291cnNlX2NsYXNzX2lkJywnPScsXCIrY2xhc3NJZCtcIildXCIpO1xuICAgIH1cblxuICAgIF9fYXBpX19vcGVuKGV4YW1JZDogbnVtYmVyKTogRXhlY3V0ZUFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgRXhlY3V0ZUFQSShFeGFtLk1vZGVsLCAnb3Blbicse2V4YW1JZDpleGFtSWR9LCBudWxsKTtcbiAgICB9XG5cbiAgICBvcGVuKGNvbnRleHQ6QVBJQ29udGV4dCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQuYXBpU2VydmljZS5leGVjdXRlKHRoaXMuX19hcGlfX29wZW4odGhpcy5pZCksIFxuICAgICAgICAgICAgY29udGV4dC5hdXRoU2VydmljZS5Mb2dpblRva2VuKTtcbiAgICB9XG5cbiAgICBfX2FwaV9fY2xvc2UoZXhhbUlkOiBudW1iZXIpOiBFeGVjdXRlQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFeGVjdXRlQVBJKEV4YW0uTW9kZWwsICdjbG9zZScse2V4YW1JZDpleGFtSWR9LCBudWxsKTtcbiAgICB9XG5cbiAgICBjbG9zZShjb250ZXh0OkFQSUNvbnRleHQpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBjb250ZXh0LmFwaVNlcnZpY2UuZXhlY3V0ZSh0aGlzLl9fYXBpX19jbG9zZSh0aGlzLmlkKSwgXG4gICAgICAgICAgICBjb250ZXh0LmF1dGhTZXJ2aWNlLkxvZ2luVG9rZW4pO1xuICAgIH1cblxuICAgIF9fYXBpX19lbnJvbGxfc3VwZXJ2aW9yKGV4YW1JZDogbnVtYmVyLCB1c2VySWRzOiBudW1iZXJbXSk6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IEV4ZWN1dGVBUEkoRXhhbS5Nb2RlbCwgJ2Vucm9sbF9zdXBlcnZpc29yJyx7dXNlcklkczp1c2VySWRzLCBleGFtSWQ6ZXhhbUlkfSwgbnVsbCk7XG4gICAgfVxuXG4gICAgZW5yb2xsU3VwZXJ2aXNvcihjb250ZXh0OkFQSUNvbnRleHQsIHVzZXJJZHM6IG51bWJlcltdKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gY29udGV4dC5hcGlTZXJ2aWNlLmV4ZWN1dGUodGhpcy5fX2FwaV9fZW5yb2xsX3N1cGVydmlvcih0aGlzLmlkLCB1c2VySWRzKSwgXG4gICAgICAgICAgICBjb250ZXh0LmF1dGhTZXJ2aWNlLkxvZ2luVG9rZW4pO1xuICAgIH1cbn1cbiJdfQ==

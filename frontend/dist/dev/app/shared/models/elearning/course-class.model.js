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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtY2xhc3MubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQTBDO0FBQzFDLDhCQUE4QztBQUM5QywwQ0FBbUQ7QUFHbkQsc0VBQW1FO0FBQ25FLHlEQUFrRDtBQUNsRCwrQkFBaUM7QUFDakMsMENBQW9EO0FBQ3BELDhEQUE0RDtBQUM1RCw4QkFBZ0M7QUFHaEM7SUFBaUMsK0JBQVM7SUFHdEM7UUFBQSxZQUNJLGlCQUFPLFNBV2I7UUFUQSxLQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUNoQixLQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUNuQyxLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUNyQixLQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztRQUMvQixLQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztRQUNqQyxLQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsYUFBYSxHQUFJLFNBQVMsQ0FBQztRQUNoQyxLQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztRQUNyQixLQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQzs7SUFDL0IsQ0FBQztvQkFmVyxXQUFXO0lBOEJwQixzQkFBSSxvQ0FBVzthQUFmO1lBQ0ksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFHLE1BQU07Z0JBQ3BCLE9BQU8sS0FBSyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRztnQkFDVCxPQUFPLEtBQUssQ0FBQztZQUNqQixJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3JCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNsQyxPQUFPLEtBQUssQ0FBQztZQUNqQixPQUFP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T0FBZTtRQUN2QixPQUFPLElBQUksd0JBQVUsQ0FBQyxhQUFXLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsMEJBQUksR0FBSixVQUFLLE9BQWtCO1FBQ25CLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQ3ZELE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELGtDQUFZLEdBQVosVUFBYSxPQUFlO1FBQ3hCLE9BQU8sSUFBSSx3QkFBVSxDQUFDLGFBQVcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFDLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCwyQkFBSyxHQUFMLFVBQU0sT0FBa0I7UUFDcEIsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFDeEQsT0FBTyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QyxDQUFDOztJQTNGRDtRQURDLHlCQUFhLEVBQVE7a0NBQ2YsSUFBSTs4Q0FBQztJQUVaO1FBREMseUJBQWEsRUFBUTtrQ0FDakIsSUFBSTs0Q0FBQztJQTVCRCxXQUFXO1FBRHZCLGlCQUFLLENBQUMsd0JBQXdCLENBQUM7O09BQ25CLFdBQVcsQ0F1SHZCO0lBQUQsa0JBQUM7Q0F2SEQsQUF1SEMsQ0F2SGdDLHNCQUFTLEdBdUh6QztBQXZIWSxrQ0FBVyIsImZpbGUiOiJhcHAvc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLWNsYXNzLm1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbCxGaWVsZFByb3BlcnR5IH0gZnJvbSAnLi4vZGVjb3JhdG9yJztcbmltcG9ydCB7IEFQSUNvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCB7IENvbmZlcmVuY2UgfSBmcm9tICcuL2NvbmZlcmVuY2UubW9kZWwnO1xuaW1wb3J0IHsgU2VhcmNoUmVhZEFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9zZWFyY2gtcmVhZC5hcGknO1xuaW1wb3J0IHsgQ2FjaGUgfSBmcm9tICcuLi8uLi9oZWxwZXJzL2NhY2hlLnV0aWxzJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtTRVJWRVJfREFURVRJTUVfRk9STUFUfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgRXhlY3V0ZUFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9leGVjdXRlLmFwaSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuXG5ATW9kZWwoJ2V0cmFpbmluZy5jb3Vyc2VfY2xhc3MnKVxuZXhwb3J0IGNsYXNzIENvdXJzZUNsYXNzIGV4dGVuZHMgQmFzZU1vZGVse1xuXG4gICAgLy8gRGVmYXVsdCBjb25zdHJ1Y3RvciB3aWxsIGJlIGNhbGxlZCBieSBtYXBwZXJcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXHRcdFxuXHRcdHRoaXMubmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jb3Vyc2VfbmFtZSA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLmNvdXJzZV9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zdXBlcnZpc29yX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN1cGVydmlzb3JfbmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zdGFydCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jb25mZXJlbmNlX2lkID0gIHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5lbmQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gdW5kZWZpbmVkO1xuXHR9XG5cbiAgICBuYW1lOnN0cmluZztcbiAgICBjb3Vyc2VfbmFtZTpzdHJpbmc7XG4gICAgc3VwZXJ2aXNvcl9uYW1lOnN0cmluZztcbiAgICBjb3Vyc2VfaWQ6IG51bWJlcjtcbiAgICBjb25mZXJlbmNlX2lkOiBudW1iZXI7XG4gICAgc3VwZXJ2aXNvcl9pZDogbnVtYmVyO1xuICAgIHN0YXR1czogc3RyaW5nO1xuXG4gICAgQEZpZWxkUHJvcGVydHk8RGF0ZT4oKVxuICAgIHN0YXJ0OiBEYXRlO1xuICAgIEBGaWVsZFByb3BlcnR5PERhdGU+KClcbiAgICBlbmQ6IERhdGU7XG5cbiAgICBnZXQgSXNBdmFpbGFibGUoKTpib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzICE9J29wZW4nKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMuZW5kKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgaWYgKHRoaXMuZW5kLmdldFRpbWUoKSA8IG5vdy5nZXRUaW1lKCkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdEJ5Q291cnNlKGNvdXJzZUlkOiBudW1iZXIpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKENvdXJzZUNsYXNzLk1vZGVsLCBbXSxcIlsoJ2NvdXJzZV9pZCcsJz0nLFwiK2NvdXJzZUlkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RCeUNvdXJzZShjb250ZXh0OkFQSUNvbnRleHQsIGNvdXJzZUlkOm51bWJlcik6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIENvdXJzZUNsYXNzLnNlYXJjaChjb250ZXh0LFtdLCBcIlsoJ2NvdXJzZV9pZCcsJz0nLFwiK2NvdXJzZUlkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgX19hcGlfX2Vucm9sbChjbGFzc0lkOiBudW1iZXIsIHVzZXJJZHM6IG51bWJlcltdKTogRXhlY3V0ZUFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgRXhlY3V0ZUFQSShDb3Vyc2VDbGFzcy5Nb2RlbCwgJ2Vucm9sbCcse2NsYXNzSWQ6Y2xhc3NJZCx1c2VySWRzOnVzZXJJZHN9LCBudWxsKTtcbiAgICB9XG5cbiAgICBlbnJvbGwoY29udGV4dDpBUElDb250ZXh0LCB1c2VySWRzOiBudW1iZXJbXSk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQuYXBpU2VydmljZS5leGVjdXRlKHRoaXMuX19hcGlfX2Vucm9sbCh0aGlzLmlkLCB1c2VySWRzKSwgXG4gICAgICAgICAgICBjb250ZXh0LmF1dGhTZXJ2aWNlLkxvZ2luVG9rZW4pO1xuXG4gICAgfVxuXG4gICAgX19hcGlfX2Vucm9sbF9zdGFmZihjbGFzc0lkOiBudW1iZXIsIHVzZXJJZHM6IG51bWJlcltdKTogRXhlY3V0ZUFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgRXhlY3V0ZUFQSShDb3Vyc2VDbGFzcy5Nb2RlbCwgJ2Vucm9sbF9zdGFmZicse2NsYXNzSWQ6Y2xhc3NJZCx1c2VySWRzOnVzZXJJZHN9LCBudWxsKTtcbiAgICB9XG5cbiAgICBlbnJvbGxTdGFmZihjb250ZXh0OkFQSUNvbnRleHQsIHVzZXJJZHM6IG51bWJlcltdKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gY29udGV4dC5hcGlTZXJ2aWNlLmV4ZWN1dGUodGhpcy5fX2FwaV9fZW5yb2xsX3N0YWZmKHRoaXMuaWQsIHVzZXJJZHMpLCBcbiAgICAgICAgICAgIGNvbnRleHQuYXV0aFNlcnZpY2UuTG9naW5Ub2tlbik7XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeVN1cGVydmlzb3Ioc3VwZXJ2aXNvcklkOiBudW1iZXIpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKENvdXJzZUNsYXNzLk1vZGVsLCBbXSxcIlsoJ3N1cGVydmlzb3JfaWQnLCc9JyxcIitzdXBlcnZpc29ySWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5U3VwZXJ2aXNvcihjb250ZXh0OkFQSUNvbnRleHQsIHN1cGVydmlzb3JJZDogbnVtYmVyKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBpZiAoQ2FjaGUuaGl0KENvdXJzZUNsYXNzLk1vZGVsKSlcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKENhY2hlLmxvYWQoQ291cnNlQ2xhc3MuTW9kZWwpKS5tYXAoY2xhc3NMaXN0PT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmZpbHRlcihjbGFzc0xpc3QsIChjbGF6ejpDb3Vyc2VDbGFzcyk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGF6ei5zdXBlcnZpc29yX2lkID09IHN1cGVydmlzb3JJZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gQ291cnNlQ2xhc3Muc2VhcmNoKGNvbnRleHQsW10sXCJbKCdzdXBlcnZpc29yX2lkJywnPScsXCIrc3VwZXJ2aXNvcklkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlTdXBlcnZpc29yQW5kRGF0ZShzdXBlcnZpc29ySWQ6IG51bWJlciwgc3RhcnQ6RGF0ZSwgZW5kOkRhdGUpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgdmFyIHN0YXJ0RGF0ZVN0ciA9IG1vbWVudChzdGFydCkuZm9ybWF0KFNFUlZFUl9EQVRFVElNRV9GT1JNQVQpO1xuICAgICAgICB2YXIgZW5kRGF0ZVN0ciA9IG1vbWVudChlbmQpLmZvcm1hdChTRVJWRVJfREFURVRJTUVfRk9STUFUKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKENvdXJzZUNsYXNzLk1vZGVsLCBbXSxcIlsoJ3N0YXJ0JywnPj0nLCdcIitzdGFydERhdGVTdHIrXCInKSwoJ3N0YXJ0JywnPD0nLCdcIitlbmREYXRlU3RyK1wiJyksKCdzdXBlcnZpc29yX2lkJywnPScsXCIrc3VwZXJ2aXNvcklkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RCeVN1cGVydmlzb3JBbmREYXRlKGNvbnRleHQ6QVBJQ29udGV4dCwgc3VwZXJ2aXNvcklkOiBudW1iZXIsIHN0YXJ0OkRhdGUsIGVuZDpEYXRlKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB2YXIgc3RhcnREYXRlU3RyID0gbW9tZW50KHN0YXJ0KS5mb3JtYXQoU0VSVkVSX0RBVEVUSU1FX0ZPUk1BVCk7XG4gICAgICAgIHZhciBlbmREYXRlU3RyID0gbW9tZW50KGVuZCkuZm9ybWF0KFNFUlZFUl9EQVRFVElNRV9GT1JNQVQpO1xuICAgICAgICBpZiAoQ2FjaGUuaGl0KENvdXJzZUNsYXNzLk1vZGVsKSlcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKENhY2hlLmxvYWQoQ291cnNlQ2xhc3MuTW9kZWwpKS5tYXAoY2xhc3NMaXN0PT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmZpbHRlcihjbGFzc0xpc3QsIChjbGF6ejpDb3Vyc2VDbGFzcyk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGF6ei5zdGFydC5nZXRUaW1lKCkgPj0gIHN0YXJ0LmdldFRpbWUoKSAmJiBjbGF6ei5zdGFydC5nZXRUaW1lKCkgPD0gZW5kLmdldFRpbWUoKSAmJiBjbGF6ei5zdXBlcnZpc29yX2lkID09IHN1cGVydmlzb3JJZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gQ291cnNlQ2xhc3Muc2VhcmNoKGNvbnRleHQsW10sXCJbKCdzdGFydCcsJz49JywnXCIrc3RhcnREYXRlU3RyK1wiJyksKCdzdGFydCcsJzw9JywnXCIrZW5kRGF0ZVN0citcIicpLCgnc3VwZXJ2aXNvcl9pZCcsJz0nLFwiK3N1cGVydmlzb3JJZCtcIildXCIpO1xuICAgIH1cblxuICAgIF9fYXBpX19vcGVuKGNsYXNzSWQ6IG51bWJlcik6IEV4ZWN1dGVBUEkge1xuICAgICAgICByZXR1cm4gbmV3IEV4ZWN1dGVBUEkoQ291cnNlQ2xhc3MuTW9kZWwsICdvcGVuJyx7Y2xhc3NJZDpjbGFzc0lkfSwgbnVsbCk7XG4gICAgfVxuXG4gICAgb3Blbihjb250ZXh0OkFQSUNvbnRleHQpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBjb250ZXh0LmFwaVNlcnZpY2UuZXhlY3V0ZSh0aGlzLl9fYXBpX19vcGVuKHRoaXMuaWQpLCBcbiAgICAgICAgICAgIGNvbnRleHQuYXV0aFNlcnZpY2UuTG9naW5Ub2tlbik7XG4gICAgfVxuXG4gICAgX19hcGlfX2Nsb3NlKGNsYXNzSWQ6IG51bWJlcik6IEV4ZWN1dGVBUEkge1xuICAgICAgICByZXR1cm4gbmV3IEV4ZWN1dGVBUEkoQ291cnNlQ2xhc3MuTW9kZWwsICdjbG9zZScse2NsYXNzSWQ6Y2xhc3NJZH0sIG51bGwpO1xuICAgIH1cblxuICAgIGNsb3NlKGNvbnRleHQ6QVBJQ29udGV4dCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQuYXBpU2VydmljZS5leGVjdXRlKHRoaXMuX19hcGlfX2Nsb3NlKHRoaXMuaWQpLCBcbiAgICAgICAgICAgIGNvbnRleHQuYXV0aFNlcnZpY2UuTG9naW5Ub2tlbik7XG4gICAgfVxuXG59XG4iXX0=

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
var search_read_api_1 = require("../../services/api/search-read.api");
var execute_api_1 = require("../../services/api/execute.api");
var cache_utils_1 = require("../../helpers/cache.utils");
var Survey = (function (_super) {
    __extends(Survey, _super);
    function Survey() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.summary = undefined;
        _this.instruction = undefined;
        _this.start = undefined;
        _this.end = undefined;
        _this.status = undefined;
        _this.supervisor_id = undefined;
        _this.supervisor_name = undefined;
        _this.is_public = undefined;
        _this.review_state = undefined;
        _this.course_class_id = undefined;
        _this.sheet_id = undefined;
        _this.question_count = undefined;
        _this.sheet_status = undefined;
        return _this;
    }
    Survey_1 = Survey;
    Object.defineProperty(Survey.prototype, "IsAvailable", {
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
    Survey.__api__listPublicSurvey = function () {
        return new search_read_api_1.SearchReadAPI(Survey_1.Model, [], "[('is_public','=',True)");
    };
    Survey.listPublicSurvey = function (context) {
        return Survey_1.search(context, [], "[('is_public','=',True)]");
    };
    Survey.__api__allForEnrollPublic = function () {
        return new search_read_api_1.SearchReadAPI(Survey_1.Model, [], "[('review_state','=','approved'),('is_public','=',True)]");
    };
    Survey.allForEnrollPublic = function (context) {
        if (cache_utils_1.Cache.hit(Survey_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Survey_1.Model)).map(function (surveys) {
                return _.filter(surveys, function (survey) {
                    return survey.review_state == 'approved' && survey.is_public;
                });
            });
        return Survey_1.search(context, [], "[('review_state','=','approved'),('is_public','=',True)]");
    };
    Survey.__api__listByClass = function (classId) {
        return new search_read_api_1.SearchReadAPI(Survey_1.Model, [], "[('course_class_id','='," + classId + ")]");
    };
    Survey.listByClass = function (context, classId) {
        if (cache_utils_1.Cache.hit(Survey_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Survey_1.Model)).map(function (surveys) {
                return _.filter(surveys, function (survey) {
                    return survey.supervisor_id == classId;
                });
            });
        return Survey_1.search(context, [], "[('course_class_id','='," + classId + ")]");
    };
    Survey.prototype.__api__open = function (surveyId) {
        return new execute_api_1.ExecuteAPI(Survey_1.Model, 'open', { surveyId: surveyId }, null);
    };
    Survey.prototype.open = function (context) {
        return context.apiService.execute(this.__api__open(this.id), context.authService.LoginToken);
    };
    Survey.prototype.__api__close = function (surveyId) {
        return new execute_api_1.ExecuteAPI(Survey_1.Model, 'close', { surveyId: surveyId }, null);
    };
    Survey.prototype.close = function (context) {
        return context.apiService.execute(this.__api__close(this.id), context.authService.LoginToken);
    };
    Survey.prototype.__api__enroll = function (surveyId, userIds) {
        return new execute_api_1.ExecuteAPI(Survey_1.Model, 'enroll', { userIds: userIds, surveyId: surveyId }, null);
    };
    Survey.prototype.enroll = function (context, userIds) {
        return context.apiService.execute(this.__api__enroll(this.id, userIds), context.authService.LoginToken);
    };
    Survey.prototype.__api__enroll_supervior = function (examId, userIds) {
        return new execute_api_1.ExecuteAPI(Survey_1.Model, 'enroll_supervisor', { userIds: userIds, examId: examId }, null);
    };
    Survey.prototype.enrollSupervisor = function (context, userIds) {
        return context.apiService.execute(this.__api__enroll_supervior(this.id, userIds), context.authService.LoginToken);
    };
    var Survey_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], Survey.prototype, "start", void 0);
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], Survey.prototype, "end", void 0);
    Survey = Survey_1 = __decorate([
        decorator_1.Model('etraining.survey'),
        __metadata("design:paramtypes", [])
    ], Survey);
    return Survey;
}(base_model_1.BaseModel));
exports.Survey = Survey;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXkubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQTBDO0FBQzFDLDhCQUE4QztBQUM5QywwQ0FBbUQ7QUFFbkQsOEJBQWdDO0FBQ2hDLHNFQUFtRTtBQUNuRSw4REFBNEQ7QUFDNUQseURBQWtEO0FBS2xEO0lBQTRCLDBCQUFTO0lBR2pDO1FBQUEsWUFDSSxpQkFBTyxTQWdCYjtRQWRBLEtBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLEtBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBQ3hCLEtBQUksQ0FBQyxhQUFhLEdBQUksU0FBUyxDQUFDO1FBQ2hDLEtBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxTQUFTLEdBQUksU0FBUyxDQUFDO1FBQzVCLEtBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO1FBQzlCLEtBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxRQUFRLEdBQUksU0FBUyxDQUFDO1FBQzNCLEtBQUksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO1FBQ2hDLEtBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDOztJQUNyQyxDQUFDO2VBcEJXLE1BQU07SUF1Q2Ysc0JBQUksK0JBQVc7YUFBZjtZQUNJLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxVQUFVO2dCQUMvQixPQUFPLEtBQUssQ0FBQztZQUNqQixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUcsTUFBTTtnQkFDcEIs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LE1BQU0sRUFBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BHLENBQUM7SUFFRCxpQ0FBZ0IsR0FBaEIsVUFBaUIsT0FBa0IsRUFBRSxPQUFpQjtRQUNsRCxPQUFPLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUM1RSxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7O0lBN0ZEO1FBREMseUJBQWEsRUFBUTtrQ0FDZixJQUFJO3lDQUFDO0lBRVo7UUFEQyx5QkFBYSxFQUFRO2tDQUNqQixJQUFJO3VDQUFDO0lBakNELE1BQU07UUFEbEIsaUJBQUssQ0FBQyxrQkFBa0IsQ0FBQzs7T0FDYixNQUFNLENBNkhsQjtJQUFELGFBQUM7Q0E3SEQsQUE2SEMsQ0E3SDJCLHNCQUFTLEdBNkhwQztBQTdIWSx3QkFBTSIsImZpbGUiOiJhcHAvc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VydmV5Lm1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbCxGaWVsZFByb3BlcnR5IH0gZnJvbSAnLi4vZGVjb3JhdG9yJztcbmltcG9ydCB7IEFQSUNvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBTZWFyY2hSZWFkQVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL3NlYXJjaC1yZWFkLmFwaSc7XG5pbXBvcnQgeyBFeGVjdXRlQVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL2V4ZWN1dGUuYXBpJztcbmltcG9ydCB7IENhY2hlIH0gZnJvbSAnLi4vLi4vaGVscGVycy9jYWNoZS51dGlscyc7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IFNFUlZFUl9EQVRFVElNRV9GT1JNQVR9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5cbkBNb2RlbCgnZXRyYWluaW5nLnN1cnZleScpXG5leHBvcnQgY2xhc3MgU3VydmV5IGV4dGVuZHMgQmFzZU1vZGVse1xuXG4gICAgLy8gRGVmYXVsdCBjb25zdHJ1Y3RvciB3aWxsIGJlIGNhbGxlZCBieSBtYXBwZXJcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXHRcdFxuXHRcdHRoaXMubmFtZSA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLnN1bW1hcnkgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5pbnN0cnVjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zdGFydCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5lbmQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN1cGVydmlzb3JfaWQgPSAgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN1cGVydmlzb3JfbmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5pc19wdWJsaWMgPSAgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnJldmlld19zdGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jb3Vyc2VfY2xhc3NfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc2hlZXRfaWQgPSAgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnF1ZXN0aW9uX2NvdW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnNoZWV0X3N0YXR1cyA9IHVuZGVmaW5lZDtcblx0fVxuXG4gICAgc2hlZXRfaWQ6IG51bWJlcjtcbiAgICBxdWVzdGlvbl9jb3VudDogbnVtYmVyO1xuICAgIHNoZWV0X3N0YXR1czogc3RyaW5nO1xuICAgIGNvdXJzZV9jbGFzc19pZDogbnVtYmVyO1xuICAgIHJldmlld19zdGF0ZTpzdHJpbmc7XG4gICAgbmFtZTpzdHJpbmc7XG4gICAgc3VtbWFyeTogc3RyaW5nO1xuICAgIGluc3RydWN0aW9uOiBzdHJpbmc7XG4gICAgQEZpZWxkUHJvcGVydHk8RGF0ZT4oKVxuICAgIHN0YXJ0OiBEYXRlO1xuICAgIEBGaWVsZFByb3BlcnR5PERhdGU+KClcbiAgICBlbmQ6IERhdGU7XG4gICAgc3RhdHVzOiBzdHJpbmc7XG4gICAgaXNfcHVibGljOiBib29sZWFuO1xuICAgIHN1cGVydmlzb3JfaWQ6IG51bWJlcjtcbiAgICBzdXBlcnZpc29yX25hbWU6IHN0cmluZztcblxuICAgIGdldCBJc0F2YWlsYWJsZSgpOmJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5yZXZpZXdfc3RhdGUgIT0gJ2FwcHJvdmVkJylcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzICE9J29wZW4nKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMuZW5kKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnQuZ2V0VGltZSgpID4gbm93LmdldFRpbWUoKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuZW5kLmdldFRpbWUoKSA8IG5vdy5nZXRUaW1lKCkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdFB1YmxpY1N1cnZleSgpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKFN1cnZleS5Nb2RlbCwgW10sXCJbKCdpc19wdWJsaWMnLCc9JyxUcnVlKVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdFB1YmxpY1N1cnZleShjb250ZXh0OkFQSUNvbnRleHQpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBTdXJ2ZXkuc2VhcmNoKGNvbnRleHQsW10sXCJbKCdpc19wdWJsaWMnLCc9JyxUcnVlKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19hbGxGb3JFbnJvbGxQdWJsaWMoKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShTdXJ2ZXkuTW9kZWwsIFtdLFwiWygncmV2aWV3X3N0YXRlJywnPScsJ2FwcHJvdmVkJyksKCdpc19wdWJsaWMnLCc9JyxUcnVlKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGFsbEZvckVucm9sbFB1YmxpYyhjb250ZXh0OkFQSUNvbnRleHQpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmIChDYWNoZS5oaXQoU3VydmV5Lk1vZGVsKSlcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKENhY2hlLmxvYWQoU3VydmV5Lk1vZGVsKSkubWFwKHN1cnZleXM9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKHN1cnZleXMsIChzdXJ2ZXk6U3VydmV5KT0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1cnZleS5yZXZpZXdfc3RhdGUgPT0gJ2FwcHJvdmVkJyAmJiBzdXJ2ZXkuaXNfcHVibGljO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBTdXJ2ZXkuc2VhcmNoKGNvbnRleHQsW10sXCJbKCdyZXZpZXdfc3RhdGUnLCc9JywnYXBwcm92ZWQnKSwoJ2lzX3B1YmxpYycsJz0nLFRydWUpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeUNsYXNzKGNsYXNzSWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoU3VydmV5Lk1vZGVsLCBbXSxcIlsoJ2NvdXJzZV9jbGFzc19pZCcsJz0nLFwiK2NsYXNzSWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5Q2xhc3MoY29udGV4dDpBUElDb250ZXh0LCBjbGFzc0lkOiBudW1iZXIpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmIChDYWNoZS5oaXQoU3VydmV5Lk1vZGVsKSlcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKENhY2hlLmxvYWQoU3VydmV5Lk1vZGVsKSkubWFwKHN1cnZleXM9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKHN1cnZleXMsIChzdXJ2ZXk6U3VydmV5KT0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1cnZleS5zdXBlcnZpc29yX2lkID09IGNsYXNzSWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFN1cnZleS5zZWFyY2goY29udGV4dCxbXSxcIlsoJ2NvdXJzZV9jbGFzc19pZCcsJz0nLFwiK2NsYXNzSWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBfX2FwaV9fb3BlbihzdXJ2ZXlJZDogbnVtYmVyKTogRXhlY3V0ZUFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgRXhlY3V0ZUFQSShTdXJ2ZXkuTW9kZWwsICdvcGVuJyx7c3VydmV5SWQ6c3VydmV5SWR9LCBudWxsKTtcbiAgICB9XG5cbiAgICBvcGVuKGNvbnRleHQ6QVBJQ29udGV4dCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQuYXBpU2VydmljZS5leGVjdXRlKHRoaXMuX19hcGlfX29wZW4odGhpcy5pZCksIFxuICAgICAgICAgICAgY29udGV4dC5hdXRoU2VydmljZS5Mb2dpblRva2VuKTtcbiAgICB9XG5cbiAgICBfX2FwaV9fY2xvc2Uoc3VydmV5SWQ6IG51bWJlcik6IEV4ZWN1dGVBUEkge1xuICAgICAgICByZXR1cm4gbmV3IEV4ZWN1dGVBUEkoU3VydmV5Lk1vZGVsLCAnY2xvc2UnLHtzdXJ2ZXlJZDpzdXJ2ZXlJZH0sIG51bGwpO1xuICAgIH1cblxuICAgIGNsb3NlKGNvbnRleHQ6QVBJQ29udGV4dCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQuYXBpU2VydmljZS5leGVjdXRlKHRoaXMuX19hcGlfX2Nsb3NlKHRoaXMuaWQpLCBcbiAgICAgICAgICAgIGNvbnRleHQuYXV0aFNlcnZpY2UuTG9naW5Ub2tlbik7XG4gICAgfVxuXG4gICAgX19hcGlfX2Vucm9sbChzdXJ2ZXlJZDogbnVtYmVyLCB1c2VySWRzOiBudW1iZXJbXSk6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IEV4ZWN1dGVBUEkoU3VydmV5Lk1vZGVsLCAnZW5yb2xsJyx7dXNlcklkczp1c2VySWRzLCBzdXJ2ZXlJZDpzdXJ2ZXlJZH0sIG51bGwpO1xuICAgIH1cblxuICAgIGVucm9sbChjb250ZXh0OkFQSUNvbnRleHQsIHVzZXJJZHM6IG51bWJlcltdKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gY29udGV4dC5hcGlTZXJ2aWNlLmV4ZWN1dGUodGhpcy5fX2FwaV9fZW5yb2xsKHRoaXMuaWQsIHVzZXJJZHMpLCBcbiAgICAgICAgICAgIGNvbnRleHQuYXV0aFNlcnZpY2UuTG9naW5Ub2tlbik7XG4gICAgfVxuXG4gICAgX19hcGlfX2Vucm9sbF9zdXBlcnZpb3IoZXhhbUlkOiBudW1iZXIsIHVzZXJJZHM6IG51bWJlcltdKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgRXhlY3V0ZUFQSShTdXJ2ZXkuTW9kZWwsICdlbnJvbGxfc3VwZXJ2aXNvcicse3VzZXJJZHM6dXNlcklkcywgZXhhbUlkOmV4YW1JZH0sIG51bGwpO1xuICAgIH1cblxuICAgIGVucm9sbFN1cGVydmlzb3IoY29udGV4dDpBUElDb250ZXh0LCB1c2VySWRzOiBudW1iZXJbXSk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQuYXBpU2VydmljZS5leGVjdXRlKHRoaXMuX19hcGlfX2Vucm9sbF9zdXBlcnZpb3IodGhpcy5pZCwgdXNlcklkcyksIFxuICAgICAgICAgICAgY29udGV4dC5hdXRoU2VydmljZS5Mb2dpblRva2VuKTtcbiAgICB9XG59XG4iXX0=

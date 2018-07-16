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

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
var search_read_api_1 = require("../../services/api/search-read.api");
var base_model_1 = require("../base.model");
var survey_model_1 = require("./survey.model");
var Rx_1 = require("rxjs/Rx");
var decorator_1 = require("../decorator");
var _ = require("underscore");
var list_api_1 = require("../../services/api/list.api");
var SurveyMember = (function (_super) {
    __extends(SurveyMember, _super);
    function SurveyMember() {
        var _this = _super.call(this) || this;
        _this.survey_id = undefined;
        _this.course_member_id = undefined;
        _this.date_register = undefined;
        _this.name = undefined;
        _this.login = undefined;
        _this.email = undefined;
        _this.phone = undefined;
        _this.user_id = undefined;
        _this.group_id = undefined;
        _this.group_id__DESC__ = undefined;
        _this.enroll_status = undefined;
        _this.role = undefined;
        _this.survey = new survey_model_1.Survey();
        _this.submission_id = undefined;
        _this.survey_review_state = undefined;
        return _this;
    }
    SurveyMember_1 = SurveyMember;
    SurveyMember.__api__listByUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(SurveyMember_1.Model, [], "[('user_id','='," + userId + ")]");
    };
    SurveyMember.__api__listBySurvey = function (surveyId) {
        return new search_read_api_1.SearchReadAPI(SurveyMember_1.Model, [], "[('survey_id','='," + surveyId + ")]");
    };
    SurveyMember.__api__bySurveyAndUser = function (surveyId, userId) {
        return new search_read_api_1.SearchReadAPI(SurveyMember_1.Model, [], "[('user_id','='," + userId + "),('survey_id','='," + surveyId + ")]");
    };
    SurveyMember.listBySurvey = function (context, surveyId) {
        return SurveyMember_1.search(context, [], "[('survey_id','='," + surveyId + ")]");
    };
    SurveyMember.listByUser = function (context, userId) {
        return SurveyMember_1.search(context, [], "[('user_id','='," + userId + ")]");
    };
    SurveyMember.bySurveyAndUser = function (context, userId, surveyId) {
        return SurveyMember_1.single(context, [], "[('user_id','='," + userId + "),('survey_id','='," + surveyId + ")]");
    };
    SurveyMember.prototype.__api__populateSurvey = function () {
        return new list_api_1.ListAPI(survey_model_1.Survey.Model, [this.survey_id], []);
    };
    SurveyMember.prototype.populateSurvey = function (context) {
        var _this = this;
        if (!this.survey_id)
            return Rx_1.Observable.of(null);
        return survey_model_1.Survey.get(context, this.survey_id).do(function (survey) {
            _this.survey = survey;
        });
    };
    SurveyMember.populateSurveys = function (context, members) {
        var surveyIds = _.pluck(members, 'survey_id');
        surveyIds = _.filter(surveyIds, function (id) {
            return id;
        });
        return survey_model_1.Survey.array(context, surveyIds).do(function (surveys) {
            _.each(members, function (member) {
                member.survey = _.find(surveys, function (survey) {
                    return member.survey_id == survey.id;
                });
            });
        });
    };
    SurveyMember.__api__surveyEditor = function (surveyId) {
        return new search_read_api_1.SearchReadAPI(SurveyMember_1.Model, [], "[('role','=','editor'),('survey_id','='," + surveyId + ")]");
    };
    SurveyMember.surveyEditor = function (context, surveyId) {
        return SurveyMember_1.single(context, [], "[('role','=','editor'),('survey_id','='," + surveyId + ")]");
    };
    SurveyMember.__api__surveySupervisor = function (surveyId) {
        return new search_read_api_1.SearchReadAPI(SurveyMember_1.Model, [], "[('role','=','supervisor'),('survey_id','='," + surveyId + ")]");
    };
    SurveyMember.surveySupervisor = function (context, surveyId) {
        return SurveyMember_1.single(context, [], "[('role','=','supervisor'),('survey_id','='," + surveyId + ")]");
    };
    var SurveyMember_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], SurveyMember.prototype, "date_register", void 0);
    SurveyMember = SurveyMember_1 = __decorate([
        decorator_1.Model('etraining.survey_member'),
        __metadata("design:paramtypes", [])
    ], SurveyMember);
    return SurveyMember;
}(base_model_1.BaseModel));
exports.SurveyMember = SurveyMember;

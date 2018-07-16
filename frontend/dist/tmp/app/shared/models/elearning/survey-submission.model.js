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
var decorator_1 = require("../decorator");
var SurveySubmission = (function (_super) {
    __extends(SurveySubmission, _super);
    function SurveySubmission() {
        var _this = _super.call(this) || this;
        _this.user_id = undefined;
        _this.member_id = undefined;
        _this.end = undefined;
        _this.start = undefined;
        _this.survey_id = undefined;
        return _this;
    }
    SurveySubmission_1 = SurveySubmission;
    SurveySubmission.__api__byMemberAndSurvey = function (member_id, surveyId) {
        return new search_read_api_1.SearchReadAPI(SurveySubmission_1.Model, [], "[('member_id','='," + member_id + "),('survey_id','='," + surveyId + ")]");
    };
    SurveySubmission.byMemberAndSurvey = function (context, member_id, surveyId) {
        return SurveySubmission_1.single(context, [], "[('member_id','='," + member_id + "),('survey_id','='," + surveyId + ")]");
    };
    SurveySubmission.__api__listByUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(SurveySubmission_1.Model, [], "[('user_id','='," + userId + ")]");
    };
    SurveySubmission.listByUser = function (context, userId) {
        return SurveySubmission_1.search(context, [], "[('user_id','='," + userId + ")]");
    };
    SurveySubmission.__api__listBySurvey = function (surveyId) {
        return new search_read_api_1.SearchReadAPI(SurveySubmission_1.Model, [], "[('survey_id','='," + surveyId + ")]");
    };
    SurveySubmission.listBySurvey = function (context, surveyId) {
        return SurveySubmission_1.search(context, [], "[('survey_id','='," + surveyId + ")]");
    };
    SurveySubmission.__api__listByMemer = function (memberId) {
        return new search_read_api_1.SearchReadAPI(SurveySubmission_1.Model, [], "[('member_id','='," + memberId + ")]");
    };
    SurveySubmission.listByMember = function (context, memberId) {
        return SurveySubmission_1.search(context, [], "[('member_id','='," + memberId + ")]");
    };
    var SurveySubmission_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], SurveySubmission.prototype, "end", void 0);
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], SurveySubmission.prototype, "start", void 0);
    SurveySubmission = SurveySubmission_1 = __decorate([
        decorator_1.Model('etraining.survey_submission'),
        __metadata("design:paramtypes", [])
    ], SurveySubmission);
    return SurveySubmission;
}(base_model_1.BaseModel));
exports.SurveySubmission = SurveySubmission;

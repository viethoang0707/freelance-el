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
var decorator_1 = require("../decorator");
var search_read_api_1 = require("../../services/api/search-read.api");
var SurveyAnswer = (function (_super) {
    __extends(SurveyAnswer, _super);
    function SurveyAnswer() {
        var _this = _super.call(this) || this;
        _this.question_id = undefined;
        _this.option_id = undefined;
        _this.submission_id = undefined;
        _this.question_type = undefined;
        _this.text = undefined;
        _this.json = undefined;
        _this.survey_id = undefined;
        return _this;
    }
    SurveyAnswer_1 = SurveyAnswer;
    SurveyAnswer.__api__listBySubmit = function (submitId) {
        return new search_read_api_1.SearchReadAPI(SurveyAnswer_1.Model, [], "[('submission_id','='," + submitId + ")]");
    };
    SurveyAnswer.__api__listBySurvey = function (surveyId) {
        return new search_read_api_1.SearchReadAPI(SurveyAnswer_1.Model, [], "[('survey_id','='," + surveyId + ")]");
    };
    SurveyAnswer.listBySubmit = function (context, submitId) {
        return SurveyAnswer_1.search(context, [], "[('submission_id','='," + submitId + ")]");
    };
    SurveyAnswer.listBySurvey = function (context, surveyId) {
        return SurveyAnswer_1.search(context, [], "[('survey_id','='," + surveyId + ")]");
    };
    var SurveyAnswer_1;
    SurveyAnswer = SurveyAnswer_1 = __decorate([
        decorator_1.Model('etraining.survey_answer'),
        __metadata("design:paramtypes", [])
    ], SurveyAnswer);
    return SurveyAnswer;
}(base_model_1.BaseModel));
exports.SurveyAnswer = SurveyAnswer;

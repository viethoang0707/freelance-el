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
var SurveySheet = (function (_super) {
    __extends(SurveySheet, _super);
    function SurveySheet() {
        var _this = _super.call(this) || this;
        _this.survey_id = undefined;
        _this.name = undefined;
        _this.seed = undefined;
        _this.finalized = undefined;
        return _this;
    }
    SurveySheet_1 = SurveySheet;
    SurveySheet.prototype.clone = function () {
        var sheet = new SurveySheet_1();
        sheet.name = this.name;
        sheet.seed = this.seed;
        sheet.finalized = this.finalized;
        return sheet;
    };
    SurveySheet.__api__bySurvey = function (surveyId) {
        return new search_read_api_1.SearchReadAPI(SurveySheet_1.Model, [], "[('survey_id','='," + surveyId + ")]");
    };
    SurveySheet.__api__listTemplate = function () {
        return new search_read_api_1.SearchReadAPI(SurveySheet_1.Model, [], "[('survey_id','=',False)]");
    };
    SurveySheet.bySurvey = function (context, surveyId) {
        return SurveySheet_1.search(context, [], "[('survey_id','='," + surveyId + ")]").map(function (sheets) {
            return sheets.length ? sheets[0] : null;
        });
    };
    SurveySheet.listTemplate = function (context) {
        return SurveySheet_1.search(context, [], "[('survey_id','=',False)]");
    };
    var SurveySheet_1;
    SurveySheet = SurveySheet_1 = __decorate([
        decorator_1.Model('etraining.survey_sheet'),
        __metadata("design:paramtypes", [])
    ], SurveySheet);
    return SurveySheet;
}(base_model_1.BaseModel));
exports.SurveySheet = SurveySheet;
//# sourceMappingURL=survey-sheet.model.js.map
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
var _ = require("underscore");
var ExamGrade = (function (_super) {
    __extends(ExamGrade, _super);
    function ExamGrade() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.min_score = undefined;
        _this.max_score = undefined;
        _this.exam_id = undefined;
        return _this;
    }
    ExamGrade_1 = ExamGrade;
    ExamGrade.gradeScore = function (grades, score) {
        return _.find(grades, function (obj) {
            return obj.min_score <= score && obj.max_score >= score;
        });
    };
    ExamGrade.__api__listByExam = function (examId) {
        return new search_read_api_1.SearchReadAPI(ExamGrade_1.Model, [], "[('exam_id','='," + examId + ")]");
    };
    ExamGrade.listByExam = function (context, examId) {
        return ExamGrade_1.search(context, [], "[('exam_id','='," + examId + ")]");
    };
    ExamGrade.listByExams = function (context, examIds) {
        var apiList = _.map(examIds, function (id) {
            return ExamGrade_1.__api__listByExam(id);
        });
        return base_model_1.BaseModel.bulk_search.apply(base_model_1.BaseModel, [context].concat(apiList)).map(function (jsonArr) {
            jsonArr = _.flatten(jsonArr);
            return ExamGrade_1.toArray(jsonArr);
        });
    };
    var ExamGrade_1;
    ExamGrade = ExamGrade_1 = __decorate([
        decorator_1.Model('etraining.exam_grade'),
        __metadata("design:paramtypes", [])
    ], ExamGrade);
    return ExamGrade;
}(base_model_1.BaseModel));
exports.ExamGrade = ExamGrade;

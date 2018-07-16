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
var search_count_api_1 = require("../../services/api/search-count.api");
var question_model_1 = require("./question.model");
var list_api_1 = require("../../services/api/list.api");
var _ = require("underscore");
var ExamQuestion = (function (_super) {
    __extends(ExamQuestion, _super);
    function ExamQuestion() {
        var _this = _super.call(this) || this;
        _this.title = undefined;
        _this.content = undefined;
        _this.explanation = undefined;
        _this.type = undefined;
        _this.level = undefined;
        _this.group_id = undefined;
        _this.question_id = undefined;
        _this.exam_id = undefined;
        _this.sheet_id = undefined;
        _this.score = undefined;
        _this.order = undefined;
        _this.question = new question_model_1.Question();
        _this.group_id__DESC__ = undefined;
        return _this;
    }
    ExamQuestion_1 = ExamQuestion;
    ExamQuestion.__api__listBySheet = function (sheetId) {
        return new search_read_api_1.SearchReadAPI(ExamQuestion_1.Model, [], "[('sheet_id','='," + sheetId + ")]");
    };
    ExamQuestion.prototype.clone = function () {
        var q = new ExamQuestion_1();
        q.question_id = this.question_id;
        q.exam_id = this.exam_id;
        q.sheet_id = this.sheet_id;
        q.score = this.score;
        q.order = this.order;
        q.level = this.level;
        q.title = this.title;
        q.content = this.content;
        q.explanation = this.explanation;
        q.type = this.type;
        q.group_id = this.group_id;
        q.group_id__DESC__ = this.group_id__DESC__;
        return q;
    };
    ExamQuestion.listBySheet = function (context, sheetId) {
        return ExamQuestion_1.search(context, [], "[('sheet_id','='," + sheetId + ")]");
    };
    ExamQuestion.__api__countBySheet = function (sheetId) {
        return new search_count_api_1.SearchCountAPI(ExamQuestion_1.Model, "[('sheet_id','='," + sheetId + ")]");
    };
    ExamQuestion.countBySheet = function (context, sheetId) {
        return ExamQuestion_1.count(context, "[('sheet_id','='," + sheetId + ")]");
    };
    ExamQuestion.__api__countByExam = function (examId) {
        return new search_count_api_1.SearchCountAPI(ExamQuestion_1.Model, "[('exam_id','='," + examId + ")]");
    };
    ExamQuestion.countByExam = function (context, examId) {
        return ExamQuestion_1.count(context, "[('exam_id','='," + examId + ")]");
    };
    ExamQuestion.prototype.__api__populateQuestion = function () {
        return new list_api_1.ListAPI(question_model_1.Question.Model, [this.question_id], []);
    };
    ExamQuestion.prototype.populateQuestion = function (context) {
        var _this = this;
        if (!this.question_id)
            return Rx_1.Observable.of(null);
        return question_model_1.Question.get(context, this.question_id).do(function (question) {
            _this.question = question;
        });
    };
    ExamQuestion.populateQuestions = function (context, examQuestions) {
        var questionIds = _.pluck(examQuestions, 'question_id');
        questionIds = _.filter(questionIds, function (id) {
            return id;
        });
        return question_model_1.Question.array(context, questionIds).do(function (questions) {
            _.each(examQuestions, function (examQuestion) {
                examQuestion.question = _.find(questions, function (question) {
                    return examQuestion.question_id == question.id;
                });
            });
        });
    };
    var ExamQuestion_1;
    ExamQuestion = ExamQuestion_1 = __decorate([
        decorator_1.Model('etraining.exam_question'),
        __metadata("design:paramtypes", [])
    ], ExamQuestion);
    return ExamQuestion;
}(base_model_1.BaseModel));
exports.ExamQuestion = ExamQuestion;

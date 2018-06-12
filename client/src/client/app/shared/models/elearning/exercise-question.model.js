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
var ExerciseQuestion = (function (_super) {
    __extends(ExerciseQuestion, _super);
    function ExerciseQuestion() {
        var _this = _super.call(this) || this;
        _this.title = undefined;
        _this.content = undefined;
        _this.explanation = undefined;
        _this.type = undefined;
        _this.level = undefined;
        _this.group_id = undefined;
        _this.question_id = undefined;
        _this.question = new question_model_1.Question();
        _this.unit_id = undefined;
        _this.score = undefined;
        _this.order = undefined;
        _this.sheet_id = undefined;
        _this.group_id__DESC__ = undefined;
        return _this;
    }
    ExerciseQuestion_1 = ExerciseQuestion;
    ExerciseQuestion.__api__listByExercise = function (exerciseId) {
        return new search_read_api_1.SearchReadAPI(ExerciseQuestion_1.Model, [], "[('unit_id','=','" + exerciseId + "')]");
    };
    ExerciseQuestion.listByExercise = function (context, exerciseId) {
        return ExerciseQuestion_1.search(context, [], "[('unit_id','='," + exerciseId + ")]");
    };
    ExerciseQuestion.__api__countByExercise = function (exerciseId) {
        return new search_count_api_1.SearchCountAPI(ExerciseQuestion_1.Model, "[('unit_id','=','" + exerciseId + "')]");
    };
    ExerciseQuestion.countByExercise = function (context, exerciseId) {
        return ExerciseQuestion_1.count(context, "[('exercise_id','='," + exerciseId + ")]");
    };
    ExerciseQuestion.__api__byQuestion = function (questionId) {
        return new search_read_api_1.SearchReadAPI(ExerciseQuestion_1.Model, [], "[('question_id','=','" + questionId + "')]");
    };
    ExerciseQuestion.byQuestion = function (context, questionId) {
        return ExerciseQuestion_1.search(context, [], "[('question_id','='," + questionId + ")]").map(function (questions) {
            return questions.length ? questions[0] : null;
        });
    };
    ExerciseQuestion.prototype.__api__populateQuestion = function () {
        return new list_api_1.ListAPI(question_model_1.Question.Model, [this.question_id], []);
    };
    ExerciseQuestion.prototype.populateQuestion = function (context) {
        var _this = this;
        if (!this.question_id)
            return Rx_1.Observable.of(null);
        return question_model_1.Question.get(context, this.question_id).do(function (question) {
            _this.question = question;
        });
    };
    ExerciseQuestion.populateQuestionForArray = function (context, exerciseQuestions) {
        var questionIds = _.pluck(exerciseQuestions, 'question_id');
        questionIds = _.filter(questionIds, function (id) {
            return id;
        });
        return question_model_1.Question.array(context, questionIds).do(function (questions) {
            _.each(exerciseQuestions, function (exerciseQuestion) {
                exerciseQuestion.question = _.find(questions, function (question) {
                    return exerciseQuestion.question_id == question.id;
                });
            });
        });
    };
    var ExerciseQuestion_1;
    ExerciseQuestion = ExerciseQuestion_1 = __decorate([
        decorator_1.Model('etraining.exercise_question'),
        __metadata("design:paramtypes", [])
    ], ExerciseQuestion);
    return ExerciseQuestion;
}(base_model_1.BaseModel));
exports.ExerciseQuestion = ExerciseQuestion;
//# sourceMappingURL=exercise-question.model.js.map
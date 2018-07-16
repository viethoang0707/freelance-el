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
var option_model_1 = require("./option.model");
var _ = require("underscore");
var cache_utils_1 = require("../../helpers/cache.utils");
var search_read_api_1 = require("../../services/api/search-read.api");
var bulk_search_read_api_1 = require("../../services/api/bulk-search-read.api");
var map_utils_1 = require("../../helpers/map.utils");
var execute_api_1 = require("../../services/api/execute.api");
var Question = (function (_super) {
    __extends(Question, _super);
    function Question() {
        var _this = _super.call(this) || this;
        _this.title = undefined;
        _this.content = undefined;
        _this.explanation = undefined;
        _this.type = undefined;
        _this.level = undefined;
        _this.group_id = undefined;
        _this.group_id__DESC__ = undefined;
        _this.max_rating = undefined;
        _this.options = [];
        return _this;
    }
    Question_1 = Question;
    Question.__api__listByGroup = function (groupId) {
        return new search_read_api_1.SearchReadAPI(Question_1.Model, [], "[('group_id','='," + groupId + ")]");
    };
    Question.listByGroup = function (context, groupId) {
        if (cache_utils_1.Cache.hit(Question_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Question_1.Model)).map(function (questions) {
                return _.filter(questions, function (q) {
                    return q.group_id == groupId;
                });
            });
        return Question_1.search(context, [], "[('group_id','='," + groupId + ")]");
    };
    Question.listByGroups = function (context, groupIds) {
        var api = new bulk_search_read_api_1.BulkSearchReadAPI();
        _.each(groupIds, function (groupId) {
            var subApi = new search_read_api_1.SearchReadAPI(Question_1.Model, [], "[('group_id','='," + groupId + ")]");
            api.add(subApi);
        });
        return context.apiService.execute(api, context.authService.LoginToken).map(function (questionArrs) {
            questionArrs = _.flatten(questionArrs);
            return _.map(questionArrs, function (question) {
                return map_utils_1.MapUtils.deserializeModel(Question_1.Model, question);
            });
        });
    };
    Question.prototype.__api__populateOption = function () {
        return option_model_1.QuestionOption.__api__listByQuestion(this.id);
    };
    Question.prototype.populateOption = function (context) {
        var _this = this;
        if (this.id)
            return option_model_1.QuestionOption.listByQuestion(context, this.id).map(function (options) {
                _this.options = options;
                return _this;
            });
        else
            return Rx_1.Observable.of(this);
    };
    Question.populateOptions = function (context, questions) {
        var apiList = _.map(questions, function (question) {
            return question.__api__populateOption();
        });
        return base_model_1.BaseModel.bulk_search.apply(base_model_1.BaseModel, [context].concat(apiList)).map(function (jsonArr) {
            return _.flatten(jsonArr);
        })
            .do(function (jsonArr) {
            var options = option_model_1.QuestionOption.toArray(jsonArr);
            _.each(questions, function (question) {
                question.options = _.filter(options, function (option) {
                    return option.question_id == question.id;
                });
            });
        });
    };
    Question.__api__import_question = function (questions, options) {
        return new execute_api_1.ExecuteAPI(Question_1.Model, 'import_question', { questions: questions, options: options }, null);
    };
    Question.importQuestion = function (context, questions, options) {
        return context.apiService.execute(Question_1.__api__import_question(questions, options), context.authService.LoginToken);
    };
    var Question_1;
    Question = Question_1 = __decorate([
        decorator_1.Model('etraining.question'),
        __metadata("design:paramtypes", [])
    ], Question);
    return Question;
}(base_model_1.BaseModel));
exports.Question = Question;

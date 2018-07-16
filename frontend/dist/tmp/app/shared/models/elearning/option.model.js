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
var QuestionOption = (function (_super) {
    __extends(QuestionOption, _super);
    function QuestionOption() {
        var _this = _super.call(this) || this;
        _this.question_id = undefined;
        _this.content = undefined;
        _this.is_correct = undefined;
        return _this;
    }
    QuestionOption_1 = QuestionOption;
    QuestionOption.__api__listByQuestion = function (questionId) {
        return new search_read_api_1.SearchReadAPI(QuestionOption_1.Model, [], "[('question_id','='," + questionId + ")]");
    };
    QuestionOption.listByQuestion = function (context, questionId) {
        return QuestionOption_1.search(context, [], "[('question_id','='," + questionId + ")]");
    };
    var QuestionOption_1;
    QuestionOption = QuestionOption_1 = __decorate([
        decorator_1.Model('etraining.option'),
        __metadata("design:paramtypes", [])
    ], QuestionOption);
    return QuestionOption;
}(base_model_1.BaseModel));
exports.QuestionOption = QuestionOption;

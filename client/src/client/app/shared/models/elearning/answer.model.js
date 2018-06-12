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
var Answer = (function (_super) {
    __extends(Answer, _super);
    function Answer() {
        var _this = _super.call(this) || this;
        _this.question_id = undefined;
        _this.option_id = undefined;
        _this.is_correct = undefined;
        _this.submission_id = undefined;
        _this.text = undefined;
        _this.score = undefined;
        _this.exam_id = undefined;
        _this.json = undefined;
        return _this;
    }
    Answer_1 = Answer;
    Answer.__api__listBySubmit = function (submitId) {
        return new search_read_api_1.SearchReadAPI(Answer_1.Model, [], "[('submission_id','='," + submitId + ")]");
    };
    Answer.__api__listByExam = function (examId) {
        return new search_read_api_1.SearchReadAPI(Answer_1.Model, [], "[('exam_id','='," + examId + ")]");
    };
    Answer.listBySubmit = function (context, submitId) {
        return Answer_1.search(context, [], "[('submission_id','='," + submitId + ")]");
    };
    Answer.listByExam = function (context, examId) {
        return Answer_1.search(context, [], "[('exam_id','='," + examId + ")]");
    };
    var Answer_1;
    Answer = Answer_1 = __decorate([
        decorator_1.Model('etraining.answer'),
        __metadata("design:paramtypes", [])
    ], Answer);
    return Answer;
}(base_model_1.BaseModel));
exports.Answer = Answer;
//# sourceMappingURL=answer.model.js.map
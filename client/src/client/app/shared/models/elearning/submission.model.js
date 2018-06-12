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
var Submission = (function (_super) {
    __extends(Submission, _super);
    function Submission() {
        var _this = _super.call(this) || this;
        _this.picture = undefined;
        _this.user_id = undefined;
        _this.member_id = undefined;
        _this.exam_id = undefined;
        _this.end = undefined;
        _this.start = undefined;
        _this.score = undefined;
        return _this;
    }
    Submission_1 = Submission;
    Submission.__api__byUserAndExam = function (userId, examId) {
        return new search_read_api_1.SearchReadAPI(Submission_1.Model, [], "[('user_id','='," + userId + "),('exam_id','='," + examId + ")]");
    };
    Submission.byUserAndExam = function (context, userId, examId) {
        return Submission_1.search(context, [], "[('user_id','='," + userId + "),('exam_id','='," + examId + ")]").map(function (submits) {
            if (submits.length)
                return submits[0];
            else
                return null;
        });
    };
    Submission.__api__byMember = function (memberId) {
        return new search_read_api_1.SearchReadAPI(Submission_1.Model, [], "[('member_id','='," + memberId + ")");
    };
    Submission.byMember = function (context, memberId) {
        return Submission_1.search(context, [], "[('member_id','='," + memberId + ")]").map(function (submits) {
            if (submits.length)
                return submits[0];
            else
                return null;
        });
    };
    Submission.__api__listByUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(Submission_1.Model, [], "[('user_id','='," + userId + "),('exam_id','='," + examId + ")]");
    };
    Submission.listByUser = function (context, userId) {
        return Submission_1.search(context, [], "[('user_id','='," + userId + ")]");
    };
    Submission.__api__listByExam = function (examId) {
        return new search_read_api_1.SearchReadAPI(Submission_1.Model, [], "[('exam_id','='," + examId + "),('exam_id','='," + examId + ")]");
    };
    Submission.listByExam = function (context, examId) {
        return Submission_1.search(context, [], "[('exam_id','='," + examId + ")]");
    };
    Submission.__api__listByMember = function (memberId) {
        return new search_read_api_1.SearchReadAPI(Submission_1.Model, [], "[('member_id','='," + memberId + "),('exam_id','='," + examId + ")]");
    };
    Submission.listByMember = function (context, memberId) {
        return Submission_1.search(context, [], "[('member_id','='," + memberId + ")]");
    };
    var Submission_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], Submission.prototype, "end", void 0);
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], Submission.prototype, "start", void 0);
    Submission = Submission_1 = __decorate([
        decorator_1.Model('etraining.submission'),
        __metadata("design:paramtypes", [])
    ], Submission);
    return Submission;
}(base_model_1.BaseModel));
exports.Submission = Submission;
//# sourceMappingURL=submission.model.js.map
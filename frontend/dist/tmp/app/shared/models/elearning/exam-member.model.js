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
var exam_model_1 = require("./exam.model");
var Rx_1 = require("rxjs/Rx");
var decorator_1 = require("../decorator");
var _ = require("underscore");
var list_api_1 = require("../../services/api/list.api");
var execute_api_1 = require("../../services/api/execute.api");
var ExamMember = (function (_super) {
    __extends(ExamMember, _super);
    function ExamMember() {
        var _this = _super.call(this) || this;
        _this.exam_id = undefined;
        _this.exam_name = undefined;
        _this.date_register = undefined;
        _this.status = undefined;
        _this.enroll_status = undefined;
        _this.role = undefined;
        _this.name = undefined;
        _this.login = undefined;
        _this.email = undefined;
        _this.phone = undefined;
        _this.user_id = undefined;
        _this.group_id = undefined;
        _this.group_id__DESC__ = undefined;
        _this.course_member_id = undefined;
        _this.exam = new exam_model_1.Exam();
        _this.submission_id = undefined;
        _this.class_id = undefined;
        _this.exam_review_state = undefined;
        return _this;
    }
    ExamMember_1 = ExamMember;
    ExamMember.__api__listByExam = function (examId) {
        return new search_read_api_1.SearchReadAPI(ExamMember_1.Model, [], "[('exam_id','='," + examId + ")]");
    };
    ExamMember.listByExam = function (context, examId) {
        return ExamMember_1.search(context, [], "[('exam_id','='," + examId + ")]");
    };
    ExamMember.__api__listCandidateByExam = function (examId) {
        return new search_read_api_1.SearchReadAPI(ExamMember_1.Model, [], "[('exam_id','='," + examId + "),('role','=','candidate')]");
    };
    ExamMember.listCandidateByExam = function (context, examId) {
        return ExamMember_1.search(context, [], "[('exam_id','='," + examId + "),('role','=','candidate')]");
    };
    ExamMember.__api__listByUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(ExamMember_1.Model, [], "[('user_id','='," + userId + ")]");
    };
    ExamMember.listByUser = function (context, userId) {
        return ExamMember_1.search(context, [], "[('user_id','='," + userId + ")]");
    };
    ExamMember.__api__byExamAndUser = function (userId, examId) {
        return new search_read_api_1.SearchReadAPI(ExamMember_1.Model, [], "[('user_id','='," + userId + "),('exam_id','='," + examId + ")]");
    };
    ExamMember.byExamAndUser = function (context, userId, examId) {
        return ExamMember_1.single(context, [], "[('user_id','='," + userId + "),('exam_id','='," + examId + ")]");
    };
    ExamMember.prototype.__api__populateExam = function () {
        return new list_api_1.ListAPI(exam_model_1.Exam.Model, [this.exam_id], []);
    };
    ExamMember.prototype.populateExam = function (context) {
        var _this = this;
        if (!this.exam_id)
            return Rx_1.Observable.of(null);
        return exam_model_1.Exam.get(context, this.exam_id).do(function (exam) {
            _this.exam = exam;
        });
    };
    ExamMember.populateExams = function (context, members) {
        var examIds = _.pluck(members, 'exam_id');
        examIds = _.filter(examIds, function (id) {
            return id;
        });
        return exam_model_1.Exam.array(context, examIds).do(function (exams) {
            _.each(members, function (member) {
                member.exam = _.find(exams, function (exam) {
                    return member.exam_id == exam.id;
                });
            });
        });
    };
    ExamMember.__api__examEditor = function (examId) {
        return new search_read_api_1.SearchReadAPI(ExamMember_1.Model, [], "[('role','=','editor'),('exam_id','='," + examId + ")]");
    };
    ExamMember.examEditor = function (context, examId) {
        return ExamMember_1.single(context, [], "[('role','=','editor'),('exam_id','='," + examId + ")]");
    };
    ExamMember.__api__examSupervisor = function (examId) {
        return new search_read_api_1.SearchReadAPI(ExamMember_1.Model, [], "[('role','=','supervisor'),('exam_id','='," + examId + ")]");
    };
    ExamMember.examSupervisor = function (context, examId) {
        return ExamMember_1.single(context, [], "[('role','=','supervisor'),('exam_id','='," + examId + ")]");
    };
    ExamMember.prototype.__api__submit_score = function (memberId) {
        return new execute_api_1.ExecuteAPI(ExamMember_1.Model, 'submit_exam', { memberId: memberId }, null);
    };
    ExamMember.prototype.submitScore = function (context) {
        return context.apiService.execute(this.__api__submit_score(this.id), context.authService.LoginToken);
    };
    var ExamMember_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], ExamMember.prototype, "date_register", void 0);
    ExamMember = ExamMember_1 = __decorate([
        decorator_1.Model('etraining.exam_member'),
        __metadata("design:paramtypes", [])
    ], ExamMember);
    return ExamMember;
}(base_model_1.BaseModel));
exports.ExamMember = ExamMember;

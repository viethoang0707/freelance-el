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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Observable_1 = require("rxjs/Observable");
var base_component_1 = require("../../../shared/components/base/base.component");
var _ = require("underscore");
var exam_model_1 = require("../../../shared/models/elearning/exam.model");
var submission_model_1 = require("../../../shared/models/elearning/submission.model");
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var question_marking_dialog_component_1 = require("../question-marking/question-marking.dialog.component");
var exam_grade_model_1 = require("../../../shared/models/elearning/exam-grade.model");
var answer_print_dialog_component_1 = require("../answer-print/answer-print.dialog.component");
var question_sheet_print_dialog_component_1 = require("../question-sheet-print/question-sheet-print.dialog.component");
var question_sheet_model_1 = require("../../../shared/models/elearning/question-sheet.model");
var exam_report_dialog_component_1 = require("../exam-report/exam-report.dialog.component");
var exam_stats_dialog_component_1 = require("../exam-stats/exam-stats.dialog.component");
var ExamManageComponent = (function (_super) {
    __extends(ExamManageComponent, _super);
    function ExamManageComponent(router, route) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.route = route;
        _this.exam = new exam_model_1.Exam();
        _this.member = new exam_member_model_1.ExamMember();
        return _this;
    }
    ExamManageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var memberId = +params['memberId'];
            var examId = +params['examId'];
            exam_model_1.Exam.get(_this, examId).subscribe(function (exam) {
                exam_member_model_1.ExamMember.get(_this, memberId).subscribe(function (member) {
                    _this.member = member;
                    _this.exam = exam;
                    _this.loadScores();
                });
            });
        });
    };
    ExamManageComponent.prototype.showQuestionSheet = function () {
        var _this = this;
        question_sheet_model_1.QuestionSheet.byExam(this, this.exam.id).subscribe(function (sheet) {
            if (!sheet || !sheet.finalized)
                _this.error('The exam questions has not been set up');
            else
                _this.questionSheetDialog.show(_this.exam, sheet);
        });
    };
    ExamManageComponent.prototype.mark = function () {
        if (this.selectedRecord)
            if (this.selectedRecord["submit"] == null) {
                this.warn('The member has not attempted the exam');
                return;
            }
        this.questionMarkDialog.show(this.selectedRecord, this.selectedRecord["submit"]);
    };
    ExamManageComponent.prototype.viewAnswerSheet = function () {
        if (this.selectedRecord) {
            if (this.selectedRecord.enroll_status != 'completed')
                this.info('Student has not completed the exam');
            else
                this.answerSheetDialog.show(this.exam, this.selectedRecord);
        }
    };
    ExamManageComponent.prototype.loadScores = function () {
        var _this = this;
        exam_grade_model_1.ExamGrade.all(this).subscribe(function (grades) {
            exam_member_model_1.ExamMember.listCandidateByExam(_this, _this.exam.id).subscribe(function (members) {
                _this.members = members;
                submission_model_1.Submission.listByExam(_this, _this.exam.id).subscribe(function (submits) {
                    _this.scoreRecords = members;
                    _.each(members, function (member) {
                        var submit = _.find(submits, function (submit) {
                            return submit.member_id == member.id && submit.exam_id == _this.exam.id;
                        });
                        member["submit"] = submit;
                        if (submit) {
                            if (submit.score != null) {
                                member["score"] = submit.score;
                                member["grade"] = exam_grade_model_1.ExamGrade.gradeScore(grades, submit.score);
                            }
                            else
                                member["score"] = '';
                        }
                    });
                });
            });
        });
    };
    ExamManageComponent.prototype.showExamReport = function () {
        this.reportDialog.show(this.exam);
    };
    ExamManageComponent.prototype.showExamStats = function () {
        this.statsDialog.show(this.exam);
    };
    ExamManageComponent.prototype.closeExam = function () {
        var _this = this;
        if (this.selectedRecord) {
            this.selectedRecord.status = 'closed';
            var subscriptions = _.map(this.members, function (member) {
                member.enroll_status = 'completed';
                return member.save(_this);
            });
            subscriptions.push(this.selectedRecord.save(this));
            this.startTransaction();
            Observable_1.Observable.forkJoin(subscriptions).subscribe(function () {
                _this.success('Exam close');
                _this.closeTransaction();
            });
        }
    };
    __decorate([
        core_1.ViewChild(question_marking_dialog_component_1.QuestionMarkingDialog),
        __metadata("design:type", question_marking_dialog_component_1.QuestionMarkingDialog)
    ], ExamManageComponent.prototype, "questionMarkDialog", void 0);
    __decorate([
        core_1.ViewChild(answer_print_dialog_component_1.AnswerPrintDialog),
        __metadata("design:type", answer_print_dialog_component_1.AnswerPrintDialog)
    ], ExamManageComponent.prototype, "answerSheetDialog", void 0);
    __decorate([
        core_1.ViewChild(question_sheet_print_dialog_component_1.QuestionSheetPrintDialog),
        __metadata("design:type", question_sheet_print_dialog_component_1.QuestionSheetPrintDialog)
    ], ExamManageComponent.prototype, "questionSheetDialog", void 0);
    __decorate([
        core_1.ViewChild(exam_report_dialog_component_1.ExamReportDialog),
        __metadata("design:type", exam_report_dialog_component_1.ExamReportDialog)
    ], ExamManageComponent.prototype, "reportDialog", void 0);
    __decorate([
        core_1.ViewChild(exam_stats_dialog_component_1.ExamStatsDialog),
        __metadata("design:type", exam_stats_dialog_component_1.ExamStatsDialog)
    ], ExamManageComponent.prototype, "statsDialog", void 0);
    ExamManageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-manage',
            templateUrl: 'exam-manage.component.html',
            styleUrls: ['exam-manage.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute])
    ], ExamManageComponent);
    return ExamManageComponent;
}(base_component_1.BaseComponent));
exports.ExamManageComponent = ExamManageComponent;
//# sourceMappingURL=exam-manage.component.js.map
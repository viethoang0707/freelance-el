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
var Observable_1 = require("rxjs/Observable");
var base_component_1 = require("../../../shared/components/base/base.component");
var exam_model_1 = require("../../../shared/models/elearning/exam.model");
var exam_question_model_1 = require("../../../shared/models/elearning/exam-question.model");
var answer_model_1 = require("../../../shared/models/elearning/answer.model");
var exam_setting_model_1 = require("../../../shared/models/elearning/exam-setting.model");
var submission_model_1 = require("../../../shared/models/elearning/submission.model");
var question_model_1 = require("../../../shared/models/elearning/question.model");
var question_sheet_model_1 = require("../../../shared/models/elearning/question-sheet.model");
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var question_container_directive_1 = require("../../../assessment/question/question-template/question-container.directive");
var question_decorator_1 = require("../../../assessment/question/question-template/question.decorator");
require("rxjs/add/observable/timer");
var _ = require("underscore");
var AnswerPrintDialog = (function (_super) {
    __extends(AnswerPrintDialog, _super);
    function AnswerPrintDialog(componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.display = false;
        _this.examQuestions = [];
        _this.answers = [];
        _this.exam = new exam_model_1.Exam();
        _this.member = new exam_member_model_1.ExamMember();
        _this.submission = new submission_model_1.Submission();
        _this.setting = new exam_setting_model_1.ExamSetting();
        return _this;
    }
    AnswerPrintDialog.prototype.show = function (exam, member) {
        var _this = this;
        this.display = true;
        this.examQuestions = [];
        this.answers = [];
        this.exam = exam;
        this.member = member;
        submission_model_1.Submission.byMemberAndExam(this, this.member.id, this.exam.id).subscribe(function (submit) {
            if (submit) {
                _this.submission = submit;
                exam_setting_model_1.ExamSetting.appSetting(_this).subscribe(function (setting) {
                    if (setting)
                        _this.setting = setting;
                    _this.startReview();
                });
            }
        });
    };
    AnswerPrintDialog.prototype.hide = function () {
        this.display = false;
    };
    AnswerPrintDialog.prototype.fetchAnswers = function () {
        if (this.submission.id)
            return answer_model_1.Answer.listBySubmit(this, this.submission.id);
        else
            return Observable_1.Observable.of([]);
    };
    AnswerPrintDialog.prototype.startReview = function () {
        var _this = this;
        question_sheet_model_1.QuestionSheet.byExam(this, this.exam.id).subscribe(function (sheet) {
            exam_question_model_1.ExamQuestion.listBySheet(_this, sheet.id).subscribe(function (examQuestions) {
                _this.examQuestions = examQuestions;
                _this.fetchAnswers().subscribe(function (answers) {
                    _this.answers = answers;
                    setTimeout(function () {
                        var componentHostArr = _this.questionsComponents.toArray();
                        for (var i = 0; i < examQuestions.length; i++) {
                            var examQuestion = examQuestions[i];
                            var componentHost = componentHostArr[i];
                            _this.displayQuestion(examQuestion, componentHost);
                        }
                    }, 0);
                });
            });
        });
    };
    AnswerPrintDialog.prototype.prepareAnswer = function (question) {
        var answer = _.find(this.answers, function (ans) {
            return ans.question_id == question.question_id;
        });
        if (!answer)
            answer = new answer_model_1.Answer();
        return Observable_1.Observable.of(answer);
    };
    AnswerPrintDialog.prototype.displayQuestion = function (examQuestion, componentHost) {
        var _this = this;
        question_model_1.Question.get(this, examQuestion.question_id).subscribe(function (question) {
            _this.prepareAnswer(examQuestion).subscribe(function (answer) {
                var detailComponent = question_decorator_1.QuestionRegister.Instance.lookup(question.type);
                var viewContainerRef = componentHost.viewContainerRef;
                if (detailComponent) {
                    var componentFactory = _this.componentFactoryResolver.resolveComponentFactory(detailComponent);
                    viewContainerRef.clear();
                    var componentRef = viewContainerRef.createComponent(componentFactory);
                    componentRef.instance.mode = 'review';
                    componentRef.instance.render(question, answer);
                }
            });
        });
    };
    AnswerPrintDialog.prototype.print = function () {
        var printContents, popupWin;
        printContents = this.printSection.nativeElement.innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write("\n          <html>\n            <head>\n                <title>Exam paper</title>\n                #{PRINT_DIALOG_STYLE}\n            </head>\n            <body onload=\"window.print();window.close()\">" + printContents + "</body>\n          </html>");
        popupWin.document.close();
    };
    __decorate([
        core_1.ViewChildren(question_container_directive_1.QuestionContainerDirective),
        __metadata("design:type", core_1.QueryList)
    ], AnswerPrintDialog.prototype, "questionsComponents", void 0);
    __decorate([
        core_1.ViewChild('printSection'),
        __metadata("design:type", Object)
    ], AnswerPrintDialog.prototype, "printSection", void 0);
    AnswerPrintDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'answer-print-dialog',
            templateUrl: 'answer-print.dialog.component.html',
            styleUrls: ['answer-print.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], AnswerPrintDialog);
    return AnswerPrintDialog;
}(base_component_1.BaseComponent));
exports.AnswerPrintDialog = AnswerPrintDialog;
//# sourceMappingURL=answer-print.dialog.component.js.map
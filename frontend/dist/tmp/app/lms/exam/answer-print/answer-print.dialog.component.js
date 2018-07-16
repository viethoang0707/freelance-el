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
var base_model_1 = require("../../../shared/models/base.model");
var AnswerPrintDialog = (function (_super) {
    __extends(AnswerPrintDialog, _super);
    function AnswerPrintDialog(componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.display = false;
        _this.examQuestions = [];
        _this.answers = [];
        _this.exam = new exam_model_1.Exam();
        _this.sheet = new question_sheet_model_1.QuestionSheet();
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
        base_model_1.BaseModel
            .bulk_search(this, submission_model_1.Submission.__api__byMemberAndExam(this.member.id, this.exam.id), exam_setting_model_1.ExamSetting.__api__byExam(this.exam.id), question_sheet_model_1.QuestionSheet.__api__byExam(this.exam.id))
            .subscribe(function (jsonArr) {
            var submits = submission_model_1.Submission.toArray(jsonArr[0]);
            if (submits.length) {
                _this.submission = submits[0];
                var settings = exam_setting_model_1.ExamSetting.toArray(jsonArr[1]);
                if (settings.length)
                    _this.setting = settings[0];
                var sheets = question_sheet_model_1.QuestionSheet.toArray(jsonArr[2]);
                if (sheets.length) {
                    _this.sheet = sheets[0];
                    _this.startReview();
                }
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
        base_model_1.BaseModel
            .bulk_search(this, exam_question_model_1.ExamQuestion.__api__listBySheet(this.sheet.id), answer_model_1.Answer.__api__listBySubmit(this.submission.id))
            .subscribe(function (jsonArr) {
            _this.examQuestions = exam_question_model_1.ExamQuestion.toArray(jsonArr[0]);
            _this.answers = answer_model_1.Answer.toArray(jsonArr[1]);
            exam_question_model_1.ExamQuestion.populateQuestions(_this, _this.examQuestions).subscribe(function () {
                var questions = _.map(_this.examQuestions, function (examQuestion) {
                    return examQuestion.question;
                });
                question_model_1.Question.populateOptions(_this, questions).subscribe(function () {
                    var componentHostArr = _this.questionsComponents.toArray();
                    for (var i = 0; i < _this.examQuestions.length; i++) {
                        var examQuestion = _this.examQuestions[i];
                        var componentHost = componentHostArr[i];
                        _this.displayQuestion(examQuestion, componentHost);
                    }
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
        return answer;
    };
    AnswerPrintDialog.prototype.displayQuestion = function (examQuestion, componentHost) {
        var answer = this.prepareAnswer(examQuestion);
        var detailComponent = question_decorator_1.QuestionRegister.Instance.lookup(examQuestion.question.type);
        var viewContainerRef = componentHost.viewContainerRef;
        if (detailComponent) {
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
            viewContainerRef.clear();
            var componentRef = viewContainerRef.createComponent(componentFactory);
            componentRef.instance.mode = 'review';
            componentRef.instance.render(examQuestion.question, answer);
        }
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
            template: "<p-dialog header=\"{{'Answer sheet'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"960\" height=\"100%\" [responsive]=\"true\" appendTo=\"body\">   <div class=\"spinner\" [hidden]=\"!loading\"></div>   <p-scrollPanel [style]=\"{width: '100%', height: '460px'}\">      <img *ngIf=\"setting.take_picture_on_submit\" [src]='submission.picture | imageBase64'/>     <div class=\"ui-g ans-print\" #printSection>         <div class=\"ui-g-6 name-e\">           <span>{{exam.name}}</span>         </div>         <div class=\"ui-g-3\">           <span>{{'Start'|translate}}: {{exam.start | date : \"dd/MM/yyyy\"}}</span>         </div>         <div class=\"ui-g-3\">           <span>{{'End'|translate}}: {{exam.end | date : \"dd/MM/yyyy\"}}</span>         </div>         <div class=\"ui-g-12\">           <span class=\"label\">{{'Duration'|translate}}: </span><span>{{exam.duration}} {{'minutes'|translate}}</span>         </div>         <div class=\"ui-g-12\">           <span class=\"ins\" [innerHTML]=\"exam.instruction\">{{exam.instruction}}</span>         </div>         <div class=\"ui-g-6 student\">           <span>{{'Student'|translate}}: </span><span class=\"bold\"> {{member.name}}</span>         </div>         <div class=\"ui-g-3\">           <span>{{'Submit'|translate}}: {{submission.end | date : \"dd/MM/yyyy\"}}</span>         </div>         <div class=\"ui-g-3\">           <span>{{'Score'|translate}}: </span><span class=\"bold\"> {{member.score}}</span>         </div>         <p-dataList [value]=\"examQuestions\" [rows]=\"examQuestions.length\" styleClass=\"l-question\">           <ng-template let-question pTemplate=\"item\"  let-i=\"index\" >             <span>{{'Question'|translate}} {{i+1}}:</span>             <div question-container></div>           </ng-template>         </p-dataList>     </div>   </p-scrollPanel>   <p-footer>     <button type=\"button\" pButton icon=\"ui-icon-print\" (click)=\"print()\" label=\"{{'Print'|translate}}\"></button>     <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>   </p-footer>    </p-dialog>",
            styles: [".name-c,.name-e{text-align:center;text-transform:uppercase;font-weight:700}.bold,.label{font-weight:700}.title{text-transform:uppercase}.ins{text-indent:50px}.ans-print{margin-bottom:20px}"],
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], AnswerPrintDialog);
    return AnswerPrintDialog;
}(base_component_1.BaseComponent));
exports.AnswerPrintDialog = AnswerPrintDialog;

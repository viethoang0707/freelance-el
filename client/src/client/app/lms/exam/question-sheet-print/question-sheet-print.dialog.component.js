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
var base_component_1 = require("../../../shared/components/base/base.component");
var exam_model_1 = require("../../../shared/models/elearning/exam.model");
var exam_question_model_1 = require("../../../shared/models/elearning/exam-question.model");
var question_model_1 = require("../../../shared/models/elearning/question.model");
var question_container_directive_1 = require("../../../assessment/question/question-template/question-container.directive");
var question_decorator_1 = require("../../../assessment/question/question-template/question.decorator");
require("rxjs/add/observable/timer");
var constants_1 = require("../../../shared/models/constants");
var QuestionSheetPrintDialog = (function (_super) {
    __extends(QuestionSheetPrintDialog, _super);
    function QuestionSheetPrintDialog(componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.display = false;
        _this.examQuestions = [];
        _this.exam = new exam_model_1.Exam();
        return _this;
    }
    QuestionSheetPrintDialog.prototype.show = function (exam, sheet) {
        this.display = true;
        this.examQuestions = [];
        this.exam = exam;
        this.sheet = sheet;
        this.startReview();
    };
    QuestionSheetPrintDialog.prototype.hide = function () {
        this.display = false;
    };
    QuestionSheetPrintDialog.prototype.startReview = function () {
        var _this = this;
        exam_question_model_1.ExamQuestion.listBySheet(this, this.sheet.id).subscribe(function (examQuestions) {
            _this.examQuestions = examQuestions;
            setTimeout(function () {
                var componentHostArr = _this.questionsComponents.toArray();
                for (var i = 0; i < examQuestions.length; i++) {
                    var examQuestion = examQuestions[i];
                    var componentHost = componentHostArr[i];
                    _this.displayQuestion(examQuestion, componentHost);
                }
            }, 0);
        });
    };
    QuestionSheetPrintDialog.prototype.displayQuestion = function (examQuestion, componentHost) {
        var _this = this;
        question_model_1.Question.get(this, examQuestion.question_id).subscribe(function (question) {
            var detailComponent = question_decorator_1.QuestionRegister.Instance.lookup(question.type);
            var viewContainerRef = componentHost.viewContainerRef;
            if (detailComponent) {
                var componentFactory = _this.componentFactoryResolver.resolveComponentFactory(detailComponent);
                viewContainerRef.clear();
                var componentRef = viewContainerRef.createComponent(componentFactory);
                componentRef.instance.mode = 'preview';
                componentRef.instance.render(question);
            }
        });
    };
    QuestionSheetPrintDialog.prototype.print = function () {
        var printContents, popupWin;
        printContents = this.printSection.nativeElement.innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write("\n          <html>\n            <head>\n                <title>Exam paper</title>\n                " + constants_1.PRINT_DIALOG_STYLE + "\n            </head>\n            <body onload=\"window.print();window.close()\">" + printContents + "</body>\n          </html>");
        popupWin.document.close();
    };
    __decorate([
        core_1.ViewChildren(question_container_directive_1.QuestionContainerDirective),
        __metadata("design:type", core_1.QueryList)
    ], QuestionSheetPrintDialog.prototype, "questionsComponents", void 0);
    __decorate([
        core_1.ViewChild('printSection'),
        __metadata("design:type", Object)
    ], QuestionSheetPrintDialog.prototype, "printSection", void 0);
    QuestionSheetPrintDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-sheet-print-dialog',
            templateUrl: 'question-sheet-print.dialog.component.html',
            styleUrls: ['question-sheet-print.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], QuestionSheetPrintDialog);
    return QuestionSheetPrintDialog;
}(base_component_1.BaseComponent));
exports.QuestionSheetPrintDialog = QuestionSheetPrintDialog;
//# sourceMappingURL=question-sheet-print.dialog.component.js.map
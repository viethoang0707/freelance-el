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
var exam_question_model_1 = require("../../../shared/models/elearning/exam-question.model");
var question_container_directive_1 = require("../../../assessment/question/question-template/question-container.directive");
var question_decorator_1 = require("../../../assessment/question/question-template/question.decorator");
require("rxjs/add/observable/timer");
var QuestionSheetPreviewDialog = (function (_super) {
    __extends(QuestionSheetPreviewDialog, _super);
    function QuestionSheetPreviewDialog(componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.display = false;
        _this.examQuestions = [];
        _this.questions = [];
        return _this;
    }
    QuestionSheetPreviewDialog.prototype.show = function (sheet) {
        this.display = true;
        this.examQuestions = [];
        this.questions = [];
        this.sheet = sheet;
        this.startReview();
    };
    QuestionSheetPreviewDialog.prototype.hide = function () {
        this.display = false;
    };
    QuestionSheetPreviewDialog.prototype.startReview = function () {
        var _this = this;
        exam_question_model_1.ExamQuestion.listBySheet(this, this.sheet.id).subscribe(function (examQuestions) {
            _this.examQuestions = examQuestions;
            exam_question_model_1.ExamQuestion.populateQuestionForArray(_this, examQuestions).subscribe(function () {
                var componentHostArr = _this.questionsComponents.toArray();
                for (var i = 0; i < examQuestions.length; i++) {
                    var examQuestion = examQuestions[i];
                    var componentHost = componentHostArr[i];
                    _this.displayQuestion(examQuestion, componentHost);
                }
            });
        });
    };
    QuestionSheetPreviewDialog.prototype.displayQuestion = function (examQuestion, componentHost) {
        var question = examQuestion.question;
        var detailComponent = question_decorator_1.QuestionRegister.Instance.lookup(question.type);
        var viewContainerRef = componentHost.viewContainerRef;
        if (detailComponent) {
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
            viewContainerRef.clear();
            var componentRef = viewContainerRef.createComponent(componentFactory);
            componentRef.instance.mode = 'preview';
            componentRef.instance.render(question);
        }
    };
    __decorate([
        core_1.ViewChildren(question_container_directive_1.QuestionContainerDirective),
        __metadata("design:type", core_1.QueryList)
    ], QuestionSheetPreviewDialog.prototype, "questionsComponents", void 0);
    QuestionSheetPreviewDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-sheet-preview-dialog',
            templateUrl: 'question-sheet-preview.dialog.component.html',
            styleUrls: ['question-sheet-preview.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], QuestionSheetPreviewDialog);
    return QuestionSheetPreviewDialog;
}(base_component_1.BaseComponent));
exports.QuestionSheetPreviewDialog = QuestionSheetPreviewDialog;
//# sourceMappingURL=question-sheet-preview.dialog.component.js.map
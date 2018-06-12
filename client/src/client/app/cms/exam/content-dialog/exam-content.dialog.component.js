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
var question_sheet_model_1 = require("../../../shared/models/elearning/question-sheet.model");
var exam_question_model_1 = require("../../../shared/models/elearning/exam-question.model");
var question_sheet_preview_dialog_component_1 = require("../../../assessment/question/question-sheet-preview/question-sheet-preview.dialog.component");
var question_sheet_editor_dialog_component_1 = require("../question-sheet-editor/question-sheet-editor.dialog.component");
var question_sheet_save_dialog_component_1 = require("../question-sheet-save/question-sheet-save.dialog.component");
var constants_1 = require("../../../shared/models/constants");
var _ = require("underscore");
var select_question_sheet_dialog_component_1 = require("../../../shared/components/select-question-sheet-dialog/select-question-sheet-dialog.component");
var ExamContentDialog = (function (_super) {
    __extends(ExamContentDialog, _super);
    function ExamContentDialog() {
        var _this = _super.call(this) || this;
        _this.QUESTION_LEVEL = constants_1.QUESTION_LEVEL;
        _this.sheet = new question_sheet_model_1.QuestionSheet();
        _this.examQuestions = [];
        _this.exam = new exam_model_1.Exam();
        return _this;
    }
    ExamContentDialog.prototype.show = function (exam) {
        this.display = true;
        this.exam = exam;
        this.loadQuestionSheet();
    };
    ExamContentDialog.prototype.loadQuestionSheet = function () {
        var _this = this;
        question_sheet_model_1.QuestionSheet.byExam(this, this.exam.id).subscribe(function (sheet) {
            if (sheet) {
                _this.sheet = sheet;
                exam_question_model_1.ExamQuestion.listBySheet(_this, _this.sheet.id).subscribe(function (examQuestions) {
                    _this.examQuestions = examQuestions;
                    _this.totalScore = _.reduce(examQuestions, function (memo, q) { return memo + +q.score; }, 0);
                });
            }
            else {
                _this.sheet = new question_sheet_model_1.QuestionSheet();
                _this.sheet.exam_id = _this.exam.id;
                _this.sheet.save(_this).subscribe(function (sheet) {
                    _this.sheet = sheet;
                });
            }
        });
    };
    ExamContentDialog.prototype.save = function () {
        var _this = this;
        var subscriptions = _.map(this.examQuestions, function (examQuestion) {
            return examQuestion.save(_this);
        });
        subscriptions.push(this.sheet.save(this));
        Observable_1.Observable.forkJoin.apply(Observable_1.Observable, subscriptions).subscribe(function () {
            _this.hide();
            _this.success(_this.translateService.instant('Content saved successfully.'));
        });
    };
    ExamContentDialog.prototype.hide = function () {
        this.display = false;
    };
    ExamContentDialog.prototype.previewSheet = function () {
        this.previewDialog.show(this.sheet);
    };
    ExamContentDialog.prototype.clearSheet = function () {
        var _this = this;
        this.sheet.finalized = false;
        var subscriptions = _.map(this.examQuestions, function (examQuestion) {
            return examQuestion.delete(_this);
        });
        subscriptions.push(this.sheet.save(this));
        Observable_1.Observable.forkJoin(subscriptions).subscribe(function () {
            _this.examQuestions = [];
        });
    };
    ExamContentDialog.prototype.loadSheetTemplate = function () {
        var _this = this;
        if (!this.sheet.finalized && this.examQuestions.length == 0)
            this.selectSheetDialog.show();
        this.selectSheetDialog.onSelectSheet.subscribe(function (sheetTempl) {
            exam_question_model_1.ExamQuestion.listBySheet(_this, sheetTempl.id).subscribe(function (examQuestions) {
                examQuestions = _.map(examQuestions, function (examQuestion) {
                    var newExamQuestion = new exam_question_model_1.ExamQuestion();
                    newExamQuestion.exam_id = _this.exam.id;
                    newExamQuestion.score = examQuestion.score;
                    newExamQuestion.sheet_id = _this.sheet.id;
                    return newExamQuestion;
                });
                _this.sheet.finalized = true;
                var subscriptions = _.map(examQuestions, function (examQuestion) {
                    return examQuestion.save(_this);
                });
                subscriptions.push(_this.sheet.save(_this));
                Observable_1.Observable.forkJoin(subscriptions).subscribe(function () {
                    _this.loadQuestionSheet();
                });
            });
        });
    };
    ExamContentDialog.prototype.saveToTemplate = function () {
        if (this.sheet && this.sheet.finalized) {
            this.saveDialog.show(this.sheet, this.examQuestions);
        }
    };
    ExamContentDialog.prototype.designSheet = function () {
        var _this = this;
        if (this.sheet && this.sheet.finalized) {
            this.editorDialog.show(this.sheet);
            this.editorDialog.onSave.subscribe(function () {
                _this.loadQuestionSheet();
            });
        }
    };
    __decorate([
        core_1.ViewChild(question_sheet_preview_dialog_component_1.QuestionSheetPreviewDialog),
        __metadata("design:type", question_sheet_preview_dialog_component_1.QuestionSheetPreviewDialog)
    ], ExamContentDialog.prototype, "previewDialog", void 0);
    __decorate([
        core_1.ViewChild(select_question_sheet_dialog_component_1.SelectQuestionSheetDialog),
        __metadata("design:type", select_question_sheet_dialog_component_1.SelectQuestionSheetDialog)
    ], ExamContentDialog.prototype, "selectSheetDialog", void 0);
    __decorate([
        core_1.ViewChild(question_sheet_editor_dialog_component_1.QuestionSheetEditorDialog),
        __metadata("design:type", question_sheet_editor_dialog_component_1.QuestionSheetEditorDialog)
    ], ExamContentDialog.prototype, "editorDialog", void 0);
    __decorate([
        core_1.ViewChild(question_sheet_save_dialog_component_1.QuestionSheetSaveDialog),
        __metadata("design:type", question_sheet_save_dialog_component_1.QuestionSheetSaveDialog)
    ], ExamContentDialog.prototype, "saveDialog", void 0);
    ExamContentDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-content-dialog',
            templateUrl: 'exam-content.dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], ExamContentDialog);
    return ExamContentDialog;
}(base_component_1.BaseComponent));
exports.ExamContentDialog = ExamContentDialog;
//# sourceMappingURL=exam-content.dialog.component.js.map
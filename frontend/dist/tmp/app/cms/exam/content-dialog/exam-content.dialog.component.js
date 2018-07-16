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
var question_sheet_model_1 = require("../../../shared/models/elearning/question-sheet.model");
var exam_question_model_1 = require("../../../shared/models/elearning/exam-question.model");
var question_sheet_preview_dialog_component_1 = require("../../../assessment/question/question-sheet-preview/question-sheet-preview.dialog.component");
var question_sheet_editor_dialog_component_1 = require("../question-sheet-editor/question-sheet-editor.dialog.component");
var question_sheet_save_dialog_component_1 = require("../question-sheet-save/question-sheet-save.dialog.component");
var constants_1 = require("../../../shared/models/constants");
var _ = require("underscore");
var select_question_sheet_dialog_component_1 = require("../../../shared/components/select-question-sheet-dialog/select-question-sheet-dialog.component");
var exam_setting_dialog_component_1 = require("../exam-setting/exam-setting.dialog.component");
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
        this.examQuestions = [];
        this.loadQuestionSheet();
    };
    ExamContentDialog.prototype.loadQuestionSheet = function () {
        var _this = this;
        question_sheet_model_1.QuestionSheet.get(this, this.exam.sheet_id).subscribe(function (sheet) {
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
        this.sheet.finalized = true;
        this.sheet.save(this).subscribe(function () {
            _.each(_this.examQuestions, function (examQyestion) {
                examQyestion.sheet_id = _this.sheet.id;
            });
            var newExamQuestions = _.filter(_this.examQuestions, function (examQyestion) {
                return examQyestion.id == null;
            });
            var existExamQuestions = _.filter(_this.examQuestions, function (examQyestion) {
                return examQyestion.id != null;
            });
            exam_question_model_1.ExamQuestion.createArray(_this, newExamQuestions).subscribe(function () {
                exam_question_model_1.ExamQuestion.updateArray(_this, existExamQuestions).subscribe(function () {
                    _this.hide();
                    _this.success(_this.translateService.instant('Content saved successfully.'));
                });
            });
        });
    };
    ExamContentDialog.prototype.hide = function () {
        this.display = false;
    };
    ExamContentDialog.prototype.showSetting = function () {
        this.settingDialog.show(this.exam);
    };
    ExamContentDialog.prototype.previewSheet = function () {
        this.previewDialog.show(this.sheet, this.examQuestions);
    };
    ExamContentDialog.prototype.clearSheet = function () {
        var _this = this;
        this.sheet.finalized = false;
        this.sheet.save(this).subscribe(function () {
            var existExamQuestions = _.filter(_this.examQuestions, function (examQuestion) {
                return examQuestion.id != null;
            });
            exam_question_model_1.ExamQuestion.deleteArray(_this, _this.examQuestions).subscribe(function () {
                _this.examQuestions = [];
            });
        });
    };
    ExamContentDialog.prototype.loadSheetTemplate = function () {
        var _this = this;
        if (this.sheet && !this.sheet.finalized)
            this.selectSheetDialog.show();
        this.selectSheetDialog.onSelectSheet.first().subscribe(function (sheetTempl) {
            exam_question_model_1.ExamQuestion.listBySheet(_this, sheetTempl.id).subscribe(function (examQuestions) {
                _this.examQuestions = _.map(examQuestions, function (examQuestion) {
                    return examQuestion.clone();
                });
                _.each(_this.examQuestions, function (examQuestion) {
                    examQuestion.sheet_id = _this.sheet.id;
                });
                _this.totalScore = _.reduce(examQuestions, function (memo, q) { return memo + +q.score; }, 0);
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
        if (this.sheet && !this.sheet.finalized) {
            this.editorDialog.show();
            this.editorDialog.onSave.subscribe(function (examQuestions) {
                _.each(examQuestions, function (examQuestion) {
                    examQuestion.sheet_id = _this.sheet.id;
                });
                _this.examQuestions = examQuestions;
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
    __decorate([
        core_1.ViewChild(exam_setting_dialog_component_1.ExamSettingDialog),
        __metadata("design:type", exam_setting_dialog_component_1.ExamSettingDialog)
    ], ExamContentDialog.prototype, "settingDialog", void 0);
    ExamContentDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-content-dialog',
            template: "<p-dialog header=\"{{'Exam content'|translate}}\" [(visible)]=\"display\" modal=\"false\" width=\"960\" height=\"600\" [responsive]=\"true\" appendTo=\"body\">     <div class=\"spinner\" [hidden]=\"!loading\"></div>     <p-scrollPanel [style]=\"{width: '100%', height: '480px'}\">         <p-toolbar>             <div class=\"ui-toolbar-group-left\">                 <button pButton type=\"button\" label=\"{{'Design question sheet'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-mode-edit\" (click)=\"designSheet()\" *ngIf=\"!sheet.finalized\"></button>                 <button pButton type=\"button\" label=\"{{'Load question sheet templates'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-details\" (click)=\"loadSheetTemplate()\" *ngIf=\"!sheet.finalized\"></button>                 <button pButton type=\"button\" label=\"{{'Save to templates'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-save\" (click)=\"saveToTemplate()\" *ngIf=\"sheet.finalized\"></button>                 <button pButton type=\"button\" class=\"orange-btn\" icon=\"ui-icon-delete\" (click)=\"clearSheet()\" *ngIf=\"sheet && sheet.finalized\" label=\"{{'Clear'|translate}}\"></button>             </div>             <div class=\"ui-toolbar-group-right\">                 <button pButton type=\"button\" pTooltip=\"{{'Setting'|translate}}\" class=\"orange-btn\" icon=\"ui-icon-settings\" (click)=\"showSetting()\" label=\"{{'Setting'|translate}}\"></button>                 <button pButton type=\"button\" class=\"blue-grey-btn\" icon=\"ui-icon-settings\" (click)=\"previewSheet()\" label=\"{{'Preview'|translate}}\" *ngIf=\"sheet && sheet.finalized\"></button>             </div>         </p-toolbar>         <p-table #examQuestionTable [value]=\"examQuestions\" [responsive]=\"true\" styleClass=\"table-content pb20\">             <ng-template pTemplate=\"header\">                 <tr>                     <th>#</th>                     <th>                         {{'Title'|translate}}                     </th>                     <th>                         {{'Group'|translate}}                     </th>                     <th>                         {{'Score'|translate}}                     </th>                 </tr>             </ng-template>             <ng-template pTemplate=\"body\" let-question let-rowIndex=\"rowIndex\">                 <tr>                     <td>{{rowIndex+1}}</td>                     <td>{{question.title}}</td>                     <td>{{question.group_id__DESC__}}</td>                     <td pEditableColumn>                         <p-cellEditor>                             <ng-template pTemplate=\"input\">                                 <input type=\"number\" [(ngModel)]=\"question.score\">                             </ng-template>                             <ng-template pTemplate=\"output\">                                 {{question.score}}                             </ng-template>                         </p-cellEditor>                     </td>                 </tr>             </ng-template>             <ng-template pTemplate=\"footer\">                 <tr>                     <td colspan=\"3\">{{'Total score'|translate}}</td>                     <td>{{examQuestions | sum}}</td>                 </tr>             </ng-template>         </p-table>         <exam-setting-dialog></exam-setting-dialog>         <question-sheet-preview-dialog></question-sheet-preview-dialog>         <select-question-sheet-dialog></select-question-sheet-dialog>         <question-sheet-editor-dialog></question-sheet-editor-dialog>         <question-sheet-save-dialog></question-sheet-save-dialog>     </p-scrollPanel>     <p-footer>         <button type=\"submit\" pButton icon=\"fa-check\" (click)=\"save()\" label=\"{{'Save'|translate}}\"></button>         <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>     </p-footer> </p-dialog>",
        }),
        __metadata("design:paramtypes", [])
    ], ExamContentDialog);
    return ExamContentDialog;
}(base_component_1.BaseComponent));
exports.ExamContentDialog = ExamContentDialog;

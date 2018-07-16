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
var survey_model_1 = require("../../../shared/models/elearning/survey.model");
var survey_sheet_model_1 = require("../../../shared/models/elearning/survey-sheet.model");
var survey_question_model_1 = require("../../../shared/models/elearning/survey-question.model");
var survey_sheet_preview_dialog_component_1 = require("../../../assessment/question/survey-sheet-preview/survey-sheet-preview.dialog.component");
var survey_sheet_save_dialog_component_1 = require("../survey-sheet-save/survey-sheet-save.dialog.component");
var _ = require("underscore");
var select_survey_sheet_dialog_component_1 = require("../../../shared/components/select-survey-sheet-dialog/select-survey-sheet-dialog.component");
var select_question_dialog_component_1 = require("../../../shared/components/select-question-dialog/select-question-dialog.component");
var SurveyContentDialog = (function (_super) {
    __extends(SurveyContentDialog, _super);
    function SurveyContentDialog() {
        var _this = _super.call(this) || this;
        _this.sheet = new survey_sheet_model_1.SurveySheet();
        _this.surveyQuestions = [];
        _this.survey = new survey_model_1.Survey();
        return _this;
    }
    SurveyContentDialog.prototype.show = function (survey) {
        this.display = true;
        this.survey = survey;
        this.loadSurveynSheet();
    };
    SurveyContentDialog.prototype.loadSurveynSheet = function () {
        var _this = this;
        survey_sheet_model_1.SurveySheet.get(this, this.survey.sheet_id).subscribe(function (sheet) {
            if (sheet) {
                _this.sheet = sheet;
                survey_question_model_1.SurveyQuestion.listBySheet(_this, _this.sheet.id).subscribe(function (surveyQuestions) {
                    _this.surveyQuestions = surveyQuestions;
                });
            }
            else {
                _this.sheet = new survey_sheet_model_1.SurveySheet();
                _this.sheet.survey_id = _this.survey.id;
                _this.sheet.save(_this).subscribe(function (sheet) {
                    _this.sheet = sheet;
                });
            }
        });
    };
    SurveyContentDialog.prototype.save = function () {
        var _this = this;
        this.sheet.finalized = true;
        this.sheet.save(this).subscribe(function () {
            _.each(_this.surveyQuestions, function (surveyQyestion) {
                surveyQyestion.sheet_id = _this.sheet.id;
            });
            var newSurveyQuestions = _.filter(_this.surveyQuestions, function (surveyQuestion) {
                return surveyQuestion.id == null;
            });
            survey_question_model_1.SurveyQuestion.createArray(_this, newSurveyQuestions).subscribe(function () {
                _this.hide();
                _this.success(_this.translateService.instant('Content saved successfully.'));
            });
        });
    };
    SurveyContentDialog.prototype.hide = function () {
        this.display = false;
    };
    SurveyContentDialog.prototype.previewSheet = function () {
        this.previewDialog.show(this.sheet);
    };
    SurveyContentDialog.prototype.clearSheet = function () {
        var _this = this;
        this.sheet.finalized = false;
        this.sheet.save(this).subscribe(function () {
            var existSurveyQuestions = _.filter(_this.surveyQuestions, function (surveyQuestion) {
                return surveyQuestion.id != null;
            });
            survey_question_model_1.SurveyQuestion.deleteArray(_this, existSurveyQuestions).subscribe(function () {
                _this.surveyQuestions = [];
            });
        });
    };
    SurveyContentDialog.prototype.loadSheetTemplate = function () {
        var _this = this;
        if (this.surveyQuestions.length == 0)
            this.selectSheetDialog.show();
        this.selectSheetDialog.onSelectSheet.first().subscribe(function (sheetTempl) {
            survey_question_model_1.SurveyQuestion.listBySheet(_this, sheetTempl.id).subscribe(function (surveyQuestions) {
                _this.surveyQuestions = _.map(surveyQuestions, function (surveyQuestion) {
                    var newSurveyQuestion = surveyQuestion.clone();
                    newSurveyQuestion.sheet_id = _this.sheet.id;
                    return newSurveyQuestion;
                });
            });
        });
    };
    SurveyContentDialog.prototype.saveToTemplate = function () {
        if (this.sheet && this.sheet.finalized) {
            this.saveDialog.show(this.sheet, this.surveyQuestions);
        }
    };
    SurveyContentDialog.prototype.designSheet = function () {
        var _this = this;
        if (this.surveyQuestions.length == 0) {
            this.selectQuestionDialog.show();
            this.selectQuestionDialog.onSelectQuestions.first().subscribe(function (questions) {
                _this.surveyQuestions = _.map(questions, function (question) {
                    var newSurveyQuestion = new survey_question_model_1.SurveyQuestion();
                    newSurveyQuestion.question_id = question.id;
                    newSurveyQuestion.title = question.title;
                    newSurveyQuestion.type = question.type;
                    newSurveyQuestion.survey_id = _this.survey.id;
                    newSurveyQuestion.group_id = question.group_id;
                    newSurveyQuestion.group_id__DESC__ = question.group_id__DESC__;
                    newSurveyQuestion.content = question.content;
                    return newSurveyQuestion;
                });
            });
        }
    };
    __decorate([
        core_1.ViewChild(survey_sheet_preview_dialog_component_1.SurveySheetPreviewDialog),
        __metadata("design:type", survey_sheet_preview_dialog_component_1.SurveySheetPreviewDialog)
    ], SurveyContentDialog.prototype, "previewDialog", void 0);
    __decorate([
        core_1.ViewChild(select_survey_sheet_dialog_component_1.SelectSurveySheetDialog),
        __metadata("design:type", select_survey_sheet_dialog_component_1.SelectSurveySheetDialog)
    ], SurveyContentDialog.prototype, "selectSheetDialog", void 0);
    __decorate([
        core_1.ViewChild(select_question_dialog_component_1.SelectQuestionsDialog),
        __metadata("design:type", select_question_dialog_component_1.SelectQuestionsDialog)
    ], SurveyContentDialog.prototype, "selectQuestionDialog", void 0);
    __decorate([
        core_1.ViewChild(survey_sheet_save_dialog_component_1.SurveySheetSaveDialog),
        __metadata("design:type", survey_sheet_save_dialog_component_1.SurveySheetSaveDialog)
    ], SurveyContentDialog.prototype, "saveDialog", void 0);
    SurveyContentDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'survey-content-dialog',
            template: "<p-dialog header=\"{{'Survey content'|translate}}: {{survey.name}}\" [(visible)]=\"display\" modal=\"false\" width=\"1000\" height=\"100%\" [responsive]=\"true\" appendTo=\"body\">   <div class=\"spinner\" [hidden]=\"!loading\"></div>   <div class=\"ui-g\">     <div class=\"ui-g-12\">       <p-toolbar>         <div class=\"ui-toolbar-group-left mt5\">           <button pButton type=\"button\" label=\"{{'Design question sheet'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-mode-edit\" (click)=\"designSheet()\" *ngIf=\"!sheet.finalized\"></button>           <button pButton type=\"button\" label=\"{{'Load question sheet templates'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-details\" (click)=\"loadSheetTemplate()\" *ngIf=\"!sheet.finalized\"></button>           <button pButton type=\"button\" label=\"{{'Save to templates'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-save\" (click)=\"saveToTemplate()\" *ngIf=\"sheet.finalized\"></button>           <button pButton type=\"button\"  class=\"orange-btn\" icon=\"ui-icon-delete\" (click)=\"clearSheet()\" *ngIf=\"sheet && sheet.finalized\" label=\"{{'Clear'|translate}}\"></button>         </div>         <div class=\"ui-toolbar-group-right\">           <button pButton type=\"button\" class=\"blue-grey-btn\" icon=\"ui-icon-settings\" (click)=\"previewSheet()\" label=\"{{'Preview'|translate}}\"  *ngIf=\"sheet && sheet.finalized\"></button>         </div>       </p-toolbar>       <p-table #surveyQuestionTable [value]=\"surveyQuestions\" [responsive]=\"true\" styleClass=\"table-content\">           <ng-template pTemplate=\"header\">             <tr>               <th>#</th>               <th>                 {{'Title'|translate}}               </th>               <th>                 {{'Group'|translate}}               </th>             </tr>           </ng-template>           <ng-template pTemplate=\"body\" let-question let-rowIndex=\"rowIndex\">             <tr>               <td>{{rowIndex+1}}</td>               <td>{{question.title}}</td>               <td>{{question.group_id__DESC__}}</td>             </tr>           </ng-template>         </p-table>     </div>   </div>   <survey-sheet-preview-dialog></survey-sheet-preview-dialog>   <select-survey-sheet-dialog></select-survey-sheet-dialog>   <select-question-dialog></select-question-dialog>   <survey-sheet-save-dialog></survey-sheet-save-dialog>   <p-footer>     <button type=\"submit\" pButton icon=\"fa-check\" (click)=\"save()\"  label=\"{{'Save'|translate}}\"></button>     <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>   </p-footer> </p-dialog>",
        }),
        __metadata("design:paramtypes", [])
    ], SurveyContentDialog);
    return SurveyContentDialog;
}(base_component_1.BaseComponent));
exports.SurveyContentDialog = SurveyContentDialog;

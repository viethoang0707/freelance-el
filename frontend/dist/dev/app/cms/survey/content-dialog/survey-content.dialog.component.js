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
            templateUrl: 'survey-content.dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], SurveyContentDialog);
    return SurveyContentDialog;
}(base_component_1.BaseComponent));
exports.SurveyContentDialog = SurveyContentDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvc3VydmV5L2NvbnRlbnQtZGlhbG9nL3N1cnZleS1jb250ZW50LmRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBS3BFLGlGQUErRTtBQUMvRSw4RUFBdUU7QUFFdkUsMEZBQWtGO0FBQ2xGLGdHQUF3RjtBQUN4RixpSkFBbUk7QUFDbkksOEdBQWdHO0FBSWhHLDhCQUFnQztBQUVoQyxtSkFBcUk7QUFFckksdUlBQTJIO0FBTzNIO0lBQXlDLHVDQUFhO0lBWXJEO1FBQUEsWUFDQyxpQkFBTyxTQUlQO1FBSEEsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGdDQUFXLEVBQUUsQ0FBQztRQUMvQixLQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixLQUFJLENBQUMsTUFBTSxHQUFHLElBQUkscUJBQU0sRUFBRSxDQUFDOztJQUM1QixDQUFDO0lBRUQsa0NBQUksR0FBSixVQUFLLE1BQWM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELDhDQUFnQixHQUFoQjtRQUFBLGlCQWdCQztRQWZBLGdDQUFXLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDMUQsSUFBSSxLQUFLLEVBQUU7Z0JBQ1YsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ25CLHNDQUFjLENBQUMsV0FBVyxDQUFDLEtBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLGVBQWU7b0JBQ3hFLEtBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFD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QixDQUFDLFNBQVMsR0FBSSxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztvQkFDOUMsaUJBQWlCLENBQUMsUUFBUSxHQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUM7b0JBQ2hELGlCQUFpQixDQUFDLGdCQUFnQixHQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDaEUsaUJBQWlCLENBQUMsT0FBTyxHQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUM7b0JBQzlDLE9BQU8saUJBQWlCLENBQUM7Z0JBQzFCLENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7U0FDSDtJQUNGLENBQUM7SUE3R29DO1FBQXBDLGdCQUFTLENBQUMsZ0VBQXdCLENBQUM7a0NBQWdCLGdFQUF3Qjs4REFBQztJQUN6QztRQUFuQyxnQkFBUyxDQUFDLDhEQUF1QixDQUFDO2tDQUFvQiw4REFBdUI7a0VBQUM7SUFDN0M7UUFBakMsZ0JBQVMsQ0FBQyx3REFBcUIsQ0FBQztrQ0FBdUIsd0RBQXFCO3FFQUFDO0lBQzVDO1FBQWpDLGdCQUFTLENBQUMsMERBQXFCLENBQUM7a0NBQWEsMERBQXFCOzJEQUFDO0lBVnhELG1CQUFtQjtRQUwvQixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsV0FBVyxFQUFFLHNDQUFzQztTQUNuRCxDQUFDOztPQUNXLG1CQUFtQixDQXFIL0I7SUFBRCwwQkFBQztDQXJIRCxBQXFIQyxDQXJId0MsOEJBQWEsR0FxSHJEO0FBckhZLGtEQUFtQiIsImZpbGUiOiJhcHAvY21zL3N1cnZleS9jb250ZW50LWRpYWxvZy9zdXJ2ZXktY29udGVudC5kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdXJ2ZXkgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXkubW9kZWwnO1xuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBTdXJ2ZXlTaGVldCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1cnZleS1zaGVldC5tb2RlbCc7XG5pbXBvcnQgeyBTdXJ2ZXlRdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1cnZleS1xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBTdXJ2ZXlTaGVldFByZXZpZXdEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9hc3Nlc3NtZW50L3F1ZXN0aW9uL3N1cnZleS1zaGVldC1wcmV2aWV3L3N1cnZleS1zaGVldC1wcmV2aWV3LmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3VydmV5U2hlZXRTYXZlRGlhbG9nIH0gZnJvbSAnLi4vc3VydmV5LXNoZWV0LXNhdmUvc3VydmV5LXNoZWV0LXNhdmUuZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgUVVFU1RJT05fU0VMRUNUSU9OLCBHUk9VUF9DQVRFR09SWSwgRVhBTV9TVEFUVVMsIFFVRVNUSU9OX1RZUEUsIEVYQU1fTUVNQkVSX1NUQVRVUywgUVVFU1RJT05fTEVWRUwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IFNlbGVjdEl0ZW0sIE1lbnVJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFRyZWVVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3RyZWUudXRpbHMnO1xuaW1wb3J0IHsgU2VsZWN0U3VydmV5U2hlZXREaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3Qtc3VydmV5LXNoZWV0LWRpYWxvZy9zZWxlY3Qtc3VydmV5LXNoZWV0LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBTZWxlY3RRdWVzdGlvbnNEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtcXVlc3Rpb24tZGlhbG9nL3NlbGVjdC1xdWVzdGlvbi1kaWFsb2cuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnc3VydmV5LWNvbnRlbnQtZGlhbG9nJyxcblx0dGVtcGxhdGVVcmw6ICdzdXJ2ZXktY29udGVudC5kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlDb250ZW50RGlhbG9nIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cblx0cHJpdmF0ZSBkaXNwbGF5OiBib29sZWFuO1xuXHRwcml2YXRlIHN1cnZleTogU3VydmV5O1xuXHRwcml2YXRlIHNoZWV0OiBTdXJ2ZXlTaGVldDtcblx0cHJpdmF0ZSBzdXJ2ZXlRdWVzdGlvbnM6IFN1cnZleVF1ZXN0aW9uW107XG5cblx0QFZpZXdDaGlsZChTdXJ2ZXlTaGVldFByZXZpZXdEaWFsb2cpIHByZXZpZXdEaWFsb2c6IFN1cnZleVNoZWV0UHJldmlld0RpYWxvZztcblx0QFZpZXdDaGlsZChTZWxlY3RTdXJ2ZXlTaGVldERpYWxvZykgc2VsZWN0U2hlZXREaWFsb2c6IFNlbGVjdFN1cnZleVNoZWV0RGlhbG9nO1xuXHRAVmlld0NoaWxkKFNlbGVjdFF1ZXN0aW9uc0RpYWxvZykgc2VsZWN0UXVlc3Rpb25EaWFsb2c6IFNlbGVjdFF1ZXN0aW9uc0RpYWxvZztcblx0QFZpZXdDaGlsZChTdXJ2ZXlTaGVldFNhdmVEaWFsb2cpIHNhdmVEaWFsb2c6IFN1cnZleVNoZWV0U2F2ZURpYWxvZztcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2hlZXQgPSBuZXcgU3VydmV5U2hlZXQoKTtcblx0XHR0aGlzLnN1cnZleVF1ZXN0aW9ucyA9IFtdO1xuXHRcdHRoaXMuc3VydmV5ID0gbmV3IFN1cnZleSgpO1xuXHR9XG5cblx0c2hvdyhzdXJ2ZXk6IFN1cnZleSkge1xuXHRcdHRoaXMuZGlzcGxheSA9IHRydWU7XG5cdFx0dGhpcy5zdXJ2ZXkgPSBzdXJ2ZXk7XG5cdFx0dGhpcy5sb2FkU3VydmV5blNoZWV0KCk7XG5cdH1cblxuXHRsb2FkU3VydmV5blNoZWV0KCkge1xuXHRcdFN1cnZleVNoZWV0LmdldCh0aGlzLCB0aGlzLnN1cnZleS5zaGVldF9pZCkuc3Vic2NyaWJlKHNoZWV0ID0+IHtcblx0XHRcdGlmIChzaGVldCkge1xuXHRcdFx0XHR0aGlzLnNoZWV0ID0gc2hlZXQ7XG5cdFx0XHRcdFN1cnZleVF1ZXN0aW9uLmxpc3RCeVNoZWV0KHRoaXMsIHRoaXMuc2hlZXQuaWQpLnN1YnNjcmliZShzdXJ2ZXlRdWVzdGlvbnMgPT4ge1xuXHRcdFx0XHRcdHRoaXMuc3VydmV5UXVlc3Rpb25zID0gc3VydmV5UXVlc3Rpb25zO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aGlzLnNoZWV0ID0gbmV3IFN1cnZleVNoZWV0KCk7XG5cdFx0XHRcdHRoaXMuc2hlZXQuc3VydmV5X2lkID0gdGhpcy5zdXJ2ZXkuaWQ7XG5cdFx0XHRcdHRoaXMuc2hlZXQuc2F2ZSh0aGlzKS5zdWJzY3JpYmUoc2hlZXQgPT4ge1xuXHRcdFx0XHRcdHRoaXMuc2hlZXQgPSBzaGVldDtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRzYXZlKCkge1xuXHRcdHRoaXMuc2hlZXQuZmluYWxpemVkID0gdHJ1ZTtcblx0XHR0aGlzLnNoZWV0LnNhdmUodGhpcykuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdF8uZWFjaCh0aGlzLnN1cnZleVF1ZXN0aW9ucywgKHN1cnZleVF5ZXN0aW9uOiBTdXJ2ZXlRdWVzdGlvbikgPT4ge1xuXHRcdFx0XHRcdHN1cnZleVF5ZXN0aW9uLnNoZWV0X2lkID0gdGhpcy5zaGVldC5pZDtcblx0XHRcdH0pO1xuXHRcdFx0dmFyIG5ld1N1cnZleVF1ZXN0aW9ucyA9IF8uZmlsdGVyKHRoaXMuc3VydmV5UXVlc3Rpb25zLCAoc3VydmV5UXVlc3Rpb246U3VydmV5UXVlc3Rpb24pPT4ge1xuXHRcdFx0XHRyZXR1cm4gc3VydmV5UXVlc3Rpb24uaWQgPT0gbnVsbDtcblx0XHRcdH0pO1xuXHRcdFx0U3VydmV5UXVlc3Rpb24uY3JlYXRlQXJyYXkodGhpcywgbmV3U3VydmV5UXVlc3Rpb25zKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmhpZGUoKTtcblx0XHRcdFx0dGhpcy5zdWNjZXNzKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdDb250ZW50IHNhdmVkIHN1Y2Nlc3NmdWxseS4nKSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGhpZGUoKSB7XG5cdFx0dGhpcy5kaXNwbGF5ID0gZmFsc2U7XG5cdH1cblxuXHRwcmV2aWV3U2hlZXQoKSB7XG5cdFx0dGhpcy5wcmV2aWV3RGlhbG9nLnNob3codGhpcy5zaGVldCk7XG5cdH1cblxuXHRjbGVhclNoZWV0KCkge1xuXHRcdHRoaXMuc2hlZXQuZmluYWxpemVkID0gZmFsc2U7XG5cdFx0dGhpcy5zaGVldC5zYXZlKHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHR2YXIgZXhpc3RTdXJ2ZXlRdWVzdGlvbnMgPSBfLmZpbHRlcih0aGlzLnN1cnZleVF1ZXN0aW9ucywgKHN1cnZleVF1ZXN0aW9uOlN1cnZleVF1ZXN0aW9uKT0+IHtcblx0XHRcdFx0cmV0dXJuIHN1cnZleVF1ZXN0aW9uLmlkICE9IG51bGw7XG5cdFx0XHR9KTtcblx0XHRcdFN1cnZleVF1ZXN0aW9uLmRlbGV0ZUFycmF5KHRoaXMsIGV4aXN0U3VydmV5UXVlc3Rpb25zKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnN1cnZleVF1ZXN0aW9ucyA9IFtdO1xuXHRcdFx0fSk7XG5cdFx0fSlcblx0fVxuXG5cdGxvYWRTaGVldFRlbXBsYXRlKCkge1xuXHRcdGlmICh0aGlzLnN1cnZleVF1ZXN0aW9ucy5sZW5ndGggPT0gMClcblx0XHRcdHRoaXMuc2VsZWN0U2hlZXREaWFsb2cuc2hvdygpO1xuXHRcdHRoaXMuc2VsZWN0U2hlZXREaWFsb2cub25TZWxlY3RTaGVldC5maXJzdCgpLnN1YnNjcmliZSgoc2hlZXRUZW1wbDogU3VydmV5U2hlZXQpID0+IHtcblx0XHRcdFN1cnZleVF1ZXN0aW9uLmxpc3RCeVNoZWV0KHRoaXMsIHNoZWV0VGVtcGwuaWQpLnN1YnNjcmliZShzdXJ2ZXlRdWVzdGlvbnMgPT4ge1xuXHRcdFx0XHR0aGlzLnN1cnZleVF1ZXN0aW9ucyA9IF8ubWFwKHN1cnZleVF1ZXN0aW9ucywgc3VydmV5UXVlc3Rpb24gPT4ge1xuXHRcdFx0XHRcdHZhciBuZXdTdXJ2ZXlRdWVzdGlvbiA9IHN1cnZleVF1ZXN0aW9uLmNsb25lKCk7XG5cdFx0XHRcdFx0bmV3U3VydmV5UXVlc3Rpb24uc2hlZXRfaWQgPSB0aGlzLnNoZWV0LmlkO1xuXHRcdFx0XHRcdHJldHVybiBuZXdTdXJ2ZXlRdWVzdGlvbjtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdHNhdmVUb1RlbXBsYXRlKCkge1xuXHRcdGlmICh0aGlzLnNoZWV0ICYmIHRoaXMuc2hlZXQuZmluYWxpemVkKSB7XG5cdFx0XHR0aGlzLnNhdmVEaWFsb2cuc2hvdyh0aGlzLnNoZWV0LCB0aGlzLnN1cnZleVF1ZXN0aW9ucyk7XG5cdFx0fVxuXHR9XG5cblx0ZGVzaWduU2hlZXQoKSB7XG5cdFx0aWYgKHRoaXMuc3VydmV5UXVlc3Rpb25zLmxlbmd0aCA9PSAwKXtcblx0XHRcdHRoaXMuc2VsZWN0UXVlc3Rpb25EaWFsb2cuc2hvdygpO1xuXHRcdFx0dGhpcy5zZWxlY3RRdWVzdGlvbkRpYWxvZy5vblNlbGVjdFF1ZXN0aW9ucy5maXJzdCgpLnN1YnNjcmliZShxdWVzdGlvbnMgPT4ge1xuXHRcdFx0XHR0aGlzLnN1cnZleVF1ZXN0aW9ucyA9IF8ubWFwKHF1ZXN0aW9ucywgKHF1ZXN0aW9uOlF1ZXN0aW9uKSA9PiB7XG5cdFx0XHRcdFx0dmFyIG5ld1N1cnZleVF1ZXN0aW9uID0gbmV3IFN1cnZleVF1ZXN0aW9uKCk7XG5cdFx0XHRcdFx0bmV3U3VydmV5UXVlc3Rpb24ucXVlc3Rpb25faWQgPSBxdWVzdGlvbi5pZDtcblx0XHRcdFx0XHRuZXdTdXJ2ZXlRdWVzdGlvbi50aXRsZSA9ICBxdWVzdGlvbi50aXRsZTtcblx0XHRcdFx0XHRuZXdTdXJ2ZXlRdWVzdGlvbi50eXBlID0gIHF1ZXN0aW9uLnR5cGU7XG5cdFx0XHRcdFx0bmV3U3VydmV5UXVlc3Rpb24uc3VydmV5X2lkXHQgPSB0aGlzLnN1cnZleS5pZDtcblx0XHRcdFx0XHRuZXdTdXJ2ZXlRdWVzdGlvbi5ncm91cF9pZCA9ICBxdWVzdGlvbi5ncm91cF9pZDtcblx0XHRcdFx0XHRuZXdTdXJ2ZXlRdWVzdGlvbi5ncm91cF9pZF9fREVTQ19fID0gIHF1ZXN0aW9uLmdyb3VwX2lkX19ERVNDX187XG5cdFx0XHRcdFx0bmV3U3VydmV5UXVlc3Rpb24uY29udGVudCA9ICBxdWVzdGlvbi5jb250ZW50O1xuXHRcdFx0XHRcdHJldHVybiBuZXdTdXJ2ZXlRdWVzdGlvbjtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn0iXX0=

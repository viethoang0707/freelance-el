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
            templateUrl: 'exam-content.dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], ExamContentDialog);
    return ExamContentDialog;
}(base_component_1.BaseComponent));
exports.ExamContentDialog = ExamContentDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvZXhhbS9jb250ZW50LWRpYWxvZy9leGFtLWNvbnRlbnQuZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFLcEUsaUZBQStFO0FBQy9FLDBFQUFtRTtBQUVuRSw4RkFBc0Y7QUFFdEYsNEZBQW9GO0FBQ3BGLHVKQUF5STtBQUN6SSwwSEFBNEc7QUFDNUcsb0hBQXNHO0FBRXRHLDhEQUFxSjtBQUVySiw4QkFBZ0M7QUFFaEMseUpBQTJJO0FBRTNJLCtGQUFrRjtBQVFsRjtJQUF1QyxxQ0FBYTtJQWVuRDtRQUFBLFlBQ0MsaUJBQU8sU0FJUDtRQWxCRCxvQkFBYyxHQUFHLDBCQUFjLENBQUM7UUFlL0IsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLG9DQUFhLEVBQUUsQ0FBQztRQUNqQyxLQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksaUJBQUksRUFBRSxDQUFDOztJQUN4QixDQUFDO0lBRUQsZ0NBQUksR0FBSixVQUFLLElBQVU7UUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsNkNBQWlCLEdBQWpCO1FBQUEsaUJBaUJDO1FBaEJBLG9DQUFhLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDMUQsSUFBSSxLQUFLLEVBQUU7Z0JBQ1YsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ25CLGtDQUFZLENBQUMsV0FBVyxDQUFDLEtBQUksRUFBRSxLQUFJ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Q0FBQztrQ0FBYSw4REFBdUI7eURBQUM7SUFDMUM7UUFBN0IsZ0JBQVMsQ0FBQyxpREFBaUIsQ0FBQztrQ0FBZ0IsaURBQWlCOzREQUFDO0lBZG5ELGlCQUFpQjtRQUw3QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsV0FBVyxFQUFFLG9DQUFvQztTQUNqRCxDQUFDOztPQUNXLGlCQUFpQixDQStIN0I7SUFBRCx3QkFBQztDQS9IRCxBQStIQyxDQS9Ic0MsOEJBQWEsR0ErSG5EO0FBL0hZLDhDQUFpQiIsImZpbGUiOiJhcHAvY21zL2V4YW0vY29udGVudC1kaWFsb2cvZXhhbS1jb250ZW50LmRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IEV4YW0gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgUXVlc3Rpb25TaGVldCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLXNoZWV0Lm1vZGVsJztcbmltcG9ydCB7IEV4YW1HcmFkZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tZ3JhZGUubW9kZWwnO1xuaW1wb3J0IHsgRXhhbVF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBRdWVzdGlvblNoZWV0UHJldmlld0RpYWxvZyB9IGZyb20gJy4uLy4uLy4uL2Fzc2Vzc21lbnQvcXVlc3Rpb24vcXVlc3Rpb24tc2hlZXQtcHJldmlldy9xdWVzdGlvbi1zaGVldC1wcmV2aWV3LmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUXVlc3Rpb25TaGVldEVkaXRvckRpYWxvZyB9IGZyb20gJy4uL3F1ZXN0aW9uLXNoZWV0LWVkaXRvci9xdWVzdGlvbi1zaGVldC1lZGl0b3IuZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBRdWVzdGlvblNoZWV0U2F2ZURpYWxvZyB9IGZyb20gJy4uL3F1ZXN0aW9uLXNoZWV0LXNhdmUvcXVlc3Rpb24tc2hlZXQtc2F2ZS5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBRVUVTVElPTl9TRUxFQ1RJT04sIEdST1VQX0NBVEVHT1JZLCBFWEFNX1NUQVRVUywgUVVFU1RJT05fVFlQRSwgRVhBTV9NRU1CRVJfU1RBVFVTLCBRVUVTVElPTl9MRVZFTCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgU2VsZWN0SXRlbSwgTWVudUl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgVHJlZVV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvdHJlZS51dGlscyc7XG5pbXBvcnQgeyBTZWxlY3RRdWVzdGlvblNoZWV0RGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0LXF1ZXN0aW9uLXNoZWV0LWRpYWxvZy9zZWxlY3QtcXVlc3Rpb24tc2hlZXQtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEV4YW1TZXR0aW5nRGlhbG9nIH0gZnJvbSAnLi4vZXhhbS1zZXR0aW5nL2V4YW0tc2V0dGluZy5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEV4YW1NZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLW1lbWJlci5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ2V4YW0tY29udGVudC1kaWFsb2cnLFxuXHR0ZW1wbGF0ZVVybDogJ2V4YW0tY29udGVudC5kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBFeGFtQ29udGVudERpYWxvZyBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG5cdFFVRVNUSU9OX0xFVkVMID0gUVVFU1RJT05fTEVWRUw7XG5cblx0cHJpdmF0ZSBkaXNwbGF5OiBib29sZWFuO1xuXHRwcml2YXRlIGV4YW06IEV4YW07XG5cdHByaXZhdGUgc2hlZXQ6IFF1ZXN0aW9uU2hlZXQ7XG5cdHByaXZhdGUgZXhhbVF1ZXN0aW9uczogRXhhbVF1ZXN0aW9uW107XG5cdHByaXZhdGUgdG90YWxTY29yZTogbnVtYmVyO1xuXG5cdEBWaWV3Q2hpbGQoUXVlc3Rpb25TaGVldFByZXZpZXdEaWFsb2cpIHByZXZpZXdEaWFsb2c6IFF1ZXN0aW9uU2hlZXRQcmV2aWV3RGlhbG9nO1xuXHRAVmlld0NoaWxkKFNlbGVjdFF1ZXN0aW9uU2hlZXREaWFsb2cpIHNlbGVjdFNoZWV0RGlhbG9nOiBTZWxlY3RRdWVzdGlvblNoZWV0RGlhbG9nO1xuXHRAVmlld0NoaWxkKFF1ZXN0aW9uU2hlZXRFZGl0b3JEaWFsb2cpIGVkaXRvckRpYWxvZzogUXVlc3Rpb25TaGVldEVkaXRvckRpYWxvZztcblx0QFZpZXdDaGlsZChRdWVzdGlvblNoZWV0U2F2ZURpYWxvZykgc2F2ZURpYWxvZzogUXVlc3Rpb25TaGVldFNhdmVEaWFsb2c7XG5cdEBWaWV3Q2hpbGQoRXhhbVNldHRpbmdEaWFsb2cpIHNldHRpbmdEaWFsb2c6IEV4YW1TZXR0aW5nRGlhbG9nO1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2hlZXQgPSBuZXcgUXVlc3Rpb25TaGVldCgpO1xuXHRcdHRoaXMuZXhhbVF1ZXN0aW9ucyA9IFtdO1xuXHRcdHRoaXMuZXhhbSA9IG5ldyBFeGFtKCk7XG5cdH1cblxuXHRzaG93KGV4YW06IEV4YW0pIHtcblx0XHR0aGlzLmRpc3BsYXkgPSB0cnVlO1xuXHRcdHRoaXMuZXhhbSA9IGV4YW07XG5cdFx0dGhpcy5leGFtUXVlc3Rpb25zID0gW107XG5cdFx0dGhpcy5sb2FkUXVlc3Rpb25TaGVldCgpO1xuXHR9XG5cblx0bG9hZFF1ZXN0aW9uU2hlZXQoKSB7XG5cdFx0UXVlc3Rpb25TaGVldC5nZXQodGhpcywgdGhpcy5leGFtLnNoZWV0X2lkKS5zdWJzY3JpYmUoc2hlZXQgPT4ge1xuXHRcdFx0aWYgKHNoZWV0KSB7XG5cdFx0XHRcdHRoaXMuc2hlZXQgPSBzaGVldDtcblx0XHRcdFx0RXhhbVF1ZXN0aW9uLmxpc3RCeVNoZWV0KHRoaXMsIHRoaXMuc2hlZXQuaWQpLnN1YnNjcmliZShleGFtUXVlc3Rpb25zID0+IHtcblx0XHRcdFx0XHR0aGlzLmV4YW1RdWVzdGlvbnMgPSBleGFtUXVlc3Rpb25zO1xuXHRcdFx0XHRcdHRoaXMudG90YWxTY29yZSA9IF8ucmVkdWNlKGV4YW1RdWVzdGlvbnMsIChtZW1vLCBxKSA9PiB7IHJldHVybiBtZW1vICsgK3Euc2NvcmU7IH0sIDApO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aGlzLnNoZWV0ID0gbmV3IFF1ZXN0aW9uU2hlZXQoKTtcblx0XHRcdFx0dGhpcy5zaGVldC5leGFtX2lkID0gdGhpcy5leGFtLmlkO1xuXHRcdFx0XHR0aGlzLnNoZWV0LnNhdmUodGhpcykuc3Vic2NyaWJlKHNoZWV0ID0+IHtcblx0XHRcdFx0XHR0aGlzLnNoZWV0ID0gc2hlZXQ7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0c2F2ZSgpIHtcblx0XHR0aGlzLnNoZWV0LmZpbmFsaXplZCA9IHRydWU7XG5cdFx0dGhpcy5zaGVldC5zYXZlKHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRfLmVhY2godGhpcy5leGFtUXVlc3Rpb25zLCAoZXhhbVF5ZXN0aW9uOiBFeGFtUXVlc3Rpb24pID0+IHtcblx0XHRcdFx0ZXhhbVF5ZXN0aW9uLnNoZWV0X2lkID0gdGhpcy5zaGVldC5pZDtcblx0XHRcdH0pO1xuXHRcdFx0dmFyIG5ld0V4YW1RdWVzdGlvbnMgPSBfLmZpbHRlcih0aGlzLmV4YW1RdWVzdGlvbnMsIChleGFtUXllc3Rpb246IEV4YW1RdWVzdGlvbikgPT4ge1xuXHRcdFx0XHRyZXR1cm4gZXhhbVF5ZXN0aW9uLmlkID09IG51bGw7XG5cdFx0XHR9KTtcblx0XHRcdHZhciBleGlzdEV4YW1RdWVzdGlvbnMgPSBfLmZpbHRlcih0aGlzLmV4YW1RdWVzdGlvbnMsIChleGFtUXllc3Rpb246IEV4YW1RdWVzdGlvbikgPT4ge1xuXHRcdFx0XHRyZXR1cm4gZXhhbVF5ZXN0aW9uLmlkICE9IG51bGw7XG5cdFx0XHR9KTtcblx0XHRcdEV4YW1RdWVzdGlvbi5jcmVhdGVBcnJheSh0aGlzLCBuZXdFeGFtUXVlc3Rpb25zKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0XHRFeGFtUXVlc3Rpb24udXBkYXRlQXJyYXkodGhpcywgZXhpc3RFeGFtUXVlc3Rpb25zKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuaGlkZSgpO1xuXHRcdFx0XHRcdHRoaXMuc3VjY2Vzcyh0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnQ29udGVudCBzYXZlZCBzdWNjZXNzZnVsbHkuJykpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0fSk7XG5cdH1cblxuXHRoaWRlKCkge1xuXHRcdHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuXHR9XG5cblx0c2hvd1NldHRpbmcoKSB7XG5cdFx0dGhpcy5zZXR0aW5nRGlhbG9nLnNob3codGhpcy5leGFtKTtcblx0fVxuXG5cdHByZXZpZXdTaGVldCgpIHtcblx0XHR0aGlzLnByZXZpZXdEaWFsb2cuc2hvdyh0aGlzLnNoZWV0LCB0aGlzLmV4YW1RdWVzdGlvbnMpO1xuXHR9XG5cblx0Y2xlYXJTaGVldCgpIHtcblx0XHR0aGlzLnNoZWV0LmZpbmFsaXplZCA9IGZhbHNlO1xuXHRcdHRoaXMuc2hlZXQuc2F2ZSh0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0dmFyIGV4aXN0RXhhbVF1ZXN0aW9ucyA9IF8uZmlsdGVyKHRoaXMuZXhhbVF1ZXN0aW9ucywgKGV4YW1RdWVzdGlvbjogRXhhbVF1ZXN0aW9uKSA9PiB7XG5cdFx0XHRcdHJldHVybiBleGFtUXVlc3Rpb24uaWQgIT0gbnVsbDtcblx0XHRcdH0pO1xuXHRcdFx0RXhhbVF1ZXN0aW9uLmRlbGV0ZUFycmF5KHRoaXMsIHRoaXMuZXhhbVF1ZXN0aW9ucykuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdFx0dGhpcy5leGFtUXVlc3Rpb25zID0gW107XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGxvYWRTaGVldFRlbXBsYXRlKCkge1xuXHRcdGlmICh0aGlzLnNoZWV0ICYmICF0aGlzLnNoZWV0LmZpbmFsaXplZClcblx0XHRcdHRoaXMuc2VsZWN0U2hlZXREaWFsb2cuc2hvdygpO1xuXHRcdHRoaXMuc2VsZWN0U2hlZXREaWFsb2cub25TZWxlY3RTaGVldC5maXJzdCgpLnN1YnNjcmliZSgoc2hlZXRUZW1wbDogUXVlc3Rpb25TaGVldCkgPT4ge1xuXHRcdFx0RXhhbVF1ZXN0aW9uLmxpc3RCeVNoZWV0KHRoaXMsIHNoZWV0VGVtcGwuaWQpLnN1YnNjcmliZShleGFtUXVlc3Rpb25zID0+IHtcblx0XHRcdFx0dGhpcy5leGFtUXVlc3Rpb25zID0gXy5tYXAoZXhhbVF1ZXN0aW9ucywgZXhhbVF1ZXN0aW9uID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gZXhhbVF1ZXN0aW9uLmNsb25lKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRfLmVhY2godGhpcy5leGFtUXVlc3Rpb25zLCAoZXhhbVF1ZXN0aW9uOiBFeGFtUXVlc3Rpb24pID0+IHtcblx0XHRcdFx0XHRleGFtUXVlc3Rpb24uc2hlZXRfaWQgPSB0aGlzLnNoZWV0LmlkO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0dGhpcy50b3RhbFNjb3JlID0gXy5yZWR1Y2UoZXhhbVF1ZXN0aW9ucywgKG1lbW8sIHEpID0+IHsgcmV0dXJuIG1lbW8gKyArcS5zY29yZTsgfSwgMCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdHNhdmVUb1RlbXBsYXRlKCkge1xuXHRcdGlmICh0aGlzLnNoZWV0ICYmIHRoaXMuc2hlZXQuZmluYWxpemVkKSB7XG5cdFx0XHR0aGlzLnNhdmVEaWFsb2cuc2hvdyh0aGlzLnNoZWV0LCB0aGlzLmV4YW1RdWVzdGlvbnMpO1xuXHRcdH1cblx0fVxuXG5cdGRlc2lnblNoZWV0KCkge1xuXHRcdGlmICh0aGlzLnNoZWV0ICYmICF0aGlzLnNoZWV0LmZpbmFsaXplZCkge1xuXHRcdFx0dGhpcy5lZGl0b3JEaWFsb2cuc2hvdygpO1xuXHRcdFx0dGhpcy5lZGl0b3JEaWFsb2cub25TYXZlLnN1YnNjcmliZShleGFtUXVlc3Rpb25zID0+IHtcblx0XHRcdFx0Xy5lYWNoKGV4YW1RdWVzdGlvbnMsIChleGFtUXVlc3Rpb246IEV4YW1RdWVzdGlvbikgPT4ge1xuXHRcdFx0XHRcdGV4YW1RdWVzdGlvbi5zaGVldF9pZCA9IHRoaXMuc2hlZXQuaWQ7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHR0aGlzLmV4YW1RdWVzdGlvbnMgPSBleGFtUXVlc3Rpb25zO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59Il19

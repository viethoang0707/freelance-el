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
var survey_sheet_model_1 = require("../../../shared/models/elearning/survey-sheet.model");
var survey_question_model_1 = require("../../../shared/models/elearning/survey-question.model");
var _ = require("underscore");
var SurveySheetSaveDialog = (function (_super) {
    __extends(SurveySheetSaveDialog, _super);
    function SurveySheetSaveDialog() {
        var _this = _super.call(this) || this;
        _this.sheet = new survey_sheet_model_1.SurveySheet();
        return _this;
    }
    SurveySheetSaveDialog.prototype.show = function (sheet, questions) {
        this.display = true;
        this.sheet = sheet;
        this.surveyQuestions = questions;
    };
    SurveySheetSaveDialog.prototype.save = function () {
        var _this = this;
        var sheet = this.sheet.clone();
        sheet.save(this).subscribe(function () {
            var surveyQuestions = _.map(_this.surveyQuestions, function (question) {
                var surveyQuestion = question.clone();
                surveyQuestion.sheet_id = sheet.id;
                return surveyQuestion;
            });
            survey_question_model_1.SurveyQuestion.createArray(_this, surveyQuestions).subscribe(function () {
                _this.success('Question sheet saved successfully');
                _this.hide();
            });
        });
    };
    SurveySheetSaveDialog.prototype.hide = function () {
        this.display = false;
    };
    SurveySheetSaveDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'survey-sheet-save-dialog',
            templateUrl: 'survey-sheet-save.dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], SurveySheetSaveDialog);
    return SurveySheetSaveDialog;
}(base_component_1.BaseComponent));
exports.SurveySheetSaveDialog = SurveySheetSaveDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvc3VydmV5L3N1cnZleS1zaGVldC1zYXZlL3N1cnZleS1zaGVldC1zYXZlLmRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBS3BFLGlGQUErRTtBQUcvRSwwRkFBa0Y7QUFFbEYsZ0dBQXdGO0FBSXhGLDhCQUFnQztBQVVoQztJQUEyQyx5Q0FBYTtJQU12RDtRQUFBLFlBQ0MsaUJBQU8sU0FFUDtRQURBLEtBQUksQ0FBQyxLQUFLLEdBQUksSUFBSSxnQ0FBVyxFQUFFLENBQUM7O0lBQ2pDLENBQUM7SUFFRCxvQ0FBSSxHQUFKLFVBQUssS0FBa0IsRUFBRSxTQUEyQjtRQUNuRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFJLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsZUFBZSxHQUFJLFNBQVMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsb0NBQUksR0FBSjtRQUFBLGlCQWFDO1FBWkEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUM5QixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUMxQixJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxlQUFlLEVBQUUsVUFBQSxRQUFRO2dCQUN6RCxJQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3RDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDbkMsT0FBTyxjQUFjLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7WUFDSCxzQ0FBYyxDQUFDLFdBQVcsQ0FBQyxLQUFJLEVBQUUsZUFBZSxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUMzRCxLQUFJLENBQUMsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7Z0JBQ2xELEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNiLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsb0NBQUksR0FBSjtRQUNDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFsQ1cscUJBQXFCO1FBTGpDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLDBCQUEwQjtZQUNwQyxXQUFXLEVBQUUseUNBQXlDO1NBQ3RELENBQUM7O09BQ1cscUJBQXFCLENBdUNqQztJQUFELDRCQUFDO0NBdkNELEFBdUNDLENBdkMwQyw4QkFBYSxHQXVDdkQ7QUF2Q1ksc0RBQXFCIiwiZmlsZSI6ImFwcC9jbXMvc3VydmV5L3N1cnZleS1zaGVldC1zYXZlL3N1cnZleS1zaGVldC1zYXZlLmRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IEV4YW0gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgU3VydmV5U2hlZXQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXktc2hlZXQubW9kZWwnO1xuaW1wb3J0IHsgRXhhbUdyYWRlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1ncmFkZS5tb2RlbCc7XG5pbXBvcnQgeyBTdXJ2ZXlRdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1cnZleS1xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgUVVFU1RJT05fU0VMRUNUSU9OLCBHUk9VUF9DQVRFR09SWSwgRVhBTV9TVEFUVVMsIFFVRVNUSU9OX1RZUEUsIEVYQU1fTUVNQkVSX1NUQVRVUywgUVVFU1RJT05fTEVWRUwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IFNlbGVjdEl0ZW0sIE1lbnVJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFRyZWVVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3RyZWUudXRpbHMnO1xuaW1wb3J0IHsgU2VsZWN0UXVlc3Rpb25zRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0LXF1ZXN0aW9uLWRpYWxvZy9zZWxlY3QtcXVlc3Rpb24tZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnc3VydmV5LXNoZWV0LXNhdmUtZGlhbG9nJyxcblx0dGVtcGxhdGVVcmw6ICdzdXJ2ZXktc2hlZXQtc2F2ZS5kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlTaGVldFNhdmVEaWFsb2cgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuXHRwcml2YXRlIGRpc3BsYXk6IGJvb2xlYW47XG5cdHByaXZhdGUgc2hlZXQ6IFN1cnZleVNoZWV0O1xuXHRwcml2YXRlIHN1cnZleVF1ZXN0aW9uczogU3VydmV5UXVlc3Rpb25bXTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2hlZXQgPSAgbmV3IFN1cnZleVNoZWV0KCk7XG5cdH1cblxuXHRzaG93KHNoZWV0OiBTdXJ2ZXlTaGVldCwgcXVlc3Rpb25zOiBTdXJ2ZXlRdWVzdGlvbltdKSB7XG5cdFx0dGhpcy5kaXNwbGF5ID0gdHJ1ZTtcblx0XHR0aGlzLnNoZWV0ID0gIHNoZWV0O1xuXHRcdHRoaXMuc3VydmV5UXVlc3Rpb25zID0gIHF1ZXN0aW9ucztcblx0fVxuXG5cdHNhdmUoKSB7XG5cdFx0dmFyIHNoZWV0ID0gdGhpcy5zaGVldC5jbG9uZSgpXG5cdFx0c2hlZXQuc2F2ZSh0aGlzKS5zdWJzY3JpYmUoKCk9PiB7XG5cdFx0XHR2YXIgc3VydmV5UXVlc3Rpb25zID0gXy5tYXAodGhpcy5zdXJ2ZXlRdWVzdGlvbnMsIHF1ZXN0aW9uPT4ge1xuXHRcdFx0XHR2YXIgc3VydmV5UXVlc3Rpb24gPSBxdWVzdGlvbi5jbG9uZSgpO1xuXHRcdFx0XHRzdXJ2ZXlRdWVzdGlvbi5zaGVldF9pZCA9IHNoZWV0LmlkO1xuXHRcdFx0XHRyZXR1cm4gc3VydmV5UXVlc3Rpb247XG5cdFx0XHR9KTtcblx0XHRcdFN1cnZleVF1ZXN0aW9uLmNyZWF0ZUFycmF5KHRoaXMsIHN1cnZleVF1ZXN0aW9ucykuc3Vic2NyaWJlKCgpPT4ge1xuXHRcdFx0XHR0aGlzLnN1Y2Nlc3MoJ1F1ZXN0aW9uIHNoZWV0IHNhdmVkIHN1Y2Nlc3NmdWxseScpO1xuXHRcdFx0XHR0aGlzLmhpZGUoKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0aGlkZSgpIHtcblx0XHR0aGlzLmRpc3BsYXkgPSBmYWxzZTtcblx0fVxuXG5cblxuXHRcbn0iXX0=

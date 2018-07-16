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
var question_sheet_preview_dialog_component_1 = require("../question-sheet-preview/question-sheet-preview.dialog.component");
var question_sheet_model_1 = require("../../../shared/models/elearning/question-sheet.model");
var QuestionSheetListComponent = (function (_super) {
    __extends(QuestionSheetListComponent, _super);
    function QuestionSheetListComponent() {
        var _this = _super.call(this) || this;
        _this.sheets = [];
        return _this;
    }
    QuestionSheetListComponent.prototype.ngOnInit = function () {
        this.loadQuestionSheets();
    };
    QuestionSheetListComponent.prototype.deleteSheet = function () {
        var _this = this;
        this.confirm(this.translateService.instant('Are you sure to delete?'), function () {
            _this.selectedSheet.delete(_this).subscribe(function () {
                _this.selectedSheet = null;
                _this.loadQuestionSheets();
            });
        });
    };
    QuestionSheetListComponent.prototype.previewSheet = function () {
        var _this = this;
        exam_question_model_1.ExamQuestion.listBySheet(this, this.selectedSheet.id).subscribe(function (examQuestion) {
            _this.sheetDialog.show(_this.selectedSheet, examQuestion);
        });
    };
    QuestionSheetListComponent.prototype.loadQuestionSheets = function () {
        var _this = this;
        question_sheet_model_1.QuestionSheet.listTemplate(this).subscribe(function (sheets) {
            _this.sheets = sheets;
        });
    };
    __decorate([
        core_1.ViewChild(question_sheet_preview_dialog_component_1.QuestionSheetPreviewDialog),
        __metadata("design:type", question_sheet_preview_dialog_component_1.QuestionSheetPreviewDialog)
    ], QuestionSheetListComponent.prototype, "sheetDialog", void 0);
    QuestionSheetListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-sheet-list',
            templateUrl: 'question-sheet-list.component.html',
            styleUrls: ['question-sheet-list.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], QuestionSheetListComponent);
    return QuestionSheetListComponent;
}(base_component_1.BaseComponent));
exports.QuestionSheetListComponent = QuestionSheetListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXNoZWV0LWxpc3QvcXVlc3Rpb24tc2hlZXQtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBRXBFLGlGQUErRTtBQUsvRSw0RkFBb0Y7QUFLcEYsNkhBQStHO0FBQy9HLDhGQUFzRjtBQVN0RjtJQUFnRCw4Q0FBYTtJQVF6RDtRQUFBLFlBQ0ksaUJBQU8sU0FFVjtRQURHLEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDOztJQUNyQixDQUFDO0lBRUQsNkNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxnREFBVyxHQUFYO1FBQUEsaUJBT0M7UUFORyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsRUFBRTtZQUNuRSxLQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ3RDLEtBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGlEQUFZLEdBQVo7UUFBQSxpQkFJQztRQUhHLGtDQUFZLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLFlBQVk7WUFDeEUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM1RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx1REFBa0IsR0FBbEI7UUFBQSxpQkFJQztRQUhHLG9DQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDN0MsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBL0JzQztRQUF0QyxnQkFBUyxDQUFDLG9FQUEwQixDQUFDO2tDQUFjLG9FQUEwQjttRUFBQztJQUx0RSwwQkFBMEI7UUFOdEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFdBQVcsRUFBRSxvQ0FBb0M7WUFDakQsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7U0FDbkQsQ0FBQzs7T0FDVywwQkFBMEIsQ0FzQ3RDO0lBQUQsaUNBQUM7Q0F0Q0QsQUFzQ0MsQ0F0QytDLDhCQUFhLEdBc0M1RDtBQXRDWSxnRUFBMEIiLCJmaWxlIjoiYXBwL2Fzc2Vzc21lbnQvcXVlc3Rpb24vcXVlc3Rpb24tc2hlZXQtbGlzdC9xdWVzdGlvbi1zaGVldC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBRVUVTVElPTl9UWVBFLCBHUk9VUF9DQVRFR09SWSwgUVVFU1RJT05fTEVWRUwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IEV4YW1RdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBRdWVzdGlvbkRpYWxvZyB9IGZyb20gJy4uL3F1ZXN0aW9uLWRpYWxvZy9xdWVzdGlvbi1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3RyZWUudXRpbHMnO1xuaW1wb3J0IHsgVHJlZU5vZGUsIE1lbnVJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgUXVlc3Rpb25TaGVldFByZXZpZXdEaWFsb2cgfSBmcm9tICcuLi9xdWVzdGlvbi1zaGVldC1wcmV2aWV3L3F1ZXN0aW9uLXNoZWV0LXByZXZpZXcuZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBRdWVzdGlvblNoZWV0IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvcXVlc3Rpb24tc2hlZXQubW9kZWwnO1xuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9xdWVzdGlvbi5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdxdWVzdGlvbi1zaGVldC1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3F1ZXN0aW9uLXNoZWV0LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydxdWVzdGlvbi1zaGVldC1saXN0LmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25TaGVldExpc3RDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuICAgIHByaXZhdGUgc2hlZXRzOiBRdWVzdGlvbltdO1xuICAgIHByaXZhdGUgc2VsZWN0ZWRTaGVldDogYW55O1xuXG4gICAgQFZpZXdDaGlsZChRdWVzdGlvblNoZWV0UHJldmlld0RpYWxvZykgc2hlZXREaWFsb2c6IFF1ZXN0aW9uU2hlZXRQcmV2aWV3RGlhbG9nO1xuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zaGVldHMgPSBbXTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5sb2FkUXVlc3Rpb25TaGVldHMoKTtcbiAgICB9XG5cbiAgICBkZWxldGVTaGVldCgpIHtcbiAgICAgICAgdGhpcy5jb25maXJtKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdBcmUgeW91IHN1cmUgdG8gZGVsZXRlPycpLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2hlZXQuZGVsZXRlKHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNoZWV0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRRdWVzdGlvblNoZWV0cygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByZXZpZXdTaGVldCgpIHtcbiAgICAgICAgRXhhbVF1ZXN0aW9uLmxpc3RCeVNoZWV0KHRoaXMsIHRoaXMuc2VsZWN0ZWRTaGVldC5pZCkuc3Vic2NyaWJlKGV4YW1RdWVzdGlvbiA9PiB7XG4gICAgICAgICAgICB0aGlzLnNoZWV0RGlhbG9nLnNob3codGhpcy5zZWxlY3RlZFNoZWV0LCBleGFtUXVlc3Rpb24pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkUXVlc3Rpb25TaGVldHMoKSB7XG4gICAgICAgIFF1ZXN0aW9uU2hlZXQubGlzdFRlbXBsYXRlKHRoaXMpLnN1YnNjcmliZShzaGVldHMgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaGVldHMgPSBzaGVldHM7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSJdfQ==

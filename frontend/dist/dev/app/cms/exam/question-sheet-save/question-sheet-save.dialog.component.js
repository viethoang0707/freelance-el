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
var question_sheet_model_1 = require("../../../shared/models/elearning/question-sheet.model");
var _ = require("underscore");
var QuestionSheetSaveDialog = (function (_super) {
    __extends(QuestionSheetSaveDialog, _super);
    function QuestionSheetSaveDialog() {
        var _this = _super.call(this) || this;
        _this.sheet = new question_sheet_model_1.QuestionSheet();
        return _this;
    }
    QuestionSheetSaveDialog.prototype.show = function (sheet, questions) {
        this.display = true;
        this.sheet = sheet;
        this.examQuestions = questions;
    };
    QuestionSheetSaveDialog.prototype.save = function () {
        var _this = this;
        var sheet = new question_sheet_model_1.QuestionSheet();
        sheet.name = this.sheet.name;
        sheet.save(this).subscribe(function () {
            var examQuestions = _.map(_this.examQuestions, function (question) {
                var questionTempl = question.clone();
                questionTempl.exam_id = null;
                questionTempl.sheet_id = sheet.id;
                return questionTempl;
            });
            var subscriptions = _.map(examQuestions, function (examQuestion) {
                return examQuestion.save(_this);
            });
            subscriptions.push(_this.sheet.save(_this));
            Observable_1.Observable.forkJoin(subscriptions).subscribe(function () {
                _this.success(_this.translateService.instant('Question sheet saved successfully'));
                _this.hide();
            });
        });
    };
    QuestionSheetSaveDialog.prototype.hide = function () {
        this.display = false;
    };
    QuestionSheetSaveDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-sheet-save-dialog',
            templateUrl: 'question-sheet-save.dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], QuestionSheetSaveDialog);
    return QuestionSheetSaveDialog;
}(base_component_1.BaseComponent));
exports.QuestionSheetSaveDialog = QuestionSheetSaveDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvZXhhbS9xdWVzdGlvbi1zaGVldC1zYXZlL3F1ZXN0aW9uLXNoZWV0LXNhdmUuZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFDcEUsOENBQTZDO0FBSTdDLGlGQUErRTtBQUcvRSw4RkFBc0Y7QUFNdEYsOEJBQWdDO0FBYWhDO0lBQTZDLDJDQUFhO0lBTXpEO1FBQUEsWUFDQyxpQkFBTyxTQUVQO1FBREEsS0FBSSxDQUFDLEtBQUssR0FBSSxJQUFJLG9DQUFhLEVBQUUsQ0FBQzs7SUFDbkMsQ0FBQztJQUVELHNDQUFJLEdBQUosVUFBSyxLQUFvQixFQUFFLFNBQXlCO1FBQ25ELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUksS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUksU0FBUyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxzQ0FBSSxHQUFKO1FBQUEsaUJBc0JDO1FBckJBLElBQUksS0FBSyxHQUFHLElBQUksb0NBQWEsRUFBRSxDQUFDO1FBQ2hDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFFN0IsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDMUIsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsYUFBYSxFQUFFLFVBQUEsUUFBUTtnQkFDckQsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNyQyxhQUFhLENBQUMsT0FBTyxHQUFJLElBQUksQ0FBQztnQkFDOUIsYUFBYSxDQUFDLFFBQVEsR0FBSSxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUNuQyxPQUFPLGFBQWEsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztZQUdILElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQUEsWUFBWTtnQkFDcEQsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFDLHVCQUFVLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDNUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsQ0FBQztnQkFDakYsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2IsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxzQ0FBSSxHQUFKO1FBQ0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQTNDVyx1QkFBdUI7UUFMbkMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsNEJBQTRCO1lBQ3RDLFdBQVcsRUFBRSwyQ0FBMkM7U0FDeEQsQ0FBQzs7T0FDVyx1QkFBdUIsQ0FnRG5DO0lBQUQsOEJBQUM7Q0FoREQsQUFnREMsQ0FoRDRDLDhCQUFhLEdBZ0R6RDtBQWhEWSwwREFBdUIiLCJmaWxlIjoiYXBwL2Ntcy9leGFtL3F1ZXN0aW9uLXNoZWV0LXNhdmUvcXVlc3Rpb24tc2hlZXQtc2F2ZS5kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFeGFtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS5tb2RlbCc7XG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uU2hlZXQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9xdWVzdGlvbi1zaGVldC5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtR3JhZGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLWdyYWRlLm1vZGVsJztcbmltcG9ydCB7IEV4YW1RdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IFFVRVNUSU9OX1NFTEVDVElPTiwgR1JPVVBfQ0FURUdPUlksIEVYQU1fU1RBVFVTLCBRVUVTVElPTl9UWVBFLCBFWEFNX01FTUJFUl9TVEFUVVMsIFFVRVNUSU9OX0xFVkVMIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBTZWxlY3RJdGVtLCBNZW51SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBUcmVlVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy90cmVlLnV0aWxzJztcbmltcG9ydCB7IFNlbGVjdFF1ZXN0aW9uc0RpYWxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC1xdWVzdGlvbi1kaWFsb2cvc2VsZWN0LXF1ZXN0aW9uLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgQ3JlYXRlQVBJIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9jcmVhdGUuYXBpJztcblxuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdxdWVzdGlvbi1zaGVldC1zYXZlLWRpYWxvZycsXG5cdHRlbXBsYXRlVXJsOiAncXVlc3Rpb24tc2hlZXQtc2F2ZS5kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblNoZWV0U2F2ZURpYWxvZyBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG5cdHByaXZhdGUgZGlzcGxheTogYm9vbGVhbjtcblx0cHJpdmF0ZSBzaGVldDogUXVlc3Rpb25TaGVldDtcblx0cHJpdmF0ZSBleGFtUXVlc3Rpb25zOiBFeGFtUXVlc3Rpb25bXTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2hlZXQgPSAgbmV3IFF1ZXN0aW9uU2hlZXQoKTtcblx0fVxuXG5cdHNob3coc2hlZXQ6IFF1ZXN0aW9uU2hlZXQsIHF1ZXN0aW9uczogRXhhbVF1ZXN0aW9uW10pIHtcblx0XHR0aGlzLmRpc3BsYXkgPSB0cnVlO1xuXHRcdHRoaXMuc2hlZXQgPSAgc2hlZXQ7XG5cdFx0dGhpcy5leGFtUXVlc3Rpb25zID0gIHF1ZXN0aW9ucztcblx0fVxuXG5cdHNhdmUoKSB7XG5cdFx0dmFyIHNoZWV0ID0gbmV3IFF1ZXN0aW9uU2hlZXQoKTtcblx0XHRzaGVldC5uYW1lID0gdGhpcy5zaGVldC5uYW1lO1xuXHRcdFxuXHRcdHNoZWV0LnNhdmUodGhpcykuc3Vic2NyaWJlKCgpPT4ge1xuXHRcdFx0dmFyIGV4YW1RdWVzdGlvbnMgPSBfLm1hcCh0aGlzLmV4YW1RdWVzdGlvbnMsIHF1ZXN0aW9uPT4ge1xuXHRcdFx0XHR2YXIgcXVlc3Rpb25UZW1wbCA9IHF1ZXN0aW9uLmNsb25lKCk7XG5cdFx0XHRcdHF1ZXN0aW9uVGVtcGwuZXhhbV9pZCA9ICBudWxsO1xuXHRcdFx0XHRxdWVzdGlvblRlbXBsLnNoZWV0X2lkID0gIHNoZWV0LmlkO1xuXHRcdFx0XHRyZXR1cm4gcXVlc3Rpb25UZW1wbDtcblx0XHRcdH0pO1xuXHRcdFx0Ly8gRXhhbVF1ZXN0aW9uLmNyZWF0ZUFycmF5KHRoaXMsIGV4YW1RdWVzdGlvbnMpLnN1YnNjcmliZSgoKT0+IHtcblx0XHRcdC8vIFx0dGhpcy5zdWNjZXNzKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdRdWVzdGlvbiBzaGVldCBzYXZlZCBzdWNjZXNzZnVsbHknKSk7XG5cdFx0XHR2YXIgc3Vic2NyaXB0aW9ucyA9IF8ubWFwKGV4YW1RdWVzdGlvbnMsIGV4YW1RdWVzdGlvbj0+IHtcblx0XHRcdFx0cmV0dXJuIGV4YW1RdWVzdGlvbi5zYXZlKHRoaXMpO1xuXHRcdFx0fSk7XG5cdFx0XHRzdWJzY3JpcHRpb25zLnB1c2godGhpcy5zaGVldC5zYXZlKHRoaXMpKTtcblx0XHRcdE9ic2VydmFibGUuZm9ya0pvaW4oc3Vic2NyaXB0aW9ucykuc3Vic2NyaWJlKCgpPT4ge1xuXHRcdFx0XHR0aGlzLnN1Y2Nlc3ModGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ1F1ZXN0aW9uIHNoZWV0IHNhdmVkIHN1Y2Nlc3NmdWxseScpKTtcblx0XHRcdFx0dGhpcy5oaWRlKCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGhpZGUoKSB7XG5cdFx0dGhpcy5kaXNwbGF5ID0gZmFsc2U7XG5cdH1cblxuXG5cblx0XG59Il19

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
var Rx_1 = require("rxjs/Rx");
var base_component_1 = require("../base/base.component");
var question_sheet_model_1 = require("../../../shared/models/elearning/question-sheet.model");
var SelectQuestionSheetDialog = (function (_super) {
    __extends(SelectQuestionSheetDialog, _super);
    function SelectQuestionSheetDialog() {
        var _this = _super.call(this) || this;
        _this.onSelectSheetReceiver = new Rx_1.Subject();
        _this.onSelectSheet = _this.onSelectSheetReceiver.asObservable();
        _this.display = false;
        _this.sheets = [];
        return _this;
    }
    SelectQuestionSheetDialog.prototype.hide = function () {
        this.display = false;
    };
    SelectQuestionSheetDialog.prototype.show = function () {
        var _this = this;
        this.display = true;
        question_sheet_model_1.QuestionSheet.listTemplate(this).subscribe(function (sheets) {
            _this.sheets = sheets;
        });
    };
    SelectQuestionSheetDialog.prototype.selectSheet = function () {
        this.onSelectSheetReceiver.next(this.selectedSheet);
        this.hide();
    };
    SelectQuestionSheetDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'select-question-sheet-dialog',
            templateUrl: 'select-question-sheet-dialog.component.html',
            styleUrls: ['select-question-sheet-dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], SelectQuestionSheetDialog);
    return SelectQuestionSheetDialog;
}(base_component_1.BaseComponent));
exports.SelectQuestionSheetDialog = SelectQuestionSheetDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtcXVlc3Rpb24tc2hlZXQtZGlhbG9nL3NlbGVjdC1xdWVzdGlvbi1zaGVldC1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCw4QkFBOEM7QUFJOUMseURBQXVEO0FBQ3ZELDhGQUFzRjtBQWF0RjtJQUErQyw2Q0FBYTtJQVMzRDtRQUFBLFlBQ0MsaUJBQU8sU0FHUDtRQVBPLDJCQUFxQixHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQ3pELG1CQUFhLEdBQW9CLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUk3RSxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQzs7SUFDbEIsQ0FBQztJQUVELHdDQUFJLEdBQUo7UUFDQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBR0Qsd0NBQUksR0FBSjtRQUFBLGlCQUtDO1FBSkEsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsb0NBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUNoRCxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCwrQ0FBVyxHQUFYO1FBQ0MsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2IsQ0FBQztJQTlCVyx5QkFBeUI7UUFOckMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsOEJBQThCO1lBQ3hDLFdBQVcsRUFBRSw2Q0FBNkM7WUFDMUQsU0FBUyxFQUFFLENBQUMsNENBQTRDLENBQUM7U0FDekQsQ0FBQzs7T0FDVyx5QkFBeUIsQ0FpQ3JDO0lBQUQsZ0NBQUM7Q0FqQ0QsQUFpQ0MsQ0FqQzhDLDhCQUFhLEdBaUMzRDtBQWpDWSw4REFBeUIiLCJmaWxlIjoiYXBwL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC1xdWVzdGlvbi1zaGVldC1kaWFsb2cvc2VsZWN0LXF1ZXN0aW9uLXNoZWV0LWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBFeGFtUXVlc3Rpb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUXVlc3Rpb25TaGVldCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLXNoZWV0Lm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBUcmVlVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy90cmVlLnV0aWxzJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgR1JPVVBfQ0FURUdPUlksIENPTlRFTlRfU1RBVFVTIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdzZWxlY3QtcXVlc3Rpb24tc2hlZXQtZGlhbG9nJyxcblx0dGVtcGxhdGVVcmw6ICdzZWxlY3QtcXVlc3Rpb24tc2hlZXQtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJ3NlbGVjdC1xdWVzdGlvbi1zaGVldC1kaWFsb2cuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RRdWVzdGlvblNoZWV0RGlhbG9nIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cblx0cHJpdmF0ZSBzZWxlY3RlZFNoZWV0OiBRdWVzdGlvblNoZWV0W107XG5cdHByaXZhdGUgc2hlZXRzOlF1ZXN0aW9uU2hlZXRbXTtcblx0cHJpdmF0ZSBkaXNwbGF5OiBib29sZWFuO1xuXG5cdHByaXZhdGUgb25TZWxlY3RTaGVldFJlY2VpdmVyOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuICAgIG9uU2VsZWN0U2hlZXQ6T2JzZXJ2YWJsZTxhbnk+ID0gIHRoaXMub25TZWxlY3RTaGVldFJlY2VpdmVyLmFzT2JzZXJ2YWJsZSgpO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5kaXNwbGF5ID0gZmFsc2U7XG5cdFx0dGhpcy5zaGVldHMgPSBbXTtcblx0fVxuXG5cdGhpZGUoKSB7XG5cdFx0dGhpcy5kaXNwbGF5ID0gZmFsc2U7XG5cdH1cblxuXG5cdHNob3coKSB7XG5cdFx0dGhpcy5kaXNwbGF5ID0gdHJ1ZTtcblx0XHRRdWVzdGlvblNoZWV0Lmxpc3RUZW1wbGF0ZSh0aGlzKS5zdWJzY3JpYmUoc2hlZXRzID0+IHtcblx0XHRcdHRoaXMuc2hlZXRzID0gc2hlZXRzO1xuXHRcdH0pO1xuXHR9XG5cblx0c2VsZWN0U2hlZXQoKSB7XG5cdFx0dGhpcy5vblNlbGVjdFNoZWV0UmVjZWl2ZXIubmV4dCh0aGlzLnNlbGVjdGVkU2hlZXQpO1xuXHRcdHRoaXMuaGlkZSgpO1xuXHR9XG5cblxufVxuXG4iXX0=

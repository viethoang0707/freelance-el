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
var survey_sheet_preview_dialog_component_1 = require("../survey-sheet-preview/survey-sheet-preview.dialog.component");
var survey_sheet_model_1 = require("../../../shared/models/elearning/survey-sheet.model");
var SurveySheetListComponent = (function (_super) {
    __extends(SurveySheetListComponent, _super);
    function SurveySheetListComponent() {
        var _this = _super.call(this) || this;
        _this.sheets = [];
        return _this;
    }
    SurveySheetListComponent.prototype.ngOnInit = function () {
        this.loadSurveySheets();
    };
    SurveySheetListComponent.prototype.deleteSheet = function () {
        var _this = this;
        this.confirm('Are you sure to delete ?', function () {
            _this.selectedSheet.delete(_this).subscribe(function () {
                _this.selectedSheet = null;
                _this.loadSurveySheets();
            });
        });
    };
    SurveySheetListComponent.prototype.previewSheet = function () {
        this.sheetDialog.show(this.selectedSheet);
    };
    SurveySheetListComponent.prototype.loadSurveySheets = function () {
        var _this = this;
        survey_sheet_model_1.SurveySheet.listTemplate(this).subscribe(function (sheets) {
            _this.sheets = sheets;
        });
    };
    __decorate([
        core_1.ViewChild(survey_sheet_preview_dialog_component_1.SurveySheetPreviewDialog),
        __metadata("design:type", survey_sheet_preview_dialog_component_1.SurveySheetPreviewDialog)
    ], SurveySheetListComponent.prototype, "sheetDialog", void 0);
    SurveySheetListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'survey-sheet-list',
            templateUrl: 'survey-sheet-list.component.html',
            styleUrls: ['survey-sheet-list.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], SurveySheetListComponent);
    return SurveySheetListComponent;
}(base_component_1.BaseComponent));
exports.SurveySheetListComponent = SurveySheetListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L3F1ZXN0aW9uL3N1cnZleS1zaGVldC1saXN0L3N1cnZleS1zaGVldC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFFcEUsaUZBQStFO0FBVS9FLHVIQUF5RztBQUN6RywwRkFBa0Y7QUFTbEY7SUFBOEMsNENBQWE7SUFPdkQ7UUFBQSxZQUNJLGlCQUFPLFNBRVY7UUFERyxLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQzs7SUFDckIsQ0FBQztJQUVELDJDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsOENBQVcsR0FBWDtRQUFBLGlCQU9DO1FBTkcsSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRTtZQUNyQyxLQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ3RDLEtBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUM1QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELCtDQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELG1EQUFnQixHQUFoQjtRQUFBLGlCQUlDO1FBSEcsZ0NBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUMzQyxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUEvQm9DO1FBQXBDLGdCQUFTLENBQUMsZ0VBQXdCLENBQUM7a0NBQWMsZ0VBQXdCO2lFQUFDO0lBRmxFLHdCQUF3QjtRQU5wQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsV0FBVyxFQUFFLGtDQUFrQztZQUMvQyxTQUFTLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztTQUNqRCxDQUFDOztPQUNXLHdCQUF3QixDQW1DcEM7SUFBRCwrQkFBQztDQW5DRCxBQW1DQyxDQW5DNkMsOEJBQWEsR0FtQzFEO0FBbkNZLDREQUF3QiIsImZpbGUiOiJhcHAvYXNzZXNzbWVudC9xdWVzdGlvbi9zdXJ2ZXktc2hlZXQtbGlzdC9zdXJ2ZXktc2hlZXQtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgUVVFU1RJT05fVFlQRSwgR1JPVVBfQ0FURUdPUlksIFFVRVNUSU9OX0xFVkVMIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgUXVlc3Rpb25EaWFsb2cgfSBmcm9tICcuLi9xdWVzdGlvbi1kaWFsb2cvcXVlc3Rpb24tZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy90cmVlLnV0aWxzJztcbmltcG9ydCB7IFRyZWVOb2RlLCBNZW51SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IFN1cnZleVNoZWV0UHJldmlld0RpYWxvZyB9IGZyb20gJy4uL3N1cnZleS1zaGVldC1wcmV2aWV3L3N1cnZleS1zaGVldC1wcmV2aWV3LmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3VydmV5U2hlZXQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXktc2hlZXQubW9kZWwnO1xuaW1wb3J0IHsgU3VydmV5UXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXktcXVlc3Rpb24ubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnc3VydmV5LXNoZWV0LWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnc3VydmV5LXNoZWV0LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydzdXJ2ZXktc2hlZXQtbGlzdC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFN1cnZleVNoZWV0TGlzdENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG4gICAgQFZpZXdDaGlsZChTdXJ2ZXlTaGVldFByZXZpZXdEaWFsb2cpIHNoZWV0RGlhbG9nOiBTdXJ2ZXlTaGVldFByZXZpZXdEaWFsb2c7XG5cbiAgICBwcml2YXRlIHNoZWV0czogUXVlc3Rpb25bXTtcbiAgICBwcml2YXRlIHNlbGVjdGVkU2hlZXQ6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNoZWV0cyA9IFtdO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmxvYWRTdXJ2ZXlTaGVldHMoKTtcbiAgICB9XG5cbiAgICBkZWxldGVTaGVldCgpIHtcbiAgICAgICAgdGhpcy5jb25maXJtKCdBcmUgeW91IHN1cmUgdG8gZGVsZXRlID8nLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2hlZXQuZGVsZXRlKHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNoZWV0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRTdXJ2ZXlTaGVldHMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcmV2aWV3U2hlZXQoKSB7XG4gICAgICAgIHRoaXMuc2hlZXREaWFsb2cuc2hvdyh0aGlzLnNlbGVjdGVkU2hlZXQpO1xuICAgIH1cblxuICAgIGxvYWRTdXJ2ZXlTaGVldHMoKSB7XG4gICAgICAgIFN1cnZleVNoZWV0Lmxpc3RUZW1wbGF0ZSh0aGlzKS5zdWJzY3JpYmUoc2hlZXRzID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hlZXRzID0gc2hlZXRzO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0iXX0=

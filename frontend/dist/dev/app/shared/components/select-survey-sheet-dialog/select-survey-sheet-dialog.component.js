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
var survey_sheet_model_1 = require("../../../shared/models/elearning/survey-sheet.model");
var SelectSurveySheetDialog = (function (_super) {
    __extends(SelectSurveySheetDialog, _super);
    function SelectSurveySheetDialog() {
        var _this = _super.call(this) || this;
        _this.onSelectSheetReceiver = new Rx_1.Subject();
        _this.onSelectSheet = _this.onSelectSheetReceiver.asObservable();
        _this.display = false;
        _this.sheets = [];
        return _this;
    }
    SelectSurveySheetDialog.prototype.hide = function () {
        this.display = false;
    };
    SelectSurveySheetDialog.prototype.show = function () {
        var _this = this;
        this.display = true;
        survey_sheet_model_1.SurveySheet.listTemplate(this).subscribe(function (sheets) {
            _this.sheets = sheets;
        });
    };
    SelectSurveySheetDialog.prototype.selectSheet = function () {
        this.onSelectSheetReceiver.next(this.selectedSheet);
        this.hide();
    };
    SelectSurveySheetDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'select-survey-sheet-dialog',
            templateUrl: 'select-survey-sheet-dialog.component.html',
            styleUrls: ['select-survey-sheet-dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], SelectSurveySheetDialog);
    return SelectSurveySheetDialog;
}(base_component_1.BaseComponent));
exports.SelectSurveySheetDialog = SelectSurveySheetDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3Qtc3VydmV5LXNoZWV0LWRpYWxvZy9zZWxlY3Qtc3VydmV5LXNoZWV0LWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXlEO0FBQ3pELDhCQUE4QztBQUk5Qyx5REFBdUQ7QUFDdkQsMEZBQWtGO0FBWWxGO0lBQTZDLDJDQUFhO0lBU3pEO1FBQUEsWUFDQyxpQkFBTyxTQUdQO1FBUE8sMkJBQXFCLEdBQWlCLElBQUksWUFBTyxFQUFFLENBQUM7UUFDekQsbUJBQWEsR0FBb0IsS0FBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBSTdFLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDOztJQUNsQixDQUFDO0lBRUQsc0NBQUksR0FBSjtRQUNDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFHRCxzQ0FBSSxHQUFKO1FBQUEsaUJBS0M7UUFKQSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixnQ0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQzlDLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELDZDQUFXLEdBQVg7UUFDQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDYixDQUFDO0lBOUJXLHVCQUF1QjtRQU5uQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSw0QkFBNEI7WUFDdEMsV0FBVyxFQUFFLDJDQUEyQztZQUN4RCxTQUFTLEVBQUUsQ0FBQywwQ0FBMEMsQ0FBQztTQUN2RCxDQUFDOztPQUNXLHVCQUF1QixDQWlDbkM7SUFBRCw4QkFBQztDQWpDRCxBQWlDQyxDQWpDNEMsOEJBQWEsR0FpQ3pEO0FBakNZLDBEQUF1QiIsImZpbGUiOiJhcHAvc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0LXN1cnZleS1zaGVldC1kaWFsb2cvc2VsZWN0LXN1cnZleS1zaGVldC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3VydmV5UXVlc3Rpb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvZWxlYXJuaW5nL3N1cnZleS1xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdXJ2ZXlTaGVldCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1cnZleS1zaGVldC5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgVHJlZVV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvdHJlZS51dGlscyc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ3NlbGVjdC1zdXJ2ZXktc2hlZXQtZGlhbG9nJyxcblx0dGVtcGxhdGVVcmw6ICdzZWxlY3Qtc3VydmV5LXNoZWV0LWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWydzZWxlY3Qtc3VydmV5LXNoZWV0LWRpYWxvZy5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdFN1cnZleVNoZWV0RGlhbG9nIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cblx0cHJpdmF0ZSBzZWxlY3RlZFNoZWV0OiBTdXJ2ZXlTaGVldFtdO1xuXHRwcml2YXRlIHNoZWV0czpTdXJ2ZXlTaGVldFtdO1xuXHRwcml2YXRlIGRpc3BsYXk6IGJvb2xlYW47XG5cblx0cHJpdmF0ZSBvblNlbGVjdFNoZWV0UmVjZWl2ZXI6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgb25TZWxlY3RTaGVldDpPYnNlcnZhYmxlPGFueT4gPSAgdGhpcy5vblNlbGVjdFNoZWV0UmVjZWl2ZXIuYXNPYnNlcnZhYmxlKCk7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLmRpc3BsYXkgPSBmYWxzZTtcblx0XHR0aGlzLnNoZWV0cyA9IFtdO1xuXHR9XG5cblx0aGlkZSgpIHtcblx0XHR0aGlzLmRpc3BsYXkgPSBmYWxzZTtcblx0fVxuXG5cblx0c2hvdygpIHtcblx0XHR0aGlzLmRpc3BsYXkgPSB0cnVlO1xuXHRcdFN1cnZleVNoZWV0Lmxpc3RUZW1wbGF0ZSh0aGlzKS5zdWJzY3JpYmUoc2hlZXRzID0+IHtcblx0XHRcdHRoaXMuc2hlZXRzID0gc2hlZXRzO1xuXHRcdH0pO1xuXHR9XG5cblx0c2VsZWN0U2hlZXQoKSB7XG5cdFx0dGhpcy5vblNlbGVjdFNoZWV0UmVjZWl2ZXIubmV4dCh0aGlzLnNlbGVjdGVkU2hlZXQpO1xuXHRcdHRoaXMuaGlkZSgpO1xuXHR9XG5cblxufVxuXG4iXX0=

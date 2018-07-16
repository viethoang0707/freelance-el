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
var _ = require("underscore");
var excel_service_1 = require("../../../shared/services/excel.service");
var UserExportDialog = (function (_super) {
    __extends(UserExportDialog, _super);
    function UserExportDialog(excelService) {
        var _this = _super.call(this) || this;
        _this.excelService = excelService;
        _this.users = [];
        _this.fields = [
            { value: 'name', label: _this.translateService.instant('Name') },
            { value: 'email', label: _this.translateService.instant('Email') },
            { value: 'login', label: _this.translateService.instant('Login') },
            { value: 'group_code', label: _this.translateService.instant('Group') }
        ];
        _this.display = false;
        return _this;
    }
    UserExportDialog.prototype.show = function (users) {
        this.selectedFields = [];
        this.users = users;
        this.display = true;
    };
    UserExportDialog.prototype.hide = function () {
        this.display = false;
    };
    UserExportDialog.prototype.export = function () {
        var _this = this;
        var data = _.map(this.users, function (user) {
            var userData = {};
            _.each(_this.selectedFields, function (field) {
                userData[field] = user[field];
            });
            return userData;
        });
        this.excelService.exportAsExcelFile(data, 'user_export');
        this.hide();
    };
    UserExportDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-export-dialog',
            templateUrl: 'export-dialog.component.html',
        }),
        __metadata("design:paramtypes", [excel_service_1.ExcelService])
    ], UserExportDialog);
    return UserExportDialog;
}(base_component_1.BaseComponent));
exports.UserExportDialog = UserExportDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hY2NvdW50L3VzZXIvZXhwb3J0LWRpYWxvZy9leHBvcnQtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUQ7QUFLekQsaUZBQStFO0FBRS9FLDhCQUFnQztBQUNoQyx3RUFBc0U7QUFTdEU7SUFBc0Msb0NBQWE7SUFPbEQsMEJBQW9CLFlBQTBCO1FBQTlDLFlBQ0MsaUJBQU8sU0FTUDtRQVZtQixrQkFBWSxHQUFaLFlBQVksQ0FBYztRQUU3QyxLQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixLQUFJLENBQUMsTUFBTSxHQUFHO1lBQ2IsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQy9ELEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNqRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDakUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1NBQ3RFLENBQUM7UUFDRixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs7SUFDdEIsQ0FBQztJQUVELCtCQUFJLEdBQUosVUFBSyxLQUFTO1FBQ2IsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVELCtCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRUosaUNBQU0sR0FBTjtRQUFBLGlCQVVDO1FBVEEsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQUMsSUFBSTtZQUNqQyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsY0FBYyxFQUFFLFVBQUMsS0FBSztnQkFDakMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sUUFBUSxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2IsQ0FBQztJQXZDVyxnQkFBZ0I7UUFMNUIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFdBQVcsRUFBRSw4QkFBOEI7U0FDM0MsQ0FBQzt5Q0FRaUMsNEJBQVk7T0FQbEMsZ0JBQWdCLENBeUM1QjtJQUFELHVCQUFDO0NBekNELEFBeUNDLENBekNxQyw4QkFBYSxHQXlDbEQ7QUF6Q1ksNENBQWdCIiwiZmlsZSI6ImFwcC9hY2NvdW50L3VzZXIvZXhwb3J0LWRpYWxvZy9leHBvcnQtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBFeGNlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvZXhjZWwuc2VydmljZSc7XG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgR1JPVVBfQ0FURUdPUlkgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cyc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ3VzZXItZXhwb3J0LWRpYWxvZycsXG5cdHRlbXBsYXRlVXJsOiAnZXhwb3J0LWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJFeHBvcnREaWFsb2cgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuXHRwcml2YXRlIHVzZXJzOiBVc2VyW107XG5cdHByaXZhdGUgZmllbGRzOiBTZWxlY3RJdGVtW107XG5cdHByaXZhdGUgc2VsZWN0ZWRGaWVsZHM6IHN0cmluZ1tdO1xuXHRwcml2YXRlIGRpc3BsYXk6Ym9vbGVhbjtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGV4Y2VsU2VydmljZTogRXhjZWxTZXJ2aWNlKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnVzZXJzID0gW107XG5cdFx0dGhpcy5maWVsZHMgPSBbXG5cdFx0XHR7IHZhbHVlOiAnbmFtZScsIGxhYmVsOiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnTmFtZScpIH0sXG5cdFx0XHR7IHZhbHVlOiAnZW1haWwnLCBsYWJlbDogdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ0VtYWlsJykgfSxcblx0XHRcdHsgdmFsdWU6ICdsb2dpbicsIGxhYmVsOiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnTG9naW4nKSB9LFxuXHRcdFx0eyB2YWx1ZTogJ2dyb3VwX2NvZGUnLCBsYWJlbDogdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ0dyb3VwJykgfVxuXHRcdF07XG5cdFx0dGhpcy5kaXNwbGF5ID0gZmFsc2U7XG5cdH1cblxuXHRzaG93KHVzZXJzOmFueSkge1xuXHRcdHRoaXMuc2VsZWN0ZWRGaWVsZHMgPSBbXTtcbiAgICAgICAgdGhpcy51c2VycyA9IHVzZXJzO1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSB0cnVlO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuICAgIH1cblxuXHRleHBvcnQoKSB7XG5cdFx0dmFyIGRhdGEgPSBfLm1hcCh0aGlzLnVzZXJzLCAodXNlcik9PiB7XG5cdFx0XHR2YXIgdXNlckRhdGEgPSB7fTtcblx0XHRcdF8uZWFjaCh0aGlzLnNlbGVjdGVkRmllbGRzLCAoZmllbGQpID0+IHtcblx0XHRcdFx0dXNlckRhdGFbZmllbGRdID0gdXNlcltmaWVsZF07XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiB1c2VyRGF0YTtcblx0XHR9KTtcblx0XHR0aGlzLmV4Y2VsU2VydmljZS5leHBvcnRBc0V4Y2VsRmlsZShkYXRhLCAndXNlcl9leHBvcnQnKTtcblx0XHR0aGlzLmhpZGUoKTtcblx0fVxuXG59XG5cbiJdfQ==

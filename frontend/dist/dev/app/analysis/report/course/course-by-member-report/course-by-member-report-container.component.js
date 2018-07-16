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
var base_component_1 = require("../../../../shared/components/base/base.component");
var user_model_1 = require("../../../../shared/models/elearning/user.model");
var constants_1 = require("../../../../shared/models/constants");
var report_decorator_1 = require("../../report.decorator");
var select_group_dialog_component_1 = require("../../../../shared/components/select-group-dialog/select-group-dialog.component");
var select_user_dialog_component_1 = require("../../../../shared/components/select-user-dialog/select-user-dialog.component");
var course_by_member_report_component_1 = require("./course-by-member-report.component");
var CourseByMemberReportContainerComponent = (function (_super) {
    __extends(CourseByMemberReportContainerComponent, _super);
    function CourseByMemberReportContainerComponent() {
        var _this = _super.call(this) || this;
        _this.GROUP_CATEGORY = constants_1.GROUP_CATEGORY;
        return _this;
    }
    CourseByMemberReportContainerComponent.prototype.export = function () {
        this.courseReport.export();
    };
    CourseByMemberReportContainerComponent.prototype.selectUserGroup = function () {
        var _this = this;
        this.groupDialog.show();
        this.groupDialog.onSelectGroup.first().subscribe(function (group) {
            user_model_1.User.listByGroup(_this, group.id).subscribe(function (users) {
                _this.courseReport.clear();
                _this.courseReport.render(users);
            });
        });
    };
    CourseByMemberReportContainerComponent.prototype.selectIndividualUsers = function () {
        var _this = this;
        this.userDialog.show();
        this.userDialog.onSelectUsers.first().subscribe(function (users) {
            _this.courseReport.clear();
            _this.courseReport.render(users);
        });
    };
    __decorate([
        core_1.ViewChild(select_group_dialog_component_1.SelectGroupDialog),
        __metadata("design:type", select_group_dialog_component_1.SelectGroupDialog)
    ], CourseByMemberReportContainerComponent.prototype, "groupDialog", void 0);
    __decorate([
        core_1.ViewChild(select_user_dialog_component_1.SelectUsersDialog),
        __metadata("design:type", select_user_dialog_component_1.SelectUsersDialog)
    ], CourseByMemberReportContainerComponent.prototype, "userDialog", void 0);
    __decorate([
        core_1.ViewChild(course_by_member_report_component_1.CourseByMemberReportComponent),
        __metadata("design:type", course_by_member_report_component_1.CourseByMemberReportComponent)
    ], CourseByMemberReportContainerComponent.prototype, "courseReport", void 0);
    CourseByMemberReportContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-by-member-report-container',
            templateUrl: 'course-by-member-report-container.component.html',
        }),
        report_decorator_1.Report({
            title: 'Course by member report',
            category: constants_1.REPORT_CATEGORY.COURSE
        }),
        __metadata("design:paramtypes", [])
    ], CourseByMemberReportContainerComponent);
    return CourseByMemberReportContainerComponent;
}(base_component_1.BaseComponent));
exports.CourseByMemberReportContainerComponent = CourseByMemberReportContainerComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9yZXBvcnQvY291cnNlL2NvdXJzZS1ieS1tZW1iZXItcmVwb3J0L2NvdXJzZS1ieS1tZW1iZXItcmVwb3J0LWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW1FO0FBTW5FLG9GQUFrRjtBQUNsRiw2RUFBc0U7QUFJdEUsaUVBQTJLO0FBQzNLLDJEQUFnRDtBQUNoRCxpSUFBb0g7QUFDcEgsOEhBQWtIO0FBR2xILHlGQUFvRjtBQVdwRjtJQUE0RCwwREFBYTtJQU9yRTtRQUFBLFlBQ0ksaUJBQU8sU0FDVjtRQUpELG9CQUFjLEdBQUksMEJBQWMsQ0FBQzs7SUFJakMsQ0FBQztJQUVELHVEQUFNLEdBQU47UUFDQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxnRUFBZSxHQUFmO1FBQUEsaUJBVUM7UUFUQSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQVc7WUFFNUQsaUJBQUksQ0FBQyxXQUFXLENBQUMsS0FBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO2dCQUN0QyxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNuQyxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVwQyxDQUFDLENBQUMsQ0FBQztRQUNELENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELHNFQUFxQixHQUFyQjtRQUFBLGlCQU1DO1FBTEEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFZO1lBQy9ELEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakIsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFDRCxDQUFDO0lBL0IwQjtRQUE3QixnQkFBUyxDQUFDLGlEQUFpQixDQUFDO2tDQUFlLGlEQUFpQjsrRUFBQztJQUNoQztRQUE3QixnQkFBUyxDQUFDLGdEQUFpQixDQUFDO2tDQUFjLGdEQUFpQjs4RUFBQztJQUNoQjtRQUF6QyxnQkFBUyxDQUFDLGlFQUE2QixDQUFDO2tDQUFjLGlFQUE2QjtnRkFBQztJQUo1RSxzQ0FBc0M7UUFUbEQsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsbUNBQW1DO1lBQ2hELFdBQVcsRUFBRSxrREFBa0Q7U0FDL0QsQ0FBQztRQUNELHlCQUFNLENBQUM7WUFDSixLQUFLLEVBQUMseUJBQXlCO1lBQy9CLFFBQVEsRUFBQywyQkFBZSxDQUFDLE1BQU07U0FDbEMsQ0FBQzs7T0FDVyxzQ0FBc0MsQ0FtQ2xEO0lBQUQsNkNBQUM7Q0FuQ0QsQUFtQ0MsQ0FuQzJELDhCQUFhLEdBbUN4RTtBQW5DWSx3RkFBc0MiLCJmaWxlIjoiYXBwL2FuYWx5c2lzL3JlcG9ydC9jb3Vyc2UvY291cnNlLWJ5LW1lbWJlci1yZXBvcnQvY291cnNlLWJ5LW1lbWJlci1yZXBvcnQtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVwb3J0VXRpbHMgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvaGVscGVycy9yZXBvcnQudXRpbHMnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VMb2cgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9sb2cubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgRVhQT1JUX0RBVEVUSU1FX0ZPUk1BVCwgUkVQT1JUX0NBVEVHT1JZLCBHUk9VUF9DQVRFR09SWSwgQ09VUlNFX01PREUsIENPVVJTRV9NRU1CRVJfRU5ST0xMX1NUQVRVUywgRVhQT1JUX0RBVEVfRk9STUFUIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBSZXBvcnQgfSBmcm9tICcuLi8uLi9yZXBvcnQuZGVjb3JhdG9yJztcbmltcG9ydCB7IFNlbGVjdEdyb3VwRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0LWdyb3VwLWRpYWxvZy9zZWxlY3QtZ3JvdXAtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWxlY3RVc2Vyc0RpYWxvZyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC11c2VyLWRpYWxvZy9zZWxlY3QtdXNlci1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFRpbWVDb252ZXJ0UGlwZX0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3BpcGVzL3RpbWUucGlwZSc7XG5pbXBvcnQgeyBFeGNlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvZXhjZWwuc2VydmljZSc7XG5pbXBvcnQgeyBDb3Vyc2VCeU1lbWJlclJlcG9ydENvbXBvbmVudCB9IGZyb20gJy4vY291cnNlLWJ5LW1lbWJlci1yZXBvcnQuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2NvdXJzZS1ieS1tZW1iZXItcmVwb3J0LWNvbnRhaW5lcicsXG5cdHRlbXBsYXRlVXJsOiAnY291cnNlLWJ5LW1lbWJlci1yZXBvcnQtY29udGFpbmVyLmNvbXBvbmVudC5odG1sJyxcbn0pXG5AUmVwb3J0KHtcbiAgICB0aXRsZTonQ291cnNlIGJ5IG1lbWJlciByZXBvcnQnLFxuICAgIGNhdGVnb3J5OlJFUE9SVF9DQVRFR09SWS5DT1VSU0Vcbn0pXG5leHBvcnQgY2xhc3MgQ291cnNlQnlNZW1iZXJSZXBvcnRDb250YWluZXJDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50e1xuXG5cdEBWaWV3Q2hpbGQoU2VsZWN0R3JvdXBEaWFsb2cpIGdyb3VwRGlhbG9nIDogU2VsZWN0R3JvdXBEaWFsb2c7XG5cdEBWaWV3Q2hpbGQoU2VsZWN0VXNlcnNEaWFsb2cpIHVzZXJEaWFsb2cgOiBTZWxlY3RVc2Vyc0RpYWxvZztcbiAgICBAVmlld0NoaWxkKENvdXJzZUJ5TWVtYmVyUmVwb3J0Q29tcG9uZW50KSBjb3Vyc2VSZXBvcnQ6Q291cnNlQnlNZW1iZXJSZXBvcnRDb21wb25lbnQ7XG4gICAgR1JPVVBfQ0FURUdPUlkgPSAgR1JPVVBfQ0FURUdPUlk7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZXhwb3J0KCkge1xuICAgIFx0dGhpcy5jb3Vyc2VSZXBvcnQuZXhwb3J0KCk7XG4gICAgfVxuXG4gICAgc2VsZWN0VXNlckdyb3VwKCkge1xuICAgIFx0dGhpcy5ncm91cERpYWxvZy5zaG93KCk7XG4gICAgXHR0aGlzLmdyb3VwRGlhbG9nLm9uU2VsZWN0R3JvdXAuZmlyc3QoKS5zdWJzY3JpYmUoKGdyb3VwOkdyb3VwKSA9PiB7XG4gICAgICAgICAgICBcbiAgICBcdFx0VXNlci5saXN0QnlHcm91cCh0aGlzLCBncm91cC5pZCkuc3Vic2NyaWJlKHVzZXJzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZVJlcG9ydC5jbGVhcigpO1xuICAgIFx0XHRcdHRoaXMuY291cnNlUmVwb3J0LnJlbmRlcih1c2Vycyk7XG4gICAgICAgICAgICAgICAgXG5cdFx0XHR9KTtcdFxuICAgIFx0fSk7XG4gICAgfVxuXG4gICAgc2VsZWN0SW5kaXZpZHVhbFVzZXJzKCkge1xuICAgIFx0dGhpcy51c2VyRGlhbG9nLnNob3coKTtcbiAgICBcdHRoaXMudXNlckRpYWxvZy5vblNlbGVjdFVzZXJzLmZpcnN0KCkuc3Vic2NyaWJlKCh1c2VyczpVc2VyW10pID0+IHtcblx0XHRcdHRoaXMuY291cnNlUmVwb3J0LmNsZWFyKCk7XG4gICAgICAgICAgICB0aGlzLmNvdXJzZVJlcG9ydC5yZW5kZXIodXNlcnMpO1xuXHRcdH0pO1xuICAgIH1cblxufVxuIl19

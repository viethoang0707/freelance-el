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
var course_model_1 = require("../../../../shared/models/elearning/course.model");
var constants_1 = require("../../../../shared/models/constants");
var report_decorator_1 = require("../../report.decorator");
var select_group_dialog_component_1 = require("../../../../shared/components/select-group-dialog/select-group-dialog.component");
var select_course_dialog_component_1 = require("../../../../shared/components/select-course-dialog/select-course-dialog.component");
var member_by_course_report_component_1 = require("./member-by-course-report.component");
var MemberByCourseReportContainerComponent = (function (_super) {
    __extends(MemberByCourseReportContainerComponent, _super);
    function MemberByCourseReportContainerComponent() {
        var _this = _super.call(this) || this;
        _this.GROUP_CATEGORY = constants_1.GROUP_CATEGORY;
        return _this;
    }
    MemberByCourseReportContainerComponent.prototype.export = function () {
        this.memberReport.export();
    };
    MemberByCourseReportContainerComponent.prototype.selectCourseGroup = function () {
        var _this = this;
        this.groupDialog.show();
        this.groupDialog.onSelectGroup.first().subscribe(function (group) {
            course_model_1.Course.listByGroup(_this, group.id).subscribe(function (courses) {
                _this.memberReport.render(courses);
            });
        });
    };
    MemberByCourseReportContainerComponent.prototype.selectIndividualCourses = function () {
        var _this = this;
        this.courseDialog.show();
        this.courseDialog.onSelectCourses.first().subscribe(function (courses) {
            _this.memberReport.render(courses);
        });
    };
    __decorate([
        core_1.ViewChild(select_group_dialog_component_1.SelectGroupDialog),
        __metadata("design:type", select_group_dialog_component_1.SelectGroupDialog)
    ], MemberByCourseReportContainerComponent.prototype, "groupDialog", void 0);
    __decorate([
        core_1.ViewChild(select_course_dialog_component_1.SelectCoursesDialog),
        __metadata("design:type", select_course_dialog_component_1.SelectCoursesDialog)
    ], MemberByCourseReportContainerComponent.prototype, "courseDialog", void 0);
    __decorate([
        core_1.ViewChild(member_by_course_report_component_1.MemberByCourseReportComponent),
        __metadata("design:type", member_by_course_report_component_1.MemberByCourseReportComponent)
    ], MemberByCourseReportContainerComponent.prototype, "memberReport", void 0);
    MemberByCourseReportContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'member-by-course-report-container',
            templateUrl: 'member-by-course-report-container.component.html',
        }),
        report_decorator_1.Report({
            title: 'Member by course report',
            category: constants_1.REPORT_CATEGORY.COURSE
        }),
        __metadata("design:paramtypes", [])
    ], MemberByCourseReportContainerComponent);
    return MemberByCourseReportContainerComponent;
}(base_component_1.BaseComponent));
exports.MemberByCourseReportContainerComponent = MemberByCourseReportContainerComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9yZXBvcnQvY291cnNlL21lbWJlci1ieS1jb3Vyc2UtcmVwb3J0L21lbWJlci1ieS1jb3Vyc2UtcmVwb3J0LWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW1FO0FBTW5FLG9GQUFrRjtBQUVsRixpRkFBMEU7QUFJMUUsaUVBQTJLO0FBQzNLLDJEQUFnRDtBQUNoRCxpSUFBb0g7QUFDcEgsb0lBQXdIO0FBR3hILHlGQUFvRjtBQVdwRjtJQUE0RCwwREFBYTtJQU9yRTtRQUFBLFlBQ0ksaUJBQU8sU0FDVjtRQUpELG9CQUFjLEdBQUcsMEJBQWMsQ0FBQzs7SUFJaEMsQ0FBQztJQUVELHVEQUFNLEdBQU47UUFDQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxrRUFBaUIsR0FBakI7UUFBQSxpQkFTQztRQVJBLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBVztZQUU1RCxxQkFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLE9BQWdCO2dCQUM3RCxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVuQyxDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELHdFQUF1QixHQUF2QjtRQUFBLGlCQUtDO1FBSkgsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQyxPQUFnQjtZQUN2RSxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNELENBQUM7SUE3QjZCO1FBQTdCLGdCQUFTLENBQUMsaURBQWlCLENBQUM7a0NBQWUsaURBQWlCOytFQUFDO0lBQzlCO1FBQS9CLGdCQUFTLENBQUMsb0RBQW1CLENBQUM7a0NBQWdCLG9EQUFtQjtnRkFBQztJQUM1QjtRQUF6QyxnQkFBUyxDQUFDLGlFQUE2QixDQUFDO2tDQUFlLGlFQUE2QjtnRkFBQztJQUoxRSxzQ0FBc0M7UUFUbEQsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsbUNBQW1DO1lBQ2hELFdBQVcsRUFBRSxrREFBa0Q7U0FDL0QsQ0FBQztRQUNELHlCQUFNLENBQUM7WUFDSixLQUFLLEVBQUMseUJBQXlCO1lBQy9CLFFBQVEsRUFBQywyQkFBZSxDQUFDLE1BQU07U0FDbEMsQ0FBQzs7T0FDVyxzQ0FBc0MsQ0FnQ2xEO0lBQUQsNkNBQUM7Q0FoQ0QsQUFnQ0MsQ0FoQzJELDhCQUFhLEdBZ0N4RTtBQWhDWSx3RkFBc0MiLCJmaWxlIjoiYXBwL2FuYWx5c2lzL3JlcG9ydC9jb3Vyc2UvbWVtYmVyLWJ5LWNvdXJzZS1yZXBvcnQvbWVtYmVyLWJ5LWNvdXJzZS1yZXBvcnQtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVwb3J0VXRpbHMgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvaGVscGVycy9yZXBvcnQudXRpbHMnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlTG9nIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvbG9nLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZU1lbWJlciB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IEVYUE9SVF9EQVRFVElNRV9GT1JNQVQsIFJFUE9SVF9DQVRFR09SWSwgR1JPVVBfQ0FURUdPUlksIENPVVJTRV9NT0RFLCBDT1VSU0VfTUVNQkVSX0VOUk9MTF9TVEFUVVMsIEVYUE9SVF9EQVRFX0ZPUk1BVCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgUmVwb3J0IH0gZnJvbSAnLi4vLi4vcmVwb3J0LmRlY29yYXRvcic7XG5pbXBvcnQgeyBTZWxlY3RHcm91cERpYWxvZyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC1ncm91cC1kaWFsb2cvc2VsZWN0LWdyb3VwLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0Q291cnNlc0RpYWxvZyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC1jb3Vyc2UtZGlhbG9nL3NlbGVjdC1jb3Vyc2UtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaW1lQ29udmVydFBpcGV9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9waXBlcy90aW1lLnBpcGUnO1xuaW1wb3J0IHsgRXhjZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2V4Y2VsLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVtYmVyQnlDb3Vyc2VSZXBvcnRDb21wb25lbnQgfSBmcm9tICcuL21lbWJlci1ieS1jb3Vyc2UtcmVwb3J0LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdtZW1iZXItYnktY291cnNlLXJlcG9ydC1jb250YWluZXInLFxuXHR0ZW1wbGF0ZVVybDogJ21lbWJlci1ieS1jb3Vyc2UtcmVwb3J0LWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXG59KVxuQFJlcG9ydCh7XG4gICAgdGl0bGU6J01lbWJlciBieSBjb3Vyc2UgcmVwb3J0JyxcbiAgICBjYXRlZ29yeTpSRVBPUlRfQ0FURUdPUlkuQ09VUlNFXG59KVxuZXhwb3J0IGNsYXNzIE1lbWJlckJ5Q291cnNlUmVwb3J0Q29udGFpbmVyQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudHtcblxuICAgIEBWaWV3Q2hpbGQoU2VsZWN0R3JvdXBEaWFsb2cpIGdyb3VwRGlhbG9nIDogU2VsZWN0R3JvdXBEaWFsb2c7XG4gICAgQFZpZXdDaGlsZChTZWxlY3RDb3Vyc2VzRGlhbG9nKSBjb3Vyc2VEaWFsb2cgOiBTZWxlY3RDb3Vyc2VzRGlhbG9nO1xuXHRAVmlld0NoaWxkKE1lbWJlckJ5Q291cnNlUmVwb3J0Q29tcG9uZW50KSBtZW1iZXJSZXBvcnQ6IE1lbWJlckJ5Q291cnNlUmVwb3J0Q29tcG9uZW50O1xuICAgIEdST1VQX0NBVEVHT1JZID0gR1JPVVBfQ0FURUdPUlk7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZXhwb3J0KCkge1xuICAgIFx0dGhpcy5tZW1iZXJSZXBvcnQuZXhwb3J0KCk7XG4gICAgfVxuXG4gICAgc2VsZWN0Q291cnNlR3JvdXAoKSB7XG4gICAgXHR0aGlzLmdyb3VwRGlhbG9nLnNob3coKTtcbiAgICBcdHRoaXMuZ3JvdXBEaWFsb2cub25TZWxlY3RHcm91cC5maXJzdCgpLnN1YnNjcmliZSgoZ3JvdXA6R3JvdXApID0+IHtcbiAgICAgICAgICAgIFxuICAgIFx0XHRDb3Vyc2UubGlzdEJ5R3JvdXAodGhpcywgZ3JvdXAuaWQpLnN1YnNjcmliZSgoY291cnNlczpDb3Vyc2VbXSkgPT4ge1xuICAgIFx0XHRcdHRoaXMubWVtYmVyUmVwb3J0LnJlbmRlcihjb3Vyc2VzKTtcbiAgICAgICAgICAgICAgICBcbiAgICBcdFx0fSk7XG4gICAgXHR9KTtcbiAgICB9XG5cbiAgICBzZWxlY3RJbmRpdmlkdWFsQ291cnNlcygpIHtcblx0XHR0aGlzLmNvdXJzZURpYWxvZy5zaG93KCk7XG4gICAgXHR0aGlzLmNvdXJzZURpYWxvZy5vblNlbGVjdENvdXJzZXMuZmlyc3QoKS5zdWJzY3JpYmUoKGNvdXJzZXM6Q291cnNlW10pID0+IHtcblx0XHRcdHRoaXMubWVtYmVyUmVwb3J0LnJlbmRlcihjb3Vyc2VzKTtcblx0XHR9KTtcbiAgICB9XG59XG4iXX0=

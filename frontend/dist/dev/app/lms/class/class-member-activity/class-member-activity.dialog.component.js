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
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var course_member_activity_chart_component_1 = require("../../../analysis/chart/course-member-activity-chart/course-member-activity-chart.component");
var ClassMemberActivityDialog = (function (_super) {
    __extends(ClassMemberActivityDialog, _super);
    function ClassMemberActivityDialog() {
        return _super.call(this) || this;
    }
    ClassMemberActivityDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            _this.chart.drawChart(object, 30);
        });
    };
    __decorate([
        core_1.ViewChild(course_member_activity_chart_component_1.CourseMemberActivityChartComponent),
        __metadata("design:type", course_member_activity_chart_component_1.CourseMemberActivityChartComponent)
    ], ClassMemberActivityDialog.prototype, "chart", void 0);
    ClassMemberActivityDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'class-member-activity-dialog',
            templateUrl: 'class-member-activity.dialog.component.html',
            styleUrls: ['class-member-activity.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], ClassMemberActivityDialog);
    return ClassMemberActivityDialog;
}(base_dialog_1.BaseDialog));
exports.ClassMemberActivityDialog = ClassMemberActivityDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvY2xhc3MvY2xhc3MtbWVtYmVyLWFjdGl2aXR5L2NsYXNzLW1lbWJlci1hY3Rpdml0eS5kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFvRTtBQVFwRSwyRUFBeUU7QUFZekUsc0pBQWlKO0FBUWpKO0lBQStDLDZDQUF3QjtJQUt0RTtlQUNDLGlCQUFPO0lBQ1IsQ0FBQztJQUdELDRDQUFRLEdBQVI7UUFBQSxpQkFJQztRQUhBLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUMzQixLQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBWDhDO1FBQTlDLGdCQUFTLENBQUMsMkVBQWtDLENBQUM7a0NBQVEsMkVBQWtDOzREQUFDO0lBSDdFLHlCQUF5QjtRQU5yQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSw4QkFBOEI7WUFDeEMsV0FBVyxFQUFFLDZDQUE2QztZQUMxRCxTQUFTLEVBQUUsQ0FBQyw0Q0FBNEMsQ0FBQztTQUN6RCxDQUFDOztPQUNXLHlCQUF5QixDQWdCckM7SUFBRCxnQ0FBQztDQWhCRCxBQWdCQyxDQWhCOEMsd0JBQVUsR0FnQnhEO0FBaEJZLDhEQUF5QiIsImZpbGUiOiJhcHAvbG1zL2NsYXNzL2NsYXNzLW1lbWJlci1hY3Rpdml0eS9jbGFzcy1tZW1iZXItYWN0aXZpdHkuZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0IHsgQ2VydGlmaWNhdGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtY2VydGlmaWNhdGUubW9kZWwnO1xuaW1wb3J0IHsgQmFzZURpYWxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5kaWFsb2cnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFRyZWVVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3RyZWUudXRpbHMnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBFWEFNX01FTUJFUl9FTlJPTExfU1RBVFVTLCBDT1VSU0VfTUVNQkVSX1JPTEUsIENPVVJTRV9NRU1CRVJfRU5ST0xMX1NUQVRVUyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJztcbmltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBBY2hpdmVtZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvYWNoaWV2ZW1lbnQubW9kZWwnO1xuaW1wb3J0IHsgRXhhbU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IFN1Ym1pc3Npb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdWJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IEV4YW1HcmFkZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tZ3JhZGUubW9kZWwnO1xuaW1wb3J0IHsgRXhjZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2V4Y2VsLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ291cnNlTWVtYmVyQWN0aXZpdHlDaGFydENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2FuYWx5c2lzL2NoYXJ0L2NvdXJzZS1tZW1iZXItYWN0aXZpdHktY2hhcnQvY291cnNlLW1lbWJlci1hY3Rpdml0eS1jaGFydC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdjbGFzcy1tZW1iZXItYWN0aXZpdHktZGlhbG9nJyxcblx0dGVtcGxhdGVVcmw6ICdjbGFzcy1tZW1iZXItYWN0aXZpdHkuZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJ2NsYXNzLW1lbWJlci1hY3Rpdml0eS5kaWFsb2cuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBDbGFzc01lbWJlckFjdGl2aXR5RGlhbG9nIGV4dGVuZHMgQmFzZURpYWxvZzxDb3Vyc2VNZW1iZXI+IHtcblxuXG5cdEBWaWV3Q2hpbGQoQ291cnNlTWVtYmVyQWN0aXZpdHlDaGFydENvbXBvbmVudCkgY2hhcnQ6IENvdXJzZU1lbWJlckFjdGl2aXR5Q2hhcnRDb21wb25lbnQ7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5vblNob3cuc3Vic2NyaWJlKG9iamVjdCA9PiB7XG5cdFx0XHR0aGlzLmNoYXJ0LmRyYXdDaGFydChvYmplY3QsIDMwKTtcblx0XHR9KTtcblx0fVxuXG59XG5cbiJdfQ==

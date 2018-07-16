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
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var project_model_1 = require("../../../shared/models/elearning/project.model");
var project_submission_model_1 = require("../../../shared/models/elearning/project-submission.model");
var project_marking_dialog_component_1 = require("../project-marking/project-marking.dialog.component");
var base_model_1 = require("../../../shared/models/base.model");
var ProjectManageDialog = (function (_super) {
    __extends(ProjectManageDialog, _super);
    function ProjectManageDialog() {
        var _this = _super.call(this) || this;
        _this.PROJECT_STATUS = constants_1.PROJECT_STATUS;
        _this.project = new project_model_1.Project();
        return _this;
    }
    ProjectManageDialog.prototype.show = function (project) {
        var _this = this;
        this.project = project;
        this.display = true;
        base_model_1.BaseModel.bulk_search(this, project_submission_model_1.ProjectSubmission.__api__listByProject(this.project.id), course_member_model_1.CourseMember.__api__listByClass(this.project.class_id))
            .subscribe(function (jsonArr) {
            _this.submits = project_submission_model_1.ProjectSubmission.toArray(jsonArr[0]);
            _this.members = course_member_model_1.CourseMember.toArray(jsonArr[1]);
        });
    };
    ProjectManageDialog.prototype.mark = function () {
        var submit = this.getProjectSubmit(this.selectedMember);
        if (!submit.IsNew)
            this.projectMarkDialog.show(submit);
    };
    ProjectManageDialog.prototype.getProjectSubmit = function (member) {
        return _.find(this.submits, function (submit) {
            return submit.member_id == member.id;
        }) || new project_submission_model_1.ProjectSubmission();
    };
    ProjectManageDialog.prototype.hide = function () {
        this.display = false;
    };
    __decorate([
        core_1.ViewChild(project_marking_dialog_component_1.ProjectMarkingDialog),
        __metadata("design:type", project_marking_dialog_component_1.ProjectMarkingDialog)
    ], ProjectManageDialog.prototype, "projectMarkDialog", void 0);
    ProjectManageDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'project-manage-dialog',
            templateUrl: 'project-manage.dialog.component.html',
            styleUrls: ['project-manage.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], ProjectManageDialog);
    return ProjectManageDialog;
}(base_component_1.BaseComponent));
exports.ProjectManageDialog = ProjectManageDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvY2xhc3MvcHJvamVjdC1tYW5hZ2UvcHJvamVjdC1tYW5hZ2UuZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFJcEUsaUZBQStFO0FBSS9FLDRGQUFvRjtBQUNwRiw4QkFBZ0M7QUFJaEMsOERBRXlDO0FBR3pDLGdGQUF5RTtBQUV6RSxzR0FBOEY7QUFFOUYsd0dBQTJGO0FBSTNGLGdFQUE4RDtBQVU5RDtJQUF5Qyx1Q0FBYTtJQVlyRDtRQUFBLFlBQ0MsaUJBQU8sU0FFUDtRQWJFLG9CQUFjLEdBQUcsMEJBQWMsQ0FBQztRQVlsQyxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksdUJBQU8sRUFBRSxDQUFDOztJQUM5QixDQUFDO0lBRUQsa0NBQUksR0FBSixVQUFLLE9BQWdCO1FBQXJCLGlCQVVDO1FBVE0sSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsc0JBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUN0Qiw0Q0FBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUN2RCxrQ0FBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDdEQsU0FBUyxDQUFDLFVBQUEsT0FBTztZQUNkLEtBQUksQ0FBQyxPQUFPLEdBQUcsNENBQWlCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JELEtBQUksQ0FBQyxPQUFPLEdBQUcsa0NBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsQ0FBQyxDQUFDLENBQUM7SUFDZCxDQUFDO0lBRUQsa0NBQUksR0FBSjtRQUNPLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO1lBQ2IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsOENBQWdCLEdBQWhCLFVBQWlCLE1BQW9CO1FBQ2pDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsTUFBeUI7WUFDbEQsT0FBTyxNQUFNLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDekMsQ0FBQyxDQUFDLElBQUksSUFBSSw0Q0FBaUIsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxrQ0FBSSxHQUFKO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQWpDZ0M7UUFBaEMsZ0JBQVMsQ0FBQyx1REFBb0IsQ0FBQztrQ0FBb0IsdURBQW9CO2tFQUFDO0lBVmhFLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsV0FBVyxFQUFFLHNDQUFzQztZQUNoRCxTQUFTLEVBQUUsQ0FBQyxxQ0FBcUMsQ0FBQztTQUNyRCxDQUFDOztPQUNXLG1CQUFtQixDQTZDL0I7SUFBRCwwQkFBQztDQTdDRCxBQTZDQyxDQTdDd0MsOEJBQWEsR0E2Q3JEO0FBN0NZLGtEQUFtQiIsImZpbGUiOiJhcHAvbG1zL2NsYXNzL3Byb2plY3QtbWFuYWdlL3Byb2plY3QtbWFuYWdlLmRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UubW9kZWwnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlQ2xhc3MgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtY2xhc3MubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgVHJlZVV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvdHJlZS51dGlscyc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IFNlbGVjdEl0ZW0sIE1lbnVJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtcbiAgICBHUk9VUF9DQVRFR09SWSwgUFJPSkVDVF9TVEFUVVNcbn0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBTZWxlY3RVc2Vyc0RpYWxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC11c2VyLWRpYWxvZy9zZWxlY3QtdXNlci1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9wcm9qZWN0Lm1vZGVsJztcbmltcG9ydCB7IEFuc3dlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2Fuc3dlci5tb2RlbCc7XG5pbXBvcnQgeyBQcm9qZWN0U3VibWlzc2lvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3Byb2plY3Qtc3VibWlzc2lvbi5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtUXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLXF1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCB7IFByb2plY3RNYXJraW5nRGlhbG9nIH0gZnJvbSAnLi4vcHJvamVjdC1tYXJraW5nL3Byb2plY3QtbWFya2luZy5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEV4YW1HcmFkZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tZ3JhZGUubW9kZWwnO1xuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IFF1ZXN0aW9uU2hlZXQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9xdWVzdGlvbi1zaGVldC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgUHJvamVjdFJlY29yZCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3Byb2plY3QtcmVjb3JkLm1vZGVsJztcblxuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdwcm9qZWN0LW1hbmFnZS1kaWFsb2cnLFxuXHR0ZW1wbGF0ZVVybDogJ3Byb2plY3QtbWFuYWdlLmRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3Byb2plY3QtbWFuYWdlLmRpYWxvZy5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFByb2plY3RNYW5hZ2VEaWFsb2cgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuICAgIFBST0pFQ1RfU1RBVFVTID0gUFJPSkVDVF9TVEFUVVM7XG4gICAgXG4gICAgcHJpdmF0ZSBkaXNwbGF5OiBib29sZWFuO1xuXHRwcml2YXRlIHByb2plY3Q6IFByb2plY3Q7XG4gICAgcHJpdmF0ZSBzdWJtaXRzOiBQcm9qZWN0U3VibWlzc2lvbltdO1xuICAgIHByaXZhdGUgbWVtYmVyczogQ291cnNlTWVtYmVyW107XG4gICAgcHJpdmF0ZSBzZWxlY3RlZE1lbWJlcjogYW55O1xuICAgIFxuICAgIEBWaWV3Q2hpbGQoUHJvamVjdE1hcmtpbmdEaWFsb2cpIHByb2plY3RNYXJrRGlhbG9nOiBQcm9qZWN0TWFya2luZ0RpYWxvZztcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMucHJvamVjdCA9IG5ldyBQcm9qZWN0KCk7XG5cdH1cblxuXHRzaG93KHByb2plY3Q6IFByb2plY3QpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTtcbiAgICAgICAgQmFzZU1vZGVsLmJ1bGtfc2VhcmNoKHRoaXMsXG4gICAgICAgICAgICBQcm9qZWN0U3VibWlzc2lvbi5fX2FwaV9fbGlzdEJ5UHJvamVjdCh0aGlzLnByb2plY3QuaWQpLFxuICAgICAgICAgICAgQ291cnNlTWVtYmVyLl9fYXBpX19saXN0QnlDbGFzcyh0aGlzLnByb2plY3QuY2xhc3NfaWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShqc29uQXJyID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdHMgPSBQcm9qZWN0U3VibWlzc2lvbi50b0FycmF5KGpzb25BcnJbMF0pO1xuICAgICAgICAgICAgICAgIHRoaXMubWVtYmVycyA9IENvdXJzZU1lbWJlci50b0FycmF5KGpzb25BcnJbMV0pO1xuICAgICAgICAgICAgfSk7XG5cdH1cblxuXHRtYXJrKCkge1xuICAgICAgICB2YXIgc3VibWl0ID0gdGhpcy5nZXRQcm9qZWN0U3VibWl0KHRoaXMuc2VsZWN0ZWRNZW1iZXIpO1xuICAgICAgICBpZiAoIXN1Ym1pdC5Jc05ldylcbiAgICAgICAgICAgIHRoaXMucHJvamVjdE1hcmtEaWFsb2cuc2hvdyhzdWJtaXQpO1xuICAgIH1cblxuICAgIGdldFByb2plY3RTdWJtaXQobWVtYmVyOiBDb3Vyc2VNZW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIF8uZmluZCh0aGlzLnN1Ym1pdHMsIChzdWJtaXQ6IFByb2plY3RTdWJtaXNzaW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3VibWl0Lm1lbWJlcl9pZCA9PSBtZW1iZXIuaWQ7XG4gICAgICAgIH0pIHx8IG5ldyBQcm9qZWN0U3VibWlzc2lvbigpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuICAgIH1cblxufVxuXG4iXX0=

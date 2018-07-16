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
var base_component_1 = require("../../../shared/components/base/base.component");
var project_submission_model_1 = require("../../../shared/models/elearning/project-submission.model");
require("rxjs/add/observable/timer");
var ProjectSubmissionDialog = (function (_super) {
    __extends(ProjectSubmissionDialog, _super);
    function ProjectSubmissionDialog(ngZone) {
        var _this = _super.call(this) || this;
        _this.ngZone = ngZone;
        _this.onConfirmReceiver = new Rx_1.Subject();
        _this.onConfirm = _this.onConfirmReceiver.asObservable();
        _this.display = false;
        _this.submit = new project_submission_model_1.ProjectSubmission();
        return _this;
    }
    ProjectSubmissionDialog.prototype.show = function (project, member) {
        this.display = true;
        this.submit = new project_submission_model_1.ProjectSubmission();
        this.submit.member_id = member.id;
        this.submit.project_id = project.id;
    };
    ProjectSubmissionDialog.prototype.hide = function () {
        this.display = false;
    };
    ProjectSubmissionDialog.prototype.confirm = function () {
        var _this = this;
        if (!this.submit.file_url)
            this.error('You have not submiited any attachment');
        else {
            this.submit.date_submit = new Date();
            this.submit.save(this).subscribe(function () {
                _this.onConfirmReceiver.next();
                _this.hide();
            });
        }
    };
    ProjectSubmissionDialog.prototype.changeFile = function (event) {
        var file = event.files[0];
        this.uploadFile(file);
    };
    ProjectSubmissionDialog.prototype.uploadFile = function (file) {
        var _this = this;
        this.fileApiService.upload(file, this.authService.LoginToken.cloud_id).subscribe(function (data) {
            if (data["result"]) {
                _this.ngZone.run(function () {
                    _this.submit.file_url = data["url"];
                    _this.submit.filename = file.name;
                });
            }
        });
    };
    ProjectSubmissionDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'project-submission-dialog',
            templateUrl: 'project-submission.dialog.component.html',
            styleUrls: ['project-submission.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], ProjectSubmissionDialog);
    return ProjectSubmissionDialog;
}(base_component_1.BaseComponent));
exports.ProjectSubmissionDialog = ProjectSubmissionDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvY2xhc3MvcHJvamVjdC1zdWJtaXQvcHJvamVjdC1zdWJtaXNzaW9uLmRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9IO0FBQ3BILDhCQUE4QztBQUk5QyxpRkFBK0U7QUFLL0Usc0dBQThGO0FBTzlGLHFDQUFtQztBQVVuQztJQUE2QywyQ0FBYTtJQVF0RCxpQ0FBb0IsTUFBYztRQUFsQyxZQUNJLGlCQUFPLFNBR1Y7UUFKbUIsWUFBTSxHQUFOLE1BQU0sQ0FBUTtRQUoxQix1QkFBaUIsR0FBaUIsSUFBSSxZQUFPLEVBQUUsQ0FBQztRQUN4RCxlQUFTLEdBQW9CLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUsvRCxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksNENBQWlCLEVBQUUsQ0FBQzs7SUFDMUMsQ0FBQztJQUVELHNDQUFJLEdBQUosVUFBSyxPQUFnQixFQUFFLE1BQW9CO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSw0Q0FBaUIsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsc0NBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCx5Q0FBTyxHQUFQO1FBQUEsaUJBVUM7UUFURyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQzthQUNuRDtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUM3QixLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzlCLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELDRDQUFVLEdBQVYsVUFBVyxLQUFVO1FBQ2pCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsNENBQVUsR0FBVixVQUFXLElBQUk7UUFBZixpQkFXQztRQVZHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQzVFLFVBQUEsSUFBSTtZQUNBLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNoQixLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztvQkFDWixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ25DLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3JDLENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFyRFEsdUJBQXVCO1FBTm5DLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxXQUFXLEVBQUUsMENBQTBDO1lBQ3ZELFNBQVMsRUFBRSxDQUFDLHlDQUF5QyxDQUFDO1NBQ3pELENBQUM7eUNBUzhCLGFBQU07T0FSekIsdUJBQXVCLENBdURuQztJQUFELDhCQUFDO0NBdkRELEFBdURDLENBdkQ0Qyw4QkFBYSxHQXVEekQ7QUF2RFksMERBQXVCIiwiZmlsZSI6ImFwcC9sbXMvY2xhc3MvcHJvamVjdC1zdWJtaXQvcHJvamVjdC1zdWJtaXNzaW9uLmRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgVmlld0NoaWxkcmVuLCBOZ1pvbmUsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFeGFtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtUXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLXF1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCB7IEFuc3dlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2Fuc3dlci5tb2RlbCc7XG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY2xvdWQvdG9rZW4ubW9kZWwnO1xuaW1wb3J0IHsgUHJvamVjdFN1Ym1pc3Npb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9wcm9qZWN0LXN1Ym1pc3Npb24ubW9kZWwnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3Byb2plY3QubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgUXVlc3Rpb25Db250YWluZXJEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi8uLi9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL3F1ZXN0aW9uLWNvbnRhaW5lci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSVF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vYXNzZXNzbWVudC9xdWVzdGlvbi9xdWVzdGlvbi10ZW1wbGF0ZS9xdWVzdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUXVlc3Rpb25SZWdpc3RlciB9IGZyb20gJy4uLy4uLy4uL2Fzc2Vzc21lbnQvcXVlc3Rpb24vcXVlc3Rpb24tdGVtcGxhdGUvcXVlc3Rpb24uZGVjb3JhdG9yJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS90aW1lcic7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgV2ViY2FtSW1hZ2UgfSBmcm9tICduZ3gtd2ViY2FtJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ3Byb2plY3Qtc3VibWlzc2lvbi1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAncHJvamVjdC1zdWJtaXNzaW9uLmRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3Byb2plY3Qtc3VibWlzc2lvbi5kaWFsb2cuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9qZWN0U3VibWlzc2lvbkRpYWxvZyBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG4gICAgcHJpdmF0ZSBkaXNwbGF5OiBib29sZWFuO1xuICAgIHByaXZhdGUgc3VibWl0OiBQcm9qZWN0U3VibWlzc2lvbjtcbiAgICBwcml2YXRlIG9uQ29uZmlybVJlY2VpdmVyOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuICAgIG9uQ29uZmlybTogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5vbkNvbmZpcm1SZWNlaXZlci5hc09ic2VydmFibGUoKTtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdWJtaXQgPSBuZXcgUHJvamVjdFN1Ym1pc3Npb24oKTtcbiAgICB9XG5cbiAgICBzaG93KHByb2plY3Q6IFByb2plY3QsIG1lbWJlcjogQ291cnNlTWVtYmVyKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IHRydWU7XG4gICAgICAgIHRoaXMuc3VibWl0ID0gbmV3IFByb2plY3RTdWJtaXNzaW9uKCk7XG4gICAgICAgIHRoaXMuc3VibWl0Lm1lbWJlcl9pZCA9IG1lbWJlci5pZDtcbiAgICAgICAgdGhpcy5zdWJtaXQucHJvamVjdF9pZCA9IHByb2plY3QuaWQ7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uZmlybSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN1Ym1pdC5maWxlX3VybClcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoJ1lvdSBoYXZlIG5vdCBzdWJtaWl0ZWQgYW55IGF0dGFjaG1lbnQnKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdC5kYXRlX3N1Ym1pdCA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdC5zYXZlKHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbmZpcm1SZWNlaXZlci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoYW5nZUZpbGUoZXZlbnQ6IGFueSkge1xuICAgICAgICBsZXQgZmlsZSA9IGV2ZW50LmZpbGVzWzBdO1xuICAgICAgICB0aGlzLnVwbG9hZEZpbGUoZmlsZSk7XG4gICAgfVxuXG4gICAgdXBsb2FkRmlsZShmaWxlKSB7XG4gICAgICAgIHRoaXMuZmlsZUFwaVNlcnZpY2UudXBsb2FkKGZpbGUsIHRoaXMuYXV0aFNlcnZpY2UuTG9naW5Ub2tlbi5jbG91ZF9pZCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGFbXCJyZXN1bHRcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0LmZpbGVfdXJsID0gZGF0YVtcInVybFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0LmZpbGVuYW1lID0gZmlsZS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG59XG5cblxuXG4iXX0=

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
var constants_1 = require("../../../shared/models/constants");
var survey_model_1 = require("../../../shared/models/elearning/survey.model");
var survey_dialog_component_1 = require("../survey-dialog/survey-dialog.component");
var enrollment_dialog_component_1 = require("../enrollment-dialog/enrollment-dialog.component");
var SurveyEnrollmentListComponent = (function (_super) {
    __extends(SurveyEnrollmentListComponent, _super);
    function SurveyEnrollmentListComponent() {
        var _this = _super.call(this) || this;
        _this.SURVEY_STATUS = constants_1.SURVEY_STATUS;
        _this.REVIEW_STATE = constants_1.REVIEW_STATE;
        _this.header = {
            left: 'prev, today, next',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
        return _this;
    }
    SurveyEnrollmentListComponent.prototype.enrollSurvey = function () {
        if (this.selectedSurvey) {
            if (this.selectedSurvey.review_state != 'approved') {
                this.warn(this.translateService.instant('Survey not reviewed yet'));
                return;
            }
            if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedSurvey.supervisor_id) {
                this.error('You do not have enroll permission for this survey');
                return;
            }
            this.surveyEnrollDialog.enroll(this.selectedSurvey);
        }
    };
    SurveyEnrollmentListComponent.prototype.ngOnInit = function () {
        var _this = this;
        survey_model_1.Survey.allForEnrollPublic(this).subscribe(function (surveys) {
            _this.surveys = surveys;
        });
    };
    SurveyEnrollmentListComponent.prototype.closeSurvey = function () {
        var _this = this;
        if (this.selectedSurvey) {
            if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedSurvey.supervisor_id) {
                this.error('You do not have close permission for this survey');
                return;
            }
            this.confirm('Are you sure to proceed ?', function () {
                _this.selectedSurvey.close(_this).subscribe(function () {
                    _this.selectedSurvey.status = 'closed';
                    _this.success('Survey close');
                });
            });
        }
    };
    SurveyEnrollmentListComponent.prototype.openSurvey = function () {
        var _this = this;
        if (this.selectedSurvey) {
            if (this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedSurvey.supervisor_id) {
                this.error('You do not have open permission for this survey');
                return;
            }
            this.confirm('Are you sure to proceed ?. You will not be able to enroll new members after the survey is opened', function () {
                _this.selectedSurvey.open(_this).subscribe(function () {
                    _this.selectedSurvey.status = 'open';
                    _this.success('Survey open');
                });
            });
        }
    };
    __decorate([
        core_1.ViewChild(survey_dialog_component_1.SurveyDialog),
        __metadata("design:type", survey_dialog_component_1.SurveyDialog)
    ], SurveyEnrollmentListComponent.prototype, "surveyDialog", void 0);
    __decorate([
        core_1.ViewChild(enrollment_dialog_component_1.SurveyEnrollDialog),
        __metadata("design:type", enrollment_dialog_component_1.SurveyEnrollDialog)
    ], SurveyEnrollmentListComponent.prototype, "surveyEnrollDialog", void 0);
    SurveyEnrollmentListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'survey-enrollment-list',
            templateUrl: 'survey-enrollment-list.component.html',
            styleUrls: ['survey-enrollment-list.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], SurveyEnrollmentListComponent);
    return SurveyEnrollmentListComponent;
}(base_component_1.BaseComponent));
exports.SurveyEnrollmentListComponent = SurveyEnrollmentListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L3N1cnZleS9zdXJ2ZXktZW5yb2xsbWVudC1saXN0L3N1cnZleS1lbnJvbGxtZW50LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFvRTtBQUVwRSxpRkFBK0U7QUFJL0UsOERBQThGO0FBQzlGLDhFQUF1RTtBQUV2RSxvRkFBd0U7QUFDeEUsZ0dBQXNGO0FBVXRGO0lBQW1ELGlEQUFhO0lBYTVEO1FBQUEsWUFDSSxpQkFBTyxTQU1WO1FBbEJELG1CQUFhLEdBQUcseUJBQWEsQ0FBQztRQUM5QixrQkFBWSxHQUFHLHdCQUFZLENBQUM7UUFZeEIsS0FBSSxDQUFDLE1BQU0sR0FBRztZQUNWLElBQUksRUFBRSxtQkFBbUI7WUFDekIsTUFBTSxFQUFFLE9BQU87WUFDZixLQUFLLEVBQUUsNEJBQTRCO1NBQ3RDLENBQUM7O0lBQ04sQ0FBQztJQUVELG9EQUFZLEdBQVo7UUFDSSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckIsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksSUFBSSxVQUFVLEVBQUU7Z0JBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLE9BQU87YUFDVjtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRTtnQkFDNUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO2dCQUNoRSxPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUN2RDtJQUNMLENBQUM7SUFFRCxnREFBUSxHQUFSO1FBQUEsaUJBSUM7UUFIRyxxQkFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87WUFDN0MsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBR0QsbURBQVcsR0FBWDtRQUFBLGlCQWFDO1FBWkcsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRTtnQkFDNUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO2dCQUMvRCxPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLDJCQUEyQixFQUFFO2dCQUN0QyxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7b0JBQ3RDLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztvQkFDdEMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDakMsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELGtEQUFVLEdBQVY7UUFBQSxpQkFjQztRQWJHLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyQixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFO2dCQUMzRixJQUFJLENBQUMsS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7Z0JBQzlELE9BQU87YUFDVjtZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsa0dBQWtHLEVBQUU7Z0JBQzdHLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztvQkFDckMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO29CQUNwQyxLQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNoQyxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1NBRU47SUFDTCxDQUFDO0lBOUR3QjtRQUF4QixnQkFBUyxDQUFDLHNDQUFZLENBQUM7a0NBQWUsc0NBQVk7dUVBQUM7SUFDckI7UUFBOUIsZ0JBQVMsQ0FBQyxnREFBa0IsQ0FBQztrQ0FBcUIsZ0RBQWtCOzZFQUFDO0lBWDdELDZCQUE2QjtRQU56QyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsV0FBVyxFQUFFLHVDQUF1QztZQUNwRCxTQUFTLEVBQUUsQ0FBQyxzQ0FBc0MsQ0FBQztTQUN0RCxDQUFDOztPQUNXLDZCQUE2QixDQXlFekM7SUFBRCxvQ0FBQztDQXpFRCxBQXlFQyxDQXpFa0QsOEJBQWEsR0F5RS9EO0FBekVZLHNFQUE2QiIsImZpbGUiOiJhcHAvYXNzZXNzbWVudC9zdXJ2ZXkvc3VydmV5LWVucm9sbG1lbnQtbGlzdC9zdXJ2ZXktZW5yb2xsbWVudC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBHUk9VUF9DQVRFR09SWSwgU1VSVkVZX1NUQVRVUywgUkVWSUVXX1NUQVRFIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBTdXJ2ZXkgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXkubW9kZWwnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBTdXJ2ZXlEaWFsb2cgfSBmcm9tICcuLi9zdXJ2ZXktZGlhbG9nL3N1cnZleS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFN1cnZleUVucm9sbERpYWxvZyB9IGZyb20gJy4uL2Vucm9sbG1lbnQtZGlhbG9nL2Vucm9sbG1lbnQtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnc3VydmV5LWVucm9sbG1lbnQtbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICdzdXJ2ZXktZW5yb2xsbWVudC1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnc3VydmV5LWVucm9sbG1lbnQtbGlzdC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFN1cnZleUVucm9sbG1lbnRMaXN0Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cbiAgICBTVVJWRVlfU1RBVFVTID0gU1VSVkVZX1NUQVRVUztcbiAgICBSRVZJRVdfU1RBVEUgPSBSRVZJRVdfU1RBVEU7XG5cbiAgICBwcml2YXRlIHNlbGVjdGVkU3VydmV5OiBTdXJ2ZXk7XG4gICAgcHJpdmF0ZSBzdXJ2ZXlzOiBTdXJ2ZXlbXTtcbiAgICBwcml2YXRlIGV2ZW50czogYW55W107XG4gICAgcHJpdmF0ZSBoZWFkZXI6IGFueTtcblxuICAgIEBWaWV3Q2hpbGQoU3VydmV5RGlhbG9nKSBzdXJ2ZXlEaWFsb2c6IFN1cnZleURpYWxvZztcbiAgICBAVmlld0NoaWxkKFN1cnZleUVucm9sbERpYWxvZykgc3VydmV5RW5yb2xsRGlhbG9nOiBTdXJ2ZXlFbnJvbGxEaWFsb2c7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSB7XG4gICAgICAgICAgICBsZWZ0OiAncHJldiwgdG9kYXksIG5leHQnLFxuICAgICAgICAgICAgY2VudGVyOiAndGl0bGUnLFxuICAgICAgICAgICAgcmlnaHQ6ICdtb250aCxhZ2VuZGFXZWVrLGFnZW5kYURheSdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBlbnJvbGxTdXJ2ZXkoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkU3VydmV5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFN1cnZleS5yZXZpZXdfc3RhdGUgIT0gJ2FwcHJvdmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMud2Fybih0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnU3VydmV5IG5vdCByZXZpZXdlZCB5ZXQnKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLkNvbnRleHRVc2VyLklzU3VwZXJBZG1pbiAmJiB0aGlzLkNvbnRleHRVc2VyLmlkICE9IHRoaXMuc2VsZWN0ZWRTdXJ2ZXkuc3VwZXJ2aXNvcl9pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IoJ1lvdSBkbyBub3QgaGF2ZSBlbnJvbGwgcGVybWlzc2lvbiBmb3IgdGhpcyBzdXJ2ZXknKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN1cnZleUVucm9sbERpYWxvZy5lbnJvbGwodGhpcy5zZWxlY3RlZFN1cnZleSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgU3VydmV5LmFsbEZvckVucm9sbFB1YmxpYyh0aGlzKS5zdWJzY3JpYmUoc3VydmV5cyA9PiB7XG4gICAgICAgICAgICB0aGlzLnN1cnZleXMgPSBzdXJ2ZXlzO1xuICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgY2xvc2VTdXJ2ZXkoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkU3VydmV5KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuQ29udGV4dFVzZXIuSXNTdXBlckFkbWluICYmIHRoaXMuQ29udGV4dFVzZXIuaWQgIT0gdGhpcy5zZWxlY3RlZFN1cnZleS5zdXBlcnZpc29yX2lkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvcignWW91IGRvIG5vdCBoYXZlIGNsb3NlIHBlcm1pc3Npb24gZm9yIHRoaXMgc3VydmV5Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb25maXJtKCdBcmUgeW91IHN1cmUgdG8gcHJvY2VlZCA/JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTdXJ2ZXkuY2xvc2UodGhpcykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFN1cnZleS5zdGF0dXMgPSAnY2xvc2VkJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzKCdTdXJ2ZXkgY2xvc2UnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3BlblN1cnZleSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRTdXJ2ZXkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLkNvbnRleHRVc2VyLklzU3VwZXJBZG1pbiAmJiB0aGlzLkNvbnRleHRVc2VyLmlkICE9IHRoaXMuc2VsZWN0ZWRTdXJ2ZXkuc3VwZXJ2aXNvcl9pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IoJ1lvdSBkbyBub3QgaGF2ZSBvcGVuIHBlcm1pc3Npb24gZm9yIHRoaXMgc3VydmV5Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb25maXJtKCdBcmUgeW91IHN1cmUgdG8gcHJvY2VlZCA/LiBZb3Ugd2lsbCBub3QgYmUgYWJsZSB0byBlbnJvbGwgbmV3IG1lbWJlcnMgYWZ0ZXIgdGhlIHN1cnZleSBpcyBvcGVuZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFN1cnZleS5vcGVuKHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTdXJ2ZXkuc3RhdHVzID0gJ29wZW4nO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3MoJ1N1cnZleSBvcGVuJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgfVxufSJdfQ==

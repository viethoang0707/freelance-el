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
var SurveyListComponent = (function (_super) {
    __extends(SurveyListComponent, _super);
    function SurveyListComponent() {
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
    SurveyListComponent.prototype.ngOnInit = function () {
        this.loadSurveys();
    };
    SurveyListComponent.prototype.addSurvey = function () {
        var _this = this;
        var survey = new survey_model_1.Survey();
        survey.is_public = true;
        this.surveyDialog.show(survey);
        this.surveyDialog.onCreateComplete.subscribe(function () {
            _this.loadSurveys();
        });
    };
    SurveyListComponent.prototype.editSurvey = function () {
        if (!this.ContextUser.IsSuperAdmin || this.ContextUser.id != this.selectedSurvey.supervisor_id) {
            this.error(this.translateService.instant('You do not have edit permission for this survey'));
            return;
        }
        this.surveyDialog.show(this.selectedSurvey);
    };
    SurveyListComponent.prototype.deleteSurvey = function () {
        var _this = this;
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedSurvey.supervisor_id) {
            this.error(this.translateService.instant('You do not have delete permission for this survey'));
            return;
        }
        this.confirm(this.translateService.instant('Are you sure to delete?'), function () {
            _this.selectedSurvey.delete(_this).subscribe(function () {
                _this.loadSurveys();
                _this.selectedSurvey = null;
            });
        });
    };
    SurveyListComponent.prototype.loadSurveys = function () {
        var _this = this;
        survey_model_1.Survey.listPublicSurvey(this).subscribe(function (surveys) {
            _this.surveys = surveys;
            _this.surveys.sort(function (s1, s2) {
                return (s1.id < s2.id);
            });
        });
    };
    SurveyListComponent.prototype.requestReview = function () {
        var _this = this;
        if (this.ContextUser.id != this.selectedSurvey.supervisor_id) {
            this.error(this.translateService.instant('You do not have submit-review permission for this survey'));
            return;
        }
        this.workflowService.createSurveyReviewTicket(this, this.selectedSurvey).subscribe(function () {
            _this.success(_this.translateService.instant('Request submitted'));
            _this.selectedSurvey.refresh(_this).subscribe();
        });
    };
    __decorate([
        core_1.ViewChild(survey_dialog_component_1.SurveyDialog),
        __metadata("design:type", survey_dialog_component_1.SurveyDialog)
    ], SurveyListComponent.prototype, "surveyDialog", void 0);
    __decorate([
        core_1.ViewChild(enrollment_dialog_component_1.SurveyEnrollDialog),
        __metadata("design:type", enrollment_dialog_component_1.SurveyEnrollDialog)
    ], SurveyListComponent.prototype, "surveyEnrollDialog", void 0);
    SurveyListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'survey-list',
            templateUrl: 'survey-list.component.html',
            styleUrls: ['survey-list.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], SurveyListComponent);
    return SurveyListComponent;
}(base_component_1.BaseComponent));
exports.SurveyListComponent = SurveyListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L3N1cnZleS9zdXJ2ZXktbGlzdC9zdXJ2ZXktbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBRXBFLGlGQUErRTtBQUkvRSw4REFBOEY7QUFDOUYsOEVBQXVFO0FBRXZFLG9GQUF3RTtBQUN4RSxnR0FBc0Y7QUFVdEY7SUFBeUMsdUNBQWE7SUFhbEQ7UUFBQSxZQUNJLGlCQUFPLFNBTVY7UUFsQkQsbUJBQWEsR0FBRyx5QkFBYSxDQUFDO1FBQzlCLGtCQUFZLEdBQUcsd0JBQVksQ0FBQztRQVl4QixLQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixNQUFNLEVBQUUsT0FBTztZQUNmLEtBQUssRUFBRSw0QkFBNEI7U0FDdEMsQ0FBQzs7SUFDTixDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBR0QsdUNBQVMsR0FBVDtRQUFBLGlCQU9DO1FBTkcsSUFBSSxNQUFNLEdBQUcsSUFBSSxxQkFBTSxFQUFFLENBQUM7UUFDMUIsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7WUFDekMsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHdDQUFVLEdBQVY7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUU7WUFDNUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLGlEQUFpRCxDQUFDLENBQUMsQ0FBQztZQUM3RixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELDBDQUFZLEdBQVo7UUFBQSxpQkFXQztRQVZHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRTtZQUM1RixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsbURBQW1ELENBQUMsQ0FBQyxDQUFDO1lBQy9GLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO1lBQ25FLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDdkMsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNuQixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHlDQUFXLEdBQVg7UUFBQSxpQkFPQztRQU5HLHFCQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsT0FBTztZQUMzQyxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUN2QixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFDLEVBQUUsRUFBRSxFQUFFO2dCQUNyQixPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwyQ0FBYSxHQUFiO1FBQUEsaUJBU0M7UUFSRyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFO1lBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQywwREFBMEQsQ0FBQyxDQUFDLENBQUM7WUFDdEcsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUMvRSxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWpFd0I7UUFBeEIsZ0JBQVMsQ0FBQyxzQ0FBWSxDQUFDO2tDQUFlLHNDQUFZOzZEQUFDO0lBQ3JCO1FBQTlCLGdCQUFTLENBQUMsZ0RBQWtCLENBQUM7a0NBQXFCLGdEQUFrQjttRUFBQztJQVg3RCxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1NBQzNDLENBQUM7O09BQ1csbUJBQW1CLENBNEUvQjtJQUFELDBCQUFDO0NBNUVELEFBNEVDLENBNUV3Qyw4QkFBYSxHQTRFckQ7QUE1RVksa0RBQW1CIiwiZmlsZSI6ImFwcC9hc3Nlc3NtZW50L3N1cnZleS9zdXJ2ZXktbGlzdC9zdXJ2ZXktbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgR1JPVVBfQ0FURUdPUlksIFNVUlZFWV9TVEFUVVMsIFJFVklFV19TVEFURSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgU3VydmV5IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VydmV5Lm1vZGVsJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgU3VydmV5RGlhbG9nIH0gZnJvbSAnLi4vc3VydmV5LWRpYWxvZy9zdXJ2ZXktZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdXJ2ZXlFbnJvbGxEaWFsb2cgfSBmcm9tICcuLi9lbnJvbGxtZW50LWRpYWxvZy9lbnJvbGxtZW50LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ3N1cnZleS1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3N1cnZleS1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnc3VydmV5LWxpc3QuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlMaXN0Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cbiAgICBTVVJWRVlfU1RBVFVTID0gU1VSVkVZX1NUQVRVUztcbiAgICBSRVZJRVdfU1RBVEUgPSBSRVZJRVdfU1RBVEU7XG5cbiAgICBwcml2YXRlIHNlbGVjdGVkU3VydmV5OiBTdXJ2ZXk7XG4gICAgcHJpdmF0ZSBzdXJ2ZXlzOiBTdXJ2ZXlbXTtcbiAgICBwcml2YXRlIGV2ZW50czogYW55W107XG4gICAgcHJpdmF0ZSBoZWFkZXI6IGFueTtcblxuICAgIEBWaWV3Q2hpbGQoU3VydmV5RGlhbG9nKSBzdXJ2ZXlEaWFsb2c6IFN1cnZleURpYWxvZztcbiAgICBAVmlld0NoaWxkKFN1cnZleUVucm9sbERpYWxvZykgc3VydmV5RW5yb2xsRGlhbG9nOiBTdXJ2ZXlFbnJvbGxEaWFsb2c7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSB7XG4gICAgICAgICAgICBsZWZ0OiAncHJldiwgdG9kYXksIG5leHQnLFxuICAgICAgICAgICAgY2VudGVyOiAndGl0bGUnLFxuICAgICAgICAgICAgcmlnaHQ6ICdtb250aCxhZ2VuZGFXZWVrLGFnZW5kYURheSdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5sb2FkU3VydmV5cygpO1xuICAgIH1cblxuXG4gICAgYWRkU3VydmV5KCkge1xuICAgICAgICB2YXIgc3VydmV5ID0gbmV3IFN1cnZleSgpO1xuICAgICAgICBzdXJ2ZXkuaXNfcHVibGljID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zdXJ2ZXlEaWFsb2cuc2hvdyhzdXJ2ZXkpO1xuICAgICAgICB0aGlzLnN1cnZleURpYWxvZy5vbkNyZWF0ZUNvbXBsZXRlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRTdXJ2ZXlzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGVkaXRTdXJ2ZXkoKSB7XG4gICAgICAgIGlmICghdGhpcy5Db250ZXh0VXNlci5Jc1N1cGVyQWRtaW4gfHwgdGhpcy5Db250ZXh0VXNlci5pZCAhPSB0aGlzLnNlbGVjdGVkU3VydmV5LnN1cGVydmlzb3JfaWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IodGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ1lvdSBkbyBub3QgaGF2ZSBlZGl0IHBlcm1pc3Npb24gZm9yIHRoaXMgc3VydmV5JykpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3VydmV5RGlhbG9nLnNob3codGhpcy5zZWxlY3RlZFN1cnZleSk7XG4gICAgfVxuXG4gICAgZGVsZXRlU3VydmV5KCkge1xuICAgICAgICBpZiAoIXRoaXMuQ29udGV4dFVzZXIuSXNTdXBlckFkbWluICYmIHRoaXMuQ29udGV4dFVzZXIuaWQgIT0gdGhpcy5zZWxlY3RlZFN1cnZleS5zdXBlcnZpc29yX2lkKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdZb3UgZG8gbm90IGhhdmUgZGVsZXRlIHBlcm1pc3Npb24gZm9yIHRoaXMgc3VydmV5JykpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29uZmlybSh0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnQXJlIHlvdSBzdXJlIHRvIGRlbGV0ZT8nKSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFN1cnZleS5kZWxldGUodGhpcykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRTdXJ2ZXlzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFN1cnZleSA9IG51bGw7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkU3VydmV5cygpIHtcbiAgICAgICAgU3VydmV5Lmxpc3RQdWJsaWNTdXJ2ZXkodGhpcykuc3Vic2NyaWJlKHN1cnZleXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdXJ2ZXlzID0gc3VydmV5cztcbiAgICAgICAgICAgIHRoaXMuc3VydmV5cy5zb3J0KChzMSwgczIpOiBhbnkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAoczEuaWQgPCBzMi5pZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVxdWVzdFJldmlldygpIHtcbiAgICAgICAgaWYgKHRoaXMuQ29udGV4dFVzZXIuaWQgIT0gdGhpcy5zZWxlY3RlZFN1cnZleS5zdXBlcnZpc29yX2lkKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdZb3UgZG8gbm90IGhhdmUgc3VibWl0LXJldmlldyBwZXJtaXNzaW9uIGZvciB0aGlzIHN1cnZleScpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndvcmtmbG93U2VydmljZS5jcmVhdGVTdXJ2ZXlSZXZpZXdUaWNrZXQodGhpcywgdGhpcy5zZWxlY3RlZFN1cnZleSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3VjY2Vzcyh0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnUmVxdWVzdCBzdWJtaXR0ZWQnKSk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkU3VydmV5LnJlZnJlc2godGhpcykuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0iXX0=

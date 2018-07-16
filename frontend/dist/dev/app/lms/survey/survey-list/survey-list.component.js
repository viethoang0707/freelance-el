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
var constants_1 = require("../../../shared/models/constants");
var survey_content_dialog_component_1 = require("../../../cms/survey/content-dialog/survey-content.dialog.component");
var survey_study_dialog_component_1 = require("../survey-study/survey-study.dialog.component");
var report_utils_1 = require("../../../shared/helpers/report.utils");
var router_1 = require("@angular/router");
var SurveyListComponent = (function (_super) {
    __extends(SurveyListComponent, _super);
    function SurveyListComponent(router) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.SURVEY_STATUS = constants_1.SURVEY_STATUS;
        _this.surveys = [];
        _this.reportUtils = new report_utils_1.ReportUtils();
        return _this;
    }
    SurveyListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.lmsProfileService.init(this).subscribe(function () {
            var surveys = _this.lmsProfileService.MySurveys;
            _this.displaySurveys(surveys);
        });
    };
    SurveyListComponent.prototype.displaySurveys = function (surveys) {
        var _this = this;
        _.each(surveys, function (survey) {
            survey['candidate'] = _this.lmsProfileService.getSurveyMemberByRole('candidate', survey.id);
            survey['editor'] = _this.lmsProfileService.getSurveyMemberByRole('editor', survey.id);
            survey['supervisor'] = _this.lmsProfileService.getSurveyMemberByRole('supervisor', survey.id);
            if (survey['supervisor'])
                survey['editor'] = survey['supervisor'];
        });
        surveys.sort(function (survey1, survey2) {
            return _this.lmsProfileService.getLastSurveyTimestamp(survey2) - _this.lmsProfileService.getLastSurveyTimestamp(survey1);
        });
        this.surveys = surveys;
    };
    SurveyListComponent.prototype.editContent = function (survey) {
        this.surveyContentDialog.show(survey);
    };
    SurveyListComponent.prototype.startSurvey = function (survey, member) {
        var _this = this;
        this.confirmationService.confirm({
            message: this.translateService.instant('Are you sure to start?'),
            accept: function () {
                _this.surveyStudyDialog.show(survey, member);
            }
        });
    };
    SurveyListComponent.prototype.publishSurvey = function (survey) {
        survey.sheet_status = 'published';
        survey.save(this).subscribe();
    };
    SurveyListComponent.prototype.unpublishSurvey = function (survey) {
        survey.sheet_status = 'unpublished';
        survey.save(this).subscribe();
    };
    __decorate([
        core_1.ViewChild(survey_content_dialog_component_1.SurveyContentDialog),
        __metadata("design:type", survey_content_dialog_component_1.SurveyContentDialog)
    ], SurveyListComponent.prototype, "surveyContentDialog", void 0);
    __decorate([
        core_1.ViewChild(survey_study_dialog_component_1.SurveyStudyDialog),
        __metadata("design:type", survey_study_dialog_component_1.SurveyStudyDialog)
    ], SurveyListComponent.prototype, "surveyStudyDialog", void 0);
    SurveyListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'lms-survey-list',
            templateUrl: 'survey-list.component.html',
            styleUrls: ['survey-list.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], SurveyListComponent);
    return SurveyListComponent;
}(base_component_1.BaseComponent));
exports.SurveyListComponent = SurveyListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvc3VydmV5L3N1cnZleS1saXN0L3N1cnZleS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFFcEUsaUZBQStFO0FBRS9FLDhCQUFnQztBQUNoQyw4REFBZ0Y7QUFPaEYsc0hBQXlHO0FBQ3pHLCtGQUFrRjtBQUNsRixxRUFBbUU7QUFDbkUsMENBQWdEO0FBV2hEO0lBQXlDLHVDQUFhO0lBV2xELDZCQUFvQixNQUFjO1FBQWxDLFlBQ0ksaUJBQU8sU0FHVjtRQUptQixZQUFNLEdBQU4sTUFBTSxDQUFRO1FBVGxDLG1CQUFhLEdBQUcseUJBQWEsQ0FBQztRQVcxQixLQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQVcsRUFBRSxDQUFDOztJQUN6QyxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUFBLGlCQUtDO1FBSkcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDeEMsSUFBSSxPQUFPLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQztZQUMvQyxLQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDRDQUFjLEdBQWQsVUFBZSxPQUFpQjtRQUFoQyxpQkFZQztRQVhHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsTUFBYTtZQUMxQixNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUksS0FBSSxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUYsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFJLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RGLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBSSxLQUFJLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5RixJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBSSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUMsT0FBZSxFQUFFLE9BQWU7WUFDMUMsT0FBTyxLQUFJLENBQUMsaUJBQWlCLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUVELHlDQUFXLEdBQVgsVUFBWSxNQUFjO1FBQ3RCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELHlDQUFXLEdBQVgsVUFBWSxNQUFjLEVBQUUsTUFBb0I7UUFBaEQsaUJBT0M7UUFORyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDO1lBQzdCLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDO1lBQ2hFLE1BQU0sRUFBRTtnQkFDSixLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNoRCxDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDJDQUFhLEdBQWIsVUFBYyxNQUFhO1FBQ3ZCLE1BQU0sQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELDZDQUFlLEdBQWYsVUFBZ0IsTUFBYTtRQUN6QixNQUFNLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQztRQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFuRCtCO1FBQS9CLGdCQUFTLENBQUMscURBQW1CLENBQUM7a0NBQXNCLHFEQUFtQjtvRUFBQztJQUMzQztRQUE3QixnQkFBUyxDQUFDLGlEQUFpQixDQUFDO2tDQUFvQixpREFBaUI7a0VBQUM7SUFUMUQsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1NBQzNDLENBQUM7eUNBWThCLGVBQU07T0FYekIsbUJBQW1CLENBNkQvQjtJQUFELDBCQUFDO0NBN0RELEFBNkRDLENBN0R3Qyw4QkFBYSxHQTZEckQ7QUE3RFksa0RBQW1CIiwiZmlsZSI6ImFwcC9sbXMvc3VydmV5L3N1cnZleS1saXN0L3N1cnZleS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgR1JPVVBfQ0FURUdPUlksIFNVUlZFWV9TVEFUVVMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IFN1cnZleSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1cnZleS5tb2RlbCc7XG5pbXBvcnQgeyBTdXJ2ZXlNZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXktbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IFN1cnZleVF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VydmV5LXF1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgU3VydmV5U3VibWlzc2lvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1cnZleS1zdWJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBTdXJ2ZXlDb250ZW50RGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vY21zL3N1cnZleS9jb250ZW50LWRpYWxvZy9zdXJ2ZXktY29udGVudC5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFN1cnZleVN0dWR5RGlhbG9nIH0gZnJvbSAnLi4vc3VydmV5LXN0dWR5L3N1cnZleS1zdHVkeS5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFJlcG9ydFV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvcmVwb3J0LnV0aWxzJztcbmltcG9ydCB7IFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnbG1zLXN1cnZleS1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3N1cnZleS1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnc3VydmV5LWxpc3QuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlMaXN0Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBTVVJWRVlfU1RBVFVTID0gU1VSVkVZX1NUQVRVUztcblxuICAgIHByaXZhdGUgc3VydmV5czogU3VydmV5W107XG4gICAgcHJpdmF0ZSBzdWJtaXRzOiBTdXJ2ZXlTdWJtaXNzaW9uW107XG4gICAgcHJpdmF0ZSByZXBvcnRVdGlsczogUmVwb3J0VXRpbHM7XG5cbiAgICBAVmlld0NoaWxkKFN1cnZleUNvbnRlbnREaWFsb2cpIHN1cnZleUNvbnRlbnREaWFsb2c6IFN1cnZleUNvbnRlbnREaWFsb2c7XG4gICAgQFZpZXdDaGlsZChTdXJ2ZXlTdHVkeURpYWxvZykgc3VydmV5U3R1ZHlEaWFsb2c6IFN1cnZleVN0dWR5RGlhbG9nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnN1cnZleXMgPSBbXTtcbiAgICAgICAgdGhpcy5yZXBvcnRVdGlscyA9IG5ldyBSZXBvcnRVdGlscygpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmluaXQodGhpcykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHZhciBzdXJ2ZXlzID0gdGhpcy5sbXNQcm9maWxlU2VydmljZS5NeVN1cnZleXM7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlTdXJ2ZXlzKHN1cnZleXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkaXNwbGF5U3VydmV5cyhzdXJ2ZXlzOiBTdXJ2ZXlbXSkge1xuICAgICAgICBfLmVhY2goc3VydmV5cywgKHN1cnZleTpTdXJ2ZXkpPT4ge1xuICAgICAgICAgICAgc3VydmV5WydjYW5kaWRhdGUnXSA9ICB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmdldFN1cnZleU1lbWJlckJ5Um9sZSgnY2FuZGlkYXRlJywgc3VydmV5LmlkKTtcbiAgICAgICAgICAgIHN1cnZleVsnZWRpdG9yJ10gPSAgdGhpcy5sbXNQcm9maWxlU2VydmljZS5nZXRTdXJ2ZXlNZW1iZXJCeVJvbGUoJ2VkaXRvcicsIHN1cnZleS5pZCk7XG4gICAgICAgICAgICBzdXJ2ZXlbJ3N1cGVydmlzb3InXSA9ICB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmdldFN1cnZleU1lbWJlckJ5Um9sZSgnc3VwZXJ2aXNvcicsIHN1cnZleS5pZCk7XG4gICAgICAgICAgICBpZiAoc3VydmV5WydzdXBlcnZpc29yJ10pXG4gICAgICAgICAgICAgICAgIHN1cnZleVsnZWRpdG9yJ10gPSAgc3VydmV5WydzdXBlcnZpc29yJ107XG4gICAgICAgIH0pO1xuICAgICAgICBzdXJ2ZXlzLnNvcnQoKHN1cnZleTE6IFN1cnZleSwgc3VydmV5MjogU3VydmV5KTogYW55ID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmdldExhc3RTdXJ2ZXlUaW1lc3RhbXAoc3VydmV5MikgLSB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmdldExhc3RTdXJ2ZXlUaW1lc3RhbXAoc3VydmV5MSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cnZleXMgPSBzdXJ2ZXlzO1xuICAgIH1cblxuICAgIGVkaXRDb250ZW50KHN1cnZleTogU3VydmV5KSB7XG4gICAgICAgIHRoaXMuc3VydmV5Q29udGVudERpYWxvZy5zaG93KHN1cnZleSk7XG4gICAgfVxuXG4gICAgc3RhcnRTdXJ2ZXkoc3VydmV5OiBTdXJ2ZXksIG1lbWJlcjogU3VydmV5TWVtYmVyKSB7XG4gICAgICAgIHRoaXMuY29uZmlybWF0aW9uU2VydmljZS5jb25maXJtKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdBcmUgeW91IHN1cmUgdG8gc3RhcnQ/JyksXG4gICAgICAgICAgICBhY2NlcHQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1cnZleVN0dWR5RGlhbG9nLnNob3coc3VydmV5LCBtZW1iZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaXNoU3VydmV5KHN1cnZleTpTdXJ2ZXkpIHtcbiAgICAgICAgc3VydmV5LnNoZWV0X3N0YXR1cyA9ICdwdWJsaXNoZWQnO1xuICAgICAgICBzdXJ2ZXkuc2F2ZSh0aGlzKS5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICB1bnB1Ymxpc2hTdXJ2ZXkoc3VydmV5OlN1cnZleSkge1xuICAgICAgICBzdXJ2ZXkuc2hlZXRfc3RhdHVzID0gJ3VucHVibGlzaGVkJztcbiAgICAgICAgc3VydmV5LnNhdmUodGhpcykuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG59Il19

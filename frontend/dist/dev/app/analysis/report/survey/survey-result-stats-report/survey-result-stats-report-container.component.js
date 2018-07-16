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
var survey_model_1 = require("../../../../shared/models/elearning/survey.model");
var base_component_1 = require("../../../../shared/components/base/base.component");
var constants_1 = require("../../../../shared/models/constants");
var report_decorator_1 = require("../../report.decorator");
var survey_result_stats_report_component_1 = require("./survey-result-stats-report.component");
var SurveyResultStatsReportContainerComponent = (function (_super) {
    __extends(SurveyResultStatsReportContainerComponent, _super);
    function SurveyResultStatsReportContainerComponent() {
        return _super.call(this) || this;
    }
    SurveyResultStatsReportContainerComponent.prototype.ngOnInit = function () {
        var _this = this;
        survey_model_1.Survey.all(this).subscribe(function (surveys) {
            _this.surveys = surveys;
        });
    };
    SurveyResultStatsReportContainerComponent.prototype.export = function () {
        if (this.selectedSurvey)
            this.statsReport.export();
    };
    SurveyResultStatsReportContainerComponent.prototype.selectExam = function () {
        if (this.selectedSurvey) {
            this.statsReport.clear();
            this.statsReport.render(this.selectedSurvey);
        }
    };
    __decorate([
        core_1.ViewChild(survey_result_stats_report_component_1.SurveyResultStatsReportComponent),
        __metadata("design:type", survey_result_stats_report_component_1.SurveyResultStatsReportComponent)
    ], SurveyResultStatsReportContainerComponent.prototype, "statsReport", void 0);
    SurveyResultStatsReportContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'survey-result-stats-report-container',
            templateUrl: 'survey-result-stats-report-container.component.html',
        }),
        report_decorator_1.Report({
            title: 'Survey result statistics report',
            category: constants_1.REPORT_CATEGORY.SURVEY
        }),
        __metadata("design:paramtypes", [])
    ], SurveyResultStatsReportContainerComponent);
    return SurveyResultStatsReportContainerComponent;
}(base_component_1.BaseComponent));
exports.SurveyResultStatsReportContainerComponent = SurveyResultStatsReportContainerComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9yZXBvcnQvc3VydmV5L3N1cnZleS1yZXN1bHQtc3RhdHMtcmVwb3J0L3N1cnZleS1yZXN1bHQtc3RhdHMtcmVwb3J0LWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW1FO0FBS25FLGlGQUEwRTtBQUMxRSxvRkFBa0Y7QUFRbEYsaUVBQTJLO0FBQzNLLDJEQUFnRDtBQUtoRCwrRkFBMEY7QUFZMUY7SUFBK0QsNkRBQWE7SUFNeEU7ZUFDSSxpQkFBTztJQUNYLENBQUM7SUFFRCw0REFBUSxHQUFSO1FBQUEsaUJBSUM7UUFIQSxxQkFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPO1lBQ2pDLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELDBEQUFNLEdBQU47UUFDQyxJQUFJLElBQUksQ0FBQyxjQUFjO1lBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELDhEQUFVLEdBQVY7UUFDQyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDbkQ7SUFDRixDQUFDO0lBdEI0QztRQUE1QyxnQkFBUyxDQUFDLHVFQUFnQyxDQUFDO2tDQUFjLHVFQUFnQztrRkFBQztJQUpsRix5Q0FBeUM7UUFUckQsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsc0NBQXNDO1lBQ2hELFdBQVcsRUFBRSxxREFBcUQ7U0FDckUsQ0FBQztRQUNELHlCQUFNLENBQUM7WUFDSixLQUFLLEVBQUMsaUNBQWlDO1lBQ3ZDLFFBQVEsRUFBQywyQkFBZSxDQUFDLE1BQU07U0FDbEMsQ0FBQzs7T0FDVyx5Q0FBeUMsQ0E0QnJEO0lBQUQsZ0RBQUM7Q0E1QkQsQUE0QkMsQ0E1QjhELDhCQUFhLEdBNEIzRTtBQTVCWSw4RkFBeUMiLCJmaWxlIjoiYXBwL2FuYWx5c2lzL3JlcG9ydC9zdXJ2ZXkvc3VydmV5LXJlc3VsdC1zdGF0cy1yZXBvcnQvc3VydmV5LXJlc3VsdC1zdGF0cy1yZXBvcnQtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVwb3J0VXRpbHMgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvaGVscGVycy9yZXBvcnQudXRpbHMnO1xuaW1wb3J0IHsgU3VydmV5IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VydmV5Lm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCB7IEV4YW1Mb2cgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9sb2cubW9kZWwnO1xuaW1wb3J0IHsgRXhhbUdyYWRlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1ncmFkZS5tb2RlbCc7XG5pbXBvcnQgeyBTdWJtaXNzaW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VibWlzc2lvbi5tb2RlbCc7XG5pbXBvcnQgeyBBbnN3ZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9hbnN3ZXIubW9kZWwnO1xuaW1wb3J0IHsgU3VydmV5TWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VydmV5LW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgRVhQT1JUX0RBVEVUSU1FX0ZPUk1BVCwgUkVQT1JUX0NBVEVHT1JZLCBHUk9VUF9DQVRFR09SWSwgQ09VUlNFX01PREUsIENPVVJTRV9NRU1CRVJfRU5ST0xMX1NUQVRVUywgRVhQT1JUX0RBVEVfRk9STUFUIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBSZXBvcnQgfSBmcm9tICcuLi8uLi9yZXBvcnQuZGVjb3JhdG9yJztcbmltcG9ydCB7IFNlbGVjdEdyb3VwRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0LWdyb3VwLWRpYWxvZy9zZWxlY3QtZ3JvdXAtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWxlY3RVc2Vyc0RpYWxvZyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC11c2VyLWRpYWxvZy9zZWxlY3QtdXNlci1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFRpbWVDb252ZXJ0UGlwZX0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3BpcGVzL3RpbWUucGlwZSc7XG5pbXBvcnQgeyBFeGNlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvZXhjZWwuc2VydmljZSc7XG5pbXBvcnQgeyBTdXJ2ZXlSZXN1bHRTdGF0c1JlcG9ydENvbXBvbmVudCB9IGZyb20gJy4vc3VydmV5LXJlc3VsdC1zdGF0cy1yZXBvcnQuY29tcG9uZW50JztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnc3VydmV5LXJlc3VsdC1zdGF0cy1yZXBvcnQtY29udGFpbmVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3N1cnZleS1yZXN1bHQtc3RhdHMtcmVwb3J0LWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXG59KVxuQFJlcG9ydCh7XG4gICAgdGl0bGU6J1N1cnZleSByZXN1bHQgc3RhdGlzdGljcyByZXBvcnQnLFxuICAgIGNhdGVnb3J5OlJFUE9SVF9DQVRFR09SWS5TVVJWRVlcbn0pXG5leHBvcnQgY2xhc3MgU3VydmV5UmVzdWx0U3RhdHNSZXBvcnRDb250YWluZXJDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuXG4gICAgcHJpdmF0ZSBzdXJ2ZXlzOiBTdXJ2ZXlbXTtcbiAgICBwcml2YXRlIHNlbGVjdGVkU3VydmV5OiBhbnk7XG4gICAgQFZpZXdDaGlsZChTdXJ2ZXlSZXN1bHRTdGF0c1JlcG9ydENvbXBvbmVudCkgc3RhdHNSZXBvcnQ6IFN1cnZleVJlc3VsdFN0YXRzUmVwb3J0Q29tcG9uZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgXHRTdXJ2ZXkuYWxsKHRoaXMpLnN1YnNjcmliZShzdXJ2ZXlzID0+IHtcbiAgICBcdFx0dGhpcy5zdXJ2ZXlzID0gc3VydmV5cztcbiAgICBcdH0pO1xuICAgIH1cblxuICAgIGV4cG9ydCgpIHtcbiAgICBcdGlmICh0aGlzLnNlbGVjdGVkU3VydmV5KVxuICAgICAgICAgICAgdGhpcy5zdGF0c1JlcG9ydC5leHBvcnQoKTtcbiAgICB9XG5cbiAgICBzZWxlY3RFeGFtKCkge1xuICAgIFx0aWYgKHRoaXMuc2VsZWN0ZWRTdXJ2ZXkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHNSZXBvcnQuY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdHNSZXBvcnQucmVuZGVyKHRoaXMuc2VsZWN0ZWRTdXJ2ZXkpO1xuICAgIFx0fVxuICAgIH1cblxufVxuIl19

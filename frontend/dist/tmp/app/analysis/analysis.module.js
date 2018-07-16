"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var auth_module_1 = require("../auth/auth.module");
var shared_module_1 = require("../shared/shared.module");
var analysis_component_1 = require("./analysis.component");
var report_component_1 = require("./report/report.component");
var chart_component_1 = require("./chart/chart.component");
var exam_result_stats_report_component_1 = require("./report/exam/exam-result-stats-report/exam-result-stats-report.component");
var exam_result_stats_report_container_component_1 = require("./report/exam/exam-result-stats-report/exam-result-stats-report-container.component");
var exam_result_report_component_1 = require("./report/exam/exam-result-report/exam-result-report.component");
var exam_result_report_container_component_1 = require("./report/exam/exam-result-report/exam-result-report-container.component");
var course_by_member_report_component_1 = require("./report/course/course-by-member-report/course-by-member-report.component");
var course_by_member_report_container_component_1 = require("./report/course/course-by-member-report/course-by-member-report-container.component");
var member_by_course_report_component_1 = require("./report/course/member-by-course-report/member-by-course-report.component");
var member_by_course_report_container_component_1 = require("./report/course/member-by-course-report/member-by-course-report-container.component");
var report_container_directive_1 = require("./report/report-container.directive");
var course_activity_chart_component_1 = require("./chart/course-activity-chart/course-activity-chart.component");
var course_activity_chart_container_component_1 = require("./chart/course-activity-chart/course-activity-chart-container.component");
var user_login_activity_chart_component_1 = require("./chart/user-login-activity-chart/user-login-activity-chart.component");
var user_login_activity_chart_container_component_1 = require("./chart/user-login-activity-chart/user-login-activity-chart-container.component");
var user_chart_component_1 = require("./chart/user-chart/user-chart.component");
var user_chart_container_component_1 = require("./chart/user-chart/user-chart-container.component");
var chart_container_directive_1 = require("./chart/chart-container.directive");
var common_1 = require("@angular/common");
var time_pipe_1 = require("../shared/pipes/time.pipe");
var survey_result_stats_report_component_1 = require("./report/survey/survey-result-stats-report/survey-result-stats-report.component");
var survey_result_stats_report_container_component_1 = require("./report/survey/survey-result-stats-report/survey-result-stats-report-container.component");
var competency_by_group_report_component_1 = require("./report/competency/competency-by-group-report/competency-by-group-report.component");
var competency_by_group_report_container_component_1 = require("./report/competency/competency-by-group-report/competency-by-group-report-container.component");
var competency_profile_chart_component_1 = require("./chart/competency-profile-chart/competency-profile-chart.component");
var competency_profile_chart_container_component_1 = require("./chart/competency-profile-chart/competency-profile-chart-container.component");
var competency_progress_chart_component_1 = require("./chart/competency-progress-chart/competency-progress-chart.component");
var competency_progress_chart_container_component_1 = require("./chart/competency-progress-chart/competency-progress-chart-container.component");
var course_member_activity_chart_component_1 = require("./chart/course-member-activity-chart/course-member-activity-chart.component");
var analysis_routing_1 = require("./analysis-routing");
var AnalysisModule = (function () {
    function AnalysisModule() {
    }
    AnalysisModule = __decorate([
        core_1.NgModule({
            imports: [analysis_routing_1.AnalysisRoutingModule, shared_module_1.ErpSharedModule, auth_module_1.AuthModule],
            declarations: [
                analysis_component_1.AnalysisComponent,
                report_component_1.ReportComponent,
                chart_component_1.ChartComponent,
                exam_result_report_container_component_1.ExamResultReportContainerComponent,
                exam_result_report_component_1.ExamResultReportComponent,
                course_by_member_report_container_component_1.CourseByMemberReportContainerComponent,
                course_by_member_report_component_1.CourseByMemberReportComponent,
                member_by_course_report_container_component_1.MemberByCourseReportContainerComponent,
                member_by_course_report_component_1.MemberByCourseReportComponent,
                chart_container_directive_1.ChartContainerDirective,
                course_activity_chart_component_1.CourseActivityChartComponent,
                course_activity_chart_container_component_1.CourseActivityChartContainerComponent,
                user_login_activity_chart_component_1.UserLoginActivityChartComponent,
                user_login_activity_chart_container_component_1.UserLoginActivityChartContainerComponent,
                exam_result_stats_report_component_1.ExamResultStatsReportComponent,
                exam_result_stats_report_container_component_1.ExamResultStatsReportContainerComponent,
                survey_result_stats_report_component_1.SurveyResultStatsReportComponent,
                survey_result_stats_report_container_component_1.SurveyResultStatsReportContainerComponent,
                user_chart_component_1.UserChartComponent,
                user_chart_container_component_1.UserChartContainerComponent,
                competency_by_group_report_component_1.CompetencyByGroupReportComponent,
                competency_by_group_report_container_component_1.CompetencyByGroupReportContainerComponent,
                competency_profile_chart_component_1.CompetencyProfileChartComponent,
                competency_profile_chart_container_component_1.CompetencyProfileChartContainerComponent,
                competency_progress_chart_component_1.CompetencyProgressChartComponent,
                competency_progress_chart_container_component_1.CompetencyProgressChartContainerComponent,
                course_member_activity_chart_component_1.CourseMemberActivityChartComponent,
                report_container_directive_1.ReportContainerDirective
            ],
            entryComponents: [
                exam_result_report_container_component_1.ExamResultReportContainerComponent,
                course_by_member_report_container_component_1.CourseByMemberReportContainerComponent,
                member_by_course_report_container_component_1.MemberByCourseReportContainerComponent,
                exam_result_stats_report_container_component_1.ExamResultStatsReportContainerComponent,
                competency_by_group_report_container_component_1.CompetencyByGroupReportContainerComponent,
                user_chart_container_component_1.UserChartContainerComponent,
                user_login_activity_chart_container_component_1.UserLoginActivityChartContainerComponent,
                course_activity_chart_container_component_1.CourseActivityChartContainerComponent,
                survey_result_stats_report_container_component_1.SurveyResultStatsReportContainerComponent,
                competency_profile_chart_container_component_1.CompetencyProfileChartContainerComponent,
                competency_progress_chart_container_component_1.CompetencyProgressChartContainerComponent
            ],
            exports: [exam_result_report_component_1.ExamResultReportComponent, survey_result_stats_report_component_1.SurveyResultStatsReportComponent, exam_result_stats_report_component_1.ExamResultStatsReportComponent,
                course_member_activity_chart_component_1.CourseMemberActivityChartComponent],
            providers: [common_1.DatePipe, time_pipe_1.TimeConvertPipe]
        })
    ], AnalysisModule);
    return AnalysisModule;
}());
exports.AnalysisModule = AnalysisModule;

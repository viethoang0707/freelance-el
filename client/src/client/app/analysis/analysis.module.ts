import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { AnalysisComponent } from './analysis.component';
import { ReportComponent } from './report/report.component';
import { ChartComponent } from './chart/chart.component';
import { ExamResultStatsReportComponent } from './report/exam/exam-result-stats-report/exam-result-stats-report.component';
import { ExamResultStatsReportContainerComponent } from './report/exam/exam-result-stats-report/exam-result-stats-report-container.component';
import { ExamResultReportComponent } from './report/exam/exam-result-report/exam-result-report.component';
import { ExamResultReportContainerComponent } from './report/exam/exam-result-report/exam-result-report-container.component';
import { CourseByMemberReportComponent } from './report/course/course-by-member-report/course-by-member-report.component';
import { CourseByMemberReportContainerComponent } from './report/course/course-by-member-report/course-by-member-report-container.component';
import { MemberByCourseReportComponent } from './report/course/member-by-course-report/member-by-course-report.component';
import { MemberByCourseReportContainerComponent } from './report/course/member-by-course-report/member-by-course-report-container.component';
import { ReportContainerDirective } from './report/report-container.directive';
import { CourseActivityChartComponent } from './chart/course-activity-chart/course-activity-chart.component';
import { CourseActivityChartContainerComponent } from './chart/course-activity-chart/course-activity-chart-container.component';
import { UserChartComponent } from './chart/user-chart/user-chart.component';
import { UserChartContainerComponent } from './chart/user-chart/user-chart-container.component';
import { ChartContainerDirective } from './chart/chart-container.directive'
import { DatePipe } from '@angular/common';
import { ReportUtils } from '../shared/helpers/report.utils';
import { TimeConvertPipe} from '../shared/pipes/time.pipe';
import { StatsUtils } from '../shared/helpers/statistics.utils';

@NgModule({
	imports: [ErpSharedModule, AuthModule],
	declarations: [
	AnalysisComponent,
	ReportComponent, 
	ChartComponent,
	ExamResultReportContainerComponent,
	ExamResultReportComponent,
	CourseByMemberReportContainerComponent,
	CourseByMemberReportComponent,
	MemberByCourseReportContainerComponent,
	MemberByCourseReportComponent,
	ChartContainerDirective,
	CourseActivityChartComponent,
	CourseActivityChartContainerComponent,
	ExamResultStatsReportComponent,
	ExamResultStatsReportContainerComponent,
	UserChartComponent,
	UserChartContainerComponent,
	ReportContainerDirective],
	entryComponents: [
		ExamResultReportContainerComponent,
        CourseByMemberReportContainerComponent,
        MemberByCourseReportContainerComponent,
        ExamResultStatsReportContainerComponent,
        UserChartContainerComponent,
        CourseActivityChartContainerComponent
    ],
	exports: [ExamResultReportComponent,ExamResultStatsReportComponent],
	providers: [DatePipe, TimeConvertPipe]
})
export class AnalysisModule {
}

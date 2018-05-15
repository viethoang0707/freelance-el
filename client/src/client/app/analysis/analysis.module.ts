import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { AnalysisComponent } from './analysis.component';
import { ReportComponent } from './report/report.component';
import { ChartComponent } from './chart/chart.component';
import { ExamResultReportComponent } from './report/exam/exam-result-report/exam-result-report.component';
import { CourseByMemberReportComponent } from './report/course/course-by-member-report/course-by-member-report.component';
import { MemberByCourseReportComponent } from './report/course/member-by-course-report/member-by-course-report.component';
import { ReportContainerDirective } from './report/report-container.directive';
import { CourseActivityChartComponent } from './chart/course-activity-chart/course-activity-chart.component';
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
	ExamResultReportComponent,
	CourseByMemberReportComponent,
	MemberByCourseReportComponent,
	ChartContainerDirective,
	CourseActivityChartComponent,
	ReportContainerDirective],
	entryComponents: [
        ExamResultReportComponent,
        CourseByMemberReportComponent,
        MemberByCourseReportComponent,
        CourseActivityChartComponent
    ],
	exports: [],
	providers: [DatePipe, TimeConvertPipe]
})
export class AnalysisModule {
}

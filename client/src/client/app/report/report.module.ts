import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { ReportComponent } from './report.component'
import { ExamResultReportComponent } from './exam/exam-result-report/exam-result-report.component';
import { CourseByMemberReportComponent } from './course/course-by-member-report/course-by-member-report.component';
import { MemberByCourseReportComponent } from './course/member-by-course-report/member-by-course-report.component';
import { ReportContainerDirective } from './report-container.directive';
import { DatePipe } from '@angular/common';
import { ReportUtils } from '../shared/helpers/report.utils';
import { TimeConvertPipe} from '../shared/pipes/time.pipe';

@NgModule({
	imports: [ErpSharedModule, AuthModule],
	declarations: [
	ReportComponent, 
	ExamResultReportComponent,
	CourseByMemberReportComponent,
	MemberByCourseReportComponent,
	ReportContainerDirective],
	entryComponents: [
        ExamResultReportComponent,
        CourseByMemberReportComponent,
        MemberByCourseReportComponent
    ],
	exports: [],
	providers: [DatePipe, ReportUtils, TimeConvertPipe]
})
export class ReportModule {
}

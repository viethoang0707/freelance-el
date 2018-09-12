import { NgModule } from '@angular/core';
import { ErpSharedModule } from '../shared/shared.module';
import { AssessmentModule } from '../assessment/assessment.module';
import { CourseModule } from '../course/course.module';
import { CMSModule } from '../cms/cms.module';
import { LMSModule } from '../lms/lms.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { DashboardComponent } from './dashboard.component';
import { DateUtils } from '../shared/helpers/date.utils';
import { ExamListComponent } from './exam-list/exam-list.component';
import { CourseListComponent } from './course-list/course-list.component';
import { ConferenceListComponent } from './conference-list/conference-list.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CourseRecommendComponent } from './course-recommend/course-recommend.component';
import { SurveyListComponent } from './survey-list/survey-list.component';

@NgModule({
	imports: [
		ErpSharedModule,
		AssessmentModule,
		CourseModule, CMSModule,
		LMSModule
	],
	declarations: [
		DashboardComponent,
		AdminDashboardComponent,
		UserDashboardComponent,
		ExamListComponent,
		CourseListComponent,
		CourseSearchComponent,
		ConferenceListComponent,
		CourseRecommendComponent,
		SurveyListComponent
	],
	exports: [
		DashboardComponent
	],
	providers: [
		DateUtils
	]
})
export class DashboardModule {
}

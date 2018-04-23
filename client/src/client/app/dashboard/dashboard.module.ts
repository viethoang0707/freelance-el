import { NgModule } from '@angular/core';
import { ErpSharedModule } from '../shared/shared.module';
import { AssessmentModule } from '../assessment/assessment.module';
import { CourseModule } from '../course/course.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { DashboardComponent } from './dashboard.component'
import { DateUtils } from '../shared/helpers/date.utils';

@NgModule({
	imports: [ErpSharedModule, AssessmentModule, CourseModule],
	declarations: [
		DashboardComponent, 
		AdminDashboardComponent, 
		UserDashboardComponent],
	exports: [DashboardComponent],
	providers:[DateUtils]
})
export class DashboardModule {
}

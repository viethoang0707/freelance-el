import { NgModule } from '@angular/core';
import { ErpSharedModule } from '../shared/shared.module';
import { AssessmentModule } from '../assessment/assessment.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { DashboardComponent } from './dashboard.component'

@NgModule({
	imports: [ErpSharedModule, AssessmentModule],
	declarations: [
		DashboardComponent, 
		AdminDashboardComponent, 
		UserDashboardComponent],
	exports: [DashboardComponent],
})
export class DashboardModule {
}

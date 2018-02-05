import { NgModule } from '@angular/core';
import { ErpSharedModule } from '../shared/shared.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { DashboardComponent } from './dashboard.component'
import { ChartContainerDirective } from './chart-container.directive'
import { CourseActivityChartComponent } from './chart/course-activity-chart/course-activity-chart.component';
import { StatsUtils } from '../shared/helpers/statistics.utils';

@NgModule({
	imports: [ErpSharedModule],
	declarations: [
		DashboardComponent, 
		AdminDashboardComponent, 
		UserDashboardComponent,
		ChartContainerDirective,
		CourseActivityChartComponent],
	exports: [DashboardComponent],
	entryComponents: [CourseActivityChartComponent],
	providers: [StatsUtils]
})
export class DashboardModule {
}

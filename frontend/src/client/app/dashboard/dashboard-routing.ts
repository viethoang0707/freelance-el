import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { ExamListComponent } from './exam-list/exam-list.component';
import { CourseListComponent } from './course-list/course-list.component';
import { ConferenceListComponent } from './conference-list/conference-list.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CourseRecommendComponent } from './course-recommend/course-recommend.component';
import { SurveyListComponent } from './survey-list/survey-list.component';

export const DashboardRoutes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		data: {
			breadcrumb: 'Dashboard'
		},
		children:
			[
				{
					path: "",
					component: DashboardComponent,
					data: {
						breadcrumb: 'LMS'
					},
				},
				{
					path: "lms",
					component: UserDashboardComponent,
					data: {
						breadcrumb: 'LMS'
					},
				},
				{
					path: "admin",
					component: AdminDashboardComponent,
					data: {
						breadcrumb: 'Admin'
					},
					canActivate: [AdminGuard]
				},
				{
					path: "exams",
					component: ExamListComponent,
					data: {
						breadcrumb: 'My exams'
					}
				},
				{
					path: "courses",
					component: CourseListComponent,
					data: {
						breadcrumb: 'My courses'
					}
				},
				{
					path: "courses/search",
					component: CourseSearchComponent,
					data: {
						breadcrumb: 'Search courses'
					}
				},
				{
					path: "courses/recommend",
					component: CourseRecommendComponent,
					data: {
						breadcrumb: 'Search courses'
					}
				},
				{
					path: "meetings",
					component: ConferenceListComponent,
					data: {
						breadcrumb: 'My conferences'
					}
				},
				{
					path: "surveys",
					component: SurveyListComponent,
					data: {
						breadcrumb: 'My surveys'
					}
				}
			]
	}

]
@NgModule({
	imports: [RouterModule.forChild(DashboardRoutes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule { }
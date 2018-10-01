import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminGuard } from '../shared/guards/admin.guard';


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
						breadcrumb: 'LMS',
						viewMode: 'lms'
					},
				},
				{
					path: "admin",
					component: AdminDashboardComponent,
					data: {
						breadcrumb: 'Admin',
						viewMode: 'admin'
					},
					canActivate: [AdminGuard]
				},
				
			]
	}

]

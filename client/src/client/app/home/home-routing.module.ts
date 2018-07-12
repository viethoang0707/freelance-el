import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { SettingRoutes } from '../setting/setting-routing';
import { AccountRoutes } from '../account/account-routing';
import { CourseRoutes } from '../course/course-routing';
import { AssessmentRoutes } from '../assessment/assessment-routing';
import { LMSRoutes } from '../lms/lms-routing';
import { AnalysisRoutes } from '../analysis/analysis-routing';
import { DashboardRoutes } from '../dashboard/dashboard-routing';
import { WorkflowRoutes } from '../workflow/workflow-routing';
import { CompetencyRoutes } from '../competency/competency-routing';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'account',
            loadChildren: 'app/account/account.module#AccountModule'
          },
          {
            path: 'analysis',
            loadChildren: 'app/analysis/analysis.module#AnalysisModule'
          },
          {
            path: 'assessment',
            loadChildren: 'app/assessment/assessment.module#AssessmentModule'
          },
          {
            path: 'competency',
            loadChildren: 'app/competency/competency.module#CompetencyModule'
          },
          {
            path: 'course',
            loadChildren: 'app/course/course.module#CourseModule'
          },
          {
            path: 'dashboard',
            loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
          },
          {
            path: 'lms',
            loadChildren: 'app/lms/lms.module#LMSModule'
          },
          {
            path: 'setting',
            loadChildren: 'app/setting/setting.module#SettingModule'
          },
          {
            path: 'workflow',
            loadChildren: 'app/workflow/workflow.module#WorlflowModule'
          },
        ]
      },
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}

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
          ...DashboardRoutes,
          ...SettingRoutes,
          ...AccountRoutes,
          ...LMSRoutes,
          ...CourseRoutes,
          ...AssessmentRoutes,
          ...AnalysisRoutes,
          ...WorkflowRoutes,
          ...CompetencyRoutes
        ]
      },
      {path: '**', redirectTo: ''}
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
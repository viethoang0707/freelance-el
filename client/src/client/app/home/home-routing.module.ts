import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { SettingRoutes } from '../setting/setting-routing';
import { AccountRoutes } from '../account/account-routing';
import { EnrollmentRoutes } from '../enrollment/enrollment-routing';
import { AssessmentRoutes } from '../assessment/assessment-routing';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
          ...SettingRoutes,
          ...AccountRoutes,
          ...EnrollmentRoutes,
          ...AssessmentRoutes
        ]
      },
      {path: '**', redirectTo: ''}
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}

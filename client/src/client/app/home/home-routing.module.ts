import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { SettingRoutes } from '../setting/setting-routing';
import { AccountRoutes } from '../account/account-routing';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
          ...SettingRoutes,
          ...AccountRoutes
        ]
      },
      {path: '**', redirectTo: ''}
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}

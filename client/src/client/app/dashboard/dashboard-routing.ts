import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';

export const DashboardRoutes: Routes = [
    {
       path: '',
       component: DashboardComponent,
       data: {
       	breadcrumb:'Dashboard'
       }
    }

]
@NgModule({
  imports: [RouterModule.forChild(DashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
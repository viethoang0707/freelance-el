import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SettingComponent } from './setting.component';
import { AdminGuard } from '../shared/guards/admin.guard';

export const SettingRoutes: Routes = [
  {
    path: "setting",
    component: SettingComponent,
    canActivate: [AdminGuard],
    data: {
      breadcrumb: 'Setting'
    },
    children:
    [
    ]
  }

]

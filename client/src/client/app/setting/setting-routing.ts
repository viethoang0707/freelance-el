import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SettingAppComponent } from './application/setting-app.component';
import { SettingMailComponent } from './mail/setting-mail.component';
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
      {
        path: "app",
        component: SettingAppComponent,
        data: {
          breadcrumb: 'Application'
        }
      },
      {
        path: "mail",
        component: SettingMailComponent,
        data: {
          breadcrumb: 'Mail'
        }
      }

    ]
  }

]

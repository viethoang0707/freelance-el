import { NgModule } from '@angular/core';
import { SettingComponent } from './setting.component';
import { MailTemplateListComponent } from './mail-template-list/mail-template-list.component';
import { Routes } from '@angular/router';
import { AdminGuard } from '../shared/guards/admin.guard';
import { RouterModule } from '@angular/router';
import { MailTemplateFormComponent } from './mail-template-form/mail-template-form.component';
import { MailTemplateViewComponent } from './mail-template-view/mail-template-view.component';
import { TemplateResolve } from './route.resolver';

export const SettingRoutes: Routes = [
  {
    path: 'settings',
    component: SettingComponent,
    data: {
      breadcrumb: 'Setting'
    },
    canActivate: [AdminGuard],
    children:
      [
        {
          path: "mails",
          component: MailTemplateListComponent,
          data: {
            breadcrumb: 'Mail templates'
          }
        },
        {
          path: "mail/form/:templateId",
          component: MailTemplateFormComponent,
          data: {
            breadcrumb: 'Mail form'
          },
          resolve: {
            template: TemplateResolve
          }
        },
        {
          path: "mail/view/:templateId",
          component: MailTemplateViewComponent,
          data: {
            breadcrumb: 'Mail view'
          },
          resolve: {
            template: TemplateResolve
          }
        },

      ]
  }

]

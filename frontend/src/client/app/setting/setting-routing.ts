import { NgModule } from '@angular/core';
import { SettingComponent } from './setting.component';
import { MailTemplateListComponent } from './mail-template-list/mail-template-list.component';
import { Routes } from '@angular/router';
import { AdminGuard } from '../shared/guards/admin.guard';
import { RouterModule } from '@angular/router';

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
          

       ]
    }

]

@NgModule({
  imports: [RouterModule.forChild(SettingRoutes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {}
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SettingComponent } from './report.component';

export const SettingRoutes: Routes = [
    {
       path: "setting",
       component: SettingComponent,
       children:
       [
           {
               path: "group",
               component: GroupListComponent
            },
            {
               path: "user",
               component: UserListComponent
            }

       ]
    }

]

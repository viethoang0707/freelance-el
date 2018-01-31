import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SettingComponent } from './setting.component';
import { GroupListComponent} from './group/group-list/group-list.component';
import { UserListComponent } from './user/user-list/user-list.component';

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

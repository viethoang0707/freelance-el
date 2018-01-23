import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { GroupListComponent} from './group/group-list/group-list.component';
import { UserListComponent } from './user/user-list/user-list.component';

export const AccountRoutes: Routes = [
    {
       path: "account",
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

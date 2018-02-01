import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { GroupListComponent } from '../shared/components/group-list/group-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { AdminGuard } from '../shared/guards/admin.guard';

export const AccountRoutes: Routes = [
  {
    path: "account",
    data: {
      breadcrumb: 'Account'
    },
    canActivate: [AdminGuard],
    children:
    [
      {
        path: "groups",
        component: GroupListComponent,
        data: {
          breadcrumb: 'User groups',
          category:'organization'
        },
      },
      {
        path: "users",
        component: UserListComponent,
        data: {
          breadcrumb: 'Users'
        },
      }

    ]
  }

]

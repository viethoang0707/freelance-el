import { NgModule, Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { GroupListComponent } from '../shared/components/group-list/group-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { PermissionListComponent } from './permission/permission-list/permission-list.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { RouterModule } from '@angular/router';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserResolve, GroupsResolve, DateFormatResolve, PermissionResolve } from './route.resolver';
import { UserViewComponent } from './user/user-view/user-view.component';
import { UserImportComponent } from './user/user-import/user-import.component';
import { PermissionFormComponent } from './permission/permission-form/permission-form.component';
import { PermissionViewComponent } from './permission/permission-view/permission-view.component';

export const AccountRoutes: Routes = [
  {
    path: 'account',
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
      },
      {
        path: "users/import",
        component: UserImportComponent,
        resolve: {
          groups: GroupsResolve,
          dateFormat: DateFormatResolve
        },
        data: {
          breadcrumb: 'Import users'
        },
      },
      {
        path: "user/view/:userId",
        component: UserViewComponent,
        resolve: {
          user: UserResolve
        },
        data: {
          breadcrumb: 'User view form'
        },
      },
      {
        path: "user/form/:userId",
        component: UserFormComponent,
        resolve: {
          user: UserResolve
        },
        data: {
          breadcrumb: 'User edit form'
        },
      },
      {
        path: "user/form",
        component: UserFormComponent,
        resolve: {
          user: UserResolve
        },
        data: {
          breadcrumb: 'User create form'
        },
      },
      {
        path: "permissions",
        component: PermissionListComponent,
        data: {
          breadcrumb: 'Permission'
        },
      },
      {
        path: "permission/view/:permissionId",
        component: PermissionViewComponent,
        resolve: {
          permission: PermissionResolve
        },
        data: {
          breadcrumb: 'Permission view form'
        },
      },
      {
        path: "permission/form/:permissionId",
        component: PermissionFormComponent,
        resolve: {
          permission: PermissionResolve
        },
        data: {
          breadcrumb: 'Permission edit form'
        },
      },
      {
        path: "permission/form",
        component: PermissionFormComponent,
        resolve: {
          permission: PermissionResolve
        },
        data: {
          breadcrumb: 'Permission create form'
        },
      },
    ]
  }

]


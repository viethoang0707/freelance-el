import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { GroupListComponent } from '../shared/components/group-list/group-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { PermissionListComponent } from './permission/permission-list/permission-list.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { RouterModule } from '@angular/router';

export const AccountRoutes: Routes = [
  {
    path: '',
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
        path: "permissions",
        component: PermissionListComponent,
        data: {
          breadcrumb: 'Permission'
        },
      },
      
    ]
  }

]

@NgModule({
  imports: [RouterModule.forChild(AccountRoutes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
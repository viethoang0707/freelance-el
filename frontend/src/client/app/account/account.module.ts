import { NgModule,  Injectable } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { LMSModule } from '../lms/lms.module';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserExportDialog } from './user/export-dialog/export-dialog.component';
import { UserImportComponent } from './user/user-import/user-import.component';
import { PermissionListComponent } from './permission/permission-list/permission-list.component';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserContentComponent } from './user/user-form/user-content.component';
import { UserFormDialog } from './user/user-form/user-form-dialog.component';
import { UserViewComponent } from './user/user-view/user-view.component';
import { UserResolve, GroupsResolve, DateFormatResolve, PermissionResolve } from './route.resolver';
import { PermissionFormComponent } from './permission/permission-form/permission-form.component';
import { PermissionViewComponent } from './permission/permission-view/permission-view.component';
import { ChangePasswordDialog } from './user/change-password/change-password-dialog.component';
import { UserViewDialogComponent } from './user/user-view/user-view.dialog.component';
import { UserViewContentComponent } from './user/user-view/user-content.component';

@NgModule({
    imports: [
        ErpSharedModule,
        AuthModule,
        LMSModule
    ],
    declarations: [
        UserListComponent,
        UserFormComponent,
        UserViewComponent,
        UserExportDialog,
        UserImportComponent,
        PermissionListComponent,
        PermissionFormComponent,
        PermissionViewComponent,
        UserContentComponent,
        UserFormDialog,
        UserViewDialogComponent,
        UserViewContentComponent,
        ChangePasswordDialog
    ],
    exports: [
        UserViewDialogComponent,
        ChangePasswordDialog
    ],
    providers: [
        UserResolve,
        GroupsResolve,
        DateFormatResolve,
        PermissionResolve
    ]
})
export class AccountModule {
}

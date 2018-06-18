import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { LMSModule } from '../lms/lms.module';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDialog } from './user/user-dialog/user-dialog.component';
import { UserExportDialog } from './user/export-dialog/export-dialog.component';
import { UserImportDialog } from './user/import-dialog/import-dialog.component';
import { UserProfileDialog } from './user/profile-dialog/profile-dialog.component';
import { PermissionListComponent } from './permission/permission-list/permission-list.component';
import { PermissionDialog } from './permission/permission-dialog/permission-dialog.component';
import { MenuPermissionDialog } from './permission/menu-permission-dialog/menu-permission-dialog.component';
import { MemberPermissionDialog } from './permission/member-permission-dialog/member-permission-dialog.component';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
    imports: [ErpSharedModule, AuthModule, LMSModule, CalendarModule, RadioButtonModule],
    declarations: [UserListComponent,
        UserDialog,
        UserExportDialog,
        UserImportDialog,
        UserProfileDialog,
        PermissionListComponent,
        PermissionDialog,
        MenuPermissionDialog,
        MemberPermissionDialog,
    ],
    exports: [UserProfileDialog],
    providers: []
})
export class AccountModule {
}

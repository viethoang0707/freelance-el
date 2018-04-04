import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDialog } from './user/user-dialog/user-dialog.component';
import { UserExportDialog } from './user/export-dialog/export-dialog.component';
import { UserImportDialog } from './user/import-dialog/import-dialog.component';
import { UserProfileDialog } from './user/profile-dialog/profile-dialog.component';
//permission
import {PermissionListComponent} from './permission/permission-list/permission-list.component';

@NgModule({
    imports: [ErpSharedModule, AuthModule],
    declarations: [ UserListComponent, UserDialog,
                    UserExportDialog,UserImportDialog,UserProfileDialog,
                    PermissionListComponent
                ],
    exports: [UserProfileDialog],
    providers: []
})
export class AccountModule {
}

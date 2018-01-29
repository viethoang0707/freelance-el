import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { GroupListComponent } from './group/group-list/group-list.component';
import { GroupDialog } from './group/group-dialog/group-dialog.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDialog } from './user/user-dialog/user-dialog.component';
import { UserExportDialog } from './user/export-dialog/export-dialog.component';
import { UserImportDialog } from './user/import-dialog/import-dialog.component';
import { UserProfileDialog } from './user/profile-dialog/profile-dialog.component';
import { CountUserByGroupPipe } from './user/user-list/user-by-group.pipe';

@NgModule({
    imports: [ErpSharedModule, AuthModule],
    declarations: [GroupDialog, GroupListComponent,
    				UserListComponent, UserDialog, CountUserByGroupPipe,
    				UserExportDialog,UserImportDialog,UserProfileDialog],
    exports: [],
    providers: []
})
export class AccountModule {
}

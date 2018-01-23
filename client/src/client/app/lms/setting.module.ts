import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { HrmSharedModule } from '../shared/shared.module';
import  { SettingComponent } from './setting.component'
import { GroupListComponent } from './group/group-list/group-list.component';
import { GroupDialog } from './group/group-dialog/group-dialog.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDialog } from './user/user-dialog/user-dialog.component';
import { CountUserByGroupPipe } from './user/user-list/user-by-group.pipe';

@NgModule({
    imports: [HrmSharedModule, AuthModule],
    declarations: [SettingComponent, GroupDialog, GroupListComponent,
    				UserListComponent, UserDialog, CountUserByGroupPipe],
    exports: [],
    providers: []
})
export class SettingModule {
}

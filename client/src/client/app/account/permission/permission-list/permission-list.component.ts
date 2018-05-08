import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { USER_STATUS, GROUP_CATEGORY } from '../../../shared/models/constants'
import { Permission } from '../../../shared/models/elearning/permission.model';
import { PermissionDialog} from '../permission-dialog/permission-dialog.component';
import { MenuPermissionDialog } from '../menu-permission-dialog/menu-permission-dialog.component';
import { SelectGroupDialog } from '../../../shared/components/select-group-dialog/select-group-dialog.component';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { Group } from '../../../shared/models/elearning/group.model';
import { MemberPermissionDialog} from '../member-permission-dialog/member-permission-dialog.component';

@Component({
    moduleId: module.id,
    selector: 'permission-list',
    templateUrl: 'permission-list.component.html',
    styleUrls: ['permission-list.component.css'],
})
export class PermissionListComponent extends BaseComponent {

    @ViewChild(PermissionDialog) permissionDialog: PermissionDialog;
    @ViewChild(MenuPermissionDialog) menuPermissionDialog: MenuPermissionDialog;
    @ViewChild(MemberPermissionDialog) memberPermissionDialog: MemberPermissionDialog;
    @ViewChild(SelectGroupDialog) userPermissionDialog: SelectGroupDialog;

    selectedPermission: Permission;
    permissions: Permission[];

    constructor() {
        super();
    }

    ngOnInit() {
       this.loadPermission();
    }

    loadPermission() {
        Permission.all(this).subscribe(permissions => {
            this.permissions = permissions;
        });
    }

    add(){
        var permission = new Permission();
        this.permissionDialog.show(permission);
        this.permissionDialog.onCreateComplete.subscribe(() => {
            this.loadPermission();
        });
    }

    edit() {
        if (this.selectedPermission)
            this.permissionDialog.show(this.selectedPermission);
        this.permissionDialog.onUpdateComplete.subscribe(() => {
            this.loadPermission();
        });
    }

    permissionMember(){
        if (this.selectedPermission)
            this.memberPermissionDialog.show(this.selectedPermission);
    }

    permissionMenu(){
        if (this.selectedPermission)
            this.menuPermissionDialog.show(this.selectedPermission);
    }

    permissionAccess(){
        if (this.selectedPermission)
            this.userPermissionDialog.show();
        this.userPermissionDialog.onSelectGroup.subscribe((group:Group)=> {
            this.selectedPermission.user_group_id = group.id;
            this.selectedPermission.save(this).subscribe(()=> {
                this.loadPermission();
            });
        });
    }
}

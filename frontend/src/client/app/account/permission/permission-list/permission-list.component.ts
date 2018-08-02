import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { USER_STATUS, GROUP_CATEGORY } from '../../../shared/models/constants'
import { Permission } from '../../../shared/models/elearning/permission.model';
import { PermissionDialog } from '../permission-dialog/permission-dialog.component';
import { MenuPermissionDialog } from '../menu-permission-dialog/menu-permission-dialog.component';
import { SelectGroupDialog } from '../../../shared/components/select-group-dialog/select-group-dialog.component';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { Group } from '../../../shared/models/elearning/group.model';
import { MemberPermissionDialog } from '../member-permission-dialog/member-permission-dialog.component';
import { User } from '../../../shared/models/elearning/user.model';

@Component({
    moduleId: module.id,
    selector: 'permission-list',
    templateUrl: 'permission-list.component.html',
    styleUrls: ['permission-list.component.css'],
})
export class PermissionListComponent extends BaseComponent {

    private selectedPermission: Permission;
    private permissions: Permission[];

    @ViewChild(PermissionDialog) permissionDialog: PermissionDialog;
    @ViewChild(MenuPermissionDialog) menuPermissionDialog: MenuPermissionDialog;
    @ViewChild(MemberPermissionDialog) memberPermissionDialog: MemberPermissionDialog;
    @ViewChild(SelectGroupDialog) userPermissionDialog: SelectGroupDialog;


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

    addPermission() {
        var permission = new Permission();
        this.permissionDialog.show(permission);
        this.permissionDialog.onCreateComplete.subscribe(() => {
            this.permissions.unshift(permission);
            this.success('Add permission successfully');
        });
    }

    editPermission(permission: Permission) {
        this.permissionDialog.show(permission);
    }

    deletePermission(permission: Permission) {
        if (permission.user_count)
            this.error(this.translateService.instant('You cannot delete permission assigned to other uers'))
        else {
            this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
                permission.delete(this).subscribe(() => {
                    this.permissions = _.reject(this.permissions, (perm:Permission)=> {
                        return perm.id == permission.id;
                    });
                    this.selectedPermission =  null;
                    this.success('Delete permission successfully');
                })
            });
        }
    }

    permissionMember(permission: Permission) {
        this.memberPermissionDialog.show(permission);
    }

    permissionMenu(permission: Permission) {
        this.menuPermissionDialog.show(permission);
    }

    permissionAccess(permission: Permission) {
        this.userPermissionDialog.show();
        this.userPermissionDialog.onSelectGroup.first().subscribe((group: Group) => {
            permission.user_group_id = group.id;
            permission.save(this).subscribe(() => {
                this.loadPermission();
                this.success('Set group permission successfully');
            });
        });
    }
}

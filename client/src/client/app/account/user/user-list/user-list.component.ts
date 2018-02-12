import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { USER_STATUS, GROUP_CATEGORY } from '../../../shared/models/constants'
import { User } from '../../../shared/models/user.model';
import { Group } from '../../../shared/models/group.model';
import { UserDialog } from '../user-dialog/user-dialog.component';
import { UserExportDialog } from '../export-dialog/export-dialog.component';
import { UserImportDialog } from '../import-dialog/import-dialog.component';
import { UserProfileDialog } from '../profile-dialog/profile-dialog.component';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';

@Component({
    moduleId: module.id,
    selector: 'etraining-user-list',
    templateUrl: 'user-list.component.html',
    styleUrls: ['user-list.component.css'],
})
export class UserListComponent extends BaseComponent {

    @ViewChild(UserDialog) userDialog: UserDialog;
    @ViewChild(UserExportDialog) userExportDialog: UserExportDialog;
    @ViewChild(UserImportDialog) userImportDialog: UserImportDialog;
    @ViewChild(UserProfileDialog) userProfileDialog: UserProfileDialog;

    tree: TreeNode[];
    selectedUser: User;
    users: User[];
    filterGroups: Group[];
    selectedGroupNodes: TreeNode[];

    constructor(private treeUtils: TreeUtils) {
        super();
        this.filterGroups = [];
    }

    ngOnInit() {
        Group.listByCategory(this,GROUP_CATEGORY.USER).subscribe(groups => {
            this.tree = this.treeUtils.buildTree(groups);
        });
        this.loadUsers();
    }

    add() {
        var user = new User();
        this.userDialog.show(user);
        this.userDialog.onCreateComplete.subscribe(() => {
            this.loadUsers();
        });
    }

    showProfile() {
        if (this.selectedUser)
            this.userProfileDialog.show(this.selectedUser);
        this.userProfileDialog.onUpdateComplete.subscribe(() => {
            this.loadUsers();
        });
    }

    delete() {
        if (this.selectedUser)
            this.confirmationService.confirm({
                message: this.translateService.instant('Are you sure to delete ?'),
                accept: () => {
                    this.selectedUser.delete(this).subscribe(() => {
                        this.loadUsers();
                        this.selectedUser = null;
                    })
                }
            });
    }

    export() {
        this.userExportDialog.show(this.users);
    }

    import() {
        this.userImportDialog.show();
        this.userImportDialog.onImportComplete.subscribe(()=> {
            this.loadUsers();
        });
    }

    loadUsers() {
        User.all(this).subscribe(users => {
            this.users = users;
        });
    }


}

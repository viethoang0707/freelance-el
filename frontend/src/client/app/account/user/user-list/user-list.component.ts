import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { USER_STATUS, GROUP_CATEGORY } from '../../../shared/models/constants'
import { User } from '../../../shared/models/elearning/user.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { UserDialog } from '../user-dialog/user-dialog.component';
import { UserExportDialog } from '../export-dialog/export-dialog.component';
import { UserImportDialog } from '../import-dialog/import-dialog.component';
import { UserProfileDialog } from '../profile-dialog/profile-dialog.component';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { BaseModel } from '../../../shared/models/base.model';

const USER_FIELDS = ['group_id', 'banned' ,'name', 'login', 'email', 'position', 'phone', 'group_name', 'permission_name'];

@Component({
    moduleId: module.id,
    selector: 'user-list',
    templateUrl: 'user-list.component.html',
    styleUrls: ['user-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class UserListComponent extends BaseComponent {

    @ViewChild(UserDialog) userDialog: UserDialog;
    @ViewChild(UserExportDialog) userExportDialog: UserExportDialog;
    @ViewChild(UserImportDialog) userImportDialog: UserImportDialog;
    @ViewChild(UserProfileDialog) userProfileDialog: UserProfileDialog;

    private tree: TreeNode[];
    private users: User[];
    private selectedUsers: any;
    private selectedGroupNodes: TreeNode[];
    private treeUtils: TreeUtils;
    private displayUsers: User[];


    constructor() {
        super();
        this.treeUtils = new TreeUtils();
    }

    ngOnInit() {
        Group.listUserGroup(this).subscribe(groups => {
            this.tree = this.treeUtils.buildGroupTree(groups);
        });
        this.loadUsers();
    }

    loadUsers() {
        User.all(this,USER_FIELDS).subscribe(users => {
            this.users = users;
            this.displayUsers = users;
            this.selectedUsers = [];
        });
    }

    buildGroupTree() {
        Group.listUserGroup(this).subscribe(groups => {
            this.tree = this.treeUtils.buildGroupTree(groups);
        });
    }

    addUser() {
        var user = new User();
        this.userDialog.show(user);
        this.userDialog.onCreateComplete.subscribe(() => {
            this.users.unshift(user);
            this.displayUsers = this.users;
            this.selectedUsers = [];
            this.selectedGroupNodes = [];
            this.success('Add user successfully');
        });
    }

    editUser(user:User) {
        this.userProfileDialog.show(user);
        this.selectedUsers = [];
    }

    activateMultipleUsers(users:User[]){
        _.each(users, (user:User)=> {
            user.banned =  false;
        });
        User.updateArray(this,users).subscribe(()=> {
            this.success('User activated successfully');
        });
    }


    deactivateMultipleUsers(users: User[]){
        _.each(users, (user:User)=> {
            user.banned =  true;
        });
        User.updateArray(this,users).subscribe(()=> {
            this.success('User deactivated successfully');
        });
    }

    exportUser() {
        this.userExportDialog.show(this.users);
    }

    importUser() {
        this.userImportDialog.show();
        this.userImportDialog.onImportComplete.subscribe(() => {
            this.loadUsers();
        });
    }

    filterUser() {
        if (this.selectedGroupNodes.length != 0) {
            this.displayUsers = _.filter(this.users, user => {
                var parentGroupNode = _.find(this.selectedGroupNodes, node => {
                    return node.data.id == user.group_id;
                });
                return parentGroupNode != null;
            });
        } else {
            this.displayUsers = this.users;
        }
    }
}

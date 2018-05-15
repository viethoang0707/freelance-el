import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
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

    tree: TreeNode[];
    users: User[];
    user: User;
    selectedUser: any;
    filterGroups: Group[];
    selectedGroupNodes: TreeNode[];
    totalExam: any;
    totalCourse: any;
    treeUtils: TreeUtils;

    constructor() {
        super();
        this.filterGroups = [];
        this.treeUtils = new TreeUtils();
    }

    ngOnInit() {
        Group.listByCategory(this,GROUP_CATEGORY.USER).subscribe(groups => {
            this.tree = this.treeUtils.buildGroupTree(groups);
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

    activate() {
        if (this.selectedUser) {
            this.selectedUser.banned = false;
            this.selectedUser.save(this).subscribe(()=> {}, ()=> {
                this.error('Permission denied');
            });    
        }
    }

    deactivate() {
        if (this.selectedUser) {
            this.selectedUser.banned = true;
            this.selectedUser.save(this).subscribe(()=> {}, ()=> {
                this.error('Permission denied');
            });    
        }
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

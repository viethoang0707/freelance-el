import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { AuthService } from '../../../shared/services/auth.service';
import { USER_STATUS, GROUP_CATEGORY } from '../../../shared/models/constants'
import { User } from '../../../shared/models/elearning/user.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { UserExportDialog } from '../export-dialog/export-dialog.component';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { BaseModel } from '../../../shared/models/base.model';
import { DataTable } from 'primeng/primeng';

import * as _ from 'underscore';

const USER_FIELDS = ['group_id', 'banned' ,'name', 'login', 'email', 'position', 'phone', 'group_name', 'permission_name'];
const GROUP_FIELDS = ['name', 'category' ,'parent_id', 'user_count'];

@Component({
    moduleId: module.id,
    selector: 'user-list',
    templateUrl: 'user-list.component.html',
    styleUrls: ['user-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class UserListComponent extends BaseComponent {

    @ViewChild(UserExportDialog) userExportDialog: UserExportDialog;
    
    private tree: TreeNode[];
    private users: User[];
    private displayUsers: User[];
    private selectedUsers: any;
    private selectedGroupNodes: TreeNode[];
    
    private mode: string;
    private batchAction: string;

    constructor(private router: Router, private route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.enterSingleMode();
        Group.listUserGroup(this,GROUP_FIELDS).subscribe(groups => {
            let treeUtils = new TreeUtils();
            this.tree = treeUtils.buildGroupTree(groups);
        });
        User.all(this,USER_FIELDS).subscribe(users => {
            this.users = _.sortBy(users, (user:User)=> {
                return -user.id;
            });
            this.displayUsers = this.users;
        });
    }

    addUser() {
        this.router.navigate(['/account/user/form']);
    }

    editUser(user:User) {
        this.router.navigate(['/account/user/form', user.id]);
    }

    viewUser(user:User) {
        this.router.navigate(['/account/user/view', user.id]);
    }

    deleteUser(user:User) {
        if (this.ContextUser.id == user.id) {
            this.warn('You cannot delete your own account');
            return;
        }
        this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
            user.delete(this).subscribe(() => {
                this.users = _.reject(this.users, (obj:User)=> {
                    return obj.id == user.id;
                });
                this.selectedUsers =  null;
                this.success(this.translateService.instant('Delete user successfully'));
            })
        });
    }

    activateMultipleUsers(users:User[]){
        _.each(users, (user:User)=> {
            user.banned =  false;
            user.unban_date =  new Date();
        });
        return User.updateArray(this,users).do(()=> {
            this.success(this.translateService.instant('User activated successfully'));
        });
    }

    deactivateMultipleUsers(users: User[]){
        _.each(users, (user:User)=> {
            user.banned =  true;
            user.ban_date =  new Date();
        });
        return User.updateArray(this,users).do(()=> {
            this.success(this.translateService.instant('User deactivated successfully'));
        });
    }

    exportUser() {
        this.userExportDialog.show();
    }

    importUser() {
        this.router.navigate(['/account/users/import']);
    }

    filterUserByGroup() {
        if (this.selectedGroupNodes.length != 0) {
            var groupIds = _.map(this.selectedGroupNodes, (node:TreeNode)=> {
                return node.data["id"];
            });
            this.displayUsers = _.filter(this.users, (user:User) => {
                return groupIds.includes(user.group_id);
            });
        } else {
            this.displayUsers = this.users;
        }
    }

    enterBatchMode(action:string) {
        this.batchAction = action;
        this.mode =  'multiple';
        this.selectedUsers = [];
    }

    enterSingleMode() {
        this.mode = 'single';
        this.batchAction = '';
        this.selectedUsers = null;
    }

    applyBatchAction() {
        if (this.batchAction=='activate')
            this.activateMultipleUsers(this.selectedUsers).subscribe(()=> {
                this.enterSingleMode();
            });
        if (this.batchAction=='deactivate') 
            this.deactivateMultipleUsers(this.selectedUsers).subscribe(()=> {
                this.enterSingleMode();
            });
    }

}

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
        if(this.selectedUser)
        {
            this.user = this.selectedUser;
            this.checkExamMember(this.user);
            
            if(this.totalExam.length == 0){
                this.confirm('Are you sure to delete ?', () => {
                    this.selectedUser.delete(this).subscribe(() => {
                        this.loadUsers();
                        this.selectedUser = null;
                    })
                });
            }
            else{
                alert("Có kỳ thi người dùng này đã đăng ký!");
            }
        }
    }

    checkExamMember(member)
    {
        ExamMember.listByUser(this, member.id).subscribe(exams => {
            this.totalExam = exams;
        });
    }
    checkCourseMember(member)
    {
        CourseMember.listByUser(this, member.id).subscribe(courses => {
            this.totalCourse = courses;
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

import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { Course } from '../../../shared/models/course.model';
import { Group } from '../../../shared/models/group.model';
import { CourseClass } from '../../../shared/models/course-class.model';
import { CourseMember } from '../../../shared/models/course-member.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode, MenuItem } from 'primeng/api';
import { CourseMemberDialog } from '../member-dialog/member-dialog.component';
import { GROUP_CATEGORY, COURSE_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE, COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants'
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';

@Component({
    moduleId: module.id,
    selector: 'etraining-member-list',
    templateUrl: 'member-list.component.html',
    styleUrls: ['member-list.component.css'],
})
export class CourseMemberListComponent extends BaseComponent implements OnInit {

    @ViewChild(CourseMemberDialog) memberDialog: CourseMemberDialog;
    @ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;

    tree: TreeNode[];
    items: MenuItem[];
    selectedNode: TreeNode;
    selectedCourse: Course;
    courses:Course[];
    selectedClass: CourseClass;
    classes:CourseClass[];
    selectedMember: CourseMember;
    members: CourseMember[];
    processing: boolean;

    COURSE_MODE = COURSE_MODE;
    COURSE_STATUS = COURSE_STATUS;
    COURSE_MEMBER_ROLE = COURSE_MEMBER_ROLE;
    COURSE_MEMBER_STATUS = COURSE_MEMBER_STATUS;
    COURSE_MEMBER_ENROLL_STATUS = COURSE_MEMBER_ENROLL_STATUS;

    constructor(private treeUtils: TreeUtils) {
        super();
        this.members = [];
        this.classes = [];
        this.courses = [];
        this.processing = false;
    }

    nodeSelect(event: any) {
        if (this.selectedNode) {
            Course.listByGroup(this,this.selectedNode.data.id).subscribe(courses => {
                this.courses = courses;
                this.selectedCourse = null;
                this.selectedMember = null;
                this.selectedClass = null;
            });
        }
    }

    ngOnInit() {
        Group.listByCategory(this, GROUP_CATEGORY.COURSE).subscribe(groups => {
            this.tree = this.treeUtils.buildTree(groups);
        });
        CourseClass.all(this).subscribe(classes => {
            this.classes = classes;
        });
        this.loadMembers();
        this.items = [
            {label: this.translateService.instant('Student'), command: ()=> { this.add('student')}},
            {label: this.translateService.instant('Student'), command: ()=> { this.add('student')}}
        ];
    }

    add(role:string) {
        var self = this;
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.subscribe(users => {
            this.processing = true;
            var subscriptions = [];
            _.each(users, function(user) {
                var member = new CourseMember();
                if (self.selectedCourse.mode =='group')
                    member.class_id = self.selectedClass.id;
                member.role = role;
                member.course_id = self.selectedCourse.id;
                member.user_id = user.id;
                member.date_register =  new Date();
                subscriptions.push(member.save(self));
            });
            Observable.forkJoin(...subscriptions).subscribe(()=> {
                this.processing = false;
                this.loadMembers();
            });
        });
    }

    edit() {
        if (this.selectedMember)
            this.memberDialog.show(this.selectedMember);
    }

    delete() {
        if (this.selectedMember)
        this.confirmationService.confirm({
            message: this.translateService.instant('Are you sure to delete ?'),
            accept: () => {
                this.selectedMember.data.delete(this).subscribe(()=> {
                    this.loadMembers();
                })
            }
        });
    }

    loadMembers() {
        CourseMember.all(this).subscribe(members => {
                this.members = members;
        });
    }
    
}

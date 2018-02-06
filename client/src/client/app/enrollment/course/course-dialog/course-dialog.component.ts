import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/group.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { Course } from '../../../shared/models/course.model';
import { CourseMember } from '../../../shared/models/course-member.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { SelectItem, MenuItem } from 'primeng/api';
import { CourseMemberDialog } from '../../member-dialog/member-dialog.component';
import { GROUP_CATEGORY, COURSE_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE, COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants'
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';

@Component({
	moduleId: module.id,
	selector: 'etraining-course-dialog',
	templateUrl: 'course-dialog.component.html',
})
export class CourseDialog extends BaseDialog<Course> {

	tree: TreeNode[];
	items: MenuItem[];
	selectedNode: TreeNode;
	courseStatus: SelectItem[];
	processing: boolean;
	selectedMember: CourseMember;
	members: CourseMember[];
	@ViewChild(CourseMemberDialog) memberDialog: CourseMemberDialog;
	@ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;

	COURSE_MODE = COURSE_MODE;
	COURSE_STATUS = COURSE_STATUS;
	COURSE_MEMBER_ROLE = COURSE_MEMBER_ROLE;
	COURSE_MEMBER_STATUS = COURSE_MEMBER_STATUS;
	COURSE_MEMBER_ENROLL_STATUS = COURSE_MEMBER_ENROLL_STATUS;

	constructor(private treeUtils: TreeUtils) {
		super();
		this.courseStatus = _.map(COURSE_STATUS, function(val, key) {
			return {
				label: val,
				value: key
			}
		});
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.object.group_id = this.selectedNode.data.id;
		}
	}

	ngOnInit() {
		this.onShow.subscribe(object => {
			this.processing = false;
			Group.listByCategory(this, GROUP_CATEGORY.COURSE).subscribe(groups => {
				this.tree = this.treeUtils.buildTree(groups);
				if (object.group_id) {
					this.selectedNode = this.treeUtils.findTreeNode(this.tree, object.group_id);
				}
			});
			this.loadMembers();
			this.items = [
				{ label: this.translateService.instant('Student'), command: () => { this.add('student') } },
				{ label: this.translateService.instant('Student'), command: () => { this.add('student') } }
			];
		});
	}

	add(role: string) {
		var self = this;
		this.usersDialog.show();
		this.usersDialog.onSelectUsers.subscribe(users => {
			this.processing = true;
			var subscriptions = [];
			_.each(users, function(user) {
				var member = new CourseMember();
				member.role = role;
				member.course_id = self.object.id;
				member.user_id = user.id;
				member.status = 'active';
				member.enroll_status = 'registered';
				member.date_register = new Date();
				subscriptions.push(member.save(self));
			});
			Observable.forkJoin(...subscriptions).subscribe(() => {
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
					this.selectedMember.data.delete(this).subscribe(() => {
						this.loadMembers();
					})
				}
			});
	}

	loadMembers() {
		if (this.object.id)
			CourseMember.listByCourse(this, this.object.id).subscribe(members => {
				this.members = members;
			});
		else
			this.members = [];
	}


}


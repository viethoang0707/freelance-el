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
			Group.listByCategory(this, GROUP_CATEGORY.COURSE).subscribe(groups => {
				this.tree = this.treeUtils.buildTree(groups);
				if (object.group_id) {
					this.selectedNode = this.treeUtils.findTreeNode(this.tree, object.group_id);
				}
			});
		});
	}
}


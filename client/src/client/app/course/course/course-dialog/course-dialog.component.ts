import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { WebSocketService } from '../../../shared/services/socket.service';
import { DataAccessService } from '../../../shared/services/data-access.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { User } from '../../../shared/models/elearning/user.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { Course } from '../../../shared/models/elearning/course.model';
import { Ticket } from '../../../shared/models/ticket/ticket.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { SelectItem, MenuItem } from 'primeng/api';
import { GROUP_CATEGORY, COURSE_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE, COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants'
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { WorkflowService } from '../../../shared/services/workflow.service';

@Component({
	moduleId: module.id,
	selector: 'course-dialog',
	templateUrl: 'course-dialog.component.html',
})
export class CourseDialog extends BaseDialog<Course> {

	private tree: TreeNode[];
	private items: MenuItem[];
	private user: User;
	private selectedNode: TreeNode;
	private courseStatus: SelectItem[];
	private treeUtils: TreeUtils;
	@ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;
	private allowToChangeState: boolean;
	private submitForReview: boolean;
	private openTicket: Ticket;
	private obj: any;

	constructor(private socketService: WebSocketService, private workflowService: WorkflowService) {
		super();
		this.treeUtils = new TreeUtils();
		this.courseStatus = _.map(COURSE_STATUS, (val, key) => {
			return {
				label: this.translateService.instant(val),
				value: key
			}
		});
		this.allowToChangeState = false;
		this.user = this.authService.UserProfile;
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.object.group_id = this.selectedNode.data.id;
		}
	}

	selectAuthor() {
		this.usersDialog.show();
		this.usersDialog.onSelectUsers.subscribe(users => {
			if (users.length > 1) {
				this.error('You can select only one author.');
				return;
			} else if (users.length == 1) {
				var author = users[0];
				this.object.author_id = author.id;
				this.object.author_name = author.name;
			}
		});
	}

	ngOnInit() {
		this.onShow.subscribe(object => {
			this.obj = { selectedNode: object.group_id, logo: object.logo, name: object.name, status: object.status, code: object.code, summary: object.summary, description: object.description, author_name: object.author_name };
			if (object.id)
				Ticket.byWorkflowObject(this, object.id, Course.Model).subscribe((ticket) => {
					this.openTicket = ticket;
				});
			object.supervisor_id = this.authService.UserProfile.id;
			this.checkWorkflow(object);
			this.buildCourseTree(object);
		});
		this.onCreateComplete.subscribe(object => {
			if (this.submitForReview)
				this.review();
		});
		this.onUpdateComplete.subscribe(object => {
			if (this.submitForReview)
				this.review();
		});
	}

	checkWorkflow(object) {
		this.dataAccessService.filter(object, 'SAVE').subscribe(success => {
			this.allowToChangeState = !object.supervisor_id ||
				this.user.IsSuperAdmin ||
				(success && this.user.id != object.supervisor_id);
		});
	}

	buildCourseTree(object) {
		this.startTransaction();
		Group.listCourseGroup(this).subscribe(groups => {
			this.tree = this.treeUtils.buildGroupTree(groups);
			if (object.group_id) {
				this.selectedNode = this.treeUtils.findTreeNode(this.tree, object.group_id);
			}
			this.closeTransaction();
		});
	}

	review() {
		this.startTransaction();
		this.workflowService.createCoursePublishTicket(this, this.object).subscribe(ticket => {
			this.closeTransaction();
		});
	}

	off() {
		this.object.name = this.obj.name;
		this.object.status = this.obj.status;
		this.object.code = this.obj.code;
		this.object.summary = this.obj.summary;
		this.object.description = this.obj.description;
		this.object.author_name = this.obj.author_name;
		this.object.logo = this.obj.logo;
		this.object.group_id = this.obj.selectedNode;
		this.display = false;
	}
}


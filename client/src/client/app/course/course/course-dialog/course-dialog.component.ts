import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { WebSocketService } from '../../../shared/services/socket.service';
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
import { GROUP_CATEGORY, CONTENT_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE, COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants'
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { WorkflowService } from '../../../shared/services/workflow.service';
import { SelectCompetencyLevelDialog } from '../../../shared/components/select-competency-level-dialog/select-competency-level-dialog.component';

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
	private allowToChangeState: boolean;
	private submitForReview: boolean;
	private openTicket: Ticket;

	@ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;
	@ViewChild(SelectCompetencyLevelDialog) competencyLevelDialog: SelectCompetencyLevelDialog;

	constructor(private socketService: WebSocketService, private workflowService: WorkflowService) {
		super();
		this.treeUtils = new TreeUtils();
		this.courseStatus = _.map(CONTENT_STATUS, (val, key) => {
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

	selectCompetencyLevel() {
		this.competencyLevelDialog.show();
		this.competencyLevelDialog.onSelectCompetencyLevel.subscribe(level => {
				this.object.competency_level_id = level.id;
				this.object.competency_level_name = level.name;
				this.object.competency_id = level.competency_id;
				this.object.competency_name = level.competency_name;
		});
	}

	ngOnInit() {
		this.onShow.subscribe(object => {
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
			this.allowToChangeState = !object.supervisor_id ||
				this.user.IsSuperAdmin ||
				( this.user.id != object.supervisor_id);
	}

	buildCourseTree(object) {
		Group.listCourseGroup(this).subscribe(groups => {
			this.tree = this.treeUtils.buildGroupTree(groups);
			if (object.group_id) {
				this.selectedNode = this.treeUtils.findTreeNode(this.tree, object.group_id);
			}
		});
	}

	review() {
		this.workflowService.createCoursePublishTicket(this, this.object).subscribe(ticket => {
		});
	}

}


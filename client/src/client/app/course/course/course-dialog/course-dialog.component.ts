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

@Component({
	moduleId: module.id,
	selector: 'course-dialog',
	templateUrl: 'course-dialog.component.html',
})
export class CourseDialog extends BaseDialog<Course> {

	tree: TreeNode[];
	items: MenuItem[];
	user: User;
	selectedNode: TreeNode;
	courseStatus: SelectItem[];
	treeUtils: TreeUtils;
	dataAccessService: DataAccessService;
	socketService: WebSocketService;
	@ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;
	allowToChangeState : boolean;
	submitForReview: boolean;
	openTicket: Ticket;

	constructor(dataAccessService: DataAccessService, socketService:WebSocketService) {
		super();
		this.dataAccessService = dataAccessService;
		this.socketService =  socketService;
		this.treeUtils = new TreeUtils();
		this.courseStatus = _.map(COURSE_STATUS, (val, key)=> {
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
			if (object.id)
				Ticket.byWorkflowObject(this, object.id, Course.Model).subscribe((ticket)=> {
					this.openTicket =  ticket;
				});
			object.supervisor_id =  this.authService.UserProfile.id;
			this.checkWorkflow(object);
			this.buildCourseTree(object);
		});
		this.onCreateComplete.subscribe(object=> {
			if (this.submitForReview)
				this.review();
		});
		this.onUpdateComplete.subscribe(object=> {
			if (this.submitForReview)
				this.review();
		});
	}

	checkWorkflow(object) {
		this.dataAccessService.filter(object, 'SAVE').subscribe(success=> {
			this.allowToChangeState = !object.supervisor_id || 
			this.user.IsSuperAdmin || 
			(success && this.user.id != object.supervisor_id) ;
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
		var ticket = new Ticket();
		ticket.res_id =  this.object.id;
		ticket.res_model =  Course.Model;
		ticket.content = `Course ${this.object.name} is request to be published`;
		ticket.date_open =  new Date();
		ticket.submit_user_id =  this.user.id;
		ticket.approve_user_id = this.user.supervisor_id;
		ticket.title = 'Course published request';
		this.startTransaction();
		ticket.save(this).subscribe(()=> {
			this.socketService.notify(ticket.title, this.user.supervisor_id,this.authService.CloudAcc.id);
			this.closeTransaction();
		});
	}
}


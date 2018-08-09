import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { User } from '../../../shared/models/elearning/user.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { Course } from '../../../shared/models/elearning/course.model';
import { Ticket } from '../../../shared/models/elearning/ticket.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { SelectItem, MenuItem } from 'primeng/api';
import { GROUP_CATEGORY, COURSE_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE, COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants'
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { WorkflowService } from '../../../shared/services/workflow.service';
import { SelectCompetencyLevelDialog } from '../../../shared/components/select-competency-level-dialog/select-competency-level-dialog.component';
import { WindowRef } from '../../../shared/helpers/windonw.ref';

declare var $: any;

@Component({
	moduleId: module.id,
	selector: 'course-dialog',
	templateUrl: 'course-dialog.component.html',
	styleUrls: ['course-dialog.component.css'],
})
export class CourseDialog extends BaseDialog<Course> {

	WINDOW_HEIGHT: any;
	private tree: TreeNode[];
	private items: MenuItem[];
	private selectedNode: TreeNode;
	private treeUtils: TreeUtils;
	private editor: CourseMember;

	@ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;
	@ViewChild(SelectCompetencyLevelDialog) competencyLevelDialog: SelectCompetencyLevelDialog;

	constructor( ) {
		super();
		this.treeUtils = new TreeUtils();
		this.editor = new CourseMember();
		this.WINDOW_HEIGHT = $(window).height();
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.object.group_id = this.selectedNode.data.id;
			this.object.group_name = this.selectedNode.data.name;
		}
	}

	selectEditor() {
		this.usersDialog.show();
		this.usersDialog.onSelectUsers.first().subscribe(users => {
			if (users.length > 1) {
				this.error(this.translateService.instant('You can select only one editor.'));
				return;
			} else if (users.length == 1) {
				var user = users[0];
				this.editor.user_id = user.id;
				this.editor.name = user.name;
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
				this.object.competency_group_id = level.competency_group_id;
				this.object.competency_group_name = level.competency_group_name;
		});
	}

	ngOnInit() {
		this.onShow.subscribe((object:Course) => {
			if (object.IsNew)  {
				this.editor = new CourseMember();
				object.supervisor_id = this.ContextUser.id;
				object.review_state = this.ContextUser.IsSuperAdmin ?'approved':'initial';
			} else {
				object.courseEditor(this).subscribe(member=> {
					if (!member) {
						this.editor =  new CourseMember();
						this.editor.role = 'editor';
						this.editor.course_id = object.id;
					} else
						this.editor =  member;
				});
			}
			this.buildCourseTree(object);
		});
		this.onCreateComplete.first().subscribe(object => {
			this.editor.role = 'editor';
			this.editor.course_id = object.id;
			this.editor.save(this).subscribe();
		});
		this.onUpdateComplete.subscribe(object => {
			this.editor.save(this).subscribe();
		});
	}

	buildCourseTree(object) {
		Group.listCourseGroup(this).subscribe(groups => {
			this.tree = this.treeUtils.buildGroupTree(groups);
			if (object.group_id) {
				this.selectedNode = this.treeUtils.findTreeNode(this.tree, object.group_id);
			}
		});
	}
}


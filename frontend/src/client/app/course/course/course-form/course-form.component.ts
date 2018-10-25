import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { User } from '../../../shared/models/elearning/user.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
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

const GROUP_FIELDS = ['name', 'category', 'parent_id', 'course_count'];


@Component({
	moduleId: module.id,
	selector: 'course-form',
	templateUrl: 'course-form.component.html',
	styleUrls: ['course-form.component.css'],
})
export class CourseFormComponent extends BaseComponent {

	private tree: TreeNode[];
	private selectedNode: TreeNode;
	private editor: CourseMember;
	private course: Course;

	@ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;
	@ViewChild(SelectCompetencyLevelDialog) competencyLevelDialog: SelectCompetencyLevelDialog;

	constructor(private router: Router, private route: ActivatedRoute) {
		super();
		this.editor = new CourseMember();
		this.course = new Course();
	}

	nodeSelect(event: any) {
		this.selectedNode = event.node;
		if (this.selectedNode) {
			if (this.course.group_id != this.selectedNode.data.id) {
				this.course.group_id = this.selectedNode.data.id;
				this.course.group_name = this.selectedNode.data.name;
			} else {
				this.selectedNode = null;
				this.course.group_id = null;
				this.course.group_name = null;
			}
		}
	}

	nodeUnselect(event: any) {
		this.selectedNode = null;
	}


	selectEditor() {
		this.usersDialog.show();
		this.usersDialog.onSelectUsers.first().subscribe(user => {
			this.editor.user_id = user.id;
			this.editor.name = user.name;
		});
	}

	selectCompetencyLevel() {
		this.competencyLevelDialog.show();
		this.competencyLevelDialog.onSelectCompetencyLevel.subscribe(level => {
			this.course.competency_level_id = level.id;
			this.course.competency_level_name = level.name;
			this.course.competency_id = level.competency_id;
			this.course.competency_name = level.competency_name;
			this.course.competency_group_id = level.competency_group_id;
			this.course.competency_group_name = level.competency_group_name;
		});
	}

	ngOnInit() {
		this.course = this.route.snapshot.data['course'];
		if (this.course.IsNew) {
			this.editor = new CourseMember();
			this.course.supervisor_id = this.ContextUser.id;
			this.course.review_state = this.ContextUser.IsSuperAdmin ? 'approved' : 'initial';
		} else {
			this.course.courseEditor(this).subscribe(member => {
				if (!member) {
					this.editor = new CourseMember();
					this.editor.role = 'editor';
					this.editor.course_id = this.course.id;
				} else
					this.editor = member;
			});
		}
		Group.listCourseGroup(this, GROUP_FIELDS).subscribe(groups => {
			var treeUtils = new TreeUtils();
			this.tree = treeUtils.buildGroupTree(groups);
			if (this.course.group_id) {
				this.selectedNode = treeUtils.findTreeNode(this.tree, this.course.group_id);
			}
		});
	}

	save() {
		if (this.course.description == null) {
			this.course.description = '';
		}
		this.course.save(this).subscribe(() => {
			this.editor.role = 'editor';
			this.editor.course_id = this.course.id;
			this.editor.save(this).subscribe(() => {
				this.router.navigate(['/course/view', this.course.id]);
			});
		});
	}

	cancel() {
		this.router.navigate(['/course/list']);
	}
}


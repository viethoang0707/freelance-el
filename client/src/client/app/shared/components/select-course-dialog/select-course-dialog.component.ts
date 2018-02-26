import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Group } from '../../models/group.model';
import { BaseComponent } from '../base/base.component';
import { Course } from '../../../shared/models/course.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GROUP_CATEGORY, COURSE_STATUS } from '../../../shared/models/constants'
import { SelectItem } from 'primeng/api';

@Component({
	moduleId: module.id,
	selector: 'etraining-select-course-dialog',
	templateUrl: 'select-course-dialog.component.html',
})
export class SelectCoursesDialog extends BaseComponent {

	tree: TreeNode[];
	selectedNode: TreeNode;
	selectedCourses: Course[];
	courses:Course[];
	display: boolean;

	private onSelectCoursesReceiver: Subject<any> = new Subject();
    onSelectCourses:Observable<any> =  this.onSelectCoursesReceiver.asObservable();

	constructor(private treeUtils: TreeUtils) {
		super();
		this.display = false;
		this.selectedCourses = [];
		this.courses = [];
	}

	hide() {
		this.display = false;
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			Course.listByGroup(this,this.selectedNode.data.id).subscribe(courses => {
				this.courses = courses;
			});
		}
	}

	show() {
		this.display = true;
		Group.listByCategory(this, GROUP_CATEGORY.COURSE).subscribe(groups => {
			this.tree = this.treeUtils.buildTree(groups);
		});
	}

	selectCourse() {
		this.onSelectCoursesReceiver.next(this.selectedCourses);
		this.hide();
	}


}


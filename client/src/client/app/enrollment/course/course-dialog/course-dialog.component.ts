import { Component, OnInit, Input} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/group.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { Course } from '../../../shared/models/course.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GROUP_CATEGORY, COURSE_STATUS } from '../../../shared/models/constants'
import {SelectItem} from 'primeng/api';

@Component({
    moduleId: module.id,
    selector: 'etraining-course-dialog',
    templateUrl: 'course-dialog.component.html',
})
export class CourseDialog extends BaseDialog<Course> {

    tree: TreeNode[];
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

	nodeSelect(event:any) {
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


import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { BaseDialog } from '../../components/base/base.dialog';
import { Group } from '../../models/elearning/group.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../helpers/tree.utils';
import { TreeNode } from 'primeng/api';

@Component({
	moduleId: module.id,
	selector: 'group-dialog',
	templateUrl: 'group-dialog.component.html',
	styleUrls: ['group-dialog.component.css'],
})
export class GroupDialog extends BaseDialog<Group> implements OnInit {

	private tree: TreeNode[];
	private treeUtils: TreeUtils;
	private selectedNode: TreeNode;

	constructor() {
		super();
		this.treeUtils = new TreeUtils();
	}

	nodeSelect(event: any) {
		this.selectedNode = event.node;
		if (this.selectedNode) {
			this.object.parent_id = this.selectedNode.data.id;
		}
	}

	nodeUnselect(event: any) {
		this.selectedNode = null;
	}

	ngOnInit() {
		this.onShow.subscribe(object => {
			var subscription = null;
			if (object.category == "course")
				subscription = Group.listCourseGroup(this);
			if (object.category == "organization")
				subscription = Group.listUserGroup(this);
			if (object.category == "question")
				subscription = Group.listQuestionGroup(this);
			if (object.category == "competency")
				subscription = Group.listCompetencyGroup(this);
			if (subscription) {
				
				subscription.subscribe(groups => {
					this.tree = this.treeUtils.buildGroupTree(groups);
					if (object.id) {
						var node = this.treeUtils.findTreeNode(this.tree, object.id);
						node.selectable = false;
					}
					if (object.parent_id) {
						this.selectedNode = this.treeUtils.findTreeNode(this.tree, object.parent_id);
					}
					
				});
			}

		});
	}
}



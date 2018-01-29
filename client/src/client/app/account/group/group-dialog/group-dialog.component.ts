import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { Group } from '../../../shared/models/group.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';

@Component({
	moduleId: module.id,
	selector: 'etraining-group-dialog',
	templateUrl: 'group-dialog.component.html',
})
export class GroupDialog extends BaseDialog<Group> implements OnInit {

	tree: TreeNode[];
    selectedNode: TreeNode;

	constructor(private treeUtils: TreeUtils) {
		super();
	}

	nodeSelect(event:any) {
		if (this.selectedNode) {
			this.object.parent_id = this.selectedNode.data.id;
		}
	}

	ngOnInit() {
		this.onShow.subscribe(object => {
			Group.listUserGroup(this).subscribe(groups => {
				this.tree = this.treeUtils.buildTree(groups);
				if (object.id) {
					var node = this.treeUtils.findTreeNode(this.tree, object.id);
					node.selectable = false;
				}
				if (object.parent_id) {
					this.selectedNode = this.treeUtils.findTreeNode(this.tree, object.parent_id);
				}
			});		
		});
	}

}



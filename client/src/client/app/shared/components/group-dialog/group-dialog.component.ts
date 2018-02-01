import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { BaseDialog } from '../../components/base/base.dialog';
import { Group } from '../../models/group.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../helpers/tree.utils';
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
			Group.listByCategory(this, object.category).subscribe(groups => {
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



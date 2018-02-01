import { Component, OnInit, Input} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/group.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { User } from '../../../shared/models/user.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GROUP_CATEGORY } from '../../../shared/models/constants';


@Component({
    moduleId: module.id,
    selector: 'etraining-user-dialog',
    templateUrl: 'user-dialog.component.html',
})
export class UserDialog extends BaseDialog<User> {

    tree: TreeNode[];
    selectedNode: TreeNode;

	constructor(private treeUtils: TreeUtils) {
		super();
	}

	nodeSelect(event:any) {
		if (this.selectedNode) {
			this.object.etraining_group_id = this.selectedNode.data.id;
		}
	}

	ngOnInit() {
		this.onShow.subscribe(object => {
			Group.listByCategory(this, GROUP_CATEGORY.USER).subscribe(groups => {
				this.tree = this.treeUtils.buildTree(groups);
				if (object.etraining_group_id) {
					this.selectedNode = this.treeUtils.findTreeNode(this.tree, object.etraining_group_id);
				}
			});		
		});
	}


}


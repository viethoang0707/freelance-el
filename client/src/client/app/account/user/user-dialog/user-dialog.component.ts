import { Component, OnInit, Input} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { User } from '../../../shared/models/elearning/user.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GROUP_CATEGORY } from '../../../shared/models/constants';


@Component({
	moduleId: module.id,
	selector: 'user-dialog',
	templateUrl: 'user-dialog.component.html',
})
export class UserDialog extends BaseDialog<User> {

	private tree: TreeNode[];
	private selectedNode: any;
	private treeUtils: TreeUtils;
	startDate: Date;
	endDate: Date;

	constructor() {
		super();
		this.treeUtils = new TreeUtils();
		this.startDate = new Date('1900-01-01');
		this.endDate = new Date('2018-01-01');
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.object.group_id = this.selectedNode.data.id;
			this.object.group_id__DESC__ = this.selectedNode.data.group_id__DESC__;
		}
	}

	ngOnInit() {
		this.onShow.subscribe(object => {
			Group.listUserGroup(this).subscribe(groups => {
				this.tree = this.treeUtils.buildGroupTree(groups);
				if (object.group_id) {
					this.selectedNode = this.treeUtils.findTreeNode(this.tree, object.group_id);
				}
			});
		});
	}


}


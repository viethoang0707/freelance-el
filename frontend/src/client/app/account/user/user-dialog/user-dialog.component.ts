import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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
	private treeUtils: TreeUtils; te;

	constructor() {
		super();
		this.treeUtils = new TreeUtils();
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.object.group_id = this.selectedNode.data.id;
			this.object.group_name = this.selectedNode.data.name;
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

	save() {
		if (!this.object.id) {
			User.searchByLogin(this, this.object.login).subscribe(user => {
				if (user != null) {
					this.error(this.translateService.instant('User exist'));
					return;
				}
				this.object.save(this).subscribe(() => {
					this.hide();
					this.onCreateCompleteReceiver.next(this.object);
				}, (e) => {
					this.error(this.translateService.instant('Operation failed'));
				});

			})

		}
		else {
			this.object.save(this).subscribe(() => {
				this.onUpdateCompleteReceiver.next(this.object);
				this.hide();
			}, (e) => {
				this.error(this.translateService.instant('Operation failed'));
			});
		}
	}


}


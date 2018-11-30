import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GROUP_CATEGORY } from '../../../shared/models/constants';
import * as _ from 'underscore';

const GROUP_FIELDS = ['name', 'category', 'parent_id', 'user_count'];

@Component({
	moduleId: module.id,
	selector: 'user-content',
	templateUrl: 'user-content.component.html',
	styleUrls: ['user-content.component.css'],
})
export class UserContentComponent extends BaseComponent {

	private tree: TreeNode[];
	private selectedNode: any;
	private user: User;

	constructor(private router: Router, private route: ActivatedRoute) {
		super();
		this.user = new User();
	}

	nodeSelect(event: any) {
		this.selectedNode = event.node;
		if (this.selectedNode) {
			if (this.user.group_id != this.selectedNode.data.id) {
				this.user.group_id = this.selectedNode.data.id;
				this.user.group_name = this.selectedNode.data.name;
			} else {
				this.selectedNode = null;
				this.user.group_id = null;
				this.user.group_name = null;
			}
		}
	}

	nodeUnselect(event: any) {
		this.selectedNode = null;
	}

	render(user: User) {
		this.user = user;
		Group.listUserGroup(this, GROUP_FIELDS).subscribe(groups => {
			let treeUtils: TreeUtils = new TreeUtils();
			this.tree = treeUtils.buildGroupTree(groups);
			if (this.user.group_id) {
				this.selectedNode = treeUtils.findTreeNode(this.tree, this.user.group_id);
			}
		});
	}

	isValid() {
		return this.user.login && this.user.name && this.user['password'];
	}


}


import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { AuthService } from '../../services/auth.service';
import { Group } from '../../models/elearning/group.model';
import { BaseComponent } from '../base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GROUP_CATEGORY, CONTENT_STATUS } from '../../../shared/models/constants'
import { SelectItem } from 'primeng/api';

const USER_FIELDS = ['name', 'group_name', 'login', 'banned'];
const GROUP_FIELDS = ['name', 'category', 'parent_id'];

@Component({
	moduleId: module.id,
	selector: 'select-user-dialog',
	templateUrl: 'select-user-dialog.component.html',
	styleUrls: ['select-user-dialog.component.css'],
})
export class SelectUsersDialog extends BaseComponent {

	private tree: TreeNode[];
	private selectedNode: TreeNode;
	private selectedUser: User[];
	private users: User[];
	private display: boolean;
	private treeUtils: TreeUtils;

	private onSelectUsersReceiver: Subject<any> = new Subject();
	onSelectUsers: Observable<any> = this.onSelectUsersReceiver.asObservable();

	constructor() {
		super();
		this.display = false;
		this.selectedUser = null;
		this.treeUtils = new TreeUtils();
	}

	hide() {
		this.display = false;
	}

	nodeSelect(event: any) {
		this.selectedNode = event.node;
		if (this.selectedNode) {
			this.selectedNode.data.listUsers(this, USER_FIELDS).subscribe(users => {
				this.users = users.filter(user => {
					return user.banner != true;
				});
			});
		}
	}

	nodeUnselect(event: any) {
		this.selectedNode = null;
	}

	show() {
		this.display = true;
		this.selectedUser = null;
		Group.listUserGroup(this, GROUP_FIELDS).subscribe(groups => {
			var treeNodes = this.treeUtils.buildGroupTree(groups);
			if (this.ContextUser.IsAdmin) {
				this.tree = treeNodes;
			} else {
				if (this.ContextUser.permission_group_id) {
					this.tree = [this.treeUtils.findTreeNode(treeNodes, this.ContextUser.permission_group_id)];
				} else
					this.tree = [];
			}
		});
	}

	select() {
		this.onSelectUsersReceiver.next(this.selectedUser);
		this.selectedUser = null;
		this.hide();
	}


}


import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { ModelAPIService } from '../../services/api/model-api.service';
import { AuthService } from '../../services/auth.service';
import { Group } from '../../models/elearning/group.model';
import { BaseComponent } from '../base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GROUP_CATEGORY, CONTENT_STATUS } from '../../../shared/models/constants'
import { SelectItem } from 'primeng/api';

const USER_FIELDS = ['name', 'group_name', 'login'];


@Component({
	moduleId: module.id,
	selector: 'select-user-dialog',
	templateUrl: 'select-user-dialog.component.html',
	styleUrls: ['select-user-dialog.component.css'],
})
export class SelectUsersDialog extends BaseComponent {

	private tree: TreeNode[];
	private selectedNode: TreeNode;
	private selectedUsers: User[];
	private users:User[];
	private display: boolean;
	private treeUtils: TreeUtils;

	private onSelectUsersReceiver: Subject<any> = new Subject();
    onSelectUsers:Observable<any> =  this.onSelectUsersReceiver.asObservable();

	constructor() {
		super();
		this.display = false;
		this.selectedUsers = [];
		this.treeUtils = new TreeUtils();
	}

	hide() {
		this.display = false;
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.selectedNode.data.listUsers(this, USER_FIELDS).subscribe(users => {
				this.users = users;
			});
		}
	}

	show() {
		this.display = true;
		this.selectedUsers = [];
		// , GROUP_CATEGORY.USER
		Group.listUserGroup(this).subscribe(groups => {
			this.tree = this.treeUtils.buildGroupTree(groups);
		});
	}

	select() {
		this.onSelectUsersReceiver.next(this.selectedUsers);
		this.selectedUsers=[];
		this.hide();
	}


}


import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Group } from '../../models/elearning/group.model';
import { BaseComponent } from '../base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GROUP_CATEGORY, COURSE_STATUS } from '../../../shared/models/constants'
import { SelectItem } from 'primeng/api';

@Component({
	moduleId: module.id,
	selector: 'select-admin-dialog',
	templateUrl: 'select-admin-dialog.component.html',
})
export class SelectAdminDialog extends BaseComponent {

	tree: TreeNode[];
	selectedNode: TreeNode;
	selectedAdmin: User;
	users:User[];
	display: boolean;
	treeUtils: TreeUtils;

	private onSelectUsersReceiver: Subject<any> = new Subject();
    onSelectUsers:Observable<any> =  this.onSelectUsersReceiver.asObservable();

	constructor() {
		super();
		this.display = false;
		this.treeUtils = new TreeUtils();
	}

	hide() {
		this.display = false;
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			User.listByGroup(this,this.selectedNode.data.id).subscribe(users => {
				this.users = _.filter(users, (user=> {
					return user.is_admin;
				}));
			});
		}
	}

	show() {
		this.display = true;
		this.selectedNode = null;
		this.selectedAdmin = null;
		//, GROUP_CATEGORY.USER
		Group.listUserGroup(this).subscribe(groups => {
			this.tree = this.treeUtils.buildGroupTree(groups);
		});
	}

	select() {
		this.onSelectUsersReceiver.next(this.selectedAdmin);
		this.hide();
	}


}


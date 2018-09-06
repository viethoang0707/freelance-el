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


@Component({
	moduleId: module.id,
	selector: 'user-form',
	templateUrl: 'user-form.component.html',
})
export class UserFormComponent extends BaseComponent {

	private tree: TreeNode[];
	private selectedNode: any;
	private user: User;

	constructor(private router: Router, private route: ActivatedRoute) {
		super();
		this.user = new User();
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.user.group_id = this.selectedNode.data.id;
			this.user.group_name = this.selectedNode.data.name;
		}
	}

	ngOnInit() {
		this.user = this.route.snapshot.data['user'];
		Group.listUserGroup(this).subscribe(groups => {
			let treeUtils: TreeUtils = new TreeUtils();
			this.tree = treeUtils.buildGroupTree(groups);
			if (this.user.group_id) {
				this.selectedNode = treeUtils.findTreeNode(this.tree, this.user.group_id);
			}
		});
	}

	save() {
		if (this.user.IsNew) {
			User.searchByLogin(this, this.user.login).subscribe(user => {
				if (user != null) {
					this.error(this.translateService.instant('User exist'));
					return;
				}
				this.user.save(this).subscribe(() => {
					this.router.navigate(['/account/user/view', this.user.id]);
				});
			})
		}
		else {
			this.user.save(this).subscribe(() => {
				this.router.navigate(['/account/user/view', this.user.id]);
			});
		}
	}

	cancel() {
		if (this.user.IsNew) 
			this.router.navigate(['/account/users']);
		else
			this.router.navigate(['/account/user/view', this.user.id]);
	}
}


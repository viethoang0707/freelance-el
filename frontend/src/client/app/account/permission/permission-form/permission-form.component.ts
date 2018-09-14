import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { Permission } from '../../../shared/models/elearning/permission.model';
import { GROUP_CATEGORY } from '../../../shared/models/constants';
import { SelectMultiUsersDialog } from '../../../shared/components/select-multi-user-dialog/select-multi-user-dialog.component';
import { MenuService } from '../../../shared/services/menu.service';
import * as _ from 'underscore';

const USER_FIELDS = ['name', 'email', 'login', 'position', 'permission_id', 'gender', 'dob', 'group_id', 'group_name']
const GROUP_FIELDS = ['name', 'category', 'parent_id', 'child_ids'];

@Component({
	moduleId: module.id,
	selector: 'permission-form',
	templateUrl: 'permission-form.component.html',
})
export class PermissionFormComponent extends BaseComponent {

	private tree: TreeNode[];
	private selectedNodes: any;
	private permission: Permission;
	private users: User[];
	private addUsers: User[];
	private deleteUsers: User[];
	private selectedUsers: any;
	private menuTree: TreeNode[];
	private selectedMenus: TreeNode[];

	@ViewChild(SelectMultiUsersDialog) usersDialog: SelectMultiUsersDialog;

	constructor(private router: Router, private route: ActivatedRoute, private menuService: MenuService) {
		super();
		this.permission = new Permission();
	}

	groupNodeChange(event: any) {
		if (this.selectedNodes) {
			this.permission.user_group_ids = _.map(this.selectedNodes, node => {
				return node["data"]["id"];
			});
		}
	}

	menuNodeSelect(event: any) {
		var menuCodes = _.map(this.selectedMenus, menuNode => {
			return menuNode["data"];
		});
		this.permission.menu_access = JSON.stringify(menuCodes);
	}

	ngOnInit() {
		this.addUsers = [];
		this.deleteUsers = [];
		this.selectedNodes = [];
		this.permission = this.route.snapshot.data['permission'];
		Group.listUserGroup(this, GROUP_FIELDS).subscribe(groups => {
			let treeUtils: TreeUtils = new TreeUtils();
			this.tree = treeUtils.buildGroupTree(groups);
			this.selectedNodes = _.map(this.permission.user_group_ids, groupId => {
				return treeUtils.findTreeNode(this.tree, groupId);
			});
		});
		this.loadMembers();
		this.loadMenus()
	}

	addMember() {
		this.usersDialog.show();
		this.usersDialog.onSelectUsers.first().subscribe(users => {
			User.populateArray(this, users, USER_FIELDS).subscribe(() => {
				_.each(users, (user: User) => {
					this.users.push(user);
					this.addUsers.push(user);
					this.deleteUsers = _.reject(this.deleteUsers, (obj: User) => {
						return obj.id == user.id;
					});
				});
			})
		});
	}

	deleteMember(users: User[]) {
		this.confirm(this.translateService.instant('Are you sure to remove ?'), () => {
			_.each(users, (user: User) => {
				this.users = _.reject(this.users, (obj: User) => {
					return obj.id == user.id;
				});
				this.addUsers = _.reject(this.addUsers, (obj: User) => {
					return obj.id == user.id;
				});
				this.deleteUsers.push(user);
			});
		});
	}

	loadMenus() {
		this.menuTree = this.menuService.menuToTree(this.menuService.adminMenu());
		this.menuTree.forEach((tree: any) => {
			tree.label = this.translateService.instant(tree.label);
			if (tree.children.length > 0) {
				tree.children.forEach((child: any) => {
					child.label = this.translateService.instant(child.label);
				});
			}
		});
		this.selectedMenus = [];
		var menuCodes = []
		if (this.permission.menu_access)
			menuCodes = JSON.parse(this.permission.menu_access);
		_.each(menuCodes, ((code: string) => {
			var menuNode = this.menuService.findMenuTreeNode(this.menuTree, code);
			if (menuNode)
				this.selectedMenus.push(menuNode);
		}));
	}

	loadMembers() {
		this.permission.listUsers(this, USER_FIELDS).subscribe(users => {
			this.users = [...users];
		});
	}

	save() {
		this.permission.save(this).subscribe(() => {
			_.each(this.addUsers, (user: User) => {
				user.permission_id = this.permission.id;
			});
			_.each(this.deleteUsers, (user: User) => {
				user.permission_id = null;
			});
			var udpateUsers = this.addUsers.concat(this.deleteUsers);
			User.updateArray(this, udpateUsers).subscribe(() => {
				this.router.navigate(['/account/permission/view', this.permission.id]);
			});
		});
	}

	cancel() {
		if (this.permission.IsNew)
			this.router.navigate(['/account/permissions']);
		else
			this.router.navigate(['/account/permission/view', this.permission.id]);
	}
}


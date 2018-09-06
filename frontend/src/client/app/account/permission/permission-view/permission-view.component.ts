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
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { MenuService } from '../../../shared/services/menu.service';
import * as _ from 'underscore';

const USER_FIELDS = ['name', 'email', 'login', 'position', 'permission_id', 'gender', 'dob', 'group_id', 'group_name']


@Component({
	moduleId: module.id,
	selector: 'permission-view',
	templateUrl: 'permission-view.component.html',
})
export class PermissionViewComponent extends BaseComponent {

	private tree: TreeNode[];
	private selectedNode: any;
	private permission: Permission;
	private users: User[];
	private selectedUsers: any;
	private menuTree: TreeNode[];
	private selectedMenus: TreeNode[];

	@ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;

	constructor(private router: Router, private route: ActivatedRoute, private menuService: MenuService) {
		super();
		this.permission = new Permission();
	}

	groupNodeSelect(event: any) {
		if (this.selectedNode) {
			this.permission.user_group_id = this.selectedNode.data.id;
			this.permission.user_group_name = this.selectedNode.data.name;
		}
	}

	menuNodeSelect(event: any) {
		var menuCodes = _.map(this.selectedMenus, menuNode => {
			return menuNode["data"];
		});
		this.permission.menu_access = JSON.stringify(menuCodes);
	}

	ngOnInit() {
		this.permission = this.route.snapshot.data['permission'];
		Group.listUserGroup(this).subscribe(groups => {
			let treeUtils: TreeUtils = new TreeUtils();
			this.tree = treeUtils.buildGroupTree(groups);
			if (this.permission.user_group_id) {
				this.selectedNode = treeUtils.findTreeNode(this.tree, this.permission.user_group_id);
			}
		});
		this.loadMembers();
		this.loadMenus()
	}

	addMember() {
		this.usersDialog.show();
		this.usersDialog.onSelectUsers.first().subscribe(users => {
			_.each(users, (user: User) => {
				user.permission_id = this.permission.id;
			});
			User.updateArray(this, users, USER_FIELDS).subscribe(() => {
				this.loadMembers();
				this.success('Add member successfully');
			});
		});
	}

	deleteMember(users: User[]) {
		this.confirm('Are you sure to remove ?', () => {
			_.each(users, (user: User) => {
				user.permission_id = null;
			});
			User.updateArray(this, users, USER_FIELDS).subscribe(() => {
				this.loadMembers();
				this.success(this.translateService.instant('Delete member successfully'));
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

	editPermission() {
		this.permission.save(this).subscribe(() => {
			this.router.navigate(['/account/permission/form', this.permission.id]);
		});
	}

	close() {
			this.router.navigate(['/account/permissions']);
	}
}


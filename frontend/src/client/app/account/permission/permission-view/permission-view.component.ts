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
const GROUP_FIELDS = ['name'];

@Component({
	moduleId: module.id,
	selector: 'permission-view',
	templateUrl: 'permission-view.component.html',
})
export class PermissionViewComponent extends BaseComponent {

	private permission: Permission;
	private users: User[];
	private menuTree: TreeNode[];
	private selectedMenus: TreeNode[];
	private managedGroups: string;

	@ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;

	constructor(private router: Router, private route: ActivatedRoute, private menuService: MenuService) {
		super();
		this.permission = new Permission();
	}

	
	ngOnInit() {
		this.permission = this.route.snapshot.data['permission'];
		this.loadMembers();
		this.loadMenus();
		this.loadGroups();
	}

	
	loadMenus() {
		this.menuTree = this.menuService.menuToTree(this.menuService.adminMenu());
		this.menuTree.forEach((tree: any) => {
			tree.label = this.translateService.instant(tree.label);
			if (tree.children.length > 0) {
				_.each(tree.children, child => {
					child["label"] = this.translateService.instant(child["label"]);
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

	loadGroups() {
		this.permission.listGroups(this, GROUP_FIELDS).subscribe(groups => {
			var names = _.pluck(groups, 'name');
			this.managedGroups = names.join(',');
		});
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


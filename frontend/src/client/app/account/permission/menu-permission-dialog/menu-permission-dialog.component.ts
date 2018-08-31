import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../shared/services/auth.service';
import { MenuService } from '../../../shared/services/menu.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { Permission } from '../../../shared/models/elearning/permission.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GROUP_CATEGORY } from '../../../shared/models/constants';


@Component({
	moduleId: module.id,
	selector: 'menu-permission-dialog',
	templateUrl: 'menu-permission-dialog.component.html',
})
export class MenuPermissionDialog extends BaseDialog<Permission> implements OnInit {

	private menuTree: TreeNode[];
	private selectedMenus: TreeNode[];

	constructor(private menuService: MenuService) {
		super();
	}

	nodeSelect(event: any) {
		var menuCodes = _.map(this.selectedMenus, menuNode => {
			return menuNode["data"];
		});
		this.object.menu_access = JSON.stringify(menuCodes);
	}

	ngOnInit() {
		this.menuTree = this.menuService.menuToTree(this.menuService.adminMenu());
		console.log('menuTree:', this.menuTree);
		this.menuTree.forEach((tree: any) => {
			tree.label = this.translateService.instant(tree.label);
			if (tree.children.length > 0) {
				tree.children.forEach((child: any) => {
					child.label = this.translateService.instant(child.label);
				});
			}
		});
		this.onShow.subscribe(() => {
			this.selectedMenus = [];
			var menuCodes = this.object.menu_access;
			if (!menuCodes)
				menuCodes = [];
			else
				menuCodes = JSON.parse(menuCodes);
			_.each(menuCodes, ((code: string) => {
				var menuNode = this.menuService.findMenuTreeNode(this.menuTree, code);
				if (menuNode)
					this.selectedMenus.push(menuNode);
			}));
		});
	}
}


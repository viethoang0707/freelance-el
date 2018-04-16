import { Component, OnInit, Input} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
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
export class MenuPermissionDialog extends BaseDialog<Permission> {

    tree: TreeNode[];
    selectedNode: TreeNode;

	constructor() {
		super();
	}

	nodeSelect(event:any) {
		if (this.selectedNode) {
			this.object.etraining_group_id = this.selectedNode.data.id;
		}
	}

	ngOnInit() {
		
	}


}


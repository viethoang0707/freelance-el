import { Component, OnInit, Input} from '@angular/core';
import { Observable}     from 'rxjs/Observable';

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
    selector: 'permission-dialog',
    templateUrl: 'permission-dialog.component.html',
})
export class PermissionDialog extends BaseDialog<Permission> {

	constructor() {
		super();
	}
}


import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { USER_STATUS, GROUP_CATEGORY } from '../../../shared/models/constants'
import { Permission } from '../../../shared/models/elearning/permission.model';
import { Group } from '../../../shared/models/elearning/group.model';

import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';

@Component({
    moduleId: module.id,
    selector: 'permission-user-list',
    templateUrl: 'permission-list.component.html',
    styleUrls: ['permission-list.component.css'],
})
export class PermissionListComponent extends BaseComponent {



    tree: TreeNode[];
    selectedPermission: Permission;
    permissions: Permission[];
    filterGroups: Group[];
    selectedGroupNodes: TreeNode[];

    constructor(private treeUtils: TreeUtils) {
        super();
        this.filterGroups = [];
    }

    ngOnInit() {
        Group.listByCategory(this,GROUP_CATEGORY.USER).subscribe(groups => {
            this.tree = this.treeUtils.buildTree(groups);
        });
        // this.loadPermission();
        this.permissions = 
        [
            
        ];
    }

    // loadPermission() {
    //     Permission.all(this).subscribe(permissions => {
    //         this.permissions = permissions;
    //     });
    // }

    


}

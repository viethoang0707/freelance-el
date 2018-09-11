import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { AuthService } from '../../../shared/services/auth.service';
import { USER_STATUS, GROUP_CATEGORY } from '../../../shared/models/constants'
import { Permission } from '../../../shared/models/elearning/permission.model';
import { SelectGroupDialog } from '../../../shared/components/select-group-dialog/select-group-dialog.component';
import { Group } from '../../../shared/models/elearning/group.model';
import { User } from '../../../shared/models/elearning/user.model';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'permission-list',
    templateUrl: 'permission-list.component.html',
    styleUrls: ['permission-list.component.css'],
})
export class PermissionListComponent extends BaseComponent {

    private selectedPermission: Permission;
    private permissions: Permission[];

    constructor(private router: Router, private route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.loadPermission();
    }

    loadPermission() {
        Permission.all(this).subscribe(permissions => {
            this.permissions = permissions;
        });
    }

    addPermission() {
        this.router.navigate(['/account/permission/form']);
    }

    editPermission(permission:Permission) {
        this.router.navigate(['/account/permission/form', permission.id]);
    }

    viewPermission(permission:Permission) {
        this.router.navigate(['/account/permission/view', permission.id]);
    }

    deletePermission(permission: Permission) {
        if (permission.user_count)
            this.error(this.translateService.instant('You cannot delete permission assigned to other uers'))
        else {
            this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
                permission.delete(this).subscribe(() => {
                    this.permissions = _.reject(this.permissions, (perm:Permission)=> {
                        return perm.id == permission.id;
                    });
                    this.selectedPermission =  null;
                    this.success(this.translateService.instant('Delete permission successfully'));
                })
            });
        }
    }

}

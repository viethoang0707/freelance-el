import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Permission } from '../../../shared/models/elearning/permission.model';
import { User } from '../../../shared/models/elearning/user.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Http, Response } from '@angular/http';
import { DEFAULT_DATE_LOCALE, EXAM_STATUS, EXAM_MEMBER_ROLE, EXAM_MEMBER_STATUS } from '../../../shared/models/constants'
import { SelectItem, MenuItem } from 'primeng/api';
import * as _ from 'underscore';
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { Subscription } from 'rxjs/Subscription';
import { BaseModel } from '../../../shared/models/base.model';

const USER_FIELDS = ['name','email','login','position','permission_id', 'gender', 'dob', 'group_id', 'group_name']

@Component({
	moduleId: module.id,
	selector: 'member-permission-dialog',
	templateUrl: 'member-permission-dialog.component.html',
})
export class MemberPermissionDialog extends BaseComponent {

	private display: boolean;
    private users: User[];
    private selectedUsers: any;
    private permission: Permission;

    @ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;

	constructor() {
		super();
	}

	show(permission: Permission) {
		this.display = true;
		this.permission = permission;
        this.loadMembers();
	}

	hide() {
		this.display = false;
	}


    addMember() {
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.first().subscribe(users => {
            var updateApi = _.map(users, (user: User) => {
                user.permission_id = this.permission.id;
                return user.__api__update(USER_FIELDS);
            });
            BaseModel.bulk_update(this, ...updateApi).subscribe(() => {
                this.loadMembers();
            });
        });
    }

    deleteMember(users:User[]) {
        this.confirm('Are you sure to remove ?', () => {
            _.each(users, (user: User) => {
                user.permission_id = null;
            });
            User.updateArray(this, users,USER_FIELDS).subscribe(() => {
                this.loadMembers();
            });
        });
    }

    loadMembers() {
        User.listByPermission(this, this.permission.id,USER_FIELDS).subscribe(users => {
            this.users = users;
        });
    }
}


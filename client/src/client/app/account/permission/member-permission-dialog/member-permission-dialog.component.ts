import { Component, OnInit, Input,ViewChild} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Permission } from '../../../shared/models/elearning/permission.model';
import { User } from '../../../shared/models/elearning/user.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Http, Response } from '@angular/http';
import { DEFAULT_DATE_LOCALE, EXAM_STATUS, EXAM_MEMBER_ROLE, EXAM_MEMBER_STATUS } from '../../../shared/models/constants'
import {SelectItem, MenuItem} from 'primeng/api';
import * as _ from 'underscore';
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
	moduleId: module.id,
	selector: 'member-permission-dialog',
	templateUrl: 'member-permission-dialog.component.html',
})
export class MemberPermissionDialog extends BaseComponent {

	display: boolean;
    users: User[];
    selectedUsers: any;
    permission: Permission;

    @ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;
	
	constructor() {
		super();
	}

	show(permission:Permission) {
		this.display = true;
		this.permission = permission;
        this.loadMembers();
	}

	hide() {
		this.display = false;
	}


	 addMember() {
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.subscribe(users => {
            var subscriptions = [];
            _.each(users, (user:User)=> {
                user.permission_id =  this.permission.id;
                subscriptions.push(user.save(this));
            });
            Observable.forkJoin(...subscriptions).subscribe(()=> {
                this.loadMembers();
            });
        });
    }

    deleteMember() {
        if (this.selectedUsers && this.selectedUsers.length)
            this.confirm('Are you sure to remove ?', () => {
                var subscriptions = _.map(this.selectedUsers,(user:User) => {
                    user.permission_id = null;
                    return user.save(this);
                });
                Observable.forkJoin(...subscriptions).subscribe(()=> {
                    this.selectedUsers = [];
                    this.loadMembers();
                });
            });
    }

    loadMembers() {
        this.startTransaction();
        User.listByPermission(this, this.permission.id).subscribe(users => {
             this.users = users;
             this.closeTransaction();
        });
    }
}


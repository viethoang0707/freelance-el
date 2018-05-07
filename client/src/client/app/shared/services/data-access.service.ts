import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Credential } from '../models/credential.model';
import { User } from '../models/elearning/user.model';
import { CloudAccount } from '../models/cloud/cloud-account.model';
import { MapUtils } from '../helpers/map.utils';
import { TranslateService } from '@ngx-translate/core';
import { BaseModel } from '../models/base.model';
import { AuthService } from './auth.service';
import { APIService } from './api.service';
import { Permission } from '../models/elearning/permission.model';
import { Group } from '../models/elearning/group.model';
import * as _ from 'underscore';

@Injectable()
export class DataAccessService {

	private userGroups: Group[];

    constructor(private authService: AuthService, private apiService:APIService) {
    	this.userGroups = [];
    	this.getUserGroups().subscribe(groups=> {
    		this.userGroups =  groups;
    	});
    }

    checkPermission(record:BaseModel, method:string):boolean {
    	if (this.authService.UserProfile.IsSuperAdmin)
    		return true;
    	if (record.Model == User.Model) {
    		var userAccess = new UserAccess(this.authService.UserPermission, this.userGroups);
    		return userAccess.checkPermission(record as User,method);
    	} else
    		return true;
    }

    private getUserGroups():Observable<any> {
    	if (this.userGroups.length)
    		return Observable.of(this.userGroups);
    	else{
    		var model = Group.Model;
        	var cloud_acc = this.authService.CloudAcc;
	        return this.apiService.search(model, [], "[('category','=','organization')]", cloud_acc.id, cloud_acc.api_endpoint).map(items => {
	            return _.map(items, (item)=> {
	               return  MapUtils.deserializeModel(model, item);
	            });
	        });
	    }
    }
}

export interface IAccessible<T extends BaseModel> {
    checkPermission(record:T, method:string):boolean
}

class UserAccess implements IAccessible<User> {

	private perm: Permission;
	private groups: Group[];

	constructor( perm: Permission, groups: Group[]) {
		this.perm =  perm;
		this.groups = groups;
    }

	checkPermission(record:User, method:string):boolean {
		if (!record.group_id)
			return true;
		if (!this.perm.user_group_id)
			return false;
		let userGroup:Group = _.find(this.groups, (obj=> {
			return obj.id == record.group_id;
		}));
		while (userGroup) {
			if (userGroup.id == this.perm.user_group_id)
				return true;
			userGroup = this.findParentGroup(userGroup);
		}
		return false;
	}

	findParentGroup(group: Group) {
		if (!group.parent_id)
			return null;
		return _.find(this.groups, (obj=> {
			return obj.id == group.parent_id;
		}));
	}
}


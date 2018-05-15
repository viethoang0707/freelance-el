import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Credential } from '../models/credential.model';
import { User } from '../models/elearning/user.model';
import { Course } from '../models/elearning/course.model';
import { CourseSyllabus } from '../models/elearning/course-syllabus.model';
import { CloudAccount } from '../models/cloud/cloud-account.model';
import { MapUtils } from '../helpers/map.utils';
import { TranslateService } from '@ngx-translate/core';
import { BaseModel } from '../models/base.model';
import { AuthService } from './auth.service';
import { APIService } from './api.service';
import { TreeUtils } from '../helpers/tree.utils';
import { Permission } from '../models/elearning/permission.model';
import { Group } from '../models/elearning/group.model';
import * as _ from 'underscore';

@Injectable()
export class DataAccessService {

	private cacheUserGroups: Group[];
	private cacheAdminUsers: User[];

    constructor(private authService: AuthService, private apiService:APIService) {
    	this.cacheUserGroups = [];
    	this.cacheAdminUsers = [];
    }

    filter(record:BaseModel, method:string):Observable<any> {
    	if (this.authService.UserProfile.IsSuperAdmin)
    		return Observable.of(true);
    	if (record.Model == User.Model) {
    		return this.getUserGroups().map((groups)=> {
    			var userAccess = new UserAccess(this.authService.UserPermission, groups);
    			return userAccess.checkPermission(record as User,method);
    		});
    	} 
    	if (record.Model == Group.Model) {
    		var groupAccess = new GroupAccess();
    		return Observable.of(groupAccess.checkPermission(record as Group,method));
    	}
    	if (record.Model == Course.Model) {
    		return this.getAdminUsers().map((users)=> {
    			var treeUtils = new TreeUtils();
    			var adminTree = treeUtils.buildApprovalTree(users);
    			var courseAccess = new CourseAccess(adminTree,this.authService.UserProfile);
    			return courseAccess.checkPermission(record as Course,method);
    		});
    	} 
    	return Observable.of(true);
    }

    private getUserGroups():Observable<any> {
    	if (this.cacheUserGroups.length)
    		return Observable.of(this.cacheUserGroups);
    	else{
    		var model = Group.Model;
        	var cloud_acc = this.authService.CloudAcc;
	        return this.apiService.search(model, [], "[('category','=','organization')]", cloud_acc.id, cloud_acc.api_endpoint).map(items => {
	            return _.map(items, (item)=> {
	               this.cacheUserGroups = MapUtils.deserializeModel(model, item);
	               return this.cacheUserGroups;
	            });
	        });
	    }
    }

    private getAdminUsers():Observable<any> {
    	if (this.cacheAdminUsers.length)
    		return Observable.of(this.cacheAdminUsers);
    	else{
    		var model = User.Model;
        	var cloud_acc = this.authService.CloudAcc;
	        return this.apiService.search(model, [], "[('is_admin','=',True)]", cloud_acc.id, cloud_acc.api_endpoint).map(items => {
	            return _.map(items, (item)=> {
	               this.cacheAdminUsers = MapUtils.deserializeModel(model, item);
	               return this.cacheAdminUsers;
	            });
	        });
	    }
    }
}

export interface IAccessible<T extends BaseModel> {
    checkPermission(record:T, method:string):boolean
}

export class UserAccess implements IAccessible<User> {

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

export class GroupAccess implements IAccessible<Group> {

	constructor() {
    }

	checkPermission(record:Group, method:string):boolean {
		if (record.category =='organization' && (method == 'SAVE' || method == 'DELETE')) {
			return false;
		}
		return true;
	}
}

export class CourseAccess implements IAccessible<Course> {

	private adminTree: any;
	private userNode:any;
	private treeUtils: TreeUtils;

	constructor( adminTree, user:User) {
		this.treeUtils = new TreeUtils();
		this.adminTree =  adminTree;
		this.userNode = this.treeUtils.findTreeNode(this.adminTree, user.id);	
    }

	checkPermission(record:Course, method:string):boolean {
		if (!record.supervisor_id)
			return true;
		if (method == 'SAVE' || method == 'DELETE') {
			var courseAdminNode = this.treeUtils.findTreeNode(this.adminTree, record.supervisor_id);
			while(courseAdminNode) {
				if (courseAdminNode.data.id == this.userNode.data.id)
					return true;
				courseAdminNode = this.treeUtils.findTreeNode(this.adminTree, courseAdminNode.data.supervisor_id);
			}
		}
		return true;
	}
}


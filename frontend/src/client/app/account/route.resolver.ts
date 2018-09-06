import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router,Resolve, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { APIService} from '../shared/services/api.service';
import { AuthService } from '../shared/services/auth.service';
import { APIContext } from '../shared/models/context';
import { User } from '../shared/models/elearning/user.model';
import { Group } from '../shared/models/elearning/group.model';
import { Setting } from '../shared/models/elearning/setting.model';
import { Permission } from '../shared/models/elearning/permission.model';

@Injectable()
export class UserResolve implements Resolve<User>,APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

  resolve(route: ActivatedRouteSnapshot) {
  	if (route.paramMap.get('userId'))
    	return User.get(this,+route.paramMap.get('userId') );
    else
    	return Observable.of(new User());
  }
}

@Injectable()
export class PermissionResolve implements Resolve<Permission>,APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

  resolve(route: ActivatedRouteSnapshot) {
  	if (route.paramMap.get('permissionId'))
    	return Permission.get(this,+route.paramMap.get('permissionId') );
    else
    	return Observable.of(new Permission());
  }
}

@Injectable()
export class GroupsResolve implements Resolve<Group[]>,APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

  resolve(route: ActivatedRouteSnapshot) {
    	return Group.listUserGroup(this,['id','code']);
  }
}

@Injectable()
export class DateFormatResolve implements Resolve<Setting>,APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

  resolve(route: ActivatedRouteSnapshot) {
    	return Setting.dateFormat(this);
  }
}
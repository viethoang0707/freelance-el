import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { APIService } from '../services/api.service';

import { APIContext } from '../models/context';
import { CourseMember } from '../models/elearning/course-member.model';
import * as _ from 'underscore';
import { LMSProfileService } from '../services/lms-profile.service';

@Injectable()
export class SyllabusGuard implements CanActivate, APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private lmsService: LMSProfileService, private router: Router) {
		this.apiService = apiService;
		this.authService = authService;
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		var courseId = route.params.courseId;
		if (!courseId )
			return Observable.of(false);
		return this.lmsService.init(this)
			.map(() => {
				var roles = this.lmsService.getCourseMemberRoles(courseId);
				return  roles.includes('editor') || roles.includes('supervisor');
			}).catch(() => {
				return Observable.of(false);
			});
	}
}
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ModelAPIService } from '../services/api/model-api.service';
import { APIContext } from '../models/context';
import { CourseMember } from '../models/elearning/course-member.model';
import * as _ from 'underscore';

@Injectable()
export class SyllabusGuard implements CanActivate, APIContext {

	apiService: ModelAPIService;
	authService: AuthService;

	constructor(apiService: ModelAPIService, authService: AuthService, private lmsService: LMSService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		var courseId = route.params.courseId;
		var memberId = route.params.memberId;
		if (!courseId || !memberId)
			return Observable.of(false);
		return this.lmsService.init(this)
		.map(members=> {
			var courseMembers = this.lmsService.MyCourseMember;
            var member = _.find(courseMembers, (obj:CourseMember)=> {
                return obj.course_id == courseId && obj.id == memberId && ( obj.role == 'editor' ||  obj.role == 'supervisor' );
            });
            return member != null;
        }).catch(() => {
            return Observable.of(false);
        });
	}
}
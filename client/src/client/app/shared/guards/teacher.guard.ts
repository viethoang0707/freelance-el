import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ModelAPIService } from '../services/api/model-api.service';
import { APIContext } from '../models/context';
import { CourseMember } from '../models/elearning/course-member.model';
import * as _ from 'underscore';

@Injectable()
export class TeacherGuard implements CanActivate, APIContext {

	apiService: ModelAPIService;
	authService: AuthService;

	constructor(apiService: ModelAPIService, authService: AuthService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		var courseId = route.params.courseId;
		if (!courseId)
			return Observable.of(false);
		return CourseMember.byCourseAndUser(this, this.authService.UserProfile.id, courseId)
		.map(members=> {
			if (members.length ==0)
                return false;
            var member = _.find(members, (obj:CourseMember)=> {
                return obj.role == 'teacher' && obj.status == 'active';
            });
            return member != null;
        }).catch(() => {
            return Observable.of(false);
        });
	}
}

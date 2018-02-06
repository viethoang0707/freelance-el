import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { APIService } from '../services/api.service';
import { APIContext } from '../models/context';
import { CourseMember } from '../models/course-member.model';

@Injectable()
export class TeacherGuard implements CanActivate, APIContext {

	apiService: APIService;
	authService: AuthService;
	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		var courseId = route.params.courseId;
		if (!courseId)
			return Observable.of(false);
		return CourseMember.byCourseAndUser(this, this.authService.CurrentUser.id, courseId)
		.map((member:CourseMember) => {
            if (member && member.role=='teacher') {
                return true;
            } else
            	return false;
        }).catch(() => {
            return Observable.of(false);
        });
	}
}

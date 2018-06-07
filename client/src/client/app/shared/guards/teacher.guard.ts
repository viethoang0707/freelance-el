import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { APIService } from '../services/api.service';
import { APIContext } from '../models/context';
import { CourseMember } from '../models/elearning/course-member.model';
import { DataAccessService } from '../services/data-access.service';
import * as _ from 'underscore';

@Injectable()
export class TeacherGuard implements CanActivate, APIContext {

	apiService: APIService;
	authService: AuthService;
	dataAccessService: DataAccessService;

	constructor(apiService: APIService, authService: AuthService,  dataAccessService: DataAccessService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
		this.dataAccessService = dataAccessService;
		this.cacheService = cacheService;
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

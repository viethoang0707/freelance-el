import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { APIService } from '../shared/services/api.service';
import { AuthService } from '../shared/services/auth.service';
import { APIContext } from '../shared/models/context';
import { Course } from '../shared/models/elearning/course.model';
import { CourseClass } from '../shared/models/elearning/course-class.model';
import { Group } from '../shared/models/elearning/group.model';
import { Competency } from '../shared/models/elearning/competency.model';

@Injectable()
export class CourseResolve implements Resolve<Course>, APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService = apiService;
		this.authService = authService;
	}

	resolve(route: ActivatedRouteSnapshot) {
		if (route.paramMap.get('courseId'))
			return Course.get(this, +route.paramMap.get('courseId'));
		else
			return Observable.of(new Course());
	}
}

@Injectable()
export class CourseClassResolve implements Resolve<CourseClass>, APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService = apiService;
		this.authService = authService;
	}

	resolve(route: ActivatedRouteSnapshot) {
		if (route.paramMap.get('classId'))
			return CourseClass.get(this, +route.paramMap.get('classId'));
		else
			return Observable.of(new CourseClass());
	}
}
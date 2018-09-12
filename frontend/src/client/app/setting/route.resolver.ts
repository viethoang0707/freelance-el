import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { APIService } from '../shared/services/api.service';
import { AuthService } from '../shared/services/auth.service';
import { APIContext } from '../shared/models/context';
import { Course } from '../shared/models/elearning/course.model';
import { CourseClass } from '../shared/models/elearning/course-class.model';
import { Mail } from '../shared/models/elearning/mail.model';
import { Competency } from '../shared/models/elearning/competency.model';

@Injectable()
export class TemplateResolve implements Resolve<Mail>, APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService = apiService;
		this.authService = authService;
	}

	resolve(route: ActivatedRouteSnapshot) {
		if (route.paramMap.get('templateId'))
			return Mail.get(this, +route.paramMap.get('templateId'));
		else
			return Observable.of(new Mail());
	}
}


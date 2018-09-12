import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { APIService } from '../shared/services/api.service';
import { AuthService } from '../shared/services/auth.service';
import { APIContext } from '../shared/models/context';
import { Course } from '../shared/models/elearning/course.model';
import { CourseClass } from '../shared/models/elearning/course-class.model';
import { Survey } from '../shared/models/elearning/survey.model';
import { Conference } from '../shared/models/elearning/conference.model';
import { Exam } from '../shared/models/elearning/exam.model';
import { CourseMember } from '../shared/models/elearning/course-member.model';
import { Project } from '../shared/models/elearning/project.model';

@Injectable()
export class ConferenceeResolve implements Resolve<Conference>, APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService = apiService;
		this.authService = authService;
	}

	resolve(route: ActivatedRouteSnapshot) {
		return Conference.get(this, +route.paramMap.get('conferenceId'));
	}
}

@Injectable()
export class CourseResolve implements Resolve<Course>, APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService = apiService;
		this.authService = authService;
	}

	resolve(route: ActivatedRouteSnapshot) {
		return Course.get(this, +route.paramMap.get('courseId'));
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
		return CourseClass.get(this, +route.paramMap.get('classId'));
	}
}


@Injectable()
export class ExamResolve implements Resolve<Exam>, APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService = apiService;
		this.authService = authService;
	}

	resolve(route: ActivatedRouteSnapshot) {
		return Exam.get(this, +route.paramMap.get('examId'));

	}
}

@Injectable()
export class SurveyResolve implements Resolve<Survey>, APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService = apiService;
		this.authService = authService;
	}

	resolve(route: ActivatedRouteSnapshot) {
		return Survey.get(this, +route.paramMap.get('surveyId'));

	}
}

@Injectable()
export class ProjectResolve implements Resolve<Project>, APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService = apiService;
		this.authService = authService;
	}

	resolve(route: ActivatedRouteSnapshot) {
		return Project.get(this, +route.paramMap.get('projectId'));

	}
}

@Injectable()
export class CourseMemberResolve implements Resolve<CourseMember>, APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService = apiService;
		this.authService = authService;
	}

	resolve(route: ActivatedRouteSnapshot) {
		return CourseMember.get(this, +route.paramMap.get('memberId'));

	}
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router,Resolve, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { APIService} from '../shared/services/api.service';
import { AuthService } from '../shared/services/auth.service';
import { APIContext } from '../shared/models/context';
import { Exam } from '../shared/models/elearning/exam.model';
import { Survey } from '../shared/models/elearning/survey.model';
import { Group } from '../shared/models/elearning/group.model';
import { Question } from '../shared/models/elearning/question.model';
import { Course } from '../shared/models/elearning/course.model';
import { CourseSyllabus } from '../shared/models/elearning/course-syllabus.model';
import { QuestionSheet } from '../shared/models/elearning/question-sheet.model';
import { SurveySheet } from '../shared/models/elearning/survey-sheet.model';

@Injectable()
export class CourseResolve implements Resolve<Course>,APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

  resolve(route: ActivatedRouteSnapshot) {
  	if (route.paramMap.get('courseId'))
    	return Course.get(this,+route.paramMap.get('courseId') );
    else
    	return Observable.of(new Course());
  }
}

@Injectable()
export class CourseSyllabusResolve implements Resolve<CourseSyllabus>,APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

  resolve(route: ActivatedRouteSnapshot) {
  	if (route.paramMap.get('sylId'))
    	return CourseSyllabus.get(this,+route.paramMap.get('sylId') );
    else
    	return Observable.of(new CourseSyllabus());
  }
}


@Injectable()
export class ExamResolve implements Resolve<Exam>,APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

  resolve(route: ActivatedRouteSnapshot) {
  	if (route.paramMap.get('examId'))
    	return Exam.get(this,+route.paramMap.get('examId') );
    else
    	return Observable.of(new Exam());
  }
}

@Injectable()
export class QuestionSheetResolve implements Resolve<QuestionSheet>,APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

  resolve(route: ActivatedRouteSnapshot) {
  	if (route.paramMap.get('sheetId'))
    	return QuestionSheet.get(this,+route.paramMap.get('sheetId') );
    else
    	return Observable.of(new QuestionSheet());
  }
}


@Injectable()
export class SurveyResolve implements Resolve<Survey>,APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

  resolve(route: ActivatedRouteSnapshot) {
  	if (route.paramMap.get('surveyId'))
    	return Survey.get(this,+route.paramMap.get('surveyId') );
    else
    	return Observable.of(new Survey());
  }
}

@Injectable()
export class SurveySheetResolve implements Resolve<SurveySheet>,APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

  resolve(route: ActivatedRouteSnapshot) {
  	if (route.paramMap.get('sheetId'))
    	return SurveySheet.get(this,+route.paramMap.get('sheetId') );
    else
    	return Observable.of(new SurveySheet());
  }
}
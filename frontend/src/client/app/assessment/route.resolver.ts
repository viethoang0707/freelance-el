import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router,Resolve, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { APIService} from '../shared/services/api.service';
import { AuthService } from '../shared/services/auth.service';
import { APIContext } from '../shared/models/context';
import { Exam } from '../shared/models/elearning/exam.model';
import { Survey } from '../shared/models/elearning/survey.model';
import { Setting } from '../shared/models/elearning/setting.model';
import { Permission } from '../shared/models/elearning/permission.model';

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

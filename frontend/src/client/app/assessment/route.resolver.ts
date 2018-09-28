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
    else {
      var exam = new Exam();
      exam.is_public = true;
    	return Observable.of(exam);
    }
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
    else {
      var survey = new Survey();
      survey.is_public = true;
    	return Observable.of(survey);
    }
  }
}



@Injectable()
export class QuestionResolve implements Resolve<Question>,APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

  resolve(route: ActivatedRouteSnapshot) {
  	if (route.paramMap.get('questionId'))
    	return Question.get(this,+route.paramMap.get('questionId') );
    else if (route.paramMap.get('type')) {
    	var question = new Question();
    	question.type =  route.paramMap.get('type');
    	return Observable.of(question);
    } else 
    	return Observable.of(new Question());
  }
}


@Injectable()
export class GroupsResolve implements Resolve<Group[]>,APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

  resolve(route: ActivatedRouteSnapshot) {
      return Group.listQuestionGroup(this,['id','code']);
  
  }
}

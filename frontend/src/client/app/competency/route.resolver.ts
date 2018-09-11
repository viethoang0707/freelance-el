import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router,Resolve, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { APIService} from '../shared/services/api.service';
import { AuthService } from '../shared/services/auth.service';
import { APIContext } from '../shared/models/context';
import { Exam } from '../shared/models/elearning/exam.model';
import { Survey } from '../shared/models/elearning/survey.model';
import { Group } from '../shared/models/elearning/group.model';
import { Competency } from '../shared/models/elearning/competency.model';

@Injectable()
export class CompetencyResolve implements Resolve<Competency>,APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

  resolve(route: ActivatedRouteSnapshot) {
  	if (route.paramMap.get('competencyId'))
    	return Competency.get(this,+route.paramMap.get('competencyId') );
    else
    	return Observable.of(new Competency());
  }
}
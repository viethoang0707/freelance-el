import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { APIService } from '../services/api.service';
import { APIContext } from '../models/context';
import { SurveyMember } from '../models/elearning/survey-member.model';
import { Survey } from '../models/elearning/survey.model';

@Injectable()
export class SurveySupervisorGuard implements CanActivate, APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		var surveyId = route.params.surveyId;
		if (!surveyId)
			return Observable.of(false);
		return Survey.get(this, surveyId)
		.map((s:Survey) => {
            if (s && s.supervisor_id==this.authService.UserProfile.id) {
                return true;
            } else
            	return false;
        }).catch(() => {
            return Observable.of(false);
        });
	}
}

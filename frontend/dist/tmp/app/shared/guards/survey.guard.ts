import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ModelAPIService } from '../services/api/model-api.service';
import { APIContext } from '../models/context';
import { SurveyMember } from '../models/elearning/survey-member.model';
import * as _ from 'underscore';
import { LMSProfileService } from '../services/lms-profile.service';

@Injectable()
export class SurveyGuard implements CanActivate, APIContext {

	apiService: ModelAPIService;
	authService: AuthService;

	constructor(apiService: ModelAPIService, authService: AuthService, private lmsService: LMSProfileService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		var surveyId = route.params.surveyId;
		var memberId = route.params.memberId;
		if (!surveyId || !memberId)
			return Observable.of(false);
		return this.lmsService.init(this)
		.map(()=> {
			var member = this.lmsService.surveyMemberById(memberId);
            return member != null && ( member.role == 'editor' ||  member.role == 'supervisor' );
        }).catch(() => {
            return Observable.of(false);
        });
	}
}
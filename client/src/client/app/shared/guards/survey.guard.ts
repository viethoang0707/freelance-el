import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ModelAPIService } from '../services/api/model-api.service';
import { APIContext } from '../models/context';
import { SurveyMember } from '../models/elearning/survey-member.model';
import * as _ from 'underscore';
import { LMSService } from '../services/lms.service';

@Injectable()
export class SurveyGuard implements CanActivate, APIContext {

	apiService: ModelAPIService;
	authService: AuthService;

	constructor(apiService: ModelAPIService, authService: AuthService, private lmsService: LMSService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		var surveyId = route.params.surveyId;
		var memberId = route.params.memberId;
		if (!surveyId || !memberId)
			return Observable.of(false);
		return this.lmsService.init(this)
		.map(members=> {
			var surveyMembers = this.lmsService.MySurveyMember;
            var member = _.find(surveyMembers, (obj:SurveyMember)=> {
                return obj.survey_id == surveyId && obj.id == memberId && ( obj.role == 'editor' ||  obj.role == 'supervisor' );
            });
            return member != null;
        }).catch(() => {
            return Observable.of(false);
        });
	}
}
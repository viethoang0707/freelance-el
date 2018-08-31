import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { APIService } from '../services/api.service';

import { APIContext } from '../models/context';
import { ExamMember } from '../models/elearning/exam-member.model';
import * as _ from 'underscore';
import { LMSProfileService } from '../services/lms-profile.service';

@Injectable()
export class ExamGuard implements CanActivate, APIContext {

	apiService: APIService;
	authService: AuthService;

	constructor(apiService: APIService, authService: AuthService, private lmsService: LMSProfileService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		var examId = route.params.examId;
		var memberId = route.params.memberId;
		if (!examId || !memberId)
			return Observable.of(false);
		return this.lmsService.init(this)
		.map(()=> {
			var member = this.lmsService.examMemberById(memberId);
            return member != null && ( member.role == 'editor' ||  member.role == 'supervisor' );
        }).catch(() => {
            return Observable.of(false);
        });
	}
}
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ModelAPIService } from '../services/api/model-api.service';
import { APIContext } from '../models/context';
import { ExamMember } from '../models/elearning/exam-member.model';
import * as _ from 'underscore';

@Injectable()
export class ExamGuard implements CanActivate, APIContext {

	apiService: ModelAPIService;
	authService: AuthService;

	constructor(apiService: ModelAPIService, authService: AuthService, private lmsService: LMSService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		var examId = route.params.examId;
		var memberId = route.params.memberId;
		if (!examId || !memberId)
			return Observable.of(false);
		return this.lmsService.init(this)
		.map(members=> {
			var examMembers = this.lmsService.MyExamMember;
            var member = _.find(examMembers, (obj:ExamMember)=> {
                return obj.exam_id == examId && obj.id == memberId && ( obj.role == 'editor' ||  obj.role == 'supervisor' );
            });
            return member != null;
        }).catch(() => {
            return Observable.of(false);
        });
	}
}
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ModelAPIService } from '../services/api/model-api.service';
import { APIContext } from '../models/context';
import { ExamMember } from '../models/elearning/exam-member.model';

@Injectable()
export class ExamSupervisorGuard implements CanActivate, APIContext {

	apiService: ModelAPIService;
	authService: AuthService;

	constructor(apiService: ModelAPIService, authService: AuthService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		var examId = route.params.examId;
		if (!examId)
			return Observable.of(false);
		return ExamMember.byExamAndUser(this, this.authService.UserProfile.id, examId)
		.map((member:ExamMember) => {
            if (member && member.role=='supervisor') {
                return true;
            } else
            	return false;
        }).catch(() => {
            return Observable.of(false);
        });
	}
}

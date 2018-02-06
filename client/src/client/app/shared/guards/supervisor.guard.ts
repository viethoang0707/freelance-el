import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { APIService } from '../services/api.service';
import { APIContext } from '../models/context';
import { ExamMember } from '../models/exam-member.model';

@Injectable()
export class SupervisorGuard implements CanActivate, APIContext {

	apiService: APIService;
	authService: AuthService;
	constructor(apiService: APIService, authService: AuthService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		var examId = route.params.examId;
		if (!examId)
			return Observable.of(false);
		return ExamMember.byExamAndUser(this, this.authService.CurrentUser.id, examId)
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

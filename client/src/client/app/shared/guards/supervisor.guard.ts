import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataAccessService } from '../services/data-access.service';
import { APIService } from '../services/api.service';
import { APIContext } from '../models/context';
import { ExamMember } from '../models/elearning/exam-member.model';
import { CacheService } from '../services/cache.service';

@Injectable()
export class SupervisorGuard implements CanActivate, APIContext {

	apiService: APIService;
	authService: AuthService;
	dataAccessService: DataAccessService;
	cacheService: CacheService;

	constructor(apiService: APIService, authService: AuthService,  dataAccessService: DataAccessService, cacheService: CacheService, private router: Router) {
		this.apiService =  apiService;
		this.authService = authService;
		this.dataAccessService = dataAccessService;
		this.cacheService =  cacheService;
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

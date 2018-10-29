import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Config } from './env.config';
import './operators';
import { BaseComponent } from './shared/components/base/base.component';
import { DEFAULT_LANG } from './shared/models/constants';
import { UserLog } from './shared/models/elearning/log.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './shared/models/elearning/user.model';

@Component({
	moduleId: module.id,
	selector: 'app',
	template: `<div class="spinner" [hidden]="!loading"></div>
				<router-outlet></router-outlet>`
})
export class AppComponent extends BaseComponent implements OnInit {

	constructor(private router: Router) {
		super();
		console.log('Environment config', Config);
		this.translateService.setDefaultLang(DEFAULT_LANG);
		this.translateService.use(this.settingService.Lang);
		this.apiService.onTokenExpired.first().subscribe(() => {
			this.warn(this.translateService.instant('Your token has been expired'));
			this.authService.logout();
			this.router.navigate(['/auth']);
		});
		this.apiService.onLogout.first().subscribe(() => {
			UserLog.logout(this, this.ContextUser.id).subscribe();
			this.authService.logout();
			this.router.navigate(['/auth']);
		});
		this.apiService.onLogin.first().subscribe((user: User) => {
			UserLog.login(this, user.id).subscribe();
			this.success(`Hello ${user.name}`)
			this.settingService.ViewMode = user.IsAdmin ? 'admin' : 'lms';
		});
		this.apiService.onUnauthorizedAccess.first().subscribe(() => {
			this.error(this.translateService.instant('Access denied. You must login again!'));
			this.authService.logout();
		});
	}

	ngOnInit() {
	}
}
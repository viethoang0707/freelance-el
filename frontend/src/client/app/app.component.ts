import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Config } from './env.config';
import './operators';
import { BaseComponent } from './shared/components/base/base.component';
import { DEFAULT_LANG } from './shared/models/constants';
import { AppEventManager } from './shared/services/app-event-manager.service';
import { UserLog } from './shared/models/elearning/log.model';
import { ActivatedRoute, Router } from '@angular/router';

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
	}

	ngOnInit() {
	}
}
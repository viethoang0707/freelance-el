import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/models/elearning/user.model';
import { LANGS } from '../../shared/models/constants';
import { HomeEventManager } from '../home-manager.service';
import { HomeComponent } from '../home.component';
import { LangService } from '../../shared/services/lang.service';
import { CacheService } from '../../shared/services/cache.service';
import { SelectItem } from 'primeng/primeng';
import { BaseComponent } from '../../shared/components/base/base.component';
import * as _ from 'underscore'

@Component({
	moduleId: module.id,
	selector: 'app-navbar',
	templateUrl: 'navbar.component.html',
})
export class NavbarComponent extends BaseComponent implements OnInit {

	user: User;
	langs: SelectItem[];
	viewModes: SelectItem[];
	viewMode: string;
	@Input() selectedLang: string;
	@Input() adminMode: boolean;

	constructor(private router:Router, private parent:HomeComponent, private eventManager: HomeEventManager) {
		super();
		this.langs = _.map(LANGS, (val, key)=> {
			return { label: val, value: key};
		});
		this.selectedLang = this.langService.Lang;
		this.viewModes = [
			{label: this.translateService.instant('Administrator mode'), value:'admin'},
			{label: this.translateService.instant('Learning mode'), value:'lms'},
		];
	}

	ngOnInit() {
		this.user = this.authService.UserProfile;
		this.viewMode = this.settingService.ViewMode;
	}

	changeLang($event: any ) {
		this.langService.Lang = $event.value;
	}

	selectLang($event: any) {
		this.langService.Lang = $event.value;
	}

	setViewMode($event:any) {
		this.settingService.ViewMode = $event.value;
		this.router.navigate(['/dashboard']);
	}
}



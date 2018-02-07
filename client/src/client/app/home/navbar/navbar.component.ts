import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { HomeEventManager } from '../home-manager.service';
import { HomeComponent } from '../home.component';
import { LangService } from '../../shared/services/lang.service';
import { SelectItem } from 'primeng/primeng';
import { BaseComponent } from '../../shared/components/base/base.component';


@Component({
	moduleId: module.id,
	selector: 'etraining-navbar',
	templateUrl: 'navbar.component.html',
})
export class NavbarComponent extends BaseComponent implements OnInit {

	user: User;
	langs: SelectItem[];
	@Input() selectedLang: string;
	isAdmin: boolean;
	viewMode: boolean;

	constructor(private langService: LangService,private parent:HomeComponent, private eventManager: HomeEventManager) {
		super();
		this.langs = [
			{ label: 'English', value: 'gb' },
			{ label: 'Vietnamese', value: 'vn' }
		];
		this.selectedLang = this.langService.Lang
		this.isAdmin = this.authService.CurrentUser.is_admin || this.authService.CurrentUser.login == 'admin';
		this.viewMode = this.isAdmin;
	}

	ngOnInit() {
		this.user = this.authService.CurrentUser;
	}

	selectLang($event: any) {
		this.langService.Lang = $event.value;
	}
}



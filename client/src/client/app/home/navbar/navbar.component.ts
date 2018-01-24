import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { HomeEventManager } from '../home-manager.service';
import { HomeComponent } from '../home.component';
import { LangService } from '../../shared/services/lang.service';
import {SelectItem} from 'primeng/primeng';
import { BreadcrumbService } from '../breadcumb/breadcrumb.service';

@Component({
	moduleId: module.id,
	selector: 'etraining-navbar',
	templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnInit {

	user: User;
	langs: SelectItem[];
	@Input() selectedLang: string;

	constructor(public eventManager: HomeEventManager, private langService: LangService,
		private auth: AuthService, private parent: HomeComponent, private breadcrumbService: BreadcrumbService) {
		this.langs = [
            {label: 'English', value: 'gb'},
            {label: 'Vietnamese', value: 'vn'}
        ];
        this.selectedLang = this.langService.Lang 

	}

	ngOnInit() {
		this.user = this.auth.CurrentUser;
	}

	selectLang($event:any) {
		this.langService.Lang = $event.value;
	}
}



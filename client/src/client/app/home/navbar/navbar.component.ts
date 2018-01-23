import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { HomeEventManager } from '../home-manager.service';
import { HomeComponent } from '../home.component';
import { LangService } from '../../shared/services/lang.service';
import {SelectItem} from 'primeng/primeng';

@Component({
	moduleId: module.id,
	selector: 'etraining-navbar',
	templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnInit {

	user: User;
	langs: SelectItem[];
	@Input() selectedLang: SelectItem;

	constructor(public eventManager: HomeEventManager, private langService: LangService,
		private auth: AuthService, private parent: HomeComponent) {
		this.langs = [
            {label: 'English', value: 'gb'},
            {label: 'Vietnamese', value: 'vn'}
        ];
        if (this.langService.Lang == 'vn')
        	this.selectedLang = this.langs[1];
        else
        	this.selectedLang = this.langs[0];
	}

	ngOnInit() {
		this.user = this.auth.CurrentUser;
	}

	selectLang($event:any) {
		this.langService.Lang = $event.value;
	}
}



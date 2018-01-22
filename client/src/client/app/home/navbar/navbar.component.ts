import { Component, OnInit } from '@angular/core';
import { APIService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { HomeEventManager } from '../home-manager.service';
import { HomeComponent } from '../home.component';
import { SelectItem } from 'primeng/primeng';
/**
 * This class represents the navigation bar component.
 */
@Component({
	moduleId: module.id,
	selector: 'etraining-navbar',
	templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnInit {

	user: User;
	langs: SelectItem[];
	selectedLang: string;

	constructor(public eventManager: HomeEventManager,
		private auth: AuthService, private parent: HomeComponent) {
 this.langs = [
            { label: 'Vietnamese', value: 'vn' },
            { label: 'English', value: 'gb' }
        ];
		 }

	ngOnInit() {
		this.user = this.auth.CurrentUser;
	}
}



import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/models/elearning/user.model';
import { Token } from '../../shared/models/cloud/token.model';
import { LANGS } from '../../shared/models/constants';
import { HomeEventManager } from '../home-manager.service';
import { HomeComponent } from '../home.component';
import { SettingService } from '../../shared/services/setting.service';
import { SelectItem } from 'primeng/primeng';
import { BaseComponent } from '../../shared/components/base/base.component';
import * as _ from 'underscore'
import { Course } from '../../shared/models/elearning/course.model';
import { CourseMember } from '../../shared/models/elearning/course-member.model';
import { BaseModel } from '../../shared/models/base.model';

@Component({
	moduleId: module.id,
	selector: 'app-navbar',
	templateUrl: 'navbar.component.html',
	styleUrls: ['navbar.component.css'],
})
export class NavbarComponent extends BaseComponent implements OnInit {

	private notifs: Notification[];
	private userCount: any;
	private studentCount: any;
	private teacherCount: any;
	private courseCount: any;
	private user: User;
	@Input() lang: string;
	@Input() viewMode: string;

	constructor(private router: Router, private parent: HomeComponent,
		private eventManager: HomeEventManager) {
		super();
		this.lang = this.translateService.currentLang;
		this.notifs = [];
		this.viewMode = this.ContextUser.IsAdmin ? 'admin' : 'lms';
		this.user = new User();
	}

	ngOnInit() {
		this.viewMode = this.settingService.ViewMode;
		if (this.viewMode == 'admin')
			this.loadStats();
		this.user = this.ContextUser;
	}

	loadStats() {
		BaseModel
			.bulk_count(this,
				User.__api__countAll(),
				Course.__api__countAll(),
				CourseMember.__api__countTeacher(),
				CourseMember.__api__countStudent(),
				User.__api__countAllAdmin())
			.map(jsonArray => {
				return _.flatten(jsonArray);
			})
			.subscribe((counts) => {
				this.userCount = counts[0];
				this.courseCount = counts[1];
				this.teacherCount = counts[2];
				this.studentCount = counts[0] - counts[4];
			});
	}

	setLang(lang: string) {
		this.lang = lang;
		this.settingService.Lang = lang;
		this.translateService.use(lang);
	}

	setViewMode(mode) {
		this.viewMode = mode;
		this.settingService.ViewMode = mode;
		if (this.viewMode == 'admin')
			this.router.navigate(['/dashboard/admin']);
		else
			this.router.navigate(['/dashboard/lms']);
	}
}



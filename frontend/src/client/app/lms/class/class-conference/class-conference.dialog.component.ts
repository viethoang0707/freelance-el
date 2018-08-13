import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';

import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Conference } from '../../../shared/models/elearning/conference.model';
import { ConferenceMember } from '../../../shared/models/elearning/conference-member.model';
import { SelectItem } from 'primeng/api';
import { BaseModel } from '../../../shared/models/base.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'class-conference-dialog',
	templateUrl: 'class-conference.dialog.component.html',
})
export class ClassConferenceDialog extends BaseComponent {

	private display: boolean;
	private courseClass: CourseClass;
	private members: ConferenceMember[];
	private conference: Conference;

	constructor() {
		super();
		this.display = false;
		this.courseClass = new CourseClass();
		this.members = [];
		this.conference = new Conference();
	}

	show(courseClass: CourseClass) {
		this.display = true;
		this.courseClass = courseClass;
		if (courseClass.status == 'open') {
			Conference.get(this, courseClass.conference_id).subscribe(confernece => {
				this.conference = confernece;
				this.conference.listMembers(this).subscribe(members=> {
					this.members =  members;
				});
			});
		} else {
			this.members = [];
			this.conference = new Conference();
		}
	}

	hide() {
		this.display = false;
	}

	openConference() {
		this.conference.open(this).subscribe(() => {
			this.info(this.translateService.instant('Conference open'));
			this.conference.listMembers(this).subscribe(members=> {
					this.members =  members;
				});
		});
	}


	closeConference() {
		this.conference.close(this).subscribe(() => {
			this.info(this.translateService.instant('Conference closed'));
			this.conference.listMembers(this).subscribe(members=> {
					this.members =  members;
				});
		});
	}

	activateMember(member:ConferenceMember) {
		member.is_active =  true;
		member.save(this).subscribe();
	}

	deactivateMember(member:ConferenceMember) {
		member.is_active =  false;
		member.save(this).subscribe();
	}
}


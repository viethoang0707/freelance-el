import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { CourseClass } from '../../../shared/models/course-class.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { SelectItem, MenuItem } from 'primeng/api';
import { CourseMemberDialog } from '../../member-dialog/member-dialog.component';
import { DEFAULT_DATE_LOCALE, GROUP_CATEGORY, COURSE_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE, COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants'
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { Course } from '../../../shared/models/course.model';
import { CourseMember } from '../../../shared/models/course-member.model';


@Component({
	moduleId: module.id,
	selector: 'etraining-class-dialog',
	templateUrl: 'class-dialog.component.html',
})
export class CourseClassDialog extends BaseDialog<CourseClass> implements OnInit {

	rangeDates: Date[];
	locale:any;
	processing: boolean;
	selectedMember: CourseMember;
	members: CourseMember[];
	items: MenuItem[];
	@ViewChild(CourseMemberDialog) memberDialog: CourseMemberDialog;
	@ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;

	COURSE_MODE = COURSE_MODE;
	COURSE_STATUS = COURSE_STATUS;
	COURSE_MEMBER_ROLE = COURSE_MEMBER_ROLE;
	COURSE_MEMBER_STATUS = COURSE_MEMBER_STATUS;
	COURSE_MEMBER_ENROLL_STATUS = COURSE_MEMBER_ENROLL_STATUS;


	constructor(private treeUtils: TreeUtils, private http: Http) {
		super();
		this.locale = DEFAULT_DATE_LOCALE;
	}

	ngOnInit() {
		this.onShow.subscribe(object => {
			if (object.start && object.end) {
				this.rangeDates = [new Date(object.start), new Date(object.end)];
			}
			var lang = this.translateService.currentLang;
			this.http.get(`/assets/i18n/calendar.${lang}.json`)
            .subscribe((res: Response) => {
            	this.locale = res.json();
            });
            this.loadMembers();
			this.items = [
				{ label: this.translateService.instant('Student'), command: () => { this.add('student') } },
				{ label: this.translateService.instant('Student'), command: () => { this.add('student') } }
			];
		});
	}

	onDateSelect($event) {
		if (this.rangeDates[0] && this.rangeDates[1]) {
			this.object.start = this.rangeDates[0];
			this.object.end = this.rangeDates[1];
		}
	}

	add(role: string) {
		var self = this;
		this.usersDialog.show();
		this.usersDialog.onSelectUsers.subscribe(users => {
			this.processing = true;
			var subscriptions = [];
			_.each(users, function(user) {
				var member = new CourseMember();
				member.class_id = self.object.id;
				member.role = role;
				member.course_id = self.object.id;
				member.user_id = user.id;
				member.status = 'active';
				member.enroll_status = 'registered';
				member.date_register = new Date();
				subscriptions.push(member.save(self));
			});
			Observable.forkJoin(...subscriptions).subscribe(() => {
				this.processing = false;
				this.loadMembers();
			});
		});
	}

	edit() {
		if (this.selectedMember)
			this.memberDialog.show(this.selectedMember);
	}

	delete() {
		if (this.selectedMember)
			this.confirmationService.confirm({
				message: this.translateService.instant('Are you sure to delete ?'),
				accept: () => {
					this.selectedMember.data.delete(this).subscribe(() => {
						this.loadMembers();
					})
				}
			});
	}

	loadMembers() {
		if (this.object.id)
			CourseMember.listByClass(this, this.object.id).subscribe(members => {
				this.members = members;
			});
		else
			this.members = [];
	}
}



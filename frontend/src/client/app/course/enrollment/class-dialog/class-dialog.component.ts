import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../shared/services/auth.service';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { SelectItem, MenuItem } from 'primeng/api';
import { DEFAULT_DATE_LOCALE, GROUP_CATEGORY, CONTENT_STATUS, CLASS_STATUS, COURSE_MEMBER_ROLE, COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants'
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { Course } from '../../../shared/models/elearning/course.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';


@Component({
	moduleId: module.id,
	selector: 'class-dialog',
	templateUrl: 'class-dialog.component.html',
})
export class CourseClassDialog extends BaseDialog<CourseClass> implements OnInit {

	CLASS_STATUS = CLASS_STATUS;

	private rangeDates: Date[];
	private locale:any;
	private processing: boolean;
	private selectedMember: CourseMember;
	private members: CourseMember[];
	private items: MenuItem[];
	private treeUtils: TreeUtils;
	
	@ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;

	constructor( private http: Http) {
		super();
		this.locale = DEFAULT_DATE_LOCALE;
		this.treeUtils = new TreeUtils();
	}

	ngOnInit() {
		this.onShow.subscribe((object:CourseClass) => {
			if (object.IsNew)
				this.rangeDates = [];
			if (object.start && object.end) {
				this.rangeDates = [object.start,object.end];
			}
			var lang = this.translateService.currentLang;
			this.http.get(`/assets/i18n/calendar.${lang}.json`)
            .subscribe((res: Response) => {
            	this.locale = res.json();
            });
		});
	}

	onDateSelect($event) {
		if (this.rangeDates[0] && this.rangeDates[1]) {
			this.object.start = this.rangeDates[0];
			this.object.end = this.rangeDates[1];
		}
	}
}



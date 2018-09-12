import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { BaseComponent } from '../../../shared/components/base/base.component';
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
	selector: 'class-form',
	templateUrl: 'class-form.component.html',
})
export class CourseClassFormComponent extends BaseComponent implements OnInit {

	private rangeDates: Date[];
	private locale: any;
	private courseClass: CourseClass;

	constructor(private http: Http, private router: Router, private route: ActivatedRoute) {
		super();
		this.locale = DEFAULT_DATE_LOCALE;
		this.courseClass = new CourseClass();
	}

	ngOnInit() {
		this.courseClass = this.route.snapshot.data['courseClass'];
		this.route.params.subscribe(params => {
       this.courseClass.course_id = +params['courseId'];
    });
		if (this.courseClass.IsNew)
			this.rangeDates = [];
		if (this.courseClass.start && this.courseClass.end) {
			this.rangeDates = [this.courseClass.start, this.courseClass.end];
		}
		var lang = this.translateService.currentLang;
		this.http.get(`/assets/i18n/calendar.${lang}.json`)
			.subscribe((res: Response) => {
				this.locale = res.json();
			});
	}

	onDateSelect($event) {
		if (this.rangeDates[0] && this.rangeDates[1]) {
			this.courseClass.start = this.rangeDates[0];
			this.courseClass.end = this.rangeDates[1];
		}
	}

	save() {
		this.courseClass.save(this).subscribe(() => {
			this.router.navigate(['/course/class/view', this.courseClass.id]);
		});
	}

	cancel() {
		this.router.navigate(['/course/class/list', this.courseClass.course_id]);
	}
}



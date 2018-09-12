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
	selector: 'class-view',
	templateUrl: 'class-view.component.html',
})
export class CourseClassViewComponent extends BaseComponent implements OnInit {

	private courseClass: CourseClass;

	constructor(private http: Http, private router: Router, private route: ActivatedRoute) {
		super();
		this.courseClass = new CourseClass();
	}

	ngOnInit() {
		this.courseClass = this.route.snapshot.data['courseClass'];
	}

	editClass() {
		this.courseClass.save(this).subscribe(() => {
			this.router.navigate(['/course/class/form', this.courseClass.course_id, this.courseClass.id]);
		});
	}

	close() {
		this.router.navigate(['/course/class/list', this.courseClass.course_id]);
	}
}



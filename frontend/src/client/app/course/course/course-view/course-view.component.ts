import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { User } from '../../../shared/models/elearning/user.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Course } from '../../../shared/models/elearning/course.model';
import { Ticket } from '../../../shared/models/elearning/ticket.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { SelectItem, MenuItem } from 'primeng/api';
import { GROUP_CATEGORY, COURSE_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE, COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants'

@Component({
	moduleId: module.id,
	selector: 'course-view',
	templateUrl: 'course-view.component.html',
	styleUrls: ['course-view.component.css'],
})
export class CourseViewComponent extends BaseComponent {
	COURSE_MODE = COURSE_MODE;
	private editor: CourseMember;
	private course: Course;


	constructor(private router: Router, private route: ActivatedRoute) {
		super();
		this.editor = new CourseMember();
		this.course = new Course();
	}


	ngOnInit() {
		this.course = this.route.snapshot.data['course'];
		this.course.courseEditor(this).subscribe(member => {
			if (member) 
				this.editor = member;
		});

	}

	editCourse() {
		this.router.navigate(['/course/form', this.course.id]);
	}

	close() {
		this.router.navigate(['/course/list']);
	}
}


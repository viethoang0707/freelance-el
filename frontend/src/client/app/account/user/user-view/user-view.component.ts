import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import { EXAM_MEMBER_ENROLL_STATUS, GENDER, COURSE_MEMBER_ROLE, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants';
import { CertificatePrintDialog } from '../../../lms/course/certificate-print/certificate-print.dialog.component';
import { BaseModel } from '../../../shared/models/base.model';
import { Achivement } from '../../../shared/models/elearning/achievement.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { ExamGrade } from '../../../shared/models/elearning/exam-grade.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Certificate } from '../../../shared/models/elearning/course-certificate.model';
import * as _ from 'underscore';
import { UserViewContentComponent } from './user-content.component';

const COURSE_MEMBER_FIELDS = ['course_name', 'role', 'enroll_status', 'date_register'];
const EXAM_MEMBER_FIELDS = ['exam_name', 'grade', 'enroll_status', 'date_register', 'status', 'exam_id', 'role'];


@Component({
	moduleId: module.id,
	selector: 'user-view',
	templateUrl: 'user-view.component.html',
})
export class UserViewComponent extends BaseComponent implements OnInit{


	@ViewChild(UserViewContentComponent) viewContent: UserViewContentComponent;

	private user: User;


	constructor(private router: Router, private route: ActivatedRoute) {
		super();
		this.user = new User();
	}

	ngOnInit() {
		this.user = this.route.snapshot.data['user'];
		this.viewContent.render(this.user);
	}


	editUser() {
		this.router.navigate(['/account/user/form', this.user.id]);
	}

	close() {
		this.router.navigate(['/account/users']);
	}


}


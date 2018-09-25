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
import { UserViewContentComponent } from './user-content.component';
import { UserFormDialog } from '../user-form/user-form-dialog.component';
import * as _ from 'underscore';


@Component({
	moduleId: module.id,
	selector: 'user-view-dialog',
	templateUrl: 'user-view.dialog.component.html',
})
export class UserViewDialogComponent extends BaseComponent{

	@ViewChild(UserFormDialog) formDialog: UserFormDialog;
	@ViewChild(UserViewContentComponent) viewContent: UserViewContentComponent;

	private user: User;
	private display: boolean;

	constructor(private router: Router, private route: ActivatedRoute) {
		super();
		this.user = new User();
	}

	show(user:User) {
		this.display = true;
		this.user = user;
		this.viewContent.render(this.user);
	}

	editUser() {
		this.formDialog.show(this.user);
		if (this.user.id == this.ContextUser.id)
			this.formDialog.onUpdateComplete.subscribe(()=> {
				this.authService.UserProfile =  this.user;
			});
	}

	close() {
		this.display = false;
	}


}


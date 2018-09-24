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

const COURSE_MEMBER_FIELDS = ['course_name', 'role', 'enroll_status', 'date_register'];
const EXAM_MEMBER_FIELDS = ['exam_name', 'grade', 'enroll_status', 'date_register', 'status', 'exam_id', 'role'];


@Component({
	moduleId: module.id,
	selector: 'user-view-content',
	templateUrl: 'user-content.component.html',
	styleUrls: ['user-content.component.css'],
})
export class UserViewContentComponent extends BaseComponent {

	GENDER = GENDER;
	EXAM_MEMBER_ENROLL_STATUS=EXAM_MEMBER_ENROLL_STATUS;
	COURSE_MEMBER_ENROLL_STATUS = COURSE_MEMBER_ENROLL_STATUS;
	
	@ViewChild(CertificatePrintDialog) certPrintDialog: CertificatePrintDialog;

	private user: User;
	private courseMembers: CourseMember[];
	private examMembers: ExamMember[];
	private certificates: Certificate[];
	private skills: Achivement[];

	constructor(private router: Router, private route: ActivatedRoute) {
		super();
		this.user = new User();
	}

	render(user:User) {
		this.user = user;
		this.courseMembers = [];
		this.skills = [];
		this.examMembers = [];
		BaseModel
			.bulk_search(this,
				User.__api__listCourseMembers(this.user.id, COURSE_MEMBER_FIELDS),
				User.__api__listCertificates(this.user.id),
				User.__api__listAchivements(this.user.id),
				User.__api__listExamMembers(this.user.id, EXAM_MEMBER_FIELDS))
			.subscribe((jsonArr) => {
				this.courseMembers = CourseMember.toArray(jsonArr[0]);
				this.certificates = Certificate.toArray(jsonArr[1]);
				this.skills = Achivement.toArray(jsonArr[2]);
				this.examMembers = ExamMember.toArray(jsonArr[3]);
				this.displayExams();
				this.displayCourseHistory();
				this.displaySkills();
			});
	}

	displayCourseHistory() {
		this.courseMembers = _.filter(this.courseMembers, (member: CourseMember) => {
			return member.role == 'student';
		});
		_.each(this.courseMembers, (member: CourseMember) => {
			member["certificate"] = _.find(this.certificates, (cert: Certificate) => {
				return cert.member_id == member.id;
			});
		});
	}

	displaySkills() {
		this.skills = _.sortBy(this.skills, (skill: Achivement) => {
			return skill.date_acquire.getTime()
		});
	}


	displayExams() {
		this.examMembers = _.filter(this.examMembers, (member: ExamMember) => {
			return (member.exam_id && member.status == 'active' && member.role == 'candidate');
		});
		this.examMembers = _.sortBy(this.examMembers, (member: ExamMember) => {
			return member.date_register.getTime()
		});
	}

	printCertificate(certificate) {
		this.certPrintDialog.show(certificate);
	}

}


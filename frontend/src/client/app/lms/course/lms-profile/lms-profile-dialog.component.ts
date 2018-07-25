import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Certificate } from '../../../shared/models/elearning/course-certificate.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { User } from '../../../shared/models/elearning/user.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { EXAM_MEMBER_ENROLL_STATUS, COURSE_MEMBER_ROLE, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants';
import { CertificatePrintDialog } from '../../../lms/course/certificate-print/certificate-print.dialog.component';
import { BaseModel } from '../../../shared/models/base.model';
import { Achivement } from '../../../shared/models/elearning/achievement.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { ExamGrade } from '../../../shared/models/elearning/exam-grade.model';
import { ExcelService } from '../../../shared/services/excel.service';

@Component({
	moduleId: module.id,
	selector: 'lms-profile-dialog',
	templateUrl: 'lms-profile-dialog.component.html',
	styleUrls: ['lms-profile-dialog.component.css'],
})
export class LMSProfileDialog extends BaseDialog<User> {

	COURSE_MEMBER_ENROLL_STATUS = COURSE_MEMBER_ENROLL_STATUS;
	EXAM_MEMBER_ENROLL_STATUS = EXAM_MEMBER_ENROLL_STATUS;

	private courseMembers: CourseMember[];
	private examMembers: ExamMember[];
	private certificates: Certificate[];
	private skills: Achivement[];

	@ViewChild(CertificatePrintDialog) certPrintDialog: CertificatePrintDialog;

	constructor(private excelService: ExcelService) {
		super();
		this.courseMembers = [];
		this.skills = [];
		this.examMembers = [];
	}


	ngOnInit() {
		this.onShow.subscribe(object => {
			this.courseMembers = [];
			this.skills = [];
			this.examMembers = [];

			BaseModel
				.bulk_search(this,
					CourseMember.__api__listByUser(object.user_id),
					Certificate.__api__listByUser(object.user_id),
					Achivement.__api__listByUser(object.user_id),
					ExamMember.__api__listByUser(object.user_id),
					Submission.__api__listByUser(object.user_id))
				.subscribe((jsonArr) => {
					this.courseMembers = CourseMember.toArray(jsonArr[0]);
					this.certificates = Certificate.toArray(jsonArr[1]);
					this.skills = Achivement.toArray(jsonArr[2]);
					this.examMembers = ExamMember.toArray(jsonArr[3]);
					var submits = Submission.toArray(jsonArr[4]);
					this.displayExams(submits);
					this.displayCourseHistory();
					this.displaySkills();
				});
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
		this.skills.sort((s1: Achivement, s2: Achivement) => {
			return s1.date_acquire.getTime() - s2.date_acquire.getTime();
		});
	}


	displayExams(submits: Submission[]) {
		this.examMembers = _.filter(this.examMembers, (member: ExamMember) => {
			return (member.exam_id && member.status == 'active' && member.role == 'candidate');
		});
		this.examMembers.sort((member1, member2): any => {
			return (member1.exam.create_date < member1.exam.create_date)
		});
		var examIds = _.pluck(this.examMembers, 'exam_id');
		_.each(this.examMembers, (member: ExamMember) => {
			member["submit"] = _.find(submits, (submit: Submission) => {
				return submit.member_id == member.id && submit.exam_id == member.exam_id;
			});
		});
	}

	printCertificate(certificate) {
		this.certPrintDialog.show(certificate);
	}

	exportCourse() {
		let output = _.map(this.courseMembers, (courseMember:CourseMember) => {
			return {
				'Course': courseMember.course_name, 'Register date': courseMember.date_register, 'Enrollment status': courseMember.enroll_status, 'Certificate': courseMember['certificate'] ? 'Yes' : 'No'
			};
		})
		this.excelService.exportAsExcelFile(output, 'course_history_report');
	}

	exportExam() {
		let output = _.map(this.examMembers, (examMember:ExamMember) => {
			return { 'Exam': examMember.exam_name, 'Register date': examMember.date_register, 'Enrollment status': examMember.enroll_status, 'Grade': examMember.grade };
		})
		this.excelService.exportAsExcelFile(output, 'exam_history_report');
	}

	exportSkill() {
		let output = _.map(this.skills, skill => {
			return { 'Competency': skill['competency_name'], 'Level': skill['competency_level_name'], 'Date acquired': skill['date_acquire'] };
		})
		this.excelService.exportAsExcelFile(output, 'skill_report');
	}

}


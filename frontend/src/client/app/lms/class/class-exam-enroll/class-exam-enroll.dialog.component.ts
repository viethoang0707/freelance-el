import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { SelectItem } from 'primeng/api';
import { BaseModel } from '../../../shared/models/base.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'class-exam-enroll-dialog',
	templateUrl: 'class-exam-enroll.dialog.component.html',
})
export class ClassExamEnrollDialog extends BaseComponent {

	private display: boolean;
	private exam: Exam;
	private courseClass: CourseClass;
	private selectedMember: ExamMember;
	private examMembers: ExamMember[];
	private courseMembers: CourseMember[];

	constructor() {
		super();
		this.display = false;
		this.examMembers = [];
		this.courseMembers = [];
		this.exam = new Exam();
		this.courseClass = new CourseClass();
	}

	show(exam: Exam, courseClass: CourseClass) {
		this.display = true;
		this.examMembers = [];
		this.courseMembers = [];
		this.exam = exam;
		this.courseClass = courseClass;
		this.exam.listMembers(this).subscribe((members) => {
			this.examMembers = _.filter(members, (member: ExamMember) => {
				return member.role == 'candidate';
			});
		})
		this.courseClass.listMembers(this).subscribe(members => {
			this.courseMembers = _.filter(members, (member: CourseMember) => {
				return member.role == 'student';
			});
		});
	}

	hide() {
		this.display = false;
	}

	enrollAll() {
		var userIds = _.pluck(this.courseMembers, 'user_id');
		this.exam.enroll(this, userIds).subscribe(() => {
			this.exam.populate(this).subscribe(() => {
				this.exam.listCandidates(this).subscribe(members => {
					this.examMembers = members;
				});
				this.success('Register all successfully');
			});
		});
	}

	activateMember(member: ExamMember) {
		member.status = 'active';
		member.save(this).subscribe(() => {
			this.success(this.translateService.instant('Action completed'));
		});
	}


	suspendMember(member: ExamMember) {
		member.status = 'suspend';
		member.save(this).subscribe(() => {
			this.success(this.translateService.instant('Action completed'));
		});
	}

	closeExam() {
		this.confirm('Are you sure to proceed ?', () => {
			this.exam.close(this).subscribe(() => {
				this.exam.status = 'closed';
				this.success('Exam close');
			});
		});
	}

	openExam() {
		this.confirm('Are you sure to proceed ? You will not be able to enroll students after the exam is opened', () => {
			this.exam.open(this).subscribe(() => {
				this.exam.status = 'open';
				this.success('Exam open');
			});
		});
	}
}

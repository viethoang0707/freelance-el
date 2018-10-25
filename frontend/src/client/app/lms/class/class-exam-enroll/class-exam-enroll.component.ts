import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { BaseModel } from '../../../shared/models/base.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { SelectItem } from 'primeng/api';
import { Location } from '@angular/common';
const COURSE_MEMBER_FIELDS = ['group_name', 'name', 'email', 'phone', 'user_id','role'];
const EXAM_MEMBER_FIELDS = ['course_member_id','role'];

@Component({
	moduleId: module.id,
	selector: 'class-exam-enroll',
	templateUrl: 'class-exam-enroll.component.html',
})
export class ClassExamEnrollComponent extends BaseComponent {

	private exam: Exam;
	private selectedMember: any;
	private examMembers: ExamMember[];
	private courseMembers: CourseMember[];

	constructor(private router: Router, private route: ActivatedRoute, private location: Location) {
		super();
		this.examMembers = [];
		this.courseMembers = [];
		this.exam = new Exam();
	}

	ngOnInit() {
		this.exam = this.route.snapshot.data['exam'];
		this.loadMembers();
	}

	loadMembers() {
		this.selectedMember = [];
		BaseModel
			.bulk_search(this,
				CourseClass.__api__listMembers(this.exam.course_class_id, COURSE_MEMBER_FIELDS),
				Exam.__api__listMembers(this.exam.id, EXAM_MEMBER_FIELDS))
			.subscribe(jsonArr => {
				this.courseMembers = _.filter(CourseMember.toArray(jsonArr[0]), (member: CourseMember) => {
					return member.role == 'student';
				});
				this.examMembers = _.filter(ExamMember.toArray(jsonArr[1]), (member: ExamMember) => {
					return member.role == 'candidate';
				});
				_.each(this.courseMembers, (courseMember: CourseMember) => {
					courseMember["examMember"] = _.find(this.examMembers, (examMember: ExamMember) => {
						return courseMember.id == examMember.course_member_id;
					});
				});
			});
	}

	enrollAll() {
		var newMembers = _.each(this.courseMembers, (courseMember: CourseMember) => {
			return courseMember["examMember"] == null;
		});
		var userIds = _.pluck(newMembers, 'user_id');
		this.exam.enroll(this, userIds).subscribe(() => {
			this.loadMembers();
			this.success(this.translateService.instant('Register all successfully'));
		});
	}


	closeExam() {
		this.confirm('Are you sure to proceed ? You will not be able to enroll students after the exam is closed', () => {
			this.exam.close(this).subscribe(() => {
				this.success(this.translateService.instant('Exam close'));
			});
		});
	}

	openExam() {
		this.confirm('Are you sure to proceed?', () => {
			this.exam.open(this).subscribe(() => {
				this.success(this.translateService.instant('Exam open'));
			});
		});
	}

	close() {
		this.location.back();
	}
}

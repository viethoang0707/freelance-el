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
	private courseClass: CourseClass;
	private classExam: Exam;
	private members: CourseMember[];
	private selectedMember: ExamMember;

	constructor() {
		super();
		this.display = false;
		this.courseClass = new CourseClass();
		this.members = [];
	}

	show(classExam: Exam, clazz: CourseClass) {
		this.display = true;
		this.courseClass = clazz;
		this.classExam = classExam;
		BaseModel
			.bulk_search(this, CourseMember.__api__listByClass(this.classExam.id), ExamMember.__api__listByExam(this.courseClass.id))
			.subscribe(jsonArr => {
				var members = CourseMember.toArray(jsonArr[0]);
				this.members = _.filter(members, (member:CourseMember)=> {
					return member.role =='student';
				})
				var examMembers = ExamMember.toArray(jsonArr[1]);
				_.each(this.members, (member: CourseMember) => {
					var examMember = _.find(examMembers, (obj: ExamMember) => {
						return obj.user_id == member.user_id;
					});
					if (examMember) {
						member["examMember"] = examMember;
						member["allowed"] = examMember.status == 'active';
					} else
						member["allowed"] = false;
				})
			});
	}

	hide() {
		this.display = false;
	}

	registerAll() {
		var newMembers = [];
		var currentMembers = [];
		_.each(this.members, (member) => {
			if (!member["examMember"]) {
				member["examMember"] = this.createExamMember(member);
				newMembers.push(member["examMember"]);
			} else {
				var examMember = member["examMember"];
				examMember.status = "active";
				currentMembers.push(member["examMember"]);
			}
		});
		Observable.forkJoin(ExamMember.createArray(this, newMembers), ExamMember.updateArray(this, currentMembers)).subscribe(() => {
			this.info('Register all successfully');
		});
	}


	unregisterAll() {
		var examMembers = [];
		_.each(this.members, (member) => {
			if (member["examMember"]) {
				var examMember = member["examMember"];
				examMember.status = "suspend";
				examMembers.push(member);
			}
		});
		return ExamMember.updateArray(this, examMembers);
	}

	registerUnregister(event: any, member: any) {
		var examMember = member["examMember"];
		if (event.checked) {
			if (examMember) {
				examMember.status = "active";
				examMember.save(this).subscribe();
				member["allowed"] = true;
			} else {
				examMember = this.createExamMember(member);
				examMember.save(this).subscribe(() => {
					member["examMember"] = examMember;
					member["allowed"] = true;
				});
			}
		} else {
			examMember.status = "suspend";
			examMember.save(this).subscribe();
			member["allowed"] = false;
		}
	}

	createExamMember(member:CourseMember) {
		var examMember = new ExamMember();
		examMember.role = "candidate";
		examMember.exam_id = this.classExam.id;
		examMember.user_id = member.user_id;
		examMember.course_member_id = member.id;
		examMember.date_register = new Date();
		examMember.status = 'active';
		return examMember;
	}
}

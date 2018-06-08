import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { SelectItem } from 'primeng/api';

@Component({
    moduleId: module.id,
    selector: 'class-exam-enroll-dialog',
    templateUrl: 'class-exam-enroll.dialog.component.html',
})
export class ClassExamEnrollDialog extends BaseComponent {

	private display: boolean;
	private courseClass: CourseClass;
	private exam: Exam;
	private members: ExamMember[];
	private selectedMember: ExamMember;

	constructor() {
		super();
		this.display = false;
		this.courseClass = new CourseClass();
		this.members  = [];
	}

	show(exam: Exam, clazz: CourseClass) {
		this.display = true;
		this.courseClass =  clazz;
		this.exam = exam;
		
		CourseMember.listByClass(this, clazz.id).subscribe(members => {
			this.members =  _.filter(members, (member)=> {
				return member.role =='student';
			});
			_.each(members, (member)=> {
				ExamMember.byExamAndUser(this, member.user_id, exam.id).subscribe(examMember => {
					if (examMember) {
						member["examMember"] = examMember;
						member["allowed"] =  examMember.status =='active';
					} else
						member["allowed"] = false;
				});
			});
			
		});

	}

	hide() {
		this.display = false;
	}

	registerAll() {
		_.each(this.members, (member)=> {
			if (!member["examMember"]) {
				member["examMember"] = this.createExamMember(member);
			} else {
				var examMember = member["examMember"];
				examMember.status = "active";
			}
		});
		var subscriptions = _.map(this.members, (member)=> {
			return member.save(this);
		});
		
		Observable.forkJoin(subscriptions).subscribe(()=> {
			this.info('Register all successfully');
			
		});
	}


	unregisterAll() {
		var subscriptions = _.map(this.members, (member)=> {
			if (member["examMember"]) {
				var examMember = member["examMember"];
				examMember.status = "suspend";
				return examMember.save(this);
			} else {
				return Observable.of(true);
			}
		});
		
		Observable.forkJoin(subscriptions).subscribe(()=> {
			this.info( 'Unregister all successfully');
			
		});
	}

	registerUnregister(event:any, member: any) {
		var examMember = member["examMember"];
		if (event.checked) {
			if (examMember) {
				examMember.status = "active";
				examMember.save(this).subscribe();
				member["allowed"] = true;
			} else {
				examMember = this.createExamMember(member);
				examMember.save(this).subscribe(()=> {
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

	createExamMember(member) {
		var examMember = new ExamMember();
        examMember.role = "candidate";
        examMember.exam_id = this.exam.id;
        examMember.user_id = member.user_id;
        examMember.date_register =  new Date();
        examMember.status = 'active';
        return examMember;
	}
}

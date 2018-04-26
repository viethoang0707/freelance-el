import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ClassExam } from '../../../shared/models/elearning/class-exam.model';
import { SelectItem } from 'primeng/api';
import { ExamDialog } from '../../../assessment/exam/exam-dialog/exam-dialog.component';
import { ClassExamEnrollDialog } from '../class-exam-enroll/class-exam-enroll.dialog.component';
import { ExamContentDialog } from '../../../cms/exam/content-dialog/exam-content.dialog.component';

@Component({
	moduleId: module.id,
	selector: 'class-exam-list-dialog',
	templateUrl: 'class-exam-list.dialog.component.html',
})
export class ClassExamListDialog extends BaseComponent {

	display: boolean;
	courseClass: CourseClass;
	classExams: ClassExam[];
	selectedClassExam: ClassExam;
	EXAM_STATUS = EXAM_STATUS;

	@ViewChild(ExamDialog) examDialog: ExamDialog;
	@ViewChild(ClassExamEnrollDialog) examEnrollDialog: ClassExamEnrollDialog;
	@ViewChild(ExamContentDialog) examContentDialog:ExamContentDialog;

	constructor() {
		super();
		this.display = false;
		this.courseClass = new CourseClass();
		this.classExams = [];
	}

	show(courseClass: CourseClass) {
		this.display = true;
		this.courseClass = courseClass;
		this.loadExams();
	}

	loadExams() {
		ClassExam.listByClass(this, this.courseClass.id).subscribe(classExams => {
			this.classExams = classExams;
		});
	}

	hide() {
		this.display = false;
	}

	enroll() {
		if (this.selectedClassExam) {
			Exam.get(this,this.selectedClassExam.exam_id ).subscribe(exam=> {
				this.examEnrollDialog.show(exam,this.courseClass);
			});
		}
	}

	add() {
		var exam = new Exam();
		this.examDialog.show(exam);
		this.examDialog.onCreateComplete.subscribe(() => {
			var classExam = new ClassExam();
			classExam.exam_id = exam.id;
			classExam.course_id = this.courseClass.course_id;
			classExam.class_id = this.courseClass.id;
			classExam.save(this).subscribe(() => {
				var member = new ExamMember();
				member.role = "supervisor";
				member.exam_id = this.selectedClassExam.id;
				member.user_id = this.authService.UserProfile.id;
				member.date_register = new Date();
				member.status = 'active';
				member.save(this).subscribe();
				this.loadExams();
			});
		});
	}

	edit() {
		if (this.selectedClassExam) {
			Exam.get(this, this.selectedClassExam.exam_id).subscribe(exam => {
				this.examDialog.show(exam);
				this.examDialog.onUpdateComplete.subscribe(() => {
					this.loadExams();
				});
			});
		}
	}

	manageExam() {
		if (this.selectedClassExam) 
			ExamMember.byExamAndUser(this,this.selectedClassExam.id, this.authService.UserProfile.id ).subscribe(member=> {
				this.router.navigate(['/lms/exams/manage',this.selectedClassExam.id, member.id]);
			});
	}

	editContent() {
		if (this.selectedClassExam) {
			Exam.get(this, this.selectedClassExam.exam_id).subscribe(exam => {
						this.examContentDialog.show(exam);
			});
		}
	}

}

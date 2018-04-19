import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { ClassConferenceDialog } from '../class-conference/class-conference.dialog.component';
import { ClassExamListDialog } from '../class-exam-list/class-exam-list.dialog.component';
import { GradebookListDialog } from '../gradebook-list/gradebook-list.component';


@Component({
    moduleId: module.id,
    selector: 'class-list-dialog',
    templateUrl: 'class-list.dialog.component.html',
})
export class ClassListDialog extends BaseComponent {

	display: boolean;
	course:Course;
	member: CourseMember;
	selectedClass: CourseClass;
	classes: CourseClass[];
	@ViewChild(ClassConferenceDialog) conferenceDialog : ClassConferenceDialog;
	@ViewChild(ClassExamListDialog) examListDialog : ClassExamListDialog;
	@ViewChild(GradebookListDialog) gradebookListDialog: GradebookListDialog;

	constructor() {
		super();
		this.display = false;
		this.classes = [];
	}

	show(member: CourseMember, course: Course) {
		this.display = true;
		this.member =  member;
		this.course =  course;
		CourseClass.listByCourse(this, course.id)
		.map(classList => {
			return _.filter(classList, (obj:CourseClass)=> {
				return member.class_id == obj.id;
			});
		})
		.subscribe(classList => {
			this.classes =  classList;
		})
	}

	hide() {
		this.display = false;
	}

	manageConference() {
		if (this.selectedClass) {
			this.conferenceDialog.show(this.selectedClass);
		}
	}

	manageStudent() {
		if (this.selectedClass) {
			this.gradebookListDialog.show(this.selectedClass);
		}
	}

	manageExam() {
		if (this.selectedClass) {
			this.examListDialog.show(this.selectedClass);
		}
	}
}

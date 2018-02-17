import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { CourseMember } from '../../../shared/models/course-member.model';
import { Course } from '../../../shared/models/course.model';
import { CourseClass } from '../../../shared/models/course-class.model';
import { SelectItem } from 'primeng/api';

@Component({
    moduleId: module.id,
    selector: 'etraining-lms-class-list-dialog',
    templateUrl: 'class-list.dialog.component.html',
})
export class ClassListDialog extends BaseDialog {

	display: boolean;
	course:Course;
	member: CourseMember;
	selectedClass: CourseClass;
	classes: CourseClass[];

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
			return _.filter(classList, function(obj) {
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
}

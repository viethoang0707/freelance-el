import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { Exam } from '../../../shared/models/exam.model';
import { Group } from '../../../shared/models/group.model';
import { SelectItem } from 'primeng/api';

@Component({
    moduleId: module.id,
    selector: 'etraining-course-study-dialog',
    templateUrl: 'course-study.component.html',
})
export class CourseStudyDialog extends BaseComponent {

	display: boolean;
	course: Course;

	@ViewChild(AnswerSheetDialog) answerSheetDialog:AnswerSheetDialog;

	constructor(private reportUtils: ReportUtils,private datePipe: DatePipe, private timePipe: TimeConvertPipe) {
		super();
	}

	ngOnInit() {
	}

	hide() {
		this.display = false;
	}


	show(course: Course) {
		this.display = true;
		this.course = course;
	}
}

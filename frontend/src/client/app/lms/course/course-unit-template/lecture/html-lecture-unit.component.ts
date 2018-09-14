import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Question } from '../../../../shared/models/elearning/question.model';
import { QuestionOption } from '../../../../shared/models/elearning/option.model';
import { HtmlLecture } from '../../../../shared/models/elearning/lecture-html.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { CourseUnitPlayerTemplate } from '../unit.decorator';
import { CourseUnit } from '../../../../shared/models/elearning/course-unit.model';
import { BaseModel } from '../../../../shared/models/base.model';
import { ICourseUnitPlay } from '../unit.interface';
import { CourseMember } from '../../../../shared/models/elearning/course-member.model';


@Component({
	moduleId: module.id,
	selector: 'html-lecture-course-unit',
	templateUrl: 'html-lecture-unit.component.html',
})
@CourseUnitPlayerTemplate({
	type: 'html'
})
export class HtmlLectureCourseUnitPlayerComponent extends BaseComponent implements ICourseUnitPlay, AfterViewInit {

	private unit: CourseUnit;
	private lecture: HtmlLecture;
	protected onViewCompletedReceiver: Subject<any> = new Subject();
	onViewCompleted: Observable<any> = this.onViewCompletedReceiver.asObservable();
	viewCompleted: boolean;

	@ViewChild('content') lectureContent: ElementRef;

	@Input() mode;

	constructor() {
		super();
		this.lecture = new HtmlLecture();
		this.viewCompleted = false;
	}

	play(unit:CourseUnit, member: CourseMember) {
		this.unit = unit;
		HtmlLecture.get(this, this.unit.html_lecture_id).subscribe(lecture=> {
			this.lecture = lecture;
		});
	}

	updateScrollPos(e) {
		if (e.endReached) {
			if (!this.viewCompleted) {
				this.viewCompleted = true;
				this.onViewCompletedReceiver.next();
			}
		}
	}

	ngAfterViewInit() {
		if (this.lectureContent.nativeElement.clientHeight <= this.lectureContent.nativeElement.scrollHeight) {
			if (!this.viewCompleted) {
				this.viewCompleted = true;
				this.onViewCompletedReceiver.next();
			}
		}
	}

}


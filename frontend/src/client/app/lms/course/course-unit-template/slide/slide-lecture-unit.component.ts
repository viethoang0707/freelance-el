import { Component, OnInit, Input, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Question } from '../../../../shared/models/elearning/question.model';
import { QuestionOption } from '../../../../shared/models/elearning/option.model';
import { SlideLecture } from '../../../../shared/models/elearning/lecture-slide.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { CourseUnitPlayerTemplate } from '../unit.decorator';
import { CourseUnit } from '../../../../shared/models/elearning/course-unit.model';
import * as RecordRTC from 'recordrtc';
import { VideoLecture } from '../../../../shared/models/elearning/lecture-video.model';
import { ICourseUnitPlay } from '../unit.interface';
import { CourseMember } from '../../../../shared/models/elearning/course-member.model';

@Component({
	moduleId: module.id,
	selector: 'slide-lecture-course-unit',
	templateUrl: 'slide-lecture-unit.component.html',
})
@CourseUnitPlayerTemplate({
	type: 'slide'
})
export class SlideLectureCourseUnitPlayerComponent extends BaseComponent implements ICourseUnitPlay {

	private unit: CourseUnit;
	private lecture: SlideLecture;
	protected onViewCompletedReceiver: Subject<any> = new Subject();
	onViewCompleted: Observable<any> = this.onViewCompletedReceiver.asObservable();
	viewCompleted: boolean;
	@Input() mode;

	constructor(private ngZone: NgZone) {
		super();
		this.lecture = new SlideLecture();
		this.viewCompleted = false;
	}


	play(unit:CourseUnit, member: CourseMember) {
		this.unit = unit;
		this.unit.populateSlideLecture(this).subscribe(() => {
			this.lecture = this.unit.slideLecture;
			this.onViewCompletedReceiver.next();
			this.viewCompleted = true;
		});
	}


}


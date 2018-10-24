import { Component, OnInit, Input, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Question } from '../../../../shared/models/elearning/question.model';
import { QuestionOption } from '../../../../shared/models/elearning/option.model';
import { SCORMLecture } from '../../../../shared/models/elearning/lecture-scorm.model';
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
	selector: 'scorm-lecture-course-unit',
	templateUrl: 'scorm-lecture-unit.component.html',
	styleUrls: ['scorm-lecture-unit.component.css'],
})
@CourseUnitPlayerTemplate({
	type: 'scorm'
})
export class SCORMLectureCourseUnitPlayerComponent extends BaseComponent implements ICourseUnitPlay {

	private unit: CourseUnit;
	private lecture: SCORMLecture;
	protected onViewCompletedReceiver: Subject<any> = new Subject();
	onViewCompleted: Observable<any> = this.onViewCompletedReceiver.asObservable();
	viewCompleted: boolean;

	@Input() mode;

	constructor(private ngZone: NgZone) {
		super();
		this.lecture = new SCORMLecture();
	}

	play(unit:CourseUnit, member: CourseMember) {
		this.unit = unit;
		SCORMLecture.get(this, this.unit.scorm_lecture_id).subscribe(lecture=> {
			this.lecture = lecture;
			this.onViewCompletedReceiver.next();
			this.viewCompleted = true;
		});
	}


}


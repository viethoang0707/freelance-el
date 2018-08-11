import { Component, OnInit, Input, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Question } from '../../../../shared/models/elearning/question.model';
import { QuestionOption } from '../../../../shared/models/elearning/option.model';
import { VideoLecture } from '../../../../shared/models/elearning/lecture-video.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { CourseUnitPlayerTemplate } from '../unit.decorator';
import { CourseUnit } from '../../../../shared/models/elearning/course-unit.model';
import * as RecordRTC from 'recordrtc';
import { ICourseUnitPlay } from '../unit.interface';
import { CourseMember } from '../../../../shared/models/elearning/course-member.model';

@Component({
	moduleId: module.id,
	selector: 'video-lecture-course-unit',
	templateUrl: 'video-lecture-unit.component.html',
	styleUrls: ['video-lecture-unit.component.css'],
})
@CourseUnitPlayerTemplate({
	type: 'video'
})
export class VideoLectureCourseUnitPlayerComponent extends BaseComponent implements AfterViewInit, ICourseUnitPlay {

	private unit: CourseUnit;
	private lecture: VideoLecture;
	protected onViewCompletedReceiver: Subject<any> = new Subject();
	onViewCompleted: Observable<any> = this.onViewCompletedReceiver.asObservable();
	viewCompleted: boolean;
	@ViewChild('camera') video: any;

	constructor(private ngZone: NgZone) {
		super();
		this.lecture = new VideoLecture();
		this.viewCompleted = false;
	}

	ngAfterViewInit() {
		let video: HTMLVideoElement = this.video.nativeElement;
		video.muted = false;
		video.controls = true;
		video.autoplay = false;
	}

	play(unit:CourseUnit, member: CourseMember) {
		this.unit = unit;
		this.unit.populateVideoLecture(this).subscribe(() => {
			this.lecture = this.unit.videoLecture;
		});
	}



	videoEnded() {
		this.viewCompleted = true;
		this.onViewCompletedReceiver.next();
	}

}


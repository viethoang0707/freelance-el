import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Question } from '../../../../shared/models/question.model';
import { QuestionOption } from '../../../../shared/models/option.model';
import { VideoLecture } from '../../../../shared/models/lecture-video.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { CourseUnitTemplate } from '../unit.decorator';
import { ICourseUnit } from '../unit.interface';
import { CourseUnit } from '../../../../shared/models/course-unit.model';

@Component({
	moduleId: module.id,
	selector: 'etraining-video-lecture-course-unit',
	templateUrl: 'video-lecture-unit.component.html',
})
@CourseUnitTemplate({
	type:'video'
})
export class VideoLectureCourseUnitComponent extends BaseComponent implements ICourseUnit{

	unit: CourseUnit;
	lecture: VideoLecture;

	constructor() {
		super();
		this.lecture = new VideoLecture();
	}

	render(unit:CourseUnit) {
		this.unit = unit;
		VideoLecture.byCourseUnit(this, unit.id).subscribe(lecture => {
			if (lecture)
				this.lecture = lecture;
			else {
				var lecture = new HtmlLecture();
				lecture.unit_id = this.unit.id;
				this.lecture =  lecture;
			}
		});
	}

	saveEditor():Observable<any> {
		return Observable.forkJoin(this.unit.save(this), this.lecture.save(this));
	}

	changeFile(event:any) {

	}

	captureScreen() {

	}

	recordCamera() {

	}
}


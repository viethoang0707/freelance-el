import { Component, OnInit, Input, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Question } from '../../../../shared/models/elearning/question.model';
import { QuestionOption } from '../../../../shared/models/elearning/option.model';
import { SlideLecture } from '../../../../shared/models/elearning/lecture-slide.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { CourseUnitTemplate } from '../unit.decorator';
import { ICourseUnit } from '../unit.interface';
import { CourseUnit } from '../../../../shared/models/elearning/course-unit.model';
import * as RecordRTC from 'recordrtc';
import { VideoLecture } from '../../../../shared/models/elearning/lecture-video.model';


@Component({
	moduleId: module.id,
	selector: 'slide-lecture-course-unit',
	templateUrl: 'slide-lecture-unit.component.html',
})
@CourseUnitTemplate({
	type: 'slide'
})
export class SlideLectureCourseUnitComponent extends BaseComponent implements ICourseUnit {

	private unit: CourseUnit;
	private lecture: SlideLecture;
	viewCompleted: boolean;
	@Input() mode;

	constructor(private ngZone: NgZone) {
		super();
		this.lecture = new SlideLecture();
		this.viewCompleted = false;
	}


	render(unit: CourseUnit) {
		this.unit = unit;
		this.unit.populateSlideLecture(this).subscribe(()=> {
			this.lecture = this.unit.slideLecture;
		});
	}

	saveEditor(): Observable<any> {
		return Observable.forkJoin(this.unit.save(this), this.lecture.save(this));
	}

	uploadFile(file) {
		this.percentage = 0;
		this.lecture.filename = file.name;
		this.fileApiService.upload(file,  this.authService.LoginToken).subscribe(
			data => {
				if (data["result"]) {
					this.ngZone.run(()=> {
						if (file.name.endsWith('pdf'))
							this.lecture.slide_url = data["url"];
						else {
							var serverFile = data["filename"]
							this.fileApiService.convert2Pdf(serverFile, this.authService.LoginToken).subscribe((data)=> {
								this.lecture.slide_url = data["url"];
							});
						}
					});
				} else {
					this.ngZone.run(()=> {
						this.percentage = +data;
					});
					
				}
			}
		);
	}

	changeFile(event: any) {
		let file = event.files[0];
		this.uploadFile(file);
	}


}


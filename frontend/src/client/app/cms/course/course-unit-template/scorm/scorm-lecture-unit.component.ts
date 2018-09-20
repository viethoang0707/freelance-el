import { Component, OnInit, Input, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Question } from '../../../../shared/models/elearning/question.model';
import { QuestionOption } from '../../../../shared/models/elearning/option.model';
import { SCORMLecture } from '../../../../shared/models/elearning/lecture-scorm.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { CourseUnitTemplate } from '../unit.decorator';
import { ICourseUnitDesign } from '../unit.interface';
import { CourseUnit } from '../../../../shared/models/elearning/course-unit.model';
import * as RecordRTC from 'recordrtc';
import { VideoLecture } from '../../../../shared/models/elearning/lecture-video.model';


@Component({
	moduleId: module.id,
	selector: 'scorm-lecture-course-unit',
	templateUrl: 'scorm-lecture-unit.component.html',
})
@CourseUnitTemplate({
	type: 'scorm'
})
export class SCORMLectureCourseUnitComponent extends BaseComponent implements ICourseUnitDesign {

	private unit: CourseUnit;
	private lecture: SCORMLecture;
	private percentage: number;

	@Input() mode;

	constructor(private ngZone: NgZone) {
		super();
		this.lecture = new SCORMLecture();

	}


	render(unit: CourseUnit) {
		this.unit = unit;
		SCORMLecture.get(this, this.unit.scorm_lecture_id).subscribe(lecture=> {
			this.lecture = lecture;
		});
	}

	saveEditor(): Observable<any> {
		return this.lecture.save(this);
	}

	uploadFile(file) {
		this.percentage = 0;
		this.apiService.upload(file, this.authService.LoginToken).subscribe(
			data => {
				if (data["result"]) {
					this.ngZone.run(() => {
						this.lecture.package_url = data["url"];
						this.lecture.package_file_id = data["attachment_id"];
						var serverFile = data["filename"]
						this.apiService.unzip(serverFile, this.authService.LoginToken)
							.subscribe((data) => {
								this.lecture.base_url = data["url"];
							}, () => {
							});
					});
				} else {
					this.ngZone.run(() => {
						this.percentage = +data;
					});
				}
			}, () => {
			}
		);
	}

	changeFile(event: any) {
		let file = event.files[0];
		this.uploadFile(file);
	}

	


}


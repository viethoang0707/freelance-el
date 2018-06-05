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
import { ICourseUnit } from '../unit.interface';
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
export class SCORMLectureCourseUnitComponent extends BaseComponent implements ICourseUnit {

	@Input() mode;
	private unit: CourseUnit;
	private lecture: SCORMLecture;

	constructor(private ngZone: NgZone) {
		super();
		this.lecture = new SCORMLecture();
	}


	render(unit: CourseUnit) {
		this.unit = unit;
		this.startTransaction();
		SCORMLecture.byCourseUnit(this, unit.id).subscribe((lecture: SCORMLecture) => {
			if (lecture)
				this.lecture = lecture;
			else {
				var lecture = new SCORMLecture();
				lecture.unit_id = this.unit.id;
				this.lecture = lecture;
			}
			this.closeTransaction();
		});
	}

	saveEditor(): Observable<any> {
		return Observable.forkJoin(this.unit.save(this), this.lecture.save(this));
	}

	uploadFile(file) {
		this.startTransaction();
		this.cloudApiService.upload(file, this.authService.CloudAcc.id).subscribe(
			data => {
				this.closeTransaction();
				if (data["result"]) {
					this.ngZone.run(()=> {
						this.lecture.package_url = data["url"];
						var serverFile = data["filename"]
						this.cloudApiService.unzip(serverFile, this.authService.CloudAcc.id).subscribe((data)=> {
							this.lecture.base_url = data["url"];
						});
					});
				}
			},
			() => {
				this.closeTransaction();
			}
		);
	}

	changeFile(event: any) {
		let file = event.files[0];
		this.uploadFile(file);
	}


}


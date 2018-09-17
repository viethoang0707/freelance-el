import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Question } from '../../../../shared/models/elearning/question.model';
import { QuestionOption } from '../../../../shared/models/elearning/option.model';
import { HtmlLecture } from '../../../../shared/models/elearning/lecture-html.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { CourseUnitTemplate } from '../unit.decorator';
import { ICourseUnitDesign } from '../unit.interface';
import { CourseUnit } from '../../../../shared/models/elearning/course-unit.model';
import { BaseModel } from '../../../../shared/models/base.model';

@Component({
	moduleId: module.id,
	selector: 'html-lecture-course-unit',
	templateUrl: 'html-lecture-unit.component.html',
})
@CourseUnitTemplate({
	type: 'html'
})
export class HtmlLectureCourseUnitComponent extends BaseComponent implements ICourseUnitDesign {

	private unit: CourseUnit;
	private lecture: HtmlLecture;

	@ViewChild('content') lectureContent: ElementRef;

	@Input() mode;

	constructor() {
		super();
		this.lecture = new HtmlLecture();
	}

	render(unit: CourseUnit) {
		this.unit = unit;
		HtmlLecture.get(this, this.unit.html_lecture_id).subscribe(lecture=> {
			this.lecture =lecture;
		});
	}

	saveEditor(): Observable<any> {
		return  this.lecture.save(this);
	}


}


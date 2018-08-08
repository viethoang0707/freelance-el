import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Question } from '../../../../shared/models/elearning/question.model';
import { QuestionOption } from '../../../../shared/models/elearning/option.model';
import { HtmlLecture } from '../../../../shared/models/elearning/lecture-html.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { CourseUnitTemplate } from '../unit.decorator';
import { ICourseUnit } from '../unit.interface';
import { CourseUnit } from '../../../../shared/models/elearning/course-unit.model';
import { BaseModel } from '../../../../shared/models/base.model';

@Component({
	moduleId: module.id,
	selector: 'html-lecture-course-unit',
	templateUrl: 'html-lecture-unit.component.html',
})
@CourseUnitTemplate({
	type:'html'
})
export class HtmlLectureCourseUnitComponent extends BaseComponent implements ICourseUnit{

	private unit: CourseUnit;
	private lecture: HtmlLecture;
	protected onViewCompletedReceiver: Subject<any> = new Subject();
  onViewCompleted: Observable<any> = this.onViewCompletedReceiver.asObservable();
	viewCompleted: boolean;

	@Input() mode;

	constructor() {
		super();
		this.lecture = new HtmlLecture();
		this.viewCompleted =  false;
	}

	render(unit:CourseUnit) {
		this.unit = unit;
		this.unit.populateHtmlLecture(this).subscribe(()=> {
			this.lecture = this.unit.htmlLecture;
		})
	}

	saveEditor():Observable<any> {
		return Observable.forkJoin(this.unit.save(this), this.lecture.save(this));
	}

	updateScrollPos(e) {
		if (e.endReached) {
			this.viewCompleted = true;
			this.onViewCompletedReceiver.next();
		}
	}

}


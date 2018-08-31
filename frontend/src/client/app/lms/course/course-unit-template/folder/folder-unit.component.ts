import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Question } from '../../../../shared/models/elearning/question.model';
import { QuestionOption } from '../../../../shared/models/elearning/option.model';
import { Answer } from '../../../../shared/models/elearning/answer.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { CourseUnitPlayerTemplate } from '../unit.decorator';
import { CourseUnit } from '../../../../shared/models/elearning/course-unit.model';
import { ICourseUnitPlay } from '../unit.interface';
import { CourseMember } from '../../../../shared/models/elearning/course-member.model';

@Component({
	moduleId: module.id,
	selector: 'folder-course-unit',
	templateUrl: 'folder-unit.component.html',
})
@CourseUnitPlayerTemplate({
	type:'folder'
})
export class FolderCourseUnitPlayerComponent extends BaseComponent implements ICourseUnitPlay{

	viewCompleted: boolean;
	private unit: CourseUnit;
	protected onViewCompletedReceiver: Subject<any> = new Subject();
  onViewCompleted: Observable<any> = this.onViewCompletedReceiver.asObservable();
	@Input() mode;

	constructor() {
		super();
		this.viewCompleted =  true;
		this.onViewCompletedReceiver.next();
	}

	play(unit:CourseUnit, member: CourseMember) {
		this.unit = unit;
	}




}


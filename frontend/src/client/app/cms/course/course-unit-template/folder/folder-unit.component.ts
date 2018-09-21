import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Question } from '../../../../shared/models/elearning/question.model';
import { QuestionOption } from '../../../../shared/models/elearning/option.model';
import { Answer } from '../../../../shared/models/elearning/answer.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { CourseUnitTemplate } from '../unit.decorator';
import { ICourseUnitDesign } from '../unit.interface';
import { CourseUnit } from '../../../../shared/models/elearning/course-unit.model';

@Component({
	moduleId: module.id,
	selector: 'folder-course-unit',
	templateUrl: 'folder-unit.component.html',
})
@CourseUnitTemplate({
	type:'folder'
})
export class FolderCourseUnitComponent extends BaseComponent implements ICourseUnitDesign{

	private unit: CourseUnit;
	@Input() mode;

	constructor() {
		super();
	}

	render(unit:CourseUnit) {
		this.unit = unit;
	}

	

	saveEditor():Observable<any> {
		return Observable.of(true);
	}


}


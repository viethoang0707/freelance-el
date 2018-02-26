import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Question } from '../../../../shared/models/question.model';
import { QuestionOption } from '../../../../shared/models/option.model';
import { Answer } from '../../../../shared/models/answer.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { CourseUnitTemplate } from '../unit.decorator';
import { ICourseUnit } from '../unit.interface';
import { CourseUnit } from '../../../../shared/models/course-unit.model';

@Component({
	moduleId: module.id,
	selector: 'etraining-folder-course-unit',
	templateUrl: 'folder-unit.component.html',
})
@CourseUnitTemplate({
	type:'folder'
})
export class FolderCourseUnitComponent extends BaseComponent implements ICourseUnit{

	unit: CourseUnit;

	constructor() {
		super();
	}

	render(unit:CourseUnit) {
		this.unit = unit;
	}

	saveEditor():Observable<any> {
		return this.unit.save(this);
	}


}


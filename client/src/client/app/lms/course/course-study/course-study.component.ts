import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { Exam } from '../../../shared/models/elearning/exam.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { SelectItem } from 'primeng/api';
import { Course } from '../../../shared/models/elearning/course.model';


@Component({
    moduleId: module.id,
    selector: 'course-study',
    templateUrl: 'course-study.component.html',
})
export class CourseStudyComponent extends BaseComponent implements OnInit{

	course: Course;

	constructor() {
		super();
	}

	ngOnInit() {
		
	}
}

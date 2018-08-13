import { Component, Input, OnInit, ViewChild,ComponentFactoryResolver } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { BaseDialog } from '../../../shared/components/base/base.dialog';

import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ProjectSubmission } from '../../../shared/models/elearning/project-submission.model';
import { Question } from '../../../shared/models/elearning/question.model';
import { Answer } from '../../../shared/models/elearning/answer.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { QuestionSheet } from '../../../shared/models/elearning/question-sheet.model';
import { ExamSetting } from '../../../shared/models/elearning/exam-setting.model';


@Component({
	moduleId: module.id,
	selector: 'project-marking-dialog',
	templateUrl: 'project-marking.dialog.component.html',
})
export class ProjectMarkingDialog extends BaseDialog<ProjectSubmission>  {

	constructor() {
		super();
		this.display = false;

	}

}

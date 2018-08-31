import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Exam } from '../../../../shared/models/elearning/exam.model';
import { QuestionOption } from '../../../../shared/models/elearning/option.model';
import { SelfAssessment } from '../../../../shared/models/elearning/self_assessment.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { CourseUnitTemplate } from '../unit.decorator';
import { ICourseUnitDesign } from '../unit.interface';
import { CourseUnit } from '../../../../shared/models/elearning/course-unit.model';
import { BaseModel } from '../../../../shared/models/base.model';
import { ExamContentDialog } from '../../../exam/content-dialog/exam-content.dialog.component';
import { QuestionSheetPreviewDialog } from '../../../exam/question-sheet-preview/question-sheet-preview.dialog.component';

@Component({
	moduleId: module.id,
	selector: 'self-assessment-course-unit',
	templateUrl: 'self-assessment-unit.component.html',
})
@CourseUnitTemplate({
	type: 'self-assess'
})
export class SelfAssessmentCourseUnitComponent extends BaseComponent implements ICourseUnitDesign {

	private unit: CourseUnit;
	private assessment: SelfAssessment;

	@Input() mode;
	@ViewChild(ExamContentDialog) examContentDialog: ExamContentDialog;
	@ViewChild(QuestionSheetPreviewDialog) previewDialog: QuestionSheetPreviewDialog;

	constructor() {
		super();
		this.assessment = new SelfAssessment();
	}

	render(unit: CourseUnit) {
		this.unit = unit;
		this.unit.populateSelfAssessment(this).subscribe(() => {
			this.assessment = this.unit.selfAssessment;
		});
	}

	saveEditor(): Observable<any> {
		return Observable.of(true);
	}

	editContent() {
		this.assessment.populateExam(this).subscribe(() => {
			this.examContentDialog.show(this.assessment.exam);
		});
	}

	previewSheet() {
		this.assessment.populateExam(this).subscribe(() => {
			this.assessment.exam.populateQuestionSheet(this).subscribe(() => {
				this.previewDialog.show(this.assessment.exam.sheet);
			})
		});

	}


}


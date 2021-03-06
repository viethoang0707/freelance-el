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
import { ExamEditorDialog } from '../../../exam/exam-editor/exam-editor.dialog.component';
import { QuestionSheetPreviewDialog } from '../../../exam/question-sheet-preview/question-sheet-preview.dialog.component';
import { QuestionSheet } from '../../../../shared/models/elearning/question-sheet.model';

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
	@ViewChild(ExamEditorDialog) examContentDialog: ExamEditorDialog;
	@ViewChild(QuestionSheetPreviewDialog) previewDialog: QuestionSheetPreviewDialog;

	constructor() {
		super();
		this.assessment = new SelfAssessment();
	}

	render(unit: CourseUnit) {
		this.unit = unit;
		SelfAssessment.get(this, this.unit.self_assessment_id).subscribe(assessment=> {
			this.assessment =  assessment;
		});
	}

	saveEditor(): Observable<any> {
		return Observable.of(true);
	}

	editContent() {
		Exam.get(this, this.assessment.exam_id).subscribe(exam => {
			QuestionSheet.get(this, this.assessment.sheet_id).subscribe(sheet=> {
				this.examContentDialog.show(exam, sheet);
			});
		});
	}

	previewSheet() {
		QuestionSheet.get(this, this.assessment.sheet_id).subscribe(sheet => {
			this.previewDialog.show(sheet);
		});
	}
}


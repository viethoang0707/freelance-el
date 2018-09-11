import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { Question } from '../../../shared/models/elearning/question.model';
import { QuestionSheet } from '../../../shared/models/elearning/question-sheet.model';
import { ExamGrade } from '../../../shared/models/elearning/exam-grade.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { QuestionSheetPreviewDialog } from '../question-sheet-preview/question-sheet-preview.dialog.component';
import { QuestionSheetEditorDialog } from '../question-sheet-editor/question-sheet-editor.dialog.component';
import { QuestionSheetSaveDialog } from '../question-sheet-save/question-sheet-save.dialog.component';
import { Http, Response } from '@angular/http';
import { QUESTION_SELECTION, GROUP_CATEGORY, EXAM_STATUS, QUESTION_TYPE, EXAM_MEMBER_STATUS, QUESTION_LEVEL } from '../../../shared/models/constants'
import { SelectItem, MenuItem } from 'primeng/api';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { SelectQuestionSheetDialog } from '../../../shared/components/select-question-sheet-dialog/select-question-sheet-dialog.component';
import { TreeNode } from 'primeng/api';
import { ExamEditor } from './exam-editor.component';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';

@Component({
	moduleId: module.id,
	selector: 'exam-editor-dialog',
	templateUrl: 'exam-editor.dialog.component.html',
})
export class ExamEditorDialog extends BaseComponent {

	private display: boolean;
	private exam: Exam;
	private sheet: QuestionSheet;

	@ViewChild(ExamEditor) examContent: ExamEditor;

	constructor() {
		super();
		this.sheet = new QuestionSheet();
		this.exam = new Exam();
	}

	show(exam: Exam, sheet:QuestionSheet) {
		this.display = true;
		this.exam = exam;
		this.sheet = sheet;
		this.examContent.render(exam, sheet);
	}

	save() {
		this.examContent.save().subscribe(()=> {
			this.hide();
		});
	}

	hide() {
		this.display = false;
	}

	
}
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { Question } from '../../../shared/models/elearning/question.model';
import { QuestionSheet } from '../../../shared/models/elearning/question-sheet.model';
import { ExamGrade } from '../../../shared/models/elearning/exam-grade.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { QuestionSheetPreviewDialog } from '../../../assessment/question/question-sheet-preview/question-sheet-preview.dialog.component';
import { QuestionSheetEditorDialog } from '../question-sheet-editor/question-sheet-editor.dialog.component';
import { QuestionSheetSaveDialog } from '../question-sheet-save/question-sheet-save.dialog.component';
import { Http, Response } from '@angular/http';
import { QUESTION_SELECTION, GROUP_CATEGORY, EXAM_STATUS, QUESTION_TYPE, EXAM_MEMBER_STATUS, QUESTION_LEVEL } from '../../../shared/models/constants'
import { SelectItem, MenuItem } from 'primeng/api';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { SelectQuestionSheetDialog } from '../../../shared/components/select-question-sheet-dialog/select-question-sheet-dialog.component';
import { TreeNode } from 'primeng/api';

@Component({
	moduleId: module.id,
	selector: 'exam-content-dialog',
	templateUrl: 'exam-content.dialog.component.html',
})
export class ExamContentDialog extends BaseComponent {

	QUESTION_LEVEL = QUESTION_LEVEL;

	private display: boolean;
	private exam: Exam;
	private sheet: QuestionSheet;
	private examQuestions: ExamQuestion[];
	private totalScore: number;

	@ViewChild(QuestionSheetPreviewDialog) previewDialog : QuestionSheetPreviewDialog;
	@ViewChild(SelectQuestionSheetDialog) selectSheetDialog: SelectQuestionSheetDialog;
	@ViewChild(QuestionSheetEditorDialog) editorDialog: QuestionSheetEditorDialog;
	@ViewChild(QuestionSheetSaveDialog) saveDialog: QuestionSheetSaveDialog;

	constructor() {
		super();
		this.sheet = new QuestionSheet();
		this.examQuestions = [];
		this.exam = new Exam();
	}

	show(exam: Exam) {
		this.display = true;
		this.exam = exam;
		this.examQuestions = [];
		this.loadQuestionSheet();
	}

	loadQuestionSheet() {
		
		QuestionSheet.byExam(this, this.exam.id).subscribe(sheet => {
			if (sheet) {
				this.sheet = sheet;
				
				ExamQuestion.listBySheet(this, this.sheet.id).subscribe(examQuestions => {
					this.examQuestions = examQuestions;
					this.totalScore = _.reduce(examQuestions, (memo, q) => { return memo + +q.score; }, 0);
				});
			}
			else {
				this.sheet = new QuestionSheet();
				this.sheet.exam_id = this.exam.id;
				
				this.sheet.save(this).subscribe(sheet => {
					this.sheet = sheet;
					
				});
			}
		});
	}

	save() {
		
		var subscriptions = _.map(this.examQuestions, examQuestion=> {
			return examQuestion.save(this);
		});
		subscriptions.push(this.sheet.save(this));
		Observable.forkJoin(...subscriptions).subscribe(()=> {
			this.hide();
			this.success(this.translateService.instant('Content saved successfully.'));
			
		});
	}

	hide() {
		this.display = false;
	}

	previewSheet() {
		this.previewDialog.show(this.sheet, this.examQuestions);
	}

	clearSheet() {
		this.sheet.finalized =  false;
		var subscriptions = _.map(this.examQuestions, examQuestion=> {
			if (examQuestion["id"])
				return examQuestion.delete(this);
			return Observable.of(true);
		});
		subscriptions.push(this.sheet.save(this));
		
		Observable.forkJoin(subscriptions).subscribe(()=> {
			this.examQuestions = [];
		});
	}

	loadSheetTemplate() {
		if (this.sheet && !this.sheet.finalized )
			this.selectSheetDialog.show();
			this.selectSheetDialog.onSelectSheet.subscribe((sheetTempl:QuestionSheet) => {
				
				ExamQuestion.listBySheet(this, sheetTempl.id).subscribe(examQuestions=> {
					this.examQuestions = _.map(examQuestions, examQuestion=> {
						return examQuestion.clone();
					});
					_.each(this.examQuestions, (examQuestion:ExamQuestion)=> {
						examQuestion.sheet_id =  this.sheet.id;
					});
					this.sheet.finalized =  true;
					this.examQuestions = examQuestions;
					this.totalScore = _.reduce(examQuestions, (memo, q) => { return memo + +q.score; }, 0);
				});
			});
	}

	saveToTemplate() {
		if (this.sheet && this.sheet.finalized) {
			this.saveDialog.show(this.sheet, this.examQuestions);
		}
	}

	designSheet() {
		if (this.sheet && !this.sheet.finalized) {
			this.editorDialog.show();
			this.editorDialog.onSave.subscribe(examQuestions=> {
				_.each(examQuestions, (examQuestion:ExamQuestion)=> {
					examQuestion.sheet_id =  this.sheet.id;
				});
				this.sheet.finalized =  true;
				this.examQuestions = examQuestions;
			});
		}
	}
}
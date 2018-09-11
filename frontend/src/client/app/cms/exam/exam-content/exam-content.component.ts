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
import { ExamSettingDialog } from '../exam-setting/exam-setting.dialog.component';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';

@Component({
	moduleId: module.id,
	selector: 'exam-content',
	templateUrl: 'exam-content.component.html',
})
export class ExamContent extends BaseComponent {

	QUESTION_LEVEL = QUESTION_LEVEL;

	private display: boolean;
	private exam: Exam;
	private sheet: QuestionSheet;
	private examQuestions: ExamQuestion[];
	private totalScore: number;

	@ViewChild(QuestionSheetPreviewDialog) previewDialog: QuestionSheetPreviewDialog;
	@ViewChild(SelectQuestionSheetDialog) selectSheetDialog: SelectQuestionSheetDialog;
	@ViewChild(QuestionSheetEditorDialog) editorDialog: QuestionSheetEditorDialog;
	@ViewChild(QuestionSheetSaveDialog) saveDialog: QuestionSheetSaveDialog;
	@ViewChild(ExamSettingDialog) settingDialog: ExamSettingDialog;

	constructor() {
		super();
		this.sheet = new QuestionSheet();
		this.examQuestions = [];
		this.exam = new Exam();
	}

	render(exam: Exam, sheet:QuestionSheet) {
		this.exam = exam;
		this.sheet = sheet;
		this.examQuestions = [];
		this.loadQuestionSheet();
	}

	loadQuestionSheet() {
			this.sheet.listQuestions(this).subscribe(examQuestions => {
				this.examQuestions = examQuestions;
				this.totalScore = _.reduce(examQuestions, (memo, q) => { return memo + +q.score; }, 0);
			});
	}

	showSetting() {
		this.settingDialog.show(this.exam);
	}

	previewSheet() {
		this.previewDialog.show(this.sheet);
	}

	clearSheet() {
		this.sheet.finalized = false;
		this.sheet.save(this).subscribe(() => {
			var existExamQuestions = _.filter(this.examQuestions, (examQuestion: ExamQuestion) => {
				return examQuestion.id != null;
			});
			ExamQuestion.deleteArray(this, this.examQuestions).subscribe(() => {
				this.examQuestions = [];
			});
		});
	}

	loadSheetTemplate() {
		if (this.sheet && !this.sheet.finalized)
			this.selectSheetDialog.show();
		this.selectSheetDialog.onSelectSheet.first().subscribe((sheetTempl: QuestionSheet) => {
			sheetTempl.listQuestions(this).subscribe(examQuestions => {
				this.examQuestions = _.map(examQuestions, examQuestion => {
					return examQuestion.clone();
				});
				this.totalScore = _.reduce(examQuestions, (memo, q) => { return memo + +q.score; }, 0);
			});
		});
	}

	saveToTemplate() {
		if (this.sheet && this.sheet.finalized) {
			this.saveDialog.show(this.sheet, this.examQuestions);
		}
	}

	save() {
		this.sheet.finalized = true;
		return this.sheet.save(this).flatMap(() => {
			_.each(this.examQuestions, (examQuestion: ExamQuestion) => {
				examQuestion.sheet_id = this.sheet.id;
			});
			var newExamQuestions = _.filter(this.examQuestions, (examQuestion: ExamQuestion) => {
				return examQuestion.IsNew;
			});
			var existExamQuestions = _.filter(this.examQuestions, (examQuestion: ExamQuestion) => {
				return !examQuestion.IsNew;
			});
			return Observable.forkJoin(ExamQuestion.createArray(this, newExamQuestions), ExamQuestion.updateArray(this, existExamQuestions)).do(() => {
					this.exam.question_count =  this.sheet.question_count = this.examQuestions.length;
					this.success(this.translateService.instant('Content saved successfully.'));
				});
			});
	}

	designSheet() {
		if (this.sheet && !this.sheet.finalized) {
			this.editorDialog.show();
			this.editorDialog.onSave.subscribe(examQuestions => {
				this.examQuestions = examQuestions;
			});
		}
	}
}
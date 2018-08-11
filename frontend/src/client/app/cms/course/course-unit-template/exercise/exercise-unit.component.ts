import { Component, OnInit, Input, ViewChild, QueryList, ViewChildren, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { QuestionSheet } from '../../../../shared/models/elearning/question-sheet.model';
import { Question } from '../../../../shared/models/elearning/question.model';
import { QuestionOption } from '../../../../shared/models/elearning/option.model';
import { ExamQuestion } from '../../../../shared/models/elearning/exam-question.model';
import { CourseUnit } from '../../../../shared/models/elearning/course-unit.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { CourseUnitTemplate } from '../unit.decorator';
import { ICourseUnitDesign } from '../unit.interface';
import { TreeUtils } from '../../../../shared/helpers/tree.utils';
import { SelectQuestionsDialog } from '../../../../shared/components/select-question-dialog/select-question-dialog.component';
import { QuestionContainerDirective } from '../../../../assessment/question/question-template/question-container.directive';
import { IQuestion } from '../../../../assessment/question/question-template/question.interface';
import { QuestionRegister } from '../../../../assessment/question/question-template/question.decorator';
import { QuestionSheetPreviewDialog } from '../../../exam/question-sheet-preview/question-sheet-preview.dialog.component';
import { QuestionSheetEditorDialog } from '../../../exam/question-sheet-editor/question-sheet-editor.dialog.component';
import { SelectQuestionSheetDialog } from '../../../../shared/components/select-question-sheet-dialog/select-question-sheet-dialog.component';

@Component({
	moduleId: module.id,
	selector: 'exercise-course-unit',
	templateUrl: 'exercise-unit.component.html',
})
@CourseUnitTemplate({
	type: 'exercise'
})
export class ExerciseCourseUnitComponent extends BaseComponent implements ICourseUnitDesign, OnInit {

	private questions: Question[];
	private unit: CourseUnit;
	private sheet: QuestionSheet;
	private examQuestions: ExamQuestion[];
	private componentRef: any;

	@Input() mode;
	@ViewChild(QuestionSheetPreviewDialog) previewDialog: QuestionSheetPreviewDialog;
	@ViewChild(SelectQuestionSheetDialog) selectSheetDialog: SelectQuestionSheetDialog;
	@ViewChild(QuestionSheetEditorDialog) editorDialog: QuestionSheetEditorDialog;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) {
		super();
		this.examQuestions = [];
		this.sheet = new QuestionSheet();
	}

	ngOnInit() {
	}

	render(unit: CourseUnit) {
		this.unit = unit;

		this.unit.populateExercise(this).subscribe(() => {
			this.unit.exercise.populateSheet(this).subscribe(() => {
				this.sheet = this.unit.exercise.sheet;
				this.sheet.listQuestions(this).subscribe(examQuestions => {
					this.examQuestions = examQuestions;
				});
			});
		});
	}

	saveEditor(): Observable<any> {
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
			return Observable.forkJoin(ExamQuestion.createArray(this, newExamQuestions), ExamQuestion.updateArray(this, existExamQuestions));
		});
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


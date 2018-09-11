import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Survey } from '../../../shared/models/elearning/survey.model';
import { Question } from '../../../shared/models/elearning/question.model';
import { SurveySheet } from '../../../shared/models/elearning/survey-sheet.model';
import { SurveyQuestion } from '../../../shared/models/elearning/survey-question.model';
import { SurveySheetPreviewDialog } from '../survey-sheet-preview/survey-sheet-preview.dialog.component';
import { SurveySheetSaveDialog } from '../survey-sheet-save/survey-sheet-save.dialog.component';
import { Http, Response } from '@angular/http';
import { QUESTION_SELECTION, GROUP_CATEGORY, EXAM_STATUS, QUESTION_TYPE, EXAM_MEMBER_STATUS, QUESTION_LEVEL } from '../../../shared/models/constants'
import { SelectItem, MenuItem } from 'primeng/api';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { SelectSurveySheetDialog } from '../../../shared/components/select-survey-sheet-dialog/select-survey-sheet-dialog.component';
import { TreeNode } from 'primeng/api';
import { SelectQuestionsDialog } from '../../../shared/components/select-question-dialog/select-question-dialog.component';

@Component({
	moduleId: module.id,
	selector: 'survey-editor',
	templateUrl: 'survey-editor.component.html',
})
export class SurveyEditor extends BaseComponent {

	private survey: Survey;
	private sheet: SurveySheet;
	private surveyQuestions: SurveyQuestion[];

	@ViewChild(SurveySheetPreviewDialog) previewDialog: SurveySheetPreviewDialog;
	@ViewChild(SelectSurveySheetDialog) selectSheetDialog: SelectSurveySheetDialog;
	@ViewChild(SelectQuestionsDialog) selectQuestionDialog: SelectQuestionsDialog;
	@ViewChild(SurveySheetSaveDialog) saveDialog: SurveySheetSaveDialog;

	constructor() {
		super();
		this.sheet = new SurveySheet();
		this.surveyQuestions = [];
		this.survey = new Survey();
	}

	render(survey: Survey, sheet: SurveySheet) {
		this.survey = survey;
		this.sheet = sheet;
		this.loadSurveynSheet();
	}

	loadSurveynSheet() {
		this.sheet.listQuestions(this).subscribe(surveyQuestions => {
			this.surveyQuestions = surveyQuestions;
		});
	}

	save() {
		this.sheet.finalized = true;
		return this.sheet.save(this).flatMap(() => {
			_.each(this.surveyQuestions, (surveyQyestion: SurveyQuestion) => {
				surveyQyestion.sheet_id = this.sheet.id;
			});
			var newSurveyQuestions = _.filter(this.surveyQuestions, (surveyQuestion: SurveyQuestion) => {
				return surveyQuestion.id == null;
			});
			return SurveyQuestion.createArray(this, newSurveyQuestions).do(() => {
				this.success(this.translateService.instant('Content saved successfully.'));
			});
		});
	}


	previewSheet() {
		this.previewDialog.show(this.sheet);
	}

	clearSheet() {
		this.sheet.finalized = false;
		this.sheet.save(this).subscribe(() => {
			var existSurveyQuestions = _.filter(this.surveyQuestions, (surveyQuestion: SurveyQuestion) => {
				return surveyQuestion.id != null;
			});
			SurveyQuestion.deleteArray(this, existSurveyQuestions).subscribe(() => {
				this.surveyQuestions = [];
			});
		})
	}

	loadSheetTemplate() {
		if (this.surveyQuestions.length == 0)
			this.selectSheetDialog.show();
		this.selectSheetDialog.onSelectSheet.first().subscribe((sheetTempl: SurveySheet) => {
			sheetTempl.listQuestions(this).subscribe(surveyQuestions => {
				this.surveyQuestions = _.map(surveyQuestions, surveyQuestion => {
					var newSurveyQuestion = surveyQuestion.clone();
					return newSurveyQuestion;
				});
			});
		});
	}

	saveToTemplate() {
		if (this.sheet && this.sheet.finalized) {
			this.saveDialog.show(this.sheet, this.surveyQuestions);
		}
	}

	designSheet() {
		if (this.surveyQuestions.length == 0) {
			this.selectQuestionDialog.show();
			this.selectQuestionDialog.onSelectQuestions.first().subscribe(questions => {
				this.surveyQuestions = _.map(questions, (question: Question) => {
					var newSurveyQuestion = new SurveyQuestion();
					newSurveyQuestion.question_id = question.id;
					newSurveyQuestion.title = question.title;
					newSurveyQuestion.type = question.type;
					newSurveyQuestion.survey_id = this.survey.id;
					newSurveyQuestion.group_id = question.group_id;
					newSurveyQuestion.group_name = question.group_name;
					newSurveyQuestion.content = question.content;
					return newSurveyQuestion;
				});
			});
		}
	}
}
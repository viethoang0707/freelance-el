import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Survey } from '../../../shared/models/elearning/survey.model';
import { Question } from '../../../shared/models/elearning/question.model';
import { SurveySheet } from '../../../shared/models/elearning/survey-sheet.model';
import { SurveyQuestion } from '../../../shared/models/elearning/survey-question.model';
import { SurveySheetPreviewDialog } from '../../../assessment/question/survey-sheet-preview/survey-sheet-preview.dialog.component';
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
	selector: 'survey-content-dialog',
	templateUrl: 'survey-content.dialog.component.html',
})
export class SurveyContentDialog extends BaseComponent {

	private display: boolean;
	private survey: Survey;
	private sheet: SurveySheet;
	private surveyQuestions: SurveyQuestion[];


	@ViewChild(SurveySheetPreviewDialog) previewDialog : SurveySheetPreviewDialog;
	@ViewChild(SelectSurveySheetDialog) selectSheetDialog: SelectSurveySheetDialog;
	@ViewChild(SelectQuestionsDialog) selectQuestionDialog: SelectQuestionsDialog;
	@ViewChild(SurveySheetSaveDialog) saveDialog: SurveySheetSaveDialog;

	constructor() {
		super();
		this.sheet = new SurveySheet();
		this.surveyQuestions = [];
		this.survey = new Survey();
	}

	show(survey: Survey) {
		this.display = true;
		this.survey = survey;
		this.loadSurveynSheet();
	}

	loadSurveynSheet() {
		this.startTransaction();
		SurveySheet.bySurvey(this, this.survey.id).subscribe(sheet => {
			if (sheet) {
				this.sheet = sheet;
				this.startTransaction();
				SurveyQuestion.listBySheet(this, this.sheet.id).subscribe(surveyQuestions => {
					this.surveyQuestions = surveyQuestions;
					this.closeTransaction();
				});
			}
			else {
				this.sheet = new SurveySheet();
				this.sheet.survey_id = this.survey.id;
				this.startTransaction();
				this.sheet.save(this).subscribe(sheet => {
					this.sheet = sheet;
					this.closeTransaction();
				});
			}
		});
	}

	save() {
		this.startTransaction();
		var subscriptions = _.map(this.surveyQuestions, surveyQuestion=> {
			return surveyQuestion.save(this);
		});
		subscriptions.push(this.sheet.save(this));
		Observable.forkJoin(...subscriptions).subscribe(()=> {
			this.hide();
			this.success(this.translateService.instant('Content saved successfully.'));
			this.closeTransaction();
		});
	}

	hide() {
		this.display = false;
	}

	previewSheet() {
		this.previewDialog.show(this.sheet);
	}

	clearSheet() {
		this.sheet.finalized =  false;
		var subscriptions = _.map(this.surveyQuestions, surveyQuestion=> {
			return surveyQuestion.delete(this);
		});
		subscriptions.push(this.sheet.save(this));
		this.startTransaction();
		Observable.forkJoin(subscriptions).subscribe(()=> {
			this.surveyQuestions = [];
			this.closeTransaction();
		});
	}

	loadSheetTemplate() {
		if (!this.sheet.finalized  && this.surveyQuestions.length ==0)
			this.selectSheetDialog.show();
			this.selectSheetDialog.onSelectSheet.subscribe((sheetTempl:SurveySheet) => {
				this.startTransaction();
				SurveyQuestion.listBySheet(this, sheetTempl.id).subscribe(examQuestions=> {
					surveyQuestions = _.map(surveyQuestions, surveyQuestion=> {
						var newExamQuestion = new ExamQuestion();
						newExamQuestion.exam_id =  this.exam.id;
						newExamQuestion.score = examQuestion.score;
						newExamQuestion.sheet_id =  this.sheet.id;
						return newExamQuestion; 
					});
					this.sheet.finalized =  true;
					var subscriptions = _.map(examQuestions, examQuestion=> {
						return examQuestion.save(this);
					});
					subscriptions.push(this.sheet.save(this));
					Observable.forkJoin(subscriptions).subscribe(()=> {
						this.loadQuestionSheet();
						this.closeTransaction();
					});
				});
			});
	}

	saveToTemplate() {
		if (this.sheet && this.sheet.finalized) {
			this.saveDialog.show(this.sheet, this.examQuestions);
		}
	}

	designSheet() {
		if (this.sheet && this.sheet.finalized) {
			this.editorDialog.show(this.sheet);
			this.editorDialog.onSave.subscribe(()=> {
				this.loadQuestionSheet();
			})
		}
	}
}
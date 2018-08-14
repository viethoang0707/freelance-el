import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { Question } from '../../../shared/models/elearning/question.model';
import { SurveySheet } from '../../../shared/models/elearning/survey-sheet.model';
import { ExamGrade } from '../../../shared/models/elearning/exam-grade.model';
import { SurveyQuestion } from '../../../shared/models/elearning/survey-question.model';
import { Http, Response } from '@angular/http';
import { QUESTION_SELECTION, GROUP_CATEGORY, EXAM_STATUS, QUESTION_TYPE, EXAM_MEMBER_STATUS, QUESTION_LEVEL } from '../../../shared/models/constants'
import { SelectItem, MenuItem } from 'primeng/api';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { SelectQuestionsDialog } from '../../../shared/components/select-question-dialog/select-question-dialog.component';
import { TreeNode } from 'primeng/api';

@Component({
	moduleId: module.id,
	selector: 'survey-sheet-save-dialog',
	templateUrl: 'survey-sheet-save.dialog.component.html',
})
export class SurveySheetSaveDialog extends BaseComponent {

	private display: boolean;
	private sheet: SurveySheet;
	private surveyQuestions: SurveyQuestion[];

	constructor() {
		super();
		this.sheet =  new SurveySheet();
	}

	show(sheet: SurveySheet, questions: SurveyQuestion[]) {
		this.display = true;
		this.sheet =  sheet;
		this.surveyQuestions =  questions;
	}

	save() {
		var sheet = this.sheet.clone()
		sheet.save(this).subscribe(()=> {
			var surveyQuestions = _.map(this.surveyQuestions, question=> {
				var surveyQuestion = question.clone();
				surveyQuestion.sheet_id = sheet.id;
				return surveyQuestion;
			});
			SurveyQuestion.createArray(this, surveyQuestions).subscribe(()=> {
				this.success('Question sheet saved successfully');
				this.hide();
			});
		});
	}

	hide() {
		this.display = false;
	}



	
}
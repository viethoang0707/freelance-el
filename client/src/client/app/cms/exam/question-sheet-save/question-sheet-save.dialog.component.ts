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
import { Http, Response } from '@angular/http';
import { QUESTION_SELECTION, GROUP_CATEGORY, EXAM_STATUS, QUESTION_TYPE, EXAM_MEMBER_STATUS, QUESTION_LEVEL } from '../../../shared/models/constants'
import { SelectItem, MenuItem } from 'primeng/api';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { SelectQuestionsDialog } from '../../../shared/components/select-question-dialog/select-question-dialog.component';
import { TreeNode } from 'primeng/api';

@Component({
	moduleId: module.id,
	selector: 'question-sheet-save-dialog',
	templateUrl: 'question-sheet-save.dialog.component.html',
})
export class QuestionSheetSaveDialog extends BaseComponent {

	private display: boolean;
	private sheet: QuestionSheet;
	private examQuestions: ExamQuestion[];

	constructor() {
		super();
		this.sheet =  new QuestionSheet();
	}

	show(sheet: QuestionSheet, questions: ExamQuestion[]) {
		this.display = true;
		this.sheet =  sheet;
		this.examQuestions =  questions;
	}

	save() {
		var sheet = new QuestionSheet();
		sheet.name = this.sheet.name;
		this.startTransaction();
		sheet.save(this).subscribe(()=> {
			var examQuestions = _.map(this.examQuestions, question=> {
				var questionTempl = new ExamQuestion();
				questionTempl.question_id =  question.question_id;
				questionTempl.sheet_id =  sheet.id;
				return questionTempl;
			});
			var subscriptions = _.map(examQuestions, examQuestion=> {
				return examQuestion.save(this);
			});
			subscriptions.push(this.sheet.save(this));
			Observable.forkJoin(subscriptions).subscribe(()=> {
				this.success(this.translateService.instant('Question sheet saved successfully'));
				this.closeTransaction();
				this.hide();
			});
		});
	}

	hide() {
		this.display = false;
	}



	
}
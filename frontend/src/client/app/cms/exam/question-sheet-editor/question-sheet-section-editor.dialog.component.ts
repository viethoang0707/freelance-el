import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
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
import { QuestionSheetSection } from '../../../shared/models/elearning/question_sheet-section.model';
import { QuestionSelectorComponent } from './question-selector.component';

const GROUP_FIELDS = ['name', 'category' ,'parent_id', 'question_count'];

@Component({
	moduleId: module.id,
	selector: 'question-sheet-section-editor-dialog',
	templateUrl: 'question-sheet-section-editor.dialog.component.html',
})
export class QuestionSheetSectionEditorDialog extends BaseComponent  {

	QUESTION_LEVEL = QUESTION_LEVEL;

	private display: boolean;
	private section: QuestionSheetSection;
	private examQuestions: ExamQuestion[];

	private onSaveReceiver: Subject<any> = new Subject();
  onSave: Observable<any> = this.onSaveReceiver.asObservable();
  @ViewChild(QuestionSelectorComponent) selector:QuestionSelectorComponent;

	constructor() {
		super();		
	}

	show(section:QuestionSheetSection) {
		this.section =  section;
		this.display = true;
	}


	hide() {
		this.display = false;
	}

	save() {
		Observable.forkJoin(this.selector.generateQuestion())
				.map(questions => {
					return _.flatten(questions)
				})
				.subscribe(questions => {
					this.examQuestions = questions;
					_.each(this.examQuestions, (examQuestion: ExamQuestion) => {
						examQuestion.sheet_id = this.section.sheet_id;
						examQuestion.section_id = this.section.id;
					});
					//this.onSaveReceiver.next(this.examQuestions);
					this.hide();
					console.log(this.examQuestions);
					this.success(this.translateService.instant('Content saved successfully.'));
				});
	}

	
}
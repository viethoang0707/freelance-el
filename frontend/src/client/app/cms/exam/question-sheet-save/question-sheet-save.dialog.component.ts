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
import { Http, Response } from '@angular/http';
import { QUESTION_SELECTION, GROUP_CATEGORY, EXAM_STATUS, QUESTION_TYPE, EXAM_MEMBER_STATUS, QUESTION_LEVEL } from '../../../shared/models/constants'
import { SelectItem, MenuItem } from 'primeng/api';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { SelectQuestionsDialog } from '../../../shared/components/select-question-dialog/select-question-dialog.component';
import { TreeNode } from 'primeng/api';
import { BaseModel } from '../../../shared/models/base.model';
import { CreateAPI } from '../../../shared/services/api/create.api';


@Component({
	moduleId: module.id,
	selector: 'question-sheet-save-dialog',
	templateUrl: 'question-sheet-save.dialog.component.html',
})
export class QuestionSheetSaveDialog extends BaseComponent {

	private display: boolean;
	private sheet: QuestionSheet;

	constructor() {
		super();
		this.sheet =  new QuestionSheet();
	}

	show(sheet: QuestionSheet) {
		this.display = true;
		this.sheet =  sheet;
	}

	save() {
		this.sheet.replicate(this).subscribe(()=> {
			this.success(this.translateService.instant('Question sheet saved successfully'));
				this.hide();
		});
	}

	hide() {
		this.display = false;
	}



	
}
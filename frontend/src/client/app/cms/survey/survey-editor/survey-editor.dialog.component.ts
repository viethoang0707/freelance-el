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
import { SurveyEditor } from './survey-editor.component';

@Component({
	moduleId: module.id,
	selector: 'survey-editor-dialog',
	templateUrl: 'survey-editor.dialog.component.html',
})
export class SurveyEditorDialog extends BaseComponent {

	private display: boolean;
	private survey: Survey;
	private sheet: SurveySheet;

	@ViewChild(SurveyEditor) surveyContent: SurveyEditor;


	constructor() {
		super();
		this.sheet = new SurveySheet();
		this.survey = new Survey();
	}

	show(survey: Survey,sheet:SurveySheet) {
		this.display = true;
		this.survey = survey;
		this.sheet = sheet;
		this.surveyContent.render(this.survey, this.sheet);
	}

	
	save() {
		this.surveyContent.save().subscribe(()=> {
			this.hide();
		})
	}

	hide() {
		this.display = false;
	}

	
}
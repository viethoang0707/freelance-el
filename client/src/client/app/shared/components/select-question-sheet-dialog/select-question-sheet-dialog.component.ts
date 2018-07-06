import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { ModelAPIService } from '../../services/api/model-api.service';
import { AuthService } from '../../services/auth.service';
import { ExamQuestion } from '../../models/elearning/exam-question.model';
import { BaseComponent } from '../base/base.component';
import { QuestionSheet } from '../../../shared/models/elearning/question-sheet.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GROUP_CATEGORY, CONTENT_STATUS } from '../../../shared/models/constants'
import { SelectItem } from 'primeng/api';

@Component({
	moduleId: module.id,
	selector: 'select-question-sheet-dialog',
	templateUrl: 'select-question-sheet-dialog.component.html',
	styleUrls: ['select-question-sheet-dialog.component.css'],
})
export class SelectQuestionSheetDialog extends BaseComponent {

	private selectedSheet: QuestionSheet[];
	private sheets:QuestionSheet[];
	private display: boolean;

	private onSelectSheetReceiver: Subject<any> = new Subject();
    onSelectSheet:Observable<any> =  this.onSelectSheetReceiver.asObservable();

	constructor() {
		super();
		this.display = false;
		this.sheets = [];
	}

	hide() {
		this.display = false;
	}


	show() {
		this.display = true;
		QuestionSheet.listTemplate(this).subscribe(sheets => {
			this.sheets = sheets;
		});
	}

	selectSheet() {
		this.onSelectSheetReceiver.next(this.selectedSheet);
		this.hide();
	}


}


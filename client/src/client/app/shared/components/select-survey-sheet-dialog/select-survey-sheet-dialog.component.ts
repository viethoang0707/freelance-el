import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { SurveyQuestion } from '../../models/elearning/survey-question.model';
import { BaseComponent } from '../base/base.component';
import { SurveySheet } from '../../../shared/models/elearning/survey-sheet.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GROUP_CATEGORY, COURSE_STATUS } from '../../../shared/models/constants'
import { SelectItem } from 'primeng/api';

@Component({
	moduleId: module.id,
	selector: 'select-survey-sheet-dialog',
	templateUrl: 'select-survey-sheet-dialog.component.html',
	styleUrls: ['select-survey-sheet-dialog.component.css'],
})
export class SelectSurveySheetDialog extends BaseComponent {

	private selectedSheet: SurveySheet[];
	private sheets:SurveySheet[];
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
		SurveySheet.listTemplate(this).subscribe(sheets => {
			this.sheets = sheets;
			_.each(sheets, sheet=> {
				SurveyQuestion.countBySheet(this, sheet["id"]).subscribe(count=> {
					sheet["question_count"] =  count;
				});
			});
		});
	}

	selectSheet() {
		this.onSelectSheetReceiver.next(this.selectedSheet);
		this.hide();
	}


}


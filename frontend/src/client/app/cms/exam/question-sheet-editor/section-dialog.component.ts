import { Component, OnInit, Input } from '@angular/core';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import * as _ from 'underscore';
import { SelectItem } from 'primeng/api';
import { QuestionSheetSection } from '../../../shared/models/elearning/question_sheet-section.model';


@Component({
	moduleId: module.id,
	selector: 'section-dialog',
	templateUrl: 'section-dialog.component.html',
	styleUrls: ['section-dialog.component.css'],
})
export class SectionDialog extends BaseDialog<QuestionSheetSection>  {

	constructor() {
		super();
	}

}



import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { ExamMember } from '../../../shared/models/exam-member.model';
import * as _ from 'underscore';


@Component({
	moduleId: module.id,
	selector: 'etraining-exam-member-dialog',
	templateUrl: 'member-dialog.component.html',
})
export class ExamMemberDialog extends BaseDialog<ExamMember>  {

	constructor() {
		super();
	}	

}



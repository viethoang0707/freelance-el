import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
import { BaseDialog } from '../../shared/components/base/base.dialog';
import { CourseMember } from '../../shared/models/course-member.model';
import * as _ from 'underscore';


@Component({
	moduleId: module.id,
	selector: 'etraining-course-member-dialog',
	templateUrl: 'member-dialog.component.html',
})
export class CourseMemberDialog extends BaseDialog<CourseMember>  {


	constructor() {
		super();
	}

	

}



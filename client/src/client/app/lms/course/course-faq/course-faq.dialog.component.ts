import { Component, OnInit, Input, NgZone} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/group.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { CourseFaq } from '../../../shared/models/course-faq.model';
import * as _ from 'underscore';



@Component({
    moduleId: module.id,
    selector: 'etraining-course-faq-dialog',
    templateUrl: 'course-faq.dialog.component.html',
})
export class CourseFaqDialog extends BaseDialog<CourseFaq> {

	constructor() {
		super();
	}

	ngOnInit() {
	}

}


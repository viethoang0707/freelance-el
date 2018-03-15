import { Component, OnInit, Input, NgZone} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { CourseFaq } from '../../../shared/models/course-faq.model';
import * as _ from 'underscore';



@Component({
    moduleId: module.id,
    selector: 'etraining-gradebook-dialog',
    templateUrl: 'gradebook.dialog.component.html',
})
export class GradebookDialog extends BaseComponent {

	constructor() {
		super();
	}

	ngOnInit() {
	}

}


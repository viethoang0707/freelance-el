import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { CourseFaq } from '../../../shared/models/elearning/course-faq.model';
import * as _ from 'underscore';


@Component({
    moduleId: module.id,
    selector: 'mail-message-dialog',
    templateUrl: 'mail-message.dialog.component.html',
})
export class MailMessageDialog extends BaseComponent {

	private display: boolean;
	private subject: string;
	private body: string;

    constructor() {
        super();
    }

    ngOnInit() {
    }

    show() {
    	this.display = true;
    }

    hide() {
    	this.display = false;
    }



}


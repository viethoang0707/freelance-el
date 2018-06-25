import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { CourseFaq } from '../../../shared/models/elearning/course-faq.model';
import * as _ from 'underscore';
import { NotificationService } from '../../services/notification.service';


@Component({
    moduleId: module.id,
    selector: 'mail-message-dialog',
    templateUrl: 'mail-message.dialog.component.html',
})
export class MailMessageDialog extends BaseComponent {

	private display: boolean;
	private recipients: string[];

    @Input() subject: string;
	@Input() body: string;



    constructor(private mailService: NotificationService) {
        super();
    }

    ngOnInit() {
    }

    show(recipients: string[]) {
    	this.display = true;
        this.recipients = [];
    }

    send() {
        this.mailService.broadcast(this, this.subject, this.body, this.recipients).subscribe(()=> {
            this.success('Mail sent');
            this.hide();
        })
    }

    hide() {
    	this.display = false;
    }



}


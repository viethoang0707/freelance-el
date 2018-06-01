import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { CourseFaq } from '../../../shared/models/elearning/course-faq.model';
import * as _ from 'underscore';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';


@Component({
    moduleId: module.id,
    selector: 'course-message-dialog',
    templateUrl: 'course-message.dialog.component.html',
})
export class MessageDialog extends BaseComponent {

	private display: boolean;
	private subject: string;
	private body: string;
	private members: CourseMember[];

    constructor() {
        super();
    }

    ngOnInit() {
    }

    show(courseClass: CourseClass) {
    	this.display = true;
    	this.startTransaction();
    	CourseMember.listByClass(this, courseClass.id).subscribe(members=> {
    		this.members = members;
    		this.closeTransaction();
    	});
    }

    hide() {
    	this.display = false;
    }

    send() {
    	var cloudId = this.authService.CloudAcc.id;
    	this.notifService.broadcast(this.subject, this.body, member.email, cloudId).subscribe(()=> {
    		this.succes('Sending mail successfully');
    		this.hide();
    		this.closeTransaction();
    	});
    }

}


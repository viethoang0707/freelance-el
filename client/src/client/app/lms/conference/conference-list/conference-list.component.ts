import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, CONFERENCE_STATUS } from '../../../shared/models/constants'
import { CourseMember } from '../../../shared/models/course-member.model';
import { Course } from '../../../shared/models/course.model';
import { CourseClass } from '../../../shared/models/course-class.model';
import { ConferenceMember } from '../../../shared/models/conference-member.model';
import { Conference } from '../../../shared/models/conference.model';
import { Room } from '../../../shared/models/meeting/room.model';
import { MeetingService } from '../../../shared/services/meeting.service';


@Component({
    moduleId: module.id,
    selector: 'etraining-conference-list',
    templateUrl: 'conference-list.component.html',
})
export class ConferenceListComponent extends BaseComponent implements OnInit {

	members: ConferenceMember[];
	CONFERENCE_STATUS =  CONFERENCE_STATUS;

	constructor(private meetingSerivce:MeetingService) {
        super();
    }

    ngOnInit() {
    	ConferenceMember.listByUser(this, this.authService.CurrentUser.id)
    	.subscribe(members => {
    		this.members = members;
    		_.each(members, (member)=> {
    			member.conference = new Conference();
    			Conference.get(this, member.conference_id).subscribe(conference => {
    				member.conference = conference;
    			});
    		});
    	});
    }

    joinConference(member) {
    	this.meetingSerivce.join( member.conference.room_ref,member.room_member_ref)
    }
}

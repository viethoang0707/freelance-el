import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { GROUP_CATEGORY, CONFERENCE_STATUS } from '../../../shared/models/constants'
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { User } from '../../../shared/models/elearning/user.model';
import { ConferenceMember } from '../../../shared/models/elearning/conference-member.model';
import { Conference } from '../../../shared/models/elearning/conference.model';
import { MeetingService } from '../../../shared/services/meeting.service';
import { BaseModel } from '../../../shared/models/base.model';

const CONFERENCE_FIELDS = ['name', 'status', 'room_pass','conferenc_id', 'room_ref'];

@Component({
    moduleId: module.id,
    selector: 'conference-list',
    templateUrl: 'conference-list.component.html',
    styleUrls: ['conference-list.component.css'],
})
export class ConferenceListComponent extends BaseComponent implements OnInit {

	private conferenceMembers: ConferenceMember[];
    private conferences: Conference[];

	CONFERENCE_STATUS = CONFERENCE_STATUS;

	constructor(private meetingSerivce: MeetingService) {
        super();
    }

    ngOnInit() {
        this.lmsProfileService.init(this).subscribe(() => {
            this.conferenceMembers = this.lmsProfileService.MyConferenceMembers;
            Conference.array(this, this.lmsProfileService.MyConferenceIds ).subscribe(conferences=> {
                this.displayConferences(conferences);
            });
        });
    }

    displayConferences(conferences: Conference[]) {
        _.each(conferences, (conference: Conference) => {
            conference['member'] = _.find(this.conferenceMembers, (member:ConferenceMember)=> {
                return member.conference_id == conference.id;
            });
        });
        this.conferences = _.filter(conferences, (conference: Conference) => {
            return conference['member']!=null;
        });
        this.conferences = _.sortBy(this.conferences, (conference: Conference) => {
            return -conference.id;
        });
    }

    joinConference(conference:Conference, member:ConferenceMember) {
         this.meetingSerivce.join(conference.room_ref, member.room_member_ref);
    }

}

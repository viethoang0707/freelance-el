import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, CONFERENCE_STATUS } from '../../../shared/models/constants'
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { User } from '../../../shared/models/elearning/user.model';
import { ConferenceMember } from '../../../shared/models/elearning/conference-member.model';
import { Conference } from '../../../shared/models/elearning/conference.model';
import { Room } from '../../../shared/models/meeting/room.model';
import { MeetingService } from '../../../shared/services/meeting.service';
import { BaseModel } from '../../../shared/models/base.model';


@Component({
    moduleId: module.id,
    selector: 'conference-list',
    templateUrl: 'conference-list.component.html',
    styleUrls: ['conference-list.component.css'],
})
export class ConferenceListComponent extends BaseComponent implements OnInit {

	private conferenceMembers: ConferenceMember[];

	CONFERENCE_STATUS = CONFERENCE_STATUS;

	constructor(private meetingSerivce: MeetingService) {
        super();
    }

    ngOnInit() {
        this.lmsProfileService.init(this).subscribe(() => {
            this.displayConferences();
        });
    }

    displayConferences() {
        this.conferenceMembers = this.lmsProfileService.MyConferenceMembers;
        this.conferenceMembers = _.sortBy(this.conferenceMembers, (member: ConferenceMember) => {
            return -this.lmsProfileService.getLastConferenceTimestamp(member);
        });
    }

    joinConference(conference, member) {
        if (member.is_active)
            this.meetingSerivce.join(conference.room_ref, member.room_member_ref);
        else
            this.error('You are  not allowed to join the conference');
    }

}

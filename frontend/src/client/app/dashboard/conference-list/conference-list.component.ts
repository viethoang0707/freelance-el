import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../shared/components/base/base.component';
import * as _ from 'underscore';
import { GROUP_CATEGORY, CONFERENCE_STATUS } from '../../shared/models/constants'
import { CourseMember } from '../../shared/models/elearning/course-member.model';
import { Course } from '../../shared/models/elearning/course.model';
import { User } from '../../shared/models/elearning/user.model';
import { ConferenceMember } from '../../shared/models/elearning/conference-member.model';
import { Conference } from '../../shared/models/elearning/conference.model';
import { MeetingService } from '../../shared/services/meeting.service';
import { BaseModel } from '../../shared/models/base.model';


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
            var conferenceMembers = this.lmsProfileService.MyConferenceMembers;
            ConferenceMember.populateConferences(this, conferenceMembers ).subscribe(()=> {
                this.displayConferences(conferenceMembers);
            })
        });
    }

    displayConferences(conferenceMembers: ConferenceMember[]) {
        this.conferenceMembers = _.sortBy(conferenceMembers, (member: ConferenceMember) => {
            return -this.lmsProfileService.getLastConferenceTimestamp(member);
        });
    }

    joinConference(conference:Conference, member:ConferenceMember) {
        if (member.is_active)
            this.meetingSerivce.join(conference.room_ref, member.room_member_ref);
        else
            this.error(this.translateService.instant('You are  not allowed to join the conference'));
    }

}

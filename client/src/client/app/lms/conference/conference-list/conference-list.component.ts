import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
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
    private currentUser: User;

	CONFERENCE_STATUS = CONFERENCE_STATUS;

	constructor(private meetingSerivce: MeetingService) {
        super();
        this.currentUser = this.authService.UserProfile;
    }

    displayConferences() {


    }

    ngOnInit() {
        ConferenceMember.listByUser(this, this.currentUser.id).subscribe((conferenceMembers) => {
            conferenceMembers = _.filter(conferenceMembers, (member: ConferenceMember) => {
                return member.conference_id && member.conference_status == 'open';
            });
            ConferenceMember.populateConferenceForArray(this, conferenceMembers).subscribe(() => {
                this.conferenceMembers =  conferenceMembers;
                this.conferenceMembers.sort((member1, member2): any => {
                    return member1.create_date < member2.create_date;
                });
            });
        });
    }

    joinConference(member) {
        if (member.is_active)
            this.meetingSerivce.join(member.conference.room_ref, member.room_member_ref);
        else
            this.error('You are  not allowed to join the conference');
    }

}

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
        ConferenceMember.listByUser(this, this.ContextUser.id).subscribe((conferenceMembers) => {
            conferenceMembers = _.filter(conferenceMembers, (member: ConferenceMember) => {
                return member.conference_id && member.conference_status == 'open';
            });
            ConferenceMember.populateConferences(this, conferenceMembers).subscribe(() => {
                this.conferenceMembers =  conferenceMembers;
                this.conferenceMembers.sort((member1:ConferenceMember, member2:ConferenceMember): any => {
                    return member1.create_date.getTime() - member2.create_date.getTime();
                });
            });
        });
    }

    joinConference(member) {
        if (member.is_active)
            this.meetingSerivce.join(member.conference.room_ref, member.room_member_ref);
        else
            this.error(this.translateService.instant('You are  not allowed to join the conference'));
    }

}

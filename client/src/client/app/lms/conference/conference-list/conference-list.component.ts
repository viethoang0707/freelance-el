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

	private conferences: Conference[];

	CONFERENCE_STATUS = CONFERENCE_STATUS;

	constructor(private meetingSerivce: MeetingService) {
        super();
    }

    ngOnInit() {
        ConferenceMember.listByUser(this, this.ContextUser.id).subscribe((conferenceMembers) => {
            this.displayConferences(conferenceMembers);
        });
    }

    displayConferences(conferenceMembers: ConferenceMember[]) {
        conferenceMembers = _.filter(conferenceMembers, (member: ConferenceMember) => {
            return member.conference_id && member.conference_status == 'open';
        });
        ConferenceMember.populateConferences(this, conferenceMembers).subscribe(conferences => {
            conferences.sort((conf1: Conference, conf2: Conference): any => {
                return this.getLastConferenceTimestamp(conf2) - this.getLastConferenceTimestamp(conf1);
            });
            this.conferences = conferences;
            _.each(conferences, (conf: Conference) => {
                conferences["member"] = _.find(conferenceMembers, (member: ConferenceMember) => {
                    return member.conference_id == conf.id;
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

    getLastConferenceTimestamp(conf:Conference) {
        var timestamp = conf.create_date.getTime();
        if (conf["member"] && conf["member"].create_date.getTime() < timestamp)
            timestamp = conf["member"].create_date.getTime();
        return timestamp;
    }

}

import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { BaseComponent } from '../../shared/components/base/base.component';
import { CourseMember } from '../../shared/models/elearning/course-member.model';
import { Course } from '../../shared/models/elearning/course.model';
import { CourseClass } from '..//../shared/models/elearning/course-class.model';
import { ConferenceMember } from '../../shared/models/elearning/conference-member.model';
import { Conference } from '../../shared/models/elearning/conference.model';
import { Room } from '../../shared/models/meeting/room.model';
import { MeetingService } from '../../shared/services/meeting.service';
import { GROUP_CATEGORY, CONFERENCE_STATUS } from '../../shared/models/constants';
import * as _ from 'underscore';


declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'user-dashboard',
    templateUrl: 'user-dashboard.component.html'

})
export class UserDashboardComponent extends BaseComponent implements OnInit {
    cities: any[];

    cars: any[];

    chartData: any;

    events: any[];

    selectedCity: any;

    items: MenuItem[];

    header: any;

    confMembers: ConferenceMember[];
    CONFERENCE_STATUS = CONFERENCE_STATUS;

    constructor(private meetingSerivce: MeetingService) {
        super();
    }

    ngOnInit() {


        this.cities = [];
        this.cities.push({ label: 'Select City', value: null });
        this.cities.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
        this.cities.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
        this.cities.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN' } });
        this.cities.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } });
        this.cities.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#FFC107'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#03A9F4'
                }
            ]
        };

        this.items = [
            { label: 'Save', icon: 'ui-icon-check' },
            { label: 'Update', icon: 'ui-icon-refresh' },
            { label: 'Delete', icon: 'ui-icon-delete' }
        ];

        this.header = {
            left: 'prev, today, next',
            center: 'title',
            right: 'month, agendaWeek, agendaDay'
        };

        ConferenceMember.listByUser(this, this.authService.UserProfile.id)
            .subscribe(members => {
                this.confMembers = members;
                _.each(members, (member) => {
                    member.conference = new Conference();
                    Conference.get(this, member.conference_id).subscribe(conference => {
                        member.conference = conference;
                    });
                });
            });
    }

    joinConference(member) {
        this.meetingSerivce.join(member.conference.room_ref, member.room_member_ref)
    }

}


import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Conference } from '../../../shared/models/elearning/conference.model';
import { ConferenceMember } from '../../../shared/models/elearning/conference-member.model';
import { Room } from '../../../shared/models/meeting/room.model';
import { RoomMember } from '../../../shared/models/meeting/room-member.model';
import { SelectItem } from 'primeng/api';

@Component({
    moduleId: module.id,
    selector: 'class-conference-dialog',
    templateUrl: 'class-conference.dialog.component.html',
})
export class ClassConferenceDialog extends BaseComponent {

	private display: boolean;
	private courseClass: CourseClass;
	private members: CourseMember[];
	private conference: Conference;
	private selectedMember: CourseMember;
	private room: Room;

	constructor() {
		super();
		this.display = false;
		this.courseClass = new CourseClass();
		this.members  = [];
		this.conference = new Conference();
	}

	show(courseClass: CourseClass) {
		this.display = true;
		this.courseClass =  courseClass;
		this.startTransaction();
		Conference.byClass(this, courseClass.id).subscribe(conference => {
			if (conference) {
				this.conference = conference;
				Room.byRef(this, conference.room_ref).subscribe(room => {
					this.room = room;
				});
			}
			CourseMember.listByClass(this, courseClass.id).subscribe(members => {
				this.members =  members;
				if (this.conference) {
					ConferenceMember.listByConference(this, this.conference.id).subscribe(confMembers=> {
						_.each(members, (member)=> {
							member["conferenceMember"] = _.find(confMembers, confMember=> {
								return confMember.course_member_id == member.id;
							});
							member["is_active"] = member["conferenceMember"] && member["conferenceMember"].is_active;
						});
						
					});
				} 
				this.closeTransaction();
			});
		});
	}

	hide() {
		this.display = false;
	}

	openConference() {
		if (this.conference.id && this.conference.status !='open' ) {
			this.conference.status = 'open';
			this.startTransaction();
			this.conference.save(this).subscribe(()=> {
				this.info('Conference open');
				this.closeTransaction();
			});
		}
		if (!this.conference.id ) {
			this.startTransaction();
			Room.createWebminarRoom(this, this.courseClass.name).subscribe(room => {
				this.room = room;
				this.conference.room_ref =  room.ref;
				this.conference.room_pass =  room.password;
				this.conference.class_id =  this.courseClass.id;
				this.conference.status = 'open';
				this.conference.save(this).subscribe(()=> {
					this.info('Conference open');
					_.each(this.members, (member)=> {
						RoomMember.createRoomMember(this, member.name, member.image, room.id, member.role).subscribe(roomMember => {
							var conferenceMember = new ConferenceMember();
							conferenceMember.conference_id =  this.conference.id;
							conferenceMember.room_member_ref =  roomMember.ref;
							conferenceMember.course_member_id =  member.id;
							conferenceMember.save(this).subscribe(()=> {
								member["conferenceMember"] = conferenceMember;
								member["is_active"] = true;
							});
						});
					});
					this.closeTransaction();
				});
			})
			
		}
	}


	closeConference() {
		if (this.conference.id && this.conference.status !='closed') {
			this.conference.status = 'closed';
			this.startTransaction();
			this.conference.save(this).subscribe(()=> {
				this.info('Conference closed');
				this.closeTransaction();
			});
		}
	}

	accessControl(event:any, member: any) {
		var conferenceMember = member.conferenceMember;
		if (event.checked) {
			this.startTransaction();
			if (conferenceMember) {
				conferenceMember.is_active = true;
				conferenceMember.save(this).subscribe(()=> {
					this.closeTransaction();
				});
			} else {
				RoomMember.createRoomMember(this, member.name, member.image, this.room.id, member.role).subscribe(roomMember => {
					var conferenceMember = new ConferenceMember();
					conferenceMember.conference_id =  this.conference.id;
					conferenceMember.room_member_ref =  roomMember.ref;
					conferenceMember.course_member_id =  member.id;
					conferenceMember.is_active = true;
					conferenceMember.save(this).subscribe(()=> {
						member.conferenceMember = conferenceMember;
						this.closeTransaction();
					});
				})
			}
		} else {
			this.startTransaction();
			if (conferenceMember) {
				conferenceMember.is_active = false;
				conferenceMember.save(this).subscribe(()=> {
					this.closeTransaction();
				});
			}
		}
	}
}

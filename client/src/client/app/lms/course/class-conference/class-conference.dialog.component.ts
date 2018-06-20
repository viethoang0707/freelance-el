import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
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
import { BaseModel } from '../../../shared/models/base.model';

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
		BaseModel
		.bulk_search(this, Conference.__api__byClass( courseClass.id), CourseMember.__api__listByClass(courseClass.id))
		.subscribe(jsonArr=> {
			var conferences = Conference.toArray(jsonArr[0]);
			var members = CourseMember.toArray(jsonArr[1]);
			if (conferences.length) {
				this.conference = conferences[0];
				BaseModel
				.bulk_search(this, Room.__api__byRef( this.conference .room_ref), ConferenceMember.__api__listByConference(this.conference.id))
				.subscribe(jsonArr=> {
					var rooms = Room.toArray(jsonArr[0]);
					var conferenceMembers = ConferenceMember.toArray(jsonArr[1]);
					_.each(members, (member:CourseMember)=> {
							member["conferenceMember"] = _.find(conferenceMembers, (confMember:ConferenceMember)=> {
								return confMember.course_member_id == member.id;
							});
							member["is_active"] = member["conferenceMember"] && member["conferenceMember"].is_active;
					});
					this.members = members;
				});
			}
					
		});
	}

	hide() {
		this.display = false;
	}

	openConference() {
		if (this.conference.id && this.conference.status !='open' ) {
			this.conference.status = 'open';
			this.conference.save(this).subscribe(()=> {
				this.info(this.translateService.instant('Conference open'));
			});
		}
		if (!this.conference.id ) {
			this.room = Room.createWebminarRoom(this.courseClass.name);
			this.room.save(this).subscribe(()=> {
				this.room.refresh(this).subscribe(()=> {
					this.conference.room_ref =  this.room.ref;
					this.conference.room_pass =  this.room.password;
					this.conference.class_id =  this.courseClass.id;
					this.conference.status = 'open';
					this.conference.save(this).subscribe(()=> {
						this.info(this.translateService.instant('Conference open'));
						var conferenceMembers = [];
						var roomMembers = [];
						for (var i =0;i<this.members.length;i++) {
							var member =  this.members[i];
							var conferenceMember = new ConferenceMember();
							conferenceMember.conference_id =  this.conference.id;
							conferenceMember.course_member_id =  member.id;
							member["conferenceMember"] = conferenceMember;
							member["is_active"] = true;
							conferenceMembers.push(conferenceMember);
							var roomMember = RoomMember.createRoomMember( member.name, member.image, this.room.id, member.role);
							roomMembers.push(roomMember);
						}
						ConferenceMember.createArray(this, conferenceMembers).subscribe(()=> {
							RoomMember.createArray(this, roomMembers).subscribe(()=> {
								for (var i =0;i<this.members.length;i++) {
									conferenceMembers[i].room_member_ref = roomMembers[i].ref;
								}
							});
						});
					});
				})
			});
		}
	}


	closeConference() {
		if (this.conference.id && this.conference.status !='closed') {
			this.conference.status = 'closed';
			this.conference.save(this).subscribe(()=> {
				this.info('Conference closed');
			});
		}
	}

	accessControl(event:any, member: any) {
		var conferenceMember = member.conferenceMember;
		if (event.checked) {
			if (conferenceMember) {
				conferenceMember.is_active = true;
				conferenceMember.save(this).subscribe(()=> {
					
				});
			} else {
				var roomMember = RoomMember.createRoomMember(member.name, member.image, this.room.id, member.role);
				roomMember.save(this).subscribe(()=> {
					var conferenceMember = new ConferenceMember();
					conferenceMember.conference_id =  this.conference.id;
					conferenceMember.room_member_ref =  roomMember.ref;
					conferenceMember.course_member_id =  member.id;
					conferenceMember.is_active = true;
					conferenceMember.save(this).subscribe(()=> {
						member.conferenceMember = conferenceMember;
						
					});
				});
			}
		} else {
			if (conferenceMember) {
				conferenceMember.is_active = false;
				conferenceMember.save(this).subscribe(()=> {
				});
			}
		}
	}
}

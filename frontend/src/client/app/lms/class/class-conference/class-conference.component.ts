import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Conference } from '../../../shared/models/elearning/conference.model';
import { ConferenceMember } from '../../../shared/models/elearning/conference-member.model';
import { SelectItem } from 'primeng/api';
import { BaseModel } from '../../../shared/models/base.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

const COURSE_MEMBER_FIELDS = ['group_name', 'name', 'conference_member_id'];

@Component({
	moduleId: module.id,
	selector: 'class-conference',
	templateUrl: 'class-conference.component.html',
})
export class ClassConferenceComponent extends BaseComponent implements OnInit {

	private courseMembers: CourseMember[];
	private conference: Conference;
	private selectedMembers: any;

	constructor(private router: Router, private route: ActivatedRoute) {
		super();
		this.courseMembers = [];
		this.conference = new Conference();
	}

	ngOnInit() {
		this.conference = this.route.snapshot.data['conference'];
		this.loadMembers();
	}


	registerAll() {
		var newMembers = _.filter(this.courseMembers, (member: CourseMember) => {
			return !member.conference_member_id;
		});
		var memberIds = _.pluck(newMembers, 'id');
		this.conference.registerConferenceMember(this, memberIds).subscribe(() => {
			this.loadMembers();
		});
	}

	loadMembers() {
		this.selectedMembers = [];
		BaseModel
			.bulk_search(this, CourseClass.__api__listMembers(this.conference.class_id, COURSE_MEMBER_FIELDS))
			.map(jsonArr => {
				return _.flatten(jsonArr)
			})
			.subscribe(jsonArr => {
				this.courseMembers = CourseMember.toArray(jsonArr);
			});
	}

	close() {
		this.router.navigate(['/lms/class/manage', this.conference.class_id]);
	}
}


import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Group } from '../../shared/models/group.model';
import { BaseDialog } from '../../shared/components/base/base.dialog';
import { Course } from '../../shared/models/course.model';
import { CourseClass } from '../../shared/models/course-class.model';
import { CourseMember } from '../../shared/models/course-member.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { SelectItem, MenuItem } from 'primeng/api';
import { CourseMemberDialog } from '../member-dialog/member-dialog.component';
import { GROUP_CATEGORY, COURSE_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE,
 COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS } from '../../shared/models/constants'
import { SelectUsersDialog } from '../../shared/components/select-user-dialog/select-user-dialog.component';

@Component({
	moduleId: module.id,
	selector: 'etraining-course-enrollment-dialog',
	templateUrl: 'enrollment-dialog.component.html',
})
export class CourseEnrollDialog extends BaseDialog<Course> {

	display: boolean;
	processing: boolean;
	selectedMember: CourseMember;
	members: CourseMember[];
	course: Course;
	courseClass: CourseClass;
	items: SelectItem[];
	@ViewChild(CourseMemberDialog) memberDialog: CourseMemberDialog;
	@ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;

	COURSE_MODE = COURSE_MODE;
	COURSE_STATUS = COURSE_STATUS;
	COURSE_MEMBER_ROLE = COURSE_MEMBER_ROLE;
	COURSE_MEMBER_STATUS = COURSE_MEMBER_STATUS;
	COURSE_MEMBER_ENROLL_STATUS = COURSE_MEMBER_ENROLL_STATUS;
	
	constructor() {
		super();
		this.items = [
			{ label: this.translateService.instant('Student'),value:'student',command:()=> {this.add('student')}},
			{ label: this.translateService.instant('Teacher'),value:'teacher',command:()=> {this.add('teacher')}},
		
		]
	}

	enrollCourse(course:Course, courseClass?:CourseClass) {
		this.course = course;
		this.courseClass = courseClass;
		this.display = true;
		this.processing = false;
		this.loadMembers();
	}

	enrollClass(courseClass:CourseClass) {
		this.courseClass = courseClass;
		this.display = true;
		this.processing = false;
		this.loadMembers();
	}

	hide() {
		this.display = false;
	}


	add(role: string) {
		var self = this;
		this.usersDialog.show();
		this.usersDialog.onSelectUsers.subscribe(users => {
			this.processing = true;
			var subscriptions = [];
			_.each(users, function(user) {
				var member = new CourseMember();
				if (self.courseClass) {
					member.course_id = self.courseClass.course_id;
					member.class_id =  self.courseClass.id;
				}
				member.role = role;
				if (self.course)
					member.course_id = self.course.id;
				member.user_id = user.id;
				member.status = 'active';
				member.enroll_status = 'registered';
				member.date_register = new Date();
				subscriptions.push(member.save(self));
			});
			Observable.forkJoin(...subscriptions).subscribe(() => {
				this.processing = false;
				this.loadMembers();
			});
		});
	}

	edit() {
		if (this.selectedMember)
			this.memberDialog.show(this.selectedMember);
	}

	delete() {
		if (this.selectedMember)
			this.confirmationService.confirm({
				message: this.translateService.instant('Are you sure to delete ?'),
				accept: () => {
					this.selectedMember.data.delete(this).subscribe(() => {
						this.loadMembers();
						this.selectedMember = null;
					})
				}
			});
	}

	loadMembers() {
		if (this.course)
			CourseMember.listByCourse(this, this.course.id).subscribe(members => {
				this.members = members;
			});
		if (this.courseClass)
			CourseMember.listByClass(this, this.courseClass.id).subscribe(members => {
				this.members = members;
			});
	}
}


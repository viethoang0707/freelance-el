import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { Course } from '../../../shared/models/elearning/course.model';
import { User } from '../../../shared/models/elearning/user.model';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { SelectItem, MenuItem } from 'primeng/api';
import { GROUP_CATEGORY, COURSE_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE,
 COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants'
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { Subscription } from 'rxjs/Subscription';
import { CourseMemberDialog } from '../member-dialog/member-dialog.component';
@Component({
	moduleId: module.id,
	selector: 'course-enrollment-dialog',
	templateUrl: 'enrollment-dialog.component.html',
})
export class CourseEnrollDialog extends BaseDialog<Course> {

	display: boolean;
	processing: boolean;
	selectedStudents: any;
	students: CourseMember[];
	selectedTeachers: any;
	teachers: CourseMember[];
	course: Course;
	courseClass: CourseClass;
	items: any[];
	public subscription : Subscription;
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
		this.course = new Course();
	}

	enrollCourse(course:Course, courseClass?:CourseClass) {
		this.course = course;
		this.courseClass = courseClass;
		this.display = true;
		this.processing = false;
		this.selectedStudents = [];
		this.selectedTeachers = [];
		this.loadMembers();
	}

	enrollClass(courseClass:CourseClass) {
		this.courseClass = courseClass;
		this.display = true;
		this.processing = false;
		this.selectedStudents = [];
		this.selectedTeachers = [];
		this.loadMembers();
	}

	hide() {
		this.display = false;
	}


	add(role: string) {
		this.usersDialog.show();
		this.subscription = this.usersDialog.onSelectUsers.subscribe(users => {
			this.processing = true;
			var subscriptions = [];
			_.each(users, (user:User)=> {
				var member = new CourseMember();
				if (this.courseClass) {
					member.course_id = this.courseClass.course_id;
					member.class_id =  this.courseClass.id;
				}
				member.role = role;
				if (this.course)
					member.course_id = this.course.id;
				member.user_id = user.id;
				member.status = 'active';
				member.enroll_status = 'registered';
				member.date_register = new Date();
				subscriptions.push(member.save(this));
				this.subscription.unsubscribe();
			});
			Observable.forkJoin(...subscriptions).subscribe(() => {
				this.processing = false;
				this.loadMembers();
			});
		});
	}

	delete(members) {
		if (members && members.length)
            this.confirm('Are you sure to delete ?', () => {
                    var subscriptions = _.map(members,(member=> {
                        return member.delete(this);
                    }));
                    Observable.forkJoin(...subscriptions).subscribe(()=> {
                        this.selectedStudents = [];
						this.selectedTeachers = [];
						this.loadMembers();
                    })
                });
	}

	loadMembers() {
		if (this.course)
			CourseMember.listByCourse(this, this.course.id).subscribe(members => {
				this.students = _.filter(members, (member)=> {
					return member.role =='student';
				});
				this.selectedStudents = [];
			});
		if (this.courseClass)
			CourseMember.listByClass(this, this.courseClass.id).subscribe(members => {
				this.students = _.filter(members, (member)=> {
					return member.role =='student';
				});
				this.selectedStudents = [];
				this.teachers = _.filter(members, (member)=> {
					return member.role =='teacher';
				});
				this.selectedTeachers = [];
			});
	}
}


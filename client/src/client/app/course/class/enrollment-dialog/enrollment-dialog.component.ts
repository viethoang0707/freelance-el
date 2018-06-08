import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { Course } from '../../../shared/models/elearning/course.model';
import { User } from '../../../shared/models/elearning/user.model';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { SelectItem, MenuItem } from 'primeng/api';
import { GROUP_CATEGORY, CONTENT_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE,
 COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants'
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
	moduleId: module.id,
	selector: 'course-enrollment-dialog',
	templateUrl: 'enrollment-dialog.component.html',
})
export class CourseEnrollDialog extends BaseDialog<Course> {

	private selectedStudents: any;
	private students: CourseMember[];
	private selectedTeachers: any;
	private teachers: CourseMember[];
	private course: Course;
	private courseClass: CourseClass;
	private items: any[];
	public subscription : Subscription;
	private processing : boolean;
	@ViewChild(SelectUsersDialog) usersDialog: SelectUsersDialog;

	COURSE_MODE = COURSE_MODE;
	CONTENT_STATUS = CONTENT_STATUS;
	COURSE_MEMBER_ROLE = COURSE_MEMBER_ROLE;
	COURSE_MEMBER_STATUS = COURSE_MEMBER_STATUS;
	COURSE_MEMBER_ENROLL_STATUS = COURSE_MEMBER_ENROLL_STATUS;
	
	constructor() {
		super();
		this.items = [
			{ label: this.translateService.instant('Student'),value:'student',command:()=> {this.addMembers('student')}},
			{ label: this.translateService.instant('Teacher'),value:'teacher',command:()=> {this.addMembers('teacher')}},
		
		]
		this.course = new Course();
	}

	enrollCourse(course:Course) {
		this.course = course;
		this.display = true;
		this.selectedStudents = [];
		this.selectedTeachers = [];
		this.loadMembers();
	}

	enrollClass(course:Course,courseClass:CourseClass) {
		this.course = course;
		this.courseClass = courseClass;
		this.display = true;
		this.selectedStudents = [];
		this.selectedTeachers = [];
		this.loadMembers();
	}

	hide() {
		this.display = false;
	}


	addMembers(role: string) {
		this.usersDialog.show();
		this.subscription = this.usersDialog.onSelectUsers.subscribe(users => {
			var userIds = _.pluck(users, 'id');
			CourseClass.enroll(this.courseClass.id, userIds).subscribe((result)=> {
				this.loadMembers();
				var failList = result['failList'];
				_.each(failList, userId=> {
					var user = _.find(users, obj=> {
						return obj.id == userId;
					});
					this.warn(`User ${user.name} does not meet course requirement`);
				});
			});
		});
	}

	deleteMembers(members) {
        if (members && members.length)
            this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
                var subscriptions = _.map(members,(member:CourseMember) => {
                    return member.delete(this);
                });
                Observable.forkJoin(...subscriptions).subscribe(()=> {
                    this.selectedStudents = [];
					this.selectedTeachers = [];
					this.loadMembers();
                });
            });
	}
	
	loadMembers() {
		if (this.course && !this.courseClass) {
			
			CourseMember.listByCourse(this, this.course.id).subscribe(members => {
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
		if (this.courseClass && this.courseClass) {
			
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
}


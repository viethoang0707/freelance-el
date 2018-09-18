import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Course } from '../../../shared/models/elearning/course.model';
import { User } from '../../../shared/models/elearning/user.model';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import * as _ from 'underscore';
import {
	GROUP_CATEGORY, CONTENT_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE,
	COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS
} from '../../../shared/models/constants'
import { SelectMultiUsersDialog } from '../../../shared/components/select-multi-user-dialog/select-multi-user-dialog.component';

const MEMBER_FIELDS = ['name', 'email', 'phone', 'role', 'login', 'status', 'group_name', 'enroll_status'];

@Component({
	moduleId: module.id,
	selector: 'class-enrollment-form',
	templateUrl: 'class-enrollment-form.component.html',
})
export class CourseClassEnrollmentFormComponent extends BaseComponent {

	private selectedStudents: any;
	private students: CourseMember[];
	private selectedTeachers: any;
	private teachers: CourseMember[];
	private course: Course;
	private courseClass: CourseClass;
	private items: any[];

	@ViewChild(SelectMultiUsersDialog) usersDialog: SelectMultiUsersDialog;

	COURSE_MODE = COURSE_MODE;
	CONTENT_STATUS = CONTENT_STATUS;
	COURSE_MEMBER_ROLE = COURSE_MEMBER_ROLE;
	COURSE_MEMBER_STATUS = COURSE_MEMBER_STATUS;
	COURSE_MEMBER_ENROLL_STATUS = COURSE_MEMBER_ENROLL_STATUS;

	constructor(private location: Location, private router: Router, private route: ActivatedRoute) {
		super();
		this.items = [
			{ label: this.translateService.instant('Student'), value: 'student', command: () => { this.addStudent() } },
			{ label: this.translateService.instant('Teacher'), value: 'teacher', command: () => { this.addTeacher() } },
		]
		this.courseClass = new CourseClass();
	}

	ngOnInit() {
		this.courseClass = this.route.snapshot.data['courseClass'];
		this.selectedStudents = [];
		this.selectedTeachers = [];
		this.loadMembers();
	}

	back() {
		this.location.back();
	}

	addStudent() {
		this.usersDialog.show();
		this.usersDialog.onSelectUsers.first().subscribe(users => {
			var userIds = _.pluck(users, 'id');
			this.courseClass.enroll(this, userIds).subscribe((result) => {
				this.success(this.translateService.instant('Enroll student successfully'));
				this.loadMembers();
				var failList = result['failList'];
				_.each(failList, userId => {
					let user: User = _.find(users, (obj: User) => {
						return obj.id == userId;
					});
					this.warn(`User ${user.name} does not meet course requirement`);
				});
			});
		});
	}

	addTeacher() {
		this.usersDialog.show();
		this.usersDialog.onSelectUsers.first().subscribe(users => {
			var userIds = _.pluck(users, 'id');
			this.courseClass.enrollStaff(this, userIds).subscribe((result) => {
				this.success(this.translateService.instant('Add teacher successfully'));
				this.loadMembers();
				var failList = result['failList'];
				_.each(failList, userId => {
					let user: User = _.find(users, (obj: User) => {
						return obj.id == userId;
					});
					this.warn(`User ${user.name} does not meet course requirement`);
				});
			});
		});
	}

	deleteMembers(members: CourseMember[]) {
		if (members && members.length)
			this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
				CourseMember.deleteArray(this, members).subscribe(() => {
					this.success(this.translateService.instant('Delete member successfully'));
					this.selectedStudents = [];
					this.selectedTeachers = [];
					this.loadMembers();
				})
			});
	}

	loadMembers() {
		this.courseClass.listMembers(this, MEMBER_FIELDS).subscribe(members => {
			this.students = _.filter(members, (member) => {
				return member.role == 'student';
			});
			this.selectedStudents = [];
			this.teachers = _.filter(members, (member) => {
				return member.role == 'teacher';
			});
			this.selectedTeachers = [];
		});
	}

	close() {
		this.router.navigate(['/course/class/list',this.courseClass.course_id]);
	}
}


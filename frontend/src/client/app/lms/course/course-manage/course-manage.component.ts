import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Course } from '../../../shared/models/elearning/course.model';
import { User } from '../../../shared/models/elearning/user.model';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { SelectItem, MenuItem } from 'primeng/api';
import {
	GROUP_CATEGORY, CONTENT_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE,
	COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS, COURSE_UNIT_TYPE
} from '../../../shared/models/constants'
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { Subscription } from 'rxjs/Subscription';
import { ClassConferenceDialog } from '../../class/class-conference/class-conference.dialog.component';
import { CourseFaq } from '../../../shared/models/elearning/course-faq.model';
import { CourseFaqDialog } from '../course-faq/course-faq.dialog.component';
import { CourseMaterial } from '../../../shared/models/elearning/course-material.model';
import { CourseMaterialDialog } from '../course-material/course-material.dialog.component';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { SyllabusUtils } from '../../../shared/helpers/syllabus.utils';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { CourseUnitPreviewDialog } from '../../../cms/course/course-unit-preview-dialog/course-unit-preview-dialog.component';
import { BaseModel } from '../../../shared/models/base.model';
import { MailMessageDialog } from '../../../shared/components/mail-message/mail-message.dialog.component';

@Component({
	moduleId: module.id,
	selector: 'course-manage',
	templateUrl: 'course-manage.component.html',
	styleUrls: ['course-manage.component.css']
})
export class CourseManageComponent extends BaseComponent implements OnInit {

	COURSE_UNIT_TYPE = COURSE_UNIT_TYPE;

	private course: Course;
	private courseMember: CourseMember;
	private classMembers: CourseMember[];
	private selectedClass: CourseClass;
	private classes: CourseClass[];
	private faqs: CourseFaq[];
	private materials: CourseMaterial[];
	private tree: TreeNode[];
	private syl: CourseSyllabus;
	private selectedNode: TreeNode;
	private units: CourseUnit[];
	private selectedUnit: CourseUnit;
	private sylUtils: SyllabusUtils;

	@ViewChild(CourseMaterialDialog) materialDialog: CourseMaterialDialog;
	@ViewChild(CourseFaqDialog) faqDialog: CourseFaqDialog;
	@ViewChild(ClassConferenceDialog) conferenceDialog: ClassConferenceDialog;
	@ViewChild(CourseUnitPreviewDialog) unitPreviewDialog: CourseUnitPreviewDialog;
	@ViewChild(MailMessageDialog) mailDialog: MailMessageDialog;

	constructor(private router: Router, private route: ActivatedRoute) {
		super();
		this.sylUtils = new SyllabusUtils();
		this.classes = [];
		this.faqs = [];
		this.materials = [];
		this.course = new Course();
		this.syl = new CourseSyllabus();
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			var courseId = +params['courseId'];
			var memberId = +params['memberId'];
			this.courseMember = this.lmsProfileService.courseMemberById(courseId);
			this.classMembers = this.lmsProfileService.classMembersByCourseId(courseId);
			this.courseMember.populateCourse(this).subscribe(() => {
				this.course = this.courseMember.course;
				CourseMember.populateClasses(this, this.classMembers).subscribe(() => {
					this.classes = _.map(this.classMembers, (member: CourseMember) => {
						return member.clazz;
					});
					this.lmsProfileService.getCourseContent(this.course).subscribe(content => {
						this.syl = content["syllabus"];
						this.faqs = content["faqs"];
						this.materials = content["materials"];
						this.units = content["units"];
						this.displayCouseSyllabus();
					});
				});
			})


		});
	}

	displayCouseSyllabus() {
		this.units = _.filter(this.units, (unit: CourseUnit) => {
			return unit.status == 'published';
		});
		this.tree = this.sylUtils.buildGroupTree(this.units);
		if (this.syl.status != 'published')
			this.warn('Cours syllabus is not published');
	}

	manageConference(courseClass: CourseClass) {
		this.conferenceDialog.show(courseClass);
	}

	manageClass(courseClass: CourseClass) {
		var member = _.find(this.classMembers, (obj: CourseMember)=> {
			return obj.class_id == courseClass.id && (obj.role == 'supervisor' || obj.role == 'teacher');
		});
		this.router.navigate(['/lms/courses/manage/class', this.course.id, courseClass.id, member.id]);
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.selectedUnit = this.selectedNode.data;
		}
	}

	broadcastMessage(courseClass: CourseClass) {
		courseClass.listMembers(this).subscribe(members => {
			if (members.length) {
				var emails = _.pluck(members, "email");
				this.mailDialog.show(emails);
			}
		});
	}

	previewUnit(unit: CourseUnit) {
		this.unitPreviewDialog.show(unit, this.course, this.syl, this.units);
	}

}


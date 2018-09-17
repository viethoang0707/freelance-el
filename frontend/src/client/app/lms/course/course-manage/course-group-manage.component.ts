import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
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
	selector: 'course-group-manage',
	templateUrl: 'course-group-manage.component.html',
	styleUrls: ['course-group-manage.component.css']
})
export class CourseGroupManageComponent extends BaseComponent implements OnInit {

	COURSE_UNIT_TYPE = COURSE_UNIT_TYPE;

	private course: Course;
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
	@ViewChild(CourseUnitPreviewDialog) unitPreviewDialog: CourseUnitPreviewDialog;
	@ViewChild(MailMessageDialog) mailDialog: MailMessageDialog;

	constructor(private location: Location, private router: Router, private route: ActivatedRoute) {
		super();
		this.sylUtils = new SyllabusUtils();
		this.classes = [];
		this.faqs = [];
		this.materials = [];
		this.course = new Course();
		this.syl = new CourseSyllabus();
	}

	ngOnInit() {
		this.course = this.route.snapshot.data['course'];
		this.lmsProfileService.init(this).subscribe(() => {
			CourseClass.array(this, this.lmsProfileService.MyClassIds).subscribe(classList => {
				this.classes = classList;
			});
			BaseModel.bulk_search(this,
				Course.__api__listFaqs(this.course.id),
				Course.__api__listMaterials(this.course.id),
				Course.__api__listUnits(this.course.id))
				.subscribe(jsonArr => {
					this.faqs = CourseFaq.toArray(jsonArr[0]);
					this.materials = CourseMaterial.toArray(jsonArr[1]);
					this.units = CourseUnit.toArray(jsonArr[2]);
					CourseSyllabus.get(this, this.course.syllabus_id).subscribe(syl => {
						this.syl = syl;
						this.displayCouseSyllabus();
					})
				});
		});
	}

	displayCouseSyllabus() {
		this.units = _.filter(this.units, (unit: CourseUnit) => {
			return unit.status == 'published';
		});
		this.tree = this.sylUtils.buildGroupTree(this.units);
		if (this.syl.status != 'published')
			this.warn(this.translateService.instant('Course syllabus is not published'));
	}

	manageConference(courseClass: CourseClass) {
		this.router.navigate(['/lms/class/manage/conference', courseClass.id,courseClass.conference_id]);
	}

	manageClass(courseClass: CourseClass) {
		var member = _.find(this.classMembers, (obj: CourseMember) => {
			return obj.class_id == courseClass.id && (obj.role == 'supervisor' || obj.role == 'teacher');
		});
		this.router.navigate(['/lms/class/manage', courseClass.id,member.id]);
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

	back() {
		this.location.back();
	}

}


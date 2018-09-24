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
import { CourseMemberActivityDialog } from '../../class/course-member-activity/course-member-activity.dialog.component';
import { LMSProfileDialog } from '../../course/lms-profile/lms-profile-dialog.component';
import { SelfAssessmentGradebookDialog } from '../self-assessment-gradebook/gradebook.dialog.component';

const MEMBER_FIELDS =['name', 'group_name', 'email', 'enroll_satus', 'role', 'login', 'user_id'];


@Component({
	moduleId: module.id,
	selector: 'course-self-study-manage',
	templateUrl: 'course-self-study-manage.component.html',
	styleUrls: ['course-self-study-manage.component.css']
})
export class CourseSelfStudyManageComponent extends BaseComponent implements OnInit {

	COURSE_UNIT_TYPE = COURSE_UNIT_TYPE;
	COURSE_MEMBER_ENROLL_STATUS = COURSE_MEMBER_ENROLL_STATUS;

	private course: Course;
	private courseMembers: CourseMember[];
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
	private supervisor: CourseMember;
	private selectedMember: CourseMember;
	private courseContent: any;

	@ViewChild(SelfAssessmentGradebookDialog) gradebookDialog: SelfAssessmentGradebookDialog;
	@ViewChild(LMSProfileDialog) lmsProfileDialog: LMSProfileDialog;
	@ViewChild(CourseMaterialDialog) materialDialog: CourseMaterialDialog;
	@ViewChild(CourseFaqDialog) faqDialog: CourseFaqDialog;
	@ViewChild(CourseUnitPreviewDialog) unitPreviewDialog: CourseUnitPreviewDialog;

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
		this.supervisor = this.route.snapshot.data['supervisor'];
		this.lmsProfileService.init(this).subscribe(() => {
			BaseModel.bulk_search(this,
				Course.__api__listFaqs(this.course.id),
				Course.__api__listMaterials(this.course.id),
				Course.__api__listUnits(this.course.id),
				Course.__api__listMembers(this.course.id))
				.subscribe(jsonArr => {
					this.faqs = CourseFaq.toArray(jsonArr[0]);
					this.materials = CourseMaterial.toArray(jsonArr[1]);
					this.units = CourseUnit.toArray(jsonArr[2]);
					this.courseMembers = _.filter(CourseMember.toArray(jsonArr[3]), (member:CourseMember)=> {
						return member.role =='student';
					});
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


	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.selectedUnit = this.selectedNode.data;
		}
	}

	previewUnit(unit: CourseUnit) {
		this.unitPreviewDialog.show(unit, this.course, this.syl, this.units);
	}

	back() {
		this.router.navigate(['/lms/courses']);
	}

	viewSelfAssessmentGradebook(member: CourseMember) {
		this.gradebookDialog.show(this.supervisor, this.course, member);
	}


	viewLMSProfile(member: CourseMember) {
		this.lmsProfileDialog.show(member);
	}

}


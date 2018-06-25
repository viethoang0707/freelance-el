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
	GROUP_CATEGORY,CONTENT_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE,
	COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS, COURSE_UNIT_TYPE
} from '../../../shared/models/constants'
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { Subscription } from 'rxjs/Subscription';
import { ClassConferenceDialog } from '../../class/class-conference/class-conference.dialog.component';
import { ClassExamListDialog } from '../../class/class-exam-list/class-exam-list.dialog.component';
import { CourseFaq } from '../../../shared/models/elearning/course-faq.model';
import { CourseFaqDialog } from '../course-faq/course-faq.dialog.component';
import { CourseMaterial } from '../../../shared/models/elearning/course-material.model';
import { CourseMaterialDialog } from '../course-material/course-material.dialog.component';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { SyllabusUtils } from '../../../shared/helpers/syllabus.utils';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { CourseUnitPreviewDialog } from '../../../cms/course/course-unit-preview-dialog/course-unit-preview-dialog.component';
import { ProjectListDialog } from '../../class/project-list/project-list.dialog.component';
import { BaseModel } from '../../../shared/models/base.model';
import { ClassSurveyListDialog } from '../../class/class-survey-list/class-survey-list.dialog.component';

@Component({
	moduleId: module.id,
	selector: 'course-manage',
	templateUrl: 'course-manage.component.html',
	styleUrls: ['course-manage.component.css']
})
export class CourseManageComponent extends BaseComponent implements OnInit {

	COURSE_UNIT_TYPE = COURSE_UNIT_TYPE;

	private course: Course;
	private members: CourseMember[];
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
	@ViewChild(ClassExamListDialog) examListDialog: ClassExamListDialog;
	@ViewChild(CourseUnitPreviewDialog) unitPreviewDialog: CourseUnitPreviewDialog;
	@ViewChild(ProjectListDialog) projectListDialog: ProjectListDialog;
	@ViewChild(ClassSurveyListDialog) surveyListDialog : ClassSurveyListDialog;


	constructor(private router: Router, private route: ActivatedRoute) {
		super();
		this.sylUtils = new SyllabusUtils();
		this.classes = [];
		this.faqs = [];
		this.materials = [];
		this.course = new Course();
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			var courseId = +params['courseId'];
			this.lmsService.init(this).subscribe(() => {
				this.lmsService.initCourseContent(this).subscribe(() => {
					this.lmsService.initClassContent(this).subscribe(() => {
						this.course = this.lmsService.getCourse(courseId);
						this.faqs = this.lmsService.getCourseFaqs(courseId);
						this.materials = this.lmsService.getCourseMaterials(courseId);
						this.syl = this.lmsService.getCourseSyllabus(courseId);
						this.units = this.lmsService.getSyllabusUnit(this.syl.id);
						this.classes = this.lmsService.MyClass;
						this.displaySyllabus();
					});
				});
			});
		});
	}

	displaySyllabus() {
		this.units = _.filter(this.units, (unit: CourseUnit) => {
			return unit.status == 'published';
		});
		this.tree = this.sylUtils.buildGroupTree(this.units);
	}

	manageConference() {
		if (this.selectedClass) {
			this.conferenceDialog.show(this.selectedClass);
		}
	}

	manageClass() {
		if (this.selectedClass) {
			this.router.navigate(['/class/manage/student/',this.course.id, this.selectedClass.id]);
		}
	}

	manageExam() {
		if (this.selectedClass) {
			this.examListDialog.show(this.selectedClass);
			this.examListDialog.onManage.subscribe(data=> {
				this.router.navigate(['/lms/exams/manage',data[0], data[1]]);
			});
		}
	}

	manageSurvey() {
		if (this.selectedClass) {
			this.surveyListDialog.show(this.selectedClass);
		}
	}

	manageProject() {
		if (this.selectedClass) {
			this.projectListDialog.show(this.selectedClass);
		}
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.selectedUnit = this.selectedNode.data;
		}
	}

	previewUnit() {
		if (this.selectedNode) {
			this.unitPreviewDialog.show(this.selectedNode.data);
		}
	}

	closeClass() {
		if (this.selectedClass) {
			this.selectedClass.status = 'closed';
			CourseMember.listByClass(this, this.selectedClass.id).subscribe(members => {
				_.each(members, (member: CourseMember) => {
					member.enroll_status = 'completed';
					return member.save(this);
				});
				this.selectedClass.save(this).subscribe(() => {
					CourseMember.updateArray(this, this.members).subscribe(() => {
						this.success('Class close');
					})
				});;
			});
		}
	}
}


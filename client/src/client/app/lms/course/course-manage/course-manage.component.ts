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
import { ClassConferenceDialog } from '../class-conference/class-conference.dialog.component';
import { ClassExamListDialog } from '../class-exam-list/class-exam-list.dialog.component';
import { ClassManageDialog } from '../class-manage/class-manage.component';
import { CourseFaq } from '../../../shared/models/elearning/course-faq.model';
import { CourseFaqDialog } from '../course-faq/course-faq.dialog.component';
import { CourseMaterial } from '../../../shared/models/elearning/course-material.model';
import { CourseMaterialDialog } from '../course-material/course-material.dialog.component';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { SyllabusUtils } from '../../../shared/helpers/syllabus.utils';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { CourseUnitPreviewDialog } from '../../../cms/course/course-unit-preview-dialog/course-unit-preview-dialog.component';import { ProjectListDialog } from '../project-list/project-list.dialog.component';
import { BaseModel } from '../../../shared/models/base.model';
import { ClassSurveyListDialog } from '../class-survey-list/class-survey-list.dialog.component';
import { MessageDialog } from '../course-message/course-message.dialog.component';

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
	private selectedFaq: CourseFaq;
	private faqs: CourseFaq[];
	private selectedMaterial: CourseMaterial;
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
	@ViewChild(ClassManageDialog) classManageDialog: ClassManageDialog;
	@ViewChild(CourseUnitPreviewDialog) unitPreviewDialog: CourseUnitPreviewDialog;
	@ViewChild(ProjectListDialog) projectListDialog: ProjectListDialog;
	@ViewChild(ClassSurveyListDialog) surveyListDialog : ClassSurveyListDialog;
	@ViewChild(MessageDialog) messageDialog: MessageDialog;


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
			Course.get(this, courseId).subscribe(course => {
				this.course = course;
				BaseModel
					.bulk_search(this,
						CourseMember.__api__byCourseAndUser(this.authService.UserProfile.id, course.id),
						CourseClass.__api__listByCourse(course.id),
						CourseFaq.__api__listByCourse(course.id),
						CourseMaterial.__api__listByCourse(course.id),
						CourseSyllabus.__api__byCourse(course.id))
					.subscribe((jsonArr) => {
						var members = CourseMember.toArray(jsonArr[0]);
						this.members = _.filter(members, (member: CourseMember) => {
							return member.role == 'teacher';
						});
						var classList = CourseClass.toArray(jsonArr[1]);
						this.classes = _.filter(classList, (obj: CourseClass) => {
							var member = _.find(this.members, (member: CourseMember) => {
								return member.class_id == obj.id;
							});
							return member != null;
						});
						this.faqs = CourseFaq.toArray(jsonArr[2]);
						this.materials = CourseMaterial.toArray(jsonArr[3]);
						var sylList = CourseSyllabus.toArray(jsonArr[4]);
						if (sylList.length) {
							this.displaySyllabus(sylList[0]);
						}
					});
			});
		});
	}

	displaySyllabus(syl: CourseSyllabus) {
		this.syl = syl;
		CourseUnit.listBySyllabus(this, this.syl.id).subscribe(units => {
			this.units = _.filter(units, (unit: CourseUnit) => {
				return unit.status == 'published';
			});
			this.tree = this.sylUtils.buildGroupTree(units);
		});
	}

	manageConference() {
		if (this.selectedClass) {
			this.conferenceDialog.show(this.selectedClass);
		}
	}

	manageClass() {
		if (this.selectedClass) {
			this.classManageDialog.show(this.selectedClass);
		}
	}

	manageExam() {
		if (this.selectedClass) {
			this.examListDialog.show(this.selectedClass);
			this.examListDialog.onManage.subscribe(data=> {
				this.router.navigate(['/lms/exams/manage',data[0], data[1]]);
			})
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

	loadFaqs() {
		CourseFaq.listByCourse(this, this.course.id)
			.subscribe(faqs => {
				this.faqs = faqs;
			})
	}

	addFaq() {
		var faq = new CourseFaq();
		faq.course_id = this.course.id;
		this.faqDialog.show(faq);
		this.faqDialog.onCreateComplete.subscribe(() => {
			this.loadFaqs();
		});
	}

	editFaq() {
		if (this.selectedFaq)
			this.faqDialog.show(this.selectedFaq);
	}

	deleteFaq() {
		if (this.selectedFaq)
			this.confirm('Are you sure to delete ?', () => {
				this.selectedFaq.delete(this).subscribe(() => {
					this.loadFaqs();
					this.selectedFaq = null;
				})
			});
	}

	loadMaterials() {
		CourseMaterial.listByCourse(this, this.course.id)
			.subscribe(materials => {
				this.materials = materials;
			});
	}


	addMaterial() {
		var material = new CourseMaterial();
		material.course_id = this.course.id;
		this.materialDialog.show(material);
		this.materialDialog.onCreateComplete.subscribe(() => {
			this.loadMaterials();
		});
	}

	editMaterial() {
		if (this.selectedMaterial)
			this.materialDialog.show(this.selectedMaterial);
	}

	deleteMaterial() {
		if (this.selectedMaterial)
			this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
				this.selectedMaterial.delete(this).subscribe(() => {
					this.loadMaterials();
					this.selectedMaterial = null;
				})
			});
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


	sendMessage() {
		if (this.selectedClass) 
			this.messageDialog.show(this.selectedClass);
	}
}


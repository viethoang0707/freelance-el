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
import { CourseFaq } from '../../../shared/models/elearning/course-faq.model';
import { CourseFaqDialog } from '../course-faq/course-faq.dialog.component';
import { CourseMaterial } from '../../../shared/models/elearning/course-material.model';
import { CourseMaterialDialog } from '../course-material/course-material.dialog.component';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { SyllabusUtils } from '../../../shared/helpers/syllabus.utils';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { CourseUnitPreviewDialog } from '../../../cms/course/course-unit-preview-dialog/course-unit-preview-dialog.component';
import { BaseModel } from '../../../shared/models/base.model';
import { CourseSyllabusDialog } from '../../../cms/course/course-syllabus/course-syllabus.dialog.component';
import { CourseBackupDialog } from '../../../cms/course/course-backup/course-backup.dialog.component';
import { CourseRestoreDialog } from '../../../cms/course/course-restore/course-restore.dialog.component';
@Component({
	moduleId: module.id,
	selector: 'course-edit',
	templateUrl: 'course-edit.component.html',
	styleUrls: ['course-edit.component.css']
})
export class CourseEditComponent extends BaseComponent implements OnInit {

	COURSE_UNIT_TYPE = COURSE_UNIT_TYPE;

	private course: Course;
	private units: CourseUnit[];
	private member: CourseMember;
	private selectedFaq: CourseFaq;
	private faqs: CourseFaq[];
	private selectedMaterial: CourseMaterial;
	private materials: CourseMaterial[];
	private tree: TreeNode[];
	private syl: CourseSyllabus;
	private selectedNode: TreeNode;
	private selectedUnit: CourseUnit;
	private sylUtils: SyllabusUtils;
	private treeList: TreeNode[];
	private courseId: number;

	@ViewChild(CourseMaterialDialog) materialDialog: CourseMaterialDialog;
	@ViewChild(CourseFaqDialog) faqDialog: CourseFaqDialog;
	@ViewChild(CourseUnitPreviewDialog) unitPreviewDialog: CourseUnitPreviewDialog;
	@ViewChild(CourseSyllabusDialog) syllabusDialog: CourseSyllabusDialog;
	@ViewChild(CourseBackupDialog) backupDialog: CourseBackupDialog;
	@ViewChild(CourseRestoreDialog) restoreDialog: CourseRestoreDialog;

	constructor(private router: Router, private route: ActivatedRoute) {
		super();
		this.sylUtils = new SyllabusUtils();
		this.faqs = [];
		this.materials = [];
		this.course = new Course();
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			var memberId = +params['memberId'];
			var courseId = +params['courseId'];
			this.lmsProfileService.init(this).subscribe(() => {
				this.member = this.lmsProfileService.courseMemberById(memberId);
				this.member.populateCourse(this).subscribe(() => {
					this.course = this.member.course;
					this.lmsProfileService.getCourseContent(this.member.course).subscribe(content => {
						this.syl = content["syllabus"];
						this.faqs = content["faqs"];
						this.materials = content["materials"];
						this.units = content["units"];
						this.displayCouseSyllabus();
					});
				});

			});
		});
	}

	displayCouseSyllabus() {
		this.tree = this.sylUtils.buildGroupTree(this.units);
		this.treeList = this.sylUtils.flattenTree(this.tree);
	}

	editSyllabus() {
		this.syllabusDialog.show(this.course);
		this.syllabusDialog.onEditComplete.first().subscribe(() => {
			this.lmsProfileService.init(this).subscribe(() => {
				this.course.populate(this).subscribe(() => {
					this.lmsProfileService.getCourseContent(this.member.course).subscribe(content => {
						this.syl = content["syllabus"];
						this.units = content["units"];
						this.displayCouseSyllabus();
					});
				});
			});
		});
	}


	addFaq() {
				var faq = new CourseFaq();
				faq.course_id = this.course.id;
				this.faqDialog.show(faq);
				this.faqDialog.onCreateComplete.first().subscribe(() => {
					this.lmsProfileService.invalidateCourseContent(this.course.id);
					this.faqs.push(faq);
					this.success('Add course FAQ successfully');
				});
			}

	editFaq(faq: CourseFaq) {
				this.faqDialog.show(faq);
			}

	deleteFaq(faq: CourseFaq) {
				this.confirm('Are you sure to delete ?', () => {
					faq.delete(this).subscribe(() => {
						this.lmsProfileService.invalidateCourseContent(this.course.id);
						this.faqs = _.reject(this.faqs, (obj: CourseFaq) => {
							return faq.id == obj.id;
						});
						this.success('Delete course FAQ successfully');
					})
				});
			}

	addMaterial() {
				var material = new CourseMaterial();
				material.course_id = this.course.id;
				this.materialDialog.show(material);
				this.materialDialog.onCreateComplete.first().subscribe(() => {
					this.lmsProfileService.invalidateCourseContent(this.course.id);
					this.materials.push(material);
					this.success('Add course material successfully');
				});
			}

	editMaterial(material: CourseMaterial) {
				this.materialDialog.show(material);
			}

	deleteMaterial(material: CourseMaterial) {
				this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
					material.delete(this).subscribe(() => {
						this.lmsProfileService.invalidateCourseContent(this.course.id);
						this.materials = _.reject(this.materials, (obj: CourseMaterial) => {
							return material.id == obj.id;
						});
						this.success('Delete course material successfully');
					});
				});
			}

	nodeSelect(event: any) {
				if(this.selectedNode) {
					this.selectedUnit = this.selectedNode.data;
				}
			}

	previewUnit(unit: CourseUnit) {
				this.unitPreviewDialog.show(unit, this.course, this.syl, this.units);
			}

	backupCourse() {
				this.backupDialog.show(this.course);
			}

	restoreCourse() {
				this.restoreDialog.show(this.course);
			}

}


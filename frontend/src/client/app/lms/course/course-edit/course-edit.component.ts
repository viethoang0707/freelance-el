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

	constructor(private location: Location, private router: Router, private route: ActivatedRoute) {
		super();
		this.sylUtils = new SyllabusUtils();
		this.faqs = [];
		this.materials = [];
		this.course = new Course();
	}

	ngOnInit() {
		this.course = this.route.snapshot.data['course'];
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
	}

	displayCouseSyllabus() {
		this.tree = this.sylUtils.buildGroupTree(this.units);
		this.treeList = this.sylUtils.flattenTree(this.tree);
	}

	editSyllabus() {
		this.router.navigate(['/cms/course/compose', this.course.id, this.course.syllabus_id]);
	}


	addFaq() {
		var faq = new CourseFaq();
		faq.course_id = this.course.id;
		this.faqDialog.show(faq);
		this.faqDialog.onCreateComplete.first().subscribe(() => {
			this.faqs.push(faq);
			this.success(this.translateService.instant('Add course FAQ successfully'));
		});
	}

	editFaq(faq: CourseFaq) {
		this.faqDialog.show(faq);
	}

	deleteFaq(faq: CourseFaq) {
		this.confirm('Are you sure to delete ?', () => {
			faq.delete(this).subscribe(() => {
				this.faqs = _.reject(this.faqs, (obj: CourseFaq) => {
					return faq.id == obj.id;
				});
				this.success(this.translateService.instant('Delete course FAQ successfully'));
			})
		});
	}

	addMaterial() {
		var material = new CourseMaterial();
		material.course_id = this.course.id;
		this.materialDialog.show(material);
		this.materialDialog.onCreateComplete.first().subscribe(() => {
			this.materials.push(material);
			this.success(this.translateService.instant('Add course material successfully'));
		});
	}

	editMaterial(material: CourseMaterial) {
		this.materialDialog.show(material);
	}

	deleteMaterial(material: CourseMaterial) {
		this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
			material.delete(this).subscribe(() => {
				this.materials = _.reject(this.materials, (obj: CourseMaterial) => {
					return material.id == obj.id;
				});
				this.success(this.translateService.instant('Delete course material successfully'));
			});
		});
	}

	nodeSelect(event: any) {
		this.selectedNode = event.node;
		if (this.selectedNode) {
			this.selectedUnit = this.selectedNode.data;
		}
	}

	nodeUnselect(event: any) {
		this.selectedNode = null;
	}

	previewUnit(unit: CourseUnit) {
		this.unitPreviewDialog.show(unit, this.course, this.syl, this.units);
	}

	backupCourse() {
		this.router.navigate(['/cms/course/backup', this.course.id, this.course.syllabus_id]);
	}

	restoreCourse() {
		this.router.navigate(['/cms/course/restore', this.course.id, this.course.syllabus_id]);
	}

	back() {
		this.router.navigate(['/lms/courses']);
	}

}


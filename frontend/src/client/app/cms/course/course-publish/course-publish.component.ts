import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SyllabusUtils } from '../../../shared/helpers/syllabus.utils';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { TreeNode, MenuItem, SelectItem } from 'primeng/api';
import { COURSE_UNIT_TYPE, COURSE_UNIT_ICON, CONTENT_STATUS } from '../../../shared/models/constants';
import { CourseUnitDialog } from '../course-unit-dialog/course-unit-dialog.component';
import { CourseUnitPreviewDialog } from '../course-unit-preview-dialog/course-unit-preview-dialog.component';
import { CourseSettingDialog } from '../course-setting/course-setting.dialog.component';
import * as _ from 'underscore';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { BaseModel } from '../../../shared/models/base.model';

@Component({
	moduleId: module.id,
	selector: 'course-publish',
	templateUrl: 'course-publish.component.html',
	styleUrls: ['course-publish.component.css'],
})
export class CoursePublishComponent extends BaseComponent implements OnInit {

	COURSE_UNIT_TYPE = COURSE_UNIT_TYPE;

	private tree: TreeNode[];
	private syl: CourseSyllabus;
	private selectedNode: TreeNode;
	private units: CourseUnit[];
	private selectedUnit: CourseUnit;
	private sylUtils: SyllabusUtils;
	private course: Course;
	private contentStatus: SelectItem[];

	@ViewChild(CourseUnitPreviewDialog) unitPreviewDialog: CourseUnitPreviewDialog;

	constructor(private location: Location, private router: Router, private route: ActivatedRoute) {
		super();
		this.sylUtils = new SyllabusUtils();
		this.syl = new CourseSyllabus();
		this.course = new Course();
		this.contentStatus = _.map(CONTENT_STATUS, (val, key) => {
			return {
				label: this.translateService.instant(val),
				value: key
			}
		});
	}

	ngOnInit() {
		this.course = this.route.snapshot.data['course'];
		this.syl = this.route.snapshot.data['syllabus'];
		this.course.listUnits(this).subscribe(units => {
			this.units = units;
			this.tree = this.sylUtils.buildGroupTree(units);
		});
	}

	clearSelection() {
		this.selectedNode = null;
		this.selectedUnit = null;
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			if (this.selectedUnit && this.selectedUnit.id == this.selectedNode.data.id) {
				this.clearSelection();
			}
			else
				this.selectedUnit = this.selectedNode.data;
		}
	}

	previewUnit(unit: CourseUnit) {
		this.unitPreviewDialog.show(unit, this.course, this.syl, this.units);
	}

	publish() {
		var saveApiList = _.map(this.units, (unit: CourseUnit) => {
			return unit.__api__update();
		});
		saveApiList.push(this.syl.__api__update());
		BaseModel.bulk_update(this, ...saveApiList).subscribe(() => {
			this.success('Course published successful');
		});
	}

	back() {
		this.router.navigate(['/lms/course/edit', this.course.id]);
	}

}


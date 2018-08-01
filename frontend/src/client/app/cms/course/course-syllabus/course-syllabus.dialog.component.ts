import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
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
import { WindowRef } from '../../../shared/helpers/windonw.ref';

declare var $: any;

@Component({
	moduleId: module.id,
	selector: 'course-syllabus-dialog',
	templateUrl: 'course-syllabus.dialog.component.html',
	styleUrls: ['course-syllabus.dialog.component.css'],
})
export class CourseSyllabusDialog extends BaseComponent {

	COURSE_UNIT_TYPE = COURSE_UNIT_TYPE;

	private display: boolean;
	private tree: TreeNode[];
	private syl: CourseSyllabus;
	private selectedNode: TreeNode;
	private items: MenuItem[];
	private units: CourseUnit[];
	private selectedUnit: CourseUnit;
	private sylUtils: SyllabusUtils;
	private course: Course;
	private courseStatus: SelectItem[];
	WINDOW_HEIGHT: any;

	@ViewChild(CourseUnitDialog) unitDialog: CourseUnitDialog;
	@ViewChild(CourseUnitPreviewDialog) unitPreviewDialog: CourseUnitPreviewDialog;
	@ViewChild(CourseSettingDialog) settingDialog: CourseSettingDialog;

	constructor() {
		super();
		this.sylUtils = new SyllabusUtils();
		this.items = [
			{ label: this.translateService.instant(COURSE_UNIT_TYPE['folder']), command: () => { this.addUnit('folder') } },
			{ label: this.translateService.instant(COURSE_UNIT_TYPE['html']), command: () => { this.addUnit('html') } },
			{ label: this.translateService.instant(COURSE_UNIT_TYPE['slide']), command: () => { this.addUnit('slide') } },
			{ label: this.translateService.instant(COURSE_UNIT_TYPE['video']), command: () => { this.addUnit('video') } },
			{ label: this.translateService.instant(COURSE_UNIT_TYPE['exercise']), command: () => { this.addUnit('exercise') } },
			{ label: this.translateService.instant(COURSE_UNIT_TYPE['scorm']), command: () => { this.addUnit('scorm') } },

		];
		this.syl = new CourseSyllabus();
		this.course = new Course();
		this.courseStatus = _.map(CONTENT_STATUS, (val, key) => {
			return {
				label: this.translateService.instant(val),
				value: key
			}
		});
		this.WINDOW_HEIGHT = $(window).height();
	}

	show(course: Course) {
		this.display = true;
		this.display = true;
		this.course = course;
		CourseSyllabus.get(this, course.syllabus_id).subscribe((syl) => {
			this.syl = syl;
			this.buildCourseTree();
		});
	}

	clearSelection() {
		this.selectedNode = null;
		this.selectedUnit = null;
	}

	buildCourseTree() {
			this.course.listUnits(this).subscribe(units => {
				this.units = units;
				this.tree = this.sylUtils.buildGroupTree(units);
			});
	}

	showSetting() {
		this.settingDialog.show(this.course);
	}

	addUnit(type: string) {
		if (type != 'folder' && (!this.selectedNode || this.selectedNode.data.type != 'folder')) {
			this.error(this.translateService.instant('You need to select a folder.'));
			return;
		}
		var maxOrder = this.selectedNode ? this.selectedNode.children.length : this.tree.length;
		var unit = new CourseUnit();
		unit.syllabus_id = this.syl.id;
		unit.icon = COURSE_UNIT_ICON[type];
		unit.type = type;
		unit.name = 'New unit';
		unit.parent_id = this.selectedNode ? this.selectedNode.data.id : null;
		unit.order = maxOrder;
		unit.save(this).subscribe(() => {
			if (this.selectedNode)
				this.sylUtils.addChildNode(this.selectedNode, unit);
			else
				this.sylUtils.addRootNode(this.tree, unit);
			this.lmsProfileService.clearCourseContent(this.course.id);
		});
	}

	editNode(node: TreeNode) {
		this.unitDialog.show(node.data);
		this.unitDialog.onUpdateComplete.subscribe(() => {
			this.buildCourseTree();
			this.lmsProfileService.clearCourseContent(this.course.id);
		});
	}

	deleteNode(node: TreeNode) {
		if (node.children.length) {
			this.error('Cannot delete non-empty folder');
			return;
		}
		this.confirm('Are you sure to delete?', () => {
			node.data.delete(this).subscribe(() => {
				this.buildCourseTree();
				this.selectedNode = null;
				this.lmsProfileService.clearCourseContent(this.course.id);
			})
		});
	}

	hide() {
		this.clearSelection();
		this.display = false;
	}

	moveUp(node: TreeNode) {
		this.sylUtils.moveUp(this.tree, node);
		CourseUnit.updateArray(this, this.units).subscribe(() => {
			this.success('Move sucessfully');
			this.lmsProfileService.clearCourseContent(this.course.id);
		});
	}

	moveDown(node: TreeNode) {
		this.sylUtils.moveDown(this.tree, node);
		CourseUnit.updateArray(this, this.units).subscribe(() => {
			this.success('Move sucessfully');
			this.lmsProfileService.clearCourseContent(this.course.id);
		});
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

}


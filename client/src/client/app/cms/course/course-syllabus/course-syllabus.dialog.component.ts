import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { SyllabusUtils } from '../../../shared/helpers/syllabus.utils';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { CourseSyllabus }  from '../../../shared/models/elearning/course-syllabus.model';
import { TreeNode, MenuItem } from 'primeng/api';
import { COURSE_UNIT_TYPE, COURSE_UNIT_ICON } from '../../../shared/models/constants';
import { CourseUnitDialog } from '../course-unit-dialog/course-unit-dialog.component';
import { CourseUnitPreviewDialog } from '../course-unit-preview-dialog/course-unit-preview-dialog.component';
import { CourseSettingDialog } from '../course-setting/course-setting.dialog.component';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'course-syllabus-dialog',
    templateUrl: 'course-syllabus.dialog.component.html',
    styleUrls: ['course-syllabus.dialog.component.css'],
})
export class CourseSyllabusDialog extends BaseComponent {

	display: boolean;
	tree: TreeNode[];
	syl: CourseSyllabus;
	selectedNode: TreeNode;
	items: MenuItem[];
	units: CourseUnit[];
	selectedUnit:CourseUnit;
	COURSE_UNIT_TYPE = COURSE_UNIT_TYPE;

	@ViewChild(CourseUnitDialog) unitDialog: CourseUnitDialog;
	@ViewChild(CourseUnitPreviewDialog) unitPreviewDialog: CourseUnitPreviewDialog;
	@ViewChild(CourseSettingDialog) settingDialog: CourseSettingDialog;

    constructor(private sylUtils : SyllabusUtils ) {
        super();
        this.items = [
            {label: this.translateService.instant(COURSE_UNIT_TYPE['folder']), command: ()=> { this.add('folder')}},
            {label: this.translateService.instant(COURSE_UNIT_TYPE['html']), command: ()=> { this.add('html')}},
            {label: this.translateService.instant(COURSE_UNIT_TYPE['slide']), command: ()=> { this.add('slide')}},
            {label: this.translateService.instant(COURSE_UNIT_TYPE['video']), command: ()=> { this.add('video')}},
            {label: this.translateService.instant(COURSE_UNIT_TYPE['exercise']), command: ()=> { this.add('exercise')}},
            {label: this.translateService.instant(COURSE_UNIT_TYPE['scorm']), command: ()=> { this.add('scorm')}},

        ];
        this.syl = new CourseSyllabus();
    }

    show(syl: CourseSyllabus) {
		this.display = true;
		this.syl = syl;
		this.buildCourseTree();		
	}

	buildCourseTree() {
		if (this.syl)
			CourseUnit.listBySyllabus(this,this.syl.id).subscribe(units => {
				this.units = units;
				this.tree = this.sylUtils.buildGroupTree(units);
	        });
	}

	showSetting() {
		Course.get(this, this.syl.course_id).subscribe(course=> {
			this.settingDialog.show(course);
		});
	}

	add(type:string) {
		if (type!='folder' && (!this.selectedNode || this.selectedNode.data.type != 'folder')) {
			this.error('You need to select a folder.') ;
			return;
		}
		var maxOrder = this.selectedNode ? this.selectedNode.children.length : this.tree.length; 
		var unit = new CourseUnit();
		unit.syllabus_id =  this.syl.id;
		unit.icon = COURSE_UNIT_ICON[type];
		unit.type =  type;
		unit.name = 'New unit';
		unit.parent_id = this.selectedNode ? this.selectedNode.data.id : null;
		unit.order = maxOrder;
		unit.save(this).subscribe(()=> {
			if (this.selectedNode)
				this.sylUtils.addChildNode(this.selectedNode, unit)
			else
				this.sylUtils.addRootNode(this.tree, unit)
		});
	}

	edit() {
		if (this.selectedNode) {
			this.unitDialog.show(this.selectedNode.data);
			this.unitDialog.onUpdateComplete.subscribe(()=> {
				this.buildCourseTree();
			});
		}
	}

	delete() {
		if (this.selectedNode)
            this.confirm('Are you sure to delete ?', () => {
                this.selectedNode.data.delete(this).subscribe(() => {
                    this.buildCourseTree();
                    this.selectedNode = null;
                })
             });
	}

	hide() {
		this.display = false;
	}

	moveUp() {
		if (this.selectedNode) {
			var unit =  this.selectedNode.data;
			this.sylUtils.moveUp(this.tree,this.selectedNode);
			var subscriptions = _.map(this.units, (unit) => {
				return unit.save(this);
			});
			Observable.forkJoin(subscriptions).subscribe();
		}
	}

	moveDown() {
		if (this.selectedNode) {
			var unit =  this.selectedNode.data;
			this.sylUtils.moveDown(this.tree,this.selectedNode);
			var subscriptions = _.map(this.units, (unit) => {
				return unit.save(this);
			});
			Observable.forkJoin(subscriptions).subscribe();
		}
	}

	nodeSelect(event:any) {
		if (this.selectedNode) {
			this.selectedUnit =  this.selectedNode.data;
		}
	}

	previewUnit() {
		if (this.selectedNode) {
			this.unitPreviewDialog.show(this.selectedNode.data);
		}
	}

}


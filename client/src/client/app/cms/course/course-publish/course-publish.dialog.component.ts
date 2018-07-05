import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { SyllabusUtils } from '../../../shared/helpers/syllabus.utils';
import { WebSocketService } from '../../../shared/services/socket.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { CourseSyllabus }  from '../../../shared/models/elearning/course-syllabus.model';
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
    selector: 'course-publish-dialog',
    templateUrl: 'course-publish.dialog.component.html',
    styleUrls: ['course-publish.dialog.component.css'],
})
export class CoursePublishDialog extends BaseComponent {

	COURSE_UNIT_TYPE = COURSE_UNIT_TYPE;

	private display: boolean;
	private tree: TreeNode[];
	private syl: CourseSyllabus;
	private selectedNode: TreeNode;
	private items: MenuItem[];
	private units: CourseUnit[];
	private selectedUnit:CourseUnit;
	private sylUtils : SyllabusUtils;
	private course: Course;
	private contentStatus: SelectItem[];

	@ViewChild(CourseUnitPreviewDialog) unitPreviewDialog: CourseUnitPreviewDialog;

    constructor() {
        super();
        this.sylUtils = new SyllabusUtils();
        this.syl = new CourseSyllabus();
        this.course = new Course();
        this.contentStatus = _.map(CONTENT_STATUS, (val, key)=> {
			return {
				label: this.translateService.instant(val),
				value: key
			}
		});
    }

    show(course: Course) {
		this.display = true;
		this.course = course;
		CourseSyllabus.get(this, course.syllabus_id).subscribe((syl)=> {
			this.syl = syl;
			this.buildCourseTree();
		});
	}

	clearSelection() {
		this.selectedNode = null;
		this.selectedUnit = null;
	}

	buildCourseTree() {
		if (this.syl) {
			CourseUnit.listBySyllabus(this,this.syl.id).subscribe(units => {
				this.units = units;
				this.tree = this.sylUtils.buildGroupTree(units);
	        });
		}
	}

	hide() {
		this.clearSelection();
		this.display = false;
	}

	
	nodeSelect(event:any) {
		if (this.selectedNode) {
			if (this.selectedUnit && this.selectedUnit.id == this.selectedNode.data.id) {
				this.clearSelection();
			} 
			else
				this.selectedUnit =  this.selectedNode.data;
		}
	}

	previewUnit() {
		if (this.selectedNode) {
			this.selectedNode.data.course_id = this.course.id;
			this.unitPreviewDialog.show(this.selectedNode.data);
		}
	}

	save() {
		var saveApiList = _.map(this.units, (unit:CourseUnit)=> {
			return unit.__api__update();
		});
		saveApiList.push(this.syl.__api__update());
		BaseModel.bulk_update(this, ...saveApiList).subscribe(()=> {
			this.hide();
		});
	}


}


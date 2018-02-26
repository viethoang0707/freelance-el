import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { SyllabusUtils } from '../../../shared/helpers/syllabus.utils';
import { Group } from '../../../shared/models/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/user.model';
import { CourseUnit } from '../../../shared/models/course-unit.model';
import { CourseSyllabus }  from '../../../shared/models/course-syllabus.model';
import { TreeNode, MenuItem } from 'primeng/api';
import { COURSE_UNIT_TYPE, COURSE_UNIT_ICON } from '../../../shared/models/constants';
import { CourseUnitDialog } from '../course-unit-dialog/course-unit-dialog.component';

@Component({
    moduleId: module.id,
    selector: 'etraining-course-syllabus-dialog',
    templateUrl: 'course-syllabus.dialog.component.html',
})
export class CourseSyllabusDialog extends BaseComponent {

	display: boolean;
	tree: TreeNode[];
	syl: CourseSyllabus;
	selectedNode: TreeNode;
	items: MenuItem[];

	@ViewChild(CourseUnitDialog) unitDialog: CourseUnitDialog;

    constructor(private sylUtils : SyllabusUtils ) {
        super();
        this.items = [
            {label: this.translateService.instant(COURSE_UNIT_TYPE['folder']), command: ()=> { this.add('folder')}},
            {label: this.translateService.instant(COURSE_UNIT_TYPE['html']), command: ()=> { this.add('html')}},
            {label: this.translateService.instant(COURSE_UNIT_TYPE['video']), command: ()=> { this.add('video')}},
            {label: this.translateService.instant(COURSE_UNIT_TYPE['exercise']), command: ()=> { this.add('exercise')}},
        ];
    }

    show(syl: CourseSyllabus) {
		this.display = true;
		this.syl = syl;
		this.buildCourseTree();		
	}

	buildCourseTree() {
		if (this.syl)
			CourseUnit.listBySyllabus(this,this.syl.id).subscribe(groups => {
				this.tree = this.sylUtils.buildTree(groups);
	        });
	}

	add(type:string) {
		if ( this.selectedNode && this.selectedNode.data.type != 'folder') {
			this.messageService.add({ severity: 'error', summary: 'Error', detail: this.translateService.instant('You can only add course unit to a folder.') });
			return;
		}
		var unit = new CourseUnit();
		unit.syllabus_id =  this.syl.id;
		unit.icon = COURSE_UNIT_ICON[type];
		unit.type =  type;
		unit.name = 'New unit';
		unit.parent_id = this.selectedNode ? this.selectedNode.data.id : null;
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

	}

	hide() {
		this.display = false;
	}

	moveUp() {

	}

}


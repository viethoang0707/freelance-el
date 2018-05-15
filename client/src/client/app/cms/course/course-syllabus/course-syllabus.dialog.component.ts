import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { SyllabusUtils } from '../../../shared/helpers/syllabus.utils';
import { WebSocketService } from '../../../shared/services/socket.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { CourseSyllabus }  from '../../../shared/models/elearning/course-syllabus.model';
import { TreeNode, MenuItem, SelectItem } from 'primeng/api';
import { COURSE_UNIT_TYPE, COURSE_UNIT_ICON, COURSE_STATUS } from '../../../shared/models/constants';
import { CourseUnitDialog } from '../course-unit-dialog/course-unit-dialog.component';
import { CourseUnitPreviewDialog } from '../course-unit-preview-dialog/course-unit-preview-dialog.component';
import { CourseSyllabusSettingDialog } from '../syllabus-setting/syllabus-setting.dialog.component';
import * as _ from 'underscore';
import { Ticket } from '../../../shared/models/ticket/ticket.model';

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
	sylUtils : SyllabusUtils;
	course: Course;
	user: User;
	courseStatus: SelectItem[];
	COURSE_UNIT_TYPE = COURSE_UNIT_TYPE;
	allowToChangeState : boolean;
	openTicket: Ticket;

	@ViewChild(CourseUnitDialog) unitDialog: CourseUnitDialog;
	@ViewChild(CourseUnitPreviewDialog) unitPreviewDialog: CourseUnitPreviewDialog;
	@ViewChild(CourseSyllabusSettingDialog) settingDialog: CourseSyllabusSettingDialog;

    constructor(private socketService:WebSocketService) {
        super();
        this.sylUtils = new SyllabusUtils();
        this.items = [
            {label: this.translateService.instant(COURSE_UNIT_TYPE['folder']), command: ()=> { this.add('folder')}},
            {label: this.translateService.instant(COURSE_UNIT_TYPE['html']), command: ()=> { this.add('html')}},
            {label: this.translateService.instant(COURSE_UNIT_TYPE['slide']), command: ()=> { this.add('slide')}},
            {label: this.translateService.instant(COURSE_UNIT_TYPE['video']), command: ()=> { this.add('video')}},
            {label: this.translateService.instant(COURSE_UNIT_TYPE['exercise']), command: ()=> { this.add('exercise')}},
            {label: this.translateService.instant(COURSE_UNIT_TYPE['scorm']), command: ()=> { this.add('scorm')}},

        ];
        this.syl = new CourseSyllabus();
        this.course = new Course();
        this.courseStatus = _.map(COURSE_STATUS, (val, key)=> {
			return {
				label: this.translateService.instant(val),
				value: key
			}
		});
		this.user = this.authService.UserProfile;
    }

    show(syl: CourseSyllabus) {
		this.display = true;
		this.syl = syl;
		this.buildCourseTree();		
		Course.get(this, this.syl.course_id).subscribe(course => {
			this.course = course;
			this.dataAccessService.filter(course, 'SAVE').subscribe(success=> {
				this.allowToChangeState = !this.course.supervisor_id || 
				this.user.IsSuperAdmin ;
			});
		});
		Ticket.byWorkflowObject(this, syl.id, CourseSyllabus.Model).subscribe((ticket)=> {
				this.openTicket =  ticket;
		});
	}

	clearSelection() {
		this.selectedNode =  null;
		this.selectedUnit = null;
	}

	buildCourseTree() {
		if (this.syl)
			CourseUnit.listBySyllabus(this,this.syl.id).subscribe(units => {
				this.units = units;
				this.tree = this.sylUtils.buildGroupTree(units);
	        });
	}

	showSetting() {
		this.settingDialog.show(this.syl);
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
		if (this.selectedNode) {
			if (this.selectedNode.children.length) {
				this.error('Cannot delete non-empty folder');
				return;
			}
            this.confirm('Are you sure to delete ?', () => {
                this.selectedNode.data.delete(this).subscribe(() => {
                    this.buildCourseTree();
                    this.selectedNode = null;
                })
             });
		}
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
			if (this.selectedUnit && this.selectedUnit.id == this.selectedNode.data.id) {
				this.clearSelection();
			} 
			else
				this.selectedUnit =  this.selectedNode.data;
		} 
	}

	previewUnit() {
		if (this.selectedNode) {
			this.unitPreviewDialog.show(this.selectedNode.data);
		}
	}

	submitForReview() {
		var ticket = new Ticket();
		ticket.res_id =  this.syl.id;
		ticket.res_model =  CourseSyllabus.Model;
		ticket.content = `Course syllabus ${this.syl.name} is request to be published`;
		ticket.date_open =  new Date();
		ticket.submit_user_id =  this.user.id;
		ticket.approve_user_id = this.course.supervisor_id;
		ticket.title = 'Course syllabus published request';
		ticket.save(this).subscribe(()=> {
			this.socketService.notify(ticket.title, this.course.supervisor_id,this.authService.CloudAcc.id);
		});
	}

	updateStatus() {
		this.syl.save(this).subscribe(()=> {
			this.success('Syllabus status updated');
		});
	}

}


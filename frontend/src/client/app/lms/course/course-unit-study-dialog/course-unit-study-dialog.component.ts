import { Component, OnInit, Input, ComponentFactoryResolver, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { CourseUnitPlayerRegister } from '../course-unit-template/unit.decorator';
import { CourseUnitPlayerContainerDirective } from '../course-unit-template/unit-player.directive';
import { ICourseUnitPlay } from '../course-unit-template/unit.interface';
import { SyllabusUtils } from '../../../shared/helpers/syllabus.utils';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { CourseLog } from '../../../shared/models/elearning/log.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { WindowRef } from '../../../shared/helpers/windonw.ref';
import { CourseFaq } from '../../../shared/models/elearning/course-faq.model';
import { CourseMaterial } from '../../../shared/models/elearning/course-material.model';
import * as screenfull from 'screenfull';
declare var $: any;

@Component({
	moduleId: module.id,
	selector: 'course-unit-study-dialog',
	templateUrl: 'course-unit-study-dialog.component.html',
	styleUrls: ['course-unit-study-dialog.component.css'],
})
export class CourseUnitStudyDialog extends BaseComponent {

	WINDOW_HEIGHT: any;

	private componentRef: any;
	private treeUtils: TreeUtils;
	private tree: TreeNode[];
	private treeList: TreeNode[];
	private selectedUnit: CourseUnit;
	private sylUtils: SyllabusUtils;
	private syl: CourseSyllabus;
	private selectedNode: TreeNode;
	private units: CourseUnit[];
	private member: CourseMember;
	private course: Course;
	private enableLogging: boolean;
	private logs: CourseLog[];
	private completedUnitIds = [];
	private display: boolean;
	private faqs: CourseFaq[];
	private materials: CourseMaterial[];
	private autoNext: boolean;

	@ViewChild(CourseUnitPlayerContainerDirective) unitHost: CourseUnitPlayerContainerDirective;
	@ViewChild('unitPlayer') unitPlayer: ElementRef;

	constructor(private componentFactoryResolver: ComponentFactoryResolver, private winRef: WindowRef) {
		super();
		this.treeUtils = new TreeUtils();
		this.sylUtils = new SyllabusUtils();
		this.course = new Course();
		this.WINDOW_HEIGHT = $(window).height();
		this.enableLogging = true;
		this.autoNext = false;
		this.faqs = [];
		this.materials = [];
	}

	show(member: CourseMember, course: Course, syl: CourseSyllabus, units: CourseUnit[], faqs: CourseFaq[], materials: CourseMaterial[]) {
		this.display = true;
		this.fullscreen = false;
		this.enableLogging = member.enroll_status != 'completed';
		this.member = member;
		this.course = course;
		this.syl = syl;
		this.units = units;
		this.faqs = faqs;
		this.materials = materials;
		CourseLog.memberStudyActivity(this, member.id, course.id).subscribe(logs => {
			this.logs = logs;
			this.displayCouseSyllabus();
		});
	}

	displayCouseSyllabus() {
		this.units = _.filter(this.units, (unit: CourseUnit) => {
			return unit.status == 'published';
		});
		_.each(this.units, (unit: CourseUnit) => {
			var log = _.find(this.logs, (obj: CourseLog) => {
				return obj.res_id == unit.id && obj.res_model == CourseUnit.Model && obj.code == 'COMPLETE_COURSE_UNIT';
			});
			if (log)
				this.completedUnitIds.push(unit.id);
		});
		this.tree = this.sylUtils.buildGroupTree(this.units);
		this.treeList = this.sylUtils.flattenTree(this.tree);
		if (this.logs.length) {
			var last_attempt = _.max(this.logs, (log: CourseLog) => {
				return log.start.getTime();
			});
			if (last_attempt) {
				this.selectedNode = this.sylUtils.findTreeNode(this.tree, last_attempt.res_id);
				this.selectedUnit = this.selectedNode.data;
				this.studyUnit();
			}
		}
		if (this.syl.status != 'published')
			this.warn('Cours syllabus is not published');
	}

	nodeSelect(event: any) {
		this.unloadCurrentUnit();
		if (this.selectedNode) {
			this.selectedUnit = this.selectedNode.data;
			this.studyUnit();
		}
	}

	unloadCurrentUnit() {
		if (this.unitHost) {
			let viewContainerRef = this.unitHost.viewContainerRef;
			if (viewContainerRef)
				viewContainerRef.clear();
		}
	}

	prevUnit() {
		if (this.selectedUnit) {
			if (this.enableLogging)
				CourseLog.stopCourseUnit(this, this.member, this.selectedUnit).subscribe();
			var prevUnit = this.computedPrevUnit(this.selectedUnit.id);
			if (prevUnit) {
				this.unloadCurrentUnit();
				this.selectedNode = this.sylUtils.findTreeNode(this.tree, prevUnit.id);
				this.selectedUnit = this.selectedNode.data;
				this.studyUnit();
			}
		}
	}

	nextUnit() {
		if (this.selectedUnit) {
			if (this.enableLogging)
				CourseLog.completeCourseUnit(this, this.member, this.selectedUnit).subscribe();
			this.completedUnitIds.push(this.selectedUnit.id);
			var nextUnit = this.computedNextUnit(this.selectedUnit.id);
			if (nextUnit) {
				this.unloadCurrentUnit();
				this.selectedNode = this.sylUtils.findTreeNode(this.tree, nextUnit.id);
				this.selectedUnit = this.selectedNode.data;
				this.studyUnit();
			}
		}
	}

	computedPrevUnit(currentUnitId: number): CourseUnit {
		var currentNodeIndex = 0;
		for (; currentNodeIndex < this.treeList.length; currentNodeIndex++) {
			var node = this.treeList[currentNodeIndex];
			if (node.data.id == currentUnitId)
				break;
		}
		currentNodeIndex--;
		while (currentNodeIndex >= 0) {
			var node = this.treeList[currentNodeIndex];
			if (node.data.type != 'folder')
				break;
			currentNodeIndex--;
		}
		return (currentNodeIndex >= 0 ? this.treeList[currentNodeIndex].data : null);
	}

	computedNextUnit(currentUnitId: number): CourseUnit {
		var currentNodeIndex = 0;
		for (; currentNodeIndex < this.treeList.length; currentNodeIndex++) {
			var node = this.treeList[currentNodeIndex];
			if (node.data.id == currentUnitId)
				break;
		}
		currentNodeIndex++;
		while (currentNodeIndex < this.treeList.length) {
			var node = this.treeList[currentNodeIndex];
			if (node.data.type != 'folder')
				break;
			currentNodeIndex++;
		}
		return (currentNodeIndex < this.treeList.length ? this.treeList[currentNodeIndex].data : null);
	}

	studyUnit() {
		if (this.selectedUnit && this.selectedUnit.type != 'folder') {
			if (this.course.complete_unit_by_order) {
				let prevUnit: CourseUnit = this.computedPrevUnit(this.selectedUnit.id);
				if (prevUnit) {
					if (this.completedUnitIds.includes(prevUnit.id)) {
						this.openUnit(this.selectedUnit);
						if (this.enableLogging)
							CourseLog.startCourseUnit(this, this.member, this.selectedUnit).subscribe();
					}
				}
				else {
					this.openUnit(this.selectedUnit);
					CourseLog.startCourseUnit(this, this.member, this.selectedUnit).subscribe();
				}
			}
			else {
				this.openUnit(this.selectedUnit);
				if (this.enableLogging)
					CourseLog.startCourseUnit(this, this.member, this.selectedUnit).subscribe();
			}
		}
	}

	openUnit(unit: CourseUnit) {
		var detailComponent = CourseUnitPlayerRegister.Instance.lookup(unit.type);
		let viewContainerRef = this.unitHost.viewContainerRef;
		if (detailComponent) {
			let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
			viewContainerRef.clear();
			this.componentRef = viewContainerRef.createComponent(componentFactory);
			let courseUnitPlayer: ICourseUnitPlay = (<ICourseUnitPlay>this.componentRef.instance);
			courseUnitPlayer.play(unit, this.member);

			courseUnitPlayer.onViewCompleted.first().subscribe(() => {
				if (unit.type == 'video' && this.autoNext)
					this.nextUnit();
			});
		} else {
			viewContainerRef.clear();
			this.componentRef = null;
		}
	}

	hide() {
		this.unloadCurrentUnit();
		this.display = false;
	}

	downloadMaterial(material: CourseMaterial) {
		this.winRef.getNativeWindow().open(material.url, "_blank");
	}

	requestFullScreen() {
		if (screenfull.enabled) {
			screenfull.request(this.unitPlayer.nativeElement);
		}

	}


}



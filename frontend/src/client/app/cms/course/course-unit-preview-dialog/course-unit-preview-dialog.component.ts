import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { CourseUnitRegister } from '../course-unit-template/unit.decorator';
import { CourseUnitContainerDirective } from '../course-unit-template/unit-container.directive';
import { ICourseUnitDesign } from '../course-unit-template/unit.interface';
import { SyllabusUtils } from '../../../shared/helpers/syllabus.utils';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { Course } from '../../../shared/models/elearning/course.model';

@Component({
	moduleId: module.id,
	selector: 'course-unit-preview-dialog',
	templateUrl: 'course-unit-preview-dialog.component.html',
})
export class CourseUnitPreviewDialog extends BaseComponent {

	private componentRef: any;
	private treeUtils: TreeUtils;
	private tree: TreeNode[];
	private treeList: TreeNode[];
	private selectedUnit: CourseUnit;
	private sylUtils: SyllabusUtils;
	private nameUnit: string;
	private display: boolean;
	private course: Course;
	private syl: CourseSyllabus;
	private units: CourseUnit[];

	@ViewChild(CourseUnitContainerDirective) unitHost: CourseUnitContainerDirective;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) {
		super();
		this.treeUtils = new TreeUtils();
		this.sylUtils = new SyllabusUtils();
	}

	show(unit: CourseUnit, course: Course, syl: CourseSyllabus, units: CourseUnit[]) {
		this.display = true;
		this.course = course;
		this.syl = syl;
		this.units = units;
		this.selectedUnit = unit;
		var detailComponent = CourseUnitRegister.Instance.lookup(unit.type);
		let viewContainerRef = this.unitHost.viewContainerRef;
		this.nameUnit = unit.name;
		this.tree = this.sylUtils.buildGroupTree(units);
		this.treeList = this.sylUtils.flattenTree(this.tree);
		if (detailComponent) {
			let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
			viewContainerRef.clear();
			this.componentRef = viewContainerRef.createComponent(componentFactory);
			(<ICourseUnitDesign>this.componentRef.instance).mode = 'preview';
			(<ICourseUnitDesign>this.componentRef.instance).render(unit);
		} else {
			viewContainerRef.clear();
			this.componentRef = null;
		}
	}

	hide() {
		this.display = false;
		let viewContainerRef = this.unitHost.viewContainerRef;
		if (viewContainerRef)
			viewContainerRef.clear();
	}




	nextUnitPreview() {
		let viewContainerRef = this.unitHost.viewContainerRef;
		if (viewContainerRef)
			viewContainerRef.clear();
		this.selectedUnit = this.computedNextUnit(this.selectedUnit);
		if (!this.selectedUnit)
			return;
		this.selectedUnit = this.selectedUnit;
		var detailComponent = CourseUnitRegister.Instance.lookup(this.selectedUnit.type);
		this.nameUnit = this.selectedUnit.name;
		if (detailComponent) {
			let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
			viewContainerRef.clear();
			this.componentRef = viewContainerRef.createComponent(componentFactory);
			(<ICourseUnitDesign>this.componentRef.instance).mode = 'preview';
			(<ICourseUnitDesign>this.componentRef.instance).render(this.selectedUnit);
		} else {
			viewContainerRef.clear();
			this.componentRef = null;
		}
	}

	prevUnitPreview() {
		let viewContainerRef = this.unitHost.viewContainerRef;
		if (viewContainerRef)
			viewContainerRef.clear();
		this.selectedUnit = this.computedPrevUnit(this.selectedUnit);
		if (!this.selectedUnit)
			return;
		var detailComponent = CourseUnitRegister.Instance.lookup(this.selectedUnit.type);
		this.nameUnit = this.selectedUnit.name;
		if (detailComponent) {
			let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
			viewContainerRef.clear();
			this.componentRef = viewContainerRef.createComponent(componentFactory);
			(<ICourseUnitDesign>this.componentRef.instance).mode = 'preview';
			(<ICourseUnitDesign>this.componentRef.instance).render(this.selectedUnit);
		} else {
			viewContainerRef.clear();
			this.componentRef = null;
		}
	}

	computedNextUnit(unit: CourseUnit): CourseUnit {
		var currentNodeIndex = 0;
		if (unit)
			for (; currentNodeIndex < this.treeList.length; currentNodeIndex++) {
				var node = this.treeList[currentNodeIndex];
				if (node.data.id == unit.id)
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

	computedPrevUnit(unit: CourseUnit): CourseUnit {
		var currentNodeIndex = 0;
		if (unit)
			for (; currentNodeIndex < this.treeList.length; currentNodeIndex++) {
				var node = this.treeList[currentNodeIndex];
				if (node.data.id == unit.id)
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
}



import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { CourseUnitRegister } from '../course-unit-template/unit.decorator';
import { CourseUnitContainerDirective } from '../course-unit-template/unit-container.directive';
import { ICourseUnit } from '../course-unit-template/unit.interface';
import { SyllabusUtils } from '../../../shared/helpers/syllabus.utils';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';

@Component({
	moduleId: module.id,
	selector: 'course-unit-preview-dialog',
	templateUrl: 'course-unit-preview-dialog.component.html',
})
export class CourseUnitPreviewDialog extends BaseDialog<CourseUnit> {

	@ViewChild(CourseUnitContainerDirective) unitHost: CourseUnitContainerDirective;
	private componentRef: any;
	private treeUtils: TreeUtils;
	private tree: TreeNode[];
	private treeList: TreeNode[];
	private selectedUnit: CourseUnit;
	private sylUtils: SyllabusUtils;
	private nameUnit: string;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) {
		super();
		this.treeUtils = new TreeUtils();
		this.sylUtils = new SyllabusUtils();
	}

	ngOnInit() {
		this.onShow.subscribe(object => {
			var detailComponent = CourseUnitRegister.Instance.lookup(object.type);
			let viewContainerRef = this.unitHost.viewContainerRef;
			this.nameUnit = object.name;

			// Get treelist
			CourseSyllabus.byCourse(this, object.course_id).subscribe(syl => {
				CourseUnit.listBySyllabus(this, syl.id).subscribe(units => {
					this.tree = this.sylUtils.buildGroupTree(units);
					this.treeList = this.sylUtils.flattenTree(this.tree);
				});
			});
			this.selectedUnit = object;
			// End get treelist

			if (detailComponent) {
				let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
				viewContainerRef.clear();
				this.componentRef = viewContainerRef.createComponent(componentFactory);
				(<ICourseUnit>this.componentRef.instance).mode = 'preview';
				(<ICourseUnit>this.componentRef.instance).render(object);
			} else {
				viewContainerRef.clear();
				this.componentRef = null;
			}

		});

		this.onHide.subscribe(() => {
			let viewContainerRef = this.unitHost.viewContainerRef;
			if (viewContainerRef)
				viewContainerRef.clear();
		});
	}

	nextUnitPreview() {
		let viewContainerRef = this.unitHost.viewContainerRef;
		if (viewContainerRef)
			viewContainerRef.clear();
		var id = this.selectedUnit.id;
		var object = this.computedNextUnit(this.selectedUnit.id);
		this.selectedUnit = this.computedNextUnit(this.selectedUnit.id);
		var detailComponent = CourseUnitRegister.Instance.lookup(object.type);
		this.nameUnit = object.name;
		if (detailComponent) {
			let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
			viewContainerRef.clear();
			this.componentRef = viewContainerRef.createComponent(componentFactory);
			(<ICourseUnit>this.componentRef.instance).mode = 'preview';
			(<ICourseUnit>this.componentRef.instance).render(object);
		} else {
			viewContainerRef.clear();
			this.componentRef = null;
		}
	}

	prevUnitPreview() {
		let viewContainerRef = this.unitHost.viewContainerRef;
		if (viewContainerRef)
			viewContainerRef.clear();
		var id = this.selectedUnit.id;
		var object = this.computedPrevUnit(this.selectedUnit.id);
		this.selectedUnit = this.computedPrevUnit(this.selectedUnit.id);
		var detailComponent = CourseUnitRegister.Instance.lookup(object.type);
		this.nameUnit = object.name;
		if (detailComponent) {
			let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
			viewContainerRef.clear();
			this.componentRef = viewContainerRef.createComponent(componentFactory);
			(<ICourseUnit>this.componentRef.instance).mode = 'preview';
			(<ICourseUnit>this.componentRef.instance).render(object);
		} else {
			viewContainerRef.clear();
			this.componentRef = null;
		}
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
}



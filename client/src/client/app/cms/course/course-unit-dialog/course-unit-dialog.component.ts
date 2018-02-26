import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/group.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { CourseUnit } from '../../../shared/models/course-unit.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { CourseUnitRegister } from '../course-unit-template/unit.decorator';
import { CourseUnitContainerDirective } from '../course-unit-template/unit-container.directive';
import { ICourseUnit } from '../course-unit-template/unit.interface';

@Component({
	moduleId: module.id,
	selector: 'etraining-course-unit-dialog',
	templateUrl: 'course-unit-dialog.component.html',
})
export class CourseUnitDialog extends BaseDialog<CourseUnit> {

	@ViewChild(CourseUnitContainerDirective) unitHost: CourseUnitContainerDirective;
	componentRef: any;

	constructor(private treeUtils: TreeUtils, private componentFactoryResolver: ComponentFactoryResolver) {
		super();
	}

	ngOnInit() {
		this.onShow.subscribe(object => {
			var detailComponent = CourseUnitRegister.Instance.lookup(object.type);
			let viewContainerRef = this.unitHost.viewContainerRef;
			if (detailComponent) {
				let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
				viewContainerRef.clear();
				this.componentRef = viewContainerRef.createComponent(componentFactory);
				(<ICourseUnit>this.componentRef.instance).render(object);
			} else {
				viewContainerRef.clear();
				this.componentRef = null;
			}

		});
		this.onUpdateComplete.subscribe(object => {
			if (this.componentRef)
				(<ICourseUnit>this.componentRef.instance).saveEditor().subscribe(() => {
					this.messageService.add({ severity: 'success', summary: 'Success', detail: this.translateService.instant('Course unit saved.') });
				});
		})
	}


}



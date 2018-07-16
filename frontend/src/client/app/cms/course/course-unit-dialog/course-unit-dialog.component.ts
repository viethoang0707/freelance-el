import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
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
import { SelectItem, MenuItem } from 'primeng/api';
import { GROUP_CATEGORY, CONTENT_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE, COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants'

@Component({
	moduleId: module.id,
	selector: 'course-unit-dialog',
	templateUrl: 'course-unit-dialog.component.html',
	styles: [`
		.custom .ui-scrollpanel-content {
			width: 100% !important;
		}
    `],
	encapsulation: ViewEncapsulation.None
})
export class CourseUnitDialog extends BaseDialog<CourseUnit> {

	private componentRef: any;
	private treeUtils: TreeUtils;
	private contentStatus: SelectItem[];

	@ViewChild(CourseUnitContainerDirective) unitHost: CourseUnitContainerDirective;

	constructor( private componentFactoryResolver: ComponentFactoryResolver) {
		super();
		this.treeUtils = new TreeUtils();
		this.contentStatus = _.map(CONTENT_STATUS, (val, key) => {
			return {
				label: this.translateService.instant(val),
				value: key
			}
		});
	}

	ngOnInit() {
		this.onShow.subscribe(object => {
			var detailComponent = CourseUnitRegister.Instance.lookup(object.type);
			let viewContainerRef = this.unitHost.viewContainerRef;
			if (detailComponent) {
				let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
				viewContainerRef.clear();
				this.componentRef = viewContainerRef.createComponent(componentFactory);
				(<ICourseUnit>this.componentRef.instance).mode = 'design';
				(<ICourseUnit>this.componentRef.instance).render(object);
			} else {
				viewContainerRef.clear();
				this.componentRef = null;
			}

		});
		this.onUpdateComplete.subscribe(object => {
			if (this.componentRef)
				(<ICourseUnit>this.componentRef.instance).saveEditor().subscribe(() => {
					this.success(this.translateService.instant('Course unit saved.'));
				});
		})
	}


}



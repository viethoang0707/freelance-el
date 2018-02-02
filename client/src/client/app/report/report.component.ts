import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../shared/components/base/base.component';
import * as _ from 'underscore';
import { MenuItem } from 'primeng/api';
import { UserByGroupReportComponent } from './user/user-by-group-report/user-by-group-report.component';
import { ReportContainerDirective } from './report-container.directive';

@Component({
	moduleId: module.id,
	selector: 'etraining-report',
	templateUrl: 'report.component.html'

})
export class ReportComponent extends BaseComponent implements OnInit {

	items: MenuItem[];
	@ViewChild(ReportContainerDirective) container: ReportContainerDirective;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) {
		super();
		this.items = [
            {
                label: this.translateService.instant('User report'),
                icon: 'ui-icon-people',
                items: [
                    {label: 'User by group', command:()=> {
                    	this.renderReportComponent(UserByGroupReportComponent);
                    } },
                ]
            },
            {
                label: this.translateService.instant('Course report'),
                icon: 'ui-icon-school',
                items: [

                ]
            },
            {
                label: this.translateService.instant('Exam report'),
                icon: 'ui-icon-grade',
                items: [
                ]
            },

        ];
	}

	ngOnInit() {
		
	}

	renderReportComponent(component) {
		let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
		let viewContainerRef = this.container.viewContainerRef;
		viewContainerRef.clear();
		let componentRef = viewContainerRef.createComponent(component);
	}


}

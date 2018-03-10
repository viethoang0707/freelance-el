import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../shared/components/base/base.component';
import * as _ from 'underscore';
import { SelectItem } from 'primeng/api';
import { ReportRegister } from './report.decorator';
import { ReportContainerDirective } from './report-container.directive';
import { REPORT_CATEGORY } from '../shared/models/constants'


@Component({
	moduleId: module.id,
	selector: 'etraining-report',
	templateUrl: 'report.component.html'
})
export class ReportComponent extends BaseComponent implements OnInit {

	items: SelectItem[];
	selectedItem: any;
	@ViewChild(ReportContainerDirective) container: ReportContainerDirective;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) {
		super();
	}

	ngOnInit() {
		this.items = [];
		_.each(REPORT_CATEGORY, (val, key)=> {
			this.items.push({
                label: '-- '+ this.translateService.instant(val) +' --',
                value:null
            });
            this.items = this.items.concat(_.map(ReportRegister.Instance.lookup(key), (report)=> {
				return {
					label: this.translateService.instant(report["title"]),
					value: report["component"]
					}
				}));
		});
	}

	renderReportComponent(component) {
		let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
		let viewContainerRef = this.container.viewContainerRef;
		viewContainerRef.clear();
		let componentRef = viewContainerRef.createComponent(componentFactory);
	}

	selectReport() {
		if (this.selectedItem)
			this.renderReportComponent(this.selectedItem);
	}


}

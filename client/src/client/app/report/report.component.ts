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
		var self = this;
		this.items = [];
		_.each(REPORT_CATEGORY, function(val, key) {
			self.items.push({
                label: '-- '+ self.translateService.instant(val) +' --',
                value:null
            });
            self.items = self.items.concat(_.map(ReportRegister.Instance.lookup(key), function(report) {
				return {
					label: self.translateService.instant(report["title"]),
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

import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../shared/components/base/base.component';
import * as _ from 'underscore';
import { SelectItem } from 'primeng/api';
import { ChartRegister } from './chart.decorator';
import { ChartContainerDirective } from './chart-container.directive';

@Component({
	moduleId: module.id,
	selector: 'chart',
	templateUrl: 'chart.component.html',
})
export class ChartComponent extends BaseComponent implements OnInit {

	private chartData: any;
	private charts: SelectItem[];
    private selectedChart: any;

    @ViewChild(ChartContainerDirective) container: ChartContainerDirective;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) {
		super();
	}

	ngOnInit() {
		this.charts = _.map(ChartRegister.Instance.entries(), (chart)=> {
            return {
                label: this.translateService.instant(chart["title"]),
                value: chart["component"]
            }
        });
        if (this.charts.length) {
            this.selectedChart =  this.charts[0].value;
            this.selectChart();
        }
	}

	renderChartComponent(component) {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        let viewContainerRef = this.container.viewContainerRef;
        viewContainerRef.clear();
        let componentRef = viewContainerRef.createComponent(componentFactory);
    }

    selectChart() {
        if (this.selectedChart)
            this.renderChartComponent(this.selectedChart);
    }

}

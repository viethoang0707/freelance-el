import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { User } from '../../shared/models/user.model';
import { Course } from '../../shared/models/course.model';
import { CourseMember } from '../../shared/models/course-member.model';
import { BaseComponent } from '../../shared/components/base/base.component';
import { SelectItem } from 'primeng/api';
import { ChartRegister } from '../chart.decorator';
import { ChartContainerDirective } from '../chart-container.directive';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'etraining-admin-dashboard',
    templateUrl: 'admin-dashboard.component.html'

})
export class AdminDashboardComponent extends BaseComponent implements OnInit {

    chartData: any;
    userCount: any;
    studentCount: any;
    teacherCount: any;
    courseCount: any;
    charts: SelectItem[];
    selectedChart: any;

    @ViewChild(ChartContainerDirective) container: ChartContainerDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
        super();
    }

    ngOnInit() {
        User.count(this).subscribe(count => {
            this.userCount = count;
        });
        Course.count(this).subscribe(count => {
            this.courseCount = count;
        });
        CourseMember.countTeacher(this).subscribe(count => {
            this.teacherCount = count;
        });
        CourseMember.countStudent(this).subscribe(count => {
            this.studentCount = count;
        });
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


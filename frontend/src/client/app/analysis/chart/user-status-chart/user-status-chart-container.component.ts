import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs/Rx';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import { ExamGrade } from '../../../shared/models/elearning/exam-grade.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { Answer } from '../../../shared/models/elearning/answer.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import * as _ from 'underscore';
import { Chart } from '../chart.decorator';
import { StatsUtils } from '../../../shared/helpers/statistics.utils';
import { UserStatusChartComponent } from './user-status-chart.component';

@Component({
    moduleId: module.id,
    selector: 'user-status-chart-container',
	templateUrl: 'user-status-chart-container.component.html',
})
@Chart({
    title: 'User status chart',
})
export class UserStatusChartContainerComponent extends BaseComponent implements OnInit {

	@ViewChild(UserStatusChartComponent) userChart : UserStatusChartComponent;

    constructor() {
        super();
    }

    ngOnInit() {
    	this.userChart.drawChart();
    }

   
}

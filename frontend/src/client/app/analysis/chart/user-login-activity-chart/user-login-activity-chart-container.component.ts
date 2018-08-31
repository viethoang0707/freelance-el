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
import { EXPORT_DATETIME_FORMAT, REPORT_CATEGORY, GROUP_CATEGORY, COURSE_MODE, COURSE_MEMBER_ENROLL_STATUS, EXPORT_DATE_FORMAT } from '../../../shared/models/constants'
import { Chart } from '../chart.decorator';
import { StatsUtils } from '../../../shared/helpers/statistics.utils';
import { UserLoginActivityChartComponent } from './user-login-activity-chart.component';

@Component({
    moduleId: module.id,
    selector: 'user-login-activity-chart-container',
	templateUrl: 'user-login-activity-chart-container.component.html',
})
@Chart({
    title: 'User login activity chart',
})
export class UserLoginActivityChartContainerComponent extends BaseComponent implements OnInit {

	@ViewChild(UserLoginActivityChartComponent) userChart : UserLoginActivityChartComponent;

    constructor() {
        super();
    }

    ngOnInit() {
    	this.drawChart(7);
    }

   drawChart(day:number) {
       this.userChart.drawChart(day);
   }
}

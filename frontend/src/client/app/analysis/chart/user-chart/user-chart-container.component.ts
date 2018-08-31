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
import { UserChartComponent } from './user-chart.component';

@Component({
    moduleId: module.id,
    selector: 'user-chart-container',
	templateUrl: 'user-chart-container.component.html',
})
@Chart({
    title: 'User chart',
})
export class UserChartContainerComponent extends BaseComponent implements OnInit {

	@ViewChild(UserChartComponent) userChart : UserChartComponent;

    constructor() {
        super();
    }

    ngOnInit() {
    	this.userChart.drawChart();
    }

   
}

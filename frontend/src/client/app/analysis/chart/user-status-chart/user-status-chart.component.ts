import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs/Rx';

import { ReportUtils } from '../../../shared/helpers/report.utils';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import { ExamGrade } from '../../../shared/models/elearning/exam-grade.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { BaseModel } from '../../../shared/models/base.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, REPORT_CATEGORY, GROUP_CATEGORY, COURSE_MODE, COURSE_MEMBER_ENROLL_STATUS, EXPORT_DATE_FORMAT } from '../../../shared/models/constants'
import { Chart } from '../chart.decorator';
import { StatsUtils } from '../../../shared/helpers/statistics.utils';

@Component({
    moduleId: module.id,
    selector: 'user-status-chart',
    templateUrl: 'user-status-chart.component.html',
})
export class UserStatusChartComponent extends BaseComponent {

    private chartData: any;
    private statsUtils: StatsUtils;

    constructor() {
        super();
        this.statsUtils = new StatsUtils();
    }

    drawChart() {
        BaseModel
            .bulk_count(this,
                User.__api__countActive(),
                User.__api__countBanned())
            .map(jsonArr => {
                return _.flatten(jsonArr)
            })
            .subscribe(jsonArr => {
                var activeCount = jsonArr[0];
                var bannerCount = jsonArr[1];
                this.chartData = {
                    labels: ['Active user', 'Banner user'],
                    datasets: [
                        {
                            data: [activeCount, bannerCount],
                            backgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                            ],
                            hoverBackgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                            ]
                        }]
                };
            });

    }

}

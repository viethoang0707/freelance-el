import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs/Rx';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { Answer } from '../../../shared/models/elearning/answer.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import * as _ from 'underscore';
import { Chart } from '../chart.decorator';
import { StatsUtils } from '../../../shared/helpers/statistics.utils';

@Component({
    moduleId: module.id,
    selector: 'course-member-activity-chart',
    templateUrl: 'course-member-activity-chart.component.html',
})
export class CourseMemberActivityChartComponent extends BaseComponent  {

    private chartData: any;
    private statsUtils: StatsUtils;
    private cacheData = {};

    constructor() {
        super();
        this.statsUtils = new StatsUtils();
    }

    drawChart(member: CourseMember,duration:number) {
        var end = new Date();
        var start = new Date(end.getTime() - duration * 24 * 60 * 60 * 1000);
        start.setHours(0, 0, 0, 0);
        this.statsUtils.courseMemberStatisticByDate(this, member.id, member.course_id, start, end).subscribe(slots => {
            var labels = [this.translateService.instant('Today')];
            var data = [slots[slots.length-1]];
            for (var i =1; i< slots.length;i++) {
                labels.push(this.translateService.instant("Day-"+i));
                data.push(slots[slots.length-1-i]);
            }
            this.chartData = {
                labels: labels,
                datasets: [
                    {
                        label: this.translateService.instant('Course unit attempt'),
                        data: data,
                        fill: false,
                        borderColor: '#FFC107'
                    }
                ]
            };
        });
    }

}

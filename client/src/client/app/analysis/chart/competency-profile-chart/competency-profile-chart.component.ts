import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs/Rx';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import { User } from '../../../shared/models/elearning/user.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Competency } from '../../../shared/models/elearning/competency.model';
import { ExamGrade } from '../../../shared/models/elearning/exam-grade.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { BaseModel } from '../../../shared/models/base.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, REPORT_CATEGORY, COLOR_BAND, COURSE_MODE, COURSE_MEMBER_ENROLL_STATUS, EXPORT_DATE_FORMAT } from '../../../shared/models/constants'
import { Chart } from '../chart.decorator';
import { StatsUtils } from '../../../shared/helpers/statistics.utils';
import { CompetencyLevel } from '../../../shared/models/elearning/competency-level.model';

@Component({
    moduleId: module.id,
    selector: 'competency-profile-chart',
    templateUrl: 'competency-profile-chart.component.html',
})
export class CompetencyProfileChartComponent extends BaseComponent {

    private chartData: any;
    private statsUtils: StatsUtils;
    private cacheData: any;

    constructor() {
        super();
        this.statsUtils = new StatsUtils();
        this.cacheData = {};
    }

    prepareChartData(competency: Competency, levels: CompetencyLevel[]): Observable<any> {
        if (this.cacheData[competency.id])
            return Observable.of(this.cacheData[competency.id]);
        return this.statsUtils.competencyStatistic(this, competency, levels).do(profile => {
            this.cacheData[competency.id] = profile;
        });
    }

    drawChart(competency: Competency) {
        CompetencyLevel.listByCompetency(this, competency.id).subscribe(levels => {
            User.countAll(this).subscribe(totalUserCount => {
                this.prepareChartData(competency, levels).subscribe(profile => {
                    var totalWithSkill = 0;
                    var labels = [];
                    var data = [];
                    _.each(profile, (count: number, levelId) => {
                        totalWithSkill += count;
                        let level: CompetencyLevel = _.find(levels, (obj: CompetencyLevel) => {
                            return obj.id == levelId;
                        });
                        labels.push(level.name);
                        data.push(count);
                    });
                    labels.push('Unknwon');
                    data.push(totalUserCount - totalWithSkill);
                    this.chartData = {
                        labels: labels,
                        datasets: [
                            {
                                data: data,
                                backgroundColor: COLOR_BAND.slice(levels.length + 1),
                                hoverBackgroundColor: COLOR_BAND.slice(levels.length + 1)
                            }]
                    };
                });
            });
        });
    }

}

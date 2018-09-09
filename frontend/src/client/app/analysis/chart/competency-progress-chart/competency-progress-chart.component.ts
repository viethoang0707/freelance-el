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
import { EXPORT_DATETIME_FORMAT, REPORT_CATEGORY, COLOR_BAND, COURSE_MODE, COURSE_MEMBER_ENROLL_STATUS, EXPORT_DATE_FORMAT } from '../../../shared/models/constants'
import { Chart } from '../chart.decorator';
import { StatsUtils } from '../../../shared/helpers/statistics.utils';
import { CompetencyLevel } from '../../../shared/models/elearning/competency-level.model';
import { Competency } from '../../../shared/models/elearning/competency.model';

@Component({
    moduleId: module.id,
    selector: 'competency-progress-chart',
    templateUrl: 'competency-progress-chart.component.html',
})
export class CompetencyProgressChartComponent extends BaseComponent {

    private chartData: any;
    private statsUtils: StatsUtils;
    private cacheData: any;
    private competency: Competency

    constructor() {
        super();
        this.statsUtils = new StatsUtils();
        this.cacheData = {};
        this.competency = new Competency();
    }

    prepareChartData(competency: Competency, levels: CompetencyLevel[], duration: number): Observable<any> {
        if (this.cacheData[competency.id + '-' + duration])
            return Observable.of(this.cacheData[competency.id]);
        var end = new Date();
        var start = new Date(end.getTime() - duration * 24 * 60 * 60 * 1000);
        start.setHours(0, 0, 0, 0);
        return this.statsUtils.competencyStatisticByDate(this, competency, levels, start, end).do(slots => {
            this.cacheData[competency.id + '-' + duration] = slots;
        });
    }

    drawChart(competency: Competency, duration: number) {
        this.competency =  competency;
        this.competency.listLevels(this).subscribe(levels => {
            this.prepareChartData(this.competency, levels, duration).subscribe(slots => {
                var labels = [this.translateService.instant('Current')];
                var datasets = [];
                for (var j = 0; j < levels.length; j++) {
                    datasets.push({
                        label: levels[j].name,
                        backgroundColor: COLOR_BAND[j],
                        borderColor: COLOR_BAND[j],
                        data: []
                    });
                }
                for (var i = 0; i < slots.length; i++) {
                    labels.push(this.translateService.instant("Month-" + i));
                    for (var j = 0; j < levels.length; j++) {
                        datasets[j]["data"].push(slots[j][levels[j]["id"]]);
                    }
                }
                this.chartData = {
                    labels: labels,
                    datasets: datasets
                }
            });
        });
    }

}

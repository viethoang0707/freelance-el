import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ComponentFactoryResolver } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { ExcelService } from '../../../shared/services/excel.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Survey } from '../../../shared/models/elearning/survey.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { Answer } from '../../../shared/models/elearning/answer.model';
import { Token } from '../../../shared/models/cloud/token.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { Question } from '../../../shared/models/elearning/question.model';
import { QuestionSheet } from '../../../shared/models/elearning/question-sheet.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Http, Response } from '@angular/http';
import { QuestionContainerDirective } from '../../../cms/question/question-container.directive';
import { IQuestion } from '../../../cms/question/question.interface';
import { QuestionRegister } from '../../../cms/question/question.decorator';
import 'rxjs/add/observable/timer';
import * as _ from 'underscore';
import { QuestionOption } from '../../../shared/models/elearning/option.model';
import { SurveyResultStatsReportComponent } from '../../../analysis/report/survey/survey-result-stats-report/survey-result-stats-report.component';

@Component({
    moduleId: module.id,
    selector: 'survey-stats-dialog',
    templateUrl: 'survey-stats.dialog.component.html',
    styleUrls: ['survey-stats.dialog.component.css'],
})
export class SurveyStatsDialog extends BaseComponent {
    
    
    private display: boolean;
    
    @ViewChild(SurveyResultStatsReportComponent) statsReport: SurveyResultStatsReportComponent;

    constructor() {
        super();
        this.display = false;
    }

    show(survey: Survey) {
        this.display = true;
        this.statsReport.render(survey);
    }

    hide() {
        this.display = false;
        this.statsReport.clear();
    }

   export() {
       this.statsReport.export();
   }
}




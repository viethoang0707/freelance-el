import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ComponentFactoryResolver } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { ExcelService } from '../../../shared/services/excel.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Exam } from '../../../shared/models/elearning/exam.model';
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
import { ExamResultStatsReportComponent } from '../../../analysis/report/exam/exam-result-stats-report/exam-result-stats-report.component';

@Component({
    moduleId: module.id,
    selector: 'exam-stats-dialog',
    templateUrl: 'exam-stats.dialog.component.html',
    styleUrls: ['exam-stats.dialog.component.css'],
})
export class ExamStatsDialog extends BaseComponent {
    
    
    private display: boolean;
    
    @ViewChild(ExamResultStatsReportComponent) statsReport: ExamResultStatsReportComponent;

    constructor() {
        super();
        this.display = false;
    }

    show(exam: Exam) {
        this.display = true;
        this.statsReport.render(exam);
    }

    hide() {
        this.display = false;
        this.statsReport.clear();
    }

   export() {
       this.statsReport.export();
   }
}




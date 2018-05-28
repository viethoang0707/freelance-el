import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ComponentFactoryResolver } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { Answer } from '../../../shared/models/elearning/answer.model';
import { CloudAccount } from '../../../shared/models/cloud/cloud-account.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { Question } from '../../../shared/models/elearning/question.model';
import { QuestionSheet } from '../../../shared/models/elearning/question-sheet.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Http, Response } from '@angular/http';
import { QuestionContainerDirective } from '../../../assessment/question/question-template/question-container.directive';
import { IQuestion } from '../../../assessment/question/question-template/question.interface';
import { QuestionRegister } from '../../../assessment/question/question-template/question.decorator';
import 'rxjs/add/observable/timer';
import * as _ from 'underscore';
import { ExamResultReportComponent } from '../../../analysis/report/exam/exam-result-report/exam-result-report.component';

@Component({
    moduleId: module.id,
    selector: 'exam-report-dialog',
    templateUrl: 'exam-report.dialog.component.html',
    styleUrls: ['exam-report.dialog.component.css'],
})
export class ExamReportDialog extends BaseComponent {
    
    private display: boolean;
    
    @ViewChild(ExamResultReportComponent) examReport: ExamResultReportComponent;

    constructor() {
        super();
        this.display = false;
    }

    show(exam: Exam) {
        this.display = true;
        this.examReport.render(exam);
    }

    hide() {
        this.display = false;
        this.examReport.clear();
    }

   export() {
       this.examReport.export();
   }
}




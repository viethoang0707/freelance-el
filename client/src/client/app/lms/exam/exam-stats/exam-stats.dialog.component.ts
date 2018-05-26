import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ComponentFactoryResolver } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from '../../../shared/services/api.service';
import { ExcelService } from '../../../shared/services/excel.service';
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
import { QuestionOption } from '../../../shared/models/elearning/option.model';
import { StatsUtils } from '../../../shared/helpers/statistics.utils';

@Component({
    moduleId: module.id,
    selector: 'exam-stats-dialog',
    templateUrl: 'exam-stats.dialog.component.html',
    styleUrls: ['exam-stats.dialog.component.css'],
})
export class ExamStatsDialog extends BaseComponent {
    
    private display: boolean;
    private records:any;
    private statsUtils: StatsUtils;
    private optionPercentage: any;
   
    constructor(private excelService: ExcelService) {
        super();
        this.display = false;
        this.records = [];
        this.optionPercentage = {};
        this.statsUtils =  new StatsUtils();
    }

    show(exam: Exam) {
        this.display = true;
        this.records = [];
        this.optionPercentage = {};
        this.startTransaction();
        QuestionSheet.byExam(this, exam.id).subscribe((sheet:QuestionSheet)=> {
            ExamQuestion.listBySheet(this, sheet.id).subscribe(examQuestions=> {
                this.records =  examQuestions;
                var supscriptions = _.map(examQuestions, question=> {
                    return QuestionOption.listByQuestion(this, question.id).do(options=> {
                        question["options"] =  options;
                    });
                });
                if (supscriptions.length)
                    Observable.forkJoin(supscriptions).subscribe(()=> {
                        Answer.listByExam(this, exam.id).subscribe(answers=> {
                            this.optionPercentage = this.statsUtils.examAnswerStatistics(answers);
                        })
                    });
                this.closeTransaction();
            });
        });
    }


    hide() {
        this.display = false;
    }

    export(){
      var header = [
            this.translateService.instant('Question'),
            this.translateService.instant('Option'),
            this.translateService.instant('Percentage'),
            
        ]
        this.excelService.exportAsExcelFile(header.concat(this.records),'answer_statis');
    }

    getCheckPercentage(option) {
        if (this.optionPercentage[option.id])
            return this.optionPercentage[option.id]
        else
            return 0;
    }


}




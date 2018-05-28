import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from '../../../../shared/services/api.service';
import { StatsUtils } from '../../../../shared/helpers/statistics.utils';
import { Exam } from '../../../../shared/models/elearning/exam.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { User } from '../../../../shared/models/elearning/user.model';
import { ExamLog } from '../../../../shared/models/elearning/log.model';
import { ExamGrade } from '../../../../shared/models/elearning/exam-grade.model';
import { Submission } from '../../../../shared/models/elearning/submission.model';
import { Answer } from '../../../../shared/models/elearning/answer.model';
import { ExamMember } from '../../../../shared/models/elearning/exam-member.model';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, REPORT_CATEGORY, GROUP_CATEGORY, COURSE_MODE, COURSE_MEMBER_ENROLL_STATUS, EXPORT_DATE_FORMAT } from '../../../../shared/models/constants'
import { Report } from '../../report.decorator';
import { SelectGroupDialog } from '../../../../shared/components/select-group-dialog/select-group-dialog.component';
import { SelectUsersDialog } from '../../../../shared/components/select-user-dialog/select-user-dialog.component';
import { TimeConvertPipe} from '../../../../shared/pipes/time.pipe';
import { ExcelService } from '../../../../shared/services/excel.service';
import { Group } from '../../../../shared/models/elearning/group.model';
import { ExamQuestion } from '../../../../shared/models/elearning/exam-question.model';
import { CloudAccount } from '../../../../shared/models/cloud/cloud-account.model';
import { Question } from '../../../../shared/models/elearning/question.model';
import { QuestionSheet } from '../../../../shared/models/elearning/question-sheet.model';
import { Http, Response } from '@angular/http';
import { QuestionContainerDirective } from '../../../../assessment/question/question-template/question-container.directive';
import 'rxjs/add/observable/timer';
import * as _ from 'underscore';
import { QuestionOption } from '../../../../shared/models/elearning/option.model';


@Component({
    moduleId: module.id,
    selector: 'exam-result-stats-report',
    templateUrl: 'exam-result-stats-report.component.html',
})
export class ExamResultStatsReportComponent extends BaseComponent{

    private records: any;
    private statsUtils: StatsUtils;
    private optionPercentage: any;

    constructor( private excelService: ExcelService, private datePipe: DatePipe) {
        super();
        this.optionPercentage = {};
        this.statsUtils =  new StatsUtils();
    }


    export() {
    	var header = [
            this.translateService.instant('Question'),
            this.translateService.instant('Option'),
            this.translateService.instant('Percentage'),
            
        ]
        this.excelService.exportAsExcelFile(header.concat(this.records),'answer_statis');
    }

    clear() {
        this.records = [];
        this.optionPercentage = {};
    }

    render(exam:Exam) {
        this.clear();
        this.startTransaction();
        QuestionSheet.byExam(this, exam.id).subscribe((sheet:QuestionSheet)=> {
            ExamQuestion.listBySheet(this, sheet.id).subscribe(examQuestions=> {
                this.records =  examQuestions;
                var supscriptions = _.map(examQuestions, question=> {
                    return QuestionOption.listByQuestion(this, question.question_id).do(options=> {
                        question["options"] =  options;
                        console.log(question["options"] );
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


    getCheckPercentage(option) {
        if (this.optionPercentage[option.id])
            return this.optionPercentage[option.id]
        else
            return 0;
    }

}

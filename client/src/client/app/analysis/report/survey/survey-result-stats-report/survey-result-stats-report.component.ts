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
import { SurveyAnswer } from '../../../../shared/models/elearning/survey-answer.model';
import { SurveyMember } from '../../../../shared/models/elearning/survey-member.model';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, REPORT_CATEGORY, GROUP_CATEGORY, COURSE_MODE, COURSE_MEMBER_ENROLL_STATUS, EXPORT_DATE_FORMAT } from '../../../../shared/models/constants'
import { Report } from '../../report.decorator';
import { SelectGroupDialog } from '../../../../shared/components/select-group-dialog/select-group-dialog.component';
import { SelectUsersDialog } from '../../../../shared/components/select-user-dialog/select-user-dialog.component';
import { TimeConvertPipe} from '../../../../shared/pipes/time.pipe';
import { ExcelService } from '../../../../shared/services/excel.service';
import { Survey } from '../../../../shared/models/elearning/survey.model';
import { SurveyQuestion } from '../../../../shared/models/elearning/survey-question.model';
import { CloudAccount } from '../../../../shared/models/cloud/cloud-account.model';
import { Question } from '../../../../shared/models/elearning/question.model';
import { SurveySheet } from '../../../../shared/models/elearning/survey-sheet.model';
import { Http, Response } from '@angular/http';
import { QuestionContainerDirective } from '../../../../assessment/question/question-template/question-container.directive';
import 'rxjs/add/observable/timer';
import * as _ from 'underscore';
import { QuestionOption } from '../../../../shared/models/elearning/option.model';


@Component({
    moduleId: module.id,
    selector: 'survey-result-stats-report',
    templateUrl: 'survey-result-stats-report.component.html',
})
export class SurveyResultStatsReportComponent extends BaseComponent{

    private records: any;
    private statsUtils: StatsUtils;
    private optionPercentage: any;
    private ratingPercentage: any;
    private openAnswers: any;

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

    render(survey:Survey) {
        this.clear();
        this.startTransaction();
        SurveySheet.bySurvey(this, survey.id).subscribe((sheet:SurveySheet)=> {
            SurveyQuestion.listBySheet(this, sheet.id).subscribe(surveyQuestions=> {
                this.records =  surveyQuestions;
                var supscriptions = _.map(surveyQuestions, question=> {
                    return QuestionOption.listByQuestion(this, question.question_id).do(options=> {
                        question["options"] =  options;
                        console.log(question["options"] );
                    });
                });
                if (supscriptions.length)
                    Observable.forkJoin(supscriptions).subscribe(()=> {
                        SurveyAnswer.listBySurvey(this, survey.id).subscribe(answers=> {
                            var statistics = this.statsUtils.examAnswerStatistics(answers);
                            this.optionPercentage = statistics['multichoice'];
                            this.ratingPercentage = statistics['rating'];
                            this.openAnswers = statistics['open'];
                        });
                    });
                this.closeTransaction();
            });
        });
    	
    }

    getOpenAnswers(question) {
        if (this.openAnswers[question.id])
            return this.openAnswers[question.id]
        else
            return [];
    }

    getRatePercentage(question) {
        if (this.ratingPercentage[question.id])
            return this.ratingPercentage[question.id]
        else
            return 0;
    }


    getCheckPercentage(option) {
        if (this.optionPercentage[option.id])
            return this.optionPercentage[option.id]
        else
            return 0;
    }

}

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
import { QuestionOption } from '../../../../shared/models/elearning/option.model';
import { BaseModel } from '../../../../shared/models/base.model';


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
        BaseModel
        .bulk_search(this,
            QuestionSheet.__api__byExam(exam.id),
            Answer.__api__listByExam(exam.id))
        .subscribe(jsonArr=> {
            var sheets = QuestionSheet.toArray(jsonArr[0]);
            var answers = Answer.toArray(jsonArr[1]);
            this.optionPercentage = this.statsUtils.examAnswerStatistics(answers);
            ExamQuestion.listBySheet(this, sheets[0].id).subscribe(examQuestions=> {
                var apiList = _.map(examQuestions, (examQuestion:ExamQuestion)=> {
                    return QuestionOption.__api__listByQuestion(examQuestion.question_id)
                });
                BaseModel.bulk_search(this, ...apiList)
                    .map(jsonArr=> _.flatten(jsonArr))
                    .subscribe(jsonArr => {
                        var options = QuestionOption.toArray(jsonArr);
                        _.each(examQuestions, (examQuestion: ExamQuestion)=> {
                            examQuestion["options"] = _.filter(options, (opt:QuestionOption)=> {
                                return opt.question_id == examQuestion.question_id;
                            });
                        });
                        this.records =  examQuestions;
                    });
            });
        })
    }


    getCheckPercentage(option) {
        if (this.optionPercentage[option.id])
            return this.optionPercentage[option.id]
        else
            return 0;
    }

}

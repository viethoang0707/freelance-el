import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs/Rx';
import { StatsUtils } from '../../../../shared/helpers/statistics.utils';
import { Exam } from '../../../../shared/models/elearning/exam.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { User } from '../../../../shared/models/elearning/user.model';
import { ExamLog } from '../../../../shared/models/elearning/log.model';
import { ExamGrade } from '../../../../shared/models/elearning/exam-grade.model';
import { Submission } from '../../../../shared/models/elearning/submission.model';
import { SurveyAnswer } from '../../../../shared/models/elearning/survey-answer.model';
import { SurveyMember } from '../../../../shared/models/elearning/survey-member.model';
import { EXPORT_DATETIME_FORMAT, REPORT_CATEGORY, GROUP_CATEGORY, COURSE_MODE, COURSE_MEMBER_ENROLL_STATUS, EXPORT_DATE_FORMAT } from '../../../../shared/models/constants'
import { Report } from '../../report.decorator';
import { SelectGroupDialog } from '../../../../shared/components/select-group-dialog/select-group-dialog.component';
import { SelectUsersDialog } from '../../../../shared/components/select-user-dialog/select-user-dialog.component';
import { TimeConvertPipe } from '../../../../shared/pipes/time.pipe';
import { ExcelService } from '../../../../shared/services/excel.service';
import { Survey } from '../../../../shared/models/elearning/survey.model';
import { SurveyQuestion } from '../../../../shared/models/elearning/survey-question.model';
import { Token } from '../../../../shared/models/cloud/token.model';
import { Question } from '../../../../shared/models/elearning/question.model';
import { SurveySheet } from '../../../../shared/models/elearning/survey-sheet.model';
import { Http, Response } from '@angular/http';
import { QuestionContainerDirective } from '../../../../cms/question/question-container.directive';
import 'rxjs/add/observable/timer';
import * as _ from 'underscore';
import { QuestionOption } from '../../../../shared/models/elearning/option.model';
import { BaseModel } from '../../../../shared/models/base.model';


@Component({
    moduleId: module.id,
    selector: 'survey-result-stats-report',
    templateUrl: 'survey-result-stats-report.component.html',
})
export class SurveyResultStatsReportComponent extends BaseComponent {

    private records: any;
    private statsUtils: StatsUtils;
    private optionPercentage: any;
    private ratingPercentage: any;
    private openAnswers: any;

    constructor(private excelService: ExcelService, private datePipe: DatePipe) {
        super();
        this.optionPercentage = {};
        this.statsUtils = new StatsUtils();
    }


    export() {
        var output = _.map(this.records, (record) => {
            var row = {};
            row["question"] = record["title"] +"/" + record["content"];
            if (record["type"]=='mc' || record["type"]=='sc') {
                row["options"] = ""
                _.each(record["options"], option => {
                    row["options"] += this.getRatePercentage(option)+";"
                });
            }
            if (record["type"]=='rate') {
                row["rate"] = this.getRatePercentage(record)
                row["options"] += '/' + row["max_rating"];
            }
            return row;
        });
        this.excelService.exportAsExcelFile(output, 'exam_member_result_report');
   }

    clear() {
        this.records = [];
        this.optionPercentage = {};
    }

    render(survey: Survey) {
        this.clear();
        SurveySheet.get(this, survey.sheet_id).subscribe(sheet=> {
            survey.listAnswers(this).subscribe(answers=> {
                var statistics = this.statsUtils.surveyAnswerStatistics(answers);
                this.optionPercentage = statistics['multichoice'];
                this.ratingPercentage = statistics['rating'];
                sheet.listQuestions(this).subscribe(surveyQuestions => {
                    var apiList = _.map(surveyQuestions, (surveyQuestion: SurveyQuestion) => {
                        return Question.__api__listOptions(surveyQuestion.question_id)
                    });
                    BaseModel.bulk_search(this, ...apiList)
                        .map(jsonArr => _.flatten(jsonArr))
                        .subscribe(jsonArr => {
                            var options = QuestionOption.toArray(jsonArr);
                            _.each(surveyQuestions, (surveyQuestion: SurveyQuestion) => {
                                surveyQuestion["options"] = _.filter(options, (opt: QuestionOption) => {
                                    return opt.question_id == surveyQuestion.question_id;
                                });
                            });
                            this.records = surveyQuestions;
                        });
                });
            })
        })
    }

    getRatePercentage(question) {
        if (this.ratingPercentage[question.id])
            return this.ratingPercentage[question.id]
        else
            return 0;
    }

    getOptionPercentage(option) {
        if (this.optionPercentage[option.id])
            return this.optionPercentage[option.id]
        else
            return 0;
    }

}

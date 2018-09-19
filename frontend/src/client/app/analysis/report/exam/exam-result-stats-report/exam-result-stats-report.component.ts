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
import { Answer } from '../../../../shared/models/elearning/answer.model';
import { ExamMember } from '../../../../shared/models/elearning/exam-member.model';
import * as _ from 'underscore';
import { Report } from '../../report.decorator';
import { SelectGroupDialog } from '../../../../shared/components/select-group-dialog/select-group-dialog.component';
import { SelectUsersDialog } from '../../../../shared/components/select-user-dialog/select-user-dialog.component';
import { TimeConvertPipe } from '../../../../shared/pipes/time.pipe';
import { ExcelService } from '../../../../shared/services/excel.service';
import { Group } from '../../../../shared/models/elearning/group.model';
import { ExamQuestion } from '../../../../shared/models/elearning/exam-question.model';
import { Token } from '../../../../shared/models/cloud/token.model';
import { Question } from '../../../../shared/models/elearning/question.model';
import { QuestionSheet } from '../../../../shared/models/elearning/question-sheet.model';
import { Http, Response } from '@angular/http';
import { QuestionContainerDirective } from '../../../../cms/question/question-container.directive';
import 'rxjs/add/observable/timer';
import { QuestionOption } from '../../../../shared/models/elearning/option.model';
import { BaseModel } from '../../../../shared/models/base.model';


@Component({
    moduleId: module.id,
    selector: 'exam-result-stats-report',
    templateUrl: 'exam-result-stats-report.component.html',
})
export class ExamResultStatsReportComponent extends BaseComponent {

    private records: any;
    private statsUtils: StatsUtils;
    private optionPercentage: any;

    constructor(private excelService: ExcelService, private datePipe: DatePipe) {
        super();
        this.optionPercentage = {};
        this.statsUtils = new StatsUtils();
    }

    export() {
        var output = _.map(this.records, (record) => {
            var row = {};
            row["question"] = this.strip(record["content"]);
            row["options"] = "";
            row["option_percentages"] = "";
            _.each(record["options"], (option: any) => {
                row["option_percentages"] += Math.round(this.getCheckPercentage(option) * 100) / 100 + "| ";
                row["options"] += option.content + "| ";
            });
            return row;
        });
        this.excelService.exportAsExcelFile(output, 'exam_member_result_report');
    }

    clear() {
        this.records = [];
        this.optionPercentage = {};
    }

    render(exam: Exam) {
        this.clear();
        QuestionSheet.get(this, exam.sheet_id).subscribe(sheet => {
            exam.listAnswers(this).subscribe(ansList => {
                    var statistics = this.statsUtils.examAnswerStatistics(ansList);
                    this.optionPercentage = statistics['multichoice'];
                    sheet.listQuestions(this).subscribe(examQuestions => {
                        var apiList = _.map(examQuestions, (examQuestion: ExamQuestion) => {
                            return Question.__api__listOptions(examQuestion.id)
                        });
                        BaseModel.bulk_search(this, ...apiList)
                            .map(jsonArr => _.flatten(jsonArr))
                            .subscribe(jsonArr => {
                                var options = QuestionOption.toArray(jsonArr);
                                _.each(examQuestions, (examQuestion: ExamQuestion) => {
                                    examQuestion["options"] = _.filter(options, (opt: QuestionOption) => {
                                        return opt.question_id == examQuestion.question_id;
                                    });
                                });
                                this.records = examQuestions;
                            });
                    });
                });
        });
    }


    getCheckPercentage(option) {
        if (this.optionPercentage[option.id])
            return this.optionPercentage[option.id]
        else
            return 0;
    }


    strip(html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }
}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from '../../../../shared/services/api.service';
import { ReportUtils } from '../../../../shared/helpers/report.utils';
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
import { TimeConvertPipe } from '../../../../shared/pipes/time.pipe';
import { ExcelService } from '../../../../shared/services/excel.service';
import { BaseModel } from '../../../../shared/models/base.model';


@Component({
    moduleId: module.id,
    selector: 'exam-result-report',
    templateUrl: 'exam-result-report.component.html',
})
export class ExamResultReportComponent extends BaseComponent implements OnInit {

    private records: any;
    private exams: Exam[];
    private selectedExam: any;
    private reportUtils: ReportUtils;

    constructor(private excelService: ExcelService, private datePipe: DatePipe) {
        super();
        this.reportUtils = new ReportUtils();
    }

    ngOnInit() {
        Exam.all(this).subscribe(exams => {
            this.exams = exams;
        });
    }

    clear() {
        this.records = [];
    }

    export() {
        var output = [];
        this.records.forEach(record => {
            var course = { 'Name': record['user_name'], 'Login': record['user_login'], 'User group': record['user_group'], 'Attempt date': record['date_attempt'], 'Score': record['score'], 'Result': record['result'] };
            output.push(course);
        });
        this.excelService.exportAsExcelFile(output, 'course_by_member_report');
    }

    render(exam: Exam) {
        this.clear();
        BaseModel
        .bulk_search(this,
            ExamMember.__api__listCandidateByExam(exam.id),
            ExamGrade.__api__all(),
            Submission.__api__listByExam(exam.id),
            ExamLog.__api__listByExam(exam.id))
        .subscribe(jsonArr=> {
            var members = ExamMember.toArray(jsonArr[0]);
            var grades = ExamGrade.toArray(jsonArr[1]);
            var submits = Submission.toArray(jsonArr[2]);
            var logs = ExamLog.toArray(jsonArr[3]);
            this.records = this.generateReport(exam, grades, submits, logs, members);
        })
    }


    generateReport(exam: Exam, grades: ExamGrade[], submits: Submission[], logs: ExamLog[], members: ExamMember[]) {
        var rows = [];
        _.each(members, (member: ExamMember) => {
            var userLogs = _.filter(logs, (log: ExamLog) => {
                return log.user_id == member.user_id;
            });
            var submit = _.find(submits, (obj: Submission) => {
                return obj.member_id == member.id;
            });
            rows.push(this.generateReportRow(exam, grades, member, submit, userLogs));
        });
        return rows;
    }

    generateReportRow(exam: Exam, grades: ExamGrade[], member: ExamMember, submit: Submission, logs: ExamLog[]): any {
        var record = {};
        record["user_login"] = member.login;
        record["user_name"] = member.name;
        record["user_group"] = member.group_id__DESC__;
        if (submit) {
            record["score"] = submit.score;
            var grade = _.find(grades, (obj) => {
                return obj.min_score <= record["score"] && obj.max_score >= record["score"]
            });
            if (grade)
                record["grade"] = grade.name;
        }
        if (logs && logs.length) {
            var result = this.reportUtils.analyzeExamMemberActivity(logs);
            if (result[0])
                record["date_attempt"] = this.datePipe.transform(result[0], EXPORT_DATE_FORMAT);
        }

        return record;
    }

}

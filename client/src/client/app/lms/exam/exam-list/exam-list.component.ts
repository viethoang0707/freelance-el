import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { SelectItem } from 'primeng/api';
import { ExamContentDialog } from '../../../cms/exam/content-dialog/exam-content.dialog.component';
import { ExamStudyDialog } from '../exam-study/exam-study.dialog.component';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import { Route, Router } from '@angular/router';
import { BaseModel } from '../../../shared/models/base.model';
import { User } from '../../../shared/models/elearning/user.model';
import { ExamRecord } from '../../../shared/models/elearning/exam-record.model';


@Component({
    moduleId: module.id,
    selector: 'lms-exam-list',
    templateUrl: 'exam-list.component.html',
    styleUrls: ['exam-list.component.css'],
})
export class ExamListComponent extends BaseComponent implements OnInit {

    EXAM_STATUS = EXAM_STATUS;

    private exams: Exam[];
    private reportUtils: ReportUtils;
    private examRecords: ExamRecord[];

    @ViewChild(ExamContentDialog) examContentDialog: ExamContentDialog;
    @ViewChild(ExamStudyDialog) examStudyDialog: ExamStudyDialog;

    constructor(private router: Router) {
        super();
        this.exams = [];
        this.reportUtils = new ReportUtils();
    }

    ngOnInit() {
        this.lmsProfileService.init(this).subscribe(() => {
            this.displayExams(this.lmsProfileService.MyExams);
            this.examRecords =  this.lmsProfileService.MyExamRecords;
        });
    }

    displayExams(exams: Exam[]) {
        _.each(exams, (exam:Exam)=> {
            exam['candidate'] =  this.lmsProfileService.getExamMemberByRole('candidate', exam.id);
            exam['editor'] =  this.lmsProfileService.getExamMemberByRole('editor', exam.id);
            exam['supervisor'] =  this.lmsProfileService.getExamMemberByRole('supervisor', exam.id);
            if (exam['supervisor'])
                exam['editor'] =  exam['supervisor'];
        });
        exams.sort((exam1: Exam, exam2: Exam): any => {
            return this.lmsProfileService.getLastExamTimestamp(exam2) - this.lmsService.getLastExamTimestamp(exam1);
        });
        this.exams = exams;
    }

    manageExam(exam: Exam, member: ExamMember) {
        if (!exam.IsAvailable) {
            this.warn(this.translateService.instant('Exam is not available.'));
            return;
        }
        this.router.navigate(['/lms/exams/manage', exam.id, member.id]);
    }

    editContent(exam: Exam) {
        this.examContentDialog.show(exam);
    }

    startExam(exam: Exam, member: ExamMember) {
        this.confirmationService.confirm({
            message: this.translateService.instant('Are you sure to start?'),
            accept: () => {
                this.examStudyDialog.show(exam, member);
            }
        });
    }

    getExamRecord(exam:Exam) {
        return _.find(this.examRecords, (record:ExamRecord)=> {
            return record.exam_id == exam.id;
        }) || new ExamRecord();
    }

}
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
    private submits: Submission[];

    @ViewChild(ExamContentDialog) examContentDialog: ExamContentDialog;
    @ViewChild(ExamStudyDialog) examStudyDialog: ExamStudyDialog;

    constructor(private router: Router) {
        super();
        this.exams = [];
        this.reportUtils = new ReportUtils();
    }

    ngOnInit() {
        Observable.concat(
            this.lmsService.init(this),
            this.lmsService.initExamAnalytic(this))
        .last()
        .subscribe(() => {
            Submission.listByUser(this, this.ContextUser.id).subscribe((submits) => {
                this.submits = submits;
                var exams = this.lmsService.MyExam;
                this.displayExams(exams);
            });
        });
    }

    displayExams(exams: Exam[]) {
        exams = _.filter(exams, (exam: Exam) => {
            return exam.review_state == 'approved';
        });
        exams.sort((exam1: Exam, exam2: Exam): any => {
            return this.lmsService.getLastExamTimestamp(exam2) - this.lmsService.getLastExamTimestamp(exam1);
        });
        _.each(exams, (exam: Exam) => {
            if (exam["candidate"]) {
                exam["submit"] = _.find(this.submits, (submit: Submission) => {
                    return submit.member_id == exam["candidate"].id && submit.exam_id == exam.id;
                });
                if (exam["submit"])
                    exam["score"] = exam["submit"].score;
                else
                    exam["score"] = '';
            }
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

}
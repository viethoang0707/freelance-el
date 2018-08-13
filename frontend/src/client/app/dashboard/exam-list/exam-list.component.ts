import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { BaseComponent } from '../../shared/components/base/base.component';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../shared/models/constants'
import { Exam } from '../../shared/models/elearning/exam.model';
import { ExamMember } from '../../shared/models/elearning/exam-member.model';
import { ExamQuestion } from '../../shared/models/elearning/exam-question.model';
import { Group } from '../../shared/models/elearning/group.model';
import { Submission } from '../../shared/models/elearning/submission.model';
import { SelectItem } from 'primeng/api';
import { ExamContentDialog } from '../../cms/exam/content-dialog/exam-content.dialog.component';
import { ExamStudyDialog } from '../../lms/exam/exam-study/exam-study.dialog.component';
import { ReportUtils } from '../../shared/helpers/report.utils';
import { Route, Router } from '@angular/router';
import { BaseModel } from '../../shared/models/base.model';
import { User } from '../../shared/models/elearning/user.model';
import { ExamRecord } from '../../shared/models/elearning/exam-record.model';
import { AnswerPrintDialog } from '../../lms/exam/answer-print/answer-print.dialog.component';

const EXAM_FIELDS = ['status', 'review_state', 'name', 'write_date', 'create_date', 'supervisor_id', 'summary', 'instruction', 'start', 'end', 'duration', 'question_count', 'sheet_status'];

@Component({
    moduleId: module.id,
    selector: 'lms-exam-list',
    templateUrl: 'exam-list.component.html',
    styleUrls: ['exam-list.component.css'],
})
export class ExamListComponent extends BaseComponent implements OnInit {

    EXAM_STATUS = EXAM_STATUS;

    private exams: Exam[];
    private examMembers: ExamMember[];
    private reportUtils: ReportUtils;

    @ViewChild(ExamContentDialog) examContentDialog: ExamContentDialog;
    @ViewChild(ExamStudyDialog) examStudyDialog: ExamStudyDialog;
    @ViewChild(AnswerPrintDialog) answerSheetDialog: AnswerPrintDialog;

    constructor(private router: Router) {
        super();
        this.exams = [];
        this.reportUtils = new ReportUtils();
    }

    ngOnInit() {
        this.lmsProfileService.init(this).subscribe(() => {
            this.examMembers = this.lmsProfileService.MyExamMembers;
            var examIds = _.pluck(this.examMembers, 'exam_id');
            examIds = _.uniq(examIds, id => {
                return id;
            });
            Exam.array(this, examIds, EXAM_FIELDS).subscribe(exams => {
                this.displayExams(exams);
            });
        });
    }

    displayExams(exams: Exam[]) {
        _.each(exams, (exam: Exam) => {
            exam['candidate'] = this.lmsProfileService.getExamMemberByRole('candidate', exam.id);
            exam['editor'] = this.lmsProfileService.getExamMemberByRole('editor', exam.id);
            exam['supervisor'] = this.lmsProfileService.getExamMemberByRole('supervisor', exam.id);
        });
        exams = _.sortBy(exams, (exam: Exam) => {
            return -this.lmsProfileService.getLastExamTimestamp(exam);
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
        exam.populate(this).subscribe(() => {
            this.examContentDialog.show(exam);
        });
    }

    publishExam(exam: Exam) {
        exam.sheet_status = 'published';
        exam.save(this).subscribe();
    }

    unpublishExam(exam: Exam) {
        exam.sheet_status = 'unpublished';
        exam.save(this).subscribe();
    }

    startExam(exam: Exam, member: ExamMember) {
        this.confirmationService.confirm({
            message: this.translateService.instant('Are you sure to start?'),
            accept: () => {
                exam.populate(this).subscribe(() => {
                    this.examStudyDialog.show(exam, member);
                });
            }
        });
    }

    viewAnswer(exam: Exam, member: ExamMember) {
        exam.populate(this).subscribe(() => {
            member.populate(this).subscribe(()=> {
                member.populateSubmission(this).subscribe(()=> {
                    this.answerSheetDialog.show(exam, member, member.submit);
                });
            });
        });

    }

}
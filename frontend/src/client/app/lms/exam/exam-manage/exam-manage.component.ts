import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Course } from '../../../shared/models/elearning/course.model';
import { Location } from '@angular/common';
import { User } from '../../../shared/models/elearning/user.model';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { SelectItem, MenuItem } from 'primeng/api';
import {
    GROUP_CATEGORY, CONTENT_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE,
    COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS
} from '../../../shared/models/constants'
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { Subscription } from 'rxjs/Subscription';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { Answer } from '../../../shared/models/elearning/answer.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { QuestionMarkingDialog } from '../question-marking/question-marking.dialog.component';
import { ExamGrade } from '../../../shared/models/elearning/exam-grade.model';
import { Http, Response } from '@angular/http';
import { AnswerPrintDialog } from '../answer-print/answer-print.dialog.component';
import { QuestionSheetPrintDialog } from '../question-sheet-print/question-sheet-print.dialog.component';
import { QuestionSheet } from '../../../shared/models/elearning/question-sheet.model';
import { ExamReportDialog } from '../exam-report/exam-report.dialog.component';
import { ExamStatsDialog } from '../exam-stats/exam-stats.dialog.component';
import { BaseModel } from '../../../shared/models/base.model';
import { ExamRecord } from '../../../shared/models/elearning/exam-record.model';
import { DataTable } from 'primeng/primeng';
import { OfflineExamSubmissionDialog } from '../exam-submit/offline-exam-submission.dialog.component';

@Component({
    moduleId: module.id,
    selector: 'exam-manage',
    templateUrl: 'exam-manage.component.html',
    styleUrls: ['exam-manage.component.css'],
})
export class ExamManageComponent extends BaseComponent implements OnInit {

    private exam: Exam;
    private members: ExamMember[];
    private selectedMember: ExamMember;
    private questions: ExamQuestion[];

    @ViewChild(QuestionMarkingDialog) questionMarkDialog: QuestionMarkingDialog;
    @ViewChild(AnswerPrintDialog) answerSheetDialog: AnswerPrintDialog;
    @ViewChild(QuestionSheetPrintDialog) questionSheetDialog: QuestionSheetPrintDialog;
    @ViewChild(ExamReportDialog) reportDialog: ExamReportDialog;
    @ViewChild(ExamStatsDialog) statsDialog: ExamStatsDialog;
    @ViewChild(OfflineExamSubmissionDialog) submitDialog: OfflineExamSubmissionDialog;

    constructor(private router: Router, private route: ActivatedRoute, private location: Location) {
        super();
        this.exam = new Exam();
    }

    ngOnInit() {
        this.exam = this.route.snapshot.data['exam'];
        this.loadScores();
    }

    showQuestionSheet() {
        QuestionSheet.get(this, this.exam.sheet_id).subscribe(sheet => {
            if (!sheet || !sheet.finalized)
                this.error(this.translateService.instant('The exam questions has not been set up'));
            else
                this.questionSheetDialog.show(this.exam, sheet);
        });
    }

    redoExam(member: ExamMember) {
        member.redoExam(this).subscribe(() => {
            this.success(this.translateService.instant('Candidate is allowed to redo the exam'));
        });
    }

    submitOffline(member: ExamMember) {
        Submission.get(this, this.selectedMember.submission_id).subscribe(submit => {
            this.submitDialog.show(this.exam, submit);
            this.submitDialog.onConfirm.subscribe(() => {
                this.loadScores();
            });
        });

    }

    viewAnswerSheet() {
        if (this.selectedMember.enroll_status != 'completed')
            this.info(this.translateService.instant('Student has not completed the exam'));
        else {
            Submission.get(this, this.selectedMember.submission_id).subscribe(submit => {
                this.answerSheetDialog.show(this.exam, this.selectedMember, submit);
            });
        }
    }

    loadScores() {
        this.exam.listCandidates(this).subscribe(members => {
            this.members = members;
        })
    }

    showExamReport() {
        this.reportDialog.show(this.exam);
    }

    showExamStats() {
        this.statsDialog.show(this.exam);
    }

    back() {
        this.location.back();
    }
}

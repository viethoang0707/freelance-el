import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Course } from '../../../shared/models/elearning/course.model';
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


@Component({
    moduleId: module.id,
    selector: 'exam-manage',
    templateUrl: 'exam-manage.component.html',
    styleUrls: ['exam-manage.component.css'],
})
export class ExamManageComponent extends BaseComponent implements OnInit {

    private exam: Exam;
    private member: ExamMember;
    private members: ExamMember[];
    private selectedMember: any;
    private questions: ExamQuestion[];
    private records: ExamRecord[];

    @ViewChild(QuestionMarkingDialog) questionMarkDialog: QuestionMarkingDialog;
    @ViewChild(AnswerPrintDialog) answerSheetDialog: AnswerPrintDialog;
    @ViewChild(QuestionSheetPrintDialog) questionSheetDialog: QuestionSheetPrintDialog;
    @ViewChild(ExamReportDialog) reportDialog: ExamReportDialog;
    @ViewChild(ExamStatsDialog) statsDialog: ExamStatsDialog;

    constructor(private router: Router, private route: ActivatedRoute) {
        super();
        this.exam = new Exam();
        this.member = new ExamMember();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            var memberId = +params['memberId'];
            var examId = +params['examId'];
            this.lmsProfileService.init(this).subscribe(()=> {
                this.exam = this.lmsProfileService.examById(examId);
                this.member = this.lmsProfileService.examMemberById(memberId);
                this.loadScores();
            });
        });
    }

    showQuestionSheet() {
        QuestionSheet.get(this, this.exam.sheet_id).subscribe((sheet: QuestionSheet) => {
            if (!sheet || !sheet.finalized)
                this.error(this.translateService.instant('The exam questions has not been set up'));
            else
                this.questionSheetDialog.show(this.exam, sheet);
        });
    }

    redoExam() {
        this.selectedMember.enroll_status != 'registered';
        this.selectedMember.save(this).susbscribe(()=> {
            this.error('Action applied');
        });
    }


    viewAnswerSheet() {
        if (this.selectedMember.enroll_status != 'completed')
            this.info(this.translateService.instant('Student has not completed the exam'));
        else
            this.answerSheetDialog.show(this.exam, this.selectedMember);
    }

    loadScores() {
        BaseModel.bulk_search(this,
            ExamMember.__api__listCandidateByExam(this.exam.id),
            ExamRecord.__api__listByExam(this.exam.id))
            .subscribe(jsonArr => {
                this.members = ExamMember.toArray(jsonArr[0]);
                this. records = ExamRecord.toArray(jsonArr[1]);
            });
    }

    showExamReport() {
        this.reportDialog.show(this.exam);
    }

    showExamStats() {
        this.statsDialog.show(this.exam);
    }

    getExamRecord(member: ExamMember) {
        return _.find(this.records, (record: ExamRecord)=> {
            return record.member_id == member.id
        }) || new ExamRecord();
    }
}

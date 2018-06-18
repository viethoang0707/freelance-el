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
    private scoreRecords: any;
    private selectedRecord: any;
    private questions: ExamQuestion[];

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
            Exam.get(this, examId).subscribe(exam => {
                ExamMember.get(this, memberId).subscribe(member => {
                    this.member = member;
					this.exam = exam;
					this.loadScores();
                });
            });
        });
	}

    showQuestionSheet() {
        QuestionSheet.byExam(this, this.exam.id).subscribe((sheet: QuestionSheet) => {
            if (!sheet || !sheet.finalized)
                this.error(this.translateService.instant('The exam questions has not been set up'));
            else
                this.questionSheetDialog.show(this.exam, sheet);
        });
    }

	mark() {
        if (this.selectedRecord)
            if (this.selectedRecord["submit"] == null) {
                this.warn(this.translateService.instant('The member has not attempted the exam'));
                return;
            }
        this.questionMarkDialog.show(this.selectedRecord, this.selectedRecord["submit"]);
    }

    viewAnswerSheet() {
        if (this.selectedRecord) {
            if (this.selectedRecord.enroll_status != 'completed')
                this.info(this.translateService.instant('Student has not completed the exam'));
            else
                this.answerSheetDialog.show(this.exam, this.selectedRecord);
        }
    }

    loadScores() {
        BaseModel.bulk_search(this,
            ExamGrade.__api__all(),
            ExamMember.__api__listCandidateByExam(this.exam.id),
            Submission.__api__listByExam(this.exam.id))
            .subscribe(jsonArr => {
                var grades = ExamGrade.toArray(jsonArr[0]);
                var members = ExamMember.toArray(jsonArr[1]);
                var submits = Submission.toArray(jsonArr[2]);
                this.scoreRecords = members;
                _.each(members, (member: ExamMember) => {
                    var submit = _.find(submits, (submit: Submission) => {
                        return submit.member_id == member.id && submit.exam_id == this.exam.id;
                    });
                    member["submit"] = submit;
                    if (submit) {
                        if (submit.score != null) {
                            member["score"] = submit.score;
                            member["grade"] = ExamGrade.gradeScore(grades, submit.score);
                        }
                        else
                            member["score"] = '';
                    }
                });
            });

    }

    showExamReport() {
        this.reportDialog.show(this.exam);
    }

    showExamStats() {
        this.statsDialog.show(this.exam);
    }

    closeExam() {
        if (this.selectedRecord) {
            this.selectedRecord.status = 'closed';
            this.selectedRecord.save(this).subscribe(() => {
                this.success(this.translateService.instant('Exam close'));
            });
        }
    }
}

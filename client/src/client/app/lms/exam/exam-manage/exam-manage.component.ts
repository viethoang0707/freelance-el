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
    GROUP_CATEGORY, COURSE_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE,
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

@Component({
	moduleId: module.id,
	selector: 'exam-manage',
	templateUrl: 'exam-manage.component.html',
})
export class ExamManageComponent extends BaseComponent implements OnInit {

	exam: Exam;
	member: ExamMember;
    scoreRecords: any;
    selectedRecord: any;
    questions: ExamQuestion[];
    @ViewChild(QuestionMarkingDialog) questionMarkDialog: QuestionMarkingDialog;
    @ViewChild(AnswerPrintDialog) answerSheetDialog: AnswerPrintDialog;

	constructor(private router: Router, private route: ActivatedRoute) {
		super();
		this.exam = new Exam();
		this.member = new ExamMember();
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
            var memberId = +params['memberId'];
            var examId = +params['examId'];
            this.startTransaction();
            Exam.get(this, examId).subscribe(exam => {
                ExamMember.get(this, memberId).subscribe(member => {
                    this.member = member;
					this.exam = exam;
					this.loadScores();
                    this.closeTransaction();
                });
            });
        });
	}

	mark() {
        console.log(this.exam);
        if (this.selectedRecord)
            this.exam.containsOpenEndQuestion(this).subscribe(success => {
                if (!success) {
                    this.warn('The exam does not contains any open question');
                    return;
                }
                if (this.selectedRecord["submit"] ==  null) {
                    this.warn('The member has not attempted the exam');
                    return;
                }
                this.questionMarkDialog.show(this.selectedRecord.member, this.selectedRecord["submit"] , this.selectedRecord.answers, this.questions);
            });
    }

    viewAnswerSheet() {
        if (this.selectedRecord) {
            if (this.selectedRecord.enroll_status != 'completed')
                this.info('Student has not completed the exam');
            else
                this.answerSheetDialog.show(this.exam, this.selectedRecord);
        }
    }

    loadScores() {
        this.startTransaction();
        ExamGrade.listByExam(this, this.exam.id).subscribe(grades => {
            ExamMember.listCandidateByExam(this, this.exam.id).subscribe(members => {
                Submission.listByExam(this, this.exam.id).subscribe(submits => {
                    this.scoreRecords = members;
                    _.each(members, (member: ExamMember) => {
                        var submit = _.find(submits, (submit: Submission) => {
                            return submit.member_id == member.id && submit.exam_id == this.exam.id;
                        });
                        member["submit"] = submit;
                        if (submit) {
                            if (submit.score != null)
                                member["score"] = submit.score;
                            else
                                member["score"] = '';
                        }

                    });
                    this.closeTransaction();
                });

            });
        });
    }

}


import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Exam } from '../../../shared/models/exam.model';
import { Answer } from '../../../shared/models/answer.model';
import { ExamGrade } from '../../../shared/models/exam-grade.model';
import { Submission } from '../../../shared/models/submission.model';
import { ExamMember } from '../../../shared/models/exam-member.model';
import { Http, Response } from '@angular/http';
import { AnswerSheetDialog } from '../answer-sheet/answer-sheet.dialog.component';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'etraining-exam-score-dialog',
    templateUrl: 'exam-score.dialog.component.html',
})
export class ExamScoreDialog extends BaseComponent {

    display: boolean;
    exam: Exam;
    records: any;
    selectedRecord: any;

    @ViewChild(AnswerSheetDialog) answerSheetDialog:AnswerSheetDialog;

    constructor() {
        super();
    }

    show(exam: Exam) {
        this.display = true;
        this.exam = exam;
        this.loadAnswers();
    }

    hide() {
        this.display = false;
    }

    viewAnswerSheet() {
        if (this.selectedRecord)
            this.answerSheetDialog.show(this.exam, this.selectedRecord.member);
    }

    loadAnswers() {
        ExamGrade.listByExam(this, this.exam.id).subscribe(grades => {
            ExamMember.listCandidateByExam(this, this.exam.id).subscribe(members => {
                this.records = [];
                _.each(members, (member: ExamMember)=> {
                    Submission.byMember(this, member.id).subscribe((submit:Submission) => {
                        Answer.listBySubmit(this, submit.id).subscribe(answers => {
                            var record = {
                                name: member.name,
                                etraining_group_id__DESC__: member.etraining_group_id__DESC__,
                                member: member,
                                answers: answers
                            }
                            record["score"] = _.reduce(answers, (sum, ans)=> {
                                return sum + ans.score;
                            }, 0);
                            var grade = _.find(grades, (obj)=> {
                                return obj.min_score <= record["score"] && obj.max_score >= record["score"]
                            });
                            if (grade)
                                record["grade"] = grade.name;
                            this.records.push(record);
                        });
                    })
                });
            });
        });
    }

}


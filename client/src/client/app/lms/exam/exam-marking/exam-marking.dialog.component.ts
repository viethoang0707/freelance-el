import { Component, OnInit, Input,ViewChild} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { Answer } from '../../../shared/models/elearning/answer.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import * as _ from 'underscore';
import { QuestionMarkingDialog } from '../question-marking/question-marking.dialog.component';

@Component({
    moduleId: module.id,
    selector: 'exam-marking-dialog',
    templateUrl: 'exam-marking.dialog.component.html',
})
export class ExamMarkingDialog extends BaseComponent {

    display: boolean;
    exam: Exam;
    records: any;
    selectedRecord: any;
    questions: ExamQuestion[];
    @ViewChild(QuestionMarkingDialog) questionMarkDialog:QuestionMarkingDialog;
    
    constructor() {
        super();
    }

    show(exam:Exam) {
        this.display = true;
        this.exam = exam;
        this.loadScores();
    }

    hide() {
        this.display = false;
    }

    mark() {
        if (this.selectedRecord) {
            this.questionMarkDialog.show(this.selectedRecord.member,this.selectedRecord.answers);
        }
    }

    loadScores() {
        ExamQuestion.listOpenQuestionByExam(this, this.exam.id).subscribe(questions => {
            this.questions = questions;
            var questionIds = _.pluck(questions,'question_id');
            ExamMember.listCandidateByExam(this, this.exam.id).subscribe(members => {
                this.records = [];
                _.each(members, (member:ExamMember)=> {
                    Submission.byMember(this,member.id).subscribe((submit:Submission) => {
                        Answer.listBySubmit(this, submit.id).subscribe(answers => {
                            answers = _.filter(answers, (obj:Answer)=> {
                                return _.contains(questionIds,obj.question_id);
                            });
                            var record = {
                                name: member.name,
                                group_id__DESC__: member.group_id__DESC__,
                                member: member,
                                answers: answers
                            }
                            _.each(answers, (obj)=> {
                                record[obj.question_id] = obj.score;
                            });
                            this.records.push(record);
                        });
                    })
                });
            });
        });
    }
}


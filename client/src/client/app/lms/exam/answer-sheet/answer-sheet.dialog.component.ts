import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Exam } from '../../../shared/models/exam.model';
import { ExamQuestion } from '../../../shared/models/exam-question.model';
import { Answer } from '../../../shared/models/answer.model';
import { Submission } from '../../../shared/models/submission.model';
import { Question } from '../../../shared/models/question.model';
import { ExamMember } from '../../../shared/models/exam-member.model';
import { Http, Response } from '@angular/http';
import { QuestionContainerDirective } from '../../../assessment/question/question-template/question-container.directive';
import { IQuestion } from '../../../assessment/question/question-template/question.interface';
import { QuestionRegister } from '../../../assessment/question/question-template/question.decorator';
import 'rxjs/add/observable/timer'; import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'etraining-answer-sheet-dialog',
    templateUrl: 'answer-sheet.dialog.component.html',
})
export class AnswerSheetDialog extends BaseComponent {

    display: boolean;
    qIndex: number;
    examQuestions: ExamQuestion[];
    answers: Answer[];
    member: ExamMember;
    exam: Exam;
    currentAnswer: Answer;
    currentQuestion: ExamQuestion;
    submission: Submission;

    @ViewChild(QuestionContainerDirective) questionHost: QuestionContainerDirective;
    componentRef: any;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
        super();
        this.display = false;
        this.examQuestions = [];
        this.answers = [];
        this.exam = new Exam();
        this.currentQuestion = new ExamQuestion();
        this.currentAnswer =  new Answer();
    }

    show(exam: Exam, member: ExamMember) {
        this.display = true;
        this.exam = exam;
        this.member = member;
        this.qIndex = 0;
        Submission.byMember(this, this.member.id).subscribe((submit:Submission) => {
            if (submit) {
                this.submission = submit;
                this.startReview();
            }
        });
    }

    hide() {
        this.display = false;
    }

    fetchAnswers(): Observable<any> {
        if (this.submission.id)
            return Answer.listBySubmit(this, this.submission.id);
        else
            return Observable.of([]);
    }

    startReview() {
        ExamQuestion.listByExam(this, this.exam.id).subscribe(examQuestions => {
            this.examQuestions = _.shuffle(examQuestions);
            this.fetchAnswers().subscribe(answers => {
                this.answers = answers;
                this.displayQuestion(0);
            });
        });
    }

    prepareQuestion(question: ExamQuestion): Observable<any> {
        return Question.get(this, question.question_id);
    }

    prepareAnswer(question: ExamQuestion): Observable<any> {
        var answer = _.find(this.answers, (ans: Answer)=> {
            return ans.question_id == question.question_id;
        });
        if (!answer)
            answer = new Answer();
        return Observable.of(answer);
    }

    displayQuestion(index: number) {
        this.qIndex = index;
        this.currentQuestion = this.examQuestions[index];
        this.prepareQuestion(this.currentQuestion).subscribe(question => {
            this.prepareAnswer(this.currentQuestion).subscribe(answer => {
                this.currentAnswer = answer;
                var detailComponent = QuestionRegister.Instance.lookup(question.type);
                let viewContainerRef = this.questionHost.viewContainerRef;
                if (detailComponent) {
                    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
                    viewContainerRef.clear();
                    this.componentRef = viewContainerRef.createComponent(componentFactory);
                    (<IQuestion>this.componentRef.instance).mode = 'review';
                    (<IQuestion>this.componentRef.instance).render(question, this.currentAnswer);
                }
            });
        });
    }

    next() {
        if (this.qIndex < this.examQuestions.length - 1) {
            this.displayQuestion(this.qIndex + 1);
        }
    }

    prev() {
        if (this.qIndex > 0) {
            this.displayQuestion(this.qIndex - 1);
        }
    }

}


import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { Answer } from '../../../shared/models/elearning/answer.model';
import { CloudAccount } from '../../../shared/models/cloud/cloud-account.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { Question } from '../../../shared/models/elearning/question.model';
import { QuestionSheet } from '../../../shared/models/elearning/question-sheet.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Http, Response } from '@angular/http';
import { QuestionContainerDirective } from '../../../assessment/question/question-template/question-container.directive';
import { IQuestion } from '../../../assessment/question/question-template/question.interface';
import { QuestionRegister } from '../../../assessment/question/question-template/question.decorator';
import 'rxjs/add/observable/timer';
 import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'submission-dialog',
    templateUrl: 'submission.dialog.component.html',
    styleUrls: ['submission.dialog.component.css'],
})
export class SubmissionDialog extends BaseComponent {
    display: boolean;
    qIndex: number;
    examQuestions: ExamQuestion[];
    answers: Answer[];
    member: ExamMember;
    exam: Exam;
    submission: Submission;
    account: CloudAccount;

     @ViewChildren(QuestionContainerDirective) questionsComponents: QueryList<QuestionContainerDirective>;
     @ViewChild('printSection') printSection;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
        super();
        this.display = false;
        this.examQuestions = [];
        this.answers = [];
        this.exam = new Exam();
        this.member = new ExamMember();
        this.account = this.authService.CloudAcc;
    }

    show(exam: Exam, member: ExamMember) {
        this.display = true;
        this.examQuestions = [];
        this.answers = [];
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

   
}




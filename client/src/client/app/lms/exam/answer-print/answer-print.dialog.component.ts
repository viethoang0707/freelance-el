import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { Answer } from '../../../shared/models/elearning/answer.model';
import { ExamSetting } from '../../../shared/models/elearning/exam-setting.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { Question } from '../../../shared/models/elearning/question.model';
import { QuestionSheet } from '../../../shared/models/elearning/question-sheet.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Http, Response } from '@angular/http';
import { QuestionContainerDirective } from '../../../assessment/question/question-template/question-container.directive';
import { IQuestion } from '../../../assessment/question/question-template/question.interface';
import { QuestionRegister } from '../../../assessment/question/question-template/question.decorator';
import 'rxjs/add/observable/timer';
import {PRINT_DIALOG_STYLE} from  '../../../shared/models/constants';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'answer-print-dialog',
    templateUrl: 'answer-print.dialog.component.html',
    styleUrls: ['answer-print.dialog.component.css'],
})
export class AnswerPrintDialog extends BaseComponent {
    
    private display: boolean;
    private examQuestions: ExamQuestion[];
    private answers: Answer[];
    private member: ExamMember;
    private exam: Exam;
    private submission: Submission;
    private setting: ExamSetting;

    @ViewChildren(QuestionContainerDirective) questionsComponents: QueryList<QuestionContainerDirective>;
    @ViewChild('printSection') printSection;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
        super();
        this.display = false;
        this.examQuestions = [];
        this.answers = [];
        this.exam = new Exam();
        this.member = new ExamMember();
        this.submission = new Submission();
        this.setting =  new ExamSetting();
    }

    show(exam: Exam, member: ExamMember) {
        this.display = true;
        this.examQuestions = [];
        this.answers = [];
        this.exam = exam;
        this.member = member;
        
        Submission.byMemberAndExam(this, this.member.id, this.exam.id).subscribe((submit: Submission) => {
            if (submit) {
                this.submission = submit;
                ExamSetting.appSetting(this).subscribe(setting=> {
                    if (setting)
                        this.setting =  setting;
                    this.startReview();
                });
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
        
        QuestionSheet.byExam(this, this.exam.id).subscribe(sheet => {
            ExamQuestion.listBySheet(this, sheet.id).subscribe(examQuestions => {
                this.examQuestions = examQuestions;
                this.fetchAnswers().subscribe(answers => {
                    this.answers = answers;
                    setTimeout(() => {
                        var componentHostArr = this.questionsComponents.toArray();
                        for (var i = 0; i < examQuestions.length; i++) {
                            var examQuestion = examQuestions[i];
                            var componentHost = componentHostArr[i];
                            this.displayQuestion(examQuestion, componentHost);
                        }
                    }, 0);
                });
                
            });
        });
    }

    prepareAnswer(question: ExamQuestion): Observable<any> {
        var answer = _.find(this.answers, (ans: Answer) => {
            return ans.question_id == question.question_id;
        });
        if (!answer)
            answer = new Answer();
        return Observable.of(answer);
    }

    displayQuestion(examQuestion: ExamQuestion, componentHost) {
        Question.get(this, examQuestion.question_id).subscribe((question) => {
            this.prepareAnswer(examQuestion).subscribe(answer => {
                var detailComponent = QuestionRegister.Instance.lookup(question.type);
                let viewContainerRef = componentHost.viewContainerRef;
                if (detailComponent) {
                    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
                    viewContainerRef.clear();
                    var componentRef = viewContainerRef.createComponent(componentFactory);
                    (<IQuestion>componentRef.instance).mode = 'review';
                    (<IQuestion>componentRef.instance).render(question, answer);
                }
            });

        });
    }

    print() {
        let printContents, popupWin;
        printContents = this.printSection.nativeElement.innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
          <html>
            <head>
                <title>Exam paper</title>
                #{PRINT_DIALOG_STYLE}
            </head>
            <body onload="window.print();window.close()">${printContents}</body>
          </html>`
        );
        popupWin.document.close();
    }
}




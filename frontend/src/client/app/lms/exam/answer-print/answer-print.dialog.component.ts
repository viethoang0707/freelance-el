import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
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
import { PRINT_DIALOG_STYLE } from '../../../shared/models/constants';
import * as _ from 'underscore';
import { BaseModel } from '../../../shared/models/base.model';


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
    private sheet: QuestionSheet;
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
        this.sheet = new QuestionSheet();
        this.member = new ExamMember();
        this.submission = new Submission();
        this.setting = new ExamSetting();
    }

    show(exam: Exam, member: ExamMember) {
        this.display = true;
        this.examQuestions = [];
        this.answers = [];
        this.exam = exam;
        this.member = member;
        this.lmsProfileService.init(this).subscribe(()=> {
            BaseModel
            .bulk_list(this,
                ExamMember.__api__populateSubmission(this.member.submission_id),
                Exam.__api__populateSetting(this.exam.setting_id),
                Exam.__api__populateQuestionSheet(this.exam.sheet_id))
            .subscribe(jsonArr => {
                var submits = Submission.toArray(jsonArr[0]);
                if (submits.length) {
                    this.submission = submits[0];
                    var settings = ExamSetting.toArray(jsonArr[1]);
                    if (settings.length)
                        this.setting = settings[0];
                    var sheets = QuestionSheet.toArray(jsonArr[2]);
                    if (sheets.length) {
                        this.sheet = sheets[0];
                        this.startReview();
                    }
                }
            });
        });
    }

    hide() {
        this.display = false;
    }

    startReview() {
        BaseModel
            .bulk_list(this,
                QuestionSheet.__api__listQuestions(this.sheet.question_ids),
                Submission.__api__listAnswers(this.submission.answer_ids))
            .subscribe(jsonArr => {
                this.examQuestions = ExamQuestion.toArray(jsonArr[0]);
                this.answers = Answer.toArray(jsonArr[1]);
                ExamQuestion.populateQuestions(this, this.examQuestions).subscribe(() => {
                    var questions = _.map(this.examQuestions, (examQuestion:ExamQuestion)=> {
                        return examQuestion.question;
                    });
                    Question.listOptionsForArray(this,questions).subscribe(() => {
                        var componentHostArr = this.questionsComponents.toArray();
                        for (var i = 0; i < this.examQuestions.length; i++) {
                            var examQuestion = this.examQuestions[i];
                            var componentHost = componentHostArr[i];
                            this.displayQuestion(examQuestion, componentHost);
                        }
                    },);
                });
            });
    }

    prepareAnswer(question: ExamQuestion){
        var answer = _.find(this.answers, (ans: Answer) => {
            return ans.question_id == question.question_id;
        });
        if (!answer)
            answer = new Answer();
        return answer;
    }

    displayQuestion(examQuestion: ExamQuestion, componentHost) {
        var answer = this.prepareAnswer(examQuestion);
        var detailComponent = QuestionRegister.Instance.lookup(examQuestion.question.type);
        let viewContainerRef = componentHost.viewContainerRef;
        if (detailComponent) {
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
            viewContainerRef.clear();
            var componentRef = viewContainerRef.createComponent(componentFactory);
            (<IQuestion>componentRef.instance).mode = 'review';
            (<IQuestion>componentRef.instance).render(examQuestion.question, answer);
        }
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




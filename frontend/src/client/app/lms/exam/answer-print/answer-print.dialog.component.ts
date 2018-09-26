import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
import { QuestionContainerDirective } from '../../../cms/question/question-container.directive';
import { IQuestion } from '../../../cms/question/question.interface';
import { QuestionRegister } from '../../../cms/question/question.decorator';
import 'rxjs/add/observable/timer';
import { PRINT_DIALOG_STYLE } from '../../../shared/models/constants';
import * as _ from 'underscore';
import { BaseModel } from '../../../shared/models/base.model';
import { ExamLog } from '../../../shared/models/elearning/log.model';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import { TimeConvertPipe } from '../../../shared/pipes/time.pipe';

@Component({
    moduleId: module.id,
    selector: 'answer-print-dialog',
    templateUrl: 'answer-print.dialog.component.html',
    styleUrls: ['answer-print.dialog.component.css'],
})
export class AnswerPrintDialog extends BaseComponent {

    @ViewChildren(QuestionContainerDirective) questionsComponents: QueryList<QuestionContainerDirective>;
    @ViewChild('printSection') printSection;

    private display: boolean;
    private examQuestions: ExamQuestion[];
    private answers: Answer[];
    private member: ExamMember;
    private exam: Exam;
    private sheet: QuestionSheet;
    private submission: Submission;
    private setting: ExamSetting;
    private reportUtils: ReportUtils;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private timePipe: TimeConvertPipe) {
        super();
        this.display = false;
        this.examQuestions = [];
        this.answers = [];
        this.exam = new Exam();
        this.sheet = new QuestionSheet();
        this.member = new ExamMember();
        this.submission = new Submission();
        this.setting = new ExamSetting();
        this.reportUtils = new ReportUtils();
    }

    show(exam: Exam, member: ExamMember, submit: Submission) {
        this.display = true;
        this.examQuestions = [];
        this.answers = [];
        this.exam = exam;
        this.submission = submit;
        this.member = member;
        ExamSetting.get(this, this.exam.setting_id).subscribe(setting => {
            this.setting = setting;
            this.startReview();
        });
    }

    hide() {
        this.display = false;
    }

    startReview() {
        BaseModel
            .bulk_search(this,
                QuestionSheet.__api__listQuestions(this.exam.sheet_id),
                Submission.__api__listAnswers(this.submission.id))
            .subscribe(jsonArr => {
                this.examQuestions = ExamQuestion.toArray(jsonArr[0]);
                this.answers = Answer.toArray(jsonArr[1]);
                ExamQuestion.populateQuestions(this, this.examQuestions).subscribe(() => {
                    var questions = _.map(this.examQuestions, (examQuestion: ExamQuestion) => {
                        return examQuestion.question;
                    });
                    Question.listOptionsForArray(this, questions).subscribe(() => {
                        var componentHostArr = this.questionsComponents.toArray();
                        for (var i = 0; i < this.examQuestions.length; i++) {
                            var examQuestion = this.examQuestions[i];
                            var componentHost = componentHostArr[i];
                            this.displayQuestion(examQuestion, componentHost);
                        }
                    });
                });
            });
    }

    prepareAnswer(question: ExamQuestion) {
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
                <style>
                  //........Customized style.......
                    .header{
                    }
                    .name-c{
                        float: left;
                        width: 55%;
                    }

                    .name-e{
                        height: 40px;
                    }

                    .name-c, .name-e{
                        text-align: center; 
                        text-transform: uppercase; 
                        font-weight: bold; 
                        margin-bottom: 10px;
                    }
                    
                    .label{
                        float: left;
                        font-weight: bold;
                        
                    }

                    .title{
                        text-transform: uppercase;
                        float: left;
                        margin-right:40px;
                    }

                    .ins p{
                        text-indent: 25px;
                    }

                    .f-print{
                        border:none;
                        padding: 0;
                        margin-top: -10px;
                    }
                    
                    .f-print ul{
                        padding-left: 10px;
                    }

                    .l-question{
                        padding-bottom: 0;
                        margin-bottom: 0;
                    }

                    .l-question li{
                        list-style-type: decimal;
                    }

                    .bold{
                        font-weight: bold;
                    }

                    .student{
                        float: left;
                        margin-right:100px;
                    }

                    .radio{
                        float: left;
                        padding-right: 5px;
                    }
                </style>
            </head>
            <body onload="window.print();window.close()">${printContents}</body>
          </html>`
        );
        popupWin.document.close();
    }
}




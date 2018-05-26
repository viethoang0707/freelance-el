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
    selector: 'question-sheet-print-dialog',
    templateUrl: 'question-sheet-print.dialog.component.html',
    styleUrls: ['question-sheet-print.dialog.component.css'],
})
export class QuestionSheetPrintDialog extends BaseComponent {
    
    private display: boolean;
    private examQuestions: ExamQuestion[];
    private exam: Exam;
    private sheet: QuestionSheet;

    @ViewChildren(QuestionContainerDirective) questionsComponents: QueryList<QuestionContainerDirective>;
    @ViewChild('printSection') printSection;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
        super();
        this.display = false;
        this.examQuestions = [];
        this.exam = new Exam();
    }

    show(exam: Exam, sheet: QuestionSheet) {
        this.display = true;
        this.examQuestions = [];
        this.exam = exam;
        this.sheet = sheet;
        this.startReview();
    }

    hide() {
        this.display = false;
    }



    startReview() {
        this.startTransaction();
        ExamQuestion.listBySheet(this, this.sheet.id).subscribe(examQuestions => {
            this.examQuestions = examQuestions;
            setTimeout(()=> {
                var componentHostArr = this.questionsComponents.toArray();
                for (var i = 0; i < examQuestions.length; i++) {
                    var examQuestion = examQuestions[i];
                    var componentHost = componentHostArr[i];
                    this.displayQuestion(examQuestion, componentHost);
                }
            this.closeTransaction();
            },0)
            
        });
    }

    displayQuestion(examQuestion: ExamQuestion, componentHost) {
        Question.get(this, examQuestion.question_id).subscribe((question) => {
            var detailComponent = QuestionRegister.Instance.lookup(question.type);
            let viewContainerRef = componentHost.viewContainerRef;
            if (detailComponent) {
                let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
                viewContainerRef.clear();
                var componentRef = viewContainerRef.createComponent(componentFactory);
                (<IQuestion>componentRef.instance).mode = 'preview';
                (<IQuestion>componentRef.instance).render(question);
            }
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




import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { Answer } from '../../../shared/models/elearning/answer.model';
import { Token } from '../../../shared/models/cloud/token.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { Question } from '../../../shared/models/elearning/question.model';
import { QuestionSheet } from '../../../shared/models/elearning/question-sheet.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Http, Response } from '@angular/http';
import { QuestionContainerDirective } from '../../../cms/question/question-container.directive';
import { IQuestion } from '../../../cms/question/question.interface';
import { QuestionRegister } from '../../../cms/question/question.decorator';
import 'rxjs/add/observable/timer';
import * as _ from 'underscore';
import {PRINT_DIALOG_STYLE} from  '../../../shared/models/constants';

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
        this.sheet.listQuestions(this).subscribe(examQuestions => {
            this.examQuestions = examQuestions;
            ExamQuestion.populateQuestions(this, this.examQuestions).subscribe(()=> {
                var questions = _.map(this.examQuestions, (examQuestion:ExamQuestion)=> {
                    return examQuestion.question
                });
                Question.listOptionsForArray(this,questions).subscribe(()=> {
                    var componentHostArr = this.questionsComponents.toArray();
                    for (var i = 0; i < examQuestions.length; i++) {
                        var examQuestion = examQuestions[i];
                        var componentHost = componentHostArr[i];
                        this.displayQuestion(examQuestion, componentHost);
                    }
                    })
            })
            
        });
    }

    displayQuestion(examQuestion: ExamQuestion, componentHost) {
        var detailComponent = QuestionRegister.Instance.lookup(examQuestion.question.type);
        let viewContainerRef = componentHost.viewContainerRef;
        if (detailComponent) {
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
            viewContainerRef.clear();
            var componentRef = viewContainerRef.createComponent(componentFactory);
            (<IQuestion>componentRef.instance).mode = 'preview';
            (<IQuestion>componentRef.instance).render(examQuestion.question);
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
                ${PRINT_DIALOG_STYLE}
            </head>
            <body onload="window.print();window.close()">${printContents}</body>
          </html>`
        );
        popupWin.document.close();
    }
}




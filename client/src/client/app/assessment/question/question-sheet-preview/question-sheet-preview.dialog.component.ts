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
import { PRINT_DIALOG_STYLE } from '../../../shared/models/constants';

@Component({
    moduleId: module.id,
    selector: 'question-sheet-preview-dialog',
    templateUrl: 'question-sheet-preview.dialog.component.html',
    styleUrls: ['question-sheet-preview.dialog.component.css'],
})
export class QuestionSheetPreviewDialog extends BaseComponent {

    private display: boolean;
    private examQuestions: ExamQuestion[];
    private questions: Question[];
    private sheet: QuestionSheet;

    @ViewChildren(QuestionContainerDirective) questionsComponents: QueryList<QuestionContainerDirective>;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
        super();
        this.display = false;
        this.examQuestions = [];
        this.questions = [];
    }

    show(sheet: QuestionSheet, examQuestions: ExamQuestion[]) {
        this.display = true;
        this.examQuestions = examQuestions;
        this.sheet = sheet;
        this.startReview();
    }

    hide() {
        this.display = false;
    }

    startReview() {
        ExamQuestion.listBySheet(this, this.sheet.id).subscribe(examQuestions => {
            this.examQuestions = examQuestions;
            ExamQuestion.populateQuestionForArray(this, examQuestions).subscribe(() => {
                var questions = _.map(examQuestions, (examQuestion:ExamQuestion)=> {
                    return examQuestion.question;
                });
                Question.populateOptionForArray(this, questions).subscribe(()=> {
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
        var question = examQuestion.question;
        var detailComponent = QuestionRegister.Instance.lookup(question.type);
        let viewContainerRef = componentHost.viewContainerRef;
        if (detailComponent) {
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
            viewContainerRef.clear();
            var componentRef = viewContainerRef.createComponent(componentFactory);
            (<IQuestion>componentRef.instance).mode = 'preview';
            (<IQuestion>componentRef.instance).render(question);
        }
    }
}




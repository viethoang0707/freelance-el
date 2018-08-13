import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { SurveyQuestion } from '../../../shared/models/elearning/survey-question.model';
import { Answer } from '../../../shared/models/elearning/answer.model';
import { Token } from '../../../shared/models/cloud/token.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { Question } from '../../../shared/models/elearning/question.model';
import { SurveySheet } from '../../../shared/models/elearning/survey-sheet.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Http, Response } from '@angular/http';
import { QuestionContainerDirective } from '../../../cms/question/question-container.directive';
import { IQuestion } from '../../../cms/question/question.interface';
import { QuestionRegister } from '../../../cms/question/question.decorator';
import 'rxjs/add/observable/timer';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'survey-sheet-preview-dialog',
    templateUrl: 'survey-sheet-preview.dialog.component.html',
    styleUrls: ['survey-sheet-preview.dialog.component.css'],
})
export class SurveySheetPreviewDialog extends BaseComponent {
    
    private display: boolean;
    private surveyQuestions: SurveyQuestion[];
    private sheet: SurveySheet;

    @ViewChildren(QuestionContainerDirective) questionsComponents: QueryList<QuestionContainerDirective>;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
        super();
        this.display = false;
        this.surveyQuestions = [];
    }

    show(sheet: SurveySheet) {
        this.display = true;
        this.surveyQuestions = [];
        this.sheet = sheet;
        this.startPreReview();
    }

    hide() {
        this.display = false;
    }

    startPreReview() {
        this.sheet.listQuestions(this).subscribe(surveyQuestions => {
            SurveyQuestion.populateQuestions(this, surveyQuestions).subscribe(()=> {
                this.surveyQuestions = surveyQuestions;
                var questions = _.map(surveyQuestions, (surveyQuestion:SurveyQuestion)=> {
                    return surveyQuestion.question;
                });
                Question.listOptionsForArray(this,questions).subscribe(()=> {
                    var componentHostArr = this.questionsComponents.toArray();
                    for (var i = 0; i < surveyQuestions.length; i++) {
                        var surveyQuestion = surveyQuestions[i];
                        var componentHost = componentHostArr[i];
                        this.displayQuestion(surveyQuestion, componentHost);
                    }
                });
            })
            
            
        });
    }

    displayQuestion(surveyQuestion: SurveyQuestion, componentHost) {
            var detailComponent = QuestionRegister.Instance.lookup(surveyQuestion.question.type);
            let viewContainerRef = componentHost.viewContainerRef;
            if (detailComponent) {
                let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
                viewContainerRef.clear();
                var componentRef = viewContainerRef.createComponent(componentFactory);
                (<IQuestion>componentRef.instance).mode = 'preview';
                (<IQuestion>componentRef.instance).render(surveyQuestion.question);
            }
    }
}




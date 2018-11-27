import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
import { PRINT_DIALOG_STYLE } from '../../../shared/models/constants';
import { QuestionSheetSection } from '../../../shared/models/elearning/question_sheet-section.model';

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
    private sheetSections: QuestionSheetSection[];

    @ViewChildren(QuestionContainerDirective) questionsComponents: QueryList<QuestionContainerDirective>;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
        super();
        this.display = false;
        this.examQuestions = [];
        this.questions = [];
        this.sheetSections = [];
    }

    show(sheet: QuestionSheet) {
        this.display = true;
        this.sheet = sheet;
        if (this.sheet.layout == 'multiple')
            this.sheet.listSections(this).subscribe(sections => {
                this.sheetSections = sections;
                this.startPreview();
            });
        else
            this.startPreview();
    }

    questionBySection(section: QuestionSheetSection) {
        return _.filter(this.examQuestions, (question: ExamQuestion) => {
            return question.section_id == section.id;
        });
    }

    hide() {
        this.display = false;
    }

    startPreview() {
        this.sheet.listQuestions(this).subscribe(examQuestions => {
            this.examQuestions = examQuestions;
            ExamQuestion.populateQuestions(this, examQuestions).subscribe(() => {
                var questions = _.map(examQuestions, (examQuestion: ExamQuestion) => {
                    return examQuestion.question;
                });
                Question.listOptionsForArray(this, questions).subscribe(() => {
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




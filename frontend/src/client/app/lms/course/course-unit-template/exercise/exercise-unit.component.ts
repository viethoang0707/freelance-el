import { Component, OnInit, Input, ViewChild, QueryList, ViewChildren, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Answer } from '../../../../shared/models/elearning/answer.model';
import { Question } from '../../../../shared/models/elearning/question.model';
import { QuestionOption } from '../../../../shared/models/elearning/option.model';
import { ExamQuestion } from '../../../../shared/models/elearning/exam-question.model';
import { CourseUnit } from '../../../../shared/models/elearning/course-unit.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { CourseUnitPlayerTemplate } from '../unit.decorator';
import { TreeUtils } from '../../../../shared/helpers/tree.utils';
import { SelectQuestionsDialog } from '../../../../shared/components/select-question-dialog/select-question-dialog.component';
import { QuestionContainerDirective } from '../../../../cms/question/question-container.directive';
import { IQuestion } from '../../../../cms/question/question.interface';
import { QuestionRegister } from '../../../../cms/question/question.decorator';
import { ICourseUnitPlay } from '../unit.interface';
import { CourseMember } from '../../../../shared/models/elearning/course-member.model';

@Component({
	moduleId: module.id,
	selector: 'exercise-course-unit',
	templateUrl: 'exercise-unit.component.html',
})
@CourseUnitPlayerTemplate({
	type: 'exercise'
})
export class ExerciseCourseUnitPlayerComponent extends BaseComponent implements ICourseUnitPlay, OnInit {

	private questions: Question[];
	private unit: CourseUnit;
	private examQuestions: ExamQuestion[];
	private stage: string;
	private qIndex: number;
	private currentQuestion: ExamQuestion;
	private currentAnswer: Answer;
	private componentRef: any;
	protected onViewCompletedReceiver: Subject<any> = new Subject();
	onViewCompleted: Observable<any> = this.onViewCompletedReceiver.asObservable();
	viewCompleted: boolean;

	@Input() mode;
	@ViewChild(QuestionContainerDirective) studyQuestionComponent: QuestionContainerDirective;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) {
		super();
		this.examQuestions = [];
		this.currentAnswer = new Answer();
		this.currentQuestion = new ExamQuestion();
		this.viewCompleted = false;
	}

	ngOnInit() {
	}

	play(unit: CourseUnit, member: CourseMember) {
		this.unit = unit;
		this.unit.populateExercise(this).subscribe(() => {
			this.unit.exercise.populateSheet(this).subscribe(() => {
				this.unit.exercise.sheet.listQuestions(this).subscribe(examQuestions => {
					this.examQuestions = examQuestions;
					ExamQuestion.populateQuestions(this, this.examQuestions).subscribe(() => {
						var questions = _.map(examQuestions, (examQuestion: ExamQuestion) => {
							return examQuestion.question;
						});
						Question.listOptionsForArray(this, questions).subscribe(() => {
							if (this.examQuestions.length) {
								this.qIndex = 0;
								this.displayQuestion(this.qIndex);
							}

						});
					});
				});
			});
		});
	}

	answerQuestion() {
		this.stage = 'answer';
		if (this.componentRef)
			(<IQuestion>this.componentRef.instance).mode = 'review';
	}


	displayQuestion(index: number) {
		this.qIndex = index;
		this.stage = 'question';
		this.currentQuestion = this.examQuestions[index];
		var detailComponent = QuestionRegister.Instance.lookup(this.currentQuestion.question.type);
		let viewContainerRef = this.studyQuestionComponent.viewContainerRef;
		if (detailComponent) {
			let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
			viewContainerRef.clear();
			this.componentRef = viewContainerRef.createComponent(componentFactory);
			(<IQuestion>this.componentRef.instance).mode = 'study';
			(<IQuestion>this.componentRef.instance).render(this.currentQuestion.question, this.currentAnswer);
			if (index == this.examQuestions.length - 1) {
				this.viewCompleted = true;
				this.onViewCompletedReceiver.next();
			}
		}
	}

	next() {
		if (this.qIndex < this.examQuestions.length - 1) {
			this.displayQuestion(this.qIndex + 1);
			this.stage = 'question';
			if (this.componentRef)
				(<IQuestion>this.componentRef.instance).mode = 'study';
		}
	}

	prev() {
		if (this.qIndex > 0) {
			this.displayQuestion(this.qIndex - 1);
			this.stage = 'question';
			if (this.componentRef)
				(<IQuestion>this.componentRef.instance).mode = 'study';
		}
	}

}


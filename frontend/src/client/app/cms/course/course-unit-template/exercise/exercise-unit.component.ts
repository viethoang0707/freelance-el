import { Component, OnInit, Input, ViewChild, QueryList, ViewChildren, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Answer } from '../../../../shared/models/elearning/answer.model';
import { Question } from '../../../../shared/models/elearning/question.model';
import { QuestionOption } from '../../../../shared/models/elearning/option.model';
import { ExerciseQuestion } from '../../../../shared/models/elearning/exercise-question.model';
import { CourseUnit } from '../../../../shared/models/elearning/course-unit.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { CourseUnitTemplate } from '../unit.decorator';
import { ICourseUnit } from '../unit.interface';
import { TreeUtils } from '../../../../shared/helpers/tree.utils';
import { SelectQuestionsDialog } from '../../../../shared/components/select-question-dialog/select-question-dialog.component';
import { QuestionContainerDirective } from '../../../../assessment/question/question-template/question-container.directive';
import { IQuestion } from '../../../../assessment/question/question-template/question.interface';
import { QuestionRegister } from '../../../../assessment/question/question-template/question.decorator';

@Component({
	moduleId: module.id,
	selector: 'exercise-course-unit',
	templateUrl: 'exercise-unit.component.html',
})
@CourseUnitTemplate({
	type: 'exercise'
})
export class ExerciseCourseUnitComponent extends BaseComponent implements ICourseUnit, OnInit {

	private tree: TreeNode[];
	private selectedNode: TreeNode;
	private selectedQuestions: Question[];
	private questions: Question[];
	private unit: CourseUnit;
	private exerciseQuestions: ExerciseQuestion[];
	private stage: string;
	private qIndex: number;
	private currentQuestion: ExerciseQuestion;
	private treeUtils: TreeUtils;
	private currentAnswer: Answer;
	private componentRef: any;
	viewCompleted: boolean;

	@Input() mode;
	@ViewChild(SelectQuestionsDialog) questionDialog: SelectQuestionsDialog;
	@ViewChildren(QuestionContainerDirective) questionsComponents: QueryList<QuestionContainerDirective>;
	@ViewChild(QuestionContainerDirective) studyQuestionComponent: QuestionContainerDirective;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) {
		super();
		this.exerciseQuestions = [];
		this.currentAnswer = new Answer();
		this.currentQuestion = new ExerciseQuestion();
		this.treeUtils = new TreeUtils();
		this.viewCompleted = false;
	}

	ngOnInit() {
	}

	render(unit: CourseUnit) {
		this.unit = unit;
		this.unit.listExerciseQuestions(this).subscribe(exerciseQuestions => {
			this.exerciseQuestions = exerciseQuestions;
			ExerciseQuestion.populateQuestions(this, this.exerciseQuestions).subscribe(() => {
				var questions = _.map(exerciseQuestions, (exerviseQuestion: ExerciseQuestion) => {
					return exerviseQuestion.question;
				});
				Question.listOptionsForArray(this, questions).subscribe(() => {
					if (this.mode == 'preview')
						setTimeout(() => {
							var componentHostArr = this.questionsComponents.toArray();
							for (var i = 0; i < exerciseQuestions.length; i++) {
								var exerciseQuestion = exerciseQuestions[i];
								var componentHost = componentHostArr[i];
								this.previewQuestion(exerciseQuestion, componentHost);
							}

						}, 0);
					else if (this.mode == 'study') {
						this.qIndex = 0;
						this.displayQuestion(this.qIndex);
					}
				});
			});
		})
	}

	previewQuestion(exerciseQuestion: ExerciseQuestion, componentHost: any) {
		var detailComponent = QuestionRegister.Instance.lookup(exerciseQuestion.question.type);
		if (detailComponent) {
			let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
			var componentRef = componentHost.viewContainerRef.createComponent(componentFactory);
			(<IQuestion>componentRef.instance).mode = 'preview';
			(<IQuestion>componentRef.instance).render(exerciseQuestion.question);
		}
	}

	saveEditor(): Observable<any> {
		var createList = [];
		return this.unit.save(this).flatMap(() => {
			_.each(this.exerciseQuestions, (exerciseQuestion: ExerciseQuestion) => {
				exerciseQuestion.unit_id = this.unit.id;
				if (!exerciseQuestion.id)
					createList.push(exerciseQuestion);
			});
			return ExerciseQuestion.createArray(this, createList).do(() => {
				this.unit.exercise_question_ids = _.pluck(this.exerciseQuestions, 'id');
			});
		});
	}

	selectQuestion() {
		this.questionDialog.show();
		this.questionDialog.onSelectQuestions.subscribe(questions => {
			var exerciseQuestions = _.map(questions, (question: Question) => {
				var exerciseQuestion = new ExerciseQuestion();
				exerciseQuestion.question_id = question.id;
				exerciseQuestion.type = question.type;
				exerciseQuestion.title = question.title;
				return exerciseQuestion;
			});
			ExerciseQuestion.populateQuestions(this, exerciseQuestions).subscribe(() => {
				this.exerciseQuestions = this.exerciseQuestions.concat(exerciseQuestions);
			})
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
		this.currentQuestion = this.exerciseQuestions[index];
		var detailComponent = QuestionRegister.Instance.lookup(this.currentQuestion.question.type);
		let viewContainerRef = this.studyQuestionComponent.viewContainerRef;
		if (detailComponent) {
			let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
			viewContainerRef.clear();
			this.componentRef = viewContainerRef.createComponent(componentFactory);
			(<IQuestion>this.componentRef.instance).mode = 'study';
			(<IQuestion>this.componentRef.instance).render(this.currentQuestion.question, this.currentAnswer);
		}
	}

	next() {
		if (this.qIndex < this.exerciseQuestions.length - 1) {
			this.displayQuestion(this.qIndex + 1);
			this.stage = 'question';
			if (this.componentRef)
				(<IQuestion>this.componentRef.instance).mode = 'study';
		} else {
			this.viewCompleted = true;
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

	delete(exerciseQuestions) {
		if (exerciseQuestions && exerciseQuestions.length)
			this.confirm('Are you sure to delete ?', () => {
				ExerciseQuestion.deleteArray(this, exerciseQuestions).subscribe(() => {
					var questionIds = _.pluck(exerciseQuestions, 'question_id');
					this.exerciseQuestions = _.reject(this.exerciseQuestions, (exerciseQuestion: ExerciseQuestion) => {
						return _.contains(questionIds, exerciseQuestion.question_id);
					});
				});
			});
	}

}


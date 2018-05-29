import { Component, OnInit, Input, ViewChild, QueryList, ViewChildren, ComponentFactoryResolver,ViewContainerRef } from '@angular/core';
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
	type:'exercise'
})
export class ExerciseCourseUnitComponent extends BaseComponent implements ICourseUnit,OnInit{

	private tree: TreeNode[];
	private selectedNode: TreeNode;
	private selectedQuestions: Question[];
	private questions:Question[];
	@Input() mode;
	private unit: CourseUnit;
	private exerciseQuestions: ExerciseQuestion[];
	@ViewChild(SelectQuestionsDialog) questionDialog : SelectQuestionsDialog;
	@ViewChildren(QuestionContainerDirective) questionsComponents: QueryList<QuestionContainerDirective>;
	@ViewChild(QuestionContainerDirective) studyQuestionComponent : QuestionContainerDirective;
	private stage:string;
	private qIndex:number;
	private currentQuestion: ExerciseQuestion;
	private treeUtils: TreeUtils;
	private currentAnswer: Answer;
	private componentRef: any;

	constructor(private componentFactoryResolver:ComponentFactoryResolver) {
		super();
		this.exerciseQuestions = [];
		this.currentAnswer = new Answer();
		this.currentQuestion =  new ExerciseQuestion();
		this.treeUtils = new TreeUtils();
	}

	ngOnInit() {
	}

	render(unit:CourseUnit) {
		this.unit = unit;
		if (this.unit.id) {
			 this.startTransaction();
			 ExerciseQuestion.listByExercise(this, unit.id).subscribe(exerciseQuestions => {
			 	this.exerciseQuestions =  exerciseQuestions;
			 	if (this.mode=='preview')
				 	setTimeout(()=>{
	                    var componentHostArr =  this.questionsComponents.toArray();
                        for (var i =0;i<exerciseQuestions.length;i++) {
                            var exerciseQuestion =  exerciseQuestions[i];
                            var componentHost = componentHostArr[i];
                            this.previewQuestion(exerciseQuestion,componentHost);
                        }
                        this.closeTransaction();
	               }, 0); 
				 else if (this.mode=='study') {
				 	this.qIndex = 0;
				 	this.displayQuestion(this.qIndex);
				 	this.closeTransaction();
				 }
			 });
			}

	}

	previewQuestion(exerciseQuestion: ExerciseQuestion, componentHost:any) {
		this.startTransaction();
        Question.get(this, exerciseQuestion.question_id).subscribe((question)=> {
            var detailComponent = QuestionRegister.Instance.lookup(question.type);
            if (detailComponent) {
                let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
                var componentRef = componentHost.viewContainerRef.createComponent(componentFactory);
                (<IQuestion>componentRef.instance).mode = 'preview' ;
                (<IQuestion>componentRef.instance).render(question);
            }
            this.closeTransaction();            
        });
    }

	saveEditor():Observable<any> {
		return this.unit.save(this).flatMap(()=> {
			var updateSubscriptions = _.map(this.exerciseQuestions, (exerciseQuestion:ExerciseQuestion)=> {
				exerciseQuestion.unit_id = this.unit.id;
				return exerciseQuestion.save(this);
			});
			return Observable.forkJoin(...updateSubscriptions);
		});
	}

	selectQuestion() {
		this.questionDialog.show();
		this.questionDialog.onSelectQuestions.subscribe(questions => {
			var subscriptions = [];
			_.each(questions, (question:Question)=> {
				var exerciseQuestion = new ExerciseQuestion();
				exerciseQuestion.unit_id = this.unit.id;
				exerciseQuestion.question_id = question.id;
				exerciseQuestion.type =  question.type;
				exerciseQuestion.title =  question.title;
				subscriptions.push(exerciseQuestion.save(this));
			});
			this.startTransaction();
			Observable.zip(...subscriptions).subscribe(exerciseQuestions => {
				this.loadExerciseQuestions();
				this.closeTransaction();
			});
		});
	}

	loadExerciseQuestions() {
		this.startTransaction();
		ExerciseQuestion.listByExercise(this, this.unit.id).subscribe(exerciseQuestions => {
			this.exerciseQuestions =  exerciseQuestions;
			this.closeTransaction();
		});
	}


	createExerciseQuestionFromQuestionBank(questions: Question[]):Observable<any> {
		if (this.unit.id) {
			var createSubscriptions = _.map(questions, (question)=> {
				var exerciseQuestion = new ExerciseQuestion();
				exerciseQuestion.unit_id = this.unit.id;
				exerciseQuestion.question_id = question.id;
				exerciseQuestion.type =  question.type;
				exerciseQuestion.title =  question.title;
				return exerciseQuestion.save(this);
			});
			return Observable.forkJoin(...createSubscriptions);
		} else {
			return Observable.of(_.map(questions, (question)=> {
				var exerciseQuestion = new ExerciseQuestion();
				exerciseQuestion.question_id = question.id;
				return exerciseQuestion;
			}));
		}
	}

	answerQuestion() {
		this.stage = 'answer';
		if (this.componentRef)
			(<IQuestion>this.componentRef.instance).mode = 'review';
	}

	prepareQuestion(question: ExerciseQuestion): Observable<any> {
		return Question.get(this, question.question_id);
	}

	displayQuestion(index: number) {
		this.qIndex = index;
		this.stage = 'question';
		this.currentQuestion = this.exerciseQuestions[index];
		this.startTransaction();
		this.prepareQuestion(this.currentQuestion).subscribe(question => {
			var detailComponent = QuestionRegister.Instance.lookup(question.type);
			let viewContainerRef = this.studyQuestionComponent.viewContainerRef;
			if (detailComponent) {
				let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
				viewContainerRef.clear();
				this.componentRef = viewContainerRef.createComponent(componentFactory);
				(<IQuestion>this.componentRef.instance).mode = 'study';
				(<IQuestion>this.componentRef.instance).render(question, this.currentAnswer);
			}
			this.closeTransaction();
		});

	}

	next() {
		if (this.qIndex < this.exerciseQuestions.length - 1) {
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

	delete(questions) {
        if (questions && questions.length)
            this.confirm('Are you sure to delete ?', () => {
                var subscriptions = _.map(questions,(question:Question) => {
                    return question.delete(this);
                });
                Observable.forkJoin(...subscriptions).subscribe(()=> {
					if(this.exerciseQuestions.length > 1){
						this.render(this.unit);
					}
					else{
						this.exerciseQuestions = [];
					}
                });
            });
	}

}


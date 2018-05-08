import { Component, OnInit, Input, ViewChild, QueryList, ViewChildren, ComponentFactoryResolver,ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
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

	tree: TreeNode[];
	selectedNode: TreeNode;
	selectedQuestions: Question[];
	questions:Question[];

	@Input() mode;
	unit: CourseUnit;
	exerciseQuestions: ExerciseQuestion[];
	@ViewChild(SelectQuestionsDialog) questionDialog : SelectQuestionsDialog;
	@ViewChildren(QuestionContainerDirective) questionsComponents: QueryList<QuestionContainerDirective>;
	@ViewChild(QuestionContainerDirective) studyQuestionComponent : QuestionContainerDirective;
	stage:string;
	qIndex:number;
	currentQuestion: ExerciseQuestion;

	constructor(private treeUtils: TreeUtils, private componentFactoryResolver:ComponentFactoryResolver) {
		super();
		this.exerciseQuestions = [];
		this.currentQuestion =  new ExerciseQuestion();
	}

	ngOnInit() {
	}

	render(unit:CourseUnit) {
		this.unit = unit;
		if (this.unit.id)
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
	                    }, 0); 
				 if (this.mode=='study') {
				 	this.qIndex = 0;
				 	this.displayQuestion(this.qIndex);
				 }
			 });


	}

	previewQuestion(exerciseQuestion: ExerciseQuestion, componentHost:any) {
        Question.get(this, exerciseQuestion.question_id).subscribe((question)=> {
            var detailComponent = QuestionRegister.Instance.lookup(question.type);
            if (detailComponent) {
                let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
                var componentRef = componentHost.viewContainerRef.createComponent(componentFactory);
                (<IQuestion>componentRef.instance).mode = 'preview' ;
                (<IQuestion>componentRef.instance).render(question);
            }            
        });
    }

	removeOldQuestions():Observable<any> {
		if (this.unit.id) {
			var delSubscriptions = [];
			_.each(this.exerciseQuestions, (question)=> {
				delSubscriptions.push(question.delete(this));
			});
			if (delSubscriptions.length)
				return Observable.forkJoin(...delSubscriptions);
			else
				return Observable.of(null);
		} else {
			this.exerciseQuestions = [];
			return Observable.of(null);
		}
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
		this.removeOldQuestions().subscribe(() => {
			this.questionDialog.show();
			this.questionDialog.onSelectQuestions.subscribe(questions => {
				this.createExerciseQuestionFromQuestionBank(questions).subscribe(examQuestions => {
					this.exerciseQuestions =  examQuestions;
				});
			});
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
	}

	prepareQuestion(question: ExerciseQuestion): Observable<any> {
		return Question.get(this, question.question_id);
	}

	displayQuestion(index: number) {
		this.qIndex = index;
		this.stage = 'question';
		this.currentQuestion = this.exerciseQuestions[index];
		this.prepareQuestion(this.currentQuestion).subscribe(question => {
			var detailComponent = QuestionRegister.Instance.lookup(question.type);
			let viewContainerRef = this.studyQuestionComponent.viewContainerRef;
			if (detailComponent) {
				let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
				viewContainerRef.clear();
				var componentRef = viewContainerRef.createComponent(componentFactory);
				(<IQuestion>componentRef.instance).mode = 'study';
				(<IQuestion>componentRef.instance).render(question);
			}
		});

	}

	next() {
		if (this.qIndex < this.exerciseQuestions.length - 1) {
			this.displayQuestion(this.qIndex + 1);
		}
	}

	prev() {
		if (this.qIndex > 0) {
			this.displayQuestion(this.qIndex - 1);
		}
	}

	delete(questions) {
        if (questions && questions.length)
            this.confirm('Are you sure to delete ?', () => {
                var subscriptions = _.map(questions,(question:Question) => {
                    return question.delete(this);
                });
                Observable.forkJoin(...subscriptions).subscribe(()=> {
                    this.selectedQuestions = [];
					this.render(this.unit);
                });
            });
	}

}


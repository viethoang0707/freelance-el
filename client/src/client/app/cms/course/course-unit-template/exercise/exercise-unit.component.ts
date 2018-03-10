import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Question } from '../../../../shared/models/question.model';
import { QuestionOption } from '../../../../shared/models/option.model';
import { ExerciseQuestion } from '../../../../shared/models/exercise-question.model';
import { CourseUnit } from '../../../../shared/models/course-unit.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { CourseUnitTemplate } from '../unit.decorator';
import { ICourseUnit } from '../unit.interface';
import { TreeUtils } from '../../../../shared/helpers/tree.utils';
import { SelectQuestionsDialog } from '../../../../shared/components/select-question-dialog/select-question-dialog.component';


@Component({
	moduleId: module.id,
	selector: 'etraining-exercise-course-unit',
	templateUrl: 'exercise-unit.component.html',
})
@CourseUnitTemplate({
	type:'exercise'
})
export class ExerciseCourseUnitComponent extends BaseComponent implements ICourseUnit{

	unit: CourseUnit;
	exerciseQuestions: ExerciseQuestion[];
	@ViewChild(SelectQuestionsDialog) questionDialog : SelectQuestionsDialog;


	constructor(private treeUtils: TreeUtils) {
		super();
		this.exerciseQuestions = [];
	}

	render(unit:CourseUnit) {
		this.unit = unit;
		if (unit.id)
			ExerciseQuestion.listByExercise(this, unit.id).subscribe(exerciseQuestions => {
				this.exerciseQuestions =  exerciseQuestions;
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
			var updateSubscriptions = _.map(this.exerciseQuestions, (exerciseQuestion)=> {
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
}


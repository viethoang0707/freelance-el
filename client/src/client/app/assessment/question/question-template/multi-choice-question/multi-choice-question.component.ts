import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Question } from '../../../../shared/models/elearning/question.model';
import { QuestionOption } from '../../../../shared/models/elearning/option.model';
import { Answer } from '../../../../shared/models/elearning/answer.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY, QUESTION_LEVEL } from '../../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { QuestionTemplate } from '../question.decorator';
import { IQuestion } from '../question.interface';

@Component({
	moduleId: module.id,
	selector: 'multi-choice-question',
	templateUrl: 'multi-choice-question.component.html',
	styleUrls: ['multi-choice-question.component.css'],
})
@QuestionTemplate({
	type: 'mc'
})
export class MultiChoiceQuestionComponent extends BaseComponent implements IQuestion {

	mode: any;
	question: Question;
	answer: Answer;
	options: QuestionOption[];

	constructor() {
		super();
		this.options = [];
	}

	render(question, answer?) {
		this.question = question;
		this.answer =  answer;
		if (this.question.id)
			QuestionOption.listByQuestion(this, question.id).subscribe((options: QuestionOption[]) => {
				this.options = options;
			});
	}

	saveEditor(): Observable<any> {
		return this.question.save(this).flatMap(() => {
			var subscriptions = [];
			_.each(this.options, (option: QuestionOption)=> {
				option.question_id = this.question.id;
				subscriptions.push(option.save(this));
			});
			return Observable.forkJoin(...subscriptions);
		});
	}

	concludeAnswer() {
		var option = _.find(this.options, (obj)=> {
			return obj.id == this.answer.option_id;
		});
		if (option)
			this.answer.is_correct =  option.is_correct;
	}

	addOption() {
		this.options.push(new QuestionOption());
	}


	removeOption(option: QuestionOption) {
		if (option.id) {
			option.delete(this).subscribe(() => {
				this.options = _.reject(this.options, (obj)=> {
					return obj == option;
				});
			})
		} else
			this.options = _.reject(this.options, (obj)=> {
				return obj == option;
			});
	}
}


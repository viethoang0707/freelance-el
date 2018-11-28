import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Question } from '../../../shared/models/elearning/question.model';
import { QuestionOption } from '../../../shared/models/elearning/option.model';
import { Answer } from '../../../shared/models/elearning/answer.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY, QUESTION_LEVEL } from '../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { QuestionTemplate } from '../question.decorator';
import { IQuestion } from '../question.interface';

@Component({
	moduleId: module.id,
	selector: 'single-choice-question',
	templateUrl: 'single-choice-question.component.html',
	styleUrls: ['single-choice-question.component.css'],
})
@QuestionTemplate({
	type: 'sc'
})
export class SingleChoiceQuestionComponent extends BaseComponent implements IQuestion {

	mode: any;
	private question: Question;
	private answer: Answer;
	private options: QuestionOption[];
	private checkTrueOption: string;

	constructor() {
		super();
		this.options = [];
	}

	render(question, answer?) {
		this.question = question;
		this.answer = answer;
		this.checkTrueOption = '';
		if (this.question.id) {
				this.options = question.options;
				this.options.forEach(opt => {
					if (!opt.is_correct && opt.is_correct == true) {
						this.checkTrueOption = 'true';
					}
				});
		}
	}

	isValid():boolean {
		return this.options.length > 0;
	}

	saveEditor(): Observable<any> {
		return this.question.save(this).flatMap(() => {
			_.each(this.options, (option: QuestionOption) => {
				option.question_id = this.question.id;
			});
			var existOptions = _.filter(this.options, (option:QuestionOption)=> {
				return !option.IsNew;
			});
			var newOptions = _.filter(this.options, (option:QuestionOption)=> {
				return option.IsNew;
			});
			if (existOptions.length || newOptions.length)
				return Observable.forkJoin(QuestionOption.updateArray(this, existOptions),QuestionOption.createArray(this, newOptions));
			return Observable.of(null);
		});
	}

	concludeAnswer() {
		var option = _.find(this.options, (obj) => {
			return obj.id == this.answer.option_id;
		});
		if (option)
			return [option.id]
		else
			return [];
	}

	addOption() {
		this.options.push(new QuestionOption());
	}

	setOptionCorrect(option) {
		_.each(this.options, (obj) => {
			obj.is_correct = false;
		});
		option.is_correct = true;
	}

	removeOption(option: QuestionOption) {
		if (option.id) {
			option.delete(this).subscribe(() => {
				this.question.options = this.options = _.reject(this.options, (obj) => {
					return obj == option;
				});
				
			})
		} else
			this.question.options = this.options = _.reject(this.options, (obj) => {
				return obj == option;
			});
	}
}


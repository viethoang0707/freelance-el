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
	private question: Question;
	private answer: Answer;
	private options: QuestionOption[];

	constructor() {
		super();
		this.options = [];
	}

	render(question, answer?) {
		this.question = question;
		this.answer = answer;
		if (this.question.id) {
			this.options = question.options;
			if (this.answer && this.answer.id) {
				var selectedOptions = JSON.parse(this.answer.json);
				_.each(this.options , (option => {
					var selected = _.find(selectedOptions, (obj) => {
						return obj == option.id;
					});
					if (selected)
						option["is_selected"] = true;
					option["is_selected"] = false;
				}));
			}
		}
	}

	saveEditor(): Observable<any> {
		return this.question.save(this).flatMap(() => {
			_.each(this.options, (option: QuestionOption) => {
				option.question_id = this.question.id;
			});
			var existOptions = _.filter(this.options, (option:QuestionOption)=> {
				return option.id != null;
			});
			var newOptions = _.filter(this.options, (option:QuestionOption)=> {
				return option.id == null;
			});
			return Observable.forkJoin(QuestionOption.updateArray(this, existOptions),QuestionOption.createArray(this, newOptions));
		});
	}

	concludeAnswer() {
		this.answer.is_correct = true;
		var selectedOptions = _.filter(this.options, option => {
			return option["is_selected"];
		});
		this.answer.json = JSON.stringify(_.pluck(selectedOptions, "id"));
		_.each(this.options, (option => {
			if ((option.is_correct && !option["]is_selected"]) || (!option.is_correct && option["is_selected"]))
				this.answer.is_correct = false;
		}));
	}

	addOption() {
		this.options.push(new QuestionOption());
	}


	removeOption(option: QuestionOption) {
		if (option.id) {
			option.delete(this).subscribe(() => {
				this.options = _.reject(this.options, (obj) => {
					return obj == option;
				});
			})
		} else
			this.options = _.reject(this.options, (obj) => {
				return obj == option;
			});
	}
}


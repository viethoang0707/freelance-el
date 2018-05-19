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
	selector: 'single-choice-question',
	templateUrl: 'single-choice-question.component.html',
	styleUrls: ['single-choice-question.component.css'],
})
@QuestionTemplate({
	type: 'sc'
})
export class SingleChoiceQuestionComponent extends BaseComponent implements IQuestion {

	mode: any;
	question: Question;
	answer: Answer;
	options: QuestionOption[];
	checkTrueOption: string;

	constructor() {
		super();
		this.options = [];
	}

	render(question, answer?) {
		this.question = question;
		this.answer = answer;
		this.checkTrueOption = '';
		if (this.question.id) {
			QuestionOption.listByQuestion(this, question.id).subscribe((options: QuestionOption[]) => {
				this.options = options;
				options.forEach(opt => {
					if (!opt.is_correct && opt.is_correct == true) {
						this.checkTrueOption = 'true';
					}
				});
			});
		}
	}

	saveEditor(): Observable<any> {
		return this.question.save(this).flatMap(() => {
			var subscriptions = [];
			_.each(this.options, (option: QuestionOption) => {
				option.question_id = this.question.id;
				subscriptions.push(option.save(this));
			});
			return Observable.forkJoin(...subscriptions);
		});
	}

	concludeAnswer() {
		var option = _.find(this.options, (obj) => {
			return obj.id == this.answer.option_id;
		});
		if (option)
			this.answer.is_correct = option.is_correct;
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
			this.startTransaction();
			option.delete(this).subscribe(() => {
				this.options = _.reject(this.options, (obj) => {
					return obj == option;
				});
				this.closeTransaction();
			})
		} else
			this.options = _.reject(this.options, (obj) => {
				return obj == option;
			});
	}
}


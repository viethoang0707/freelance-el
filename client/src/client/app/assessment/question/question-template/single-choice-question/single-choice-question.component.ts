import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Question } from '../../../../shared/models/question.model';
import { QuestionOption } from '../../../../shared/models/option.model';
import { Answer } from '../../../../shared/models/answer.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { QuestionTemplate } from '../question.decorator';
import { IQuestion } from '../question.interface';

@Component({
	moduleId: module.id,
	selector: 'etraining-single-choice-question',
	templateUrl: 'single-choice-question.component.html',
})
@QuestionTemplate({
	type:'sc'
})
export class SingleChoiceQuestionComponent extends BaseComponent implements IQuestion{

	mode:any;
	question:Question;
	options: QuestionOption[];

	constructor() {
		super();
	}

	render(question, answer?) {
		this.question = question;
		QuestionOption.listByQuestion(this,question.id).subscribe((options:QuestionOption[]) => {
			this.options =  options;
		})

	}
	
	save():Observable<any> {
		var self = this;
		if (this.mode =='edit') {
			return this.question.save(this).flatMap(() => {
				var subscriptions = [];
				_.each(this.options, function(option:QuestionOption) {
					option.question_id =  self.question.id;
					subscriptions.push(option.save(self));
				});
				return Observable.forkJoin(...subscriptions);
			});
		}
		return Observable.of(null);
	}

	addOption() {
		this.options.push(new QuestionOption());
	}

	setOptionCorrect(option) {
		if (option.is_correct) {
			_.each(this.options, function(option) {
				option.is_correct = false;
			});
			option.is_correct = true;
		}
	}

	removeOption(option:QuestionOption) {
		if (option.id) {
			option.delete(this).subscribe(()=> {
				this.options = _.reject(this.options, function(obj) {
					return obj == option;
				});
			})
		} else
			this.options = _.reject(this.options, function(obj) {
					return obj == option;
				});
	}


}


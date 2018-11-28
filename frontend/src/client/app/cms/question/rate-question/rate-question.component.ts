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
	selector: 'rate-question',
	templateUrl: 'rate-question.component.html',
	styleUrls: ['rate-question.component.css'],
})
@QuestionTemplate({
	type: 'rate'
})
export class RateQuestionComponent extends BaseComponent implements IQuestion {

	mode: any;
	private question: Question;
	private answer: Answer;

	constructor() {
		super();
	}

	render(question, answer?) {
		this.question = question;
		this.answer = answer;
	}

	saveEditor(): Observable<any> {
		return this.question.save(this);
	}

	concludeAnswer() {
		return [];
	}

	isValid():boolean {
		return this.question.max_rating > 0;
	}

}


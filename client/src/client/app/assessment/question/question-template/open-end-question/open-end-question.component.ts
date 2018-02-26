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
	selector: 'etraining-open-end-question',
	templateUrl: 'open-end-question.component.html',
	styleUrls: ['open-end-question.component.css'],
})
@QuestionTemplate({
	type:'ext'
})
export class OpenEndQuestionComponent extends BaseComponent implements IQuestion{

	mode:any;
	question:Question;
	answer: Answer;

	constructor() {
		super();
	}

	render(question, answer?) {
		this.question = question;
		this.answer = answer;
	}
	
	saveEditor():Observable<any> {
		return this.question.save(this);
	}

	concludeAnswer() {
		return;
	}

}


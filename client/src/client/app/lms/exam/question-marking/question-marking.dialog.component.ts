import { Component, Input, OnInit, ViewChild,ComponentFactoryResolver } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { Exam } from '../../../shared/models/elearning/exam.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { Question } from '../../../shared/models/elearning/question.model';
import { Answer } from '../../../shared/models/elearning/answer.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Group } from '../../../shared/models/elearning/group.model';


@Component({
	moduleId: module.id,
	selector: 'question-marking-dialog',
	templateUrl: 'question-marking.dialog.component.html',
})
export class QuestionMarkingDialog extends BaseComponent {

	display: boolean;
	answers: Answer[];
	questions: any;
	member: ExamMember;
	private onMarkCompleteReceiver: Subject<any> = new Subject();
    onMarkComplete:Observable<any> =  this.onMarkCompleteReceiver.asObservable();


	constructor() {
		super();
		this.display = false;
		this.answers = [];
		this.questions = {};
		this.member =  new ExamMember();
	}

	show(member: ExamMember, answers: Answer[], questions: ExamQuestion[]) {
		this.display = true;
		this.questions = {};
		_.each(questions, (question:ExamQuestion)=> {
			this.questions[question.question_id] =  question;
		});
		this.member = member;
		this.answers = answers;
	}

	hide() {
		this.display = false;
	}

	save() {
		var subscrptions = _.map(this.answers, (answer)=> {
			return answer.save(this);
		});
		Observable.forkJoin(...subscrptions).subscribe(()=> {
			this.messageService.add({severity:'success', summary:'Marking', detail: 'Marking saved sucessfully'});
			this.onMarkCompleteReceiver.next();
			this.hide();
		});
	}
}
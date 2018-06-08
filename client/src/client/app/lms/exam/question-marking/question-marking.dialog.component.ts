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
import { QuestionSheet } from '../../../shared/models/elearning/question-sheet.model';


@Component({
	moduleId: module.id,
	selector: 'question-marking-dialog',
	templateUrl: 'question-marking.dialog.component.html',
})
export class QuestionMarkingDialog extends BaseComponent {

	private display: boolean;
	private submit: Submission;
	private answers: Answer[];
	private markAnswers: Answer[];
	private questions: any;
	private member: ExamMember;
	private onMarkCompleteReceiver: Subject<any> = new Subject();
    onMarkComplete:Observable<any> =  this.onMarkCompleteReceiver.asObservable();


	constructor() {
		super();
		this.display = false;
		this.answers = [];
		this.questions = {};
		this.member =  new ExamMember();
	}

	show(member: ExamMember, submit:Submission) {
		this.display = true;
		this.questions = {};
		this.member = member;
		this.submit =  submit;
		this.startTransaction();
		QuestionSheet.byExam(this, this.submit.exam_id).subscribe(sheet => {
			ExamQuestion.listBySheet(this, sheet.id).subscribe(examQuestions => {
				_.each(examQuestions, (question:ExamQuestion)=> {
					this.questions[question.question_id] =  question;
				});
				Answer.listBySubmit(this, this.submit.id).subscribe(answers=> {
					this.answers = answers;
					this.markAnswers =  _.filter(answers,(ans:Answer)=> {
						var question = _.find(examQuestions, (q=> {
							return ans.question_id == q.question_id;
						}));
						return question && question.type =='ext'; 
					});
					this.closeTransaction();
				});
			});
		});
		
		
	}

	hide() {
		this.display = false;
	}

	save() {
		var subscrptions = _.map(this.answers, (answer)=> {
			return answer.save(this);
		});
		if (!this.submit.score )
			this.submit.score = 0;
		this.submit.score = _.reduce(this.answers,  (sum, ans)=> {return sum + (+ans.score);},0);
		subscrptions.push(this.submit.save(this));
		this.startTransaction();
		Observable.forkJoin(...subscrptions).subscribe(()=> {
			this.success(this.translateService.instant('Marking saved sucessfully'));
			this.onMarkCompleteReceiver.next();
			this.hide();
			this.closeTransaction();
		});
	}
}
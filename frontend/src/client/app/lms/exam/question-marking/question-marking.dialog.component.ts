import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
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
import { BaseModel } from '../../../shared/models/base.model';


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
	onMarkComplete: Observable<any> = this.onMarkCompleteReceiver.asObservable();


	constructor() {
		super();
		this.display = false;
		this.answers = [];
		this.questions = {};
		this.member = new ExamMember();
	}

	show(member: ExamMember, submit: Submission) {
		this.display = true;
		this.questions = {};
		this.member = member;
		this.submit = submit;

		BaseModel.bulk_list(this,
			QuestionSheet.__api__byExam(this.submit.exam_id),
			this.submit.__api__listAnswers())
			.subscribe(jsonArr => {
				var sheetList = QuestionSheet.toArray(jsonArr[0]);
				this.answers = Answer.toArray(jsonArr[1]);
				if (sheetList.length) {
					ExamQuestion.listBySheet(this, sheetList[0].id).subscribe(examQuestions => {
						_.each(examQuestions, (question: ExamQuestion) => {
							this.questions[question.question_id] = question;
						});
						this.markAnswers = _.filter(this.answers, (ans: Answer) => {
							var question = _.find(examQuestions, (q: ExamQuestion) => {
								return ans.question_id == q.question_id;
							});
							return question && question.type == 'ext';
						});
					});
				}
			});
	}

	hide() {
		this.display = false;
	}

	save() {
		Answer.updateArray(this, this.answers).subscribe(() => {
			this.success(this.translateService.instant('Marking saved sucessfully'));
			this.onMarkCompleteReceiver.next();
			this.hide();
		});
	}
}
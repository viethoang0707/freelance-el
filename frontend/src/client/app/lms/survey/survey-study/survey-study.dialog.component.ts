import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS, EXAM_TIME_WARNING } from '../../../shared/models/constants'
import { Survey } from '../../../shared/models/elearning/survey.model';
import { SurveySubmission } from '../../../shared/models/elearning/survey-submission.model';
import { Question } from '../../../shared/models/elearning/question.model';
import { SurveySheet } from '../../../shared/models/elearning/survey-sheet.model';
import { SurveyAnswer } from '../../../shared/models/elearning/survey-answer.model';
import { SurveyQuestion } from '../../../shared/models/elearning/survey-question.model';
import { SurveyMember } from '../../../shared/models/elearning/survey-member.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { ExamLog } from '../../../shared/models/elearning/log.model';
import { ClockPipe } from '../../../shared/pipes/time.pipe';
import { SelectItem } from 'primeng/api';
import { QuestionContainerDirective } from '../../../cms/question/question-container.directive';
import { IQuestion } from '../../../cms/question/question.interface';
import { QuestionRegister } from '../../../cms/question/question.decorator';
import 'rxjs/add/observable/timer';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { WindowRef } from '../../../shared/helpers/windonw.ref';
import { BaseModel } from '../../../shared/models/base.model';


declare var $: any;

@Component({
	moduleId: module.id,
	selector: 'survey-study-dialog',
	templateUrl: 'survey-study.dialog.component.html',
	styleUrls: ['survey-study.dialog.component.css'],
	providers: [MessageService]
})
export class SurveyStudyDialog extends BaseComponent {

	WINDOW_HEIGHT: any;

	private display: boolean;
	private survey: Survey;
	private member: SurveyMember;
	private questions: Question[];
	private qIndex: number;
	private surveyQuestions: SurveyQuestion[];
	private answers: SurveyAnswer[];
	private submission: SurveySubmission;
	private currentAnswer: SurveyAnswer;
	private currentQuestion: SurveyQuestion;
	private progress: number;
	private stats: any;
	private validAnswer: number;
	private onShowReceiver: Subject<any> = new Subject();
	private onHideReceiver: Subject<any> = new Subject();
	private componentRef: any;
	onShow: Observable<any> = this.onShowReceiver.asObservable();
	onHide: Observable<any> = this.onHideReceiver.asObservable();

	@ViewChild(QuestionContainerDirective) questionHost: QuestionContainerDirective;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) {
		super();
		this.display = false;
		this.surveyQuestions = [];
		this.answers = [];
		this.survey = new Survey();
		this.currentQuestion = new SurveyQuestion();
		this.progress = 0;
		this.member = new SurveyMember();
		this.stats = {
			total: 0,
			attempt: 0,
			unattempt: 0
		}
		this.validAnswer = 0;
		this.WINDOW_HEIGHT = $(window).height();
	}

	show(survey: Survey, member: SurveyMember) {
		this.display = true;
		this.survey = survey;
		this.member = member;
		this.qIndex = 0;
		this.loadSurveyContent();
	}

	loadSurveyContent() {
		SurveySubmission.get(this, this.member.submission_id).subscribe(submit => {
			this.submission = submit;
			this.submission.start = new Date();
			BaseModel.bulk_search(this,
				SurveySheet.__api__listQuestions(this.survey.id),
				SurveySubmission.__api__listAnswers(this.submission.id))
				.subscribe(jsonArr => {
					this.surveyQuestions = SurveyQuestion.toArray(jsonArr[0]);
					this.answers = SurveyAnswer.toArray(jsonArr[1]);
					this.stats.total = this.surveyQuestions.length;
					SurveyQuestion.populateQuestions(this, this.surveyQuestions).subscribe(() => {
						var questions = _.map(this.surveyQuestions, (surveyQuestion: SurveyQuestion) => {
							return surveyQuestion.question
						});
						Question.listOptionsForArray(this, questions).subscribe(() => {
							this.startSurvey();
						});
					});
				});
		});
	}

	hide() {
		this.display = false;
		this.onHideReceiver.next();
	}

	updateStats() {
		var validAnswers = _.filter(this.answers, (ans: any) => {
			return ans.option_id != "" && ans.option_id != "0";
		});
		if (validAnswers.length > 0) {
			this.validAnswer = validAnswers.length;
		} else {
			this.validAnswer = 0;
		}
		this.stats.attempt = this.validAnswer;
		this.stats.unattempt = this.stats.total - this.stats.attempt;
		this.progress = Math.floor(validAnswers.length / this.surveyQuestions.length * 100)
	}

	startSurvey() {
		this.updateStats();
		this.displayQuestion(0);
	}

	prepareAnswer(question: SurveyQuestion) {
		var answer = _.find(this.answers, (ans: SurveyAnswer) => {
			return ans.question_id == question.question_id;
		});
		if (!answer) {
			var answer = new SurveyAnswer();
			answer.option_id = 0;
			answer.submission_id = this.submission.id;
			answer.question_id = question.question_id;
			this.answers.push(answer);
			this.updateStats();
			return answer;
		} else
			return answer;
	}

	displayQuestion(index: number) {
		this.qIndex = index;
		this.currentQuestion = this.surveyQuestions[index];
		this.currentAnswer = this.prepareAnswer(this.currentQuestion);
		var detailComponent = QuestionRegister.Instance.lookup(this.currentQuestion.question.type);
		let viewContainerRef = this.questionHost.viewContainerRef;
		if (detailComponent) {
			let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
			viewContainerRef.clear();
			this.componentRef = viewContainerRef.createComponent(componentFactory);
			(<IQuestion>this.componentRef.instance).mode = 'survey';
			(<IQuestion>this.componentRef.instance).render(this.currentQuestion.question, this.currentAnswer);
			this.updateStats();
		}
	}

	submitAnswer(): Observable<any> {
		this.currentQuestion["checkAnswer"] = true;
		return this.currentAnswer.save(this);
	}

	next() {
		this.submitAnswer().subscribe(() => {
			if (this.qIndex < this.surveyQuestions.length - 1) {
				this.displayQuestion(this.qIndex + 1);
			}
		});
	}

	prev() {
		this.submitAnswer().subscribe(() => {
			if (this.qIndex > 0) {
				this.displayQuestion(this.qIndex - 1);
			}
		});
	}

	submitSurvey() {
		this.submitAnswer().subscribe(() => {
			this.member.enroll_status = 'completed';
			this.submission.end = new Date();
			this.member.save(this).subscribe(() => {
				this.submission.save(this).subscribe(() => {
					this.hide();
				});
			});
		});
	}

}
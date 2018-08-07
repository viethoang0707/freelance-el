import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS, EXAM_TIME_WARNING } from '../../../shared/models/constants'
import { Exam } from '../../../shared/models/elearning/exam.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { Question } from '../../../shared/models/elearning/question.model';
import { QuestionSheet } from '../../../shared/models/elearning/question-sheet.model';
import { Answer } from '../../../shared/models/elearning/answer.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { ExamLog } from '../../../shared/models/elearning/log.model';
import { ClockPipe } from '../../../shared/pipes/time.pipe';
import { SelectItem } from 'primeng/api';
import { QuestionContainerDirective } from '../../../assessment/question/question-template/question-container.directive';
import { IQuestion } from '../../../assessment/question/question-template/question.interface';
import { QuestionRegister } from '../../../assessment/question/question-template/question.decorator';
import { ExamSubmissionDialog } from '../exam-submit/exam-submission.dialog.component';
import 'rxjs/add/observable/timer';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { WindowRef } from '../../../shared/helpers/windonw.ref';
import { BaseModel } from '../../../shared/models/base.model';
import * as DetectRTC from 'detectrtc';

declare var $: any;

@Component({
	moduleId: module.id,
	selector: 'exam-study-dialog',
	templateUrl: 'exam-study.dialog.component.html',
	styleUrls: ['exam-study.dialog.component.css'],
	providers: [MessageService]
})
export class ExamStudyDialog extends BaseComponent {

	WINDOW_HEIGHT: any;

	private display: boolean;
	private exam: Exam;
	private member: ExamMember;
	private qIndex: number;
	private examQuestions: ExamQuestion[];
	private answers: Answer[];
	private submission: Submission;
	private timer: any;
	private timeoutSubscription: any;
	private currentAnswer: Answer;
	private currentQuestion: ExamQuestion;
	private timeLeft: number;
	private progress: number;
	private stats: any;
	private validAnswer: number;
	private componentRef: any;
	private onShowReceiver: Subject<any> = new Subject();
	private onHideReceiver: Subject<any> = new Subject();
	onShow: Observable<any> = this.onShowReceiver.asObservable();
	onHide: Observable<any> = this.onHideReceiver.asObservable();

	@ViewChild(ExamSubmissionDialog) submitDialog: ExamSubmissionDialog;
	@ViewChild(QuestionContainerDirective) questionHost: QuestionContainerDirective;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) {
		super();
		this.display = false;
		this.examQuestions = [];
		this.answers = [];
		this.exam = new Exam();
		this.currentQuestion = new ExamQuestion();
		this.timeLeft = 0;
		this.progress = 0;
		this.member = new ExamMember();
		this.stats = {
			total: 0,
			attempt: 0,
			unattempt: 0
		}
		this.validAnswer = 0;
		this.WINDOW_HEIGHT = $(window).height();
	}

	show(exam: Exam, member: ExamMember) {
		this.display = true;
		this.exam = exam;
		this.member = member;
		this.qIndex = 0;
		navigator.mediaDevices.getUserMedia({ audio: true, video: true })
			.then(() => {
				DetectRTC.load(() => {
					console.log('Webcam available', DetectRTC.hasWebCam);
					console.log('Webcam permission', DetectRTC.isWebsiteHasWebcamPermissions);
					if (!DetectRTC.hasWebcam || !DetectRTC.isWebsiteHasWebcamPermissions) {
						this.error('Your webcam is not installed or not enabled. Please check webcam permission in your browser settings.');
						this.display = false;
						return;
					}
					this.loadExamContent();
				})
			})
			.catch((e) => {
				console.log('Get media error', e);
				this.error('Webcam device not found');
				this.display = false;
			})
	}

	loadExamContent() {
		this.member.populateSubmission(this).subscribe(() => {
			this.submission = this.member.submit;
			this.submission.start = new Date();
			BaseModel.bulk_list(this,
				QuestionSheet.__api__listQuestions(this.exam.question_ids),
				Submission.__api__listAnswers(this.submission.answer_ids))
				.subscribe(jsonArr => {
					this.examQuestions = this.prepareExamQuestions(ExamQuestion.toArray(jsonArr[0]));
					this.answers = Answer.toArray(jsonArr[1]);
					ExamQuestion.populateQuestions(this, this.examQuestions).subscribe(() => {
						var questions = _.map(this.examQuestions, (examQuestion: ExamQuestion) => {
							return examQuestion.question;
						});
						Question.listOptionsForArray(this, questions).subscribe(() => {
							this.startExam();
						});
					});
				});
		});
	}

	prepareExamQuestions(examQuestions: ExamQuestion[]) {
		var offset = this.member.id;
		return _.map(examQuestions, (obj, order) => {
			var index = (order + offset) % examQuestions.length;
			return examQuestions[index];
		});
	}

	hide() {
		this.display = false;
		this.onHideReceiver.next();
	}

	updateStats() {
		this.stats.total = this.examQuestions.length;
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
		this.progress = Math.floor(validAnswers.length / this.examQuestions.length * 100)
	}

	startExam() {
		this.member.enroll_status = 'in-progress';
		this.member.save(this).subscribe();
		ExamLog.startExam(this, this.member, this.submission).subscribe();
		this.updateStats();
		this.startTimer();
		this.displayQuestion(0);
	}

	finishExam() {
		this.submission.end = new Date();
		this.submission.save(this).subscribe(() => {
			this.member.submitScore(this).subscribe(() => {
				this.member.enroll_status = 'completed';
				ExamLog.finishExam(this, this.member, this.submission).subscribe();
				this.timeoutSubscription.next();
				this.hide();
			});
		});
	}

	prepareAnswer(question: ExamQuestion) {
		var answer = _.find(this.answers, (ans: Answer) => {
			return ans.question_id == question.question_id;
		});
		if (!answer) {
			var answer = new Answer();
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
		this.currentQuestion = this.examQuestions[index];
		this.currentAnswer = this.prepareAnswer(this.currentQuestion);
		this.checkAnswer();
		var detailComponent = QuestionRegister.Instance.lookup(this.currentQuestion.question.type);
		let viewContainerRef = this.questionHost.viewContainerRef;
		if (detailComponent) {
			let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
			viewContainerRef.clear();
			this.componentRef = viewContainerRef.createComponent(componentFactory);
			(<IQuestion>this.componentRef.instance).mode = 'study';
			(<IQuestion>this.componentRef.instance).render(this.currentQuestion.question, this.currentAnswer);
			this.updateStats();
		}
	}

	submitAnswer(): Observable<any> {
		if (this.componentRef) {
			(<IQuestion>this.componentRef.instance).concludeAnswer();
			if (this.currentAnswer.is_correct) {
				this.currentAnswer.score = this.currentQuestion.score;
			} else
				this.currentAnswer.score = 0;
		}
		return this.currentAnswer.save(this);
	}

	next() {
		this.submitAnswer().subscribe(() => {
			if (this.qIndex < this.examQuestions.length - 1) {
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

	submitExam() {
		this.submitAnswer().subscribe(() => {
			this.submitDialog.show(this.exam, this.submission);
			this.submitDialog.onConfirm.subscribe(() => {
				this.finishExam();
			});
		});
	}

	startTimer() {
		var now = new Date();
		this.timeoutSubscription = new Subject();
		var elapse = Math.floor((now.getTime() - this.submission.start.getTime()));
		this.timeLeft = this.exam.duration * 60 * 1000 - elapse;
		if (this.timeLeft <= 0)
			this.finishExam();
		else {
			this.timer = Observable.timer(0, 1000);
			this.timer
				.takeUntil(this.timeoutSubscription)
				.subscribe(() => {
					this.timeLeft -= 1000;
					if (this.timeLeft <= EXAM_TIME_WARNING && this.timeLeft > EXAM_TIME_WARNING - 1000)
						this.warn(this.translateService.instant('A little minutes remaining!'));
					if (this.timeLeft <= 0) {
						this.finishExam();
					}
				});
		}
	}

	checkAnswer() {
		var validQuestion = _.filter(this.answers, (ans: any) => {
			return ans.option_id;
		});
		this.examQuestions.forEach((ques: any) => {
			validQuestion.forEach(answer => {
				if (answer.question_id === ques.question_id) {
					ques.checkAnswer = true;
				}
			})
		});
	}
}
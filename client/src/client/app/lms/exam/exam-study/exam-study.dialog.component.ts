import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
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

declare var $: any;

@Component({
	moduleId: module.id,
	selector: 'exam-study-dialog',
	templateUrl: 'exam-study.dialog.component.html',
	providers: [MessageService]
})
export class ExamStudyDialog extends BaseComponent {

	WINDOW_HEIGHT: any;

	private display: boolean;
	private exam: Exam;
	private member: ExamMember;
	private sheet: QuestionSheet;
	private qIndex: number;
	private examQuestions: ExamQuestion[];
	private questions: Question[];
	private answers: Answer[];
	private submission: Submission;
	private timer: any;
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
		this.questions = [];
		this.exam = new Exam();
		this.sheet = new QuestionSheet();
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
		this.onShowReceiver.next();
		this.display = true;
		this.exam = exam;
		this.member = member;
		this.qIndex = 0;

		this.createSubmission().subscribe((submit: Submission) => {
			this.submission = submit;
			QuestionSheet.byExam(this, this.exam.id).subscribe(sheet => {
				this.sheet = sheet;
				BaseModel.bulk_search(this,
					ExamQuestion.__api__listBySheet(this.sheet.id),
					Answer.__api__listBySubmit(this.submission.id))
					.subscribe(jsonArr => {
						this.examQuestions = this.prepareExamQuestions(ExamQuestion.toArray(jsonArr[0]));
						this.answers = Answer.toArray(jsonArr[1]);
						ExamQuestion.populateQuestions(this, this.examQuestions).subscribe(() => {
							var questions = _.map(this.examQuestions, (examQuestion:ExamQuestion)=> {
		                        return examQuestion.question;
		                    });
		                    Question.populateOptions(this, questions).subscribe(()=> {
		                    	this.startExam();
		                    });
						});
					});
			});
		});
	}

	createSubmission(): Observable<any> {
		return Submission.byMemberAndExam(this, this.member.id, this.exam.id).flatMap((submit: Submission) => {
			if (!submit) {
				submit = new Submission();
				submit.member_id = this.member.id;
				submit.start = new Date();
				return submit.save(this);
			} else {
				return Observable.of(submit);
			}
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
		ExamLog.startExam(this, this.member.id, this.submission.id).subscribe();
		this.updateStats();
		this.startTimer();
		this.displayQuestion(0);
	}

	finishExam() {
		this.member.enroll_status = 'completed';
		this.submission.end = new Date();
		this.submission.score = _.reduce(this.answers, (sum, ans) => { return sum + (+ans.score); }, 0);
		BaseModel.bulk_update(this, this.member.__api__update(), this.submission.__api__update()).subscribe(() => {
			ExamLog.finishExam(this, this.member.id, this.submission.id).subscribe();
			this.hide();
		});
	}

	prepareAnswer(question: ExamQuestion): Observable<any> {
		var answer = _.find(this.answers, (ans: Answer) => {
			return ans.question_id == question.question_id;
		});
		if (!answer) {
			var answer = new Answer();
			answer.option_id = 0;
			answer.submission_id = this.submission.id;
			answer.question_id = question.question_id;
			return answer.save(this).do(ans => {
				this.answers.push(answer);
				this.updateStats();
			});
		} else
			return Observable.of(answer);
	}

	displayQuestion(index: number) {
		this.qIndex = index;
		this.currentQuestion = this.examQuestions[index];
		this.prepareAnswer(this.currentQuestion).subscribe(answer => {
			ExamLog.startAnswer(this, this.member.id, answer.id).subscribe(() => {
				this.currentAnswer = answer;
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
			});
		});
	}

	submitAnswer(): Observable<any> {
		(<IQuestion>this.componentRef.instance).concludeAnswer();
		if (this.currentAnswer.is_correct) {
			this.currentAnswer.score = this.currentQuestion.score;
		} else
			this.currentAnswer.score = 0;
		return this.currentAnswer.save(this).do(() => {
			ExamLog.finishAnswer(this, this.member.id, this.currentAnswer.id).subscribe();
		});
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
		var elapse = Math.floor((now.getTime() - this.submission.start.getTime()));
		this.timeLeft = this.exam.duration * 60 * 1000 - elapse;
		if (this.timeLeft <= 0)
			this.finishExam();
		else {
			this.timer = Observable.timer(0, 1000);
			this.timer
				.takeUntil(new Subject())
				.subscribe(() => {
					this.timeLeft -= 1000;
					if(this.timeLeft <= EXAM_TIME_WARNING && this.timeLeft > EXAM_TIME_WARNING - 1000)
						this.warn(this.translateService.instant('A little minutes remaining!'));
					if (this.timeLeft <= 0)
						this.finishExam();
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
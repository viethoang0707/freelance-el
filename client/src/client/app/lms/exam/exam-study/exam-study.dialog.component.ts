import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
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
import 'rxjs/add/observable/timer';

@Component({
	moduleId: module.id,
	selector: 'exam-study-dialog',
	templateUrl: 'exam-study.dialog.component.html',
})
export class ExamStudyDialog extends BaseComponent {

	display: boolean;
	exam: Exam;
	member: ExamMember;
	sheet: QuestionSheet;
	qIndex: number;
	examQuestions: ExamQuestion[];
	answers: Answer[];
	submission: Submission;
	timer: any;
	timerSubject: any;
	currentAnswer: Answer;
	currentQuestion: ExamQuestion;
	timeLeft: number;
	progress: number;
	stats: any;
	height: number;
	examCode: any;

	@ViewChild(QuestionContainerDirective) questionHost: QuestionContainerDirective;
	componentRef: any;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) {
		super();
		this.display = false;
		this.examQuestions = [];
		this.answers = [];
		this.exam = new Exam();
		this.sheet = new QuestionSheet();
		this.currentQuestion = new ExamQuestion();
		this.timeLeft = 0;
		this.progress = 0;
		this.member = new ExamMember();
		this.examCode = '';
		this.stats = {
			total: 0,
			attempt: 0,
			unattempt: 0
		}
	}

	show(exam: Exam, member: ExamMember) {
		this.display = true;
		this.exam = exam;
		this.member = member;
		this.examCode = this.exam.id + '' + this.member.id;
		this.qIndex = 0;
		this.height = $(window).height();
		this.createSubmission().subscribe((submit: Submission) => {
			this.submission = submit;
			QuestionSheet.byExam(this, this.exam.id).subscribe(sheet => {
				this.sheet = sheet;
				this.createExamQuestions().subscribe(examQuestions => {
					this.examQuestions = examQuestions;
					this.stats.total = examQuestions.length;
					this.startExam();
				});
			});
		});
	}

	createSubmission(): Observable<any> {
		return Submission.byMember(this, this.member.id).flatMap((submit: Submission) => {
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

	createExamQuestions(): Observable<any> {
		return ExamQuestion.listBySheet(this, this.sheet.id).map(examQuestions => {
			var offset = this.member.id;
			return _.map(examQuestions, (obj, order) => {
				var index = (order + this.sheet.seed + offset) % examQuestions.length;
				console.log(index);
				return examQuestions[index];
			});
		});
	}

	hide() {
		this.display = false;
	}

	fetchAnswers(): Observable<any> {
		if (this.submission.id)
			return Answer.listBySubmit(this, this.submission.id);
		else
			return Observable.of([]);
	}

	startExam() {
		this.member.enroll_status = 'in-progress';
		this.member.save(this).subscribe();
		ExamLog.startExam(this, this.member.user_id, this.exam.id, this.submission);
		this.fetchAnswers().subscribe(answers => {
			this.answers = answers;
			this.stats.attempt = answers.length;
			this.stats.unattempt = this.stats.total - this.stats.attempt;
			this.startTimer();
			this.displayQuestion(0);
		});
	}

	finishExam() {
		var subscriptions = [];
		this.member.enroll_status = 'completed';
		this.submission.end = new Date();
		subscriptions.push(this.member.save(this));
		subscriptions.push(this.submission.save(this));
		Observable.forkJoin(...subscriptions).subscribe(() => {
			ExamLog.finishExam(this, this.member.user_id, this.exam.id, this.submission);
			this.hide();
		});
	}

	prepareAnswer(question: ExamQuestion): Observable<any> {
		var answer = _.find(this.answers, (ans: Answer) => {
			return ans.question_id == question.question_id;
		});
		if (!answer) {
			var answer = new Answer();
			answer.submission_id = this.submission.id;
			answer.question_id = question.question_id;
			return answer.save(this).do(ans => {
				this.answers.push(answer);
				this.stats.attempt = this.answers.length;
				this.stats.unattempt = this.stats.total - this.stats.attempt;
			});
		} else
			return Observable.of(answer);
	}

	prepareQuestion(question: ExamQuestion): Observable<any> {
		return Question.get(this, question.question_id);
	}

	updateProgress() {
		var validAnswers = _.filter(this.answers, (ans: Answer) => {
			return ans.option_id != null || ans.text != null;
		});
		if (this.examQuestions.length)
			this.progress = Math.floor(validAnswers.length / this.examQuestions.length * 100)
	}

	displayQuestion(index: number) {
		this.qIndex = index;
		this.currentQuestion = this.examQuestions[index];
		this.prepareQuestion(this.currentQuestion).subscribe(question => {
			this.prepareAnswer(this.currentQuestion).subscribe(answer => {
				ExamLog.startAnswer(this, this.member.user_id, this.exam.id, answer);
				this.currentAnswer = answer;
				var detailComponent = QuestionRegister.Instance.lookup(question.type);
				let viewContainerRef = this.questionHost.viewContainerRef;
				if (detailComponent) {
					let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
					viewContainerRef.clear();
					this.componentRef = viewContainerRef.createComponent(componentFactory);
					(<IQuestion>this.componentRef.instance).mode = 'study';
					(<IQuestion>this.componentRef.instance).render(question, this.currentAnswer, {seed:this.member.id});
					this.updateProgress();
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
			ExamLog.finishAnswer(this, this.member.user_id, this.exam.id, this.currentAnswer);
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
			this.confirmationService.confirm({
				message: this.translateService.instant('Are you sure to submit ?'),
				accept: () => {
					this.timerSubject.next();
					this.finishExam();
				}
			});
		});
	}

	startTimer() {
		this.timerSubject = new Subject();
		var now = new Date();
		var elapse = Math.floor((now.getTime() - this.submission.start.getTime()));
		this.timeLeft = this.exam.duration * 60 * 1000 - elapse;
		if (this.timeLeft <= 0)
			this.finishExam();
		else {
			this.timer = Observable.timer(0, 1000);
			this.timer
				.takeUntil(this.timerSubject)
				.subscribe(() => {
					this.timeLeft -= 1000;
					if (this.timeLeft <= 0)
						this.finishExam();
				});
		}

	}
}
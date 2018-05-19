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
import { SubmissionDialog } from '../submission-dialog/submission.dialog.component';
import 'rxjs/add/observable/timer';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import { WindowRef } from '../../../shared/helpers/windonw.ref';
declare var $: any;

@Component({
	moduleId: module.id,
	selector: 'exam-study-dialog',
	templateUrl: 'exam-study.dialog.component.html',
	providers: [MessageService]
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
	currentAnswer: Answer;
	currentQuestion: ExamQuestion;
	timeLeft: number;
	progress: number;
	stats: any;
	validAnswer: number;
	private onShowReceiver: Subject<any> = new Subject();
    private onHideReceiver: Subject<any> = new Subject();
    onShow: Observable<any> = this.onShowReceiver.asObservable();
    onHide: Observable<any> = this.onHideReceiver.asObservable();

	@ViewChild(SubmissionDialog) submitDialog: SubmissionDialog;
	@ViewChild(QuestionContainerDirective) questionHost: QuestionContainerDirective;
	componentRef: any;

	constructor(private componentFactoryResolver: ComponentFactoryResolver, private window:WindowRef) {
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
		this.stats = {
			total: 0,
			attempt: 0,
			unattempt: 0
		}
		this.validAnswer = 0;
	}

	show(exam: Exam, member: ExamMember) {
		this.onShowReceiver.next();
		this.display = true;
		this.exam = exam;
		this.member = member;
		this.qIndex = 0;
		this.startTransaction();
		this.createSubmission().subscribe((submit: Submission) => {
			this.submission = submit;
			QuestionSheet.byExam(this, this.exam.id).subscribe(sheet => {
				this.sheet = sheet;
				this.createExamQuestions().subscribe(examQuestions => {
					this.examQuestions = examQuestions;
					this.stats.total = examQuestions.length;
					this.startExam();
					this.closeTransaction();
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
				var index = (order + offset) % examQuestions.length;
				return examQuestions[index];
			});
		});
	}

	hide() {
		this.display = false;
		this.onHideReceiver.next();
	}

	fetchAnswers(): Observable<any> {
		if (this.submission.id)
			return Answer.listBySubmit(this, this.submission.id);
		else
			return Observable.of([]);
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
		this.startTransaction();
		ExamLog.startExam(this, this.member.user_id, this.exam.id, this.submission).subscribe(()=> {
			this.fetchAnswers().subscribe(answers => {
				this.answers = answers;
				this.updateStats();
				this.startTimer();
				this.displayQuestion(0);
				this.closeTransaction();
			});
		});
		
	}

	finishExam() {
		var subscriptions = [];
		this.member.enroll_status = 'completed';
		this.submission.end = new Date();
		this.submission.score = _.reduce(this.answers,  (sum, ans)=> {return sum + (+ans.score);},0);
		subscriptions.push(this.member.save(this));
		subscriptions.push(this.submission.save(this));
		this.startTransaction();
		Observable.forkJoin(...subscriptions).subscribe(() => {
			ExamLog.finishExam(this, this.member.user_id, this.exam.id, this.submission).subscribe(()=> {
				this.hide();
				this.closeTransaction();
			})
			
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
			this.startTransaction();
			return answer.save(this).do(ans => {
				this.answers.push(answer);
				this.updateStats();
				this.closeTransaction();
			});
		} else
			return Observable.of(answer);
	}

	prepareQuestion(question: ExamQuestion): Observable<any> {
		return Question.get(this, question.question_id);
	}

	displayQuestion(index: number) {
		this.qIndex = index;
		this.currentQuestion = this.examQuestions[index];
		this.startTransaction();
		this.prepareQuestion(this.currentQuestion).subscribe(question => {
			this.prepareAnswer(this.currentQuestion).subscribe(answer => {
				ExamLog.startAnswer(this, this.member.user_id, this.exam.id, answer).subscribe(()=> {
					this.currentAnswer = answer;
					this.checkAnswer();
					var detailComponent = QuestionRegister.Instance.lookup(question.type);
					let viewContainerRef = this.questionHost.viewContainerRef;
					if (detailComponent) {
						let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
						viewContainerRef.clear();
						this.componentRef = viewContainerRef.createComponent(componentFactory);
						(<IQuestion>this.componentRef.instance).mode = 'study';
						(<IQuestion>this.componentRef.instance).render(question, this.currentAnswer);
						this.updateStats();
					}
					this.closeTransaction();
				});
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
			ExamLog.finishAnswer(this, this.member.user_id, this.exam.id, this.currentAnswer).subscribe();
		});
	}

	next() {
		this.startTransaction();
		this.submitAnswer().subscribe(() => {
			if (this.qIndex < this.examQuestions.length - 1) {
				this.displayQuestion(this.qIndex + 1);
			}
			this.closeTransaction();
		});
	}

	prev() {
		this.startTransaction();
		this.submitAnswer().subscribe(() => {
			if (this.qIndex > 0) {
				this.displayQuestion(this.qIndex - 1);
			}
			this.closeTransaction();
		});
	}

	submitExam() {
		this.startTransaction();
		this.submitAnswer().subscribe(() => {
			this.submitDialog.show(this.exam, this.submission);
			this.submitDialog.onConfirm.subscribe(()=> {
				this.finishExam();
			});
			this.closeTransaction();
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
						this.warn('A little minutes remaining!');
					if (this.timeLeft <= 0)
						this.finishExam();
				});
		}
	}

    checkAnswer() {
		var validQuestion = _.filter(this.answers, (ans: any) => {
			return ans.option_id ;
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
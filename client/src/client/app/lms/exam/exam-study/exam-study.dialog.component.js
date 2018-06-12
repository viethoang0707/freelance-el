"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var base_component_1 = require("../../../shared/components/base/base.component");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var exam_model_1 = require("../../../shared/models/elearning/exam.model");
var submission_model_1 = require("../../../shared/models/elearning/submission.model");
var question_model_1 = require("../../../shared/models/elearning/question.model");
var question_sheet_model_1 = require("../../../shared/models/elearning/question-sheet.model");
var answer_model_1 = require("../../../shared/models/elearning/answer.model");
var exam_question_model_1 = require("../../../shared/models/elearning/exam-question.model");
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var log_model_1 = require("../../../shared/models/elearning/log.model");
var question_container_directive_1 = require("../../../assessment/question/question-template/question-container.directive");
var question_decorator_1 = require("../../../assessment/question/question-template/question.decorator");
var exam_submission_dialog_component_1 = require("../exam-submit/exam-submission.dialog.component");
require("rxjs/add/observable/timer");
var messageservice_1 = require("primeng/components/common/messageservice");
var ExamStudyDialog = (function (_super) {
    __extends(ExamStudyDialog, _super);
    function ExamStudyDialog(componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.onShowReceiver = new Rx_1.Subject();
        _this.onHideReceiver = new Rx_1.Subject();
        _this.onShow = _this.onShowReceiver.asObservable();
        _this.onHide = _this.onHideReceiver.asObservable();
        _this.display = false;
        _this.examQuestions = [];
        _this.answers = [];
        _this.exam = new exam_model_1.Exam();
        _this.sheet = new question_sheet_model_1.QuestionSheet();
        _this.currentQuestion = new exam_question_model_1.ExamQuestion();
        _this.timeLeft = 0;
        _this.progress = 0;
        _this.member = new exam_member_model_1.ExamMember();
        _this.stats = {
            total: 0,
            attempt: 0,
            unattempt: 0
        };
        _this.validAnswer = 0;
        _this.WINDOW_HEIGHT = $(window).height();
        return _this;
    }
    ExamStudyDialog.prototype.show = function (exam, member) {
        var _this = this;
        this.onShowReceiver.next();
        this.display = true;
        this.exam = exam;
        this.member = member;
        this.qIndex = 0;
        this.createSubmission().subscribe(function (submit) {
            _this.submission = submit;
            question_sheet_model_1.QuestionSheet.byExam(_this, _this.exam.id).subscribe(function (sheet) {
                _this.sheet = sheet;
                _this.createExamQuestions().subscribe(function (examQuestions) {
                    _this.examQuestions = examQuestions;
                    _this.stats.total = examQuestions.length;
                    _this.startExam();
                });
            });
        });
    };
    ExamStudyDialog.prototype.createSubmission = function () {
        var _this = this;
        return submission_model_1.Submission.byMemberAndExam(this, this.member.id, this.exam.id).flatMap(function (submit) {
            if (!submit) {
                submit = new submission_model_1.Submission();
                submit.member_id = _this.member.id;
                submit.start = new Date();
                return submit.save(_this);
            }
            else {
                return Rx_1.Observable.of(submit);
            }
        });
    };
    ExamStudyDialog.prototype.createExamQuestions = function () {
        var _this = this;
        return exam_question_model_1.ExamQuestion.listBySheet(this, this.sheet.id).map(function (examQuestions) {
            var offset = _this.member.id;
            return _.map(examQuestions, function (obj, order) {
                var index = (order + offset) % examQuestions.length;
                return examQuestions[index];
            });
        });
    };
    ExamStudyDialog.prototype.hide = function () {
        this.display = false;
        this.onHideReceiver.next();
    };
    ExamStudyDialog.prototype.fetchAnswers = function () {
        if (this.submission.id)
            return answer_model_1.Answer.listBySubmit(this, this.submission.id);
        else
            return Rx_1.Observable.of([]);
    };
    ExamStudyDialog.prototype.updateStats = function () {
        var validAnswers = _.filter(this.answers, function (ans) {
            return ans.option_id != "" && ans.option_id != "0";
        });
        if (validAnswers.length > 0) {
            this.validAnswer = validAnswers.length;
        }
        else {
            this.validAnswer = 0;
        }
        this.stats.attempt = this.validAnswer;
        this.stats.unattempt = this.stats.total - this.stats.attempt;
        this.progress = Math.floor(validAnswers.length / this.examQuestions.length * 100);
    };
    ExamStudyDialog.prototype.startExam = function () {
        var _this = this;
        this.member.enroll_status = 'in-progress';
        this.member.save(this).subscribe();
        log_model_1.ExamLog.startExam(this, this.member.id, this.submission.id).subscribe(function () {
            _this.fetchAnswers().subscribe(function (answers) {
                _this.answers = answers;
                _this.updateStats();
                _this.startTimer();
                _this.displayQuestion(0);
            });
        });
    };
    ExamStudyDialog.prototype.finishExam = function () {
        var _this = this;
        var subscriptions = [];
        this.member.enroll_status = 'completed';
        this.submission.end = new Date();
        this.submission.score = _.reduce(this.answers, function (sum, ans) { return sum + (+ans.score); }, 0);
        subscriptions.push(this.member.save(this));
        subscriptions.push(this.submission.save(this));
        Rx_1.Observable.forkJoin.apply(Rx_1.Observable, subscriptions).subscribe(function () {
            log_model_1.ExamLog.finishExam(_this, _this.member.id, _this.submission.id).subscribe(function () {
                _this.hide();
            });
        });
    };
    ExamStudyDialog.prototype.prepareAnswer = function (question) {
        var _this = this;
        var answer = _.find(this.answers, function (ans) {
            return ans.question_id == question.question_id;
        });
        if (!answer) {
            var answer = new answer_model_1.Answer();
            answer.option_id = 0;
            answer.submission_id = this.submission.id;
            answer.question_id = question.question_id;
            return answer.save(this).do(function (ans) {
                _this.answers.push(answer);
                _this.updateStats();
            });
        }
        else
            return Rx_1.Observable.of(answer);
    };
    ExamStudyDialog.prototype.prepareQuestion = function (question) {
        return question_model_1.Question.get(this, question.question_id);
    };
    ExamStudyDialog.prototype.displayQuestion = function (index) {
        var _this = this;
        this.qIndex = index;
        this.currentQuestion = this.examQuestions[index];
        this.prepareQuestion(this.currentQuestion).subscribe(function (question) {
            _this.prepareAnswer(_this.currentQuestion).subscribe(function (answer) {
                log_model_1.ExamLog.startAnswer(_this, _this.member.id, answer.id).subscribe(function () {
                    _this.currentAnswer = answer;
                    _this.checkAnswer();
                    var detailComponent = question_decorator_1.QuestionRegister.Instance.lookup(question.type);
                    var viewContainerRef = _this.questionHost.viewContainerRef;
                    if (detailComponent) {
                        var componentFactory = _this.componentFactoryResolver.resolveComponentFactory(detailComponent);
                        viewContainerRef.clear();
                        _this.componentRef = viewContainerRef.createComponent(componentFactory);
                        _this.componentRef.instance.mode = 'study';
                        _this.componentRef.instance.render(question, _this.currentAnswer);
                        _this.updateStats();
                    }
                });
            });
        });
    };
    ExamStudyDialog.prototype.submitAnswer = function () {
        var _this = this;
        this.componentRef.instance.concludeAnswer();
        if (this.currentAnswer.is_correct) {
            this.currentAnswer.score = this.currentQuestion.score;
        }
        else
            this.currentAnswer.score = 0;
        return this.currentAnswer.save(this).do(function () {
            log_model_1.ExamLog.finishAnswer(_this, _this.member.id, _this.currentAnswer.id).subscribe();
        });
    };
    ExamStudyDialog.prototype.next = function () {
        var _this = this;
        this.submitAnswer().subscribe(function () {
            if (_this.qIndex < _this.examQuestions.length - 1) {
                _this.displayQuestion(_this.qIndex + 1);
            }
        });
    };
    ExamStudyDialog.prototype.prev = function () {
        var _this = this;
        this.submitAnswer().subscribe(function () {
            if (_this.qIndex > 0) {
                _this.displayQuestion(_this.qIndex - 1);
            }
        });
    };
    ExamStudyDialog.prototype.submitExam = function () {
        var _this = this;
        this.submitAnswer().subscribe(function () {
            _this.submitDialog.show(_this.exam, _this.submission);
            _this.submitDialog.onConfirm.subscribe(function () {
                _this.finishExam();
            });
        });
    };
    ExamStudyDialog.prototype.startTimer = function () {
        var _this = this;
        var now = new Date();
        var elapse = Math.floor((now.getTime() - this.submission.start.getTime()));
        this.timeLeft = this.exam.duration * 60 * 1000 - elapse;
        if (this.timeLeft <= 0)
            this.finishExam();
        else {
            this.timer = Rx_1.Observable.timer(0, 1000);
            this.timer
                .takeUntil(new Rx_1.Subject())
                .subscribe(function () {
                _this.timeLeft -= 1000;
                if (_this.timeLeft <= constants_1.EXAM_TIME_WARNING && _this.timeLeft > constants_1.EXAM_TIME_WARNING - 1000)
                    _this.warn('A little minutes remaining!');
                if (_this.timeLeft <= 0)
                    _this.finishExam();
            });
        }
    };
    ExamStudyDialog.prototype.checkAnswer = function () {
        var validQuestion = _.filter(this.answers, function (ans) {
            return ans.option_id;
        });
        this.examQuestions.forEach(function (ques) {
            validQuestion.forEach(function (answer) {
                if (answer.question_id === ques.question_id) {
                    ques.checkAnswer = true;
                }
            });
        });
    };
    __decorate([
        core_1.ViewChild(exam_submission_dialog_component_1.ExamSubmissionDialog),
        __metadata("design:type", exam_submission_dialog_component_1.ExamSubmissionDialog)
    ], ExamStudyDialog.prototype, "submitDialog", void 0);
    __decorate([
        core_1.ViewChild(question_container_directive_1.QuestionContainerDirective),
        __metadata("design:type", question_container_directive_1.QuestionContainerDirective)
    ], ExamStudyDialog.prototype, "questionHost", void 0);
    ExamStudyDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-study-dialog',
            templateUrl: 'exam-study.dialog.component.html',
            providers: [messageservice_1.MessageService]
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], ExamStudyDialog);
    return ExamStudyDialog;
}(base_component_1.BaseComponent));
exports.ExamStudyDialog = ExamStudyDialog;
//# sourceMappingURL=exam-study.dialog.component.js.map
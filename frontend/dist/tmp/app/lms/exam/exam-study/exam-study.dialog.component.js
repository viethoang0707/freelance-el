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
var base_model_1 = require("../../../shared/models/base.model");
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
        if (this.exam.sheet_status != 'published') {
            this.error('Exam content has not been published');
            return;
        }
        submission_model_1.Submission.get(this, this.member.submission_id).subscribe(function (submit) {
            _this.submission = submit;
            _this.submission.start = new Date();
            question_sheet_model_1.QuestionSheet.get(_this, _this.exam.sheet_id).subscribe(function (sheet) {
                _this.sheet = sheet;
                if (_this.sheet.status != 'published') {
                    _this.error('Exam content has not been pubished');
                    return;
                }
                base_model_1.BaseModel.bulk_search(_this, exam_question_model_1.ExamQuestion.__api__listBySheet(_this.sheet.id), answer_model_1.Answer.__api__listBySubmit(_this.submission.id))
                    .subscribe(function (jsonArr) {
                    _this.examQuestions = _this.prepareExamQuestions(exam_question_model_1.ExamQuestion.toArray(jsonArr[0]));
                    _this.answers = answer_model_1.Answer.toArray(jsonArr[1]);
                    exam_question_model_1.ExamQuestion.populateQuestions(_this, _this.examQuestions).subscribe(function () {
                        var questions = _.map(_this.examQuestions, function (examQuestion) {
                            return examQuestion.question;
                        });
                        question_model_1.Question.populateOptions(_this, questions).subscribe(function () {
                            _this.startExam();
                        });
                    });
                });
            });
        });
    };
    ExamStudyDialog.prototype.prepareExamQuestions = function (examQuestions) {
        var offset = this.member.id;
        return _.map(examQuestions, function (obj, order) {
            var index = (order + offset) % examQuestions.length;
            return examQuestions[index];
        });
    };
    ExamStudyDialog.prototype.hide = function () {
        this.display = false;
        this.onHideReceiver.next();
    };
    ExamStudyDialog.prototype.updateStats = function () {
        this.stats.total = this.examQuestions.length;
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
        this.member.enroll_status = 'in-progress';
        this.member.save(this).subscribe();
        log_model_1.ExamLog.startExam(this, this.member.id, this.submission.id).subscribe();
        this.updateStats();
        this.startTimer();
        this.displayQuestion(0);
    };
    ExamStudyDialog.prototype.finishExam = function () {
        var _this = this;
        this.submission.end = new Date();
        this.submission.save(this).subscribe(function () {
            _this.member.submitScore(_this).subscribe(function () {
                _this.member.enroll_status = 'completed';
                log_model_1.ExamLog.finishExam(_this, _this.member.id, _this.submission.id).subscribe();
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
    ExamStudyDialog.prototype.displayQuestion = function (index) {
        var _this = this;
        this.qIndex = index;
        this.currentQuestion = this.examQuestions[index];
        this.prepareAnswer(this.currentQuestion).subscribe(function (answer) {
            log_model_1.ExamLog.startAnswer(_this, _this.member.id, answer.id).subscribe(function () {
                _this.currentAnswer = answer;
                _this.checkAnswer();
                var detailComponent = question_decorator_1.QuestionRegister.Instance.lookup(_this.currentQuestion.question.type);
                var viewContainerRef = _this.questionHost.viewContainerRef;
                if (detailComponent) {
                    var componentFactory = _this.componentFactoryResolver.resolveComponentFactory(detailComponent);
                    viewContainerRef.clear();
                    _this.componentRef = viewContainerRef.createComponent(componentFactory);
                    _this.componentRef.instance.mode = 'study';
                    _this.componentRef.instance.render(_this.currentQuestion.question, _this.currentAnswer);
                    _this.updateStats();
                }
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
                    _this.warn(_this.translateService.instant('A little minutes remaining!'));
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
            template: "<div class=\"ui-g exam-study\">   <p-dialog [(visible)]=\"display\" modal=\"true\" [height]=\"WINDOW_HEIGHT\" positionLeft=\"0\" positionTop=\"0\" styleClass=\"ui-g-12\"     [responsive]=\"true\" [closeOnEscape]=\"false\" [closable]=\"false\">     <div class=\"spinner\" [hidden]=\"!loading\"></div>     <p-growl ></p-growl>     <div class=\"ui-g-12 ui-lg-12 ui-md-12 removePd\">       <div class=\"ui-lg-6 ui-md-12 ui-g-12 removePd\">         <div class=\"ui-lg-6 ui-md-6 ui-g-6 removePd\">           <h4 class=\"mt10 mb10\">{{'Exam Name'|translate}}:</h4>         </div>         <div class=\"ui-lg-6 ui-md-6 ui-g-6 removePd\">           <h4 class=\"mt10 mb10\">{{exam.name}}</h4>         </div>         <div class=\"ui-lg-6 ui-md-6 ui-g-6 removePd\">           <h4 class=\"mt10 mb10\">{{'Name Member'|translate}}:</h4>         </div>         <div class=\"ui-lg-6 ui-md-6 ui-g-6 removePd\">           <h4 class=\"mt10 mb10\">{{member.name}}</h4>         </div>         <div class=\"ui-lg-6 ui-md-6 ui-g-6 removePd\">           <h4 class=\"mt10 mb10\">{{'Username'|translate}}:</h4>         </div>         <div class=\"ui-lg-6 ui-md-6 ui-g-6 removePd\">           <h4 class=\"mt10 mb10\">{{member.login}}</h4>         </div>       </div>       <div class=\"ui-lg-6 ui-md-12 ui-g-12 removePd\">         <div class=\"ui-lg-6 ui-md-6 ui-g-6 removePd\">           <h4 class=\"mt10 mb10\">{{'Exam Date'|translate}}:</h4>         </div>         <div class=\"ui-lg-6 ui-md-6 ui-g-6 removePd\">           <h4 class=\"mt10 mb10\">{{exam.start | date : \"dd/MM/yyyy\"}}</h4>         </div>         <div class=\"ui-lg-6 ui-md-6 ui-g-6 removePd\">           <h4 class=\"mt10 mb10\">{{'Exam Code'|translate}}:</h4>         </div>         <div class=\"ui-lg-6 ui-md-6 ui-g-6 removePd\">           <h4 class=\"mt10 mb10\">{{ exam.id + '' + member.id }}</h4>         </div>       </div>       <div class=\"clear mb20\"></div>       <div class=\"ui-g-12 ui-md-12 ui-lg-12\">         <p-card>           <p-header>             <span class=\"exam-question-title fLeft mt5 ml5 txtBold\">               {{'Question'|translate}} {{(qIndex+1) +'/' + examQuestions.length}} {{'-' + currentQuestion.title}}             </span>             <div class=\"exam-timer fRight mr5 txtBold\">               <i class=\"material-icons fLeft mt3\">access_time</i>               <span class=\"mt5 dpInB\">{{ timeLeft | clock }}</span>             </div>             <div class=\"clear\"></div>             <p-progressBar [value]=\"progress\"></p-progressBar>           </p-header>           <div class=\"ui-g\">             <div class=\"ui-lg-8 ui-md-12 ui-g-12\">               <ng-template question-container></ng-template>             </div>             <div class=\"ui-lg-4 ui-md-12 ui-g-12\">               <ul class=\"list-cmt\">                 <li class=\"clearfix ui-messages-info remove-background remove-border\">                   <span class=\"cmt-title\">{{'Total question'|translate}}:</span>                   <span class=\"cmt-detail\">{{stats.total}}</span>                 </li>                 <li class=\"clearfix ui-messages-success remove-background remove-border\">                   <span class=\"cmt-title\">{{'Total attempt'|translate}}:</span>                   <span class=\"cmt-detail\">{{stats.attempt}}</span>                 </li>                 <li class=\"clearfix ui-messages-error remove-background remove-border\">                   <span class=\"cmt-title\">{{'Total unattempt'|translate}}:</span>                   <span class=\"cmt-detail\">{{stats.unattempt}}</span>                 </li>               </ul>               <div>                 <div class=\"dpInB fLeft\" *ngFor=\"let question of examQuestions; let i = index\">                   <button type=\"button\" pButton [ngClass]=\"{'mt10': true, 'lineHeight2-25': true, 'ui-button-success':question.checkAnswer}\"                     (click)=\"displayQuestion(i)\">{{ i + 1 }}</button>                 </div>                 <div class=\"clear\"></div>                 <div>                   <p-messages [(value)]=\"msgs\"></p-messages>                 </div>               </div>             </div>           </div>           <exam-submission-dialog></exam-submission-dialog>           <p-footer>             <button pButton type=\"button\" icon=\"ui-icon-navigate-before\" title=\"{{'Previous'|translate}}\" label=\"{{'Previous'|translate}}\"               class=\" blue-grey-btn\" style=\"margin-right:4px;\" (click)=\"prev()\" *ngIf=\"qIndex >0 \"></button>             <button pButton type=\"button\" icon=\"ui-icon-navigate-next\" title=\"{{'Next'|translate}}\" label=\"{{'Next'|translate}}\" class=\" blue-grey-btn\"               style=\"margin-right:4px;\" (click)=\"next()\" *ngIf=\"qIndex < examQuestions.length-1\"></button>             <button pButton type=\"button\" icon=\"ui-icon-check\" title=\"{{'Submit'|translate}}\" label=\"{{'Submit'|translate}}\" class=\" green-btn btn-submit-exam\"               (click)=\"submitExam()\"></button>           </p-footer>         </p-card>       </div>     </div>   </p-dialog> </div>",
            providers: [messageservice_1.MessageService]
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], ExamStudyDialog);
    return ExamStudyDialog;
}(base_component_1.BaseComponent));
exports.ExamStudyDialog = ExamStudyDialog;

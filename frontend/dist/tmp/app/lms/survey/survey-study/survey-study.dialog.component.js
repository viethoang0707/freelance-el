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
var survey_model_1 = require("../../../shared/models/elearning/survey.model");
var survey_submission_model_1 = require("../../../shared/models/elearning/survey-submission.model");
var question_model_1 = require("../../../shared/models/elearning/question.model");
var survey_sheet_model_1 = require("../../../shared/models/elearning/survey-sheet.model");
var survey_answer_model_1 = require("../../../shared/models/elearning/survey-answer.model");
var survey_question_model_1 = require("../../../shared/models/elearning/survey-question.model");
var survey_member_model_1 = require("../../../shared/models/elearning/survey-member.model");
var question_container_directive_1 = require("../../../assessment/question/question-template/question-container.directive");
var question_decorator_1 = require("../../../assessment/question/question-template/question.decorator");
require("rxjs/add/observable/timer");
var messageservice_1 = require("primeng/components/common/messageservice");
var base_model_1 = require("../../../shared/models/base.model");
var SurveyStudyDialog = (function (_super) {
    __extends(SurveyStudyDialog, _super);
    function SurveyStudyDialog(componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.onShowReceiver = new Rx_1.Subject();
        _this.onHideReceiver = new Rx_1.Subject();
        _this.onShow = _this.onShowReceiver.asObservable();
        _this.onHide = _this.onHideReceiver.asObservable();
        _this.display = false;
        _this.surveyQuestions = [];
        _this.answers = [];
        _this.survey = new survey_model_1.Survey();
        _this.sheet = new survey_sheet_model_1.SurveySheet();
        _this.currentQuestion = new survey_question_model_1.SurveyQuestion();
        _this.progress = 0;
        _this.member = new survey_member_model_1.SurveyMember();
        _this.stats = {
            total: 0,
            attempt: 0,
            unattempt: 0
        };
        _this.validAnswer = 0;
        _this.WINDOW_HEIGHT = $(window).height();
        return _this;
    }
    SurveyStudyDialog.prototype.show = function (survey, member) {
        var _this = this;
        this.onShowReceiver.next();
        this.display = true;
        this.survey = survey;
        this.member = member;
        this.qIndex = 0;
        if (this.survey.sheet_status != 'published') {
            this.error('Exam content has not been published');
            return;
        }
        survey_submission_model_1.SurveySubmission.get(this, this.member.submission_id).subscribe(function (submit) {
            _this.submission = submit;
            _this.submission.start = new Date();
            survey_sheet_model_1.SurveySheet.get(_this, _this.survey.sheet_id).subscribe(function (sheet) {
                _this.sheet = sheet;
                base_model_1.BaseModel.bulk_search(_this, survey_question_model_1.SurveyQuestion.__api__listBySheet(_this.sheet.id), survey_answer_model_1.SurveyAnswer.__api__listBySubmit(_this.submission.id))
                    .subscribe(function (jsonArr) {
                    _this.surveyQuestions = survey_question_model_1.SurveyQuestion.toArray(jsonArr[0]);
                    _this.answers = survey_answer_model_1.SurveyAnswer.toArray(jsonArr[1]);
                    _this.stats.total = _this.surveyQuestions.length;
                    survey_question_model_1.SurveyQuestion.populateQuestions(_this, _this.surveyQuestions).subscribe(function () {
                        var questions = _.map(_this.surveyQuestions, function (surveyQuestion) {
                            return surveyQuestion.question;
                        });
                        question_model_1.Question.populateOptions(_this, questions).subscribe(function () {
                            _this.startSurvey();
                        });
                    });
                });
            });
        });
    };
    SurveyStudyDialog.prototype.hide = function () {
        this.display = false;
        this.onHideReceiver.next();
    };
    SurveyStudyDialog.prototype.updateStats = function () {
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
        this.progress = Math.floor(validAnswers.length / this.surveyQuestions.length * 100);
    };
    SurveyStudyDialog.prototype.startSurvey = function () {
        this.updateStats();
        this.displayQuestion(0);
    };
    SurveyStudyDialog.prototype.prepareAnswer = function (question) {
        var _this = this;
        var answer = _.find(this.answers, function (ans) {
            return ans.question_id == question.question_id;
        });
        if (!answer) {
            var answer = new survey_answer_model_1.SurveyAnswer();
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
    SurveyStudyDialog.prototype.displayQuestion = function (index) {
        var _this = this;
        this.qIndex = index;
        this.currentQuestion = this.surveyQuestions[index];
        this.prepareAnswer(this.currentQuestion).subscribe(function (answer) {
            _this.currentAnswer = answer;
            var detailComponent = question_decorator_1.QuestionRegister.Instance.lookup(_this.currentQuestion.question.type);
            var viewContainerRef = _this.questionHost.viewContainerRef;
            if (detailComponent) {
                var componentFactory = _this.componentFactoryResolver.resolveComponentFactory(detailComponent);
                viewContainerRef.clear();
                _this.componentRef = viewContainerRef.createComponent(componentFactory);
                _this.componentRef.instance.mode = 'survey';
                _this.componentRef.instance.render(_this.currentQuestion.question, _this.currentAnswer);
                _this.updateStats();
            }
        });
    };
    SurveyStudyDialog.prototype.submitAnswer = function () {
        return this.currentAnswer.save(this);
    };
    SurveyStudyDialog.prototype.next = function () {
        var _this = this;
        this.submitAnswer().subscribe(function () {
            if (_this.qIndex < _this.surveyQuestions.length - 1) {
                _this.displayQuestion(_this.qIndex + 1);
            }
        });
    };
    SurveyStudyDialog.prototype.prev = function () {
        var _this = this;
        this.submitAnswer().subscribe(function () {
            if (_this.qIndex > 0) {
                _this.displayQuestion(_this.qIndex - 1);
            }
        });
    };
    SurveyStudyDialog.prototype.submitSurvey = function () {
        var _this = this;
        this.member.enroll_status = 'completed';
        this.submission.end = new Date();
        this.member.save(this).subscribe(function () {
            _this.submission.save(_this).subscribe(function () {
                _this.hide();
            });
        });
    };
    __decorate([
        core_1.ViewChild(question_container_directive_1.QuestionContainerDirective),
        __metadata("design:type", question_container_directive_1.QuestionContainerDirective)
    ], SurveyStudyDialog.prototype, "questionHost", void 0);
    SurveyStudyDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'survey-study-dialog',
            template: "<div class=\"ui-g\"> <p-dialog [(visible)]=\"display\" modal=\"true\" [height]=\"WINDOW_HEIGHT\" positionLeft=\"0\" positionTop=\"0\" styleClass=\"ui-g-12\" [responsive]=\"true\" [closeOnEscape]=\"false\" [closable]=\"false\">   <div class=\"spinner\" [hidden]=\"!loading\"></div>   <p-growl ></p-growl>   <div class=\"ui-lg-12 ui-md-12 ui-g-12 removePd\">     <div class=\"ui-lg-6 ui-md-12 ui-g-12 removePd\">       <div class=\"ui-lg-6 ui-md-6 ui-g-6 removePd\">         <h4 class=\"mt10 mb10\">{{'Survey Name'|translate}}:</h4>       </div>       <div class=\"ui-lg-6 ui-md-6 ui-g-6 removePd\">         <h4 class=\"mt10 mb10\">{{survey.name}}</h4>       </div>       <div class=\"ui-lg-6 ui-md-6 ui-g-6 removePd\">         <h4 class=\"mt10 mb10\">{{'Name Member'|translate}}:</h4>       </div>       <div class=\"ui-lg-6 ui-md-6 ui-g-6 removePd\">         <h4 class=\"mt10 mb10\">{{member.name}}</h4>       </div>       <div class=\"ui-lg-6 ui-md-6 ui-g-6 removePd\">         <h4 class=\"mt10 mb10\">{{'Username'|translate}}:</h4>       </div>       <div class=\"ui-lg-6 ui-md-6 ui-g-6 removePd\">         <h4 class=\"mt10 mb10\">{{member.login}}</h4>       </div>     </div>     <div class=\"ui-lg-6 ui-md-12 ui-g-12 removePd\">       <div class=\"ui-lg-6 ui-md-6 ui-g-6 removePd\">         <h4 class=\"mt10 mb10\">{{'Survey Date'|translate}}:</h4>       </div>       <div class=\"ui-lg-6 ui-md-6 ui-g-6 removePd\">         <h4 class=\"mt10 mb10\">{{survey.start | date : \"dd/MM/yyyy\"}}</h4>       </div>     </div>   </div>   <div class=\"clear mb20\"></div>   <div class=\"ui-g-12 ui-md-12 ui-lg-12\">     <p-card>       <p-header>         <span class=\"exam-question-title fLeft mt5 ml5 txtBold\">           {{'Question'|translate}} {{(qIndex+1) +'/' + surveyQuestions.length}} {{'-' + currentQuestion.title}}         </span>         <div class=\"clear\"></div>         <p-progressBar [value]=\"progress\"></p-progressBar>       </p-header>       <div class=\"ui-g\">         <div class=\"ui-lg-8 ui-md-12 ui-g-12\">           <ng-template question-container></ng-template>         </div>         <div class=\"ui-lg-4 ui-md-12 ui-g-12\">           <ul class=\"list-cmt\">             <li class=\"clearfix ui-messages-info remove-background remove-border\">               <span class=\"cmt-title\">{{'Total question'|translate}}:</span>               <span class=\"cmt-detail\">{{stats.total}}</span>             </li>             <li class=\"clearfix ui-messages-success remove-background remove-border\">               <span class=\"cmt-title\">{{'Total attempt'|translate}}:</span>               <span class=\"cmt-detail\">{{stats.attempt}}</span>             </li>             <li class=\"clearfix ui-messages-error remove-background remove-border\">               <span class=\"cmt-title\">{{'Total unattempt'|translate}}:</span>               <span class=\"cmt-detail\">{{stats.unattempt}}</span>             </li>           </ul>           <div>             <div class=\"dpInB fLeft\" *ngFor=\"let question of surveyQuestions; let i = index\">               <button type=\"button\" pButton [ngClass]=\"{'mt10': true, 'lineHeight2-25': true, 'ui-button-success':question.checkAnswer}\"                 (click)=\"displayQuestion(i)\">{{ i + 1 }}</button>             </div>             <div class=\"clear\"></div>             <div>               <p-messages [(value)]=\"msgs\"></p-messages>             </div>           </div>         </div>       </div>       <p-footer>         <button pButton type=\"button\" icon=\"ui-icon-navigate-before\" title=\"{{'Previous'|translate}}\" label=\"{{'Previous'|translate}}\"           class=\" blue-grey-btn\" style=\"margin-right:4px;\" (click)=\"prev()\" *ngIf=\"qIndex >0 \"></button>         <button pButton type=\"button\" icon=\"ui-icon-navigate-next\" title=\"{{'Next'|translate}}\" label=\"{{'Next'|translate}}\" class=\" blue-grey-btn\"           style=\"margin-right:4px;\" (click)=\"next()\" *ngIf=\"qIndex < surveyQuestions.length-1\"></button>         <button pButton type=\"button\" icon=\"ui-icon-check\" title=\"{{'Submit'|translate}}\" label=\"{{'Submit'|translate}}\" class=\" green-btn\" style=\"margin-left: 550px;\" (click)=\"submitSurvey()\" ></button>       </p-footer>     </p-card>   </div> </p-dialog> </div>",
            providers: [messageservice_1.MessageService]
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], SurveyStudyDialog);
    return SurveyStudyDialog;
}(base_component_1.BaseComponent));
exports.SurveyStudyDialog = SurveyStudyDialog;

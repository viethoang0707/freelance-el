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
            templateUrl: 'survey-study.dialog.component.html',
            providers: [messageservice_1.MessageService]
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], SurveyStudyDialog);
    return SurveyStudyDialog;
}(base_component_1.BaseComponent));
exports.SurveyStudyDialog = SurveyStudyDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvc3VydmV5L3N1cnZleS1zdHVkeS9zdXJ2ZXktc3R1ZHkuZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBOEY7QUFDOUYsOEJBQThDO0FBQzlDLGlGQUErRTtBQUcvRSw4QkFBZ0M7QUFFaEMsOEVBQXVFO0FBQ3ZFLG9HQUE0RjtBQUM1RixrRkFBMkU7QUFDM0UsMEZBQWtGO0FBQ2xGLDRGQUFvRjtBQUNwRixnR0FBd0Y7QUFDeEYsNEZBQW9GO0FBS3BGLDRIQUF5SDtBQUV6SCx3R0FBcUc7QUFDckcscUNBQW1DO0FBRW5DLDJFQUF3RTtBQUV4RSxnRUFBOEQ7QUFXOUQ7SUFBdUMscUNBQWE7SUEwQm5ELDJCQUFvQix3QkFBa0Q7UUFBdEUsWUFDQyxpQkFBTyxTQWdCUDtRQWpCbUIsOEJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQVI5RCxvQkFBYyxHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQzFDLG9CQUFjLEdBQWlCLElBQUksWUFBTyxFQUFFLENBQUM7UUFFckQsWUFBTSxHQUFvQixLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzdELFlBQU0sR0FBb0IsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQU0vRCxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixLQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixLQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixLQUFJLENBQUMsTUFBTSxHQUFHLElBQUkscUJBQU0sRUFBRSxDQUFDO1FBQzNCLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxnQ0FBVyxFQUFFLENBQUM7UUFDL0IsS0FBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLHNDQUFjLEVBQUUsQ0FBQztRQUM1QyxLQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztR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QSxpQkFTQztRQVJBLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztRQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUNoQyxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ3BDLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNiLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFFSCxDQUFDO0lBckpzQztRQUF0QyxnQkFBUyxDQUFDLHlEQUEwQixDQUFDO2tDQUFlLHlEQUEwQjsyREFBQztJQXhCcEUsaUJBQWlCO1FBTjdCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixXQUFXLEVBQUUsb0NBQW9DO1lBQ2pELFNBQVMsRUFBRSxDQUFDLCtCQUFjLENBQUM7U0FDM0IsQ0FBQzt5Q0EyQjZDLCtCQUF3QjtPQTFCMUQsaUJBQWlCLENBK0s3QjtJQUFELHdCQUFDO0NBL0tELEFBK0tDLENBL0tzQyw4QkFBYSxHQStLbkQ7QUEvS1ksOENBQWlCIiwiZmlsZSI6ImFwcC9sbXMvc3VydmV5L3N1cnZleS1zdHVkeS9zdXJ2ZXktc3R1ZHkuZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBHUk9VUF9DQVRFR09SWSwgRVhBTV9TVEFUVVMsIEVYQU1fVElNRV9XQVJOSU5HIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBTdXJ2ZXkgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXkubW9kZWwnO1xuaW1wb3J0IHsgU3VydmV5U3VibWlzc2lvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1cnZleS1zdWJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgU3VydmV5U2hlZXQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXktc2hlZXQubW9kZWwnO1xuaW1wb3J0IHsgU3VydmV5QW5zd2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VydmV5LWFuc3dlci5tb2RlbCc7XG5pbXBvcnQgeyBTdXJ2ZXlRdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1cnZleS1xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBTdXJ2ZXlNZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXktbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgRXhhbUxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2xvZy5tb2RlbCc7XG5pbXBvcnQgeyBDbG9ja1BpcGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvcGlwZXMvdGltZS5waXBlJztcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBRdWVzdGlvbkNvbnRhaW5lckRpcmVjdGl2ZSB9IGZyb20gJy4uLy4uLy4uL2Fzc2Vzc21lbnQvcXVlc3Rpb24vcXVlc3Rpb24tdGVtcGxhdGUvcXVlc3Rpb24tY29udGFpbmVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBJUXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL3F1ZXN0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBRdWVzdGlvblJlZ2lzdGVyIH0gZnJvbSAnLi4vLi4vLi4vYXNzZXNzbWVudC9xdWVzdGlvbi9xdWVzdGlvbi10ZW1wbGF0ZS9xdWVzdGlvbi5kZWNvcmF0b3InO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL3RpbWVyJztcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSAncHJpbWVuZy9jb21wb25lbnRzL2NvbW1vbi9hcGknO1xuaW1wb3J0IHtNZXNzYWdlU2VydmljZX0gZnJvbSAncHJpbWVuZy9jb21wb25lbnRzL2NvbW1vbi9tZXNzYWdlc2VydmljZSc7XG5pbXBvcnQgeyBXaW5kb3dSZWYgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy93aW5kb253LnJlZic7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xuXG5cbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnc3VydmV5LXN0dWR5LWRpYWxvZycsXG5cdHRlbXBsYXRlVXJsOiAnc3VydmV5LXN0dWR5LmRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG5cdHByb3ZpZGVyczogW01lc3NhZ2VTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlTdHVkeURpYWxvZyBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG5cdFdJTkRPV19IRUlHSFQ6YW55O1xuXG5cdHByaXZhdGUgZGlzcGxheTogYm9vbGVhbjtcblx0cHJpdmF0ZSBzdXJ2ZXk6IFN1cnZleTtcblx0cHJpdmF0ZSBtZW1iZXI6IFN1cnZleU1lbWJlcjtcblx0cHJpdmF0ZSBzaGVldDogU3VydmV5U2hlZXQ7XG5cdHByaXZhdGUgcXVlc3Rpb25zOiBRdWVzdGlvbltdO1xuXHRwcml2YXRlIHFJbmRleDogbnVtYmVyO1xuXHRwcml2YXRlIHN1cnZleVF1ZXN0aW9uczogU3VydmV5UXVlc3Rpb25bXTtcblx0cHJpdmF0ZSBhbnN3ZXJzOiBTdXJ2ZXlBbnN3ZXJbXTtcblx0cHJpdmF0ZSBzdWJtaXNzaW9uOiBTdXJ2ZXlTdWJtaXNzaW9uO1xuXHRwcml2YXRlIGN1cnJlbnRBbnN3ZXI6IFN1cnZleUFuc3dlcjtcblx0cHJpdmF0ZSBjdXJyZW50UXVlc3Rpb246IFN1cnZleVF1ZXN0aW9uO1xuXHRwcml2YXRlIHByb2dyZXNzOiBudW1iZXI7XG5cdHByaXZhdGUgc3RhdHM6IGFueTtcblx0cHJpdmF0ZSB2YWxpZEFuc3dlcjogbnVtYmVyO1xuXHRwcml2YXRlIG9uU2hvd1JlY2VpdmVyOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuICAgIHByaXZhdGUgb25IaWRlUmVjZWl2ZXI6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgcHJpdmF0ZSBjb21wb25lbnRSZWY6IGFueTtcbiAgICBvblNob3c6IE9ic2VydmFibGU8YW55PiA9IHRoaXMub25TaG93UmVjZWl2ZXIuYXNPYnNlcnZhYmxlKCk7XG4gICAgb25IaWRlOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLm9uSGlkZVJlY2VpdmVyLmFzT2JzZXJ2YWJsZSgpO1xuXG5cdEBWaWV3Q2hpbGQoUXVlc3Rpb25Db250YWluZXJEaXJlY3RpdmUpIHF1ZXN0aW9uSG9zdDogUXVlc3Rpb25Db250YWluZXJEaXJlY3RpdmU7XG5cdFxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLmRpc3BsYXkgPSBmYWxzZTtcblx0XHR0aGlzLnN1cnZleVF1ZXN0aW9ucyA9IFtdO1xuXHRcdHRoaXMuYW5zd2VycyA9IFtdO1xuXHRcdHRoaXMuc3VydmV5ID0gbmV3IFN1cnZleSgpO1xuXHRcdHRoaXMuc2hlZXQgPSBuZXcgU3VydmV5U2hlZXQoKTtcblx0XHR0aGlzLmN1cnJlbnRRdWVzdGlvbiA9IG5ldyBTdXJ2ZXlRdWVzdGlvbigpO1xuXHRcdHRoaXMucHJvZ3Jlc3MgPSAwO1xuXHRcdHRoaXMubWVtYmVyID0gbmV3IFN1cnZleU1lbWJlcigpO1xuXHRcdHRoaXMuc3RhdHMgPSB7XG5cdFx0XHR0b3RhbDogMCxcblx0XHRcdGF0dGVtcHQ6IDAsXG5cdFx0XHR1bmF0dGVtcHQ6IDBcblx0XHR9XG5cdFx0dGhpcy52YWxpZEFuc3dlciA9IDA7XG5cdFx0dGhpcy5XSU5ET1dfSEVJR0hUID0gICQod2luZG93KS5oZWlnaHQoKTtcblx0fVxuXG5cdHNob3coc3VydmV5OiBTdXJ2ZXksIG1lbWJlcjogU3VydmV5TWVtYmVyKSB7XG5cdFx0dGhpcy5vblNob3dSZWNlaXZlci5uZXh0KCk7XG5cdFx0dGhpcy5kaXNwbGF5ID0gdHJ1ZTtcblx0XHR0aGlzLnN1cnZleSA9IHN1cnZleTtcblx0XHR0aGlzLm1lbWJlciA9IG1lbWJlcjtcblx0XHR0aGlzLnFJbmRleCA9IDA7XG5cblx0XHRpZiAodGhpcy5zdXJ2ZXkuc2hlZXRfc3RhdHVzICE9ICdwdWJsaXNoZWQnKSB7XG5cdFx0XHR0aGlzLmVycm9yKCdFeGFtIGNvbnRlbnQgaGFzIG5vdCBiZWVuIHB1Ymxpc2hlZCcpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXG5cdFx0U3VydmV5U3VibWlzc2lvbi5nZXQodGhpcywgdGhpcy5tZW1iZXIuc3VibWlzc2lvbl9pZCkuc3Vic2NyaWJlKChzdWJtaXQ6IFN1cnZleVN1Ym1pc3Npb24pID0+IHtcblx0XHRcdHRoaXMuc3VibWlzc2lvbiA9IHN1Ym1pdDtcblx0XHRcdHRoaXMuc3VibWlzc2lvbi5zdGFydCA9IG5ldyBEYXRlKCk7XG5cdFx0XHRTdXJ2ZXlTaGVldC5nZXQodGhpcywgdGhpcy5zdXJ2ZXkuc2hlZXRfaWQpLnN1YnNjcmliZShzaGVldCA9PiB7XG5cdFx0XHRcdHRoaXMuc2hlZXQgPSBzaGVldDtcblx0XHRcdFx0QmFzZU1vZGVsLmJ1bGtfc2VhcmNoKHRoaXMsXG5cdFx0XHRcdFx0U3VydmV5UXVlc3Rpb24uX19hcGlfX2xpc3RCeVNoZWV0KHRoaXMuc2hlZXQuaWQpLFxuXHRcdFx0XHRcdFN1cnZleUFuc3dlci5fX2FwaV9fbGlzdEJ5U3VibWl0KHRoaXMuc3VibWlzc2lvbi5pZCkpXG5cdFx0XHRcdFx0LnN1YnNjcmliZShqc29uQXJyID0+IHtcblx0XHRcdFx0XHRcdHRoaXMuc3VydmV5UXVlc3Rpb25zID0gU3VydmV5UXVlc3Rpb24udG9BcnJheShqc29uQXJyWzBdKTtcblx0XHRcdFx0XHRcdHRoaXMuYW5zd2VycyA9IFN1cnZleUFuc3dlci50b0FycmF5KGpzb25BcnJbMV0pO1xuXHRcdFx0XHRcdFx0dGhpcy5zdGF0cy50b3RhbCA9IHRoaXMuc3VydmV5UXVlc3Rpb25zLmxlbmd0aDtcblx0XHRcdFx0XHRcdFN1cnZleVF1ZXN0aW9uLnBvcHVsYXRlUXVlc3Rpb25zKHRoaXMsIHRoaXMuc3VydmV5UXVlc3Rpb25zKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHR2YXIgcXVlc3Rpb25zID0gXy5tYXAodGhpcy5zdXJ2ZXlRdWVzdGlvbnMsIChzdXJ2ZXlRdWVzdGlvbjpTdXJ2ZXlRdWVzdGlvbik9PiB7XG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdXJ2ZXlRdWVzdGlvbi5xdWVzdGlvblxuXHRcdFx0ICAgICAgICAgICAgICAgIH0pO1xuXHRcdFx0ICAgICAgICAgICAgICAgIFF1ZXN0aW9uLnBvcHVsYXRlT3B0aW9ucyh0aGlzLCBxdWVzdGlvbnMpLnN1YnNjcmliZSgoKT0+IHtcblx0XHRcdCAgICAgICAgICAgICAgICBcdHRoaXMuc3RhcnRTdXJ2ZXkoKTtcblx0XHRcdCAgICAgICAgICAgICAgICB9KTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRoaWRlKCkge1xuXHRcdHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuXHRcdHRoaXMub25IaWRlUmVjZWl2ZXIubmV4dCgpO1xuXHR9XG5cblx0dXBkYXRlU3RhdHMoKSB7XG5cdFx0dmFyIHZhbGlkQW5zd2VycyA9IF8uZmlsdGVyKHRoaXMuYW5zd2VycywgKGFuczogYW55KSA9PiB7XG5cdFx0XHRyZXR1cm4gYW5zLm9wdGlvbl9pZCAhPSBcIlwiICYmIGFucy5vcHRpb25faWQgIT0gXCIwXCI7XG5cdFx0fSk7XG5cdFx0aWYgKHZhbGlkQW5zd2Vycy5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLnZhbGlkQW5zd2VyID0gdmFsaWRBbnN3ZXJzLmxlbmd0aDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy52YWxpZEFuc3dlciA9IDA7XG5cdFx0fVxuXHRcdHRoaXMuc3RhdHMuYXR0ZW1wdCA9IHRoaXMudmFsaWRBbnN3ZXI7XG5cdFx0dGhpcy5zdGF0cy51bmF0dGVtcHQgPSB0aGlzLnN0YXRzLnRvdGFsIC0gdGhpcy5zdGF0cy5hdHRlbXB0O1xuXHRcdHRoaXMucHJvZ3Jlc3MgPSBNYXRoLmZsb29yKHZhbGlkQW5zd2Vycy5sZW5ndGggLyB0aGlzLnN1cnZleVF1ZXN0aW9ucy5sZW5ndGggKiAxMDApXG5cdH1cblxuXHRzdGFydFN1cnZleSgpIHtcblx0XHR0aGlzLnVwZGF0ZVN0YXRzKCk7XG5cdFx0dGhpcy5kaXNwbGF5UXVlc3Rpb24oMCk7XG5cdH1cblxuXG5cdHByZXBhcmVBbnN3ZXIocXVlc3Rpb246IFN1cnZleVF1ZXN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcblx0XHR2YXIgYW5zd2VyID0gXy5maW5kKHRoaXMuYW5zd2VycywgKGFuczogU3VydmV5QW5zd2VyKSA9PiB7XG5cdFx0XHRyZXR1cm4gYW5zLnF1ZXN0aW9uX2lkID09IHF1ZXN0aW9uLnF1ZXN0aW9uX2lkO1xuXHRcdH0pO1xuXHRcdGlmICghYW5zd2VyKSB7XG5cdFx0XHR2YXIgYW5zd2VyID0gbmV3IFN1cnZleUFuc3dlcigpO1xuXHRcdFx0YW5zd2VyLm9wdGlvbl9pZCA9IDA7XG5cdFx0XHRhbnN3ZXIuc3VibWlzc2lvbl9pZCA9IHRoaXMuc3VibWlzc2lvbi5pZDtcblx0XHRcdGFuc3dlci5xdWVzdGlvbl9pZCA9IHF1ZXN0aW9uLnF1ZXN0aW9uX2lkO1xuXHRcdFx0cmV0dXJuIGFuc3dlci5zYXZlKHRoaXMpLmRvKGFucyA9PiB7XG5cdFx0XHRcdHRoaXMuYW5zd2Vycy5wdXNoKGFuc3dlcik7XG5cdFx0XHRcdHRoaXMudXBkYXRlU3RhdHMoKTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZVxuXHRcdFx0cmV0dXJuIE9ic2VydmFibGUub2YoYW5zd2VyKTtcblx0fVxuXG5cblx0ZGlzcGxheVF1ZXN0aW9uKGluZGV4OiBudW1iZXIpIHtcblx0XHR0aGlzLnFJbmRleCA9IGluZGV4O1xuXHRcdHRoaXMuY3VycmVudFF1ZXN0aW9uID0gdGhpcy5zdXJ2ZXlRdWVzdGlvbnNbaW5kZXhdO1xuXHRcdHRoaXMucHJlcGFyZUFuc3dlcih0aGlzLmN1cnJlbnRRdWVzdGlvbikuc3Vic2NyaWJlKGFuc3dlciA9PiB7XG5cdFx0XHR0aGlzLmN1cnJlbnRBbnN3ZXIgPSBhbnN3ZXI7XG5cdFx0XHR2YXIgZGV0YWlsQ29tcG9uZW50ID0gUXVlc3Rpb25SZWdpc3Rlci5JbnN0YW5jZS5sb29rdXAodGhpcy5jdXJyZW50UXVlc3Rpb24ucXVlc3Rpb24udHlwZSk7XG5cdFx0XHRsZXQgdmlld0NvbnRhaW5lclJlZiA9IHRoaXMucXVlc3Rpb25Ib3N0LnZpZXdDb250YWluZXJSZWY7XG5cdFx0XHRpZiAoZGV0YWlsQ29tcG9uZW50KSB7XG5cdFx0XHRcdGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoZGV0YWlsQ29tcG9uZW50KTtcblx0XHRcdFx0dmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuXHRcdFx0XHR0aGlzLmNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuXHRcdFx0XHQoPElRdWVzdGlvbj50aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZSkubW9kZSA9ICdzdXJ2ZXknO1xuXHRcdFx0XHQoPElRdWVzdGlvbj50aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZSkucmVuZGVyKHRoaXMuY3VycmVudFF1ZXN0aW9uLnF1ZXN0aW9uLCB0aGlzLmN1cnJlbnRBbnN3ZXIpO1xuXHRcdFx0XHR0aGlzLnVwZGF0ZVN0YXRzKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRzdWJtaXRBbnN3ZXIoKTogT2JzZXJ2YWJsZTxhbnk+IHtcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50QW5zd2VyLnNhdmUodGhpcyk7XG5cdH1cblxuXHRuZXh0KCkge1xuXHRcdHRoaXMuc3VibWl0QW5zd2VyKCkuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdGlmICh0aGlzLnFJbmRleCA8IHRoaXMuc3VydmV5UXVlc3Rpb25zLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0dGhpcy5kaXNwbGF5UXVlc3Rpb24odGhpcy5xSW5kZXggKyAxKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHByZXYoKSB7XG5cdFx0dGhpcy5zdWJtaXRBbnN3ZXIoKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0aWYgKHRoaXMucUluZGV4ID4gMCkge1xuXHRcdFx0XHR0aGlzLmRpc3BsYXlRdWVzdGlvbih0aGlzLnFJbmRleCAtIDEpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0c3VibWl0U3VydmV5KCkge1xuXHRcdHRoaXMubWVtYmVyLmVucm9sbF9zdGF0dXMgPSAnY29tcGxldGVkJztcblx0XHR0aGlzLnN1Ym1pc3Npb24uZW5kID0gbmV3IERhdGUoKTtcblx0XHR0aGlzLm1lbWJlci5zYXZlKHRoaXMpLnN1YnNjcmliZSgoKT0+IHtcblx0XHRcdHRoaXMuc3VibWlzc2lvbi5zYXZlKHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdHRoaXMuaGlkZSgpO1xuXHRcdFx0fSk7XG5cdFx0fSlcblx0XHRcblx0fVxuXG59Il19

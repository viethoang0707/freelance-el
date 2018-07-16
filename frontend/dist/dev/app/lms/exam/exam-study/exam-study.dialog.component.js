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
            templateUrl: 'exam-study.dialog.component.html',
            providers: [messageservice_1.MessageService]
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], ExamStudyDialog);
    return ExamStudyDialog;
}(base_component_1.BaseComponent));
exports.ExamStudyDialog = ExamStudyDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvZXhhbS9leGFtLXN0dWR5L2V4YW0tc3R1ZHkuZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBOEY7QUFDOUYsOEJBQThDO0FBQzlDLGlGQUErRTtBQUcvRSw4QkFBZ0M7QUFDaEMsOERBQWlHO0FBQ2pHLDBFQUFtRTtBQUNuRSxzRkFBK0U7QUFDL0Usa0ZBQTJFO0FBQzNFLDhGQUFzRjtBQUN0Riw4RUFBdUU7QUFDdkUsNEZBQW9GO0FBQ3BGLHdGQUFnRjtBQUVoRix3RUFBcUU7QUFHckUsNEhBQXlIO0FBRXpILHdHQUFxRztBQUNyRyxvR0FBdUY7QUFDdkYscUNBQW1DO0FBRW5DLDJFQUEwRTtBQUUxRSxnRUFBOEQ7QUFVOUQ7SUFBcUMsbUNBQWE7SUE2QmpELHlCQUFvQix3QkFBa0Q7UUFBdEUsWUFDQyxpQkFBTyxTQWlCUDtRQWxCbUIsOEJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQVQ5RCxvQkFBYyxHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQzdDLG9CQUFjLEdBQWlCLElBQUksWUFBTyxFQUFFLENBQUM7UUFDckQsWUFBTSxHQUFvQixLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzdELFlBQU0sR0FBb0IsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQVE1RCxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixLQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixLQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksaUJBQUksRUFBRSxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxvQ0FBYSxFQUFFLENBQUM7UUFDakMsS0FBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGtDQUFZLEVBQUUsQ0FBQztRQUMx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UUFBUSxJQUFJLENBQUM7b0JBQ3JCLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNwQixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0YsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFDQyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBQyxHQUFRO1lBQ25ELE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBUztZQUNwQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTtnQkFDM0IsSUFBSSxNQUFNLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQzVDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2lCQUN4QjtZQUNGLENBQUMsQ0FBQyxDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBek5nQztRQUFoQyxnQkFBUyxDQUFDLHVEQUFvQixDQUFDO2tDQUFlLHVEQUFvQjt5REFBQztJQUM3QjtRQUF0QyxnQkFBUyxDQUFDLHlEQUEwQixDQUFDO2tDQUFlLHlEQUEwQjt5REFBQztJQTFCcEUsZUFBZTtRQU4zQixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsV0FBVyxFQUFFLGtDQUFrQztZQUMvQyxTQUFTLEVBQUUsQ0FBQywrQkFBYyxDQUFDO1NBQzNCLENBQUM7eUNBOEI2QywrQkFBd0I7T0E3QjFELGVBQWUsQ0FtUDNCO0lBQUQsc0JBQUM7Q0FuUEQsQUFtUEMsQ0FuUG9DLDhCQUFhLEdBbVBqRDtBQW5QWSwwQ0FBZSIsImZpbGUiOiJhcHAvbG1zL2V4YW0vZXhhbS1zdHVkeS9leGFtLXN0dWR5LmRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgR1JPVVBfQ0FURUdPUlksIEVYQU1fU1RBVFVTLCBFWEFNX1RJTUVfV0FSTklORyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgRXhhbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0ubW9kZWwnO1xuaW1wb3J0IHsgU3VibWlzc2lvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1Ym1pc3Npb24ubW9kZWwnO1xuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBRdWVzdGlvblNoZWV0IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvcXVlc3Rpb24tc2hlZXQubW9kZWwnO1xuaW1wb3J0IHsgQW5zd2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvYW5zd2VyLm1vZGVsJztcbmltcG9ydCB7IEV4YW1RdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgRXhhbU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgRXhhbUxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2xvZy5tb2RlbCc7XG5pbXBvcnQgeyBDbG9ja1BpcGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvcGlwZXMvdGltZS5waXBlJztcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBRdWVzdGlvbkNvbnRhaW5lckRpcmVjdGl2ZSB9IGZyb20gJy4uLy4uLy4uL2Fzc2Vzc21lbnQvcXVlc3Rpb24vcXVlc3Rpb24tdGVtcGxhdGUvcXVlc3Rpb24tY29udGFpbmVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBJUXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL3F1ZXN0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBRdWVzdGlvblJlZ2lzdGVyIH0gZnJvbSAnLi4vLi4vLi4vYXNzZXNzbWVudC9xdWVzdGlvbi9xdWVzdGlvbi10ZW1wbGF0ZS9xdWVzdGlvbi5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRXhhbVN1Ym1pc3Npb25EaWFsb2cgfSBmcm9tICcuLi9leGFtLXN1Ym1pdC9leGFtLXN1Ym1pc3Npb24uZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvdGltZXInO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ3ByaW1lbmcvY29tcG9uZW50cy9jb21tb24vYXBpJztcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAncHJpbWVuZy9jb21wb25lbnRzL2NvbW1vbi9tZXNzYWdlc2VydmljZSc7XG5pbXBvcnQgeyBXaW5kb3dSZWYgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy93aW5kb253LnJlZic7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xuXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ2V4YW0tc3R1ZHktZGlhbG9nJyxcblx0dGVtcGxhdGVVcmw6ICdleGFtLXN0dWR5LmRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG5cdHByb3ZpZGVyczogW01lc3NhZ2VTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBFeGFtU3R1ZHlEaWFsb2cgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuXHRXSU5ET1dfSEVJR0hUOiBhbnk7XG5cblx0cHJpdmF0ZSBkaXNwbGF5OiBib29sZWFuO1xuXHRwcml2YXRlIGV4YW06IEV4YW07XG5cdHByaXZhdGUgbWVtYmVyOiBFeGFtTWVtYmVyO1xuXHRwcml2YXRlIHNoZWV0OiBRdWVzdGlvblNoZWV0O1xuXHRwcml2YXRlIHFJbmRleDogbnVtYmVyO1xuXHRwcml2YXRlIGV4YW1RdWVzdGlvbnM6IEV4YW1RdWVzdGlvbltdO1xuXHRwcml2YXRlIGFuc3dlcnM6IEFuc3dlcltdO1xuXHRwcml2YXRlIHN1Ym1pc3Npb246IFN1Ym1pc3Npb247XG5cdHByaXZhdGUgdGltZXI6IGFueTtcblx0cHJpdmF0ZSBjdXJyZW50QW5zd2VyOiBBbnN3ZXI7XG5cdHByaXZhdGUgY3VycmVudFF1ZXN0aW9uOiBFeGFtUXVlc3Rpb247XG5cdHByaXZhdGUgdGltZUxlZnQ6IG51bWJlcjtcblx0cHJpdmF0ZSBwcm9ncmVzczogbnVtYmVyO1xuXHRwcml2YXRlIHN0YXRzOiBhbnk7XG5cdHByaXZhdGUgdmFsaWRBbnN3ZXI6IG51bWJlcjtcblx0cHJpdmF0ZSBjb21wb25lbnRSZWY6IGFueTtcblx0cHJpdmF0ZSBvblNob3dSZWNlaXZlcjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblx0cHJpdmF0ZSBvbkhpZGVSZWNlaXZlcjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblx0b25TaG93OiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLm9uU2hvd1JlY2VpdmVyLmFzT2JzZXJ2YWJsZSgpO1xuXHRvbkhpZGU6IE9ic2VydmFibGU8YW55PiA9IHRoaXMub25IaWRlUmVjZWl2ZXIuYXNPYnNlcnZhYmxlKCk7XG5cblx0QFZpZXdDaGlsZChFeGFtU3VibWlzc2lvbkRpYWxvZykgc3VibWl0RGlhbG9nOiBFeGFtU3VibWlzc2lvbkRpYWxvZztcblx0QFZpZXdDaGlsZChRdWVzdGlvbkNvbnRhaW5lckRpcmVjdGl2ZSkgcXVlc3Rpb25Ib3N0OiBRdWVzdGlvbkNvbnRhaW5lckRpcmVjdGl2ZTtcblxuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuXHRcdHRoaXMuZXhhbVF1ZXN0aW9ucyA9IFtdO1xuXHRcdHRoaXMuYW5zd2VycyA9IFtdO1xuXHRcdHRoaXMuZXhhbSA9IG5ldyBFeGFtKCk7XG5cdFx0dGhpcy5zaGVldCA9IG5ldyBRdWVzdGlvblNoZWV0KCk7XG5cdFx0dGhpcy5jdXJyZW50UXVlc3Rpb24gPSBuZXcgRXhhbVF1ZXN0aW9uKCk7XG5cdFx0dGhpcy50aW1lTGVmdCA9IDA7XG5cdFx0dGhpcy5wcm9ncmVzcyA9IDA7XG5cdFx0dGhpcy5tZW1iZXIgPSBuZXcgRXhhbU1lbWJlcigpO1xuXHRcdHRoaXMuc3RhdHMgPSB7XG5cdFx0XHR0b3RhbDogMCxcblx0XHRcdGF0dGVtcHQ6IDAsXG5cdFx0XHR1bmF0dGVtcHQ6IDBcblx0XHR9XG5cdFx0dGhpcy52YWxpZEFuc3dlciA9IDA7XG5cdFx0dGhpcy5XSU5ET1dfSEVJR0hUID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuXHR9XG5cblx0c2hvdyhleGFtOiBFeGFtLCBtZW1iZXI6IEV4YW1NZW1iZXIpIHtcblx0XHR0aGlzLm9uU2hvd1JlY2VpdmVyLm5leHQoKTtcblx0XHR0aGlzLmRpc3BsYXkgPSB0cnVlO1xuXHRcdHRoaXMuZXhhbSA9IGV4YW07XG5cdFx0dGhpcy5tZW1iZXIgPSBtZW1iZXI7XG5cdFx0dGhpcy5xSW5kZXggPSAwO1xuXG5cdFx0aWYgKHRoaXMuZXhhbS5zaGVldF9zdGF0dXMgIT0gJ3B1Ymxpc2hlZCcpIHtcblx0XHRcdHRoaXMuZXJyb3IoJ0V4YW0gY29udGVudCBoYXMgbm90IGJlZW4gcHVibGlzaGVkJyk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0U3VibWlzc2lvbi5nZXQodGhpcywgdGhpcy5tZW1iZXIuc3VibWlzc2lvbl9pZCkuc3Vic2NyaWJlKChzdWJtaXQ6IFN1Ym1pc3Npb24pID0+IHtcblx0XHRcdHRoaXMuc3VibWlzc2lvbiA9IHN1Ym1pdDtcblx0XHRcdHRoaXMuc3VibWlzc2lvbi5zdGFydCA9IG5ldyBEYXRlKCk7XG5cdFx0XHRRdWVzdGlvblNoZWV0LmdldCh0aGlzLCB0aGlzLmV4YW0uc2hlZXRfaWQpLnN1YnNjcmliZSgoc2hlZXQ6UXVlc3Rpb25TaGVldCkgPT4ge1xuXHRcdFx0XHR0aGlzLnNoZWV0ID0gc2hlZXQ7XG5cdFx0XHRcdGlmICh0aGlzLnNoZWV0LnN0YXR1cyAhPSAncHVibGlzaGVkJykge1xuXHRcdFx0XHRcdHRoaXMuZXJyb3IoJ0V4YW0gY29udGVudCBoYXMgbm90IGJlZW4gcHViaXNoZWQnKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0QmFzZU1vZGVsLmJ1bGtfc2VhcmNoKHRoaXMsXG5cdFx0XHRcdFx0RXhhbVF1ZXN0aW9uLl9fYXBpX19saXN0QnlTaGVldCh0aGlzLnNoZWV0LmlkKSxcblx0XHRcdFx0XHRBbnN3ZXIuX19hcGlfX2xpc3RCeVN1Ym1pdCh0aGlzLnN1Ym1pc3Npb24uaWQpKVxuXHRcdFx0XHRcdC5zdWJzY3JpYmUoanNvbkFyciA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLmV4YW1RdWVzdGlvbnMgPSB0aGlzLnByZXBhcmVFeGFtUXVlc3Rpb25zKEV4YW1RdWVzdGlvbi50b0FycmF5KGpzb25BcnJbMF0pKTtcblx0XHRcdFx0XHRcdHRoaXMuYW5zd2VycyA9IEFuc3dlci50b0FycmF5KGpzb25BcnJbMV0pO1xuXHRcdFx0XHRcdFx0RXhhbVF1ZXN0aW9uLnBvcHVsYXRlUXVlc3Rpb25zKHRoaXMsIHRoaXMuZXhhbVF1ZXN0aW9ucykuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdFx0XHRcdFx0dmFyIHF1ZXN0aW9ucyA9IF8ubWFwKHRoaXMuZXhhbVF1ZXN0aW9ucywgKGV4YW1RdWVzdGlvbjogRXhhbVF1ZXN0aW9uKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGV4YW1RdWVzdGlvbi5xdWVzdGlvbjtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFF1ZXN0aW9uLnBvcHVsYXRlT3B0aW9ucyh0aGlzLCBxdWVzdGlvbnMpLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5zdGFydEV4YW0oKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0cHJlcGFyZUV4YW1RdWVzdGlvbnMoZXhhbVF1ZXN0aW9uczogRXhhbVF1ZXN0aW9uW10pIHtcblx0XHR2YXIgb2Zmc2V0ID0gdGhpcy5tZW1iZXIuaWQ7XG5cdFx0cmV0dXJuIF8ubWFwKGV4YW1RdWVzdGlvbnMsIChvYmosIG9yZGVyKSA9PiB7XG5cdFx0XHR2YXIgaW5kZXggPSAob3JkZXIgKyBvZmZzZXQpICUgZXhhbVF1ZXN0aW9ucy5sZW5ndGg7XG5cdFx0XHRyZXR1cm4gZXhhbVF1ZXN0aW9uc1tpbmRleF07XG5cdFx0fSk7XG5cdH1cblxuXHRoaWRlKCkge1xuXHRcdHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuXHRcdHRoaXMub25IaWRlUmVjZWl2ZXIubmV4dCgpO1xuXHR9XG5cblx0dXBkYXRlU3RhdHMoKSB7XG5cdFx0dGhpcy5zdGF0cy50b3RhbCA9IHRoaXMuZXhhbVF1ZXN0aW9ucy5sZW5ndGg7XG5cdFx0dmFyIHZhbGlkQW5zd2VycyA9IF8uZmlsdGVyKHRoaXMuYW5zd2VycywgKGFuczogYW55KSA9PiB7XG5cdFx0XHRyZXR1cm4gYW5zLm9wdGlvbl9pZCAhPSBcIlwiICYmIGFucy5vcHRpb25faWQgIT0gXCIwXCI7XG5cdFx0fSk7XG5cdFx0aWYgKHZhbGlkQW5zd2Vycy5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLnZhbGlkQW5zd2VyID0gdmFsaWRBbnN3ZXJzLmxlbmd0aDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy52YWxpZEFuc3dlciA9IDA7XG5cdFx0fVxuXHRcdHRoaXMuc3RhdHMuYXR0ZW1wdCA9IHRoaXMudmFsaWRBbnN3ZXI7XG5cdFx0dGhpcy5zdGF0cy51bmF0dGVtcHQgPSB0aGlzLnN0YXRzLnRvdGFsIC0gdGhpcy5zdGF0cy5hdHRlbXB0O1xuXHRcdHRoaXMucHJvZ3Jlc3MgPSBNYXRoLmZsb29yKHZhbGlkQW5zd2Vycy5sZW5ndGggLyB0aGlzLmV4YW1RdWVzdGlvbnMubGVuZ3RoICogMTAwKVxuXHR9XG5cblx0c3RhcnRFeGFtKCkge1xuXHRcdHRoaXMubWVtYmVyLmVucm9sbF9zdGF0dXMgPSAnaW4tcHJvZ3Jlc3MnO1xuXHRcdHRoaXMubWVtYmVyLnNhdmUodGhpcykuc3Vic2NyaWJlKCk7XG5cdFx0RXhhbUxvZy5zdGFydEV4YW0odGhpcywgdGhpcy5tZW1iZXIuaWQsIHRoaXMuc3VibWlzc2lvbi5pZCkuc3Vic2NyaWJlKCk7XG5cdFx0dGhpcy51cGRhdGVTdGF0cygpO1xuXHRcdHRoaXMuc3RhcnRUaW1lcigpO1xuXHRcdHRoaXMuZGlzcGxheVF1ZXN0aW9uKDApO1xuXHR9XG5cblx0ZmluaXNoRXhhbSgpIHtcblx0XHR0aGlzLnN1Ym1pc3Npb24uZW5kID0gbmV3IERhdGUoKTtcblx0XHR0aGlzLnN1Ym1pc3Npb24uc2F2ZSh0aGlzKS5zdWJzY3JpYmUoKCk9PiB7XG5cdFx0XHR0aGlzLm1lbWJlci5zdWJtaXRTY29yZSh0aGlzKS5zdWJzY3JpYmUoKCk9PiB7XG5cdFx0XHRcdHRoaXMubWVtYmVyLmVucm9sbF9zdGF0dXMgPSAnY29tcGxldGVkJztcblx0XHRcdFx0RXhhbUxvZy5maW5pc2hFeGFtKHRoaXMsIHRoaXMubWVtYmVyLmlkLCB0aGlzLnN1Ym1pc3Npb24uaWQpLnN1YnNjcmliZSgpO1xuXHRcdFx0XHR0aGlzLmhpZGUoKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0cHJlcGFyZUFuc3dlcihxdWVzdGlvbjogRXhhbVF1ZXN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcblx0XHR2YXIgYW5zd2VyID0gXy5maW5kKHRoaXMuYW5zd2VycywgKGFuczogQW5zd2VyKSA9PiB7XG5cdFx0XHRyZXR1cm4gYW5zLnF1ZXN0aW9uX2lkID09IHF1ZXN0aW9uLnF1ZXN0aW9uX2lkO1xuXHRcdH0pO1xuXHRcdGlmICghYW5zd2VyKSB7XG5cdFx0XHR2YXIgYW5zd2VyID0gbmV3IEFuc3dlcigpO1xuXHRcdFx0YW5zd2VyLm9wdGlvbl9pZCA9IDA7XG5cdFx0XHRhbnN3ZXIuc3VibWlzc2lvbl9pZCA9IHRoaXMuc3VibWlzc2lvbi5pZDtcblx0XHRcdGFuc3dlci5xdWVzdGlvbl9pZCA9IHF1ZXN0aW9uLnF1ZXN0aW9uX2lkO1xuXHRcdFx0cmV0dXJuIGFuc3dlci5zYXZlKHRoaXMpLmRvKGFucyA9PiB7XG5cdFx0XHRcdHRoaXMuYW5zd2Vycy5wdXNoKGFuc3dlcik7XG5cdFx0XHRcdHRoaXMudXBkYXRlU3RhdHMoKTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZVxuXHRcdFx0cmV0dXJuIE9ic2VydmFibGUub2YoYW5zd2VyKTtcblx0fVxuXG5cdGRpc3BsYXlRdWVzdGlvbihpbmRleDogbnVtYmVyKSB7XG5cdFx0dGhpcy5xSW5kZXggPSBpbmRleDtcblx0XHR0aGlzLmN1cnJlbnRRdWVzdGlvbiA9IHRoaXMuZXhhbVF1ZXN0aW9uc1tpbmRleF07XG5cdFx0dGhpcy5wcmVwYXJlQW5zd2VyKHRoaXMuY3VycmVudFF1ZXN0aW9uKS5zdWJzY3JpYmUoYW5zd2VyID0+IHtcblx0XHRcdEV4YW1Mb2cuc3RhcnRBbnN3ZXIodGhpcywgdGhpcy5tZW1iZXIuaWQsIGFuc3dlci5pZCkuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdFx0dGhpcy5jdXJyZW50QW5zd2VyID0gYW5zd2VyO1xuXHRcdFx0XHR0aGlzLmNoZWNrQW5zd2VyKCk7XG5cdFx0XHRcdHZhciBkZXRhaWxDb21wb25lbnQgPSBRdWVzdGlvblJlZ2lzdGVyLkluc3RhbmNlLmxvb2t1cCh0aGlzLmN1cnJlbnRRdWVzdGlvbi5xdWVzdGlvbi50eXBlKTtcblx0XHRcdFx0bGV0IHZpZXdDb250YWluZXJSZWYgPSB0aGlzLnF1ZXN0aW9uSG9zdC52aWV3Q29udGFpbmVyUmVmO1xuXHRcdFx0XHRpZiAoZGV0YWlsQ29tcG9uZW50KSB7XG5cdFx0XHRcdFx0bGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShkZXRhaWxDb21wb25lbnQpO1xuXHRcdFx0XHRcdHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblx0XHRcdFx0XHR0aGlzLmNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuXHRcdFx0XHRcdCg8SVF1ZXN0aW9uPnRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlKS5tb2RlID0gJ3N0dWR5Jztcblx0XHRcdFx0XHQoPElRdWVzdGlvbj50aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZSkucmVuZGVyKHRoaXMuY3VycmVudFF1ZXN0aW9uLnF1ZXN0aW9uLCB0aGlzLmN1cnJlbnRBbnN3ZXIpO1xuXHRcdFx0XHRcdHRoaXMudXBkYXRlU3RhdHMoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRzdWJtaXRBbnN3ZXIoKTogT2JzZXJ2YWJsZTxhbnk+IHtcblx0XHQoPElRdWVzdGlvbj50aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZSkuY29uY2x1ZGVBbnN3ZXIoKTtcblx0XHRpZiAodGhpcy5jdXJyZW50QW5zd2VyLmlzX2NvcnJlY3QpIHtcblx0XHRcdHRoaXMuY3VycmVudEFuc3dlci5zY29yZSA9IHRoaXMuY3VycmVudFF1ZXN0aW9uLnNjb3JlO1xuXHRcdH0gZWxzZVxuXHRcdFx0dGhpcy5jdXJyZW50QW5zd2VyLnNjb3JlID0gMDtcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50QW5zd2VyLnNhdmUodGhpcykuZG8oKCkgPT4ge1xuXHRcdFx0RXhhbUxvZy5maW5pc2hBbnN3ZXIodGhpcywgdGhpcy5tZW1iZXIuaWQsIHRoaXMuY3VycmVudEFuc3dlci5pZCkuc3Vic2NyaWJlKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRuZXh0KCkge1xuXHRcdHRoaXMuc3VibWl0QW5zd2VyKCkuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdGlmICh0aGlzLnFJbmRleCA8IHRoaXMuZXhhbVF1ZXN0aW9ucy5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdHRoaXMuZGlzcGxheVF1ZXN0aW9uKHRoaXMucUluZGV4ICsgMSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRwcmV2KCkge1xuXHRcdHRoaXMuc3VibWl0QW5zd2VyKCkuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdGlmICh0aGlzLnFJbmRleCA+IDApIHtcblx0XHRcdFx0dGhpcy5kaXNwbGF5UXVlc3Rpb24odGhpcy5xSW5kZXggLSAxKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHN1Ym1pdEV4YW0oKSB7XG5cdFx0dGhpcy5zdWJtaXRBbnN3ZXIoKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0dGhpcy5zdWJtaXREaWFsb2cuc2hvdyh0aGlzLmV4YW0sIHRoaXMuc3VibWlzc2lvbik7XG5cdFx0XHR0aGlzLnN1Ym1pdERpYWxvZy5vbkNvbmZpcm0uc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdFx0dGhpcy5maW5pc2hFeGFtKCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdHN0YXJ0VGltZXIoKSB7XG5cdFx0dmFyIG5vdyA9IG5ldyBEYXRlKCk7XG5cdFx0dmFyIGVsYXBzZSA9IE1hdGguZmxvb3IoKG5vdy5nZXRUaW1lKCkgLSB0aGlzLnN1Ym1pc3Npb24uc3RhcnQuZ2V0VGltZSgpKSk7XG5cdFx0dGhpcy50aW1lTGVmdCA9IHRoaXMuZXhhbS5kdXJhdGlvbiAqIDYwICogMTAwMCAtIGVsYXBzZTtcblx0XHRpZiAodGhpcy50aW1lTGVmdCA8PSAwKVxuXHRcdFx0dGhpcy5maW5pc2hFeGFtKCk7XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLnRpbWVyID0gT2JzZXJ2YWJsZS50aW1lcigwLCAxMDAwKTtcblx0XHRcdHRoaXMudGltZXJcblx0XHRcdFx0LnRha2VVbnRpbChuZXcgU3ViamVjdCgpKVxuXHRcdFx0XHQuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLnRpbWVMZWZ0IC09IDEwMDA7XG5cdFx0XHRcdFx0aWYgKHRoaXMudGltZUxlZnQgPD0gRVhBTV9USU1FX1dBUk5JTkcgJiYgdGhpcy50aW1lTGVmdCA+IEVYQU1fVElNRV9XQVJOSU5HIC0gMTAwMClcblx0XHRcdFx0XHRcdHRoaXMud2Fybih0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnQSBsaXR0bGUgbWludXRlcyByZW1haW5pbmchJykpO1xuXHRcdFx0XHRcdGlmICh0aGlzLnRpbWVMZWZ0IDw9IDApXG5cdFx0XHRcdFx0XHR0aGlzLmZpbmlzaEV4YW0oKTtcblx0XHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0Y2hlY2tBbnN3ZXIoKSB7XG5cdFx0dmFyIHZhbGlkUXVlc3Rpb24gPSBfLmZpbHRlcih0aGlzLmFuc3dlcnMsIChhbnM6IGFueSkgPT4ge1xuXHRcdFx0cmV0dXJuIGFucy5vcHRpb25faWQ7XG5cdFx0fSk7XG5cdFx0dGhpcy5leGFtUXVlc3Rpb25zLmZvckVhY2goKHF1ZXM6IGFueSkgPT4ge1xuXHRcdFx0dmFsaWRRdWVzdGlvbi5mb3JFYWNoKGFuc3dlciA9PiB7XG5cdFx0XHRcdGlmIChhbnN3ZXIucXVlc3Rpb25faWQgPT09IHF1ZXMucXVlc3Rpb25faWQpIHtcblx0XHRcdFx0XHRxdWVzLmNoZWNrQW5zd2VyID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9KTtcblx0fVxufSJdfQ==

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
var Observable_1 = require("rxjs/Observable");
var base_component_1 = require("../../../shared/components/base/base.component");
var exam_model_1 = require("../../../shared/models/elearning/exam.model");
var exam_question_model_1 = require("../../../shared/models/elearning/exam-question.model");
var answer_model_1 = require("../../../shared/models/elearning/answer.model");
var exam_setting_model_1 = require("../../../shared/models/elearning/exam-setting.model");
var submission_model_1 = require("../../../shared/models/elearning/submission.model");
var question_model_1 = require("../../../shared/models/elearning/question.model");
var question_sheet_model_1 = require("../../../shared/models/elearning/question-sheet.model");
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var question_container_directive_1 = require("../../../assessment/question/question-template/question-container.directive");
var question_decorator_1 = require("../../../assessment/question/question-template/question.decorator");
require("rxjs/add/observable/timer");
var _ = require("underscore");
var base_model_1 = require("../../../shared/models/base.model");
var AnswerPrintDialog = (function (_super) {
    __extends(AnswerPrintDialog, _super);
    function AnswerPrintDialog(componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.display = false;
        _this.examQuestions = [];
        _this.answers = [];
        _this.exam = new exam_model_1.Exam();
        _this.sheet = new question_sheet_model_1.QuestionSheet();
        _this.member = new exam_member_model_1.ExamMember();
        _this.submission = new submission_model_1.Submission();
        _this.setting = new exam_setting_model_1.ExamSetting();
        return _this;
    }
    AnswerPrintDialog.prototype.show = function (exam, member) {
        var _this = this;
        this.display = true;
        this.examQuestions = [];
        this.answers = [];
        this.exam = exam;
        this.member = member;
        base_model_1.BaseModel
            .bulk_search(this, submission_model_1.Submission.__api__byMemberAndExam(this.member.id, this.exam.id), exam_setting_model_1.ExamSetting.__api__byExam(this.exam.id), question_sheet_model_1.QuestionSheet.__api__byExam(this.exam.id))
            .subscribe(function (jsonArr) {
            var submits = submission_model_1.Submission.toArray(jsonArr[0]);
            if (submits.length) {
                _this.submission = submits[0];
                var settings = exam_setting_model_1.ExamSetting.toArray(jsonArr[1]);
                if (settings.length)
                    _this.setting = settings[0];
                var sheets = question_sheet_model_1.QuestionSheet.toArray(jsonArr[2]);
                if (sheets.length) {
                    _this.sheet = sheets[0];
                    _this.startReview();
                }
            }
        });
    };
    AnswerPrintDialog.prototype.hide = function () {
        this.display = false;
    };
    AnswerPrintDialog.prototype.fetchAnswers = function () {
        if (this.submission.id)
            return answer_model_1.Answer.listBySubmit(this, this.submission.id);
        else
            return Observable_1.Observable.of([]);
    };
    AnswerPrintDialog.prototype.startReview = function () {
        var _this = this;
        base_model_1.BaseModel
            .bulk_search(this, exam_question_model_1.ExamQuestion.__api__listBySheet(this.sheet.id), answer_model_1.Answer.__api__listBySubmit(this.submission.id))
            .subscribe(function (jsonArr) {
            _this.examQuestions = exam_question_model_1.ExamQuestion.toArray(jsonArr[0]);
            _this.answers = answer_model_1.Answer.toArray(jsonArr[1]);
            exam_question_model_1.ExamQuestion.populateQuestions(_this, _this.examQuestions).subscribe(function () {
                var questions = _.map(_this.examQuestions, function (examQuestion) {
                    return examQuestion.question;
                });
                question_model_1.Question.populateOptions(_this, questions).subscribe(function () {
                    var componentHostArr = _this.questionsComponents.toArray();
                    for (var i = 0; i < _this.examQuestions.length; i++) {
                        var examQuestion = _this.examQuestions[i];
                        var componentHost = componentHostArr[i];
                        _this.displayQuestion(examQuestion, componentHost);
                    }
                });
            });
        });
    };
    AnswerPrintDialog.prototype.prepareAnswer = function (question) {
        var answer = _.find(this.answers, function (ans) {
            return ans.question_id == question.question_id;
        });
        if (!answer)
            answer = new answer_model_1.Answer();
        return answer;
    };
    AnswerPrintDialog.prototype.displayQuestion = function (examQuestion, componentHost) {
        var answer = this.prepareAnswer(examQuestion);
        var detailComponent = question_decorator_1.QuestionRegister.Instance.lookup(examQuestion.question.type);
        var viewContainerRef = componentHost.viewContainerRef;
        if (detailComponent) {
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
            viewContainerRef.clear();
            var componentRef = viewContainerRef.createComponent(componentFactory);
            componentRef.instance.mode = 'review';
            componentRef.instance.render(examQuestion.question, answer);
        }
    };
    AnswerPrintDialog.prototype.print = function () {
        var printContents, popupWin;
        printContents = this.printSection.nativeElement.innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write("\n          <html>\n            <head>\n                <title>Exam paper</title>\n                #{PRINT_DIALOG_STYLE}\n            </head>\n            <body onload=\"window.print();window.close()\">" + printContents + "</body>\n          </html>");
        popupWin.document.close();
    };
    __decorate([
        core_1.ViewChildren(question_container_directive_1.QuestionContainerDirective),
        __metadata("design:type", core_1.QueryList)
    ], AnswerPrintDialog.prototype, "questionsComponents", void 0);
    __decorate([
        core_1.ViewChild('printSection'),
        __metadata("design:type", Object)
    ], AnswerPrintDialog.prototype, "printSection", void 0);
    AnswerPrintDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'answer-print-dialog',
            templateUrl: 'answer-print.dialog.component.html',
            styleUrls: ['answer-print.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], AnswerPrintDialog);
    return AnswerPrintDialog;
}(base_component_1.BaseComponent));
exports.AnswerPrintDialog = AnswerPrintDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvZXhhbS9hbnN3ZXItcHJpbnQvYW5zd2VyLXByaW50LmRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXVIO0FBQ3ZILDhDQUE2QztBQUk3QyxpRkFBK0U7QUFDL0UsMEVBQW1FO0FBQ25FLDRGQUFvRjtBQUNwRiw4RUFBdUU7QUFDdkUsMEZBQWtGO0FBQ2xGLHNGQUErRTtBQUMvRSxrRkFBMkU7QUFDM0UsOEZBQXNGO0FBQ3RGLHdGQUFnRjtBQUVoRiw0SEFBeUg7QUFFekgsd0dBQXFHO0FBQ3JHLHFDQUFtQztBQUVuQyw4QkFBZ0M7QUFDaEMsZ0VBQThEO0FBUzlEO0lBQXVDLHFDQUFhO0lBY2hELDJCQUFvQix3QkFBa0Q7UUFBdEUsWUFDSSxpQkFBTyxTQVNWO1FBVm1CLDhCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFFbEUsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsS0FBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsS0FBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFJLEVBQUUsQ0FBQztRQUN2QixLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksb0NBQWEsRUFBRSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSw4QkFBVSxFQUFFLENBQUM7UUFDL0IsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDZCQUFVLEVBQUUsQ0FBQztRQUNuQyxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksZ0NBQVcsRUFBRSxDQUFDOztJQUNyQyxDQUFDO0lBRUQsZ0NBQUksR0FBSixVQUFLLElBQVUsRUFBRSxNQUFrQjtRQUFuQyxpQkEwQkM7UUF6QkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFF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QUM7Q0EvSEQsQUErSEMsQ0EvSHNDLDhCQUFhLEdBK0huRDtBQS9IWSw4Q0FBaUIiLCJmaWxlIjoiYXBwL2xtcy9leGFtL2Fuc3dlci1wcmludC9hbnN3ZXItcHJpbnQuZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXhhbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0ubW9kZWwnO1xuaW1wb3J0IHsgRXhhbVF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBBbnN3ZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9hbnN3ZXIubW9kZWwnO1xuaW1wb3J0IHsgRXhhbVNldHRpbmcgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLXNldHRpbmcubW9kZWwnO1xuaW1wb3J0IHsgU3VibWlzc2lvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1Ym1pc3Npb24ubW9kZWwnO1xuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBRdWVzdGlvblNoZWV0IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvcXVlc3Rpb24tc2hlZXQubW9kZWwnO1xuaW1wb3J0IHsgRXhhbU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBRdWVzdGlvbkNvbnRhaW5lckRpcmVjdGl2ZSB9IGZyb20gJy4uLy4uLy4uL2Fzc2Vzc21lbnQvcXVlc3Rpb24vcXVlc3Rpb24tdGVtcGxhdGUvcXVlc3Rpb24tY29udGFpbmVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBJUXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL3F1ZXN0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBRdWVzdGlvblJlZ2lzdGVyIH0gZnJvbSAnLi4vLi4vLi4vYXNzZXNzbWVudC9xdWVzdGlvbi9xdWVzdGlvbi10ZW1wbGF0ZS9xdWVzdGlvbi5kZWNvcmF0b3InO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL3RpbWVyJztcbmltcG9ydCB7IFBSSU5UX0RJQUxPR19TVFlMRSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdhbnN3ZXItcHJpbnQtZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2Fuc3dlci1wcmludC5kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydhbnN3ZXItcHJpbnQuZGlhbG9nLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQW5zd2VyUHJpbnREaWFsb2cgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuICAgIHByaXZhdGUgZGlzcGxheTogYm9vbGVhbjtcbiAgICBwcml2YXRlIGV4YW1RdWVzdGlvbnM6IEV4YW1RdWVzdGlvbltdO1xuICAgIHByaXZhdGUgYW5zd2VyczogQW5zd2VyW107XG4gICAgcHJpdmF0ZSBtZW1iZXI6IEV4YW1NZW1iZXI7XG4gICAgcHJpdmF0ZSBleGFtOiBFeGFtO1xuICAgIHByaXZhdGUgc2hlZXQ6IFF1ZXN0aW9uU2hlZXQ7XG4gICAgcHJpdmF0ZSBzdWJtaXNzaW9uOiBTdWJtaXNzaW9uO1xuICAgIHByaXZhdGUgc2V0dGluZzogRXhhbVNldHRpbmc7XG5cbiAgICBAVmlld0NoaWxkcmVuKFF1ZXN0aW9uQ29udGFpbmVyRGlyZWN0aXZlKSBxdWVzdGlvbnNDb21wb25lbnRzOiBRdWVyeUxpc3Q8UXVlc3Rpb25Db250YWluZXJEaXJlY3RpdmU+O1xuICAgIEBWaWV3Q2hpbGQoJ3ByaW50U2VjdGlvbicpIHByaW50U2VjdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXhhbVF1ZXN0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLmFuc3dlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5leGFtID0gbmV3IEV4YW0oKTtcbiAgICAgICAgdGhpcy5zaGVldCA9IG5ldyBRdWVzdGlvblNoZWV0KCk7XG4gICAgICAgIHRoaXMubWVtYmVyID0gbmV3IEV4YW1NZW1iZXIoKTtcbiAgICAgICAgdGhpcy5zdWJtaXNzaW9uID0gbmV3IFN1Ym1pc3Npb24oKTtcbiAgICAgICAgdGhpcy5zZXR0aW5nID0gbmV3IEV4YW1TZXR0aW5nKCk7XG4gICAgfVxuXG4gICAgc2hvdyhleGFtOiBFeGFtLCBtZW1iZXI6IEV4YW1NZW1iZXIpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5leGFtUXVlc3Rpb25zID0gW107XG4gICAgICAgIHRoaXMuYW5zd2VycyA9IFtdO1xuICAgICAgICB0aGlzLmV4YW0gPSBleGFtO1xuICAgICAgICB0aGlzLm1lbWJlciA9IG1lbWJlcjtcblxuICAgICAgICBCYXNlTW9kZWxcbiAgICAgICAgICAgIC5idWxrX3NlYXJjaCh0aGlzLFxuICAgICAgICAgICAgICAgIFN1Ym1pc3Npb24uX19hcGlfX2J5TWVtYmVyQW5kRXhhbSh0aGlzLm1lbWJlci5pZCwgdGhpcy5leGFtLmlkKSxcbiAgICAgICAgICAgICAgICBFeGFtU2V0dGluZy5fX2FwaV9fYnlFeGFtKHRoaXMuZXhhbS5pZCksXG4gICAgICAgICAgICAgICAgUXVlc3Rpb25TaGVldC5fX2FwaV9fYnlFeGFtKHRoaXMuZXhhbS5pZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGpzb25BcnIgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBzdWJtaXRzID0gU3VibWlzc2lvbi50b0FycmF5KGpzb25BcnJbMF0pO1xuICAgICAgICAgICAgICAgIGlmIChzdWJtaXRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pc3Npb24gPSBzdWJtaXRzWzBdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZ3MgPSBFeGFtU2V0dGluZy50b0FycmF5KGpzb25BcnJbMV0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nID0gc2V0dGluZ3NbMF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBzaGVldHMgPSBRdWVzdGlvblNoZWV0LnRvQXJyYXkoanNvbkFyclsyXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGVldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoZWV0ID0gc2hlZXRzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFJldmlldygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZmV0Y2hBbnN3ZXJzKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmICh0aGlzLnN1Ym1pc3Npb24uaWQpXG4gICAgICAgICAgICByZXR1cm4gQW5zd2VyLmxpc3RCeVN1Ym1pdCh0aGlzLCB0aGlzLnN1Ym1pc3Npb24uaWQpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihbXSk7XG4gICAgfVxuXG4gICAgc3RhcnRSZXZpZXcoKSB7XG4gICAgICAgIEJhc2VNb2RlbFxuICAgICAgICAgICAgLmJ1bGtfc2VhcmNoKHRoaXMsXG4gICAgICAgICAgICAgICAgRXhhbVF1ZXN0aW9uLl9fYXBpX19saXN0QnlTaGVldCh0aGlzLnNoZWV0LmlkKSxcbiAgICAgICAgICAgICAgICBBbnN3ZXIuX19hcGlfX2xpc3RCeVN1Ym1pdCh0aGlzLnN1Ym1pc3Npb24uaWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShqc29uQXJyID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4YW1RdWVzdGlvbnMgPSBFeGFtUXVlc3Rpb24udG9BcnJheShqc29uQXJyWzBdKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuc3dlcnMgPSBBbnN3ZXIudG9BcnJheShqc29uQXJyWzFdKTtcbiAgICAgICAgICAgICAgICBFeGFtUXVlc3Rpb24ucG9wdWxhdGVRdWVzdGlvbnModGhpcywgdGhpcy5leGFtUXVlc3Rpb25zKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcXVlc3Rpb25zID0gXy5tYXAodGhpcy5leGFtUXVlc3Rpb25zLCAoZXhhbVF1ZXN0aW9uOkV4YW1RdWVzdGlvbik9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXhhbVF1ZXN0aW9uLnF1ZXN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgUXVlc3Rpb24ucG9wdWxhdGVPcHRpb25zKHRoaXMscXVlc3Rpb25zKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudEhvc3RBcnIgPSB0aGlzLnF1ZXN0aW9uc0NvbXBvbmVudHMudG9BcnJheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmV4YW1RdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhhbVF1ZXN0aW9uID0gdGhpcy5leGFtUXVlc3Rpb25zW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wb25lbnRIb3N0ID0gY29tcG9uZW50SG9zdEFycltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlRdWVzdGlvbihleGFtUXVlc3Rpb24sIGNvbXBvbmVudEhvc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcmVwYXJlQW5zd2VyKHF1ZXN0aW9uOiBFeGFtUXVlc3Rpb24pe1xuICAgICAgICB2YXIgYW5zd2VyID0gXy5maW5kKHRoaXMuYW5zd2VycywgKGFuczogQW5zd2VyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYW5zLnF1ZXN0aW9uX2lkID09IHF1ZXN0aW9uLnF1ZXN0aW9uX2lkO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFhbnN3ZXIpXG4gICAgICAgICAgICBhbnN3ZXIgPSBuZXcgQW5zd2VyKCk7XG4gICAgICAgIHJldHVybiBhbnN3ZXI7XG4gICAgfVxuXG4gICAgZGlzcGxheVF1ZXN0aW9uKGV4YW1RdWVzdGlvbjogRXhhbVF1ZXN0aW9uLCBjb21wb25lbnRIb3N0KSB7XG4gICAgICAgIHZhciBhbnN3ZXIgPSB0aGlzLnByZXBhcmVBbnN3ZXIoZXhhbVF1ZXN0aW9uKTtcbiAgICAgICAgdmFyIGRldGFpbENvbXBvbmVudCA9IFF1ZXN0aW9uUmVnaXN0ZXIuSW5zdGFuY2UubG9va3VwKGV4YW1RdWVzdGlvbi5xdWVzdGlvbi50eXBlKTtcbiAgICAgICAgbGV0IHZpZXdDb250YWluZXJSZWYgPSBjb21wb25lbnRIb3N0LnZpZXdDb250YWluZXJSZWY7XG4gICAgICAgIGlmIChkZXRhaWxDb21wb25lbnQpIHtcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoZGV0YWlsQ29tcG9uZW50KTtcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICAgICAgICAgIHZhciBjb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAgICAgICAgICg8SVF1ZXN0aW9uPmNvbXBvbmVudFJlZi5pbnN0YW5jZSkubW9kZSA9ICdyZXZpZXcnO1xuICAgICAgICAgICAgKDxJUXVlc3Rpb24+Y29tcG9uZW50UmVmLmluc3RhbmNlKS5yZW5kZXIoZXhhbVF1ZXN0aW9uLnF1ZXN0aW9uLCBhbnN3ZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpbnQoKSB7XG4gICAgICAgIGxldCBwcmludENvbnRlbnRzLCBwb3B1cFdpbjtcbiAgICAgICAgcHJpbnRDb250ZW50cyA9IHRoaXMucHJpbnRTZWN0aW9uLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICBwb3B1cFdpbiA9IHdpbmRvdy5vcGVuKCcnLCAnX2JsYW5rJywgJ3RvcD0wLGxlZnQ9MCxoZWlnaHQ9MTAwJSx3aWR0aD1hdXRvJyk7XG4gICAgICAgIHBvcHVwV2luLmRvY3VtZW50Lm9wZW4oKTtcbiAgICAgICAgcG9wdXBXaW4uZG9jdW1lbnQud3JpdGUoYFxuICAgICAgICAgIDxodG1sPlxuICAgICAgICAgICAgPGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRpdGxlPkV4YW0gcGFwZXI8L3RpdGxlPlxuICAgICAgICAgICAgICAgICN7UFJJTlRfRElBTE9HX1NUWUxFfVxuICAgICAgICAgICAgPC9oZWFkPlxuICAgICAgICAgICAgPGJvZHkgb25sb2FkPVwid2luZG93LnByaW50KCk7d2luZG93LmNsb3NlKClcIj4ke3ByaW50Q29udGVudHN9PC9ib2R5PlxuICAgICAgICAgIDwvaHRtbD5gXG4gICAgICAgICk7XG4gICAgICAgIHBvcHVwV2luLmRvY3VtZW50LmNsb3NlKCk7XG4gICAgfVxufVxuXG5cblxuIl19

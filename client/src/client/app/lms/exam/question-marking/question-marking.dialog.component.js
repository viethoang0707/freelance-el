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
var answer_model_1 = require("../../../shared/models/elearning/answer.model");
var exam_question_model_1 = require("../../../shared/models/elearning/exam-question.model");
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var question_sheet_model_1 = require("../../../shared/models/elearning/question-sheet.model");
var QuestionMarkingDialog = (function (_super) {
    __extends(QuestionMarkingDialog, _super);
    function QuestionMarkingDialog() {
        var _this = _super.call(this) || this;
        _this.onMarkCompleteReceiver = new Rx_1.Subject();
        _this.onMarkComplete = _this.onMarkCompleteReceiver.asObservable();
        _this.display = false;
        _this.answers = [];
        _this.questions = {};
        _this.member = new exam_member_model_1.ExamMember();
        return _this;
    }
    QuestionMarkingDialog.prototype.show = function (member, submit) {
        var _this = this;
        this.display = true;
        this.questions = {};
        this.member = member;
        this.submit = submit;
        question_sheet_model_1.QuestionSheet.byExam(this, this.submit.exam_id).subscribe(function (sheet) {
            exam_question_model_1.ExamQuestion.listBySheet(_this, sheet.id).subscribe(function (examQuestions) {
                _.each(examQuestions, function (question) {
                    _this.questions[question.question_id] = question;
                });
                answer_model_1.Answer.listBySubmit(_this, _this.submit.id).subscribe(function (answers) {
                    _this.answers = answers;
                    _this.markAnswers = _.filter(answers, function (ans) {
                        var question = _.find(examQuestions, (function (q) {
                            return ans.question_id == q.question_id;
                        }));
                        return question && question.type == 'ext';
                    });
                });
            });
        });
    };
    QuestionMarkingDialog.prototype.hide = function () {
        this.display = false;
    };
    QuestionMarkingDialog.prototype.save = function () {
        var _this = this;
        var subscrptions = _.map(this.answers, function (answer) {
            return answer.save(_this);
        });
        if (!this.submit.score)
            this.submit.score = 0;
        this.submit.score = _.reduce(this.answers, function (sum, ans) { return sum + (+ans.score); }, 0);
        subscrptions.push(this.submit.save(this));
        Rx_1.Observable.forkJoin.apply(Rx_1.Observable, subscrptions).subscribe(function () {
            _this.success('Marking saved sucessfully');
            _this.onMarkCompleteReceiver.next();
            _this.hide();
        });
    };
    QuestionMarkingDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-marking-dialog',
            templateUrl: 'question-marking.dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], QuestionMarkingDialog);
    return QuestionMarkingDialog;
}(base_component_1.BaseComponent));
exports.QuestionMarkingDialog = QuestionMarkingDialog;
//# sourceMappingURL=question-marking.dialog.component.js.map
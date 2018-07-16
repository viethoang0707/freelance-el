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
var base_model_1 = require("../../../shared/models/base.model");
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
        base_model_1.BaseModel.bulk_search(this, question_sheet_model_1.QuestionSheet.__api__byExam(this.submit.exam_id), answer_model_1.Answer.__api__listBySubmit(this.submit.id))
            .subscribe(function (jsonArr) {
            var sheetList = question_sheet_model_1.QuestionSheet.toArray(jsonArr[0]);
            _this.answers = answer_model_1.Answer.toArray(jsonArr[1]);
            if (sheetList.length) {
                exam_question_model_1.ExamQuestion.listBySheet(_this, sheetList[0].id).subscribe(function (examQuestions) {
                    _.each(examQuestions, function (question) {
                        _this.questions[question.question_id] = question;
                    });
                    _this.markAnswers = _.filter(_this.answers, function (ans) {
                        var question = _.find(examQuestions, function (q) {
                            return ans.question_id == q.question_id;
                        });
                        return question && question.type == 'ext';
                    });
                });
            }
        });
    };
    QuestionMarkingDialog.prototype.hide = function () {
        this.display = false;
    };
    QuestionMarkingDialog.prototype.save = function () {
        var _this = this;
        answer_model_1.Answer.updateArray(this, this.answers).subscribe(function () {
            _this.success(_this.translateService.instant('Marking saved sucessfully'));
            _this.onMarkCompleteReceiver.next();
            _this.hide();
        });
    };
    QuestionMarkingDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-marking-dialog',
            template: "<p-dialog header=\"{{'Marking candidate' | translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"960\" [responsive]=\"true\" appendTo=\"body\">   <div class=\"spinner\" [hidden]=\"!loading\"></div>   <p-card>     <p-header>       <span>           {{'Candidate'|translate}} {{member.name}}         </span>     </p-header>     <div *ngFor=\"let answer of markAnswers\" class=\"ui-g\">       <div class=\"ui-g-12 \">         <label>{{'Question: '|translate}} {{questions[answer.question_id].title}} </label>         <p [innerHTML]=\"questions[answer.question_id].content\"></p>       </div>       <div class=\"ui-g-12 \">         <label>{{'Answer'|translate}}</label>         <p [innerHTML]=\"answer.text\"></p>       </div>        <div class=\"ui-g-12 \">         <label>{{'Score'|translate}}</label>         <p-spinner size=\"30\" [(ngModel)]=\"answer.score\" [min]=\"0\" [max]=\"questions[answer.question_id].score\"></p-spinner>       </div>                  </div>     </p-card>     <p-footer>       <button type=\"submit\" pButton icon=\"fa-check\" (click)=\"save()\" label=\"{{'Save'|translate}}\"></button>       <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>     </p-footer>    </p-dialog>",
        }),
        __metadata("design:paramtypes", [])
    ], QuestionMarkingDialog);
    return QuestionMarkingDialog;
}(base_component_1.BaseComponent));
exports.QuestionMarkingDialog = QuestionMarkingDialog;

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
var base_component_1 = require("../../../shared/components/base/base.component");
var survey_question_model_1 = require("../../../shared/models/elearning/survey-question.model");
var question_model_1 = require("../../../shared/models/elearning/question.model");
var question_container_directive_1 = require("../../../assessment/question/question-template/question-container.directive");
var question_decorator_1 = require("../../../assessment/question/question-template/question.decorator");
require("rxjs/add/observable/timer");
var _ = require("underscore");
var SurveySheetPreviewDialog = (function (_super) {
    __extends(SurveySheetPreviewDialog, _super);
    function SurveySheetPreviewDialog(componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.display = false;
        _this.surveyQuestions = [];
        return _this;
    }
    SurveySheetPreviewDialog.prototype.show = function (sheet) {
        this.display = true;
        this.surveyQuestions = [];
        this.sheet = sheet;
        this.startReview();
    };
    SurveySheetPreviewDialog.prototype.hide = function () {
        this.display = false;
    };
    SurveySheetPreviewDialog.prototype.startReview = function () {
        var _this = this;
        survey_question_model_1.SurveyQuestion.listBySheet(this, this.sheet.id).subscribe(function (surveyQuestions) {
            survey_question_model_1.SurveyQuestion.populateQuestions(_this, surveyQuestions).subscribe(function () {
                _this.surveyQuestions = surveyQuestions;
                var questions = _.map(surveyQuestions, function (surveyQuestion) {
                    return surveyQuestion.question;
                });
                question_model_1.Question.populateOptions(_this, questions).subscribe(function () {
                    var componentHostArr = _this.questionsComponents.toArray();
                    for (var i = 0; i < surveyQuestions.length; i++) {
                        var surveyQuestion = surveyQuestions[i];
                        var componentHost = componentHostArr[i];
                        _this.displayQuestion(surveyQuestion, componentHost);
                    }
                });
            });
        });
    };
    SurveySheetPreviewDialog.prototype.displayQuestion = function (surveyQuestion, componentHost) {
        var detailComponent = question_decorator_1.QuestionRegister.Instance.lookup(surveyQuestion.question.type);
        var viewContainerRef = componentHost.viewContainerRef;
        if (detailComponent) {
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
            viewContainerRef.clear();
            var componentRef = viewContainerRef.createComponent(componentFactory);
            componentRef.instance.mode = 'preview';
            componentRef.instance.render(surveyQuestion.question);
        }
    };
    __decorate([
        core_1.ViewChildren(question_container_directive_1.QuestionContainerDirective),
        __metadata("design:type", core_1.QueryList)
    ], SurveySheetPreviewDialog.prototype, "questionsComponents", void 0);
    SurveySheetPreviewDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'survey-sheet-preview-dialog',
            template: "<p-dialog header=\"{{'Survey sheet template'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"960\" height=\"100%\" [responsive]=\"true\" appendTo=\"body\">   <div class=\"spinner\" [hidden]=\"!loading\"></div>   <p-scrollPanel [style]=\"{width: '100%', height: '460px'}\">     <div class=\"ui-g ans-print\" #printSection>         <p-dataList [value]=\"surveyQuestions\" [rows]=\"surveyQuestions.length\" styleClass=\"l-question\">           <ng-template let-question pTemplate=\"item\" let-i=\"index\" >             <span>{{'Question'|translate}} {{i+1}}:</span>             <div question-container></div>           </ng-template>         </p-dataList>     </div>   </p-scrollPanel>   <p-footer>     <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>   </p-footer>    </p-dialog>",
            styles: [".name-c,.name-e{text-align:center;text-transform:uppercase;font-weight:700}.bold,.label{font-weight:700}.title{text-transform:uppercase}.ins{text-indent:50px}.ans-print{margin-bottom:20px}"],
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], SurveySheetPreviewDialog);
    return SurveySheetPreviewDialog;
}(base_component_1.BaseComponent));
exports.SurveySheetPreviewDialog = SurveySheetPreviewDialog;

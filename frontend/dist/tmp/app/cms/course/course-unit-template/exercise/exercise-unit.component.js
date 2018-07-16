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
var answer_model_1 = require("../../../../shared/models/elearning/answer.model");
var question_model_1 = require("../../../../shared/models/elearning/question.model");
var exercise_question_model_1 = require("../../../../shared/models/elearning/exercise-question.model");
var base_component_1 = require("../../../../shared/components/base/base.component");
var _ = require("underscore");
var unit_decorator_1 = require("../unit.decorator");
var tree_utils_1 = require("../../../../shared/helpers/tree.utils");
var select_question_dialog_component_1 = require("../../../../shared/components/select-question-dialog/select-question-dialog.component");
var question_container_directive_1 = require("../../../../assessment/question/question-template/question-container.directive");
var question_decorator_1 = require("../../../../assessment/question/question-template/question.decorator");
var ExerciseCourseUnitComponent = (function (_super) {
    __extends(ExerciseCourseUnitComponent, _super);
    function ExerciseCourseUnitComponent(componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.exerciseQuestions = [];
        _this.currentAnswer = new answer_model_1.Answer();
        _this.currentQuestion = new exercise_question_model_1.ExerciseQuestion();
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    ExerciseCourseUnitComponent.prototype.ngOnInit = function () {
    };
    ExerciseCourseUnitComponent.prototype.render = function (unit) {
        var _this = this;
        this.unit = unit;
        if (this.unit.id) {
            exercise_question_model_1.ExerciseQuestion.listByExercise(this, unit.id).subscribe(function (exerciseQuestions) {
                _this.exerciseQuestions = exerciseQuestions;
                exercise_question_model_1.ExerciseQuestion.populateQuestions(_this, _this.exerciseQuestions).subscribe(function () {
                    var questions = _.map(exerciseQuestions, function (exerviseQuestion) {
                        return exerviseQuestion.question;
                    });
                    question_model_1.Question.populateOptions(_this, questions).subscribe(function () {
                        if (_this.mode == 'preview')
                            setTimeout(function () {
                                var componentHostArr = _this.questionsComponents.toArray();
                                for (var i = 0; i < exerciseQuestions.length; i++) {
                                    var exerciseQuestion = exerciseQuestions[i];
                                    var componentHost = componentHostArr[i];
                                    _this.previewQuestion(exerciseQuestion, componentHost);
                                }
                            }, 0);
                        else if (_this.mode == 'study') {
                            _this.qIndex = 0;
                            _this.displayQuestion(_this.qIndex);
                        }
                    });
                });
            });
        }
    };
    ExerciseCourseUnitComponent.prototype.previewQuestion = function (exerciseQuestion, componentHost) {
        var detailComponent = question_decorator_1.QuestionRegister.Instance.lookup(exerciseQuestion.question.type);
        if (detailComponent) {
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
            var componentRef = componentHost.viewContainerRef.createComponent(componentFactory);
            componentRef.instance.mode = 'preview';
            componentRef.instance.render(exerciseQuestion.question);
        }
    };
    ExerciseCourseUnitComponent.prototype.saveEditor = function () {
        var _this = this;
        var createList = [];
        return this.unit.save(this).flatMap(function () {
            _.each(_this.exerciseQuestions, function (exerciseQuestion) {
                exerciseQuestion.unit_id = _this.unit.id;
                if (!exerciseQuestion.id)
                    createList.push(exerciseQuestion);
            });
            return exercise_question_model_1.ExerciseQuestion.createArray(_this, createList);
        });
    };
    ExerciseCourseUnitComponent.prototype.selectQuestion = function () {
        var _this = this;
        this.questionDialog.show();
        this.questionDialog.onSelectQuestions.subscribe(function (questions) {
            var exerciseQuestions = _.map(questions, function (question) {
                var exerciseQuestion = new exercise_question_model_1.ExerciseQuestion();
                exerciseQuestion.question_id = question.id;
                exerciseQuestion.type = question.type;
                exerciseQuestion.title = question.title;
                return exerciseQuestion;
            });
            exercise_question_model_1.ExerciseQuestion.populateQuestions(_this, exerciseQuestions).subscribe(function () {
                _this.exerciseQuestions = _this.exerciseQuestions.concat(exerciseQuestions);
            });
        });
    };
    ExerciseCourseUnitComponent.prototype.answerQuestion = function () {
        this.stage = 'answer';
        if (this.componentRef)
            this.componentRef.instance.mode = 'review';
    };
    ExerciseCourseUnitComponent.prototype.displayQuestion = function (index) {
        this.qIndex = index;
        this.stage = 'question';
        this.currentQuestion = this.exerciseQuestions[index];
        var detailComponent = question_decorator_1.QuestionRegister.Instance.lookup(this.currentQuestion.question.type);
        var viewContainerRef = this.studyQuestionComponent.viewContainerRef;
        if (detailComponent) {
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
            viewContainerRef.clear();
            this.componentRef = viewContainerRef.createComponent(componentFactory);
            this.componentRef.instance.mode = 'study';
            this.componentRef.instance.render(this.currentQuestion.question, this.currentAnswer);
        }
    };
    ExerciseCourseUnitComponent.prototype.next = function () {
        if (this.qIndex < this.exerciseQuestions.length - 1) {
            this.displayQuestion(this.qIndex + 1);
            this.stage = 'question';
            if (this.componentRef)
                this.componentRef.instance.mode = 'study';
        }
    };
    ExerciseCourseUnitComponent.prototype.prev = function () {
        if (this.qIndex > 0) {
            this.displayQuestion(this.qIndex - 1);
            this.stage = 'question';
            if (this.componentRef)
                this.componentRef.instance.mode = 'study';
        }
    };
    ExerciseCourseUnitComponent.prototype.delete = function (exerciseQuestions) {
        var _this = this;
        if (exerciseQuestions && exerciseQuestions.length)
            this.confirm('Are you sure to delete ?', function () {
                exercise_question_model_1.ExerciseQuestion.deleteArray(_this, exerciseQuestions).subscribe(function () {
                    var questionIds = _.pluck(exerciseQuestions, 'question_id');
                    _this.exerciseQuestions = _.reject(_this.exerciseQuestions, function (exerciseQuestion) {
                        return _.contains(questionIds, exerciseQuestion.question_id);
                    });
                });
            });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ExerciseCourseUnitComponent.prototype, "mode", void 0);
    __decorate([
        core_1.ViewChild(select_question_dialog_component_1.SelectQuestionsDialog),
        __metadata("design:type", select_question_dialog_component_1.SelectQuestionsDialog)
    ], ExerciseCourseUnitComponent.prototype, "questionDialog", void 0);
    __decorate([
        core_1.ViewChildren(question_container_directive_1.QuestionContainerDirective),
        __metadata("design:type", core_1.QueryList)
    ], ExerciseCourseUnitComponent.prototype, "questionsComponents", void 0);
    __decorate([
        core_1.ViewChild(question_container_directive_1.QuestionContainerDirective),
        __metadata("design:type", question_container_directive_1.QuestionContainerDirective)
    ], ExerciseCourseUnitComponent.prototype, "studyQuestionComponent", void 0);
    ExerciseCourseUnitComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exercise-course-unit',
            template: "<div *ngIf=\"mode=='design'\">     <button pButton type=\"button\" label=\"{{'Select questions'|translate}}\" class=\"orange-btn\" icon=\"ui-icon-near-me\" (click)=\"selectQuestion()\"></button>     <button pButton type=\"button \" label=\"{{ 'Delete'|translate}} \" class=\"red-btn \" icon=\"ui-icon-delete \" (click)=\"delete(selectedQuestions) \" *ngIf=\"selectedQuestions && selectedQuestions.length \"></button>     <p-table #questionTable [value]=\"exerciseQuestions\" [(selection)]=\"selectedQuestions\" [responsive]=\"true\">       <ng-template pTemplate=\"header\">         <tr>           <th style=\"width: 2.25em\">             <p-tableHeaderCheckbox></p-tableHeaderCheckbox>           </th>           <th>             #           </th>           <th>             {{'Title'|translate}}           </th>           <th>             {{'Group'|translate}}           </th>         </tr>       </ng-template>       <ng-template pTemplate=\"body\" let-rowData let-question let-rowIndex=\"rowIndex\">         <tr [pSelectableRow]=\"rowData\">           <td>             <p-tableCheckbox [value]=\"rowData\"></p-tableCheckbox>           </td>           <td>{{rowIndex+1}}</td>           <td>{{rowData.title}}</td>           <td>{{rowData.group_id__DESC__}}</td>         </tr>       </ng-template>     </p-table>     <select-question-dialog></select-question-dialog>   </div>   <div *ngIf=\"mode=='preview'\">     <div *ngFor=\"let question of exerciseQuestions;let i = index \">       <span>{{'Question'|translate}} : {{i+1}} </span>       <div question-container>       </div>     </div>   </div>   <div *ngIf=\"mode=='study'\">     <div class=\"ui-g\">       <div class=\"ui-g-12\">         <ng-template question-container></ng-template>       </div>     </div>     <div class=\"ui-g-12\" *ngIf=\"stage=='answer'\">       <div class=\"mb5\">{{'Explanation'|translate}} : {{currentQuestion.explanation}}</div>       <button pButton type=\"button\" icon=\"ui-icon-navigate-before\" title=\"{{'Previous'|translate}}\" label=\"{{'Previous Question'|translate}}\" class=\" blue-grey-btn\" style=\"margin-right:4px;\" (click)=\"prev()\" *ngIf=\"qIndex >0 \"></button>       <button pButton type=\"button\" icon=\"ui-icon-navigate-next\" title=\"{{'Next'|translate}}\" label=\"{{'Next Question'|translate}}\" class=\" blue-grey-btn\" style=\"margin-right:4px;\" (click)=\"next()\" *ngIf=\"qIndex < exerciseQuestions.length-1\"></button>     </div>     <div class=\"ui-g-12\" *ngIf=\"stage=='question'\">       <button pButton type=\"button\" icon=\"ui-icon-lightbulb-outline\" title=\"{{'Answer'|translate}}\" label=\"{{'Answer'|translate}}\" class=\" blue-grey-btn\" style=\"margin-right:4px;\" (click)=\"answerQuestion()\"></button>         </div>   </div>",
        }),
        unit_decorator_1.CourseUnitTemplate({
            type: 'exercise'
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], ExerciseCourseUnitComponent);
    return ExerciseCourseUnitComponent;
}(base_component_1.BaseComponent));
exports.ExerciseCourseUnitComponent = ExerciseCourseUnitComponent;

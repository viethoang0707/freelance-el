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
            templateUrl: 'exercise-unit.component.html',
        }),
        unit_decorator_1.CourseUnitTemplate({
            type: 'exercise'
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], ExerciseCourseUnitComponent);
    return ExerciseCourseUnitComponent;
}(base_component_1.BaseComponent));
exports.ExerciseCourseUnitComponent = ExerciseCourseUnitComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvY291cnNlL2NvdXJzZS11bml0LXRlbXBsYXRlL2V4ZXJjaXNlL2V4ZXJjaXNlLXVuaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUF5STtBQUV6SSxpRkFBMEU7QUFDMUUscUZBQThFO0FBRTlFLHVHQUErRjtBQUUvRixvRkFBa0Y7QUFDbEYsOEJBQWdDO0FBR2hDLG9EQUF1RDtBQUV2RCxvRUFBa0U7QUFDbEUsMElBQThIO0FBQzlILCtIQUE0SDtBQUU1SCwyR0FBd0c7QUFVeEc7SUFBaUQsK0NBQWE7SUFvQjdELHFDQUFvQix3QkFBa0Q7UUFBdEUsWUFDQyxpQkFBTyxTQUtQO1FBTm1CLDhCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFFckUsS0FBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUM1QixLQUFJLENBQUMsYUFBYSxHQUFHLElBQUkscUJBQU0sRUFBRSxDQUFDO1FBQ2xDLEtBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSwwQ0FBZ0IsRUFBRSxDQUFDO1FBQzlDLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxzQkFBUyxFQUFFLENBQUM7O0lBQ2xDLENBQUM7SUFFRCw4Q0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELDRDQUFNLEdBQU4sVUFBTyxJQUFnQjtRQUF2QixpQkE4QkM7UUE3QkEsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNqQiwwQ0FBZ0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxpQkFBaUI7Z0JBQ3pFLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztnQkFDM0MsMENBQWdCLENBQUMsaUJBQWlCLENBQUMsS0FBSSxFQUFFLEtBQUksQ0FBQyxpQkFBaUIsQ0FB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Mkp2QztJQUFELGtDQUFDO0NBM0pELEFBMkpDLENBM0pnRCw4QkFBYSxHQTJKN0Q7QUEzSlksa0VBQTJCIiwiZmlsZSI6ImFwcC9jbXMvY291cnNlL2NvdXJzZS11bml0LXRlbXBsYXRlL2V4ZXJjaXNlL2V4ZXJjaXNlLXVuaXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkcmVuLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IEFuc3dlciB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2Fuc3dlci5tb2RlbCc7XG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uT3B0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvb3B0aW9uLm1vZGVsJztcbmltcG9ydCB7IEV4ZXJjaXNlUXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGVyY2lzZS1xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VVbml0IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLXVuaXQubW9kZWwnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IERFRkFVTFRfUEFTU1dPUkQsIEdST1VQX0NBVEVHT1JZIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBDb3Vyc2VVbml0VGVtcGxhdGUgfSBmcm9tICcuLi91bml0LmRlY29yYXRvcic7XG5pbXBvcnQgeyBJQ291cnNlVW5pdCB9IGZyb20gJy4uL3VuaXQuaW50ZXJmYWNlJztcbmltcG9ydCB7IFRyZWVVdGlscyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3RyZWUudXRpbHMnO1xuaW1wb3J0IHsgU2VsZWN0UXVlc3Rpb25zRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0LXF1ZXN0aW9uLWRpYWxvZy9zZWxlY3QtcXVlc3Rpb24tZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBRdWVzdGlvbkNvbnRhaW5lckRpcmVjdGl2ZSB9IGZyb20gJy4uLy4uLy4uLy4uL2Fzc2Vzc21lbnQvcXVlc3Rpb24vcXVlc3Rpb24tdGVtcGxhdGUvcXVlc3Rpb24tY29udGFpbmVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBJUXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL3F1ZXN0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBRdWVzdGlvblJlZ2lzdGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vYXNzZXNzbWVudC9xdWVzdGlvbi9xdWVzdGlvbi10ZW1wbGF0ZS9xdWVzdGlvbi5kZWNvcmF0b3InO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdleGVyY2lzZS1jb3Vyc2UtdW5pdCcsXG5cdHRlbXBsYXRlVXJsOiAnZXhlcmNpc2UtdW5pdC5jb21wb25lbnQuaHRtbCcsXG59KVxuQENvdXJzZVVuaXRUZW1wbGF0ZSh7XG5cdHR5cGU6ICdleGVyY2lzZSdcbn0pXG5leHBvcnQgY2xhc3MgRXhlcmNpc2VDb3Vyc2VVbml0Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIElDb3Vyc2VVbml0LCBPbkluaXQge1xuXG5cdHByaXZhdGUgdHJlZTogVHJlZU5vZGVbXTtcblx0cHJpdmF0ZSBzZWxlY3RlZE5vZGU6IFRyZWVOb2RlO1xuXHRwcml2YXRlIHNlbGVjdGVkUXVlc3Rpb25zOiBRdWVzdGlvbltdO1xuXHRwcml2YXRlIHF1ZXN0aW9uczogUXVlc3Rpb25bXTtcblx0cHJpdmF0ZSB1bml0OiBDb3Vyc2VVbml0O1xuXHRwcml2YXRlIGV4ZXJjaXNlUXVlc3Rpb25zOiBFeGVyY2lzZVF1ZXN0aW9uW107XG5cdHByaXZhdGUgc3RhZ2U6IHN0cmluZztcblx0cHJpdmF0ZSBxSW5kZXg6IG51bWJlcjtcblx0cHJpdmF0ZSBjdXJyZW50UXVlc3Rpb246IEV4ZXJjaXNlUXVlc3Rpb247XG5cdHByaXZhdGUgdHJlZVV0aWxzOiBUcmVlVXRpbHM7XG5cdHByaXZhdGUgY3VycmVudEFuc3dlcjogQW5zd2VyO1xuXHRwcml2YXRlIGNvbXBvbmVudFJlZjogYW55O1xuXG5cdEBJbnB1dCgpIG1vZGU7XG5cdEBWaWV3Q2hpbGQoU2VsZWN0UXVlc3Rpb25zRGlhbG9nKSBxdWVzdGlvbkRpYWxvZzogU2VsZWN0UXVlc3Rpb25zRGlhbG9nO1xuXHRAVmlld0NoaWxkcmVuKFF1ZXN0aW9uQ29udGFpbmVyRGlyZWN0aXZlKSBxdWVzdGlvbnNDb21wb25lbnRzOiBRdWVyeUxpc3Q8UXVlc3Rpb25Db250YWluZXJEaXJlY3RpdmU+O1xuXHRAVmlld0NoaWxkKFF1ZXN0aW9uQ29udGFpbmVyRGlyZWN0aXZlKSBzdHVkeVF1ZXN0aW9uQ29tcG9uZW50OiBRdWVzdGlvbkNvbnRhaW5lckRpcmVjdGl2ZTtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLmV4ZXJjaXNlUXVlc3Rpb25zID0gW107XG5cdFx0dGhpcy5jdXJyZW50QW5zd2VyID0gbmV3IEFuc3dlcigpO1xuXHRcdHRoaXMuY3VycmVudFF1ZXN0aW9uID0gbmV3IEV4ZXJjaXNlUXVlc3Rpb24oKTtcblx0XHR0aGlzLnRyZWVVdGlscyA9IG5ldyBUcmVlVXRpbHMoKTtcblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHR9XG5cblx0cmVuZGVyKHVuaXQ6IENvdXJzZVVuaXQpIHtcblx0XHR0aGlzLnVuaXQgPSB1bml0O1xuXHRcdGlmICh0aGlzLnVuaXQuaWQpIHtcblx0XHRcdEV4ZXJjaXNlUXVlc3Rpb24ubGlzdEJ5RXhlcmNpc2UodGhpcywgdW5pdC5pZCkuc3Vic2NyaWJlKGV4ZXJjaXNlUXVlc3Rpb25zID0+IHtcblx0XHRcdFx0dGhpcy5leGVyY2lzZVF1ZXN0aW9ucyA9IGV4ZXJjaXNlUXVlc3Rpb25zO1xuXHRcdFx0XHRFeGVyY2lzZVF1ZXN0aW9uLnBvcHVsYXRlUXVlc3Rpb25zKHRoaXMsIHRoaXMuZXhlcmNpc2VRdWVzdGlvbnMpLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdFx0dmFyIHF1ZXN0aW9ucyA9IF8ubWFwKGV4ZXJjaXNlUXVlc3Rpb25zLCAoZXhlcnZpc2VRdWVzdGlvbjpFeGVyY2lzZVF1ZXN0aW9uKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4ZXJ2aXNlUXVlc3Rpb24ucXVlc3Rpb247XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgUXVlc3Rpb24ucG9wdWxhdGVPcHRpb25zKHRoaXMsIHF1ZXN0aW9ucykuc3Vic2NyaWJlKCgpPT4ge1xuICAgICAgICAgICAgICAgIFx0aWYgKHRoaXMubW9kZSA9PSAncHJldmlldycpXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHRcdFx0dmFyIGNvbXBvbmVudEhvc3RBcnIgPSB0aGlzLnF1ZXN0aW9uc0NvbXBvbmVudHMudG9BcnJheSgpO1xuXHRcdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGV4ZXJjaXNlUXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGV4ZXJjaXNlUXVlc3Rpb24gPSBleGVyY2lzZVF1ZXN0aW9uc1tpXTtcblx0XHRcdFx0XHRcdFx0XHR2YXIgY29tcG9uZW50SG9zdCA9IGNvbXBvbmVudEhvc3RBcnJbaV07XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5wcmV2aWV3UXVlc3Rpb24oZXhlcmNpc2VRdWVzdGlvbiwgY29tcG9uZW50SG9zdCk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0fSwgMCk7XG5cdFx0XHRcdFx0ZWxzZSBpZiAodGhpcy5tb2RlID09ICdzdHVkeScpIHtcblx0XHRcdFx0XHRcdHRoaXMucUluZGV4ID0gMDtcblx0XHRcdFx0XHRcdHRoaXMuZGlzcGxheVF1ZXN0aW9uKHRoaXMucUluZGV4KTtcblx0XHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgfSk7XG5cblx0XHRcdFx0XHRcblx0XHRcdFx0fSk7XG5cdFx0XHR9KVxuXHRcdH1cblx0fVxuXG5cdHByZXZpZXdRdWVzdGlvbihleGVyY2lzZVF1ZXN0aW9uOiBFeGVyY2lzZVF1ZXN0aW9uLCBjb21wb25lbnRIb3N0OiBhbnkpIHtcblx0XHR2YXIgZGV0YWlsQ29tcG9uZW50ID0gUXVlc3Rpb25SZWdpc3Rlci5JbnN0YW5jZS5sb29rdXAoZXhlcmNpc2VRdWVzdGlvbi5xdWVzdGlvbi50eXBlKTtcblx0XHRpZiAoZGV0YWlsQ29tcG9uZW50KSB7XG5cdFx0XHRsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGRldGFpbENvbXBvbmVudCk7XG5cdFx0XHR2YXIgY29tcG9uZW50UmVmID0gY29tcG9uZW50SG9zdC52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcblx0XHRcdCg8SVF1ZXN0aW9uPmNvbXBvbmVudFJlZi5pbnN0YW5jZSkubW9kZSA9ICdwcmV2aWV3Jztcblx0XHRcdCg8SVF1ZXN0aW9uPmNvbXBvbmVudFJlZi5pbnN0YW5jZSkucmVuZGVyKGV4ZXJjaXNlUXVlc3Rpb24ucXVlc3Rpb24pO1xuXHRcdH1cblx0fVxuXG5cdHNhdmVFZGl0b3IoKTogT2JzZXJ2YWJsZTxhbnk+IHtcblx0XHR2YXIgY3JlYXRlTGlzdCA9IFtdO1xuXHRcdHJldHVybiB0aGlzLnVuaXQuc2F2ZSh0aGlzKS5mbGF0TWFwKCgpID0+IHtcblx0XHRcdF8uZWFjaCh0aGlzLmV4ZXJjaXNlUXVlc3Rpb25zLCAoZXhlcmNpc2VRdWVzdGlvbjogRXhlcmNpc2VRdWVzdGlvbikgPT4ge1xuXHRcdFx0XHRleGVyY2lzZVF1ZXN0aW9uLnVuaXRfaWQgPSB0aGlzLnVuaXQuaWQ7XG5cdFx0XHRcdGlmICghZXhlcmNpc2VRdWVzdGlvbi5pZClcblx0XHRcdFx0XHRjcmVhdGVMaXN0LnB1c2goZXhlcmNpc2VRdWVzdGlvbik7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBFeGVyY2lzZVF1ZXN0aW9uLmNyZWF0ZUFycmF5KHRoaXMsIGNyZWF0ZUxpc3QpO1xuXHRcdFx0XHRcblx0XHR9KTtcblx0fVxuXG5cdHNlbGVjdFF1ZXN0aW9uKCkge1xuXHRcdHRoaXMucXVlc3Rpb25EaWFsb2cuc2hvdygpO1xuXHRcdHRoaXMucXVlc3Rpb25EaWFsb2cub25TZWxlY3RRdWVzdGlvbnMuc3Vic2NyaWJlKHF1ZXN0aW9ucyA9PiB7XG5cdFx0XHR2YXIgZXhlcmNpc2VRdWVzdGlvbnMgPSBfLm1hcChxdWVzdGlvbnMsIChxdWVzdGlvbjogUXVlc3Rpb24pID0+IHtcblx0XHRcdFx0dmFyIGV4ZXJjaXNlUXVlc3Rpb24gPSBuZXcgRXhlcmNpc2VRdWVzdGlvbigpO1xuXHRcdFx0XHRleGVyY2lzZVF1ZXN0aW9uLnF1ZXN0aW9uX2lkID0gcXVlc3Rpb24uaWQ7XG5cdFx0XHRcdGV4ZXJjaXNlUXVlc3Rpb24udHlwZSA9IHF1ZXN0aW9uLnR5cGU7XG5cdFx0XHRcdGV4ZXJjaXNlUXVlc3Rpb24udGl0bGUgPSBxdWVzdGlvbi50aXRsZTtcblx0XHRcdFx0cmV0dXJuIGV4ZXJjaXNlUXVlc3Rpb247XG5cdFx0XHR9KTtcblx0XHRcdEV4ZXJjaXNlUXVlc3Rpb24ucG9wdWxhdGVRdWVzdGlvbnModGhpcywgZXhlcmNpc2VRdWVzdGlvbnMpLnN1YnNjcmliZSgoKT0+IHtcblx0XHRcdFx0dGhpcy5leGVyY2lzZVF1ZXN0aW9ucyA9IHRoaXMuZXhlcmNpc2VRdWVzdGlvbnMuY29uY2F0KGV4ZXJjaXNlUXVlc3Rpb25zKTtcblx0XHRcdH0pXG5cdFx0fSk7XG5cdH1cblxuXG5cdGFuc3dlclF1ZXN0aW9uKCkge1xuXHRcdHRoaXMuc3RhZ2UgPSAnYW5zd2VyJztcblx0XHRpZiAodGhpcy5jb21wb25lbnRSZWYpXG5cdFx0XHQoPElRdWVzdGlvbj50aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZSkubW9kZSA9ICdyZXZpZXcnO1xuXHR9XG5cblxuXHRkaXNwbGF5UXVlc3Rpb24oaW5kZXg6IG51bWJlcikge1xuXHRcdHRoaXMucUluZGV4ID0gaW5kZXg7XG5cdFx0dGhpcy5zdGFnZSA9ICdxdWVzdGlvbic7XG5cdFx0dGhpcy5jdXJyZW50UXVlc3Rpb24gPSB0aGlzLmV4ZXJjaXNlUXVlc3Rpb25zW2luZGV4XTtcblx0XHRcdHZhciBkZXRhaWxDb21wb25lbnQgPSBRdWVzdGlvblJlZ2lzdGVyLkluc3RhbmNlLmxvb2t1cCh0aGlzLmN1cnJlbnRRdWVzdGlvbi5xdWVzdGlvbi50eXBlKTtcblx0XHRcdGxldCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5zdHVkeVF1ZXN0aW9uQ29tcG9uZW50LnZpZXdDb250YWluZXJSZWY7XG5cdFx0XHRpZiAoZGV0YWlsQ29tcG9uZW50KSB7XG5cdFx0XHRcdGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoZGV0YWlsQ29tcG9uZW50KTtcblx0XHRcdFx0dmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuXHRcdFx0XHR0aGlzLmNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuXHRcdFx0XHQoPElRdWVzdGlvbj50aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZSkubW9kZSA9ICdzdHVkeSc7XG5cdFx0XHRcdCg8SVF1ZXN0aW9uPnRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlKS5yZW5kZXIodGhpcy5jdXJyZW50UXVlc3Rpb24ucXVlc3Rpb24sIHRoaXMuY3VycmVudEFuc3dlcik7XG5cdFx0XHR9XG5cdH1cblxuXHRuZXh0KCkge1xuXHRcdGlmICh0aGlzLnFJbmRleCA8IHRoaXMuZXhlcmNpc2VRdWVzdGlvbnMubGVuZ3RoIC0gMSkge1xuXHRcdFx0dGhpcy5kaXNwbGF5UXVlc3Rpb24odGhpcy5xSW5kZXggKyAxKTtcblx0XHRcdHRoaXMuc3RhZ2UgPSAncXVlc3Rpb24nO1xuXHRcdFx0aWYgKHRoaXMuY29tcG9uZW50UmVmKVxuXHRcdFx0XHQoPElRdWVzdGlvbj50aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZSkubW9kZSA9ICdzdHVkeSc7XG5cdFx0fVxuXHR9XG5cblx0cHJldigpIHtcblx0XHRpZiAodGhpcy5xSW5kZXggPiAwKSB7XG5cdFx0XHR0aGlzLmRpc3BsYXlRdWVzdGlvbih0aGlzLnFJbmRleCAtIDEpO1xuXHRcdFx0dGhpcy5zdGFnZSA9ICdxdWVzdGlvbic7XG5cdFx0XHRpZiAodGhpcy5jb21wb25lbnRSZWYpXG5cdFx0XHRcdCg8SVF1ZXN0aW9uPnRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlKS5tb2RlID0gJ3N0dWR5Jztcblx0XHR9XG5cdH1cblxuXHRkZWxldGUoZXhlcmNpc2VRdWVzdGlvbnMpIHtcblx0XHRpZiAoZXhlcmNpc2VRdWVzdGlvbnMgJiYgZXhlcmNpc2VRdWVzdGlvbnMubGVuZ3RoKVxuXHRcdFx0dGhpcy5jb25maXJtKCdBcmUgeW91IHN1cmUgdG8gZGVsZXRlID8nLCAoKSA9PiB7XG5cdFx0XHRcdEV4ZXJjaXNlUXVlc3Rpb24uZGVsZXRlQXJyYXkodGhpcywgZXhlcmNpc2VRdWVzdGlvbnMpLnN1YnNjcmliZSgoKT0+IHtcblx0XHRcdFx0XHR2YXIgcXVlc3Rpb25JZHMgPSBfLnBsdWNrKGV4ZXJjaXNlUXVlc3Rpb25zLCAncXVlc3Rpb25faWQnKTtcblx0XHRcdFx0XHR0aGlzLmV4ZXJjaXNlUXVlc3Rpb25zID0gXy5yZWplY3QodGhpcy5leGVyY2lzZVF1ZXN0aW9ucywgKGV4ZXJjaXNlUXVlc3Rpb246RXhlcmNpc2VRdWVzdGlvbik9PiB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gXy5jb250YWlucyhxdWVzdGlvbklkcywgZXhlcmNpc2VRdWVzdGlvbi5xdWVzdGlvbl9pZCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdH1cblxufVxuXG4iXX0=

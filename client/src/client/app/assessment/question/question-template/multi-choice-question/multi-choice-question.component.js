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
var option_model_1 = require("../../../../shared/models/elearning/option.model");
var base_component_1 = require("../../../../shared/components/base/base.component");
var _ = require("underscore");
var question_decorator_1 = require("../question.decorator");
var MultiChoiceQuestionComponent = (function (_super) {
    __extends(MultiChoiceQuestionComponent, _super);
    function MultiChoiceQuestionComponent() {
        var _this = _super.call(this) || this;
        _this.options = [];
        return _this;
    }
    MultiChoiceQuestionComponent.prototype.render = function (question, answer) {
        var _this = this;
        this.question = question;
        this.answer = answer;
        if (this.question.id) {
            option_model_1.QuestionOption.listByQuestion(this, question.id).subscribe(function (options) {
                _this.options = options;
                if (_this.answer && _this.answer.id) {
                    var selectedOptions = JSON.parse(_this.answer.json);
                    _.each(options, (function (option) {
                        var selected = _.find(selectedOptions, function (obj) {
                            return obj == option.id;
                        });
                        if (selected)
                            option["is_selected"] = true;
                        option["is_selected"] = false;
                    }));
                }
            });
        }
    };
    MultiChoiceQuestionComponent.prototype.saveEditor = function () {
        var _this = this;
        return this.question.save(this).flatMap(function () {
            var subscriptions = [];
            _.each(_this.options, function (option) {
                option.question_id = _this.question.id;
                subscriptions.push(option.save(_this));
            });
            return Rx_1.Observable.forkJoin.apply(Rx_1.Observable, subscriptions);
        });
    };
    MultiChoiceQuestionComponent.prototype.concludeAnswer = function () {
        var _this = this;
        this.answer.is_correct = true;
        var selectedOptions = _.filter(this.options, function (option) {
            return option["is_selected"];
        });
        this.answer.json = JSON.stringify(_.pluck(selectedOptions, "id"));
        _.each(this.options, (function (option) {
            if ((option.is_correct && !option["]is_selected"]) || (!option.is_correct && option["is_selected"]))
                _this.answer.is_correct = false;
        }));
    };
    MultiChoiceQuestionComponent.prototype.addOption = function () {
        this.options.push(new option_model_1.QuestionOption());
    };
    MultiChoiceQuestionComponent.prototype.removeOption = function (option) {
        var _this = this;
        if (option.id) {
            option.delete(this).subscribe(function () {
                _this.options = _.reject(_this.options, function (obj) {
                    return obj == option;
                });
            });
        }
        else
            this.options = _.reject(this.options, function (obj) {
                return obj == option;
            });
    };
    MultiChoiceQuestionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'multi-choice-question',
            templateUrl: 'multi-choice-question.component.html',
            styleUrls: ['multi-choice-question.component.css'],
        }),
        question_decorator_1.QuestionTemplate({
            type: 'mc'
        }),
        __metadata("design:paramtypes", [])
    ], MultiChoiceQuestionComponent);
    return MultiChoiceQuestionComponent;
}(base_component_1.BaseComponent));
exports.MultiChoiceQuestionComponent = MultiChoiceQuestionComponent;
//# sourceMappingURL=multi-choice-question.component.js.map
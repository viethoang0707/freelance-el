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
var base_component_1 = require("../../../../shared/components/base/base.component");
var question_decorator_1 = require("../question.decorator");
var RateQuestionComponent = (function (_super) {
    __extends(RateQuestionComponent, _super);
    function RateQuestionComponent() {
        return _super.call(this) || this;
    }
    RateQuestionComponent.prototype.render = function (question, answer) {
        this.question = question;
        this.answer = answer;
    };
    RateQuestionComponent.prototype.saveEditor = function () {
        return this.question.save(this);
    };
    RateQuestionComponent.prototype.concludeAnswer = function () {
    };
    RateQuestionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'rate-question',
            template: "<div *ngIf=\"mode=='edit'\">   <div class=\"ui-g-12 \">     <label>{{'Content'|translate}}</label>     <p-editor [(ngModel)]=\"question.content\" [style]=\"{'height':'120px'}\" name=\"content\">     </p-editor>   </div>   <div class=\"ui-g-12\">     <p-spinner min=\"0\" max=\"5\" [(ngModel)]=\"question.max_rating\" name=\"rate_max\"></p-spinner >   </div>  </div> <div *ngIf=\"mode=='study'\">   <div class=\"ui-g-12 \">     <label>{{'Content'|translate}}</label>     <p [innerHTML]=\"question.content\"></p>   </div>   <div class=\"ui-g-12\">     <p-rating [(ngModel)]=\"answer.text\" [stars]=\"question.max_rating\"></p-rating>   </div> </div> <div *ngIf=\"mode=='review'\">   <div class=\"ui-g-12 \">     <p class=\"question\" [innerHTML]=\"question.content\"></p>   </div>   <div class=\"ui-g-12\">     <p-rating [(ngModel)]=\"answer.text\" [stars]=\"question.max_rating\" [readonly]=\"true\"></p-rating>   </div> </div> <div *ngIf=\"mode=='preview'\">   <div class=\"ui-g-12 \">     <p class=\"question\" [innerHTML]=\"question.content\"></p>   </div>   <div class=\"ui-g-12\">     <p-rating [(ngModel)]=\"answer.text\" [stars]=\"question.max_rating\"></p-rating>   </div> </div>",
            styles: [".options-question li{margin-bottom:10px;list-style:none}.options-question p-checkbox{float:left}.options-question .md-inputfield{float:left;margin-left:5px}.options-question .ui-button.ui-button-icon-only{margin-left:10px;width:2em;height:2em}p.question{margin:0}"],
        }),
        question_decorator_1.QuestionTemplate({
            type: 'rate'
        }),
        __metadata("design:paramtypes", [])
    ], RateQuestionComponent);
    return RateQuestionComponent;
}(base_component_1.BaseComponent));
exports.RateQuestionComponent = RateQuestionComponent;

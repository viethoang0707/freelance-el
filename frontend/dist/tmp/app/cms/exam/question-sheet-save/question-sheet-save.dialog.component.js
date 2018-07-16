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
var question_sheet_model_1 = require("../../../shared/models/elearning/question-sheet.model");
var _ = require("underscore");
var QuestionSheetSaveDialog = (function (_super) {
    __extends(QuestionSheetSaveDialog, _super);
    function QuestionSheetSaveDialog() {
        var _this = _super.call(this) || this;
        _this.sheet = new question_sheet_model_1.QuestionSheet();
        return _this;
    }
    QuestionSheetSaveDialog.prototype.show = function (sheet, questions) {
        this.display = true;
        this.sheet = sheet;
        this.examQuestions = questions;
    };
    QuestionSheetSaveDialog.prototype.save = function () {
        var _this = this;
        var sheet = new question_sheet_model_1.QuestionSheet();
        sheet.name = this.sheet.name;
        sheet.save(this).subscribe(function () {
            var examQuestions = _.map(_this.examQuestions, function (question) {
                var questionTempl = question.clone();
                questionTempl.exam_id = null;
                questionTempl.sheet_id = sheet.id;
                return questionTempl;
            });
            var subscriptions = _.map(examQuestions, function (examQuestion) {
                return examQuestion.save(_this);
            });
            subscriptions.push(_this.sheet.save(_this));
            Observable_1.Observable.forkJoin(subscriptions).subscribe(function () {
                _this.success(_this.translateService.instant('Question sheet saved successfully'));
                _this.hide();
            });
        });
    };
    QuestionSheetSaveDialog.prototype.hide = function () {
        this.display = false;
    };
    QuestionSheetSaveDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-sheet-save-dialog',
            template: "<p-dialog header=\"{{'Save question sheet'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"300\" [responsive]=\"true\" appendTo=\"body\">   <div class=\"spinner\" [hidden]=\"!loading\"></div>   <div class=\"ui-dialog-content\">     <form class=\"form-horizontal form-simple\" (ngSubmit)=\"f.form.valid && save()\" id=\"saveQuestionSheet\" #f=\"ngForm\" novalidate autocomplete=\"off\">       <div class=\"ui-g form-group ui-fluid\">         <div class=\"ui-g-12\">           <span class=\"md-inputfield\">             <input type=\"text\" pInputText  name=\"name\" [(ngModel)]=\"sheet.name\" required #name_input=\"ngModel\">             <label>{{'Name'|translate}}: </label>         </span>           <div *ngIf=\"name_input.invalid && (name_input.dirty || name_input.touched)\" class=\"ui-message ui-messages-error ui-corner-all\">             <div *ngIf=\"name_input.errors.required\">               {{'Name is requried'|translate}}             </div>           </div>         </div>       </div>     </form>   </div>   <p-footer>     <button pButton type=\"button\" icon=\"ui-icon-check\" title=\"{{'Save'|translate}}\" label=\"{{'Save'|translate}}\" class=\" flat\" (click)=\"save()\"></button>     <button pButton type=\"button\" icon=\"ui-icon-close\" title=\"{{'Close'|translate}}\" label=\"{{'Close'|translate}}\" class=\" flat\" style=\"margin-right:4px;\" (click)=\"hide()\"></button>   </p-footer> </p-dialog>",
        }),
        __metadata("design:paramtypes", [])
    ], QuestionSheetSaveDialog);
    return QuestionSheetSaveDialog;
}(base_component_1.BaseComponent));
exports.QuestionSheetSaveDialog = QuestionSheetSaveDialog;

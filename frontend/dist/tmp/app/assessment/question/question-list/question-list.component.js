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
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var question_model_1 = require("../../../shared/models/elearning/question.model");
var group_model_1 = require("../../../shared/models/elearning/group.model");
var question_dialog_component_1 = require("../question-dialog/question-dialog.component");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var import_dialog_component_1 = require("../import-dialog/import-dialog.component");
var QuestionListComponent = (function (_super) {
    __extends(QuestionListComponent, _super);
    function QuestionListComponent() {
        var _this = _super.call(this) || this;
        _this.QUESTION_LEVEL = constants_1.QUESTION_LEVEL;
        _this.QUESTION_TYPE = constants_1.QUESTION_TYPE;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        _this.questions = [];
        _this.selectMode = "single";
        _this.items = [
            { label: _this.translateService.instant(constants_1.QUESTION_TYPE['sc']), command: function () { _this.addQuestion('sc'); } },
            { label: _this.translateService.instant(constants_1.QUESTION_TYPE['mc']), command: function () { _this.addQuestion('mc'); } },
            { label: _this.translateService.instant(constants_1.QUESTION_TYPE['ext']), command: function () { _this.addQuestion('ext'); } },
        ];
        return _this;
    }
    QuestionListComponent.prototype.ngOnInit = function () {
        var _this = this;
        group_model_1.Group.listQuestionGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
        });
        this.loadQuestions();
    };
    QuestionListComponent.prototype.addQuestion = function (type) {
        var _this = this;
        var question = new question_model_1.Question();
        question.type = type;
        this.questionDialog.show(question);
        this.questionDialog.onCreateComplete.subscribe(function () {
            _this.loadQuestions();
        });
    };
    QuestionListComponent.prototype.editQuestion = function () {
        if (this.selectedQuestions && this.selectMode == 'single')
            this.questionDialog.show(this.selectedQuestions);
    };
    QuestionListComponent.prototype.deleteMultipleQuestions = function () {
        var _this = this;
        if (this.selectedQuestions && this.selectedQuestions.length)
            this.confirm('Are you sure to delete ?', function () {
                question_model_1.Question.deleteArray(_this, _this.selectedQuestions).subscribe(function () {
                    _this.selectedQuestions = null;
                    _this.loadQuestions();
                    _this.selectMode = "single";
                });
            });
    };
    QuestionListComponent.prototype.loadQuestions = function () {
        var _this = this;
        question_model_1.Question.all(this).subscribe(function (questions) {
            _this.questions = questions;
            _this.displayQuestions = questions;
        });
    };
    QuestionListComponent.prototype.importQuestion = function () {
        var _this = this;
        this.questionImportDialog.show();
        this.questionImportDialog.onImportComplete.subscribe(function () {
            _this.loadQuestions();
        });
    };
    QuestionListComponent.prototype.filterQuestion = function () {
        var _this = this;
        if (this.selectedGroupNodes.length != 0) {
            this.displayQuestions = _.filter(this.questions, function (question) {
                var parentGroupNode = _.find(_this.selectedGroupNodes, function (node) {
                    return node.data.id == question.group_id;
                });
                return parentGroupNode != null;
            });
        }
        else {
            this.displayQuestions = this.questions;
        }
    };
    __decorate([
        core_1.ViewChild(question_dialog_component_1.QuestionDialog),
        __metadata("design:type", question_dialog_component_1.QuestionDialog)
    ], QuestionListComponent.prototype, "questionDialog", void 0);
    __decorate([
        core_1.ViewChild(import_dialog_component_1.QuestionImportDialog),
        __metadata("design:type", import_dialog_component_1.QuestionImportDialog)
    ], QuestionListComponent.prototype, "questionImportDialog", void 0);
    QuestionListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-list',
            template: "<div class=\"card card-w-title\">     <h1>{{'Question bank'|translate}}</h1>     <div class=\"ui-g\">         <div class=\"ui-g-12\">             <label>{{'Question group'|translate}}</label>             <p-tree [value]=\"tree\" selectionMode=\"checkbox\" [(selection)]=\"selectedGroupNodes\" (onNodeSelect)=\"filterQuestion()\" (onNodeUnselect)=\"filterQuestion()\" styleClass=\"width-tree\"></p-tree>         </div>         <div class=\"ui-g-12\">             <p-toolbar>                 <div class=\"ui-toolbar-group-left\">                     <p-splitButton label=\"{{'Add'|translate}}\" icon=\"ui-icon-add\" [model]=\"items\" styleClass=\"ui-button-success button-add-ques\"></p-splitButton>                     <button pButton type=\"button\" label=\"{{'Edit'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-mode-edit\" (click)=\"editQuestion()\" *ngIf=\"selectedQuestions && selectMode=='single'\"></button>                     <button pButton type=\"button\" label=\"{{'Delete'|translate}}\" class=\"red-btn\" icon=\"ui-icon-delete\" (click)=\"selectMode='multiple';selectedQuestions=[]\" *ngIf=\"selectMode=='single'\"></button>                     <button pButton type=\"button\"  class=\"red-btn\" icon=\"ui-icon-check\" (click)=\"deleteMultipleQuestions()\" *ngIf=\"selectMode=='multiple'\"></button>                     <button pButton type=\"button\"  class=\"red-btn\" icon=\"ui-icon-block\" (click)=\"selectMode='single';selectedQuestion=null\" *ngIf=\"selectMode=='multiple'\"></button>                 </div>                 <div class=\"ui-toolbar-group-right\">                     <button pButton type=\"button\" label=\"{{'Import'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-file-upload\" (click)=\"importQuestion()\"></button>                 </div>             </p-toolbar>             <p-table  #questionTable [value]=\"displayQuestions\" [paginator]=\"true\" [rows]=\"10\"  [(selection)]=\"selectedQuestions\" [responsive]=\"true\" selectionMode=\"{{selectMode}}\">                 <ng-template pTemplate=\"header\">                     <tr>                         <th style=\"width: 2.25em\" *ngIf=\"selectMode=='multiple'\">                             <p-tableHeaderCheckbox></p-tableHeaderCheckbox>                         </th>                         <th [pSortableColumn]=\"'title'\">                             {{'Title'|translate}}                             <p-sortIcon [field]=\"'title'\"></p-sortIcon>                         </th>                         <th width=\"40%\">{{'Content'|translate}}</th>                         <th width=\"15%\" [pSortableColumn]=\"'level'\">                             {{'Level'|translate}}                             <p-sortIcon [field]=\"'level'\"></p-sortIcon>                         </th>                         <th width=\"20%\" [pSortableColumn]=\"'type'\">                             {{'Type'|translate}}                             <p-sortIcon [field]=\"'type'\"></p-sortIcon>                         </th>                          <!-- <th [pSortableColumn]=\"'create_date'\">                             {{'Created'|translate}}                             <p-sortIcon [field]=\"'create_date'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'write_date'\">                             {{'Updated'|translate}}                             <p-sortIcon [field]=\"'write_date'\"></p-sortIcon>                         </th>    -->                     </tr>                 </ng-template>                 <ng-template pTemplate=\"body\" let-question let-i=\"rowIndex\">                     <tr [pSelectableRow]=\"question\">                         <td *ngIf=\"selectMode=='multiple'\">                             <p-tableCheckbox [value]=\"question\"></p-tableCheckbox>                         </td>                         <td style=\"text-align: left;\">{{question.title}}</td>                         <td class=\"q-content\" [innerHTML]=\"question.content\">{{question.content}}</td>                         <td class=\"showformb\">{{QUESTION_LEVEL[question.level] | translate}}</td>                         <td class=\"showformb\">{{QUESTION_TYPE[question.type] | translate}}</td>                         <!-- <td>{{question.create_date | date : \"dd/MM/yyyy \"}}</td>                         <td>{{question.write_date | date : \"dd/MM/yyyy \"}}</td> -->                     </tr>                 </ng-template>                 <ng-template pTemplate=\"summary\">                     {{'Total records'|translate}} : {{displayQuestions?.length}}                 </ng-template>             </p-table>             <question-dialog></question-dialog>             <question-import-dialog></question-import-dialog>         </div>     </div> </div>",
            styles: [".mrg-bt{margin-bottom:15px}.q-content{text-align:left}"],
        }),
        __metadata("design:paramtypes", [])
    ], QuestionListComponent);
    return QuestionListComponent;
}(base_component_1.BaseComponent));
exports.QuestionListComponent = QuestionListComponent;

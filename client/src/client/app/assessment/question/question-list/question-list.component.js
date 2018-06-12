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
var base_model_1 = require("../../../shared/models/base.model");
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
        base_model_1.BaseModel
            .bulk_search(this, group_model_1.Group.__api__listQuestionGroup(), question_model_1.Question.__api__all())
            .subscribe(function (jsonArr) {
            var groups = group_model_1.Group.toArray(jsonArr[0]);
            _this.tree = _this.treeUtils.buildGroupTree(groups);
            _this.questions = question_model_1.Question.toArray(jsonArr[1]);
            _this.displayQuestions = _this.questions;
        });
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
            templateUrl: 'question-list.component.html',
            styleUrls: ['question-list.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], QuestionListComponent);
    return QuestionListComponent;
}(base_component_1.BaseComponent));
exports.QuestionListComponent = QuestionListComponent;
//# sourceMappingURL=question-list.component.js.map
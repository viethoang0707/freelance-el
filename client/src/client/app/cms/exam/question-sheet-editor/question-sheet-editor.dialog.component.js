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
var question_model_1 = require("../../../shared/models/elearning/question.model");
var exam_question_model_1 = require("../../../shared/models/elearning/exam-question.model");
var constants_1 = require("../../../shared/models/constants");
var _ = require("underscore");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var QuestionSheetEditorDialog = (function (_super) {
    __extends(QuestionSheetEditorDialog, _super);
    function QuestionSheetEditorDialog() {
        var _this = _super.call(this) || this;
        _this.QUESTION_LEVEL = constants_1.QUESTION_LEVEL;
        _this.onSaveReceiver = new Rx_1.Subject();
        _this.onSave = _this.onSaveReceiver.asObservable();
        _this.initControl();
        return _this;
    }
    QuestionSheetEditorDialog.prototype.initControl = function () {
        var _this = this;
        this.treeUtils = new tree_utils_1.TreeUtils();
        this.examQuestions = [];
        this.tree = {};
        this.selectors = [];
        this.selectorGroups = {};
        this.selectedNodes = {};
        _.each(constants_1.QUESTION_LEVEL, function (val, key) {
            _this.selectorGroups[key] = {};
            _this.selectorGroups[key]["number"] = 0;
            _this.selectorGroups[key]["score"] = 0;
            _this.selectorGroups[key]["include_sub_group"] = true;
            _this.selectorGroups[key]["group_ids"] = [];
            _this.selectedNodes[key] = [];
        });
    };
    QuestionSheetEditorDialog.prototype.nodeSelect = function (event, level) {
        this.selectorGroups[level]["group_ids"] = _.map(this.selectedNodes[level], (function (node) {
            return node['data']['id'];
        }));
    };
    QuestionSheetEditorDialog.prototype.createExamQuestionFromQuestionBank = function (questions, score) {
        var _this = this;
        return _.map(questions, function (question) {
            var examQuestion = new exam_question_model_1.ExamQuestion();
            examQuestion.sheet_id = _this.sheet.id;
            examQuestion.question_id = question.id;
            examQuestion.score = score;
            return examQuestion;
        });
    };
    QuestionSheetEditorDialog.prototype.generateQuestion = function () {
        var _this = this;
        var subscriptions = [];
        _.each(constants_1.QUESTION_LEVEL, function (val, key) {
            var selectors = _.filter(_this.selectors, function (sel) {
                return sel["level"] == key;
            });
            var groupIds = [];
            _.each(selectors, function (sel) {
                if (sel["group_id"]) {
                    var selectedGroups = _this.treeUtils.getSubGroup(_this.groups, sel["group_id"]);
                    groupIds = groupIds.concat(_.pluck(selectedGroups, 'id'));
                }
            });
            groupIds = _.uniq(groupIds);
            if (groupIds.length > 0 && selectors[0]["number"])
                subscriptions.push(question_model_1.Question.listByGroups(_this, groupIds).do(function (questions) {
                    questions = _.shuffle(questions);
                    questions = _.filter(questions, function (obj) {
                        return obj.level == selectors[0]["level"];
                    });
                    var score = selectors[0]["score"];
                    questions = questions.slice(0, selectors[0]["number"]);
                    _this.examQuestions = _this.examQuestions.concat(_this.createExamQuestionFromQuestionBank(questions, score));
                }));
        });
        return subscriptions;
    };
    QuestionSheetEditorDialog.prototype.show = function (sheet) {
        this.initControl();
        this.display = true;
        this.sheet = sheet;
    };
    QuestionSheetEditorDialog.prototype.hide = function () {
        this.display = false;
    };
    QuestionSheetEditorDialog.prototype.save = function () {
        var _this = this;
        Rx_1.Observable.forkJoin(this.generateQuestion()).subscribe(function () {
            var subscriptions = _.map(_this.examQuestions, function (examQuestion) {
                return examQuestion.save(_this);
            });
            Rx_1.Observable.forkJoin.apply(Rx_1.Observable, subscriptions).subscribe(function () {
                _this.hide();
                _this.onSaveReceiver.next();
                _this.success(_this.translateService.instant('Content saved successfully.'));
            });
        });
    };
    QuestionSheetEditorDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-sheet-editor-dialog',
            templateUrl: 'question-sheet-editor.dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], QuestionSheetEditorDialog);
    return QuestionSheetEditorDialog;
}(base_component_1.BaseComponent));
exports.QuestionSheetEditorDialog = QuestionSheetEditorDialog;
//# sourceMappingURL=question-sheet-editor.dialog.component.js.map
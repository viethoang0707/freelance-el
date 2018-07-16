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
var group_model_1 = require("../../../shared/models/elearning/group.model");
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
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    QuestionSheetEditorDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.tree = {};
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
        group_model_1.Group.listQuestionGroup(this).subscribe(function (groups) {
            _.each(constants_1.QUESTION_LEVEL, function (val, key) {
                _this.tree[key] = _this.treeUtils.buildGroupTree(groups);
                _this.selectedNodes[key] = _.map(_this.selectorGroups[key]["group_ids"], (function (group_id) {
                    return _this.treeUtils.findTreeNode(_this.tree[key], group_id);
                }));
            });
        });
    };
    QuestionSheetEditorDialog.prototype.nodeSelect = function (event, level) {
        this.selectorGroups[level]["group_ids"] = _.map(this.selectedNodes[level], (function (node) {
            return node['data']['id'];
        }));
    };
    QuestionSheetEditorDialog.prototype.createExamQuestionFromQuestionBank = function (questions, score) {
        return _.map(questions, function (question) {
            var examQuestion = new exam_question_model_1.ExamQuestion();
            examQuestion.question_id = question.id;
            examQuestion.score = score;
            examQuestion.title = question.title;
            examQuestion.group_id = question.group_id;
            examQuestion.group_id__DESC__ = question.group_id__DESC__;
            return examQuestion;
        });
    };
    QuestionSheetEditorDialog.prototype.generateQuestion = function () {
        var _this = this;
        var subscriptions = [];
        _.each(constants_1.QUESTION_LEVEL, function (val, key) {
            var groupIds = _this.selectorGroups[key]["group_ids"];
            if (groupIds.length > 0 && _this.selectorGroups[key]["number"])
                subscriptions.push(question_model_1.Question.listByGroups(_this, groupIds).do(function (questions) {
                    questions = _.shuffle(questions);
                    questions = _.filter(questions, function (obj) {
                        return obj.level == key;
                    });
                    var score = _this.selectorGroups[key]["score"];
                    questions = questions.slice(0, _this.selectorGroups[key]["number"]);
                    _this.examQuestions = _this.examQuestions.concat(_this.createExamQuestionFromQuestionBank(questions, score));
                }));
        });
        return subscriptions;
    };
    QuestionSheetEditorDialog.prototype.show = function () {
        this.display = true;
        this.examQuestions = [];
    };
    QuestionSheetEditorDialog.prototype.hide = function () {
        this.display = false;
    };
    QuestionSheetEditorDialog.prototype.save = function () {
        var _this = this;
        Rx_1.Observable.forkJoin(this.generateQuestion()).subscribe(function () {
            _this.hide();
            _this.onSaveReceiver.next(_this.examQuestions);
            _this.success(_this.translateService.instant('Content saved successfully.'));
        });
    };
    QuestionSheetEditorDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-sheet-editor-dialog',
            template: "<p-dialog header=\"{{'Question sheet design'|translate}}\" [(visible)]=\"display\" modal=\"false\" width=\"960\" height=\"600\" [responsive]=\"true\" appendTo=\"body\">   <div class=\"spinner\" [hidden]=\"!loading\"></div>   <p-scrollPanel [style]=\"{width: '100%', height: '480px'}\">     <div class=\"ui-g ui-fluid form-group\">       <div *ngFor=\"let level of QUESTION_LEVEL | keys\" class=\"ui-g-12\">         <p-fieldset>           <p-header>{{QUESTION_LEVEL[level]|translate}}</p-header>           <div class=\"ui-g-12\" style=\"margin-bottom: 10px;\">             <label>{{'Group'|translate}}</label>             <p-tree [value]=\"tree[level]\" selectionMode=\"checkbox\" [(selection)]=\"selectedNodes[level]\" (onNodeSelect)=\"nodeSelect($event,level)\"></p-tree>           </div>           <div class=\"ui-g-6\">             <span class=\"md-inputfield\">                 <input type=\"text\" pInputText [(ngModel)]=\"selectorGroups[level].number\" name=\"number\" pKeyFilter=\"pint\" >                 <label>{{'Number of question'|translate}}</label>                 </span>           </div>           <div class=\"ui-g-6\">             <span class=\"md-inputfield\">                 <input type=\"text\" pInputText [(ngModel)]=\"selectorGroups[level].score\" name=\"number\" pKeyFilter=\"num\" >                 <label>{{'Question score'|translate}}</label>                 </span>           </div>         </p-fieldset>       </div>     </div>   </p-scrollPanel>   <p-footer>     <button type=\"button\" pButton icon=\"fa-check\" label=\"{{'Save'|translate}}\" (click)=\"save()\"></button>     <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>   </p-footer> </p-dialog>",
        }),
        __metadata("design:paramtypes", [])
    ], QuestionSheetEditorDialog);
    return QuestionSheetEditorDialog;
}(base_component_1.BaseComponent));
exports.QuestionSheetEditorDialog = QuestionSheetEditorDialog;

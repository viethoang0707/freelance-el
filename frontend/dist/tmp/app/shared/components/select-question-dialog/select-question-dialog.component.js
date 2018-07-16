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
var group_model_1 = require("../../models/elearning/group.model");
var base_component_1 = require("../base/base.component");
var question_model_1 = require("../../models/elearning/question.model");
var tree_utils_1 = require("../../helpers/tree.utils");
var constants_1 = require("../../../shared/models/constants");
var SelectQuestionsDialog = (function (_super) {
    __extends(SelectQuestionsDialog, _super);
    function SelectQuestionsDialog() {
        var _this = _super.call(this) || this;
        _this.QUESTION_TYPE = constants_1.QUESTION_TYPE;
        _this.onSelectQuestionsReceiver = new Rx_1.Subject();
        _this.onSelectQuestions = _this.onSelectQuestionsReceiver.asObservable();
        _this.display = false;
        _this.selectedQuestions = [];
        _this.questions = [];
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    SelectQuestionsDialog.prototype.hide = function () {
        this.display = false;
    };
    SelectQuestionsDialog.prototype.nodeSelect = function (event) {
        var _this = this;
        if (this.selectedGroupNodes) {
            var groupNodes = [];
            this.selectedGroupNodes.forEach(function (node) {
                groupNodes.push(node.data.id);
            });
            question_model_1.Question.listByGroups(this, groupNodes).subscribe(function (questions) {
                _this.questions = questions;
            });
        }
    };
    SelectQuestionsDialog.prototype.show = function () {
        var _this = this;
        this.display = true;
        this.selectedQuestions = [];
        group_model_1.Group.listQuestionGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
        });
    };
    SelectQuestionsDialog.prototype.selectCourse = function () {
        this.onSelectQuestionsReceiver.next(this.selectedQuestions);
        this.hide();
    };
    SelectQuestionsDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'select-question-dialog',
            template: "<p-dialog header=\"{{'Select question'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"800\" height=\"100%\" [responsive]=\"true\" appendTo=\"body\" [positionTop]=\"50\">   <div class=\"spinner\" [hidden]=\"!loading\"></div>   <div class=\"ui-g ui-fluid form-group\">     <div class=\"ui-g-4\">       <p-tree [value]=\"tree\" selectionMode=\"checkbox\" (onNodeSelect)=\"nodeSelect($event)\" (onNodeUnselect)=\"nodeSelect($event)\" [(selection)]=\"selectedGroupNodes\"></p-tree>     </div>     <div class=\"ui-g-8\">       <p-table  [value]=\"questions\" [(selection)]=\"selectedQuestions\" >         <ng-template pTemplate=\"header\" >           <tr>             <th style=\"width: 2.25em\">                 <p-tableHeaderCheckbox></p-tableHeaderCheckbox>             </th>             <th>               {{'Title'|translate}}             </th>             <th>               {{'Type'|translate}}             </th>           </tr>         </ng-template>         <ng-template pTemplate=\"body\" let-rowData>           <tr [pSelectableRow]=\"rowData\">             <td>               <p-tableCheckbox [value]=\"rowData\"></p-tableCheckbox>             </td>             <td >               {{rowData.title}}             </td>             <td >               {{QUESTION_TYPE[rowData.type] | translate}}             </td>           </tr>         </ng-template>       </p-table>     </div>   </div>   <p-footer>     <button type=\"button\" [disabled]=\"!selectedQuestions.length\" pButton icon=\"fa-check\" label=\"{{'OK'|translate}}\" (click)=\"selectCourse()\"></button>     <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>   </p-footer> </p-dialog>",
            styles: [".form-group{max-height:450px}"],
        }),
        __metadata("design:paramtypes", [])
    ], SelectQuestionsDialog);
    return SelectQuestionsDialog;
}(base_component_1.BaseComponent));
exports.SelectQuestionsDialog = SelectQuestionsDialog;

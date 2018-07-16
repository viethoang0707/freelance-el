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
var base_component_1 = require("../../shared/components/base/base.component");
var _ = require("underscore");
var competency_model_1 = require("../../shared/models/elearning/competency.model");
var group_model_1 = require("../../shared/models/elearning/group.model");
var competency_dialog_component_1 = require("../competency-dialog/competency-dialog.component");
var tree_utils_1 = require("../../shared/helpers/tree.utils");
var competency_level_model_1 = require("../../shared/models/elearning/competency-level.model");
var CompetencyListComponent = (function (_super) {
    __extends(CompetencyListComponent, _super);
    function CompetencyListComponent() {
        var _this = _super.call(this) || this;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        _this.competencies = [];
        return _this;
    }
    CompetencyListComponent.prototype.ngOnInit = function () {
        var _this = this;
        group_model_1.Group.listCompetencyGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
        });
        this.loadCompetencies();
    };
    CompetencyListComponent.prototype.addCompetency = function () {
        var _this = this;
        var competency = new competency_model_1.Competency();
        this.competencyDialog.show(competency);
        this.competencyDialog.onCreateComplete.subscribe(function () {
            _this.loadCompetencies();
        });
    };
    CompetencyListComponent.prototype.editCompetency = function () {
        var _this = this;
        if (this.selectedCompetency)
            this.competencyDialog.show(this.selectedCompetency);
        this.competencyDialog.onUpdateComplete.subscribe(function () {
            _this.loadCompetencies();
        });
    };
    CompetencyListComponent.prototype.deleteCompetency = function () {
        var _this = this;
        if (this.selectedCompetency)
            this.confirm(this.translateService.instant('Are you sure to delete?'), function () {
                _this.selectedCompetency.delete(_this).subscribe(function () {
                    _this.selectedCompetency = null;
                    _this.loadCompetencies();
                });
            });
    };
    CompetencyListComponent.prototype.loadCompetencies = function () {
        var _this = this;
        competency_model_1.Competency.all(this).subscribe(function (competencies) {
            competency_level_model_1.CompetencyLevel.all(_this).subscribe(function (levels) {
                _this.levels = levels;
                _.each(competencies, function (competency) {
                    competency.levels = _.filter(_this.levels, function (level) {
                        return level.competency_id == competency.id;
                    });
                });
                _this.competencies = competencies;
                _this.displayCompetencies = competencies;
            });
        });
    };
    CompetencyListComponent.prototype.filterCompetency = function () {
        var _this = this;
        if (this.selectedGroupNodes.length != 0) {
            this.displayCompetencies = _.filter(this.competencies, function (competency) {
                var parentGroupNode = _.find(_this.selectedGroupNodes, function (node) {
                    return node.data.id == competency.group_id;
                });
                return parentGroupNode != null;
            });
        }
        else {
            this.displayCompetencies = this.competencies;
        }
    };
    __decorate([
        core_1.ViewChild(competency_dialog_component_1.CompetencyDialog),
        __metadata("design:type", competency_dialog_component_1.CompetencyDialog)
    ], CompetencyListComponent.prototype, "competencyDialog", void 0);
    CompetencyListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'competency-list',
            template: "<div class=\"card card-w-title\">     <h1>{{'Competency list'|translate}}</h1>     <div class=\"ui-g\">         <div class=\"ui-g-12\">             <label>{{'Competency group'|translate}}</label>             <p-tree [value]=\"tree\" selectionMode=\"checkbox\" [(selection)]=\"selectedGroupNodes\" (onNodeSelect)=\"filterCompetency()\" (onNodeUnselect)=\"filterCompetency()\"></p-tree>         </div>         <div class=\"ui-g-12\">             <p-toolbar>                 <div class=\"ui-toolbar-group-left\">                     <button pButton type=\"button\" label=\"{{'New'|translate}}\" class=\"green-btn\" (click)=\"addCompetency()\" icon=\"ui-icon-add\"></button>                     <button pButton type=\"button\" label=\"{{'Edit'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-mode-edit\" (click)=\"editCompetency()\" *ngIf=\"selectedCompetency\"></button>                     <button pButton type=\"button\" label=\"{{'Delete'|translate}}\" class=\"red-btn\" icon=\"ui-icon-delete\" (click)=\"deleteCompetency()\" *ngIf=\"selectedCompetency\"></button>                 </div>             </p-toolbar>             <p-table #skillTable [value]=\"displayCompetencies\" [paginator]=\"true\" [rows]=\"10\" [(selection)]=\"selectedCompetency\" [responsive]=\"true\" selectionMode=\"single\">                 <ng-template pTemplate=\"header\">                     <tr>                         <th [pSortableColumn]=\"'name'\">                             {{'Name'|translate}}                             <p-sortIcon [field]=\"'name'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'group_id__DESC__'\">                             {{'Group'|translate}}                             <p-sortIcon [field]=\"'group_id__DESC__'\"></p-sortIcon>                         </th>                         <th>                             {{'Level'|translate}}                         </th>                         <th [pSortableColumn]=\"'create_date'\">                             {{'Created'|translate}}                             <p-sortIcon [field]=\"'create_date'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'write_date'\">                             {{'Updated'|translate}}                             <p-sortIcon [field]=\"'write_date'\"></p-sortIcon>                         </th>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"body\" let-competency let-i=\"rowIndex\">                     <tr [pSelectableRow]=\"competency\">                         <td style=\"text-align: center;\"> {{competency.name}}</td>                         <td style=\"text-align: center;\">{{competency.group_id__DESC__}}</td>                         <td>                             {{competency.levelSummary()}}                         </td>                         <td>{{competency.create_date | date : \"dd/MM/yyyy \"}}</td>                         <td>{{competency.write_date | date : \"dd/MM/yyyy \"}}</td>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"summary\">                     {{'Total records'|translate}} : {{displayCompetencies?.length}}                 </ng-template>             </p-table>             <competency-dialog></competency-dialog>         </div>     </div> </div>",
            styles: [".mrg-bt{margin-bottom:15px}.q-content{text-align:left}"],
        }),
        __metadata("design:paramtypes", [])
    ], CompetencyListComponent);
    return CompetencyListComponent;
}(base_component_1.BaseComponent));
exports.CompetencyListComponent = CompetencyListComponent;

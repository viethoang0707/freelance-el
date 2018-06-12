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
        this.buildCompetencyGroup();
        this.loadCompetencies();
    };
    CompetencyListComponent.prototype.buildCompetencyGroup = function () {
        var _this = this;
        group_model_1.Group.listCompetencyGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
        });
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
            this.confirm('Are you sure to delete ?', function () {
                _this.selectedCompetency.delete(_this).subscribe(function () {
                    _this.selectedCompetency = null;
                    _this.loadCompetencies();
                });
            });
    };
    CompetencyListComponent.prototype.loadCompetencies = function () {
        var _this = this;
        competency_model_1.Competency.all(this).subscribe(function (competencies) {
            _.each(competencies, function (competency) {
                competency["levels"] = [];
            });
            _this.competencies = competencies;
            _this.displayCompetencies = competencies;
            competency_level_model_1.CompetencyLevel.all(_this).subscribe(function (levels) {
                _.each(_this.competencies, function (competency) {
                    competency_level_model_1.CompetencyLevel.listByCompetency(_this, competency["id"]).subscribe(function (levels) {
                        competency["levels"] = _.reduce(levels, function (memo, level) { return memo + level["name"] + ','; }, '');
                    });
                });
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
            templateUrl: 'competency-list.component.html',
            styleUrls: ['competency-list.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], CompetencyListComponent);
    return CompetencyListComponent;
}(base_component_1.BaseComponent));
exports.CompetencyListComponent = CompetencyListComponent;
//# sourceMappingURL=competency-list.component.js.map
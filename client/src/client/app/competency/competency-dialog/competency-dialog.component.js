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
var group_model_1 = require("../../shared/models/elearning/group.model");
var base_dialog_1 = require("../../shared/components/base/base.dialog");
var _ = require("underscore");
var tree_utils_1 = require("../../shared/helpers/tree.utils");
var competency_level_model_1 = require("../../shared/models/elearning/competency-level.model");
var CompetencyDialog = (function (_super) {
    __extends(CompetencyDialog, _super);
    function CompetencyDialog(componentFactoryResolver, changeDetectionRef) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.changeDetectionRef = changeDetectionRef;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    CompetencyDialog.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            this.object.group_id = this.selectedNode.data.id;
            this.object.group_id__DESC__ = this.selectedNode.data.name;
        }
    };
    CompetencyDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            group_model_1.Group.listCompetencyGroup(_this).subscribe(function (groups) {
                _this.tree = _this.treeUtils.buildGroupTree(groups);
                if (object.group_id) {
                    _this.selectedNode = _this.treeUtils.findTreeNode(_this.tree, object.group_id);
                }
            });
            competency_level_model_1.CompetencyLevel.listByCompetency(_this, object.id).subscribe(function (levels) {
                _this.levels = levels;
            });
        });
    };
    CompetencyDialog.prototype.addCompetencyLevel = function () {
        var level = new competency_level_model_1.CompetencyLevel();
        level.name = 'New level';
        this.levels.push(level);
    };
    CompetencyDialog.prototype.updateCompetencyLevel = function () {
        var _this = this;
        var subscriptions = _.map(this.levels, function (level) {
            if (!level.name || level.name == '') {
                if (level.id)
                    return level.delete(_this);
                else
                    return Observable_1.Observable.of(true);
            }
            else {
                level.competency_id = _this.object.id;
                return level.save(_this);
            }
        });
        if (subscriptions.length)
            return Observable_1.Observable.forkJoin.apply(Observable_1.Observable, subscriptions);
        else
            return Observable_1.Observable.of(true);
    };
    CompetencyDialog.prototype.saveWithLevel = function () {
        var _this = this;
        if (!this.object.id) {
            this.object.save(this).subscribe(function () {
                _this.updateCompetencyLevel().subscribe(function () {
                    _this.onCreateCompleteReceiver.next(_this.object);
                    _this.success('Object created successfully.');
                    _this.hide();
                });
            }, function () {
                _this.error('Permission denied');
            });
        }
        else {
            this.object.save(this).subscribe(function () {
                _this.updateCompetencyLevel().subscribe(function () {
                    _this.onUpdateCompleteReceiver.next(_this.object);
                    _this.success('Object saved successfully.');
                    _this.hide();
                });
            }, function () {
                _this.error('Permission denied');
            });
        }
    };
    CompetencyDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'competency-dialog',
            templateUrl: 'competency-dialog.component.html',
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver, core_1.ChangeDetectorRef])
    ], CompetencyDialog);
    return CompetencyDialog;
}(base_dialog_1.BaseDialog));
exports.CompetencyDialog = CompetencyDialog;
//# sourceMappingURL=competency-dialog.component.js.map
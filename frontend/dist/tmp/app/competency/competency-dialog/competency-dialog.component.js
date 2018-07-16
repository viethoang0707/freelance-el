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
        _this.levels = [];
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
            _this.levels = [];
            group_model_1.Group.listCompetencyGroup(_this).subscribe(function (groups) {
                _this.tree = _this.treeUtils.buildGroupTree(groups);
                if (object.group_id) {
                    _this.selectedNode = _this.treeUtils.findTreeNode(_this.tree, object.group_id);
                }
            });
            if (_this.object.id)
                competency_level_model_1.CompetencyLevel.listByCompetency(_this, _this.object.id).subscribe(function (levels) {
                    _this.levels = levels;
                });
        });
    };
    CompetencyDialog.prototype.addCompetencyLevel = function () {
        var level = new competency_level_model_1.CompetencyLevel();
        level.name = 'New level';
        this.levels.push(level);
    };
    CompetencyDialog.prototype.saveWithLevel = function () {
        var _this = this;
        var isNew = this.object.IsNew;
        this.object.save(this).subscribe(function () {
            _.each(_this.levels, function (level) {
                level.competency_id = _this.object.id;
            });
            var existLevels = _.filter(_this.levels, function (level) {
                return !level.IsNew && (level.name && level.name != '');
            });
            var newLevels = _.filter(_this.levels, function (level) {
                return level.IsNew && (level.name && level.name != '');
            });
            var deleteLevels = _.filter(_this.levels, function (level) {
                return !level.IsNew && (!level.name || level.name === '');
            });
            Observable_1.Observable.forkJoin(competency_level_model_1.CompetencyLevel.updateArray(_this, existLevels), competency_level_model_1.CompetencyLevel.createArray(_this, newLevels), competency_level_model_1.CompetencyLevel.deleteArray(_this, deleteLevels))
                .subscribe(function () {
                if (isNew) {
                    _this.onCreateCompleteReceiver.next(_this.object);
                    _this.success(_this.translateService.instant('Object created successfully.'));
                    _this.hide();
                }
                else {
                    _this.onUpdateCompleteReceiver.next(_this.object);
                    _this.success(_this.translateService.instant('Object created successfully.'));
                    _this.hide();
                }
            });
        });
    };
    CompetencyDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'competency-dialog',
            template: "<form novalidate (ngSubmit)=\"f.form.valid && saveWithLevel()\" #f=\"ngForm\" autocomplete=\"off\">     <p-dialog header=\"{{'Competency'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"800\" [responsive]=\"true\">         <div class=\"spinner\" [hidden]=\"!loading\"></div>         <p-scrollPanel [style]=\"{width: '100%', height: '460px'}\">             <div class=\"ui-g ui-fluid form-group\">                 <div class=\"ui-g-12\">                     <label>{{'Group'|translate}}</label>                     <p-tree [value]=\"tree\" selectionMode=\"single\" required [(selection)]=\"selectedNode\" (onNodeSelect)=\"nodeSelect($event)\"></p-tree>                     <div *ngIf=\"selectedNode==null\" class=\"ui-message ui-messages-error ui-corner-all\">                         {{'Selected group is required' | translate}}</div>                 </div>                 <div class=\" ui-g-12 \">                     <div class=\" ui-g-6\">                         <span class=\"md-inputfield\">                 <input type=\"text\" pInputText name=\"name\"                 [(ngModel)]=\"object.name\" #name=\"ngModel\"                 required>                 <label for=\"name\">{{'Name'|translate}}</label>                 <div *ngIf=\"name.invalid && (name.dirty || name.touched)\"                     class=\"ui-message ui-messages-error ui-corner-all\">                     <div *ngIf=\"name.errors.required\">                         {{'Name is required' | translate}}                     </div>                 </div>             </span>                     </div>                     <div class=\" ui-g-6 \">                         <p-toolbar>                             <div class=\"ui-toolbar-group-left\">                                 <button pButton type=\"button\" label=\"{{'New level'|translate}}\" class=\"green-btn\" (click)=\"addCompetencyLevel()\" icon=\"ui-icon-add\"></button>                             </div>                         </p-toolbar>                         <p-table #levelTable [value]=\"levels\" [paginator]=\"false\" [rows]=\"10\" [(selection)]=\"selectedLevel\" [responsive]=\"true\" selectionMode=\"single\">                             <ng-template pTemplate=\"header\">                                 <tr>                                     <th>                                         {{'Name'|translate}}                                     </th>                                 </tr>                             </ng-template>                             <ng-template pTemplate=\"body\" let-level let-i=\"rowIndex\">                                 <tr [pSelectableRow]=\"level\">                                     <td pEditableColumn>                                         <p-cellEditor>                                             <ng-template pTemplate=\"input\">                                                 <input type=\"text\" name=\"name\" [(ngModel)]=\"level.name\">                                             </ng-template>                                             <ng-template pTemplate=\"output\">                                                 {{level.name}}                                             </ng-template>                                         </p-cellEditor>                                     </td>                                 </tr>                             </ng-template>                         </p-table>                     </div>                 </div>             </div>         </p-scrollPanel>         <p-footer>             <button type=\"submit\" pButton icon=\"fa-check\" label=\"{{'Save'|translate}}\"></button>             <button type=\"button\" pButton icon=\"fa-close\" (click)=\"cancel()\" label=\"{{'Close'|translate}}\"></button>         </p-footer>     </p-dialog> </form>",
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver, core_1.ChangeDetectorRef])
    ], CompetencyDialog);
    return CompetencyDialog;
}(base_dialog_1.BaseDialog));
exports.CompetencyDialog = CompetencyDialog;

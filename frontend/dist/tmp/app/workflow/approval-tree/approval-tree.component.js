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
var select_admin_dialog_component_1 = require("../../shared/components/select-admin-dialog/select-admin-dialog.component");
var tree_utils_1 = require("../../shared/helpers/tree.utils");
var user_model_1 = require("../../shared/models/elearning/user.model");
var ApprovalTreeComponent = (function (_super) {
    __extends(ApprovalTreeComponent, _super);
    function ApprovalTreeComponent() {
        var _this = _super.call(this) || this;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        _this.viewModes = [
            { value: 'outline', title: 'Outline', icon: 'ui-icon-dehaze' },
            { value: 'detail', title: 'Detail', icon: 'ui-icon-apps' },
        ];
        _this.viewModes = _this.viewModes.map(function (viewMode) {
            return {
                label: viewMode.title,
                value: viewMode.value,
            };
        });
        _this.viewMode = 'outline';
        return _this;
    }
    ApprovalTreeComponent.prototype.ngOnInit = function () {
        this.buildEscalationTree();
    };
    ApprovalTreeComponent.prototype.onNodeSelect = function (event) {
        if (event.node && event.node.data)
            this.selectedUser = event.node.data;
        else
            this.selectedUser = null;
    };
    ApprovalTreeComponent.prototype.onNodeUnselect = function (event) {
        this.selectedUser = null;
    };
    ApprovalTreeComponent.prototype.buildEscalationTree = function () {
        var _this = this;
        user_model_1.User.listAllAdmin(this).subscribe(function (users) {
            _this.tree = _this.treeUtils.buildApprovalTree(users);
            _this.selectedUser = null;
        });
    };
    ApprovalTreeComponent.prototype.clearSupervisor = function () {
        var _this = this;
        if (this.selectedUser) {
            this.selectedUser.supervisor_id = null;
            this.selectedUser.save(this).subscribe(function () {
                _this.buildEscalationTree();
            });
        }
    };
    ApprovalTreeComponent.prototype.selectSupervisor = function () {
        var _this = this;
        if (this.selectedUser)
            this.adminDialog.show();
        this.adminDialog.onSelectUsers.first().subscribe(function (admin) {
            _this.selectedUser.supervisor_id = admin.id;
            _this.selectedUser.save(_this).subscribe(function () {
                _this.buildEscalationTree();
            });
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ApprovalTreeComponent.prototype, "viewMode", void 0);
    __decorate([
        core_1.ViewChild(select_admin_dialog_component_1.SelectAdminDialog),
        __metadata("design:type", select_admin_dialog_component_1.SelectAdminDialog)
    ], ApprovalTreeComponent.prototype, "adminDialog", void 0);
    ApprovalTreeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'approval-tree',
            template: "<div class=\"card card-w-title ui-g\">     <h1>{{'Approval tree'|translate}}</h1>     <div class=\"ui-g-12\">         <p-toolbar>             <div class=\"ui-toolbar-group-left\">                 <button pButton type=\"button\" label=\"{{'Select supervisor'|translate}}\" class=\"green-btn\" icon=\"ui-icon-transform\" (click)=\"selectSupervisor()\" [disabled]=\"!selectedUser\"></button>                 <button pButton type=\"button\" label=\"{{'Clear supervisor'|translate}}\" class=\"red-btn\" icon=\"ui-icon-clear\" (click)=\"clearSupervisor()\" [disabled]=\"!selectedUser\"></button>             </div>             <div class=\"ui-toolbar-group-right\">                 <p-selectButton [options]=\"viewModes\" [(ngModel)]=\"viewMode\"></p-selectButton>             </div>         </p-toolbar>         <p-organizationChart [value]=\"tree\" selectionMode=\"single\" [(selection)]=\"selectedNode\" (onNodeSelect)=\"onNodeSelect($event)\" (onNodeUnselect)=\"onNodeUnselect($event)\" styleClass=\"mt20 workflow\">             <ng-template let-node pTemplate=\"person\">                 <div class=\"node-header ui-corner-top\">{{node.data.group_id__DESC__}}</div>                 <div class=\"node-content\">                     <span class=\"profile-image-wrapper\" *ngIf=\"viewMode=='detail'\">                         <img [src]='node.data.image | imageBase64' width=\"32\" height=\"32\" />                     </span>                     <div>{{node.data.name}}</div>                 </div>             </ng-template>             <ng-template let-node pTemplate=\"department\">                 <div>{{node.label}}</div>             </ng-template>         </p-organizationChart>         <select-admin-dialog></select-admin-dialog>     </div> </div>",
            styles: [""],
        }),
        __metadata("design:paramtypes", [])
    ], ApprovalTreeComponent);
    return ApprovalTreeComponent;
}(base_component_1.BaseComponent));
exports.ApprovalTreeComponent = ApprovalTreeComponent;

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
        this.adminDialog.onSelectUsers.subscribe(function (admin) {
            _this.selectedUser.supervisor_id = admin.id;
            _this.selectedUser.save(_this).subscribe(function () {
                _this.buildEscalationTree();
            });
        });
    };
    __decorate([
        core_1.ViewChild(select_admin_dialog_component_1.SelectAdminDialog),
        __metadata("design:type", select_admin_dialog_component_1.SelectAdminDialog)
    ], ApprovalTreeComponent.prototype, "adminDialog", void 0);
    ApprovalTreeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'approval-tree',
            templateUrl: 'approval-tree.component.html',
            styleUrls: ['approval-tree.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], ApprovalTreeComponent);
    return ApprovalTreeComponent;
}(base_component_1.BaseComponent));
exports.ApprovalTreeComponent = ApprovalTreeComponent;
//# sourceMappingURL=approval-tree.component.js.map
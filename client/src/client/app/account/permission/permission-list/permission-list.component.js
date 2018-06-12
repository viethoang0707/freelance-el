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
var permission_model_1 = require("../../../shared/models/elearning/permission.model");
var permission_dialog_component_1 = require("../permission-dialog/permission-dialog.component");
var menu_permission_dialog_component_1 = require("../menu-permission-dialog/menu-permission-dialog.component");
var select_group_dialog_component_1 = require("../../../shared/components/select-group-dialog/select-group-dialog.component");
var member_permission_dialog_component_1 = require("../member-permission-dialog/member-permission-dialog.component");
var user_model_1 = require("../../../shared/models/elearning/user.model");
var PermissionListComponent = (function (_super) {
    __extends(PermissionListComponent, _super);
    function PermissionListComponent() {
        return _super.call(this) || this;
    }
    PermissionListComponent.prototype.ngOnInit = function () {
        this.loadPermission();
    };
    PermissionListComponent.prototype.loadPermission = function () {
        var _this = this;
        permission_model_1.Permission.all(this).subscribe(function (permissions) {
            _this.permissions = permissions;
        });
    };
    PermissionListComponent.prototype.addPermission = function () {
        var _this = this;
        this.permissionDialog.show(new permission_model_1.Permission());
        this.permissionDialog.onCreateComplete.subscribe(function () {
            _this.loadPermission();
        });
    };
    PermissionListComponent.prototype.editPermission = function () {
        if (this.selectedPermission)
            this.permissionDialog.show(this.selectedPermission);
    };
    PermissionListComponent.prototype.deletePermission = function () {
        var _this = this;
        if (this.selectedPermission) {
            user_model_1.User.countByPermission(this, this.selectedPermission.id).subscribe(function (count) {
                if (count > 0)
                    _this.error('You cannot delete permission assigned to other uers');
                else {
                    _this.confirm('Are you sure to delete ?', function () {
                        _this.selectedPermission.delete(_this).subscribe(function () {
                            _this.loadPermission();
                        });
                    });
                }
            });
        }
    };
    PermissionListComponent.prototype.permissionMember = function () {
        if (this.selectedPermission)
            this.memberPermissionDialog.show(this.selectedPermission);
    };
    PermissionListComponent.prototype.permissionMenu = function () {
        if (this.selectedPermission)
            this.menuPermissionDialog.show(this.selectedPermission);
    };
    PermissionListComponent.prototype.permissionAccess = function () {
        var _this = this;
        if (this.selectedPermission)
            this.userPermissionDialog.show();
        this.userPermissionDialog.onSelectGroup.subscribe(function (group) {
            _this.selectedPermission.user_group_id = group.id;
            _this.selectedPermission.save(_this).subscribe(function () {
                _this.loadPermission();
            });
        });
    };
    __decorate([
        core_1.ViewChild(permission_dialog_component_1.PermissionDialog),
        __metadata("design:type", permission_dialog_component_1.PermissionDialog)
    ], PermissionListComponent.prototype, "permissionDialog", void 0);
    __decorate([
        core_1.ViewChild(menu_permission_dialog_component_1.MenuPermissionDialog),
        __metadata("design:type", menu_permission_dialog_component_1.MenuPermissionDialog)
    ], PermissionListComponent.prototype, "menuPermissionDialog", void 0);
    __decorate([
        core_1.ViewChild(member_permission_dialog_component_1.MemberPermissionDialog),
        __metadata("design:type", member_permission_dialog_component_1.MemberPermissionDialog)
    ], PermissionListComponent.prototype, "memberPermissionDialog", void 0);
    __decorate([
        core_1.ViewChild(select_group_dialog_component_1.SelectGroupDialog),
        __metadata("design:type", select_group_dialog_component_1.SelectGroupDialog)
    ], PermissionListComponent.prototype, "userPermissionDialog", void 0);
    PermissionListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'permission-list',
            templateUrl: 'permission-list.component.html',
            styleUrls: ['permission-list.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], PermissionListComponent);
    return PermissionListComponent;
}(base_component_1.BaseComponent));
exports.PermissionListComponent = PermissionListComponent;
//# sourceMappingURL=permission-list.component.js.map
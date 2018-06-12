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
var user_model_1 = require("../../../shared/models/elearning/user.model");
var base_component_1 = require("../../../shared/components/base/base.component");
var _ = require("underscore");
var select_user_dialog_component_1 = require("../../../shared/components/select-user-dialog/select-user-dialog.component");
var base_model_1 = require("../../../shared/models/base.model");
var MemberPermissionDialog = (function (_super) {
    __extends(MemberPermissionDialog, _super);
    function MemberPermissionDialog() {
        return _super.call(this) || this;
    }
    MemberPermissionDialog.prototype.show = function (permission) {
        this.display = true;
        this.permission = permission;
        this.loadMembers();
    };
    MemberPermissionDialog.prototype.hide = function () {
        this.display = false;
    };
    MemberPermissionDialog.prototype.addMember = function () {
        var _this = this;
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.subscribe(function (users) {
            var updateApi = _.map(users, function (user) {
                user.permission_id = _this.permission.id;
                return user.__api__update();
            });
            base_model_1.BaseModel.bulk_update.apply(base_model_1.BaseModel, [_this].concat(updateApi)).subscribe(function () {
                _this.loadMembers();
            });
        });
    };
    MemberPermissionDialog.prototype.deleteMember = function () {
        var _this = this;
        if (this.selectedUsers && this.selectedUsers.length)
            this.confirm('Are you sure to remove ?', function () {
                _.each(_this.selectedUsers, function (user) {
                    user.permission_id = null;
                });
                user_model_1.User.updateArray(_this, _this.selectedUsers).subscribe(function () {
                    _this.loadMembers();
                });
            });
    };
    MemberPermissionDialog.prototype.loadMembers = function () {
        var _this = this;
        user_model_1.User.listByPermission(this, this.permission.id).subscribe(function (users) {
            _this.users = users;
        });
    };
    __decorate([
        core_1.ViewChild(select_user_dialog_component_1.SelectUsersDialog),
        __metadata("design:type", select_user_dialog_component_1.SelectUsersDialog)
    ], MemberPermissionDialog.prototype, "usersDialog", void 0);
    MemberPermissionDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'member-permission-dialog',
            templateUrl: 'member-permission-dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], MemberPermissionDialog);
    return MemberPermissionDialog;
}(base_component_1.BaseComponent));
exports.MemberPermissionDialog = MemberPermissionDialog;
//# sourceMappingURL=member-permission-dialog.component.js.map
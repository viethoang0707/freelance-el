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
var _ = require("underscore");
var user_model_1 = require("../../../shared/models/elearning/user.model");
var group_model_1 = require("../../../shared/models/elearning/group.model");
var user_dialog_component_1 = require("../user-dialog/user-dialog.component");
var export_dialog_component_1 = require("../export-dialog/export-dialog.component");
var import_dialog_component_1 = require("../import-dialog/import-dialog.component");
var profile_dialog_component_1 = require("../profile-dialog/profile-dialog.component");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var base_model_1 = require("../../../shared/models/base.model");
var UserListComponent = (function (_super) {
    __extends(UserListComponent, _super);
    function UserListComponent() {
        var _this = _super.call(this) || this;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    UserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        base_model_1.BaseModel
            .bulk_search(this, group_model_1.Group.__api__listUserGroup(), user_model_1.User.__api__all())
            .subscribe(function (jsonArr) {
            var groups = group_model_1.Group.toArray(jsonArr[0]);
            _this.tree = _this.treeUtils.buildGroupTree(groups);
            _this.users = user_model_1.User.toArray(jsonArr[1]);
            _this.displayUsers = _this.users;
        });
    };
    UserListComponent.prototype.loadUsers = function () {
        var _this = this;
        user_model_1.User.all(this).subscribe(function (users) {
            _this.users = users;
            _this.displayUsers = users;
        });
    };
    UserListComponent.prototype.buildGroupTree = function () {
        var _this = this;
        group_model_1.Group.listUserGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
        });
    };
    UserListComponent.prototype.addUser = function () {
        var _this = this;
        var user = new user_model_1.User();
        this.userDialog.show(user);
        this.userDialog.onCreateComplete.subscribe(function () {
            _this.loadUsers();
        });
    };
    UserListComponent.prototype.editUser = function () {
        if (this.selectedUser)
            this.userProfileDialog.show(this.selectedUser);
    };
    UserListComponent.prototype.activateUser = function () {
        var _this = this;
        if (this.selectedUser) {
            this.selectedUser.banned = false;
            this.selectedUser.save(this).subscribe(function () { }, function () {
                _this.error('Permission denied');
            });
        }
    };
    UserListComponent.prototype.deactivateUser = function () {
        var _this = this;
        if (this.selectedUser) {
            this.selectedUser.banned = true;
            this.selectedUser.save(this).subscribe(function () { }, function () {
                _this.error('Permission denied');
            });
        }
    };
    UserListComponent.prototype.exportUser = function () {
        this.userExportDialog.show(this.users);
    };
    UserListComponent.prototype.importUser = function () {
        var _this = this;
        this.userImportDialog.show();
        this.userImportDialog.onImportComplete.subscribe(function () {
            _this.loadUsers();
        });
    };
    UserListComponent.prototype.filterUser = function () {
        var _this = this;
        if (this.selectedGroupNodes.length != 0) {
            this.displayUsers = _.filter(this.users, function (user) {
                var parentGroupNode = _.find(_this.selectedGroupNodes, function (node) {
                    return node.data.id == user.group_id;
                });
                return parentGroupNode != null;
            });
        }
        else {
            this.displayUsers = this.users;
        }
    };
    __decorate([
        core_1.ViewChild(user_dialog_component_1.UserDialog),
        __metadata("design:type", user_dialog_component_1.UserDialog)
    ], UserListComponent.prototype, "userDialog", void 0);
    __decorate([
        core_1.ViewChild(export_dialog_component_1.UserExportDialog),
        __metadata("design:type", export_dialog_component_1.UserExportDialog)
    ], UserListComponent.prototype, "userExportDialog", void 0);
    __decorate([
        core_1.ViewChild(import_dialog_component_1.UserImportDialog),
        __metadata("design:type", import_dialog_component_1.UserImportDialog)
    ], UserListComponent.prototype, "userImportDialog", void 0);
    __decorate([
        core_1.ViewChild(profile_dialog_component_1.UserProfileDialog),
        __metadata("design:type", profile_dialog_component_1.UserProfileDialog)
    ], UserListComponent.prototype, "userProfileDialog", void 0);
    UserListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-list',
            templateUrl: 'user-list.component.html',
            styleUrls: ['user-list.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [])
    ], UserListComponent);
    return UserListComponent;
}(base_component_1.BaseComponent));
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map
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
var UserListComponent = (function (_super) {
    __extends(UserListComponent, _super);
    function UserListComponent() {
        var _this = _super.call(this) || this;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    UserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        group_model_1.Group.listUserGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
        });
        this.loadUsers();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hY2NvdW50L3VzZXIvdXNlci1saXN0L3VzZXItbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXVGO0FBRXZGLGlGQUErRTtBQUUvRSw4QkFBZ0M7QUFFaEMsMEVBQW1FO0FBQ25FLDRFQUFxRTtBQUNyRSw4RUFBa0U7QUFDbEUsb0ZBQTRFO0FBQzVFLG9GQUE0RTtBQUM1RSx1RkFBK0U7QUFDL0UsaUVBQStEO0FBYS9EO0lBQXVDLHFDQUFhO0lBY2hEO1FBQUEsWUFDSSxpQkFBTyxTQUVWO1FBREcsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHNCQUFTLEVBQUUsQ0FBQzs7SUFDckMsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFBQSxpQkFLQztRQUpHLG1CQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDdEMsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQscUNBQVMsR0FBVDtRQUFBLGlCQUtDO1FBSkcsaUJBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUMxQixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwwQ0FBYyxHQUFkO1FBQUEsaUJBSUM7UUFIRyxtQkFBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ3RDLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxj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QUFTLENBQUMsNENBQWlCLENBQUM7a0NBQW9CLDRDQUFpQjtnRUFBQztJQUwxRCxpQkFBaUI7UUFQN0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsV0FBVztZQUNyQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1lBQ3RDLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1NBQ3hDLENBQUM7O09BQ1csaUJBQWlCLENBNkY3QjtJQUFELHdCQUFDO0NBN0ZELEFBNkZDLENBN0ZzQyw4QkFBYSxHQTZGbkQ7QUE3RlksOENBQWlCIiwiZmlsZSI6ImFwcC9hY2NvdW50L3VzZXIvdXNlci1saXN0L3VzZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBVU0VSX1NUQVRVUywgR1JPVVBfQ0FURUdPUlkgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgVXNlckRpYWxvZyB9IGZyb20gJy4uL3VzZXItZGlhbG9nL3VzZXItZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyRXhwb3J0RGlhbG9nIH0gZnJvbSAnLi4vZXhwb3J0LWRpYWxvZy9leHBvcnQtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VySW1wb3J0RGlhbG9nIH0gZnJvbSAnLi4vaW1wb3J0LWRpYWxvZy9pbXBvcnQtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyUHJvZmlsZURpYWxvZyB9IGZyb20gJy4uL3Byb2ZpbGUtZGlhbG9nL3Byb2ZpbGUtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy90cmVlLnV0aWxzJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgRXhhbU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ3VzZXItbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICd1c2VyLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWyd1c2VyLWxpc3QuY29tcG9uZW50LmNzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgVXNlckxpc3RDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuICAgIEBWaWV3Q2hpbGQoVXNlckRpYWxvZykgdXNlckRpYWxvZzogVXNlckRpYWxvZztcbiAgICBAVmlld0NoaWxkKFVzZXJFeHBvcnREaWFsb2cpIHVzZXJFeHBvcnREaWFsb2c6IFVzZXJFeHBvcnREaWFsb2c7XG4gICAgQFZpZXdDaGlsZChVc2VySW1wb3J0RGlhbG9nKSB1c2VySW1wb3J0RGlhbG9nOiBVc2VySW1wb3J0RGlhbG9nO1xuICAgIEBWaWV3Q2hpbGQoVXNlclByb2ZpbGVEaWFsb2cpIHVzZXJQcm9maWxlRGlhbG9nOiBVc2VyUHJvZmlsZURpYWxvZztcblxuICAgIHByaXZhdGUgdHJlZTogVHJlZU5vZGVbXTtcbiAgICBwcml2YXRlIHVzZXJzOiBVc2VyW107XG4gICAgcHJpdmF0ZSBzZWxlY3RlZFVzZXI6IGFueTtcbiAgICBwcml2YXRlIHNlbGVjdGVkR3JvdXBOb2RlczogVHJlZU5vZGVbXTtcbiAgICBwcml2YXRlIHRyZWVVdGlsczogVHJlZVV0aWxzO1xuICAgIHByaXZhdGUgZGlzcGxheVVzZXJzOiBVc2VyW107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50cmVlVXRpbHMgPSBuZXcgVHJlZVV0aWxzKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIEdyb3VwLmxpc3RVc2VyR3JvdXAodGhpcykuc3Vic2NyaWJlKGdyb3Vwcz0+IHtcbiAgICAgICAgICAgIHRoaXMudHJlZSA9IHRoaXMudHJlZVV0aWxzLmJ1aWxkR3JvdXBUcmVlKGdyb3Vwcyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmxvYWRVc2VycygpO1xuICAgIH1cblxuICAgIGxvYWRVc2VycygpIHtcbiAgICAgICAgVXNlci5hbGwodGhpcykuc3Vic2NyaWJlKHVzZXJzID0+IHtcbiAgICAgICAgICAgIHRoaXMudXNlcnMgPSB1c2VycztcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheVVzZXJzID0gdXNlcnM7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJ1aWxkR3JvdXBUcmVlKCkge1xuICAgICAgICBHcm91cC5saXN0VXNlckdyb3VwKHRoaXMpLnN1YnNjcmliZShncm91cHMgPT4ge1xuICAgICAgICAgICAgdGhpcy50cmVlID0gdGhpcy50cmVlVXRpbHMuYnVpbGRHcm91cFRyZWUoZ3JvdXBzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkVXNlcigpIHtcbiAgICAgICAgdmFyIHVzZXIgPSBuZXcgVXNlcigpO1xuICAgICAgICB0aGlzLnVzZXJEaWFsb2cuc2hvdyh1c2VyKTtcbiAgICAgICAgdGhpcy51c2VyRGlhbG9nLm9uQ3JlYXRlQ29tcGxldGUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZFVzZXJzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGVkaXRVc2VyKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFVzZXIpXG4gICAgICAgICAgICB0aGlzLnVzZXJQcm9maWxlRGlhbG9nLnNob3codGhpcy5zZWxlY3RlZFVzZXIpO1xuICAgIH1cblxuICAgIGFjdGl2YXRlVXNlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRVc2VyKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVXNlci5iYW5uZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRVc2VyLnNhdmUodGhpcykuc3Vic2NyaWJlKCgpID0+IHsgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IoJ1Blcm1pc3Npb24gZGVuaWVkJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlYWN0aXZhdGVVc2VyKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFVzZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRVc2VyLmJhbm5lZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVXNlci5zYXZlKHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7IH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yKCdQZXJtaXNzaW9uIGRlbmllZCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnRVc2VyKCkge1xuICAgICAgICB0aGlzLnVzZXJFeHBvcnREaWFsb2cuc2hvdyh0aGlzLnVzZXJzKTtcbiAgICB9XG5cbiAgICBpbXBvcnRVc2VyKCkge1xuICAgICAgICB0aGlzLnVzZXJJbXBvcnREaWFsb2cuc2hvdygpO1xuICAgICAgICB0aGlzLnVzZXJJbXBvcnREaWFsb2cub25JbXBvcnRDb21wbGV0ZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkVXNlcnMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZmlsdGVyVXNlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRHcm91cE5vZGVzLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlVc2VycyA9IF8uZmlsdGVyKHRoaXMudXNlcnMsIHVzZXIgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRHcm91cE5vZGUgPSAgXy5maW5kKHRoaXMuc2VsZWN0ZWRHcm91cE5vZGVzLCBub2RlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUuZGF0YS5pZCA9PSB1c2VyLmdyb3VwX2lkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnRHcm91cE5vZGUgIT0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5VXNlcnMgPSAgdGhpcy51c2VycztcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==

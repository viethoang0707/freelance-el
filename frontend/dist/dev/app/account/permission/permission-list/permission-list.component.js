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
            user_model_1.User.listByPermission(this, this.selectedPermission.id).subscribe(function (users) {
                if (users.length)
                    _this.error(_this.translateService.instant('You cannot delete permission assigned to other uers'));
                else {
                    _this.confirm(_this.translateService.instant('Are you sure to delete?'), function () {
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
        this.userPermissionDialog.onSelectGroup.first().subscribe(function (group) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hY2NvdW50L3Blcm1pc3Npb24vcGVybWlzc2lvbi1saXN0L3Blcm1pc3Npb24tbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBRXBFLGlGQUErRTtBQUsvRSxzRkFBK0U7QUFDL0UsZ0dBQW1GO0FBQ25GLCtHQUFrRztBQUNsRyw4SEFBaUg7QUFJakgscUhBQXVHO0FBQ3ZHLDBFQUFtRTtBQVFuRTtJQUE2QywyQ0FBYTtJQVd0RDtlQUNJLGlCQUFPO0lBQ1gsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFDRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELGdEQUFjLEdBQWQ7UUFBQSxpQkFJQztRQUhHLDZCQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLFdBQVc7WUFDdEMsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsK0NBQWEsR0FBYjtRQUFBLGlCQUtDO1FBSkcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLDZCQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7WUFDN0MsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGdEQUFjLEdBQWQ7UUFDSSxJQUFJLElBQUksQ0FBQyxrQkFBa0I7WUFDdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsa0RBQWdCLEdBQWhCO1FBQUEsaUJBY0M7UUFiRyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUN6QixpQkFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztnQkFDbkUsSUFBSSxLQUFLLENBQUMsTUFBTTtvQkFDWixLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMscURBQXFELENBQUMsQ0FBQyxDQUFBO3FCQUMvRjtvQkFDRCxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsRUFBRTt3QkFDbkUsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7NEJBQzNDLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDMUIsQ0FBQyxDQUFDLENBQUE7b0JBQ04sQ0FBQyxDQUFDLENBQUM7aUJBQ047WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELGtEQUFnQixHQUFoQjtRQUNJLElBQUksSUFBSSxDQUFDLGtCQUFrQjtZQUN2QixJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxnREFBYyxHQUFkO1FBQ0ksSUFBSSxJQUFJLENBQUMsa0JBQWtCO1lBQ3ZCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELGtEQUFnQixHQUFoQjtRQUFBLGlCQVNDO1FBUkcsSUFBSSxJQUFJLENBQUMsa0JBQWtCO1lBQ3ZCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQVc7WUFDbEUsS0FBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ2pELEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUN6QyxLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFuRTRCO1FBQTVCLGdCQUFTLENBQUMsOENBQWdCLENBQUM7a0NBQW1CLDhDQUFnQjtxRUFBQztJQUMvQjtRQUFoQyxnQkFBUyxDQUFDLHVEQUFvQixDQUFDO2tDQUF1Qix1REFBb0I7eUVBQUM7SUFDekM7UUFBbEMsZ0JBQVMsQ0FBQywyREFBc0IsQ0FBQztrQ0FBeUIsMkRBQXNCOzJFQUFDO0lBQ3BEO1FBQTdCLGdCQUFTLENBQUMsaURBQWlCLENBQUM7a0NBQXVCLGlEQUFpQjt5RUFBQztJQVI3RCx1QkFBdUI7UUFObkMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7U0FDL0MsQ0FBQzs7T0FDVyx1QkFBdUIsQ0F5RW5DO0lBQUQsOEJBQUM7Q0F6RUQsQUF5RUMsQ0F6RTRDLDhCQUFhLEdBeUV6RDtBQXpFWSwwREFBdUIiLCJmaWxlIjoiYXBwL2FjY291bnQvcGVybWlzc2lvbi9wZXJtaXNzaW9uLWxpc3QvcGVybWlzc2lvbi1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBVU0VSX1NUQVRVUywgR1JPVVBfQ0FURUdPUlkgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IFBlcm1pc3Npb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9wZXJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IFBlcm1pc3Npb25EaWFsb2d9IGZyb20gJy4uL3Blcm1pc3Npb24tZGlhbG9nL3Blcm1pc3Npb24tZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZW51UGVybWlzc2lvbkRpYWxvZyB9IGZyb20gJy4uL21lbnUtcGVybWlzc2lvbi1kaWFsb2cvbWVudS1wZXJtaXNzaW9uLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0R3JvdXBEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtZ3JvdXAtZGlhbG9nL3NlbGVjdC1ncm91cC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3RyZWUudXRpbHMnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IE1lbWJlclBlcm1pc3Npb25EaWFsb2d9IGZyb20gJy4uL21lbWJlci1wZXJtaXNzaW9uLWRpYWxvZy9tZW1iZXItcGVybWlzc2lvbi1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ3Blcm1pc3Npb24tbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICdwZXJtaXNzaW9uLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydwZXJtaXNzaW9uLWxpc3QuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBQZXJtaXNzaW9uTGlzdENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG4gICAgcHJpdmF0ZSBzZWxlY3RlZFBlcm1pc3Npb246IFBlcm1pc3Npb247XG4gICAgcHJpdmF0ZSBwZXJtaXNzaW9uczogUGVybWlzc2lvbltdO1xuXG4gICAgQFZpZXdDaGlsZChQZXJtaXNzaW9uRGlhbG9nKSBwZXJtaXNzaW9uRGlhbG9nOiBQZXJtaXNzaW9uRGlhbG9nO1xuICAgIEBWaWV3Q2hpbGQoTWVudVBlcm1pc3Npb25EaWFsb2cpIG1lbnVQZXJtaXNzaW9uRGlhbG9nOiBNZW51UGVybWlzc2lvbkRpYWxvZztcbiAgICBAVmlld0NoaWxkKE1lbWJlclBlcm1pc3Npb25EaWFsb2cpIG1lbWJlclBlcm1pc3Npb25EaWFsb2c6IE1lbWJlclBlcm1pc3Npb25EaWFsb2c7XG4gICAgQFZpZXdDaGlsZChTZWxlY3RHcm91cERpYWxvZykgdXNlclBlcm1pc3Npb25EaWFsb2c6IFNlbGVjdEdyb3VwRGlhbG9nO1xuXG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgdGhpcy5sb2FkUGVybWlzc2lvbigpO1xuICAgIH1cblxuICAgIGxvYWRQZXJtaXNzaW9uKCkge1xuICAgICAgICBQZXJtaXNzaW9uLmFsbCh0aGlzKS5zdWJzY3JpYmUocGVybWlzc2lvbnMgPT4ge1xuICAgICAgICAgICAgdGhpcy5wZXJtaXNzaW9ucyA9IHBlcm1pc3Npb25zO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRQZXJtaXNzaW9uKCl7XG4gICAgICAgIHRoaXMucGVybWlzc2lvbkRpYWxvZy5zaG93KG5ldyBQZXJtaXNzaW9uKCkpO1xuICAgICAgICB0aGlzLnBlcm1pc3Npb25EaWFsb2cub25DcmVhdGVDb21wbGV0ZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkUGVybWlzc2lvbigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBlZGl0UGVybWlzc2lvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQZXJtaXNzaW9uKVxuICAgICAgICAgICAgdGhpcy5wZXJtaXNzaW9uRGlhbG9nLnNob3codGhpcy5zZWxlY3RlZFBlcm1pc3Npb24pO1xuICAgIH1cblxuICAgIGRlbGV0ZVBlcm1pc3Npb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkUGVybWlzc2lvbikge1xuICAgICAgICAgICAgVXNlci5saXN0QnlQZXJtaXNzaW9uKHRoaXMsIHRoaXMuc2VsZWN0ZWRQZXJtaXNzaW9uLmlkKS5zdWJzY3JpYmUodXNlcnM9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXJzLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvcih0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnWW91IGNhbm5vdCBkZWxldGUgcGVybWlzc2lvbiBhc3NpZ25lZCB0byBvdGhlciB1ZXJzJykpXG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybSh0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnQXJlIHlvdSBzdXJlIHRvIGRlbGV0ZT8nKSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBlcm1pc3Npb24uZGVsZXRlKHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkUGVybWlzc2lvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwZXJtaXNzaW9uTWVtYmVyKCl7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkUGVybWlzc2lvbilcbiAgICAgICAgICAgIHRoaXMubWVtYmVyUGVybWlzc2lvbkRpYWxvZy5zaG93KHRoaXMuc2VsZWN0ZWRQZXJtaXNzaW9uKTtcbiAgICB9XG5cbiAgICBwZXJtaXNzaW9uTWVudSgpe1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFBlcm1pc3Npb24pXG4gICAgICAgICAgICB0aGlzLm1lbnVQZXJtaXNzaW9uRGlhbG9nLnNob3codGhpcy5zZWxlY3RlZFBlcm1pc3Npb24pO1xuICAgIH1cblxuICAgIHBlcm1pc3Npb25BY2Nlc3MoKXtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQZXJtaXNzaW9uKVxuICAgICAgICAgICAgdGhpcy51c2VyUGVybWlzc2lvbkRpYWxvZy5zaG93KCk7XG4gICAgICAgIHRoaXMudXNlclBlcm1pc3Npb25EaWFsb2cub25TZWxlY3RHcm91cC5maXJzdCgpLnN1YnNjcmliZSgoZ3JvdXA6R3JvdXApPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBlcm1pc3Npb24udXNlcl9ncm91cF9pZCA9IGdyb3VwLmlkO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBlcm1pc3Npb24uc2F2ZSh0aGlzKS5zdWJzY3JpYmUoKCk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkUGVybWlzc2lvbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==

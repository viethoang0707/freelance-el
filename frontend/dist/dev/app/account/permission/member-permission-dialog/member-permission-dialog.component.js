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
        this.usersDialog.onSelectUsers.first().subscribe(function (users) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hY2NvdW50L3Blcm1pc3Npb24vbWVtYmVyLXBlcm1pc3Npb24tZGlhbG9nL21lbWJlci1wZXJtaXNzaW9uLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBS3BFLDBFQUFtRTtBQUNuRSxpRkFBK0U7QUFJL0UsOEJBQWdDO0FBQ2hDLDJIQUErRztBQUUvRyxnRUFBOEQ7QUFPOUQ7SUFBNEMsMENBQWE7SUFTeEQ7ZUFDQyxpQkFBTztJQUNSLENBQUM7SUFFRCxxQ0FBSSxHQUFKLFVBQUssVUFBc0I7UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxxQ0FBSSxHQUFKO1FBQ0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUdFLDBDQUFTLEdBQVQ7UUFBQSxpQkFXQztRQVZHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUNsRCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxVQUFDLElBQVU7Z0JBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3hDLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsc0JBQVMsQ0FBQyxXQUFXLE9BQXJCLHNCQUFTLEdBQWEsS0FBSSxTQUFLLFNBQVMsR0FBRSxTQUFTLENBQUM7Z0JBQ2hELEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDZDQUFZLEdBQVo7UUFBQSxpQkFVQztRQVRHLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU07WUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRTtnQkFDckMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsYUFBYSxFQUFFLFVBQUMsSUFBVTtvQkFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxDQUFDO2dCQUNILGlCQUFJLENBQUMsV0FBVyxDQUFDLEtBQUksRUFBRSxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxDQUFDO29CQUNqRCxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsNENBQVcsR0FBWDtRQUFBLGlCQUlDO1FBSEcsaUJBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQzNELEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTlDNkI7UUFBN0IsZ0JBQVMsQ0FBQyxnREFBaUIsQ0FBQztrQ0FBYyxnREFBaUI7K0RBQUM7SUFQcEQsc0JBQXNCO1FBTGxDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLDBCQUEwQjtZQUNwQyxXQUFXLEVBQUUseUNBQXlDO1NBQ3RELENBQUM7O09BQ1csc0JBQXNCLENBc0RsQztJQUFELDZCQUFDO0NBdERELEFBc0RDLENBdEQyQyw4QkFBYSxHQXNEeEQ7QUF0RFksd0RBQXNCIiwiZmlsZSI6ImFwcC9hY2NvdW50L3Blcm1pc3Npb24vbWVtYmVyLXBlcm1pc3Npb24tZGlhbG9nL21lbWJlci1wZXJtaXNzaW9uLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBQZXJtaXNzaW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvcGVybWlzc2lvbi5tb2RlbCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgREVGQVVMVF9EQVRFX0xPQ0FMRSwgRVhBTV9TVEFUVVMsIEVYQU1fTUVNQkVSX1JPTEUsIEVYQU1fTUVNQkVSX1NUQVRVUyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgU2VsZWN0SXRlbSwgTWVudUl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0VXNlcnNEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtdXNlci1kaWFsb2cvc2VsZWN0LXVzZXItZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdtZW1iZXItcGVybWlzc2lvbi1kaWFsb2cnLFxuXHR0ZW1wbGF0ZVVybDogJ21lbWJlci1wZXJtaXNzaW9uLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIE1lbWJlclBlcm1pc3Npb25EaWFsb2cgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuXHRwcml2YXRlIGRpc3BsYXk6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSB1c2VyczogVXNlcltdO1xuICAgIHByaXZhdGUgc2VsZWN0ZWRVc2VyczogYW55O1xuICAgIHByaXZhdGUgcGVybWlzc2lvbjogUGVybWlzc2lvbjtcblxuICAgIEBWaWV3Q2hpbGQoU2VsZWN0VXNlcnNEaWFsb2cpIHVzZXJzRGlhbG9nOiBTZWxlY3RVc2Vyc0RpYWxvZztcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0c2hvdyhwZXJtaXNzaW9uOiBQZXJtaXNzaW9uKSB7XG5cdFx0dGhpcy5kaXNwbGF5ID0gdHJ1ZTtcblx0XHR0aGlzLnBlcm1pc3Npb24gPSBwZXJtaXNzaW9uO1xuICAgICAgICB0aGlzLmxvYWRNZW1iZXJzKCk7XG5cdH1cblxuXHRoaWRlKCkge1xuXHRcdHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuXHR9XG5cblxuICAgIGFkZE1lbWJlcigpIHtcbiAgICAgICAgdGhpcy51c2Vyc0RpYWxvZy5zaG93KCk7XG4gICAgICAgIHRoaXMudXNlcnNEaWFsb2cub25TZWxlY3RVc2Vycy5maXJzdCgpLnN1YnNjcmliZSh1c2VycyA9PiB7XG4gICAgICAgICAgICB2YXIgdXBkYXRlQXBpID0gXy5tYXAodXNlcnMsICh1c2VyOiBVc2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgdXNlci5wZXJtaXNzaW9uX2lkID0gdGhpcy5wZXJtaXNzaW9uLmlkO1xuICAgICAgICAgICAgICAgIHJldHVybiB1c2VyLl9fYXBpX191cGRhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgQmFzZU1vZGVsLmJ1bGtfdXBkYXRlKHRoaXMsIC4uLnVwZGF0ZUFwaSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRNZW1iZXJzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlTWVtYmVyKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFVzZXJzICYmIHRoaXMuc2VsZWN0ZWRVc2Vycy5sZW5ndGgpXG4gICAgICAgICAgICB0aGlzLmNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB0byByZW1vdmUgPycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5zZWxlY3RlZFVzZXJzLCAodXNlcjogVXNlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB1c2VyLnBlcm1pc3Npb25faWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFVzZXIudXBkYXRlQXJyYXkodGhpcywgdGhpcy5zZWxlY3RlZFVzZXJzKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRNZW1iZXJzKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkTWVtYmVycygpIHtcbiAgICAgICAgVXNlci5saXN0QnlQZXJtaXNzaW9uKHRoaXMsIHRoaXMucGVybWlzc2lvbi5pZCkuc3Vic2NyaWJlKHVzZXJzID0+IHtcbiAgICAgICAgICAgIHRoaXMudXNlcnMgPSB1c2VycztcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4iXX0=

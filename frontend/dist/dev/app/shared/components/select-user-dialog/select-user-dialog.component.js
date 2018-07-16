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
var Rx_1 = require("rxjs/Rx");
var group_model_1 = require("../../models/elearning/group.model");
var base_component_1 = require("../base/base.component");
var user_model_1 = require("../../../shared/models/elearning/user.model");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var SelectUsersDialog = (function (_super) {
    __extends(SelectUsersDialog, _super);
    function SelectUsersDialog() {
        var _this = _super.call(this) || this;
        _this.onSelectUsersReceiver = new Rx_1.Subject();
        _this.onSelectUsers = _this.onSelectUsersReceiver.asObservable();
        _this.display = false;
        _this.selectedUsers = [];
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    SelectUsersDialog.prototype.hide = function () {
        this.display = false;
    };
    SelectUsersDialog.prototype.nodeSelect = function (event) {
        var _this = this;
        if (this.selectedNode) {
            user_model_1.User.listByGroup(this, this.selectedNode.data.id).subscribe(function (users) {
                _this.users = users;
            });
        }
    };
    SelectUsersDialog.prototype.show = function () {
        var _this = this;
        this.display = true;
        this.selectedUsers = [];
        group_model_1.Group.listUserGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
        });
    };
    SelectUsersDialog.prototype.select = function () {
        this.onSelectUsersReceiver.next(this.selectedUsers);
        this.selectedUsers = [];
        this.hide();
    };
    SelectUsersDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'select-user-dialog',
            templateUrl: 'select-user-dialog.component.html',
            styleUrls: ['select-user-dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], SelectUsersDialog);
    return SelectUsersDialog;
}(base_component_1.BaseComponent));
exports.SelectUsersDialog = SelectUsersDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtdXNlci1kaWFsb2cvc2VsZWN0LXVzZXItZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUQ7QUFDekQsOEJBQThDO0FBRzlDLGtFQUEyRDtBQUMzRCx5REFBdUQ7QUFDdkQsMEVBQW1FO0FBRW5FLGlFQUErRDtBQVcvRDtJQUF1QyxxQ0FBYTtJQVluRDtRQUFBLFlBQ0MsaUJBQU8sU0FJUDtRQVJPLDJCQUFxQixHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQ3pELG1CQUFhLEdBQW9CLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUk3RSxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixLQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksc0JBQVMsRUFBRSxDQUFDOztJQUNsQyxDQUFDO0lBRUQsZ0NBQUksR0FBSjtRQUNDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxzQ0FBVSxHQUFWLFVBQVcsS0FBVTtRQUFyQixpQkFNQztRQUxBLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixpQkFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztnQkFDL0QsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUM7U0FDSDtJQUNGLENBQUM7SUFFRCxnQ0FBSSxHQUFKO1FBQUEsaUJBT0M7UUFOQSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUV4QixtQkFBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ3pDLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsa0NBQU0sR0FBTjtRQUNDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxhQUFhLEdBQUMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLENBQUM7SUE1Q1csaUJBQWlCO1FBTjdCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixXQUFXLEVBQUUsbUNBQW1DO1lBQ2hELFNBQVMsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO1NBQy9DLENBQUM7O09BQ1csaUJBQWlCLENBK0M3QjtJQUFELHdCQUFDO0NBL0NELEFBK0NDLENBL0NzQyw4QkFBYSxHQStDbkQ7QUEvQ1ksOENBQWlCIiwiZmlsZSI6ImFwcC9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtdXNlci1kaWFsb2cvc2VsZWN0LXVzZXItZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgVHJlZVV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvdHJlZS51dGlscyc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEdST1VQX0NBVEVHT1JZLCBDT05URU5UX1NUQVRVUyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnc2VsZWN0LXVzZXItZGlhbG9nJyxcblx0dGVtcGxhdGVVcmw6ICdzZWxlY3QtdXNlci1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnc2VsZWN0LXVzZXItZGlhbG9nLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0VXNlcnNEaWFsb2cgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuXHRwcml2YXRlIHRyZWU6IFRyZWVOb2RlW107XG5cdHByaXZhdGUgc2VsZWN0ZWROb2RlOiBUcmVlTm9kZTtcblx0cHJpdmF0ZSBzZWxlY3RlZFVzZXJzOiBVc2VyW107XG5cdHByaXZhdGUgdXNlcnM6VXNlcltdO1xuXHRwcml2YXRlIGRpc3BsYXk6IGJvb2xlYW47XG5cdHByaXZhdGUgdHJlZVV0aWxzOiBUcmVlVXRpbHM7XG5cblx0cHJpdmF0ZSBvblNlbGVjdFVzZXJzUmVjZWl2ZXI6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgb25TZWxlY3RVc2VyczpPYnNlcnZhYmxlPGFueT4gPSAgdGhpcy5vblNlbGVjdFVzZXJzUmVjZWl2ZXIuYXNPYnNlcnZhYmxlKCk7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLmRpc3BsYXkgPSBmYWxzZTtcblx0XHR0aGlzLnNlbGVjdGVkVXNlcnMgPSBbXTtcblx0XHR0aGlzLnRyZWVVdGlscyA9IG5ldyBUcmVlVXRpbHMoKTtcblx0fVxuXG5cdGhpZGUoKSB7XG5cdFx0dGhpcy5kaXNwbGF5ID0gZmFsc2U7XG5cdH1cblxuXHRub2RlU2VsZWN0KGV2ZW50OiBhbnkpIHtcblx0XHRpZiAodGhpcy5zZWxlY3RlZE5vZGUpIHtcblx0XHRcdFVzZXIubGlzdEJ5R3JvdXAodGhpcyx0aGlzLnNlbGVjdGVkTm9kZS5kYXRhLmlkKS5zdWJzY3JpYmUodXNlcnMgPT4ge1xuXHRcdFx0XHR0aGlzLnVzZXJzID0gdXNlcnM7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRzaG93KCkge1xuXHRcdHRoaXMuZGlzcGxheSA9IHRydWU7XG5cdFx0dGhpcy5zZWxlY3RlZFVzZXJzID0gW107XG5cdFx0Ly8gLCBHUk9VUF9DQVRFR09SWS5VU0VSXG5cdFx0R3JvdXAubGlzdFVzZXJHcm91cCh0aGlzKS5zdWJzY3JpYmUoZ3JvdXBzID0+IHtcblx0XHRcdHRoaXMudHJlZSA9IHRoaXMudHJlZVV0aWxzLmJ1aWxkR3JvdXBUcmVlKGdyb3Vwcyk7XG5cdFx0fSk7XG5cdH1cblxuXHRzZWxlY3QoKSB7XG5cdFx0dGhpcy5vblNlbGVjdFVzZXJzUmVjZWl2ZXIubmV4dCh0aGlzLnNlbGVjdGVkVXNlcnMpO1xuXHRcdHRoaXMuc2VsZWN0ZWRVc2Vycz1bXTtcblx0XHR0aGlzLmhpZGUoKTtcblx0fVxuXG5cbn1cblxuIl19

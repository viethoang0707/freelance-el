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
var _ = require("underscore");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var SelectAdminDialog = (function (_super) {
    __extends(SelectAdminDialog, _super);
    function SelectAdminDialog() {
        var _this = _super.call(this) || this;
        _this.onSelectUsersReceiver = new Rx_1.Subject();
        _this.onSelectUsers = _this.onSelectUsersReceiver.asObservable();
        _this.display = false;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    SelectAdminDialog.prototype.hide = function () {
        this.display = false;
    };
    SelectAdminDialog.prototype.nodeSelect = function (event) {
        var _this = this;
        if (this.selectedNode) {
            user_model_1.User.listByGroup(this, this.selectedNode.data.id).subscribe(function (users) {
                _this.users = _.filter(users, (function (user) {
                    return user.is_admin;
                }));
            });
        }
    };
    SelectAdminDialog.prototype.show = function () {
        var _this = this;
        this.display = true;
        this.selectedNode = null;
        this.selectedAdmin = null;
        group_model_1.Group.listUserGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
        });
    };
    SelectAdminDialog.prototype.select = function () {
        this.onSelectUsersReceiver.next(this.selectedAdmin);
        this.hide();
    };
    SelectAdminDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'select-admin-dialog',
            templateUrl: 'select-admin-dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], SelectAdminDialog);
    return SelectAdminDialog;
}(base_component_1.BaseComponent));
exports.SelectAdminDialog = SelectAdminDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtYWRtaW4tZGlhbG9nL3NlbGVjdC1hZG1pbi1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCw4QkFBOEM7QUFHOUMsa0VBQTJEO0FBQzNELHlEQUF1RDtBQUN2RCwwRUFBbUU7QUFDbkUsOEJBQWdDO0FBQ2hDLGlFQUErRDtBQVUvRDtJQUF1QyxxQ0FBYTtJQVluRDtRQUFBLFlBQ0MsaUJBQU8sU0FHUDtRQVBPLDJCQUFxQixHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQ3pELG1CQUFhLEdBQW9CLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUk3RSxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksc0JBQVMsRUFBRSxDQUFDOztJQUNsQyxDQUFDO0lBRUQsZ0NBQUksR0FBSjtRQUNDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxzQ0FBVSxHQUFWLFVBQVcsS0FBVTtRQUFyQixpQkFRQztRQVBBLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixpQkFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztnQkFDL0QsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLFVBQUEsSUFBSTtvQkFDakMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUN0QixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDSDtJQUNGLENBQUM7SUFFRCxnQ0FBSSxHQUFKO1FBQUEsaUJBUUM7UUFQQSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUUxQixtQkFBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ3pDLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsa0NBQU0sR0FBTjtRQUNDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLENBQUM7SUE3Q1csaUJBQWlCO1FBTDdCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixXQUFXLEVBQUUsb0NBQW9DO1NBQ2pELENBQUM7O09BQ1csaUJBQWlCLENBZ0Q3QjtJQUFELHdCQUFDO0NBaERELEFBZ0RDLENBaERzQyw4QkFBYSxHQWdEbkQ7QUFoRFksOENBQWlCIiwiZmlsZSI6ImFwcC9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtYWRtaW4tZGlhbG9nL3NlbGVjdC1hZG1pbi1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBUcmVlVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy90cmVlLnV0aWxzJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgR1JPVVBfQ0FURUdPUlksIENPTlRFTlRfU1RBVFVTIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdzZWxlY3QtYWRtaW4tZGlhbG9nJyxcblx0dGVtcGxhdGVVcmw6ICdzZWxlY3QtYWRtaW4tZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0QWRtaW5EaWFsb2cgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuXHRwcml2YXRlIHRyZWU6IFRyZWVOb2RlW107XG5cdHByaXZhdGUgc2VsZWN0ZWROb2RlOiBUcmVlTm9kZTtcblx0cHJpdmF0ZSBzZWxlY3RlZEFkbWluOiBVc2VyO1xuXHRwcml2YXRlIHVzZXJzOlVzZXJbXTtcblx0cHJpdmF0ZSBkaXNwbGF5OiBib29sZWFuO1xuXHRwcml2YXRlIHRyZWVVdGlsczogVHJlZVV0aWxzO1xuXG5cdHByaXZhdGUgb25TZWxlY3RVc2Vyc1JlY2VpdmVyOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuICAgIG9uU2VsZWN0VXNlcnM6T2JzZXJ2YWJsZTxhbnk+ID0gIHRoaXMub25TZWxlY3RVc2Vyc1JlY2VpdmVyLmFzT2JzZXJ2YWJsZSgpO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5kaXNwbGF5ID0gZmFsc2U7XG5cdFx0dGhpcy50cmVlVXRpbHMgPSBuZXcgVHJlZVV0aWxzKCk7XG5cdH1cblxuXHRoaWRlKCkge1xuXHRcdHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuXHR9XG5cblx0bm9kZVNlbGVjdChldmVudDogYW55KSB7XG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWROb2RlKSB7XG5cdFx0XHRVc2VyLmxpc3RCeUdyb3VwKHRoaXMsdGhpcy5zZWxlY3RlZE5vZGUuZGF0YS5pZCkuc3Vic2NyaWJlKHVzZXJzID0+IHtcblx0XHRcdFx0dGhpcy51c2VycyA9IF8uZmlsdGVyKHVzZXJzLCAodXNlcj0+IHtcblx0XHRcdFx0XHRyZXR1cm4gdXNlci5pc19hZG1pbjtcblx0XHRcdFx0fSkpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0c2hvdygpIHtcblx0XHR0aGlzLmRpc3BsYXkgPSB0cnVlO1xuXHRcdHRoaXMuc2VsZWN0ZWROb2RlID0gbnVsbDtcblx0XHR0aGlzLnNlbGVjdGVkQWRtaW4gPSBudWxsO1xuXHRcdC8vLCBHUk9VUF9DQVRFR09SWS5VU0VSXG5cdFx0R3JvdXAubGlzdFVzZXJHcm91cCh0aGlzKS5zdWJzY3JpYmUoZ3JvdXBzID0+IHtcblx0XHRcdHRoaXMudHJlZSA9IHRoaXMudHJlZVV0aWxzLmJ1aWxkR3JvdXBUcmVlKGdyb3Vwcyk7XG5cdFx0fSk7XG5cdH1cblxuXHRzZWxlY3QoKSB7XG5cdFx0dGhpcy5vblNlbGVjdFVzZXJzUmVjZWl2ZXIubmV4dCh0aGlzLnNlbGVjdGVkQWRtaW4pO1xuXHRcdHRoaXMuaGlkZSgpO1xuXHR9XG5cblxufVxuXG4iXX0=

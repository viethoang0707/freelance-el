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
            templateUrl: 'approval-tree.component.html',
            styleUrls: ['approval-tree.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], ApprovalTreeComponent);
    return ApprovalTreeComponent;
}(base_component_1.BaseComponent));
exports.ApprovalTreeComponent = ApprovalTreeComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC93b3JrZmxvdy9hcHByb3ZhbC10cmVlL2FwcHJvdmFsLXRyZWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFvRTtBQUVwRSw4RUFBNEU7QUFNNUUsMkhBQThHO0FBQzlHLDhEQUE0RDtBQUc1RCx1RUFBZ0U7QUFRaEU7SUFBMkMseUNBQWE7SUFZcEQ7UUFBQSxZQUNJLGlCQUFPLFNBYVY7UUFaRyxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksc0JBQVMsRUFBRSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxTQUFTLEdBQUc7WUFDYixFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDOUQsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRTtTQUM3RCxDQUFDO1FBQ0YsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFBLFFBQVE7WUFDeEMsT0FBTztnQkFDSCxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUs7Z0JBQ3JCLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSzthQUN4QixDQUFBO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQzs7SUFDOUIsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsNENBQVksR0FBWixVQUFhLEtBQUs7UUFDZCxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7O1lBRXBDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQ2pDLENBQUM7SUFFRCw4Q0FBYyxHQUFkLFVBQWUsS0FBSztRQUNoQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUM3QixDQUFDO0lBRUQsbURBQW1CLEdBQW5CO1FBQUEsaUJBS0M7UUFKRyxpQkFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQ25DLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRCxLQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwrQ0FBZSxHQUFmO1FBQUEsaUJBT0M7UUFORyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDbkMsS0FBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCxnREFBZ0IsR0FBaEI7UUFBQSxpQkFTQztRQVJHLElBQUksSUFBSSxDQUFDLFlBQVk7WUFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFXO1lBQ3pELEtBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDM0MsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUNuQyxLQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTNEUTtRQUFSLFlBQUssRUFBRTs7MkRBQWtCO0lBQ0k7UUFBN0IsZ0JBQVMsQ0FBQyxpREFBaUIsQ0FBQztrQ0FBYyxpREFBaUI7OERBQUM7SUFWcEQscUJBQXFCO1FBTmpDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGVBQWU7WUFDekIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztTQUM3QyxDQUFDOztPQUNXLHFCQUFxQixDQXVFakM7SUFBRCw0QkFBQztDQXZFRCxBQXVFQyxDQXZFMEMsOEJBQWEsR0F1RXZEO0FBdkVZLHNEQUFxQiIsImZpbGUiOiJhcHAvd29ya2Zsb3cvYXBwcm92YWwtdHJlZS9hcHByb3ZhbC10cmVlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBVU0VSX1NUQVRVUywgR1JPVVBfQ0FURUdPUlkgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IFBlcm1pc3Npb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9wZXJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IFNlbGVjdEFkbWluRGlhbG9nIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0LWFkbWluLWRpYWxvZy9zZWxlY3QtYWRtaW4tZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlVXRpbHMgfSBmcm9tICcuLi8uLi9zaGFyZWQvaGVscGVycy90cmVlLnV0aWxzJztcbmltcG9ydCB7IFRyZWVOb2RlLCBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdhcHByb3ZhbC10cmVlJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2FwcHJvdmFsLXRyZWUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydhcHByb3ZhbC10cmVlLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQXBwcm92YWxUcmVlQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cbiAgICBwcml2YXRlIHRyZWU6IFRyZWVOb2RlW107XG4gICAgcHJpdmF0ZSBzZWxlY3RlZE5vZGU6IFRyZWVOb2RlO1xuICAgIHByaXZhdGUgc2VsZWN0ZWRVc2VyOiBVc2VyO1xuICAgIHByaXZhdGUgdHJlZVV0aWxzOiBUcmVlVXRpbHM7XG4gICAgcHJpdmF0ZSB2aWV3TW9kZXM6IFNlbGVjdEl0ZW1bXTtcblxuXG4gICAgQElucHV0KCkgdmlld01vZGU6IHN0cmluZztcbiAgICBAVmlld0NoaWxkKFNlbGVjdEFkbWluRGlhbG9nKSBhZG1pbkRpYWxvZzogU2VsZWN0QWRtaW5EaWFsb2c7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50cmVlVXRpbHMgPSBuZXcgVHJlZVV0aWxzKCk7XG4gICAgICAgIHRoaXMudmlld01vZGVzID0gW1xuICAgICAgICAgICAgeyB2YWx1ZTogJ291dGxpbmUnLCB0aXRsZTogJ091dGxpbmUnLCBpY29uOiAndWktaWNvbi1kZWhhemUnIH0sXG4gICAgICAgICAgICB7IHZhbHVlOiAnZGV0YWlsJywgdGl0bGU6ICdEZXRhaWwnLCBpY29uOiAndWktaWNvbi1hcHBzJyB9LFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLnZpZXdNb2RlcyA9IHRoaXMudmlld01vZGVzLm1hcCh2aWV3TW9kZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGxhYmVsOiB2aWV3TW9kZS50aXRsZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmlld01vZGUudmFsdWUsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnZpZXdNb2RlID0gJ291dGxpbmUnO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmJ1aWxkRXNjYWxhdGlvblRyZWUoKTtcbiAgICB9XG5cbiAgICBvbk5vZGVTZWxlY3QoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50Lm5vZGUgJiYgZXZlbnQubm9kZS5kYXRhKVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFVzZXIgPSBldmVudC5ub2RlLmRhdGE7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRVc2VyID0gbnVsbDtcbiAgICB9XG5cbiAgICBvbk5vZGVVbnNlbGVjdChldmVudCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkVXNlciA9IG51bGw7XG4gICAgfVxuXG4gICAgYnVpbGRFc2NhbGF0aW9uVHJlZSgpIHtcbiAgICAgICAgVXNlci5saXN0QWxsQWRtaW4odGhpcykuc3Vic2NyaWJlKHVzZXJzID0+IHtcbiAgICAgICAgICAgIHRoaXMudHJlZSA9IHRoaXMudHJlZVV0aWxzLmJ1aWxkQXBwcm92YWxUcmVlKHVzZXJzKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRVc2VyID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xlYXJTdXBlcnZpc29yKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFVzZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRVc2VyLnN1cGVydmlzb3JfaWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFVzZXIuc2F2ZSh0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRFc2NhbGF0aW9uVHJlZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RTdXBlcnZpc29yKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFVzZXIpXG4gICAgICAgICAgICB0aGlzLmFkbWluRGlhbG9nLnNob3coKTtcbiAgICAgICAgdGhpcy5hZG1pbkRpYWxvZy5vblNlbGVjdFVzZXJzLmZpcnN0KCkuc3Vic2NyaWJlKChhZG1pbjogVXNlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFVzZXIuc3VwZXJ2aXNvcl9pZCA9IGFkbWluLmlkO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFVzZXIuc2F2ZSh0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRFc2NhbGF0aW9uVHJlZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG59XG4iXX0=

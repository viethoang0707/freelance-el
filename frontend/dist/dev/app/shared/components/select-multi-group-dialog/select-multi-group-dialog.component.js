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
var _ = require("underscore");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var SelectMultiGroupDialog = (function (_super) {
    __extends(SelectMultiGroupDialog, _super);
    function SelectMultiGroupDialog() {
        var _this = _super.call(this) || this;
        _this.onSelectGroupsReceiver = new Rx_1.Subject();
        _this.onSelectGroups = _this.onSelectGroupsReceiver.asObservable();
        _this.display = false;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    SelectMultiGroupDialog.prototype.hide = function () {
        this.display = false;
    };
    SelectMultiGroupDialog.prototype.show = function () {
        var _this = this;
        this.display = true;
        this.selectedNodes = [];
        var subscription = null;
        if (this.category == "course")
            subscription = group_model_1.Group.listCourseGroup(this);
        if (this.category == "organization")
            subscription = group_model_1.Group.listUserGroup(this);
        if (this.category == "question")
            subscription = group_model_1.Group.listQuestionGroup(this);
        if (subscription)
            subscription.subscribe(function (groups) {
                _this.tree = _this.treeUtils.buildGroupTree(groups);
            });
    };
    SelectMultiGroupDialog.prototype.select = function () {
        var groups = _.map(this.selectedNodes, function (selectedNode) {
            return selectedNode["data"];
        });
        this.onSelectGroupsReceiver.next(groups);
        this.hide();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SelectMultiGroupDialog.prototype, "category", void 0);
    SelectMultiGroupDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'select-multi-group-dialog',
            templateUrl: 'select-multi-group-dialog.component.html',
            styleUrls: ['select-multi-group-dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], SelectMultiGroupDialog);
    return SelectMultiGroupDialog;
}(base_component_1.BaseComponent));
exports.SelectMultiGroupDialog = SelectMultiGroupDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtbXVsdGktZ3JvdXAtZGlhbG9nL3NlbGVjdC1tdWx0aS1ncm91cC1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCw4QkFBOEM7QUFFOUMsa0VBQTJEO0FBQzNELHlEQUF1RDtBQUV2RCw4QkFBZ0M7QUFDaEMsaUVBQStEO0FBVy9EO0lBQTRDLDBDQUFhO0lBV3hEO1FBQUEsWUFDQyxpQkFBTyxTQUdQO1FBUE8sNEJBQXNCLEdBQWlCLElBQUksWUFBTyxFQUFFLENBQUM7UUFDMUQsb0JBQWMsR0FBb0IsS0FBSSxDQUFDLHNCQUFzQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBSS9FLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxzQkFBUyxFQUFFLENBQUM7O0lBQ2xDLENBQUM7SUFFRCxxQ0FBSSxHQUFKO1FBQ0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELHFDQUFJLEdBQUo7UUFBQSxpQkFlQztRQWRBLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFHLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUTtZQUN4QixZQUFZLEdBQUksbUJBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsSUFBRyxJQUFJLENBQUMsUUFBUSxJQUFJLGNBQWM7WUFDOUIsWUFBWSxHQUFJLG1CQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxVQUFVO1lBQzFCLFlBQVksR0FBSSxtQkFBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksWUFBWTtZQUNaLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO2dCQUN6QixLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RELENBQUMsQ0FBQyxDQUFDO0lBRWQsQ0FBQztJQUVELHVDQUFNLEdBQU47UUFDQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsVUFBQSxZQUFZO1lBQ2xELE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDYixDQUFDO0lBMUNRO1FBQVIsWUFBSyxFQUFFOzs0REFBa0I7SUFGZCxzQkFBc0I7UUFObEMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsMkJBQTJCO1lBQ3JDLFdBQVcsRUFBRSwwQ0FBMEM7WUFDdkQsU0FBUyxFQUFFLENBQUMseUNBQXlDLENBQUM7U0FDdEQsQ0FBQzs7T0FDVyxzQkFBc0IsQ0ErQ2xDO0lBQUQsNkJBQUM7Q0EvQ0QsQUErQ0MsQ0EvQzJDLDhCQUFhLEdBK0N4RDtBQS9DWSx3REFBc0IiLCJmaWxlIjoiYXBwL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC1tdWx0aS1ncm91cC1kaWFsb2cvc2VsZWN0LW11bHRpLWdyb3VwLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgVHJlZVV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvdHJlZS51dGlscyc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEdST1VQX0NBVEVHT1JZLCBDT05URU5UX1NUQVRVUyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnc2VsZWN0LW11bHRpLWdyb3VwLWRpYWxvZycsXG5cdHRlbXBsYXRlVXJsOiAnc2VsZWN0LW11bHRpLWdyb3VwLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWydzZWxlY3QtbXVsdGktZ3JvdXAtZGlhbG9nLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0TXVsdGlHcm91cERpYWxvZyBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG5cdEBJbnB1dCgpIGNhdGVnb3J5OiBzdHJpbmc7XG5cdHByaXZhdGUgdHJlZTogVHJlZU5vZGVbXTtcblx0cHJpdmF0ZSBzZWxlY3RlZE5vZGVzOiBhbnk7XG5cdHByaXZhdGUgZGlzcGxheTogYm9vbGVhbjtcblx0cHJpdmF0ZSB0cmVlVXRpbHM6IFRyZWVVdGlscztcblxuXHRwcml2YXRlIG9uU2VsZWN0R3JvdXBzUmVjZWl2ZXI6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgb25TZWxlY3RHcm91cHM6T2JzZXJ2YWJsZTxhbnk+ID0gIHRoaXMub25TZWxlY3RHcm91cHNSZWNlaXZlci5hc09ic2VydmFibGUoKTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuXHRcdHRoaXMudHJlZVV0aWxzID0gbmV3IFRyZWVVdGlscygpO1xuXHR9XG5cblx0aGlkZSgpIHtcblx0XHR0aGlzLmRpc3BsYXkgPSBmYWxzZTtcblx0fVxuXG5cdHNob3coKSB7XG5cdFx0dGhpcy5kaXNwbGF5ID0gdHJ1ZTtcblx0XHR0aGlzLnNlbGVjdGVkTm9kZXMgPSBbXTtcblx0XHR2YXIgc3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgaWYodGhpcy5jYXRlZ29yeSA9PSBcImNvdXJzZVwiKVxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gIEdyb3VwLmxpc3RDb3Vyc2VHcm91cCh0aGlzKTtcbiAgICAgICAgaWYodGhpcy5jYXRlZ29yeSA9PSBcIm9yZ2FuaXphdGlvblwiKVxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gIEdyb3VwLmxpc3RVc2VyR3JvdXAodGhpcyk7XG4gICAgICAgIGlmKHRoaXMuY2F0ZWdvcnkgPT0gXCJxdWVzdGlvblwiKVxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gIEdyb3VwLmxpc3RRdWVzdGlvbkdyb3VwKHRoaXMpO1xuICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSAgXG4gICAgICAgICAgICBzdWJzY3JpcHRpb24uc3Vic2NyaWJlKGdyb3VwcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVlID0gdGhpcy50cmVlVXRpbHMuYnVpbGRHcm91cFRyZWUoZ3JvdXBzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAvL31cblx0fVxuXG5cdHNlbGVjdCgpIHtcblx0XHR2YXIgZ3JvdXBzID0gXy5tYXAodGhpcy5zZWxlY3RlZE5vZGVzLCBzZWxlY3RlZE5vZGU9PiB7XG5cdFx0XHRyZXR1cm4gc2VsZWN0ZWROb2RlW1wiZGF0YVwiXTtcblx0XHR9KVxuXHRcdHRoaXMub25TZWxlY3RHcm91cHNSZWNlaXZlci5uZXh0KGdyb3Vwcyk7XG5cdFx0dGhpcy5oaWRlKCk7XG5cdH1cblxuXG59XG5cbiJdfQ==

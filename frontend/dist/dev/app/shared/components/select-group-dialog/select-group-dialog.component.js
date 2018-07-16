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
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var SelectGroupDialog = (function (_super) {
    __extends(SelectGroupDialog, _super);
    function SelectGroupDialog() {
        var _this = _super.call(this) || this;
        _this.onSelectGroupReceiver = new Rx_1.Subject();
        _this.onSelectGroup = _this.onSelectGroupReceiver.asObservable();
        _this.display = false;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    SelectGroupDialog.prototype.hide = function () {
        this.display = false;
    };
    SelectGroupDialog.prototype.show = function () {
        var _this = this;
        this.display = true;
        this.selectedNode = null;
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
    SelectGroupDialog.prototype.select = function () {
        this.onSelectGroupReceiver.next(this.selectedNode.data);
        this.hide();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SelectGroupDialog.prototype, "category", void 0);
    SelectGroupDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'select-group-dialog',
            templateUrl: 'select-group-dialog.component.html',
            styleUrls: ['select-group-dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], SelectGroupDialog);
    return SelectGroupDialog;
}(base_component_1.BaseComponent));
exports.SelectGroupDialog = SelectGroupDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtZ3JvdXAtZGlhbG9nL3NlbGVjdC1ncm91cC1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCw4QkFBOEM7QUFHOUMsa0VBQTJEO0FBQzNELHlEQUF1RDtBQUd2RCxpRUFBK0Q7QUFXL0Q7SUFBdUMscUNBQWE7SUFXbkQ7UUFBQSxZQUNDLGlCQUFPLFNBR1A7UUFQTywyQkFBcUIsR0FBaUIsSUFBSSxZQUFPLEVBQUUsQ0FBQztRQUN6RCxtQkFBYSxHQUFvQixLQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFJN0UsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHNCQUFTLEVBQUUsQ0FBQzs7SUFDbEMsQ0FBQztJQUVELGdDQUFJLEdBQUo7UUFDQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsZ0NBQUksR0FBSjtRQUFBLGlCQWNDO1FBYkEsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRO1lBQ3hCLFlBQVksR0FBSSxtQkFBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFHLElBQUksQ0FBQyxRQUFRLElBQUksY0FBYztZQUM5QixZQUFZLEdBQUksbUJBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBRyxJQUFJLENBQUMsUUFBUSxJQUFJLFVBQVU7WUFDMUIsWUFBWSxHQUFJLG1CQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsSUFBSSxZQUFZO1lBQ1osWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07Z0JBQ3pCLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7SUFDZCxDQUFDO0lBRUQsa0NBQU0sR0FBTjtRQUNDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDYixDQUFDO0lBdENRO1FBQVIsWUFBSyxFQUFFOzt1REFBa0I7SUFGZCxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFdBQVcsRUFBRSxvQ0FBb0M7WUFDakQsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7U0FDaEQsQ0FBQzs7T0FDVyxpQkFBaUIsQ0EyQzdCO0lBQUQsd0JBQUM7Q0EzQ0QsQUEyQ0MsQ0EzQ3NDLDhCQUFhLEdBMkNuRDtBQTNDWSw4Q0FBaUIiLCJmaWxlIjoiYXBwL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC1ncm91cC1kaWFsb2cvc2VsZWN0LWdyb3VwLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFRyZWVVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3RyZWUudXRpbHMnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBHUk9VUF9DQVRFR09SWSwgQ09OVEVOVF9TVEFUVVMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ3NlbGVjdC1ncm91cC1kaWFsb2cnLFxuXHR0ZW1wbGF0ZVVybDogJ3NlbGVjdC1ncm91cC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnc2VsZWN0LWdyb3VwLWRpYWxvZy5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdEdyb3VwRGlhbG9nIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cblx0QElucHV0KCkgY2F0ZWdvcnk6IHN0cmluZztcblx0cHJpdmF0ZSB0cmVlOiBUcmVlTm9kZVtdO1xuXHRwcml2YXRlIHNlbGVjdGVkTm9kZTogVHJlZU5vZGU7XG5cdHByaXZhdGUgZGlzcGxheTogYm9vbGVhbjtcblx0cHJpdmF0ZSB0cmVlVXRpbHM6IFRyZWVVdGlscztcblxuXHRwcml2YXRlIG9uU2VsZWN0R3JvdXBSZWNlaXZlcjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcbiAgICBvblNlbGVjdEdyb3VwOk9ic2VydmFibGU8YW55PiA9ICB0aGlzLm9uU2VsZWN0R3JvdXBSZWNlaXZlci5hc09ic2VydmFibGUoKTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuXHRcdHRoaXMudHJlZVV0aWxzID0gbmV3IFRyZWVVdGlscygpO1xuXHR9XG5cblx0aGlkZSgpIHtcblx0XHR0aGlzLmRpc3BsYXkgPSBmYWxzZTtcblx0fVxuXG5cdHNob3coKSB7XG5cdFx0dGhpcy5kaXNwbGF5ID0gdHJ1ZTtcblx0XHR0aGlzLnNlbGVjdGVkTm9kZSA9IG51bGw7XG5cdFx0dmFyIHN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIGlmKHRoaXMuY2F0ZWdvcnkgPT0gXCJjb3Vyc2VcIilcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9ICBHcm91cC5saXN0Q291cnNlR3JvdXAodGhpcyk7XG4gICAgICAgIGlmKHRoaXMuY2F0ZWdvcnkgPT0gXCJvcmdhbml6YXRpb25cIilcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9ICBHcm91cC5saXN0VXNlckdyb3VwKHRoaXMpO1xuICAgICAgICBpZih0aGlzLmNhdGVnb3J5ID09IFwicXVlc3Rpb25cIilcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9ICBHcm91cC5saXN0UXVlc3Rpb25Hcm91cCh0aGlzKTtcbiAgICAgICAgaWYgKHN1YnNjcmlwdGlvbikgIFxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnN1YnNjcmliZShncm91cHMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudHJlZSA9IHRoaXMudHJlZVV0aWxzLmJ1aWxkR3JvdXBUcmVlKGdyb3Vwcyk7XG4gICAgICAgICAgICB9KTtcblx0fVxuXG5cdHNlbGVjdCgpIHtcblx0XHR0aGlzLm9uU2VsZWN0R3JvdXBSZWNlaXZlci5uZXh0KHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEpO1xuXHRcdHRoaXMuaGlkZSgpO1xuXHR9XG5cblxufVxuXG4iXX0=

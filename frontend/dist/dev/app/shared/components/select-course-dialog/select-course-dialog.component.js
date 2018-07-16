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
var course_model_1 = require("../../../shared/models/elearning/course.model");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var SelectCoursesDialog = (function (_super) {
    __extends(SelectCoursesDialog, _super);
    function SelectCoursesDialog() {
        var _this = _super.call(this) || this;
        _this.onSelectCoursesReceiver = new Rx_1.Subject();
        _this.onSelectCourses = _this.onSelectCoursesReceiver.asObservable();
        _this.display = false;
        _this.selectedCourses = [];
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    SelectCoursesDialog.prototype.hide = function () {
        this.display = false;
    };
    SelectCoursesDialog.prototype.nodeSelect = function (event) {
        var _this = this;
        if (this.selectedNode) {
            course_model_1.Course.listByGroup(this, this.selectedNode.data.id).subscribe(function (courses) {
                _this.courses = courses;
            });
        }
    };
    SelectCoursesDialog.prototype.show = function () {
        var _this = this;
        this.display = true;
        this.selectedCourses = [];
        group_model_1.Group.listCourseGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
        });
    };
    SelectCoursesDialog.prototype.selectCourse = function () {
        this.onSelectCoursesReceiver.next(this.selectedCourses);
        this.selectedCourses = [];
        this.hide();
    };
    SelectCoursesDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'select-course-dialog',
            templateUrl: 'select-course-dialog.component.html',
            styleUrls: ['select-course-dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], SelectCoursesDialog);
    return SelectCoursesDialog;
}(base_component_1.BaseComponent));
exports.SelectCoursesDialog = SelectCoursesDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtY291cnNlLWRpYWxvZy9zZWxlY3QtY291cnNlLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXlEO0FBQ3pELDhCQUE4QztBQUc5QyxrRUFBMkQ7QUFDM0QseURBQXVEO0FBQ3ZELDhFQUF1RTtBQUV2RSxpRUFBK0Q7QUFXL0Q7SUFBeUMsdUNBQWE7SUFZckQ7UUFBQSxZQUNDLGlCQUFPLFNBSVA7UUFSTyw2QkFBdUIsR0FBaUIsSUFBSSxZQUFPLEVBQUUsQ0FBQztRQUM5RCxxQkFBZSxHQUFvQixLQUFJLENBQUMsdUJBQXVCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFJOUUsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsS0FBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHNCQUFTLEVBQUUsQ0FBQzs7SUFDbEMsQ0FBQztJQUVELGtDQUFJLEdBQUo7UUFDQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsd0NBQVUsR0FBVixVQUFXLEtBQVU7UUFBckIsaUJBTUM7UUFMQSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIscUJBQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87Z0JBQ3BFLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1NBQ0g7SUFDRixDQUFDO0lBRUQsa0NBQUksR0FBSjtRQUFBLGlCQU9DO1FBTkEsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFFMUIsbUJBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUMzQyxLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELDBDQUFZLEdBQVo7UUFDQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDYixDQUFDO0lBNUNXLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsV0FBVyxFQUFFLHFDQUFxQztZQUNsRCxTQUFTLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztTQUNqRCxDQUFDOztPQUNXLG1CQUFtQixDQStDL0I7SUFBRCwwQkFBQztDQS9DRCxBQStDQyxDQS9Dd0MsOEJBQWEsR0ErQ3JEO0FBL0NZLGtEQUFtQiIsImZpbGUiOiJhcHAvc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0LWNvdXJzZS1kaWFsb2cvc2VsZWN0LWNvdXJzZS1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgVHJlZVV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvdHJlZS51dGlscyc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEdST1VQX0NBVEVHT1JZLCBDT05URU5UX1NUQVRVUyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnc2VsZWN0LWNvdXJzZS1kaWFsb2cnLFxuXHR0ZW1wbGF0ZVVybDogJ3NlbGVjdC1jb3Vyc2UtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJ3NlbGVjdC1jb3Vyc2UtZGlhbG9nLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0Q291cnNlc0RpYWxvZyBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG5cdHByaXZhdGUgdHJlZTogVHJlZU5vZGVbXTtcblx0cHJpdmF0ZSBzZWxlY3RlZE5vZGU6IFRyZWVOb2RlO1xuXHRwcml2YXRlIHNlbGVjdGVkQ291cnNlczogQ291cnNlW107XG5cdHByaXZhdGUgY291cnNlczogQ291cnNlW107XG5cdHByaXZhdGUgZGlzcGxheTogYm9vbGVhbjtcblx0cHJpdmF0ZSB0cmVlVXRpbHM6IFRyZWVVdGlscztcblxuXHRwcml2YXRlIG9uU2VsZWN0Q291cnNlc1JlY2VpdmVyOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuXHRvblNlbGVjdENvdXJzZXM6IE9ic2VydmFibGU8YW55PiA9IHRoaXMub25TZWxlY3RDb3Vyc2VzUmVjZWl2ZXIuYXNPYnNlcnZhYmxlKCk7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLmRpc3BsYXkgPSBmYWxzZTtcblx0XHR0aGlzLnNlbGVjdGVkQ291cnNlcyA9IFtdO1xuXHRcdHRoaXMudHJlZVV0aWxzID0gbmV3IFRyZWVVdGlscygpO1xuXHR9XG5cblx0aGlkZSgpIHtcblx0XHR0aGlzLmRpc3BsYXkgPSBmYWxzZTtcblx0fVxuXG5cdG5vZGVTZWxlY3QoZXZlbnQ6IGFueSkge1xuXHRcdGlmICh0aGlzLnNlbGVjdGVkTm9kZSkge1xuXHRcdFx0Q291cnNlLmxpc3RCeUdyb3VwKHRoaXMsIHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEuaWQpLnN1YnNjcmliZShjb3Vyc2VzID0+IHtcblx0XHRcdFx0dGhpcy5jb3Vyc2VzID0gY291cnNlcztcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHNob3coKSB7XG5cdFx0dGhpcy5kaXNwbGF5ID0gdHJ1ZTtcblx0XHR0aGlzLnNlbGVjdGVkQ291cnNlcyA9IFtdO1xuXHRcdC8vICwgR1JPVVBfQ0FURUdPUlkuQ09VUlNFXG5cdFx0R3JvdXAubGlzdENvdXJzZUdyb3VwKHRoaXMpLnN1YnNjcmliZShncm91cHMgPT4ge1xuXHRcdFx0dGhpcy50cmVlID0gdGhpcy50cmVlVXRpbHMuYnVpbGRHcm91cFRyZWUoZ3JvdXBzKTtcblx0XHR9KTtcblx0fVxuXG5cdHNlbGVjdENvdXJzZSgpIHtcblx0XHR0aGlzLm9uU2VsZWN0Q291cnNlc1JlY2VpdmVyLm5leHQodGhpcy5zZWxlY3RlZENvdXJzZXMpO1xuXHRcdHRoaXMuc2VsZWN0ZWRDb3Vyc2VzID0gW107XG5cdFx0dGhpcy5oaWRlKCk7XG5cdH1cblxuXG59XG5cbiJdfQ==

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
var base_dialog_1 = require("../../components/base/base.dialog");
var group_model_1 = require("../../models/elearning/group.model");
var tree_utils_1 = require("../../helpers/tree.utils");
var GroupDialog = (function (_super) {
    __extends(GroupDialog, _super);
    function GroupDialog() {
        var _this = _super.call(this) || this;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    GroupDialog.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            this.object.parent_id = this.selectedNode.data.id;
        }
    };
    GroupDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            var subscription = null;
            if (object.category == "course")
                subscription = group_model_1.Group.listCourseGroup(_this);
            if (object.category == "organization")
                subscription = group_model_1.Group.listUserGroup(_this);
            if (object.category == "question")
                subscription = group_model_1.Group.listQuestionGroup(_this);
            if (object.category == "competency")
                subscription = group_model_1.Group.listCompetencyGroup(_this);
            if (subscription) {
                subscription.subscribe(function (groups) {
                    _this.tree = _this.treeUtils.buildGroupTree(groups);
                    if (object.id) {
                        var node = _this.treeUtils.findTreeNode(_this.tree, object.id);
                        node.selectable = false;
                    }
                    if (object.parent_id) {
                        _this.selectedNode = _this.treeUtils.findTreeNode(_this.tree, object.parent_id);
                    }
                });
            }
        });
    };
    GroupDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'group-dialog',
            templateUrl: 'group-dialog.component.html',
            styleUrls: ['group-dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], GroupDialog);
    return GroupDialog;
}(base_dialog_1.BaseDialog));
exports.GroupDialog = GroupDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy9ncm91cC1kaWFsb2cvZ3JvdXAtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUQ7QUFHekQsaUVBQStEO0FBQy9ELGtFQUEyRDtBQUUzRCx1REFBcUQ7QUFTckQ7SUFBaUMsK0JBQWlCO0lBTWpEO1FBQUEsWUFDQyxpQkFBTyxTQUVQO1FBREEsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHNCQUFTLEVBQUUsQ0FBQzs7SUFDbEMsQ0FBQztJQUVELGdDQUFVLEdBQVYsVUFBVyxLQUFVO1FBQ3BCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7U0FDbEQ7SUFDRixDQUFDO0lBRUQsOEJBQVEsR0FBUjtRQUFBLGlCQTJCQztRQTFCQSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDM0IsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksTUFBTSxDQUFDLFFBQVEsSUFBSSxRQUFRO2dCQUM5QixZQUFZLEdBQUcsbUJBQUssQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLENBQUM7WUFDNUMsSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLGNBQWM7Z0JBQ3BDLFlBQVksR0FBRyxtQkFBSyxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsQ0FBQztZQUMxQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksVUFBVTtnQkFDaEMsWUFBWSxHQUFHLG1CQUFLLENBQUMsaUJBQWlCLENBQUMsS0FBSSxDQUFDLENBQUM7WUFDOUMsSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLFlBQVk7Z0JBQ2xDLFlBQVksR0FBRyxtQkFBSyxDQUFDLG1CQUFtQixDQUFDLEtBQUksQ0FBQyxDQUFDO1lBQ2hELElBQUksWUFBWSxFQUFFO2dCQUVqQixZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtvQkFDNUIsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDbEQsSUFBSSxNQUFNLENBQUMsRUFBRSxFQUFFO3dCQUNkLElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUM3RCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztxQkFDeEI7b0JBQ0QsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFO3dCQUNyQixLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUM3RTtnQkFFRixDQUFDLENBQUMsQ0FBQzthQUNIO1FBRUYsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBNUNXLFdBQVc7UUFOdkIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsY0FBYztZQUN4QixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1NBQ3pDLENBQUM7O09BQ1csV0FBVyxDQTZDdkI7SUFBRCxrQkFBQztDQTdDRCxBQTZDQyxDQTdDZ0Msd0JBQVUsR0E2QzFDO0FBN0NZLGtDQUFXIiwiZmlsZSI6ImFwcC9zaGFyZWQvY29tcG9uZW50cy9ncm91cC1kaWFsb2cvZ3JvdXAtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEJhc2VEaWFsb2cgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2Jhc2UvYmFzZS5kaWFsb2cnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBUcmVlVXRpbHMgfSBmcm9tICcuLi8uLi9oZWxwZXJzL3RyZWUudXRpbHMnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ2dyb3VwLWRpYWxvZycsXG5cdHRlbXBsYXRlVXJsOiAnZ3JvdXAtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJ2dyb3VwLWRpYWxvZy5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEdyb3VwRGlhbG9nIGV4dGVuZHMgQmFzZURpYWxvZzxHcm91cD4gaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdHByaXZhdGUgdHJlZTogVHJlZU5vZGVbXTtcblx0cHJpdmF0ZSB0cmVlVXRpbHM6IFRyZWVVdGlscztcblx0cHJpdmF0ZSBzZWxlY3RlZE5vZGU6IFRyZWVOb2RlO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy50cmVlVXRpbHMgPSBuZXcgVHJlZVV0aWxzKCk7XG5cdH1cblxuXHRub2RlU2VsZWN0KGV2ZW50OiBhbnkpIHtcblx0XHRpZiAodGhpcy5zZWxlY3RlZE5vZGUpIHtcblx0XHRcdHRoaXMub2JqZWN0LnBhcmVudF9pZCA9IHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEuaWQ7XG5cdFx0fVxuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5vblNob3cuc3Vic2NyaWJlKG9iamVjdCA9PiB7XG5cdFx0XHR2YXIgc3Vic2NyaXB0aW9uID0gbnVsbDtcblx0XHRcdGlmIChvYmplY3QuY2F0ZWdvcnkgPT0gXCJjb3Vyc2VcIilcblx0XHRcdFx0c3Vic2NyaXB0aW9uID0gR3JvdXAubGlzdENvdXJzZUdyb3VwKHRoaXMpO1xuXHRcdFx0aWYgKG9iamVjdC5jYXRlZ29yeSA9PSBcIm9yZ2FuaXphdGlvblwiKVxuXHRcdFx0XHRzdWJzY3JpcHRpb24gPSBHcm91cC5saXN0VXNlckdyb3VwKHRoaXMpO1xuXHRcdFx0aWYgKG9iamVjdC5jYXRlZ29yeSA9PSBcInF1ZXN0aW9uXCIpXG5cdFx0XHRcdHN1YnNjcmlwdGlvbiA9IEdyb3VwLmxpc3RRdWVzdGlvbkdyb3VwKHRoaXMpO1xuXHRcdFx0aWYgKG9iamVjdC5jYXRlZ29yeSA9PSBcImNvbXBldGVuY3lcIilcblx0XHRcdFx0c3Vic2NyaXB0aW9uID0gR3JvdXAubGlzdENvbXBldGVuY3lHcm91cCh0aGlzKTtcblx0XHRcdGlmIChzdWJzY3JpcHRpb24pIHtcblx0XHRcdFx0XG5cdFx0XHRcdHN1YnNjcmlwdGlvbi5zdWJzY3JpYmUoZ3JvdXBzID0+IHtcblx0XHRcdFx0XHR0aGlzLnRyZWUgPSB0aGlzLnRyZWVVdGlscy5idWlsZEdyb3VwVHJlZShncm91cHMpO1xuXHRcdFx0XHRcdGlmIChvYmplY3QuaWQpIHtcblx0XHRcdFx0XHRcdHZhciBub2RlID0gdGhpcy50cmVlVXRpbHMuZmluZFRyZWVOb2RlKHRoaXMudHJlZSwgb2JqZWN0LmlkKTtcblx0XHRcdFx0XHRcdG5vZGUuc2VsZWN0YWJsZSA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAob2JqZWN0LnBhcmVudF9pZCkge1xuXHRcdFx0XHRcdFx0dGhpcy5zZWxlY3RlZE5vZGUgPSB0aGlzLnRyZWVVdGlscy5maW5kVHJlZU5vZGUodGhpcy50cmVlLCBvYmplY3QucGFyZW50X2lkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cdH1cbn1cblxuXG4iXX0=

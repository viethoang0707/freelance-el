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
var competency_model_1 = require("../../../shared/models/elearning/competency.model");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var SelectCompetencyDialog = (function (_super) {
    __extends(SelectCompetencyDialog, _super);
    function SelectCompetencyDialog() {
        var _this = _super.call(this) || this;
        _this.onSelectCompetencyReceiver = new Rx_1.Subject();
        _this.onSelectCompetency = _this.onSelectCompetencyReceiver.asObservable();
        _this.display = false;
        _this.competencies = [];
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    SelectCompetencyDialog.prototype.hide = function () {
        this.display = false;
    };
    SelectCompetencyDialog.prototype.nodeSelect = function (event) {
        var _this = this;
        if (this.selectedNode) {
            competency_model_1.Competency.listByGroup(this, this.selectedNode.data.id).subscribe(function (competencies) {
                _this.competencies = competencies;
            });
        }
    };
    SelectCompetencyDialog.prototype.show = function () {
        var _this = this;
        this.display = true;
        group_model_1.Group.listCompetencyGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
        });
    };
    SelectCompetencyDialog.prototype.selectCompetency = function () {
        this.onSelectCompetencyReceiver.next(this.selectedCompetency);
        this.hide();
    };
    SelectCompetencyDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'select-competency-dialog',
            templateUrl: 'select-competency-dialog.component.html',
            styleUrls: ['select-competency-dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], SelectCompetencyDialog);
    return SelectCompetencyDialog;
}(base_component_1.BaseComponent));
exports.SelectCompetencyDialog = SelectCompetencyDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtY29tcGV0ZW5jeS1kaWFsb2cvc2VsZWN0LWNvbXBldGVuY3ktZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUQ7QUFDekQsOEJBQThDO0FBRzlDLGtFQUEyRDtBQUMzRCx5REFBdUQ7QUFDdkQsc0ZBQStFO0FBRS9FLGlFQUErRDtBQVcvRDtJQUE0QywwQ0FBYTtJQVl4RDtRQUFBLFlBQ0MsaUJBQU8sU0FJUDtRQVJPLGdDQUEwQixHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQzlELHdCQUFrQixHQUFvQixLQUFJLENBQUMsMEJBQTBCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFJdkYsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsS0FBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHNCQUFTLEVBQUUsQ0FBQzs7SUFDbEMsQ0FBQztJQUVELHFDQUFJLEdBQUo7UUFDQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsMkNBQVUsR0FBVixVQUFXLEtBQVU7UUFBckIsaUJBTUM7UUFMQSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsNkJBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLFlBQVk7Z0JBQzVFLEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1NBQ0g7SUFDRixDQUFDO0lBRUQscUNBQUksR0FBSjtRQUFBLGlCQU1DO1FBTEEsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFFcEIsbUJBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQy9DLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsaURBQWdCLEdBQWhCO1FBQ0MsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDYixDQUFDO0lBMUNXLHNCQUFzQjtRQU5sQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSwwQkFBMEI7WUFDcEMsV0FBVyxFQUFFLHlDQUF5QztZQUN0RCxTQUFTLEVBQUUsQ0FBQyx3Q0FBd0MsQ0FBQztTQUNyRCxDQUFDOztPQUNXLHNCQUFzQixDQTZDbEM7SUFBRCw2QkFBQztDQTdDRCxBQTZDQyxDQTdDMkMsOEJBQWEsR0E2Q3hEO0FBN0NZLHdEQUFzQiIsImZpbGUiOiJhcHAvc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0LWNvbXBldGVuY3ktZGlhbG9nL3NlbGVjdC1jb21wZXRlbmN5LWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tcGV0ZW5jeSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvbXBldGVuY3kubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFRyZWVVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3RyZWUudXRpbHMnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBHUk9VUF9DQVRFR09SWSwgQ09OVEVOVF9TVEFUVVMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ3NlbGVjdC1jb21wZXRlbmN5LWRpYWxvZycsXG5cdHRlbXBsYXRlVXJsOiAnc2VsZWN0LWNvbXBldGVuY3ktZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJ3NlbGVjdC1jb21wZXRlbmN5LWRpYWxvZy5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdENvbXBldGVuY3lEaWFsb2cgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuXHRwcml2YXRlIHRyZWU6IFRyZWVOb2RlW107XG5cdHByaXZhdGUgc2VsZWN0ZWROb2RlOiBUcmVlTm9kZTtcblx0cHJpdmF0ZSBzZWxlY3RlZENvbXBldGVuY3k6IENvbXBldGVuY3k7XG5cdHByaXZhdGUgY29tcGV0ZW5jaWVzOkNvbXBldGVuY3lbXTtcblx0cHJpdmF0ZSBkaXNwbGF5OiBib29sZWFuO1xuXHRwcml2YXRlIHRyZWVVdGlsczogVHJlZVV0aWxzO1xuXG5cdHByaXZhdGUgb25TZWxlY3RDb21wZXRlbmN5UmVjZWl2ZXI6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgb25TZWxlY3RDb21wZXRlbmN5Ok9ic2VydmFibGU8YW55PiA9ICB0aGlzLm9uU2VsZWN0Q29tcGV0ZW5jeVJlY2VpdmVyLmFzT2JzZXJ2YWJsZSgpO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5kaXNwbGF5ID0gZmFsc2U7XG5cdFx0dGhpcy5jb21wZXRlbmNpZXMgPSBbXTtcblx0XHR0aGlzLnRyZWVVdGlscyA9IG5ldyBUcmVlVXRpbHMoKTtcblx0fVxuXG5cdGhpZGUoKSB7XG5cdFx0dGhpcy5kaXNwbGF5ID0gZmFsc2U7XG5cdH1cblxuXHRub2RlU2VsZWN0KGV2ZW50OiBhbnkpIHtcblx0XHRpZiAodGhpcy5zZWxlY3RlZE5vZGUpIHtcblx0XHRcdENvbXBldGVuY3kubGlzdEJ5R3JvdXAodGhpcyx0aGlzLnNlbGVjdGVkTm9kZS5kYXRhLmlkKS5zdWJzY3JpYmUoY29tcGV0ZW5jaWVzID0+IHtcblx0XHRcdFx0dGhpcy5jb21wZXRlbmNpZXMgPSBjb21wZXRlbmNpZXM7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRzaG93KCkge1xuXHRcdHRoaXMuZGlzcGxheSA9IHRydWU7XG5cdFx0Ly8gLCBHUk9VUF9DQVRFR09SWS5DT1VSU0Vcblx0XHRHcm91cC5saXN0Q29tcGV0ZW5jeUdyb3VwKHRoaXMpLnN1YnNjcmliZShncm91cHMgPT4ge1xuXHRcdFx0dGhpcy50cmVlID0gdGhpcy50cmVlVXRpbHMuYnVpbGRHcm91cFRyZWUoZ3JvdXBzKTtcblx0XHR9KTtcblx0fVxuXG5cdHNlbGVjdENvbXBldGVuY3koKSB7XG5cdFx0dGhpcy5vblNlbGVjdENvbXBldGVuY3lSZWNlaXZlci5uZXh0KHRoaXMuc2VsZWN0ZWRDb21wZXRlbmN5KTtcblx0XHR0aGlzLmhpZGUoKTtcblx0fVxuXG5cbn1cblxuIl19

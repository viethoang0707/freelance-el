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
var _ = require("underscore");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var competency_level_model_1 = require("../../../shared/models/elearning/competency-level.model");
var SelectCompetencyLevelDialog = (function (_super) {
    __extends(SelectCompetencyLevelDialog, _super);
    function SelectCompetencyLevelDialog() {
        var _this = _super.call(this) || this;
        _this.onSelectCompetencyLevelReceiver = new Rx_1.Subject();
        _this.onSelectCompetencyLevel = _this.onSelectCompetencyLevelReceiver.asObservable();
        _this.display = false;
        _this.levels = [];
        _this.displayLevels = [];
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    SelectCompetencyLevelDialog.prototype.hide = function () {
        this.display = false;
    };
    SelectCompetencyLevelDialog.prototype.nodeSelect = function (event) {
        var _this = this;
        if (this.selectedNode) {
            this.displayLevels = [];
            competency_model_1.Competency.listByGroup(this, this.selectedNode.data.id).subscribe(function (competencies) {
                _.each(competencies, function (competency) {
                    var levels = _.filter(_this.levels, function (level) {
                        return level.competency_id == competency.id;
                    });
                    _this.displayLevels = _this.displayLevels.concat(levels);
                });
            });
        }
    };
    SelectCompetencyLevelDialog.prototype.show = function () {
        var _this = this;
        this.display = true;
        group_model_1.Group.listCompetencyGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
            competency_level_model_1.CompetencyLevel.all(_this).subscribe(function (levels) {
                _this.levels = levels;
            });
        });
    };
    SelectCompetencyLevelDialog.prototype.selectLevel = function () {
        this.onSelectCompetencyLevelReceiver.next(this.selectedLevel);
        this.hide();
    };
    SelectCompetencyLevelDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'select-competency-level-dialog',
            templateUrl: 'select-competency-level-dialog.component.html',
            styleUrls: ['select-competency-level-dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], SelectCompetencyLevelDialog);
    return SelectCompetencyLevelDialog;
}(base_component_1.BaseComponent));
exports.SelectCompetencyLevelDialog = SelectCompetencyLevelDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtY29tcGV0ZW5jeS1sZXZlbC1kaWFsb2cvc2VsZWN0LWNvbXBldGVuY3ktbGV2ZWwtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUQ7QUFDekQsOEJBQThDO0FBRzlDLGtFQUEyRDtBQUMzRCx5REFBdUQ7QUFDdkQsc0ZBQStFO0FBQy9FLDhCQUFnQztBQUNoQyxpRUFBK0Q7QUFJL0Qsa0dBQTBGO0FBUTFGO0lBQWlELCtDQUFhO0lBYTdEO1FBQUEsWUFDQyxpQkFBTyxTQUtQO1FBVE8scUNBQStCLEdBQWlCLElBQUksWUFBTyxFQUFFLENBQUM7UUFDbkUsNkJBQXVCLEdBQW9CLEtBQUksQ0FBQywrQkFBK0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUlqRyxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixLQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksc0JBQVMsRUFBRSxDQUFDOztJQUNsQyxDQUFDO0lBRUQsMENBQUksR0FBSjtRQUNDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxnREFBVSxHQUFWLFVBQVcsS0FBVTtRQUFyQixpQkFZQztRQVhBLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxHQUFJLEVBQUUsQ0FBQztZQUN6Qiw2QkFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsWUFBWTtnQkFDNUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBQyxVQUFxQjtvQkFDMUMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsTUFBTSxFQUFFLFVBQUMsS0FBcUI7d0JBQ3hELE9BQU8sS0FBSyxDQUFDLGFBQWEsSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDO29CQUM3QyxDQUFDLENBQUMsQ0FBQztvQkFDSCxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4RCxDQUFDLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1NBQ0g7SUFDRixDQUFDO0lBRUQsMENBQUksR0FBSjtRQUFBLGlCQVVDO1FBVEEsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFFcEIsbUJBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQy9DLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEQsd0NBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtnQkFDekMsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFFdEIsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxpREFBVyxHQUFYO1FBQ0MsSUFBSSxDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2IsQ0FBQztJQXREVywyQkFBMkI7UUFOdkMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsZ0NBQWdDO1lBQzFDLFdBQVcsRUFBRSwrQ0FBK0M7WUFDNUQsU0FBUyxFQUFFLENBQUMsOENBQThDLENBQUM7U0FDM0QsQ0FBQzs7T0FDVywyQkFBMkIsQ0F5RHZDO0lBQUQsa0NBQUM7Q0F6REQsQUF5REMsQ0F6RGdELDhCQUFhLEdBeUQ3RDtBQXpEWSxrRUFBMkIiLCJmaWxlIjoiYXBwL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC1jb21wZXRlbmN5LWxldmVsLWRpYWxvZy9zZWxlY3QtY29tcGV0ZW5jeS1sZXZlbC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IENvbXBldGVuY3kgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb21wZXRlbmN5Lm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBUcmVlVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy90cmVlLnV0aWxzJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgR1JPVVBfQ0FURUdPUlksIENPTlRFTlRfU1RBVFVTIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQ29tcGV0ZW5jeUxldmVsIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY29tcGV0ZW5jeS1sZXZlbC5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ3NlbGVjdC1jb21wZXRlbmN5LWxldmVsLWRpYWxvZycsXG5cdHRlbXBsYXRlVXJsOiAnc2VsZWN0LWNvbXBldGVuY3ktbGV2ZWwtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJ3NlbGVjdC1jb21wZXRlbmN5LWxldmVsLWRpYWxvZy5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdENvbXBldGVuY3lMZXZlbERpYWxvZyBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG5cdHByaXZhdGUgdHJlZTogVHJlZU5vZGVbXTtcblx0cHJpdmF0ZSBzZWxlY3RlZE5vZGU6IFRyZWVOb2RlO1xuXHRwcml2YXRlIHNlbGVjdGVkTGV2ZWw6IGFueTtcblx0cHJpdmF0ZSBsZXZlbHM6Q29tcGV0ZW5jeUxldmVsW107XG5cdHByaXZhdGUgZGlzcGxheUxldmVsczpDb21wZXRlbmN5TGV2ZWxbXTtcblx0cHJpdmF0ZSBkaXNwbGF5OiBib29sZWFuO1xuXHRwcml2YXRlIHRyZWVVdGlsczogVHJlZVV0aWxzO1xuXG5cdHByaXZhdGUgb25TZWxlY3RDb21wZXRlbmN5TGV2ZWxSZWNlaXZlcjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcbiAgICBvblNlbGVjdENvbXBldGVuY3lMZXZlbDpPYnNlcnZhYmxlPGFueT4gPSAgdGhpcy5vblNlbGVjdENvbXBldGVuY3lMZXZlbFJlY2VpdmVyLmFzT2JzZXJ2YWJsZSgpO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5kaXNwbGF5ID0gZmFsc2U7XG5cdFx0dGhpcy5sZXZlbHMgPSBbXTtcblx0XHR0aGlzLmRpc3BsYXlMZXZlbHMgPSBbXTtcblx0XHR0aGlzLnRyZWVVdGlscyA9IG5ldyBUcmVlVXRpbHMoKTtcblx0fVxuXG5cdGhpZGUoKSB7XG5cdFx0dGhpcy5kaXNwbGF5ID0gZmFsc2U7XG5cdH1cblxuXHRub2RlU2VsZWN0KGV2ZW50OiBhbnkpIHtcblx0XHRpZiAodGhpcy5zZWxlY3RlZE5vZGUpIHtcblx0XHRcdHRoaXMuZGlzcGxheUxldmVscyA9ICBbXTtcblx0XHRcdENvbXBldGVuY3kubGlzdEJ5R3JvdXAodGhpcyx0aGlzLnNlbGVjdGVkTm9kZS5kYXRhLmlkKS5zdWJzY3JpYmUoY29tcGV0ZW5jaWVzID0+IHtcblx0XHRcdFx0Xy5lYWNoKGNvbXBldGVuY2llcywgKGNvbXBldGVuY3k6Q29tcGV0ZW5jeSk9PiB7XG5cdFx0XHRcdFx0dmFyIGxldmVscyA9IF8uZmlsdGVyKHRoaXMubGV2ZWxzLCAobGV2ZWw6Q29tcGV0ZW5jeUxldmVsKT0+IHtcblx0XHRcdFx0XHRcdHJldHVybiBsZXZlbC5jb21wZXRlbmN5X2lkID09IGNvbXBldGVuY3kuaWQ7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0dGhpcy5kaXNwbGF5TGV2ZWxzID0gdGhpcy5kaXNwbGF5TGV2ZWxzLmNvbmNhdChsZXZlbHMpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHNob3coKSB7XG5cdFx0dGhpcy5kaXNwbGF5ID0gdHJ1ZTtcblx0XHRcblx0XHRHcm91cC5saXN0Q29tcGV0ZW5jeUdyb3VwKHRoaXMpLnN1YnNjcmliZShncm91cHMgPT4ge1xuXHRcdFx0dGhpcy50cmVlID0gdGhpcy50cmVlVXRpbHMuYnVpbGRHcm91cFRyZWUoZ3JvdXBzKTtcblx0XHRcdENvbXBldGVuY3lMZXZlbC5hbGwodGhpcykuc3Vic2NyaWJlKGxldmVscyA9PiB7XG5cdFx0XHRcdHRoaXMubGV2ZWxzID0gbGV2ZWxzO1xuXHRcdFx0XHRcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0c2VsZWN0TGV2ZWwoKSB7XG5cdFx0dGhpcy5vblNlbGVjdENvbXBldGVuY3lMZXZlbFJlY2VpdmVyLm5leHQodGhpcy5zZWxlY3RlZExldmVsKTtcblx0XHR0aGlzLmhpZGUoKTtcblx0fVxuXG5cbn1cblxuIl19

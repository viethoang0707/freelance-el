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
var base_component_1 = require("../../../shared/components/base/base.component");
var chart_decorator_1 = require("../chart.decorator");
var competency_profile_chart_component_1 = require("./competency-profile-chart.component");
var select_competency_dialog_component_1 = require("../../../shared/components/select-competency-dialog/select-competency-dialog.component");
var CompetencyProfileChartContainerComponent = (function (_super) {
    __extends(CompetencyProfileChartContainerComponent, _super);
    function CompetencyProfileChartContainerComponent() {
        return _super.call(this) || this;
    }
    CompetencyProfileChartContainerComponent.prototype.selectCompetency = function () {
        var _this = this;
        this.selectCompetencyDilog.show();
        this.selectCompetencyDilog.onSelectCompetency.subscribe(function (competency) {
            _this.competencyChart.drawChart(competency);
        });
    };
    CompetencyProfileChartContainerComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.ViewChild(competency_profile_chart_component_1.CompetencyProfileChartComponent),
        __metadata("design:type", competency_profile_chart_component_1.CompetencyProfileChartComponent)
    ], CompetencyProfileChartContainerComponent.prototype, "competencyChart", void 0);
    __decorate([
        core_1.ViewChild(select_competency_dialog_component_1.SelectCompetencyDialog),
        __metadata("design:type", select_competency_dialog_component_1.SelectCompetencyDialog)
    ], CompetencyProfileChartContainerComponent.prototype, "selectCompetencyDilog", void 0);
    CompetencyProfileChartContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'competency-profile-chart-container',
            templateUrl: 'competency-profile-chart-container.component.html',
        }),
        chart_decorator_1.Chart({
            title: 'Competency profile chart',
        }),
        __metadata("design:paramtypes", [])
    ], CompetencyProfileChartContainerComponent);
    return CompetencyProfileChartContainerComponent;
}(base_component_1.BaseComponent));
exports.CompetencyProfileChartContainerComponent = CompetencyProfileChartContainerComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9jaGFydC9jb21wZXRlbmN5LXByb2ZpbGUtY2hhcnQvY29tcGV0ZW5jeS1wcm9maWxlLWNoYXJ0LWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBS3BFLGlGQUErRTtBQVEvRSxzREFBMkM7QUFFM0MsMkZBQXVGO0FBQ3ZGLDZJQUFnSTtBQVVoSTtJQUE4RCw0REFBYTtJQUt2RTtlQUNJLGlCQUFPO0lBQ1gsQ0FBQztJQUVELG1FQUFnQixHQUFoQjtRQUFBLGlCQUtDO1FBSkcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsVUFBQyxVQUFxQjtZQUMxRSxLQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwyREFBUSxHQUFSO0lBQ0EsQ0FBQztJQWZ3QztRQUEzQyxnQkFBUyxDQUFDLG9FQUErQixDQUFDO2tDQUFtQixvRUFBK0I7cUZBQUM7SUFDeEQ7UUFBbEMsZ0JBQVMsQ0FBQywyREFBc0IsQ0FBQztrQ0FBd0IsMkRBQXNCOzJGQUFBO0lBSHZFLHdDQUF3QztRQVJwRCxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxvQ0FBb0M7WUFDakQsV0FBVyxFQUFFLG1EQUFtRDtTQUNoRSxDQUFDO1FBQ0QsdUJBQUssQ0FBQztZQUNILEtBQUssRUFBRSwwQkFBMEI7U0FDcEMsQ0FBQzs7T0FDVyx3Q0FBd0MsQ0FvQnBEO0lBQUQsK0NBQUM7Q0FwQkQsQUFvQkMsQ0FwQjZELDhCQUFhLEdBb0IxRTtBQXBCWSw0RkFBd0MiLCJmaWxlIjoiYXBwL2FuYWx5c2lzL2NoYXJ0L2NvbXBldGVuY3ktcHJvZmlsZS1jaGFydC9jb21wZXRlbmN5LXByb2ZpbGUtY2hhcnQtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBSZXBvcnRVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3JlcG9ydC51dGlscyc7XG5pbXBvcnQgeyBFeGFtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21wZXRlbmN5IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY29tcGV0ZW5jeS5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtR3JhZGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLWdyYWRlLm1vZGVsJztcbmltcG9ydCB7IFN1Ym1pc3Npb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdWJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IEFuc3dlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2Fuc3dlci5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IEVYUE9SVF9EQVRFVElNRV9GT1JNQVQsIFJFUE9SVF9DQVRFR09SWSwgR1JPVVBfQ0FURUdPUlksIENPVVJTRV9NT0RFLCBDT1VSU0VfTUVNQkVSX0VOUk9MTF9TVEFUVVMsIEVYUE9SVF9EQVRFX0ZPUk1BVCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgQ2hhcnQgfSBmcm9tICcuLi9jaGFydC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgU3RhdHNVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3N0YXRpc3RpY3MudXRpbHMnO1xuaW1wb3J0IHsgQ29tcGV0ZW5jeVByb2ZpbGVDaGFydENvbXBvbmVudCB9IGZyb20gJy4vY29tcGV0ZW5jeS1wcm9maWxlLWNoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWxlY3RDb21wZXRlbmN5RGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0LWNvbXBldGVuY3ktZGlhbG9nL3NlbGVjdC1jb21wZXRlbmN5LWRpYWxvZy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnY29tcGV0ZW5jeS1wcm9maWxlLWNoYXJ0LWNvbnRhaW5lcicsXG5cdHRlbXBsYXRlVXJsOiAnY29tcGV0ZW5jeS1wcm9maWxlLWNoYXJ0LWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXG59KVxuQENoYXJ0KHtcbiAgICB0aXRsZTogJ0NvbXBldGVuY3kgcHJvZmlsZSBjaGFydCcsXG59KVxuZXhwb3J0IGNsYXNzIENvbXBldGVuY3lQcm9maWxlQ2hhcnRDb250YWluZXJDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRAVmlld0NoaWxkKENvbXBldGVuY3lQcm9maWxlQ2hhcnRDb21wb25lbnQpIGNvbXBldGVuY3lDaGFydCA6IENvbXBldGVuY3lQcm9maWxlQ2hhcnRDb21wb25lbnQ7XG4gICAgQFZpZXdDaGlsZChTZWxlY3RDb21wZXRlbmN5RGlhbG9nKSBzZWxlY3RDb21wZXRlbmN5RGlsb2c6IFNlbGVjdENvbXBldGVuY3lEaWFsb2dcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHNlbGVjdENvbXBldGVuY3koKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0Q29tcGV0ZW5jeURpbG9nLnNob3coKTtcbiAgICAgICAgdGhpcy5zZWxlY3RDb21wZXRlbmN5RGlsb2cub25TZWxlY3RDb21wZXRlbmN5LnN1YnNjcmliZSgoY29tcGV0ZW5jeTpDb21wZXRlbmN5KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbXBldGVuY3lDaGFydC5kcmF3Q2hhcnQoY29tcGV0ZW5jeSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgIH1cblxuICAgXG59XG4iXX0=

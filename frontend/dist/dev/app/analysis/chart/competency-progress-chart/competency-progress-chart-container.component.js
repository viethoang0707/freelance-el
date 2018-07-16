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
var select_competency_dialog_component_1 = require("../../../shared/components/select-competency-dialog/select-competency-dialog.component");
var competency_progress_chart_component_1 = require("./competency-progress-chart.component");
var CompetencyProgressChartContainerComponent = (function (_super) {
    __extends(CompetencyProgressChartContainerComponent, _super);
    function CompetencyProgressChartContainerComponent() {
        var _this = _super.call(this) || this;
        _this.duration = 0;
        return _this;
    }
    CompetencyProgressChartContainerComponent.prototype.ngOnInit = function () {
    };
    CompetencyProgressChartContainerComponent.prototype.selectCompetency = function () {
        var _this = this;
        this.selectCompetencyDilog.show();
        this.selectCompetencyDilog.onSelectCompetency.subscribe(function (competency) {
            if (_this.duration)
                _this.competencyChart.drawChart(competency, _this.duration);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CompetencyProgressChartContainerComponent.prototype, "duration", void 0);
    __decorate([
        core_1.ViewChild(competency_progress_chart_component_1.CompetencyProgressChartComponent),
        __metadata("design:type", competency_progress_chart_component_1.CompetencyProgressChartComponent)
    ], CompetencyProgressChartContainerComponent.prototype, "competencyChart", void 0);
    __decorate([
        core_1.ViewChild(select_competency_dialog_component_1.SelectCompetencyDialog),
        __metadata("design:type", select_competency_dialog_component_1.SelectCompetencyDialog)
    ], CompetencyProgressChartContainerComponent.prototype, "selectCompetencyDilog", void 0);
    CompetencyProgressChartContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'competency-progress-chart-container',
            templateUrl: 'competency-progress-chart-container.component.html',
        }),
        chart_decorator_1.Chart({
            title: 'Competency progress chart',
        }),
        __metadata("design:paramtypes", [])
    ], CompetencyProgressChartContainerComponent);
    return CompetencyProgressChartContainerComponent;
}(base_component_1.BaseComponent));
exports.CompetencyProgressChartContainerComponent = CompetencyProgressChartContainerComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9jaGFydC9jb21wZXRlbmN5LXByb2dyZXNzLWNoYXJ0L2NvbXBldGVuY3ktcHJvZ3Jlc3MtY2hhcnQtY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFLcEUsaUZBQStFO0FBUS9FLHNEQUEyQztBQUUzQyw2SUFBZ0k7QUFDaEksNkZBQXlGO0FBV3pGO0lBQStELDZEQUFhO0lBTXhFO1FBQUEsWUFDSSxpQkFBTyxTQUVWO1FBREcsS0FBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7O0lBQ3RCLENBQUM7SUFFRCw0REFBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELG9FQUFnQixHQUFoQjtRQUFBLGlCQU1DO1FBTEcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsVUFBQyxVQUFxQjtZQUMxRSxJQUFJLEtBQUksQ0FBQyxRQUFRO2dCQUNiLEtBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBbEJRO1FBQVIsWUFBSyxFQUFFOzsrRUFBaUI7SUFDaUI7UUFBNUMsZ0JBQVMsQ0FBQyxzRUFBZ0MsQ0FBQztrQ0FBbUIsc0VBQWdDO3NGQUFDO0lBQzFEO1FBQWxDLGdCQUFTLENBQUMsMkRBQXNCLENBQUM7a0NBQXdCLDJEQUFzQjs0RkFBQTtJQUp2RSx5Q0FBeUM7UUFSckQsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUscUNBQXFDO1lBQ2xELFdBQVcsRUFBRSxvREFBb0Q7U0FDakUsQ0FBQztRQUNELHVCQUFLLENBQUM7WUFDSCxLQUFLLEVBQUUsMkJBQTJCO1NBQ3JDLENBQUM7O09BQ1cseUNBQXlDLENBdUJyRDtJQUFELGdEQUFDO0NBdkJELEFBdUJDLENBdkI4RCw4QkFBYSxHQXVCM0U7QUF2QlksOEZBQXlDIiwiZmlsZSI6ImFwcC9hbmFseXNpcy9jaGFydC9jb21wZXRlbmN5LXByb2dyZXNzLWNoYXJ0L2NvbXBldGVuY3ktcHJvZ3Jlc3MtY2hhcnQtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBSZXBvcnRVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3JlcG9ydC51dGlscyc7XG5pbXBvcnQgeyBFeGFtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtR3JhZGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLWdyYWRlLm1vZGVsJztcbmltcG9ydCB7IFN1Ym1pc3Npb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdWJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IEFuc3dlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2Fuc3dlci5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IEVYUE9SVF9EQVRFVElNRV9GT1JNQVQsIFJFUE9SVF9DQVRFR09SWSwgR1JPVVBfQ0FURUdPUlksIENPVVJTRV9NT0RFLCBDT1VSU0VfTUVNQkVSX0VOUk9MTF9TVEFUVVMsIEVYUE9SVF9EQVRFX0ZPUk1BVCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgQ2hhcnQgfSBmcm9tICcuLi9jaGFydC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgU3RhdHNVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3N0YXRpc3RpY3MudXRpbHMnO1xuaW1wb3J0IHsgU2VsZWN0Q29tcGV0ZW5jeURpYWxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC1jb21wZXRlbmN5LWRpYWxvZy9zZWxlY3QtY29tcGV0ZW5jeS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IENvbXBldGVuY3lQcm9ncmVzc0NoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wZXRlbmN5LXByb2dyZXNzLWNoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21wZXRlbmN5IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY29tcGV0ZW5jeS5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdjb21wZXRlbmN5LXByb2dyZXNzLWNoYXJ0LWNvbnRhaW5lcicsXG5cdHRlbXBsYXRlVXJsOiAnY29tcGV0ZW5jeS1wcm9ncmVzcy1jaGFydC1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnLFxufSlcbkBDaGFydCh7XG4gICAgdGl0bGU6ICdDb21wZXRlbmN5IHByb2dyZXNzIGNoYXJ0Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29tcGV0ZW5jeVByb2dyZXNzQ2hhcnRDb250YWluZXJDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIGR1cmF0aW9uOm51bWJlcjtcblx0QFZpZXdDaGlsZChDb21wZXRlbmN5UHJvZ3Jlc3NDaGFydENvbXBvbmVudCkgY29tcGV0ZW5jeUNoYXJ0IDogQ29tcGV0ZW5jeVByb2dyZXNzQ2hhcnRDb21wb25lbnQ7XG4gICAgQFZpZXdDaGlsZChTZWxlY3RDb21wZXRlbmN5RGlhbG9nKSBzZWxlY3RDb21wZXRlbmN5RGlsb2c6IFNlbGVjdENvbXBldGVuY3lEaWFsb2dcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gMDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbiAgICBzZWxlY3RDb21wZXRlbmN5KCkge1xuICAgICAgICB0aGlzLnNlbGVjdENvbXBldGVuY3lEaWxvZy5zaG93KCk7XG4gICAgICAgIHRoaXMuc2VsZWN0Q29tcGV0ZW5jeURpbG9nLm9uU2VsZWN0Q29tcGV0ZW5jeS5zdWJzY3JpYmUoKGNvbXBldGVuY3k6Q29tcGV0ZW5jeSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZHVyYXRpb24pXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wZXRlbmN5Q2hhcnQuZHJhd0NoYXJ0KGNvbXBldGVuY3ksIHRoaXMuZHVyYXRpb24pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgIFxufVxuIl19

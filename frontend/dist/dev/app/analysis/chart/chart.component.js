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
var _ = require("underscore");
var chart_decorator_1 = require("./chart.decorator");
var chart_container_directive_1 = require("./chart-container.directive");
var ChartComponent = (function (_super) {
    __extends(ChartComponent, _super);
    function ChartComponent(componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        return _this;
    }
    ChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.charts = _.map(chart_decorator_1.ChartRegister.Instance.entries(), function (chart) {
            return {
                label: _this.translateService.instant(chart["title"]),
                value: chart["component"]
            };
        });
        if (this.charts.length) {
            this.selectedChart = this.charts[0].value;
            this.selectChart();
        }
    };
    ChartComponent.prototype.renderChartComponent = function (component) {
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        var viewContainerRef = this.container.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
    };
    ChartComponent.prototype.selectChart = function () {
        if (this.selectedChart)
            this.renderChartComponent(this.selectedChart);
    };
    __decorate([
        core_1.ViewChild(chart_container_directive_1.ChartContainerDirective),
        __metadata("design:type", chart_container_directive_1.ChartContainerDirective)
    ], ChartComponent.prototype, "container", void 0);
    ChartComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'chart',
            templateUrl: 'chart.component.html',
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], ChartComponent);
    return ChartComponent;
}(base_component_1.BaseComponent));
exports.ChartComponent = ChartComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9jaGFydC9jaGFydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXVGO0FBRXZGLDhFQUE0RTtBQUM1RSw4QkFBZ0M7QUFFaEMscURBQWtEO0FBQ2xELHlFQUFzRTtBQU90RTtJQUFvQyxrQ0FBYTtJQVFoRCx3QkFBb0Isd0JBQWtEO1FBQXRFLFlBQ0MsaUJBQU8sU0FDUDtRQUZtQiw4QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCOztJQUV0RSxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUFBLGlCQVdDO1FBVkEsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLCtCQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQUMsS0FBSztZQUNsRCxPQUFPO2dCQUNILEtBQUssRUFBRSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEQsS0FBSyxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUM7YUFDNUIsQ0FBQTtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNwQixJQUFJLENBQUMsYUFBYSxHQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQzNDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtJQUNSLENBQUM7SUFFRCw2Q0FBb0IsR0FBcEIsVUFBcUIsU0FBUztRQUN2QixJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4RixJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7UUFDdkQsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekIsSUFBSSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELG9DQUFXLEdBQVg7UUFDSSxJQUFJLElBQUksQ0FBQyxhQUFhO1lBQ2xCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQTdCbUM7UUFBbkMsZ0JBQVMsQ0FBQyxtREFBdUIsQ0FBQztrQ0FBWSxtREFBdUI7cURBQUM7SUFOOUQsY0FBYztRQUwxQixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFdBQVcsRUFBRSxzQkFBc0I7U0FDbkMsQ0FBQzt5Q0FTNkMsK0JBQXdCO09BUjFELGNBQWMsQ0FxQzFCO0lBQUQscUJBQUM7Q0FyQ0QsQUFxQ0MsQ0FyQ21DLDhCQUFhLEdBcUNoRDtBQXJDWSx3Q0FBYyIsImZpbGUiOiJhcHAvYW5hbHlzaXMvY2hhcnQvY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQ2hhcnRSZWdpc3RlciB9IGZyb20gJy4vY2hhcnQuZGVjb3JhdG9yJztcbmltcG9ydCB7IENoYXJ0Q29udGFpbmVyRGlyZWN0aXZlIH0gZnJvbSAnLi9jaGFydC1jb250YWluZXIuZGlyZWN0aXZlJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnY2hhcnQnLFxuXHR0ZW1wbGF0ZVVybDogJ2NoYXJ0LmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQ2hhcnRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRwcml2YXRlIGNoYXJ0RGF0YTogYW55O1xuXHRwcml2YXRlIGNoYXJ0czogU2VsZWN0SXRlbVtdO1xuICAgIHByaXZhdGUgc2VsZWN0ZWRDaGFydDogYW55O1xuXG4gICAgQFZpZXdDaGlsZChDaGFydENvbnRhaW5lckRpcmVjdGl2ZSkgY29udGFpbmVyOiBDaGFydENvbnRhaW5lckRpcmVjdGl2ZTtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuY2hhcnRzID0gXy5tYXAoQ2hhcnRSZWdpc3Rlci5JbnN0YW5jZS5lbnRyaWVzKCksIChjaGFydCk9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudChjaGFydFtcInRpdGxlXCJdKSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogY2hhcnRbXCJjb21wb25lbnRcIl1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmNoYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFydCA9ICB0aGlzLmNoYXJ0c1swXS52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0Q2hhcnQoKTtcbiAgICAgICAgfVxuXHR9XG5cblx0cmVuZGVyQ2hhcnRDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcbiAgICAgICAgbGV0IHZpZXdDb250YWluZXJSZWYgPSB0aGlzLmNvbnRhaW5lci52aWV3Q29udGFpbmVyUmVmO1xuICAgICAgICB2aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG4gICAgICAgIGxldCBjb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICB9XG5cbiAgICBzZWxlY3RDaGFydCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDaGFydClcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQ2hhcnRDb21wb25lbnQodGhpcy5zZWxlY3RlZENoYXJ0KTtcbiAgICB9XG5cbn1cbiJdfQ==

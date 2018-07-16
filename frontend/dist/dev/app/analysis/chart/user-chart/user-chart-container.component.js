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
var user_chart_component_1 = require("./user-chart.component");
var UserChartContainerComponent = (function (_super) {
    __extends(UserChartContainerComponent, _super);
    function UserChartContainerComponent() {
        return _super.call(this) || this;
    }
    UserChartContainerComponent.prototype.ngOnInit = function () {
        this.userChart.drawChart();
    };
    __decorate([
        core_1.ViewChild(user_chart_component_1.UserChartComponent),
        __metadata("design:type", user_chart_component_1.UserChartComponent)
    ], UserChartContainerComponent.prototype, "userChart", void 0);
    UserChartContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-chart-container',
            templateUrl: 'user-chart-container.component.html',
        }),
        chart_decorator_1.Chart({
            title: 'User chart',
        }),
        __metadata("design:paramtypes", [])
    ], UserChartContainerComponent);
    return UserChartContainerComponent;
}(base_component_1.BaseComponent));
exports.UserChartContainerComponent = UserChartContainerComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9jaGFydC91c2VyLWNoYXJ0L3VzZXItY2hhcnQtY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFNcEUsaUZBQStFO0FBUS9FLHNEQUEyQztBQUUzQywrREFBNEQ7QUFVNUQ7SUFBaUQsK0NBQWE7SUFJMUQ7ZUFDSSxpQkFBTztJQUNYLENBQUM7SUFFRCw4Q0FBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBUjJCO1FBQTlCLGdCQUFTLENBQUMseUNBQWtCLENBQUM7a0NBQWEseUNBQWtCO2tFQUFDO0lBRmxELDJCQUEyQjtRQVJ2QyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxzQkFBc0I7WUFDbkMsV0FBVyxFQUFFLHFDQUFxQztTQUNsRCxDQUFDO1FBQ0QsdUJBQUssQ0FBQztZQUNILEtBQUssRUFBRSxZQUFZO1NBQ3RCLENBQUM7O09BQ1csMkJBQTJCLENBYXZDO0lBQUQsa0NBQUM7Q0FiRCxBQWFDLENBYmdELDhCQUFhLEdBYTdEO0FBYlksa0VBQTJCIiwiZmlsZSI6ImFwcC9hbmFseXNpcy9jaGFydC91c2VyLWNoYXJ0L3VzZXItY2hhcnQtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IFJlcG9ydFV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvcmVwb3J0LnV0aWxzJztcbmltcG9ydCB7IEV4YW0gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCB7IEV4YW1HcmFkZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tZ3JhZGUubW9kZWwnO1xuaW1wb3J0IHsgU3VibWlzc2lvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1Ym1pc3Npb24ubW9kZWwnO1xuaW1wb3J0IHsgQW5zd2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvYW5zd2VyLm1vZGVsJztcbmltcG9ydCB7IEV4YW1NZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgRVhQT1JUX0RBVEVUSU1FX0ZPUk1BVCwgUkVQT1JUX0NBVEVHT1JZLCBHUk9VUF9DQVRFR09SWSwgQ09VUlNFX01PREUsIENPVVJTRV9NRU1CRVJfRU5ST0xMX1NUQVRVUywgRVhQT1JUX0RBVEVfRk9STUFUIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBDaGFydCB9IGZyb20gJy4uL2NoYXJ0LmRlY29yYXRvcic7XG5pbXBvcnQgeyBTdGF0c1V0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvc3RhdGlzdGljcy51dGlscyc7XG5pbXBvcnQgeyBVc2VyQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuL3VzZXItY2hhcnQuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ3VzZXItY2hhcnQtY29udGFpbmVyJyxcblx0dGVtcGxhdGVVcmw6ICd1c2VyLWNoYXJ0LWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXG59KVxuQENoYXJ0KHtcbiAgICB0aXRsZTogJ1VzZXIgY2hhcnQnLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyQ2hhcnRDb250YWluZXJDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRAVmlld0NoaWxkKFVzZXJDaGFydENvbXBvbmVudCkgdXNlckNoYXJ0IDogVXNlckNoYXJ0Q29tcG9uZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgXHR0aGlzLnVzZXJDaGFydC5kcmF3Q2hhcnQoKTtcbiAgICB9XG5cbiAgIFxufVxuIl19

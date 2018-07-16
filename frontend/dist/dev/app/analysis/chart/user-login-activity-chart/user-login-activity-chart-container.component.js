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
var user_login_activity_chart_component_1 = require("./user-login-activity-chart.component");
var UserLoginActivityChartContainerComponent = (function (_super) {
    __extends(UserLoginActivityChartContainerComponent, _super);
    function UserLoginActivityChartContainerComponent() {
        return _super.call(this) || this;
    }
    UserLoginActivityChartContainerComponent.prototype.ngOnInit = function () {
        this.drawChart(7);
    };
    UserLoginActivityChartContainerComponent.prototype.drawChart = function (day) {
        this.userChart.drawChart(day);
    };
    __decorate([
        core_1.ViewChild(user_login_activity_chart_component_1.UserLoginActivityChartComponent),
        __metadata("design:type", user_login_activity_chart_component_1.UserLoginActivityChartComponent)
    ], UserLoginActivityChartContainerComponent.prototype, "userChart", void 0);
    UserLoginActivityChartContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-login-activity-chart-container',
            templateUrl: 'user-login-activity-chart-container.component.html',
        }),
        chart_decorator_1.Chart({
            title: 'User login activity chart',
        }),
        __metadata("design:paramtypes", [])
    ], UserLoginActivityChartContainerComponent);
    return UserLoginActivityChartContainerComponent;
}(base_component_1.BaseComponent));
exports.UserLoginActivityChartContainerComponent = UserLoginActivityChartContainerComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9jaGFydC91c2VyLWxvZ2luLWFjdGl2aXR5LWNoYXJ0L3VzZXItbG9naW4tYWN0aXZpdHktY2hhcnQtY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFNcEUsaUZBQStFO0FBUS9FLHNEQUEyQztBQUUzQyw2RkFBd0Y7QUFVeEY7SUFBOEQsNERBQWE7SUFJdkU7ZUFDSSxpQkFBTztJQUNYLENBQUM7SUFFRCwyREFBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUYsNERBQVMsR0FBVCxVQUFVLEdBQVU7UUFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQVp5QztRQUEzQyxnQkFBUyxDQUFDLHFFQUErQixDQUFDO2tDQUFhLHFFQUErQjsrRUFBQztJQUY1RSx3Q0FBd0M7UUFScEQsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUscUNBQXFDO1lBQ2xELFdBQVcsRUFBRSxvREFBb0Q7U0FDakUsQ0FBQztRQUNELHVCQUFLLENBQUM7WUFDSCxLQUFLLEVBQUUsMkJBQTJCO1NBQ3JDLENBQUM7O09BQ1csd0NBQXdDLENBZXBEO0lBQUQsK0NBQUM7Q0FmRCxBQWVDLENBZjZELDhCQUFhLEdBZTFFO0FBZlksNEZBQXdDIiwiZmlsZSI6ImFwcC9hbmFseXNpcy9jaGFydC91c2VyLWxvZ2luLWFjdGl2aXR5LWNoYXJ0L3VzZXItbG9naW4tYWN0aXZpdHktY2hhcnQtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IFJlcG9ydFV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvcmVwb3J0LnV0aWxzJztcbmltcG9ydCB7IEV4YW0gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCB7IEV4YW1HcmFkZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tZ3JhZGUubW9kZWwnO1xuaW1wb3J0IHsgU3VibWlzc2lvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1Ym1pc3Npb24ubW9kZWwnO1xuaW1wb3J0IHsgQW5zd2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvYW5zd2VyLm1vZGVsJztcbmltcG9ydCB7IEV4YW1NZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgRVhQT1JUX0RBVEVUSU1FX0ZPUk1BVCwgUkVQT1JUX0NBVEVHT1JZLCBHUk9VUF9DQVRFR09SWSwgQ09VUlNFX01PREUsIENPVVJTRV9NRU1CRVJfRU5ST0xMX1NUQVRVUywgRVhQT1JUX0RBVEVfRk9STUFUIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBDaGFydCB9IGZyb20gJy4uL2NoYXJ0LmRlY29yYXRvcic7XG5pbXBvcnQgeyBTdGF0c1V0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvc3RhdGlzdGljcy51dGlscyc7XG5pbXBvcnQgeyBVc2VyTG9naW5BY3Rpdml0eUNoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi91c2VyLWxvZ2luLWFjdGl2aXR5LWNoYXJ0LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICd1c2VyLWxvZ2luLWFjdGl2aXR5LWNoYXJ0LWNvbnRhaW5lcicsXG5cdHRlbXBsYXRlVXJsOiAndXNlci1sb2dpbi1hY3Rpdml0eS1jaGFydC1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnLFxufSlcbkBDaGFydCh7XG4gICAgdGl0bGU6ICdVc2VyIGxvZ2luIGFjdGl2aXR5IGNoYXJ0Jyxcbn0pXG5leHBvcnQgY2xhc3MgVXNlckxvZ2luQWN0aXZpdHlDaGFydENvbnRhaW5lckNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdEBWaWV3Q2hpbGQoVXNlckxvZ2luQWN0aXZpdHlDaGFydENvbXBvbmVudCkgdXNlckNoYXJ0IDogVXNlckxvZ2luQWN0aXZpdHlDaGFydENvbXBvbmVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgIFx0dGhpcy5kcmF3Q2hhcnQoNyk7XG4gICAgfVxuXG4gICBkcmF3Q2hhcnQoZGF5Om51bWJlcikge1xuICAgICAgIHRoaXMudXNlckNoYXJ0LmRyYXdDaGFydChkYXkpO1xuICAgfVxufVxuIl19

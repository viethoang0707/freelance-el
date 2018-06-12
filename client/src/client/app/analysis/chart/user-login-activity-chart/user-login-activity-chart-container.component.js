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
//# sourceMappingURL=user-login-activity-chart-container.component.js.map
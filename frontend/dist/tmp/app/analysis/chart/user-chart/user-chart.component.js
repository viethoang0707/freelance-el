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
var user_model_1 = require("../../../shared/models/elearning/user.model");
var base_model_1 = require("../../../shared/models/base.model");
var _ = require("underscore");
var statistics_utils_1 = require("../../../shared/helpers/statistics.utils");
var UserChartComponent = (function (_super) {
    __extends(UserChartComponent, _super);
    function UserChartComponent() {
        var _this = _super.call(this) || this;
        _this.statsUtils = new statistics_utils_1.StatsUtils();
        return _this;
    }
    UserChartComponent.prototype.drawChart = function () {
        var _this = this;
        base_model_1.BaseModel
            .bulk_count(this, user_model_1.User.__api__countAll(), user_model_1.User.__api__countAllAdmin())
            .map(function (jsonArr) {
            return _.flatten(jsonArr);
        })
            .subscribe(function (jsonArr) {
            var userCount = jsonArr[0];
            var adminCount = jsonArr[1];
            _this.chartData = {
                labels: ['Admin user', 'Normal user'],
                datasets: [
                    {
                        data: [adminCount, userCount - adminCount],
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                        ]
                    }
                ]
            };
        });
    };
    UserChartComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-chart',
            template: "<h3>{{'Users chart'|translate}}</h3>   <p-chart type=\"pie\" [data]=\"chartData\"></p-chart>",
        }),
        __metadata("design:paramtypes", [])
    ], UserChartComponent);
    return UserChartComponent;
}(base_component_1.BaseComponent));
exports.UserChartComponent = UserChartComponent;

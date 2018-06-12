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
var base_component_1 = require("../../../shared/components/base/base.component");
var statistics_utils_1 = require("../../../shared/helpers/statistics.utils");
var CourseActivityChartComponent = (function (_super) {
    __extends(CourseActivityChartComponent, _super);
    function CourseActivityChartComponent() {
        var _this = _super.call(this) || this;
        _this.cacheData = {};
        _this.statsUtils = new statistics_utils_1.StatsUtils();
        return _this;
    }
    CourseActivityChartComponent.prototype.prepareChartDate = function (duration) {
        var _this = this;
        if (this.cacheData[duration])
            return Rx_1.Observable.of(this.cacheData[duration]);
        var end = new Date();
        var start = new Date(end.getTime() - duration * 24 * 60 * 60 * 1000);
        start.setHours(0, 0, 0, 0);
        return this.statsUtils.courseStatisticByDate(this, start, end).do(function (slots) {
            _this.cacheData[duration] = slots;
        });
    };
    CourseActivityChartComponent.prototype.drawChart = function (duration) {
        var _this = this;
        this.prepareChartDate(duration).subscribe(function (slots) {
            var labels = [_this.translateService.instant('Today')];
            var data = [slots[slots.length - 1]];
            for (var i = 1; i < slots.length; i++) {
                labels.push(_this.translateService.instant("Day-" + i));
                data.push(slots[slots.length - 1 - i]);
            }
            _this.chartData = {
                labels: labels,
                datasets: [
                    {
                        label: _this.translateService.instant('Course unit attempt'),
                        data: data,
                        fill: false,
                        borderColor: '#FFC107'
                    }
                ]
            };
        });
    };
    CourseActivityChartComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-activity-chart',
            templateUrl: 'course-activity-chart.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], CourseActivityChartComponent);
    return CourseActivityChartComponent;
}(base_component_1.BaseComponent));
exports.CourseActivityChartComponent = CourseActivityChartComponent;
//# sourceMappingURL=course-activity-chart.component.js.map
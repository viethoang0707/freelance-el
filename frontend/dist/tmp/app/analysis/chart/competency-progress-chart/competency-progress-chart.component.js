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
var constants_1 = require("../../../shared/models/constants");
var statistics_utils_1 = require("../../../shared/helpers/statistics.utils");
var competency_level_model_1 = require("../../../shared/models/elearning/competency-level.model");
var CompetencyProgressChartComponent = (function (_super) {
    __extends(CompetencyProgressChartComponent, _super);
    function CompetencyProgressChartComponent() {
        var _this = _super.call(this) || this;
        _this.statsUtils = new statistics_utils_1.StatsUtils();
        _this.cacheData = {};
        return _this;
    }
    CompetencyProgressChartComponent.prototype.prepareChartData = function (competency, levels, duration) {
        var _this = this;
        if (this.cacheData[competency.id + '-' + duration])
            return Rx_1.Observable.of(this.cacheData[competency.id]);
        var end = new Date();
        var start = new Date(end.getTime() - duration * 24 * 60 * 60 * 1000);
        start.setHours(0, 0, 0, 0);
        return this.statsUtils.competencyStatisticByDate(this, competency, levels, start, end).do(function (slots) {
            _this.cacheData[competency.id + '-' + duration] = slots;
        });
    };
    CompetencyProgressChartComponent.prototype.drawChart = function (competency, duration) {
        var _this = this;
        competency_level_model_1.CompetencyLevel.listByCompetency(this, competency.id).subscribe(function (levels) {
            _this.prepareChartData(competency, levels, duration).subscribe(function (slots) {
                var labels = [_this.translateService.instant('Current')];
                var datasets = [];
                for (var j = 0; j < levels.length; j++) {
                    datasets.push({
                        label: levels[j].name,
                        backgroundColor: constants_1.COLOR_BAND[j],
                        borderColor: constants_1.COLOR_BAND[j],
                        data: []
                    });
                }
                for (var i = 0; i < slots.length; i++) {
                    labels.push(_this.translateService.instant("Month-" + i));
                    for (var j = 0; j < levels.length; j++) {
                        datasets[j]["data"].push(slots[j][levels[j]["id"]]);
                    }
                }
                _this.chartData = {
                    labels: labels,
                    datasets: datasets
                };
            });
        });
    };
    CompetencyProgressChartComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'competency-progress-chart',
            template: "<h3>{{'Competency progress chart'|translate}}</h3>   <p-chart type=\"bar\" [data]=\"chartData\"></p-chart>",
        }),
        __metadata("design:paramtypes", [])
    ], CompetencyProgressChartComponent);
    return CompetencyProgressChartComponent;
}(base_component_1.BaseComponent));
exports.CompetencyProgressChartComponent = CompetencyProgressChartComponent;

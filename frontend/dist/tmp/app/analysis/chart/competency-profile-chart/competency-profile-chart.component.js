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
var user_model_1 = require("../../../shared/models/elearning/user.model");
var base_component_1 = require("../../../shared/components/base/base.component");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var statistics_utils_1 = require("../../../shared/helpers/statistics.utils");
var competency_level_model_1 = require("../../../shared/models/elearning/competency-level.model");
var CompetencyProfileChartComponent = (function (_super) {
    __extends(CompetencyProfileChartComponent, _super);
    function CompetencyProfileChartComponent() {
        var _this = _super.call(this) || this;
        _this.statsUtils = new statistics_utils_1.StatsUtils();
        _this.cacheData = {};
        return _this;
    }
    CompetencyProfileChartComponent.prototype.prepareChartData = function (competency, levels) {
        var _this = this;
        if (this.cacheData[competency.id])
            return Rx_1.Observable.of(this.cacheData[competency.id]);
        return this.statsUtils.competencyStatistic(this, competency, levels).do(function (profile) {
            _this.cacheData[competency.id] = profile;
        });
    };
    CompetencyProfileChartComponent.prototype.drawChart = function (competency) {
        var _this = this;
        competency_level_model_1.CompetencyLevel.listByCompetency(this, competency.id).subscribe(function (levels) {
            user_model_1.User.countAll(_this).subscribe(function (totalUserCount) {
                _this.prepareChartData(competency, levels).subscribe(function (profile) {
                    var totalWithSkill = 0;
                    var labels = [];
                    var data = [];
                    _.each(profile, function (count, levelId) {
                        totalWithSkill += count;
                        var level = _.find(levels, function (obj) {
                            return obj.id == levelId;
                        });
                        labels.push(level.name);
                        data.push(count);
                    });
                    labels.push('Unknwon');
                    data.push(totalUserCount - totalWithSkill);
                    _this.chartData = {
                        labels: labels,
                        datasets: [
                            {
                                data: data,
                                backgroundColor: constants_1.COLOR_BAND.slice(levels.length + 1),
                                hoverBackgroundColor: constants_1.COLOR_BAND.slice(levels.length + 1)
                            }
                        ]
                    };
                });
            });
        });
    };
    CompetencyProfileChartComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'competency-profile-chart',
            template: "<h3>{{'Competency profile chart'|translate}}</h3>   <p-chart type=\"doughnut\" [data]=\"chartData\"></p-chart>",
        }),
        __metadata("design:paramtypes", [])
    ], CompetencyProfileChartComponent);
    return CompetencyProfileChartComponent;
}(base_component_1.BaseComponent));
exports.CompetencyProfileChartComponent = CompetencyProfileChartComponent;

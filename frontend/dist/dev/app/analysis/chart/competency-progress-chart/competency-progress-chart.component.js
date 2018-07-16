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
            templateUrl: 'competency-progress-chart.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], CompetencyProgressChartComponent);
    return CompetencyProgressChartComponent;
}(base_component_1.BaseComponent));
exports.CompetencyProgressChartComponent = CompetencyProgressChartComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9jaGFydC9jb21wZXRlbmN5LXByb2dyZXNzLWNoYXJ0L2NvbXBldGVuY3ktcHJvZ3Jlc3MtY2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFvRTtBQUVwRSw4QkFBOEM7QUFHOUMsaUZBQStFO0FBTy9FLDhEQUFvSztBQUVwSyw2RUFBc0U7QUFDdEUsa0dBQTBGO0FBUTFGO0lBQXNELG9EQUFhO0lBTS9EO1FBQUEsWUFDSSxpQkFBTyxTQUdWO1FBRkcsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDZCQUFVLEVBQUUsQ0FBQztRQUNuQyxLQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQzs7SUFDeEIsQ0FBQztJQUVELDJEQUFnQixHQUFoQixVQUFpQixVQUFzQixFQUFFLE1BQXlCLEVBQUUsUUFBZ0I7UUFBcEYsaUJBU0M7UUFSRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDO1lBQzlDLE9BQU8sZUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hELElBQUksR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNyRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQUEsS0FBSztZQUMzRixLQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxvREFBUyxHQUFULFVBQVUsVUFBc0IsRUFBRSxRQUFnQjtRQUFsRCxpQkEwQkM7UUF6Qkcsd0NBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDbEUsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztnQkFDL0QsSUFBSSxNQUFNLEdBQUcsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3BDLFFBQVEsQ0FBQyxJQUFJLENBQUM7d0JBQ1YsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO3dCQUNyQixlQUFlLEVBQUUsc0JBQVUsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLFdBQVcsRUFBRSxzQkFBVSxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsSUFBSSxFQUFFLEVBQUU7cUJBQ1gsQ0FBQyxDQUFDO2lCQUNOO2dCQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUNwQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUN2RDtpQkFDSjtnQkFFRCxLQUFJLENBQUMsU0FBUyxHQUFHO29CQUNiLE1BQU0sRUFBRSxNQUFNO29CQUNkLFFBQVEsRUFBRSxRQUFRO2lCQUNyQixDQUFBO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFqRFEsZ0NBQWdDO1FBTDVDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxXQUFXLEVBQUUsMENBQTBDO1NBQzFELENBQUM7O09BQ1csZ0NBQWdDLENBbUQ1QztJQUFELHVDQUFDO0NBbkRELEFBbURDLENBbkRxRCw4QkFBYSxHQW1EbEU7QUFuRFksNEVBQWdDIiwiZmlsZSI6ImFwcC9hbmFseXNpcy9jaGFydC9jb21wZXRlbmN5LXByb2dyZXNzLWNoYXJ0L2NvbXBldGVuY3ktcHJvZ3Jlc3MtY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IFJlcG9ydFV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvcmVwb3J0LnV0aWxzJztcbmltcG9ydCB7IEV4YW0gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCB7IEV4YW1HcmFkZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tZ3JhZGUubW9kZWwnO1xuaW1wb3J0IHsgU3VibWlzc2lvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1Ym1pc3Npb24ubW9kZWwnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcbmltcG9ydCB7IEV4YW1NZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgRVhQT1JUX0RBVEVUSU1FX0ZPUk1BVCwgUkVQT1JUX0NBVEVHT1JZLCBDT0xPUl9CQU5ELCBDT1VSU0VfTU9ERSwgQ09VUlNFX01FTUJFUl9FTlJPTExfU1RBVFVTLCBFWFBPUlRfREFURV9GT1JNQVQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IENoYXJ0IH0gZnJvbSAnLi4vY2hhcnQuZGVjb3JhdG9yJztcbmltcG9ydCB7IFN0YXRzVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy9zdGF0aXN0aWNzLnV0aWxzJztcbmltcG9ydCB7IENvbXBldGVuY3lMZXZlbCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvbXBldGVuY3ktbGV2ZWwubW9kZWwnO1xuaW1wb3J0IHsgQ29tcGV0ZW5jeSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvbXBldGVuY3kubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnY29tcGV0ZW5jeS1wcm9ncmVzcy1jaGFydCcsXG4gICAgdGVtcGxhdGVVcmw6ICdjb21wZXRlbmN5LXByb2dyZXNzLWNoYXJ0LmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQ29tcGV0ZW5jeVByb2dyZXNzQ2hhcnRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuICAgIHByaXZhdGUgY2hhcnREYXRhOiBhbnk7XG4gICAgcHJpdmF0ZSBzdGF0c1V0aWxzOiBTdGF0c1V0aWxzO1xuICAgIHByaXZhdGUgY2FjaGVEYXRhOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zdGF0c1V0aWxzID0gbmV3IFN0YXRzVXRpbHMoKTtcbiAgICAgICAgdGhpcy5jYWNoZURhdGEgPSB7fTtcbiAgICB9XG5cbiAgICBwcmVwYXJlQ2hhcnREYXRhKGNvbXBldGVuY3k6IENvbXBldGVuY3ksIGxldmVsczogQ29tcGV0ZW5jeUxldmVsW10sIGR1cmF0aW9uOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBpZiAodGhpcy5jYWNoZURhdGFbY29tcGV0ZW5jeS5pZCArICctJyArIGR1cmF0aW9uXSlcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKHRoaXMuY2FjaGVEYXRhW2NvbXBldGVuY3kuaWRdKTtcbiAgICAgICAgdmFyIGVuZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHZhciBzdGFydCA9IG5ldyBEYXRlKGVuZC5nZXRUaW1lKCkgLSBkdXJhdGlvbiAqIDI0ICogNjAgKiA2MCAqIDEwMDApO1xuICAgICAgICBzdGFydC5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdHNVdGlscy5jb21wZXRlbmN5U3RhdGlzdGljQnlEYXRlKHRoaXMsIGNvbXBldGVuY3ksIGxldmVscywgc3RhcnQsIGVuZCkuZG8oc2xvdHMgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYWNoZURhdGFbY29tcGV0ZW5jeS5pZCArICctJyArIGR1cmF0aW9uXSA9IHNsb3RzO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkcmF3Q2hhcnQoY29tcGV0ZW5jeTogQ29tcGV0ZW5jeSwgZHVyYXRpb246IG51bWJlcikge1xuICAgICAgICBDb21wZXRlbmN5TGV2ZWwubGlzdEJ5Q29tcGV0ZW5jeSh0aGlzLCBjb21wZXRlbmN5LmlkKS5zdWJzY3JpYmUobGV2ZWxzID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZUNoYXJ0RGF0YShjb21wZXRlbmN5LCBsZXZlbHMsIGR1cmF0aW9uKS5zdWJzY3JpYmUoc2xvdHMgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBsYWJlbHMgPSBbdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ0N1cnJlbnQnKV07XG4gICAgICAgICAgICAgICAgdmFyIGRhdGFzZXRzID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBsZXZlbHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogbGV2ZWxzW2pdLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IENPTE9SX0JBTkRbal0sXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogQ09MT1JfQkFORFtqXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFtdXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVscy5wdXNoKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KFwiTW9udGgtXCIgKyBpKSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbGV2ZWxzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhc2V0c1tqXVtcImRhdGFcIl0ucHVzaChzbG90c1tqXVtsZXZlbHNbal1bXCJpZFwiXV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFydERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsczogbGFiZWxzLFxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0czogZGF0YXNldHNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=

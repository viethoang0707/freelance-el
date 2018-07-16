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
            templateUrl: 'competency-profile-chart.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], CompetencyProfileChartComponent);
    return CompetencyProfileChartComponent;
}(base_component_1.BaseComponent));
exports.CompetencyProfileChartComponent = CompetencyProfileChartComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9jaGFydC9jb21wZXRlbmN5LXByb2ZpbGUtY2hhcnQvY29tcGV0ZW5jeS1wcm9maWxlLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFFcEUsOEJBQThDO0FBRTlDLDBFQUFtRTtBQUNuRSxpRkFBK0U7QUFNL0UsOEJBQWdDO0FBQ2hDLDhEQUFvSztBQUVwSyw2RUFBc0U7QUFDdEUsa0dBQTBGO0FBTzFGO0lBQXFELG1EQUFhO0lBTTlEO1FBQUEsWUFDSSxpQkFBTyxTQUdWO1FBRkcsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDZCQUFVLEVBQUUsQ0FBQztRQUNuQyxLQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQzs7SUFDeEIsQ0FBQztJQUVELDBEQUFnQixHQUFoQixVQUFpQixVQUFzQixFQUFFLE1BQXlCO1FBQWxFLGlCQU1DO1FBTEcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDN0IsT0FBTyxlQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQUEsT0FBTztZQUMzRSxLQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsbURBQVMsR0FBVCxVQUFVLFVBQXNCO1FBQWhDLGlCQTZCQztRQTVCRyx3Q0FBZSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUNsRSxpQkFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxjQUFjO2dCQUN4QyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87b0JBQ3ZELElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQztvQkFDdkIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO29CQUNoQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7b0JBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBQyxLQUFhLEVBQUUsT0FBTzt3QkFDbkMsY0FBYyxJQUFJLEtBQUssQ0FBQzt3QkFDeEIsSUFBSSxLQUFLLEdBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBb0I7NEJBQzdELE9BQU8sR0FBRyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUM7d0JBQzdCLENBQUMsQ0FBQyxDQUFDO3dCQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNyQixDQUFDLENBQUMsQ0FBQztvQkFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUMsQ0FBQztvQkFDM0MsS0FBSSxDQUFDLFNBQVMsR0FBRzt3QkFDYixNQUFNLEVBQUUsTUFBTTt3QkFDZCxRQUFRLEVBQUU7NEJBQ047Z0NBQ0ksSUFBSSxFQUFFLElBQUk7Z0NBQ1YsZUFBZSxFQUFFLHNCQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dDQUNwRCxvQkFBb0IsRUFBRSxzQkFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs2QkFDNUQ7eUJBQUM7cUJBQ1QsQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBakRRLCtCQUErQjtRQUwzQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSwwQkFBMEI7WUFDcEMsV0FBVyxFQUFFLHlDQUF5QztTQUN6RCxDQUFDOztPQUNXLCtCQUErQixDQW1EM0M7SUFBRCxzQ0FBQztDQW5ERCxBQW1EQyxDQW5Eb0QsOEJBQWEsR0FtRGpFO0FBbkRZLDBFQUErQiIsImZpbGUiOiJhcHAvYW5hbHlzaXMvY2hhcnQvY29tcGV0ZW5jeS1wcm9maWxlLWNoYXJ0L2NvbXBldGVuY3ktcHJvZmlsZS1jaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgUmVwb3J0VXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy9yZXBvcnQudXRpbHMnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tcGV0ZW5jeSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvbXBldGVuY3kubW9kZWwnO1xuaW1wb3J0IHsgRXhhbUdyYWRlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1ncmFkZS5tb2RlbCc7XG5pbXBvcnQgeyBTdWJtaXNzaW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VibWlzc2lvbi5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgRXhhbU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tbWVtYmVyLm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBFWFBPUlRfREFURVRJTUVfRk9STUFULCBSRVBPUlRfQ0FURUdPUlksIENPTE9SX0JBTkQsIENPVVJTRV9NT0RFLCBDT1VSU0VfTUVNQkVSX0VOUk9MTF9TVEFUVVMsIEVYUE9SVF9EQVRFX0ZPUk1BVCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgQ2hhcnQgfSBmcm9tICcuLi9jaGFydC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgU3RhdHNVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3N0YXRpc3RpY3MudXRpbHMnO1xuaW1wb3J0IHsgQ29tcGV0ZW5jeUxldmVsIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY29tcGV0ZW5jeS1sZXZlbC5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdjb21wZXRlbmN5LXByb2ZpbGUtY2hhcnQnLFxuICAgIHRlbXBsYXRlVXJsOiAnY29tcGV0ZW5jeS1wcm9maWxlLWNoYXJ0LmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQ29tcGV0ZW5jeVByb2ZpbGVDaGFydENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG4gICAgcHJpdmF0ZSBjaGFydERhdGE6IGFueTtcbiAgICBwcml2YXRlIHN0YXRzVXRpbHM6IFN0YXRzVXRpbHM7XG4gICAgcHJpdmF0ZSBjYWNoZURhdGE6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnN0YXRzVXRpbHMgPSBuZXcgU3RhdHNVdGlscygpO1xuICAgICAgICB0aGlzLmNhY2hlRGF0YSA9IHt9O1xuICAgIH1cblxuICAgIHByZXBhcmVDaGFydERhdGEoY29tcGV0ZW5jeTogQ29tcGV0ZW5jeSwgbGV2ZWxzOiBDb21wZXRlbmN5TGV2ZWxbXSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmICh0aGlzLmNhY2hlRGF0YVtjb21wZXRlbmN5LmlkXSlcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKHRoaXMuY2FjaGVEYXRhW2NvbXBldGVuY3kuaWRdKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdHNVdGlscy5jb21wZXRlbmN5U3RhdGlzdGljKHRoaXMsIGNvbXBldGVuY3ksIGxldmVscykuZG8ocHJvZmlsZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhY2hlRGF0YVtjb21wZXRlbmN5LmlkXSA9IHByb2ZpbGU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRyYXdDaGFydChjb21wZXRlbmN5OiBDb21wZXRlbmN5KSB7XG4gICAgICAgIENvbXBldGVuY3lMZXZlbC5saXN0QnlDb21wZXRlbmN5KHRoaXMsIGNvbXBldGVuY3kuaWQpLnN1YnNjcmliZShsZXZlbHMgPT4ge1xuICAgICAgICAgICAgVXNlci5jb3VudEFsbCh0aGlzKS5zdWJzY3JpYmUodG90YWxVc2VyQ291bnQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZUNoYXJ0RGF0YShjb21wZXRlbmN5LCBsZXZlbHMpLnN1YnNjcmliZShwcm9maWxlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdGFsV2l0aFNraWxsID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhYmVscyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBfLmVhY2gocHJvZmlsZSwgKGNvdW50OiBudW1iZXIsIGxldmVsSWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsV2l0aFNraWxsICs9IGNvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxldmVsOiBDb21wZXRlbmN5TGV2ZWwgPSBfLmZpbmQobGV2ZWxzLCAob2JqOiBDb21wZXRlbmN5TGV2ZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqLmlkID09IGxldmVsSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVscy5wdXNoKGxldmVsLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoKGNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVscy5wdXNoKCdVbmtud29uJyk7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaCh0b3RhbFVzZXJDb3VudCAtIHRvdGFsV2l0aFNraWxsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFydERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbHM6IGxhYmVscyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFzZXRzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IENPTE9SX0JBTkQuc2xpY2UobGV2ZWxzLmxlbmd0aCArIDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3ZlckJhY2tncm91bmRDb2xvcjogQ09MT1JfQkFORC5zbGljZShsZXZlbHMubGVuZ3RoICsgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9jaGFydC9jb3Vyc2UtYWN0aXZpdHktY2hhcnQvY291cnNlLWFjdGl2aXR5LWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFFcEUsOEJBQThDO0FBSTlDLGlGQUErRTtBQVMvRSw2RUFBc0U7QUFPdEU7SUFBa0QsZ0RBQWE7SUFNM0Q7UUFBQSxZQUNJLGlCQUFPLFNBRVY7UUFMTyxlQUFTLEdBQUcsRUFBRSxDQUFDO1FBSW5CLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSw2QkFBVSxFQUFFLENBQUM7O0lBQ3ZDLENBQUM7SUFFRCx1REFBZ0IsR0FBaEIsVUFBaUIsUUFBZTtRQUFoQyxpQkFTQztRQVJHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDeEIsT0FBTyxlQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNuRCxJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxRQUFRLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDckUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBQSxLQUFLO1lBQ25FLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGdEQUFTLEdBQVQsVUFBVSxRQUFlO1FBQXpCLGlCQW9CQztRQW5CRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUMzQyxJQUFJLE1BQU0sR0FBRyxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsS0FBSyxJQUFJLENBQUMsR0FBRSxDQUFDLEVBQUUsQ0FBQyxHQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0QztZQUNELEtBQUksQ0FBQyxTQUFTLEdBQUc7Z0JBQ2IsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsUUFBUSxFQUFFO29CQUNOO3dCQUNJLEtBQUssRUFBRSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDO3dCQUMzRCxJQUFJLEVBQUUsSUFBSTt3QkFDVixJQUFJLEVBQUUsS0FBSzt3QkFDWCxXQUFXLEVBQUUsU0FBUztxQkFDekI7aUJBQ0o7YUFDSixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBMUNRLDRCQUE0QjtRQUx4QyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsV0FBVyxFQUFFLHNDQUFzQztTQUN0RCxDQUFDOztPQUNXLDRCQUE0QixDQTRDeEM7SUFBRCxtQ0FBQztDQTVDRCxBQTRDQyxDQTVDaUQsOEJBQWEsR0E0QzlEO0FBNUNZLG9FQUE0QiIsImZpbGUiOiJhcHAvYW5hbHlzaXMvY2hhcnQvY291cnNlLWFjdGl2aXR5LWNoYXJ0L2NvdXJzZS1hY3Rpdml0eS1jaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBSZXBvcnRVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3JlcG9ydC51dGlscyc7XG5pbXBvcnQgeyBFeGFtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtR3JhZGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLWdyYWRlLm1vZGVsJztcbmltcG9ydCB7IFN1Ym1pc3Npb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdWJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IEFuc3dlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2Fuc3dlci5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IEVYUE9SVF9EQVRFVElNRV9GT1JNQVQsIFJFUE9SVF9DQVRFR09SWSwgR1JPVVBfQ0FURUdPUlksIENPVVJTRV9NT0RFLCBDT1VSU0VfTUVNQkVSX0VOUk9MTF9TVEFUVVMsIEVYUE9SVF9EQVRFX0ZPUk1BVCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgQ2hhcnQgfSBmcm9tICcuLi9jaGFydC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgU3RhdHNVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3N0YXRpc3RpY3MudXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnY291cnNlLWFjdGl2aXR5LWNoYXJ0JyxcbiAgICB0ZW1wbGF0ZVVybDogJ2NvdXJzZS1hY3Rpdml0eS1jaGFydC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIENvdXJzZUFjdGl2aXR5Q2hhcnRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50ICB7XG5cbiAgICBwcml2YXRlIGNoYXJ0RGF0YTogYW55O1xuICAgIHByaXZhdGUgc3RhdHNVdGlsczogU3RhdHNVdGlscztcbiAgICBwcml2YXRlIGNhY2hlRGF0YSA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhdHNVdGlscyA9IG5ldyBTdGF0c1V0aWxzKCk7XG4gICAgfVxuXG4gICAgcHJlcGFyZUNoYXJ0RGF0ZShkdXJhdGlvbjpudW1iZXIpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmICh0aGlzLmNhY2hlRGF0YVtkdXJhdGlvbl0pXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZih0aGlzLmNhY2hlRGF0YVtkdXJhdGlvbl0pO1xuICAgICAgICB2YXIgZW5kID0gbmV3IERhdGUoKTtcbiAgICAgICAgdmFyIHN0YXJ0ID0gbmV3IERhdGUoZW5kLmdldFRpbWUoKSAtIGR1cmF0aW9uICogMjQgKiA2MCAqIDYwICogMTAwMCk7XG4gICAgICAgIHN0YXJ0LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0c1V0aWxzLmNvdXJzZVN0YXRpc3RpY0J5RGF0ZSh0aGlzLCBzdGFydCwgZW5kKS5kbyhzbG90cz0+IHtcbiAgICAgICAgICAgIHRoaXMuY2FjaGVEYXRhW2R1cmF0aW9uXSA9IHNsb3RzO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkcmF3Q2hhcnQoZHVyYXRpb246bnVtYmVyKSB7XG4gICAgICAgIHRoaXMucHJlcGFyZUNoYXJ0RGF0ZShkdXJhdGlvbikuc3Vic2NyaWJlKHNsb3RzID0+IHtcbiAgICAgICAgICAgIHZhciBsYWJlbHMgPSBbdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ1RvZGF5JyldO1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBbc2xvdHNbc2xvdHMubGVuZ3RoLTFdXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPTE7IGk8IHNsb3RzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICBsYWJlbHMucHVzaCh0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudChcIkRheS1cIitpKSk7XG4gICAgICAgICAgICAgICAgZGF0YS5wdXNoKHNsb3RzW3Nsb3RzLmxlbmd0aC0xLWldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2hhcnREYXRhID0ge1xuICAgICAgICAgICAgICAgIGxhYmVsczogbGFiZWxzLFxuICAgICAgICAgICAgICAgIGRhdGFzZXRzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnQ291cnNlIHVuaXQgYXR0ZW1wdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjRkZDMTA3J1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=

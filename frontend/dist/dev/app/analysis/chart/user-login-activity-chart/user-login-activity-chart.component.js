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
var UserLoginActivityChartComponent = (function (_super) {
    __extends(UserLoginActivityChartComponent, _super);
    function UserLoginActivityChartComponent() {
        var _this = _super.call(this) || this;
        _this.statsUtils = new statistics_utils_1.StatsUtils();
        _this.cacheData = {};
        return _this;
    }
    UserLoginActivityChartComponent.prototype.prepareChartDate = function (duration) {
        var _this = this;
        if (this.cacheData[duration])
            return Rx_1.Observable.of(this.cacheData[duration]);
        var end = new Date();
        var start = new Date(end.getTime() - duration * 24 * 60 * 60 * 1000);
        start.setHours(0, 0, 0, 0);
        return this.statsUtils.userLoginStatisticByDate(this, start, end).do(function (slots) {
            _this.cacheData[duration] = slots;
        });
    };
    UserLoginActivityChartComponent.prototype.drawChart = function (duration) {
        var _this = this;
        this.prepareChartDate(duration).subscribe(function (slots) {
            console.log(slots);
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
                        label: _this.translateService.instant('User login attempt'),
                        data: data,
                        fill: false,
                        borderColor: '#FFC107'
                    }
                ]
            };
        });
    };
    UserLoginActivityChartComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-login-activity-chart',
            templateUrl: 'user-login-activity-chart.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], UserLoginActivityChartComponent);
    return UserLoginActivityChartComponent;
}(base_component_1.BaseComponent));
exports.UserLoginActivityChartComponent = UserLoginActivityChartComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9jaGFydC91c2VyLWxvZ2luLWFjdGl2aXR5LWNoYXJ0L3VzZXItbG9naW4tYWN0aXZpdHktY2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFvRTtBQUVwRSw4QkFBOEM7QUFJOUMsaUZBQStFO0FBUy9FLDZFQUFzRTtBQU90RTtJQUFxRCxtREFBYTtJQU05RDtRQUFBLFlBQ0ksaUJBQU8sU0FHVjtRQUZHLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSw2QkFBVSxFQUFFLENBQUM7UUFDbkMsS0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7O0lBQ3hCLENBQUM7SUFFRCwwREFBZ0IsR0FBaEIsVUFBaUIsUUFBZ0I7UUFBakMsaUJBU0M7UUFSRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3hCLE9BQU8sZUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDbkQsSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3JFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQUEsS0FBSztZQUN0RSxLQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxtREFBUyxHQUFULFVBQVUsUUFBZ0I7UUFBMUIsaUJBdUJDO1FBdEJHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDdEQsSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDMUM7WUFDRCxLQUFJLENBQUMsU0FBUyxHQUFHO2dCQUNiLE1BQU0sRUFBRSxNQUFNO2dCQUNkLFFBQVEsRUFBRTtvQkFDTjt3QkFDSSxLQUFLLEVBQUUsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQzt3QkFDMUQsSUFBSSxFQUFFLElBQUk7d0JBQ1YsSUFBSSxFQUFFLEtBQUs7d0JBQ1gsV0FBVyxFQUFFLFNBQVM7cUJBQ3pCO2lCQUNKO2FBQ0osQ0FBQztRQUVOLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQTlDUSwrQkFBK0I7UUFMM0MsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsMkJBQTJCO1lBQ3JDLFdBQVcsRUFBRSwwQ0FBMEM7U0FDMUQsQ0FBQzs7T0FDVywrQkFBK0IsQ0FnRDNDO0lBQUQsc0NBQUM7Q0FoREQsQUFnREMsQ0FoRG9ELDhCQUFhLEdBZ0RqRTtBQWhEWSwwRUFBK0IiLCJmaWxlIjoiYXBwL2FuYWx5c2lzL2NoYXJ0L3VzZXItbG9naW4tYWN0aXZpdHktY2hhcnQvdXNlci1sb2dpbi1hY3Rpdml0eS1jaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBSZXBvcnRVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3JlcG9ydC51dGlscyc7XG5pbXBvcnQgeyBFeGFtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtR3JhZGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLWdyYWRlLm1vZGVsJztcbmltcG9ydCB7IFN1Ym1pc3Npb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdWJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IEFuc3dlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2Fuc3dlci5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IEVYUE9SVF9EQVRFVElNRV9GT1JNQVQsIFJFUE9SVF9DQVRFR09SWSwgR1JPVVBfQ0FURUdPUlksIENPVVJTRV9NT0RFLCBDT1VSU0VfTUVNQkVSX0VOUk9MTF9TVEFUVVMsIEVYUE9SVF9EQVRFX0ZPUk1BVCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgQ2hhcnQgfSBmcm9tICcuLi9jaGFydC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgU3RhdHNVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3N0YXRpc3RpY3MudXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAndXNlci1sb2dpbi1hY3Rpdml0eS1jaGFydCcsXG4gICAgdGVtcGxhdGVVcmw6ICd1c2VyLWxvZ2luLWFjdGl2aXR5LWNoYXJ0LmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgVXNlckxvZ2luQWN0aXZpdHlDaGFydENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG4gICAgcHJpdmF0ZSBjaGFydERhdGE6IGFueTtcbiAgICBwcml2YXRlIHN0YXRzVXRpbHM6IFN0YXRzVXRpbHM7XG4gICAgcHJpdmF0ZSBjYWNoZURhdGE6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnN0YXRzVXRpbHMgPSBuZXcgU3RhdHNVdGlscygpO1xuICAgICAgICB0aGlzLmNhY2hlRGF0YSA9IHt9O1xuICAgIH1cblxuICAgIHByZXBhcmVDaGFydERhdGUoZHVyYXRpb246IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmICh0aGlzLmNhY2hlRGF0YVtkdXJhdGlvbl0pXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZih0aGlzLmNhY2hlRGF0YVtkdXJhdGlvbl0pO1xuICAgICAgICB2YXIgZW5kID0gbmV3IERhdGUoKTtcbiAgICAgICAgdmFyIHN0YXJ0ID0gbmV3IERhdGUoZW5kLmdldFRpbWUoKSAtIGR1cmF0aW9uICogMjQgKiA2MCAqIDYwICogMTAwMCk7XG4gICAgICAgIHN0YXJ0LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0c1V0aWxzLnVzZXJMb2dpblN0YXRpc3RpY0J5RGF0ZSh0aGlzLCBzdGFydCwgZW5kKS5kbyhzbG90cyA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhY2hlRGF0YVtkdXJhdGlvbl0gPSBzbG90cztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZHJhd0NoYXJ0KGR1cmF0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5wcmVwYXJlQ2hhcnREYXRlKGR1cmF0aW9uKS5zdWJzY3JpYmUoc2xvdHMgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coc2xvdHMpO1xuICAgICAgICAgICAgdmFyIGxhYmVscyA9IFt0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnVG9kYXknKV07XG4gICAgICAgICAgICB2YXIgZGF0YSA9IFtzbG90c1tzbG90cy5sZW5ndGggLSAxXV07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNsb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGFiZWxzLnB1c2godGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoXCJEYXktXCIgKyBpKSk7XG4gICAgICAgICAgICAgICAgZGF0YS5wdXNoKHNsb3RzW3Nsb3RzLmxlbmd0aCAtIDEgLSBpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNoYXJ0RGF0YSA9IHtcbiAgICAgICAgICAgICAgICBsYWJlbHM6IGxhYmVscyxcbiAgICAgICAgICAgICAgICBkYXRhc2V0czogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ1VzZXIgbG9naW4gYXR0ZW1wdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjRkZDMTA3J1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxufVxuIl19

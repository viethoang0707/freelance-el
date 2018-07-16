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
var statistics_utils_1 = require("../../../shared/helpers/statistics.utils");
var CourseMemberActivityChartComponent = (function (_super) {
    __extends(CourseMemberActivityChartComponent, _super);
    function CourseMemberActivityChartComponent() {
        var _this = _super.call(this) || this;
        _this.cacheData = {};
        _this.statsUtils = new statistics_utils_1.StatsUtils();
        return _this;
    }
    CourseMemberActivityChartComponent.prototype.drawChart = function (member, duration) {
        var _this = this;
        var end = new Date();
        var start = new Date(end.getTime() - duration * 24 * 60 * 60 * 1000);
        start.setHours(0, 0, 0, 0);
        this.statsUtils.courseMemberStatisticByDate(this, member.id, member.course_id, start, end).subscribe(function (slots) {
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
    CourseMemberActivityChartComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-member-activity-chart',
            templateUrl: 'course-member-activity-chart.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], CourseMemberActivityChartComponent);
    return CourseMemberActivityChartComponent;
}(base_component_1.BaseComponent));
exports.CourseMemberActivityChartComponent = CourseMemberActivityChartComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9jaGFydC9jb3Vyc2UtbWVtYmVyLWFjdGl2aXR5LWNoYXJ0L2NvdXJzZS1tZW1iZXItYWN0aXZpdHktY2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFvRTtBQU1wRSxpRkFBK0U7QUFTL0UsNkVBQXNFO0FBT3RFO0lBQXdELHNEQUFhO0lBTWpFO1FBQUEsWUFDSSxpQkFBTyxTQUVWO1FBTE8sZUFBUyxHQUFHLEVBQUUsQ0FBQztRQUluQixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksNkJBQVUsRUFBRSxDQUFDOztJQUN2QyxDQUFDO0lBRUQsc0RBQVMsR0FBVCxVQUFVLE1BQW9CLEVBQUMsUUFBZTtRQUE5QyxpQkF1QkM7UUF0QkcsSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3JFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQ3RHLElBQUksTUFBTSxHQUFHLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3RELElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFFLENBQUMsRUFBRSxDQUFDLEdBQUUsS0FBSyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBRTtnQkFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO1lBQ0QsS0FBSSxDQUFDLFNBQVMsR0FBRztnQkFDYixNQUFNLEVBQUUsTUFBTTtnQkFDZCxRQUFRLEVBQUU7b0JBQ047d0JBQ0ksS0FBSyxFQUFFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUM7d0JBQzNELElBQUksRUFBRSxJQUFJO3dCQUNWLElBQUksRUFBRSxLQUFLO3dCQUNYLFdBQVcsRUFBRSxTQUFTO3FCQUN6QjtpQkFDSjthQUNKLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFsQ1Esa0NBQWtDO1FBTDlDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLDhCQUE4QjtZQUN4QyxXQUFXLEVBQUUsNkNBQTZDO1NBQzdELENBQUM7O09BQ1csa0NBQWtDLENBb0M5QztJQUFELHlDQUFDO0NBcENELEFBb0NDLENBcEN1RCw4QkFBYSxHQW9DcEU7QUFwQ1ksZ0ZBQWtDIiwiZmlsZSI6ImFwcC9hbmFseXNpcy9jaGFydC9jb3Vyc2UtbWVtYmVyLWFjdGl2aXR5LWNoYXJ0L2NvdXJzZS1tZW1iZXItYWN0aXZpdHktY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVwb3J0VXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy9yZXBvcnQudXRpbHMnO1xuaW1wb3J0IHsgRXhhbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0ubW9kZWwnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgeyBTdWJtaXNzaW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VibWlzc2lvbi5tb2RlbCc7XG5pbXBvcnQgeyBBbnN3ZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9hbnN3ZXIubW9kZWwnO1xuaW1wb3J0IHsgRXhhbU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tbWVtYmVyLm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBFWFBPUlRfREFURVRJTUVfRk9STUFULCBSRVBPUlRfQ0FURUdPUlksIEdST1VQX0NBVEVHT1JZLCBDT1VSU0VfTU9ERSwgQ09VUlNFX01FTUJFUl9FTlJPTExfU1RBVFVTLCBFWFBPUlRfREFURV9GT1JNQVQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IENoYXJ0IH0gZnJvbSAnLi4vY2hhcnQuZGVjb3JhdG9yJztcbmltcG9ydCB7IFN0YXRzVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy9zdGF0aXN0aWNzLnV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2NvdXJzZS1tZW1iZXItYWN0aXZpdHktY2hhcnQnLFxuICAgIHRlbXBsYXRlVXJsOiAnY291cnNlLW1lbWJlci1hY3Rpdml0eS1jaGFydC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIENvdXJzZU1lbWJlckFjdGl2aXR5Q2hhcnRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50ICB7XG5cbiAgICBwcml2YXRlIGNoYXJ0RGF0YTogYW55O1xuICAgIHByaXZhdGUgc3RhdHNVdGlsczogU3RhdHNVdGlscztcbiAgICBwcml2YXRlIGNhY2hlRGF0YSA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhdHNVdGlscyA9IG5ldyBTdGF0c1V0aWxzKCk7XG4gICAgfVxuXG4gICAgZHJhd0NoYXJ0KG1lbWJlcjogQ291cnNlTWVtYmVyLGR1cmF0aW9uOm51bWJlcikge1xuICAgICAgICB2YXIgZW5kID0gbmV3IERhdGUoKTtcbiAgICAgICAgdmFyIHN0YXJ0ID0gbmV3IERhdGUoZW5kLmdldFRpbWUoKSAtIGR1cmF0aW9uICogMjQgKiA2MCAqIDYwICogMTAwMCk7XG4gICAgICAgIHN0YXJ0LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICB0aGlzLnN0YXRzVXRpbHMuY291cnNlTWVtYmVyU3RhdGlzdGljQnlEYXRlKHRoaXMsIG1lbWJlci5pZCwgbWVtYmVyLmNvdXJzZV9pZCwgc3RhcnQsIGVuZCkuc3Vic2NyaWJlKHNsb3RzID0+IHtcbiAgICAgICAgICAgIHZhciBsYWJlbHMgPSBbdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ1RvZGF5JyldO1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBbc2xvdHNbc2xvdHMubGVuZ3RoLTFdXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPTE7IGk8IHNsb3RzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICBsYWJlbHMucHVzaCh0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudChcIkRheS1cIitpKSk7XG4gICAgICAgICAgICAgICAgZGF0YS5wdXNoKHNsb3RzW3Nsb3RzLmxlbmd0aC0xLWldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2hhcnREYXRhID0ge1xuICAgICAgICAgICAgICAgIGxhYmVsczogbGFiZWxzLFxuICAgICAgICAgICAgICAgIGRhdGFzZXRzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnQ291cnNlIHVuaXQgYXR0ZW1wdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjRkZDMTA3J1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=

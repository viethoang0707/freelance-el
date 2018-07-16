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
            templateUrl: 'user-chart.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], UserChartComponent);
    return UserChartComponent;
}(base_component_1.BaseComponent));
exports.UserChartComponent = UserChartComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9jaGFydC91c2VyLWNoYXJ0L3VzZXItY2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFvRTtBQU1wRSxpRkFBK0U7QUFDL0UsMEVBQW1FO0FBR25FLGdFQUE4RDtBQUU5RCw4QkFBZ0M7QUFHaEMsNkVBQXNFO0FBT3RFO0lBQXdDLHNDQUFhO0lBS2pEO1FBQUEsWUFDSSxpQkFBTyxTQUVWO1FBREcsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDZCQUFVLEVBQUUsQ0FBQzs7SUFDdkMsQ0FBQztJQUVELHNDQUFTLEdBQVQ7UUFBQSxpQkE0QkM7UUEzQkcsc0JBQVM7YUFDSixVQUFVLENBQUMsSUFBSSxFQUNaLGlCQUFJLENBQUMsZUFBZSxFQUFFLEVBQ3RCLGlCQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzthQUMvQixHQUFHLENBQUMsVUFBQSxPQUFPO1lBQ1IsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzdCLENBQUMsQ0FBQzthQUNELFNBQVMsQ0FBQyxVQUFBLE9BQU87WUFDZCxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLEtBQUksQ0FBQyxTQUFTLEdBQUc7Z0JBQ2IsTUFBTSxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQztnQkFDckMsUUFBUSxFQUFFO29CQUNOO3dCQUNJLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxTQUFTLEdBQUcsVUFBVSxDQUFDO3dCQUMxQyxlQUFlLEVBQUU7NEJBQ2IsU0FBUzs0QkFDVCxTQUFTO3lCQUNaO3dCQUNELG9CQUFvQixFQUFFOzRCQUNsQixTQUFTOzRCQUNULFNBQVM7eUJBQ1o7cUJBQ0o7aUJBQUM7YUFDVCxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFFWCxDQUFDO0lBdENRLGtCQUFrQjtRQUw5QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFdBQVcsRUFBRSwyQkFBMkI7U0FDM0MsQ0FBQzs7T0FDVyxrQkFBa0IsQ0F3QzlCO0lBQUQseUJBQUM7Q0F4Q0QsQUF3Q0MsQ0F4Q3VDLDhCQUFhLEdBd0NwRDtBQXhDWSxnREFBa0IiLCJmaWxlIjoiYXBwL2FuYWx5c2lzL2NoYXJ0L3VzZXItY2hhcnQvdXNlci1jaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBSZXBvcnRVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3JlcG9ydC51dGlscyc7XG5pbXBvcnQgeyBFeGFtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtR3JhZGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLWdyYWRlLm1vZGVsJztcbmltcG9ydCB7IFN1Ym1pc3Npb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdWJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IEVYUE9SVF9EQVRFVElNRV9GT1JNQVQsIFJFUE9SVF9DQVRFR09SWSwgR1JPVVBfQ0FURUdPUlksIENPVVJTRV9NT0RFLCBDT1VSU0VfTUVNQkVSX0VOUk9MTF9TVEFUVVMsIEVYUE9SVF9EQVRFX0ZPUk1BVCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgQ2hhcnQgfSBmcm9tICcuLi9jaGFydC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgU3RhdHNVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3N0YXRpc3RpY3MudXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAndXNlci1jaGFydCcsXG4gICAgdGVtcGxhdGVVcmw6ICd1c2VyLWNoYXJ0LmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgVXNlckNoYXJ0Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cbiAgICBwcml2YXRlIGNoYXJ0RGF0YTogYW55O1xuICAgIHByaXZhdGUgc3RhdHNVdGlsczogU3RhdHNVdGlscztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnN0YXRzVXRpbHMgPSBuZXcgU3RhdHNVdGlscygpO1xuICAgIH1cblxuICAgIGRyYXdDaGFydCgpIHtcbiAgICAgICAgQmFzZU1vZGVsXG4gICAgICAgICAgICAuYnVsa19jb3VudCh0aGlzLFxuICAgICAgICAgICAgICAgIFVzZXIuX19hcGlfX2NvdW50QWxsKCksXG4gICAgICAgICAgICAgICAgVXNlci5fX2FwaV9fY291bnRBbGxBZG1pbigpKVxuICAgICAgICAgICAgLm1hcChqc29uQXJyID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5mbGF0dGVuKGpzb25BcnIpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN1YnNjcmliZShqc29uQXJyID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgdXNlckNvdW50ID0ganNvbkFyclswXTtcbiAgICAgICAgICAgICAgICB2YXIgYWRtaW5Db3VudCA9IGpzb25BcnJbMV07XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFydERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsczogWydBZG1pbiB1c2VyJywgJ05vcm1hbCB1c2VyJ10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXRzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogW2FkbWluQ291bnQsIHVzZXJDb3VudCAtIGFkbWluQ291bnRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiNGRjYzODRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIjMzZBMkVCXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3ZlckJhY2tncm91bmRDb2xvcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiNGRjYzODRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIjMzZBMkVCXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG5cbiAgICB9XG5cbn1cbiJdfQ==

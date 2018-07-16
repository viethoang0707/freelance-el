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
var common_1 = require("@angular/common");
var report_utils_1 = require("../../../../shared/helpers/report.utils");
var base_component_1 = require("../../../../shared/components/base/base.component");
var competency_model_1 = require("../../../../shared/models/elearning/competency.model");
var competency_level_model_1 = require("../../../../shared/models/elearning/competency-level.model");
var _ = require("underscore");
var time_pipe_1 = require("../../../../shared/pipes/time.pipe");
var excel_service_1 = require("../../../../shared/services/excel.service");
var base_model_1 = require("../../../../shared/models/base.model");
var achievement_model_1 = require("../../../../shared/models/elearning/achievement.model");
var CompetencyByGroupReportComponent = (function (_super) {
    __extends(CompetencyByGroupReportComponent, _super);
    function CompetencyByGroupReportComponent(excelService, datePipe, timePipe) {
        var _this = _super.call(this) || this;
        _this.excelService = excelService;
        _this.datePipe = datePipe;
        _this.timePipe = timePipe;
        _this.reportUtils = new report_utils_1.ReportUtils();
        _this.competency = new competency_model_1.Competency();
        _this.levels = [];
        return _this;
    }
    CompetencyByGroupReportComponent.prototype.ngOnInit = function () {
    };
    CompetencyByGroupReportComponent.prototype.clear = function () {
        this.records = [];
    };
    CompetencyByGroupReportComponent.prototype.export = function () {
        var _this = this;
        var output = _.map(this.records, function (record) {
            var exportRow = { 'Group': record['group_name'] };
            _.each(_this.levels, function (level) {
                exportRow[level.name] = record[level.id];
            });
            return exportRow;
        });
        this.excelService.exportAsExcelFile(output, 'competency_by_group_report');
    };
    CompetencyByGroupReportComponent.prototype.render = function (competency, groups) {
        var _this = this;
        this.clear();
        this.competency = competency;
        competency_level_model_1.CompetencyLevel.listByCompetency(this, this.competency.id).subscribe(function (levels) {
            _this.levels = levels;
            _this.generateReport(competency, groups);
        });
    };
    CompetencyByGroupReportComponent.prototype.generateReport = function (competency, groups) {
        var _this = this;
        var apiList = [];
        for (var i = 0; i < groups.length; i++) {
            apiList.push(achievement_model_1.Achivement.__api__listByGroup(groups[i].id));
        }
        ;
        base_model_1.BaseModel.bulk_search.apply(base_model_1.BaseModel, [this].concat(apiList)).subscribe(function (jsonArr) {
            for (var i = 0; i < groups.length; i++) {
                var skills = achievement_model_1.Achivement.toArray(jsonArr[i]);
                var record = _this.generateReportRow(groups[i], skills);
                _this.records.push(record);
            }
        });
    };
    CompetencyByGroupReportComponent.prototype.generateReportRow = function (group, achievements) {
        var record = {};
        record["group_name"] = group.name;
        _.each(this.levels, function (level) {
            record[level.id] = 0;
        });
        var skillSets = _.groupBy(achievements, 'user_id');
        _.each(skillSets, function (skillSet) {
            var skill = _.max(skillSet, function (obj) {
                return obj.date_acquire.getTime();
            });
            record[skill.competency_level_id] += 1;
        });
        return record;
    };
    CompetencyByGroupReportComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'competency-by-group-report',
            templateUrl: 'competency-by-group-report.component.html',
            styleUrls: ['competency-by-group-report.component.css'],
        }),
        __metadata("design:paramtypes", [excel_service_1.ExcelService, common_1.DatePipe, time_pipe_1.TimeConvertPipe])
    ], CompetencyByGroupReportComponent);
    return CompetencyByGroupReportComponent;
}(base_component_1.BaseComponent));
exports.CompetencyByGroupReportComponent = CompetencyByGroupReportComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9yZXBvcnQvY29tcGV0ZW5jeS9jb21wZXRlbmN5LWJ5LWdyb3VwLXJlcG9ydC9jb21wZXRlbmN5LWJ5LWdyb3VwLXJlcG9ydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBQ3BFLDBDQUEyQztBQUUzQyx3RUFBc0U7QUFFdEUsb0ZBQWtGO0FBR2xGLHlGQUFrRjtBQUNsRixxR0FBNkY7QUFDN0YsOEJBQWdDO0FBR2hDLGdFQUFxRTtBQUNyRSwyRUFBeUU7QUFHekUsbUVBQWlFO0FBQ2pFLDJGQUFtRjtBQVNuRjtJQUFzRCxvREFBYTtJQU9sRSwwQ0FBb0IsWUFBMEIsRUFBVSxRQUFrQixFQUFVLFFBQXlCO1FBQTdHLFlBQ0MsaUJBQU8sU0FJUDtRQUxtQixrQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLGNBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxjQUFRLEdBQVIsUUFBUSxDQUFpQjtRQUU1RyxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQVcsRUFBRSxDQUFDO1FBQ3JDLEtBQUksQ0FBQyxVQUFVLEdBQUksSUFBSSw2QkFBVSxFQUFFLENBQUM7UUFDcEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7O0lBQ2xCLENBQUM7SUFFRCxtREFBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELGdEQUFLLEdBQUw7UUFDQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsaURBQU0sR0FBTjtRQUFBLGlCQVNDO1FBUkEsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUEsTUFBTTtZQUN0QyxJQUFJLFNBQVMsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUMsQ0FBQztZQUNqRCxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLEVBQUUsVUFBQyxLQUFxQjtnQkFDekMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxTQUFTLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxpREFBTSxHQUFOLFVBQU8sVUFBc0IsRUFBRSxNQUFlO1FBQTlDLGlCQVFDO1FBUEEsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBSSxVQUFVLENBQUM7UUFDOUIsd0NBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQzFFLEtBQUksQ0FBQyxNQUFNLEdBQUksTUFBTSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBRUosQ0FBQztJQUVELHlEQUFjLEdBQWQsVUFBZSxVQUFzQixFQUFFLE1BQWU7UUFBdEQsaUJBWUM7UUFYQSxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDakIsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsT0FBTyxDQUFDLElBQUksQ0FBQyw4QkFBVSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzFEO1FBQUEsQ0FBQztRQUNGLHNCQUFTLENBQUMsV0FBVyxPQUFyQixzQkFBUyxHQUFhLElBQUksU0FBSyxPQUFPLEdBQUUsU0FBUyxDQUFDLFVBQUEsT0FBTztZQUN4RCxLQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbEMsSUFBSSxNQUFNLEdBQUcsOEJBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzNDLElBQUksTUFBTSxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZELEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzFCO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsNERBQWlCLEdBQWpCLFVBQWtCLEtBQVksRUFBRSxZQUEwQjtRQUN6RCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDbEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQUMsS0FBcUI7WUFDekMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBQyxTQUFTLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFDLFFBQXFCO1lBQ3ZDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQUMsR0FBYztnQkFDMUMsT0FBTyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFHLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQztJQXRFVyxnQ0FBZ0M7UUFQNUMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsNEJBQTRCO1lBQ3RDLFdBQVcsRUFBRSwyQ0FBMkM7WUFDeEQsU0FBUyxFQUFFLENBQUMsMENBQTBDLENBQUM7U0FDdkQsQ0FBQzt5Q0FTaUMsNEJBQVksRUFBb0IsaUJBQVEsRUFBb0IsMkJBQWU7T0FQakcsZ0NBQWdDLENBd0U1QztJQUFELHVDQUFDO0NBeEVELEFBd0VDLENBeEVxRCw4QkFBYSxHQXdFbEU7QUF4RVksNEVBQWdDIiwiZmlsZSI6ImFwcC9hbmFseXNpcy9yZXBvcnQvY29tcGV0ZW5jeS9jb21wZXRlbmN5LWJ5LWdyb3VwLXJlcG9ydC9jb21wZXRlbmN5LWJ5LWdyb3VwLXJlcG9ydC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgUmVwb3J0VXRpbHMgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvaGVscGVycy9yZXBvcnQudXRpbHMnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VMb2cgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9sb2cubW9kZWwnO1xuaW1wb3J0IHsgQ29tcGV0ZW5jeSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvbXBldGVuY3kubW9kZWwnO1xuaW1wb3J0IHsgQ29tcGV0ZW5jeUxldmVsIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY29tcGV0ZW5jeS1sZXZlbC5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgRVhQT1JUX0RBVEVUSU1FX0ZPUk1BVCwgUkVQT1JUX0NBVEVHT1JZLCBHUk9VUF9DQVRFR09SWSwgQ09VUlNFX01PREUsIENPVVJTRV9NRU1CRVJfRU5ST0xMX1NUQVRVUywgRVhQT1JUX0RBVEVfRk9STUFUIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBSZXBvcnQgfSBmcm9tICcuLi8uLi9yZXBvcnQuZGVjb3JhdG9yJztcbmltcG9ydCB7IFRpbWVDb252ZXJ0UGlwZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9waXBlcy90aW1lLnBpcGUnO1xuaW1wb3J0IHsgRXhjZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2V4Y2VsLnNlcnZpY2UnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgQWNoaXZlbWVudCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2FjaGlldmVtZW50Lm1vZGVsJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnY29tcGV0ZW5jeS1ieS1ncm91cC1yZXBvcnQnLFxuXHR0ZW1wbGF0ZVVybDogJ2NvbXBldGVuY3ktYnktZ3JvdXAtcmVwb3J0LmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJ2NvbXBldGVuY3ktYnktZ3JvdXAtcmVwb3J0LmNvbXBvbmVudC5jc3MnXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBDb21wZXRlbmN5QnlHcm91cFJlcG9ydENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdHByaXZhdGUgcmVjb3JkczogYW55O1xuICAgIHByaXZhdGUgcmVwb3J0VXRpbHM6IFJlcG9ydFV0aWxzO1xuICAgIHByaXZhdGUgY29tcGV0ZW5jeTogQ29tcGV0ZW5jeTtcbiAgICBwcml2YXRlIGxldmVsczogQ29tcGV0ZW5jeUxldmVsW107XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBleGNlbFNlcnZpY2U6IEV4Y2VsU2VydmljZSwgcHJpdmF0ZSBkYXRlUGlwZTogRGF0ZVBpcGUsIHByaXZhdGUgdGltZVBpcGU6IFRpbWVDb252ZXJ0UGlwZSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5yZXBvcnRVdGlscyA9IG5ldyBSZXBvcnRVdGlscygpO1xuXHRcdHRoaXMuY29tcGV0ZW5jeSA9ICBuZXcgQ29tcGV0ZW5jeSgpO1xuXHRcdHRoaXMubGV2ZWxzID0gW107XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0fVxuXG5cdGNsZWFyKCkge1xuXHRcdHRoaXMucmVjb3JkcyA9IFtdO1xuXHR9XG5cblx0ZXhwb3J0KCkge1xuXHRcdHZhciBvdXRwdXQgPSBfLm1hcCh0aGlzLnJlY29yZHMsIHJlY29yZD0+IHtcblx0XHRcdHZhciBleHBvcnRSb3cgPSB7ICdHcm91cCc6IHJlY29yZFsnZ3JvdXBfbmFtZSddfTtcblx0XHRcdF8uZWFjaCh0aGlzLmxldmVscywgKGxldmVsOkNvbXBldGVuY3lMZXZlbCk9PiB7XG5cdFx0XHRcdGV4cG9ydFJvd1tsZXZlbC5uYW1lXSA9IHJlY29yZFtsZXZlbC5pZF07XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBleHBvcnRSb3c7XG5cdFx0fSk7XG5cdFx0dGhpcy5leGNlbFNlcnZpY2UuZXhwb3J0QXNFeGNlbEZpbGUob3V0cHV0LCAnY29tcGV0ZW5jeV9ieV9ncm91cF9yZXBvcnQnKTtcblx0fVxuXG5cdHJlbmRlcihjb21wZXRlbmN5OiBDb21wZXRlbmN5LCBncm91cHM6IEdyb3VwW10pIHtcblx0XHR0aGlzLmNsZWFyKCk7XG5cdFx0dGhpcy5jb21wZXRlbmN5ID0gIGNvbXBldGVuY3k7XG5cdFx0Q29tcGV0ZW5jeUxldmVsLmxpc3RCeUNvbXBldGVuY3kodGhpcywgdGhpcy5jb21wZXRlbmN5LmlkKS5zdWJzY3JpYmUobGV2ZWxzPT4ge1xuXHRcdFx0dGhpcy5sZXZlbHMgPSAgbGV2ZWxzO1xuXHRcdFx0dGhpcy5nZW5lcmF0ZVJlcG9ydChjb21wZXRlbmN5LCBncm91cHMpO1xuXHRcdH0pO1xuXHRcdFxuXHR9XG5cblx0Z2VuZXJhdGVSZXBvcnQoY29tcGV0ZW5jeTogQ29tcGV0ZW5jeSwgZ3JvdXBzOiBHcm91cFtdKSB7XG5cdFx0dmFyIGFwaUxpc3QgPSBbXTtcblx0XHRmb3IgKHZhciBpPTA7aTxncm91cHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGFwaUxpc3QucHVzaChBY2hpdmVtZW50Ll9fYXBpX19saXN0QnlHcm91cChncm91cHNbaV0uaWQpKTtcblx0XHR9O1xuXHRcdEJhc2VNb2RlbC5idWxrX3NlYXJjaCh0aGlzLCAuLi5hcGlMaXN0KS5zdWJzY3JpYmUoanNvbkFyciA9PiB7XG5cdFx0XHRmb3IgKHZhciBpPTA7aTxncm91cHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIHNraWxscyA9IEFjaGl2ZW1lbnQudG9BcnJheShqc29uQXJyW2ldKVxuXHRcdFx0XHR2YXIgcmVjb3JkID0gdGhpcy5nZW5lcmF0ZVJlcG9ydFJvdyhncm91cHNbaV0sIHNraWxscyk7XG5cdFx0XHRcdHRoaXMucmVjb3Jkcy5wdXNoKHJlY29yZCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRnZW5lcmF0ZVJlcG9ydFJvdyhncm91cDogR3JvdXAsIGFjaGlldmVtZW50czogQWNoaXZlbWVudFtdKTogYW55IHtcblx0XHR2YXIgcmVjb3JkID0ge307XG5cdFx0cmVjb3JkW1wiZ3JvdXBfbmFtZVwiXSA9IGdyb3VwLm5hbWU7XG5cdFx0Xy5lYWNoKHRoaXMubGV2ZWxzLCAobGV2ZWw6Q29tcGV0ZW5jeUxldmVsKT0+IHtcblx0XHRcdHJlY29yZFtsZXZlbC5pZF0gPSAwO1xuXHRcdH0pO1xuXHRcdHZhciBza2lsbFNldHMgPSBfLmdyb3VwQnkoYWNoaWV2ZW1lbnRzLCd1c2VyX2lkJyk7XG5cdFx0Xy5lYWNoKHNraWxsU2V0cywgKHNraWxsU2V0OkFjaGl2ZW1lbnRbXSk9PiB7XG5cdFx0XHR2YXIgc2tpbGwgPSBfLm1heChza2lsbFNldCwgKG9iajpBY2hpdmVtZW50KT0+IHtcblx0XHRcdFx0cmV0dXJuIG9iai5kYXRlX2FjcXVpcmUuZ2V0VGltZSgpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZWNvcmRbc2tpbGwuY29tcGV0ZW5jeV9sZXZlbF9pZF0gKz0xO1xuXHRcdH0pO1xuXHRcdHJldHVybiByZWNvcmQ7XG5cdH1cblxufVxuIl19

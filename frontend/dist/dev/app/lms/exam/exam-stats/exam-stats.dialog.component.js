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
require("rxjs/add/observable/timer");
var exam_result_stats_report_component_1 = require("../../../analysis/report/exam/exam-result-stats-report/exam-result-stats-report.component");
var ExamStatsDialog = (function (_super) {
    __extends(ExamStatsDialog, _super);
    function ExamStatsDialog() {
        var _this = _super.call(this) || this;
        _this.display = false;
        return _this;
    }
    ExamStatsDialog.prototype.show = function (exam) {
        this.display = true;
        this.statsReport.render(exam);
    };
    ExamStatsDialog.prototype.hide = function () {
        this.display = false;
        this.statsReport.clear();
    };
    ExamStatsDialog.prototype.export = function () {
        this.statsReport.export();
    };
    __decorate([
        core_1.ViewChild(exam_result_stats_report_component_1.ExamResultStatsReportComponent),
        __metadata("design:type", exam_result_stats_report_component_1.ExamResultStatsReportComponent)
    ], ExamStatsDialog.prototype, "statsReport", void 0);
    ExamStatsDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-stats-dialog',
            templateUrl: 'exam-stats.dialog.component.html',
            styleUrls: ['exam-stats.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], ExamStatsDialog);
    return ExamStatsDialog;
}(base_component_1.BaseComponent));
exports.ExamStatsDialog = ExamStatsDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvZXhhbS9leGFtLXN0YXRzL2V4YW0tc3RhdHMuZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBdUg7QUFLdkgsaUZBQStFO0FBYS9FLHFDQUFtQztBQUduQyxnSkFBMkk7QUFRM0k7SUFBcUMsbUNBQWE7SUFPOUM7UUFBQSxZQUNJLGlCQUFPLFNBRVY7UUFERyxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs7SUFDekIsQ0FBQztJQUVELDhCQUFJLEdBQUosVUFBSyxJQUFVO1FBQ1gsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELDhCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRixnQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBbkIyQztRQUExQyxnQkFBUyxDQUFDLG1FQUE4QixDQUFDO2tDQUFjLG1FQUE4Qjt3REFBQztJQUw5RSxlQUFlO1FBTjNCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixXQUFXLEVBQUUsa0NBQWtDO1lBQy9DLFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDO1NBQ2pELENBQUM7O09BQ1csZUFBZSxDQXlCM0I7SUFBRCxzQkFBQztDQXpCRCxBQXlCQyxDQXpCb0MsOEJBQWEsR0F5QmpEO0FBekJZLDBDQUFlIiwiZmlsZSI6ImFwcC9sbXMvZXhhbS9leGFtLXN0YXRzL2V4YW0tc3RhdHMuZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEV4Y2VsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9leGNlbC5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXhhbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0ubW9kZWwnO1xuaW1wb3J0IHsgRXhhbVF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBBbnN3ZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9hbnN3ZXIubW9kZWwnO1xuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Nsb3VkL3Rva2VuLm1vZGVsJztcbmltcG9ydCB7IFN1Ym1pc3Npb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdWJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgUXVlc3Rpb25TaGVldCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLXNoZWV0Lm1vZGVsJztcbmltcG9ydCB7IEV4YW1NZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgUXVlc3Rpb25Db250YWluZXJEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi8uLi9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL3F1ZXN0aW9uLWNvbnRhaW5lci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSVF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vYXNzZXNzbWVudC9xdWVzdGlvbi9xdWVzdGlvbi10ZW1wbGF0ZS9xdWVzdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUXVlc3Rpb25SZWdpc3RlciB9IGZyb20gJy4uLy4uLy4uL2Fzc2Vzc21lbnQvcXVlc3Rpb24vcXVlc3Rpb24tdGVtcGxhdGUvcXVlc3Rpb24uZGVjb3JhdG9yJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS90aW1lcic7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgUXVlc3Rpb25PcHRpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9vcHRpb24ubW9kZWwnO1xuaW1wb3J0IHsgRXhhbVJlc3VsdFN0YXRzUmVwb3J0Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vYW5hbHlzaXMvcmVwb3J0L2V4YW0vZXhhbS1yZXN1bHQtc3RhdHMtcmVwb3J0L2V4YW0tcmVzdWx0LXN0YXRzLXJlcG9ydC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnZXhhbS1zdGF0cy1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAnZXhhbS1zdGF0cy5kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydleGFtLXN0YXRzLmRpYWxvZy5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEV4YW1TdGF0c0RpYWxvZyBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuICAgIFxuICAgIFxuICAgIHByaXZhdGUgZGlzcGxheTogYm9vbGVhbjtcbiAgICBcbiAgICBAVmlld0NoaWxkKEV4YW1SZXN1bHRTdGF0c1JlcG9ydENvbXBvbmVudCkgc3RhdHNSZXBvcnQ6IEV4YW1SZXN1bHRTdGF0c1JlcG9ydENvbXBvbmVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzaG93KGV4YW06IEV4YW0pIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zdGF0c1JlcG9ydC5yZW5kZXIoZXhhbSk7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhdHNSZXBvcnQuY2xlYXIoKTtcbiAgICB9XG5cbiAgIGV4cG9ydCgpIHtcbiAgICAgICB0aGlzLnN0YXRzUmVwb3J0LmV4cG9ydCgpO1xuICAgfVxufVxuXG5cblxuIl19

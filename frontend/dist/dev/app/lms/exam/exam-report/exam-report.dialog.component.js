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
var exam_result_report_component_1 = require("../../../analysis/report/exam/exam-result-report/exam-result-report.component");
var ExamReportDialog = (function (_super) {
    __extends(ExamReportDialog, _super);
    function ExamReportDialog() {
        var _this = _super.call(this) || this;
        _this.display = false;
        return _this;
    }
    ExamReportDialog.prototype.show = function (exam) {
        this.display = true;
        this.examReport.render(exam);
    };
    ExamReportDialog.prototype.hide = function () {
        this.display = false;
        this.examReport.clear();
    };
    ExamReportDialog.prototype.export = function () {
        this.examReport.export();
    };
    __decorate([
        core_1.ViewChild(exam_result_report_component_1.ExamResultReportComponent),
        __metadata("design:type", exam_result_report_component_1.ExamResultReportComponent)
    ], ExamReportDialog.prototype, "examReport", void 0);
    ExamReportDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-report-dialog',
            templateUrl: 'exam-report.dialog.component.html',
            styleUrls: ['exam-report.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], ExamReportDialog);
    return ExamReportDialog;
}(base_component_1.BaseComponent));
exports.ExamReportDialog = ExamReportDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvZXhhbS9leGFtLXJlcG9ydC9leGFtLXJlcG9ydC5kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUF1SDtBQUt2SCxpRkFBK0U7QUFhL0UscUNBQW1DO0FBRW5DLDhIQUEwSDtBQVExSDtJQUFzQyxvQ0FBYTtJQU0vQztRQUFBLFlBQ0ksaUJBQU8sU0FFVjtRQURHLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDOztJQUN6QixDQUFDO0lBRUQsK0JBQUksR0FBSixVQUFLLElBQVU7UUFDWCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsK0JBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVGLGlDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFuQnNDO1FBQXJDLGdCQUFTLENBQUMsd0RBQXlCLENBQUM7a0NBQWEsd0RBQXlCO3dEQUFDO0lBSm5FLGdCQUFnQjtRQU41QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsV0FBVyxFQUFFLG1DQUFtQztZQUNoRCxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQztTQUNsRCxDQUFDOztPQUNXLGdCQUFnQixDQXdCNUI7SUFBRCx1QkFBQztDQXhCRCxBQXdCQyxDQXhCcUMsOEJBQWEsR0F3QmxEO0FBeEJZLDRDQUFnQiIsImZpbGUiOiJhcHAvbG1zL2V4YW0vZXhhbS1yZXBvcnQvZXhhbS1yZXBvcnQuZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IEV4YW0gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLm1vZGVsJztcbmltcG9ydCB7IEV4YW1RdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgQW5zd2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvYW5zd2VyLm1vZGVsJztcbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jbG91ZC90b2tlbi5tb2RlbCc7XG5pbXBvcnQgeyBTdWJtaXNzaW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VibWlzc2lvbi5tb2RlbCc7XG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uU2hlZXQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9xdWVzdGlvbi1zaGVldC5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IFF1ZXN0aW9uQ29udGFpbmVyRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vLi4vYXNzZXNzbWVudC9xdWVzdGlvbi9xdWVzdGlvbi10ZW1wbGF0ZS9xdWVzdGlvbi1jb250YWluZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IElRdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uL2Fzc2Vzc21lbnQvcXVlc3Rpb24vcXVlc3Rpb24tdGVtcGxhdGUvcXVlc3Rpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IFF1ZXN0aW9uUmVnaXN0ZXIgfSBmcm9tICcuLi8uLi8uLi9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL3F1ZXN0aW9uLmRlY29yYXRvcic7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvdGltZXInO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IEV4YW1SZXN1bHRSZXBvcnRDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9hbmFseXNpcy9yZXBvcnQvZXhhbS9leGFtLXJlc3VsdC1yZXBvcnQvZXhhbS1yZXN1bHQtcmVwb3J0LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdleGFtLXJlcG9ydC1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAnZXhhbS1yZXBvcnQuZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnZXhhbS1yZXBvcnQuZGlhbG9nLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgRXhhbVJlcG9ydERpYWxvZyBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuICAgIFxuICAgIHByaXZhdGUgZGlzcGxheTogYm9vbGVhbjtcbiAgICBcbiAgICBAVmlld0NoaWxkKEV4YW1SZXN1bHRSZXBvcnRDb21wb25lbnQpIGV4YW1SZXBvcnQ6IEV4YW1SZXN1bHRSZXBvcnRDb21wb25lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc2hvdyhleGFtOiBFeGFtKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IHRydWU7XG4gICAgICAgIHRoaXMuZXhhbVJlcG9ydC5yZW5kZXIoZXhhbSk7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXhhbVJlcG9ydC5jbGVhcigpO1xuICAgIH1cblxuICAgZXhwb3J0KCkge1xuICAgICAgIHRoaXMuZXhhbVJlcG9ydC5leHBvcnQoKTtcbiAgIH1cbn1cblxuXG5cbiJdfQ==

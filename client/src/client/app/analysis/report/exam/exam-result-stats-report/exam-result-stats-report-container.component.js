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
var exam_model_1 = require("../../../../shared/models/elearning/exam.model");
var base_component_1 = require("../../../../shared/components/base/base.component");
var constants_1 = require("../../../../shared/models/constants");
var report_decorator_1 = require("../../report.decorator");
var exam_result_stats_report_component_1 = require("./exam-result-stats-report.component");
var ExamResultStatsReportContainerComponent = (function (_super) {
    __extends(ExamResultStatsReportContainerComponent, _super);
    function ExamResultStatsReportContainerComponent() {
        return _super.call(this) || this;
    }
    ExamResultStatsReportContainerComponent.prototype.ngOnInit = function () {
        var _this = this;
        exam_model_1.Exam.all(this).subscribe(function (exams) {
            _this.exams = exams;
        });
    };
    ExamResultStatsReportContainerComponent.prototype.export = function () {
        if (this.selectedExam)
            this.statsReport.export();
    };
    ExamResultStatsReportContainerComponent.prototype.selectExam = function () {
        if (this.selectedExam) {
            this.statsReport.clear();
            this.statsReport.render(this.selectedExam);
        }
    };
    __decorate([
        core_1.ViewChild(exam_result_stats_report_component_1.ExamResultStatsReportComponent),
        __metadata("design:type", exam_result_stats_report_component_1.ExamResultStatsReportComponent)
    ], ExamResultStatsReportContainerComponent.prototype, "statsReport", void 0);
    ExamResultStatsReportContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-result-stats-report-container',
            templateUrl: 'exam-result-stats-report-container.component.html',
        }),
        report_decorator_1.Report({
            title: 'Exam result statistics report',
            category: constants_1.REPORT_CATEGORY.EXAM
        }),
        __metadata("design:paramtypes", [])
    ], ExamResultStatsReportContainerComponent);
    return ExamResultStatsReportContainerComponent;
}(base_component_1.BaseComponent));
exports.ExamResultStatsReportContainerComponent = ExamResultStatsReportContainerComponent;
//# sourceMappingURL=exam-result-stats-report-container.component.js.map
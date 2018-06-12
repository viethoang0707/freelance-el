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
//# sourceMappingURL=exam-report.dialog.component.js.map
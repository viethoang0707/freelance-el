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
            template: "<p-dialog header=\"{{'Exam answer statistics'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"960\" height=\"100%\" [responsive]=\"true\" appendTo=\"body\"> \t<div class=\"spinner\" [hidden]=\"!loading\"></div>     <p-scrollPanel [style]=\"{width: '100%', height: '460px'}\">         <exam-result-stats-report></exam-result-stats-report>     </p-scrollPanel>   <p-footer>     <button type=\"button\" pButton icon=\"ui-icon-check\" (click)=\"export()\" label=\"{{'Export'|translate}}\"></button>     <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Cancel'|translate}}\"></button>   </p-footer> </p-dialog>",
            styles: [".name-c,.name-e{text-align:center;text-transform:uppercase;font-weight:700}.bold,.label{font-weight:700}.title{text-transform:uppercase}.ins{text-indent:50px}.ans-print{margin-bottom:20px}"],
        }),
        __metadata("design:paramtypes", [])
    ], ExamStatsDialog);
    return ExamStatsDialog;
}(base_component_1.BaseComponent));
exports.ExamStatsDialog = ExamStatsDialog;

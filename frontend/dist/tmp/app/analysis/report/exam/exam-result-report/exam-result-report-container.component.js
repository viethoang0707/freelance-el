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
var exam_result_report_component_1 = require("./exam-result-report.component");
var ExamResultReportContainerComponent = (function (_super) {
    __extends(ExamResultReportContainerComponent, _super);
    function ExamResultReportContainerComponent() {
        return _super.call(this) || this;
    }
    ExamResultReportContainerComponent.prototype.ngOnInit = function () {
        var _this = this;
        exam_model_1.Exam.all(this).subscribe(function (exams) {
            _this.exams = exams;
        });
    };
    ExamResultReportContainerComponent.prototype.export = function () {
        if (this.selectedExam)
            this.examReport.export();
    };
    ExamResultReportContainerComponent.prototype.selectExam = function () {
        if (this.selectedExam) {
            this.examReport.clear();
            this.examReport.render(this.selectedExam);
        }
    };
    __decorate([
        core_1.ViewChild(exam_result_report_component_1.ExamResultReportComponent),
        __metadata("design:type", exam_result_report_component_1.ExamResultReportComponent)
    ], ExamResultReportContainerComponent.prototype, "examReport", void 0);
    ExamResultReportContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-result-report-container',
            template: "    <div class=\"ui-g\">         <div class=\"ui-g-12\">         \t<p-toolbar>                 <div class=\"ui-toolbar-group-left drop-report\">                 \t<p-dropdown [options]=\"exams\" [(ngModel)]=\"selectedExam\" placeholder=\"{{'Select an exam'|translate}}\" (onChange)=\"selectExam()\" optionLabel=\"name\"></p-dropdown>                 </div>                 <div class=\"ui-toolbar-group-right\">                     <button pButton type=\"button\" label=\"{{'Export'|translate}}\"  class=\"blue-grey-btn\" icon=\"ui-icon-file-download\" (click)=\"export()\"></button>                 </div>             </p-toolbar>             <exam-result-report></exam-result-report>         </div>     </div>",
        }),
        report_decorator_1.Report({
            title: 'Exam result report',
            category: constants_1.REPORT_CATEGORY.EXAM
        }),
        __metadata("design:paramtypes", [])
    ], ExamResultReportContainerComponent);
    return ExamResultReportContainerComponent;
}(base_component_1.BaseComponent));
exports.ExamResultReportContainerComponent = ExamResultReportContainerComponent;

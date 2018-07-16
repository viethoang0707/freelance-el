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
var survey_model_1 = require("../../../../shared/models/elearning/survey.model");
var base_component_1 = require("../../../../shared/components/base/base.component");
var constants_1 = require("../../../../shared/models/constants");
var report_decorator_1 = require("../../report.decorator");
var survey_result_stats_report_component_1 = require("./survey-result-stats-report.component");
var SurveyResultStatsReportContainerComponent = (function (_super) {
    __extends(SurveyResultStatsReportContainerComponent, _super);
    function SurveyResultStatsReportContainerComponent() {
        return _super.call(this) || this;
    }
    SurveyResultStatsReportContainerComponent.prototype.ngOnInit = function () {
        var _this = this;
        survey_model_1.Survey.all(this).subscribe(function (surveys) {
            _this.surveys = surveys;
        });
    };
    SurveyResultStatsReportContainerComponent.prototype.export = function () {
        if (this.selectedSurvey)
            this.statsReport.export();
    };
    SurveyResultStatsReportContainerComponent.prototype.selectExam = function () {
        if (this.selectedSurvey) {
            this.statsReport.clear();
            this.statsReport.render(this.selectedSurvey);
        }
    };
    __decorate([
        core_1.ViewChild(survey_result_stats_report_component_1.SurveyResultStatsReportComponent),
        __metadata("design:type", survey_result_stats_report_component_1.SurveyResultStatsReportComponent)
    ], SurveyResultStatsReportContainerComponent.prototype, "statsReport", void 0);
    SurveyResultStatsReportContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'survey-result-stats-report-container',
            template: "    <div class=\"ui-g\">         <div class=\"ui-g-12\">         \t<p-toolbar>                 <div class=\"ui-toolbar-group-left drop-report\">                 \t<p-dropdown [options]=\"exams\" [(ngModel)]=\"selectedSurvey\" placeholder=\"Select a survey\" (onChange)=\"selectSurvey()\" optionLabel=\"name\"></p-dropdown>                 </div>                 <div class=\"ui-toolbar-group-right\">                     <button pButton type=\"button\" label=\"{{'Export'|translate}}\"  class=\"blue-grey-btn\" icon=\"ui-icon-file-download\" (click)=\"export()\"></button>                 </div>             </p-toolbar>             <survey-result-stats-report></survey-result-stats-report>         </div>     </div>",
        }),
        report_decorator_1.Report({
            title: 'Survey result statistics report',
            category: constants_1.REPORT_CATEGORY.SURVEY
        }),
        __metadata("design:paramtypes", [])
    ], SurveyResultStatsReportContainerComponent);
    return SurveyResultStatsReportContainerComponent;
}(base_component_1.BaseComponent));
exports.SurveyResultStatsReportContainerComponent = SurveyResultStatsReportContainerComponent;

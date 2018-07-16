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
var chart_decorator_1 = require("../chart.decorator");
var select_competency_dialog_component_1 = require("../../../shared/components/select-competency-dialog/select-competency-dialog.component");
var competency_progress_chart_component_1 = require("./competency-progress-chart.component");
var CompetencyProgressChartContainerComponent = (function (_super) {
    __extends(CompetencyProgressChartContainerComponent, _super);
    function CompetencyProgressChartContainerComponent() {
        var _this = _super.call(this) || this;
        _this.duration = 0;
        return _this;
    }
    CompetencyProgressChartContainerComponent.prototype.ngOnInit = function () {
    };
    CompetencyProgressChartContainerComponent.prototype.selectCompetency = function () {
        var _this = this;
        this.selectCompetencyDilog.show();
        this.selectCompetencyDilog.onSelectCompetency.subscribe(function (competency) {
            if (_this.duration)
                _this.competencyChart.drawChart(competency, _this.duration);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CompetencyProgressChartContainerComponent.prototype, "duration", void 0);
    __decorate([
        core_1.ViewChild(competency_progress_chart_component_1.CompetencyProgressChartComponent),
        __metadata("design:type", competency_progress_chart_component_1.CompetencyProgressChartComponent)
    ], CompetencyProgressChartContainerComponent.prototype, "competencyChart", void 0);
    __decorate([
        core_1.ViewChild(select_competency_dialog_component_1.SelectCompetencyDialog),
        __metadata("design:type", select_competency_dialog_component_1.SelectCompetencyDialog)
    ], CompetencyProgressChartContainerComponent.prototype, "selectCompetencyDilog", void 0);
    CompetencyProgressChartContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'competency-progress-chart-container',
            template: "<div class=\"card\">   <div class=\"card-header\">   \t<p-radioButton name=\"monitor_window\" label=\"{{'Last 3 months'|translate}}\" value=\"90\" inputId=\"opt1\" [(ngModel)]=\"duration\"></p-radioButton>     <p-radioButton name=\"monitor_window\" label=\"{{'Last 6 months'|translate}}\" value=\"180\" inputId=\"opt2\" [(ngModel)]=\"duration\"></p-radioButton>     <p-radioButton name=\"monitor_window\" label=\"{{'Last 12 months'|translate}}\" value=\"360\" inputId=\"opt3\" [(ngModel)]=\"duration\"></p-radioButton>             <div>                 <button pButton type=\"button\" label=\"{{'Select competency'|translate}}\" icon=\"ui-icon-open-in-browser\" class=\"green-btn\" (click)=\"selectCompetency()\" [disabled]=\"duration==0\"></button>             </div>       </div>     <select-competency-dialog></select-competency-dialog>     <competency-progress-chart></competency-progress-chart> </div>",
        }),
        chart_decorator_1.Chart({
            title: 'Competency progress chart',
        }),
        __metadata("design:paramtypes", [])
    ], CompetencyProgressChartContainerComponent);
    return CompetencyProgressChartContainerComponent;
}(base_component_1.BaseComponent));
exports.CompetencyProgressChartContainerComponent = CompetencyProgressChartContainerComponent;

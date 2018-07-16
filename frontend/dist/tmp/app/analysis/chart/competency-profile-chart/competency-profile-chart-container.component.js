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
var competency_profile_chart_component_1 = require("./competency-profile-chart.component");
var select_competency_dialog_component_1 = require("../../../shared/components/select-competency-dialog/select-competency-dialog.component");
var CompetencyProfileChartContainerComponent = (function (_super) {
    __extends(CompetencyProfileChartContainerComponent, _super);
    function CompetencyProfileChartContainerComponent() {
        return _super.call(this) || this;
    }
    CompetencyProfileChartContainerComponent.prototype.selectCompetency = function () {
        var _this = this;
        this.selectCompetencyDilog.show();
        this.selectCompetencyDilog.onSelectCompetency.subscribe(function (competency) {
            _this.competencyChart.drawChart(competency);
        });
    };
    CompetencyProfileChartContainerComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.ViewChild(competency_profile_chart_component_1.CompetencyProfileChartComponent),
        __metadata("design:type", competency_profile_chart_component_1.CompetencyProfileChartComponent)
    ], CompetencyProfileChartContainerComponent.prototype, "competencyChart", void 0);
    __decorate([
        core_1.ViewChild(select_competency_dialog_component_1.SelectCompetencyDialog),
        __metadata("design:type", select_competency_dialog_component_1.SelectCompetencyDialog)
    ], CompetencyProfileChartContainerComponent.prototype, "selectCompetencyDilog", void 0);
    CompetencyProfileChartContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'competency-profile-chart-container',
            template: "<div class=\"card\">     <div class=\"card-header\">         <button pButton type=\"button\" label=\"{{'Select competency'|translate}}\" icon=\"ui-icon-open-in-browser\" class=\"green-btn\" (click)=\"selectCompetency()\"></button>     </div>     <select-competency-dialog></select-competency-dialog>     <competency-profile-chart></competency-profile-chart> </div>",
        }),
        chart_decorator_1.Chart({
            title: 'Competency profile chart',
        }),
        __metadata("design:paramtypes", [])
    ], CompetencyProfileChartContainerComponent);
    return CompetencyProfileChartContainerComponent;
}(base_component_1.BaseComponent));
exports.CompetencyProfileChartContainerComponent = CompetencyProfileChartContainerComponent;

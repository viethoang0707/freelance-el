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
var base_component_1 = require("../../shared/components/base/base.component");
var _ = require("underscore");
var chart_decorator_1 = require("./chart.decorator");
var chart_container_directive_1 = require("./chart-container.directive");
var ChartComponent = (function (_super) {
    __extends(ChartComponent, _super);
    function ChartComponent(componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        return _this;
    }
    ChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.charts = _.map(chart_decorator_1.ChartRegister.Instance.entries(), function (chart) {
            return {
                label: _this.translateService.instant(chart["title"]),
                value: chart["component"]
            };
        });
        if (this.charts.length) {
            this.selectedChart = this.charts[0].value;
            this.selectChart();
        }
    };
    ChartComponent.prototype.renderChartComponent = function (component) {
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        var viewContainerRef = this.container.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
    };
    ChartComponent.prototype.selectChart = function () {
        if (this.selectedChart)
            this.renderChartComponent(this.selectedChart);
    };
    __decorate([
        core_1.ViewChild(chart_container_directive_1.ChartContainerDirective),
        __metadata("design:type", chart_container_directive_1.ChartContainerDirective)
    ], ChartComponent.prototype, "container", void 0);
    ChartComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'chart',
            template: "<div class=\"card card-w-title\">   <h1>{{'Charts'|translate}}</h1>   <div class=\"ui-g\">      <div class=\"ui-g-3\" style=\"text-align:center\">         <p-listbox [options]=\"charts\" (onChange)=\"selectChart()\" [(ngModel)]=\"selectedChart\" [style]=\"{'width':'200px'}\"></p-listbox>     </div>     <div class=\"ui-g-9\" style=\"text-align:center\">          <ng-template chart-container></ng-template>     </div>   </div> </div>",
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], ChartComponent);
    return ChartComponent;
}(base_component_1.BaseComponent));
exports.ChartComponent = ChartComponent;

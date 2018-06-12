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
var report_decorator_1 = require("./report.decorator");
var report_container_directive_1 = require("./report-container.directive");
var constants_1 = require("../../shared/models/constants");
var ReportComponent = (function (_super) {
    __extends(ReportComponent, _super);
    function ReportComponent(componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        return _this;
    }
    ReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.items = [];
        _.each(constants_1.REPORT_CATEGORY, function (val, key) {
            _this.items.push({
                label: '-- ' + _this.translateService.instant(val) + ' --',
                value: null
            });
            _this.items = _this.items.concat(_.map(report_decorator_1.ReportRegister.Instance.lookup(key), function (report) {
                return {
                    label: _this.translateService.instant(report["title"]),
                    value: report["component"]
                };
            }));
        });
    };
    ReportComponent.prototype.renderReportComponent = function (component) {
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        var viewContainerRef = this.container.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
    };
    ReportComponent.prototype.selectReport = function () {
        if (this.selectedItem)
            this.renderReportComponent(this.selectedItem);
    };
    __decorate([
        core_1.ViewChild(report_container_directive_1.ReportContainerDirective),
        __metadata("design:type", report_container_directive_1.ReportContainerDirective)
    ], ReportComponent.prototype, "container", void 0);
    ReportComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'report',
            templateUrl: 'report.component.html',
            styleUrls: ['report.component.css'],
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], ReportComponent);
    return ReportComponent;
}(base_component_1.BaseComponent));
exports.ReportComponent = ReportComponent;
//# sourceMappingURL=report.component.js.map
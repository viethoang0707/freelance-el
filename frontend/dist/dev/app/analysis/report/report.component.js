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
        this.buildReportDropdownList();
        this.translateService.onLangChange.subscribe(function () {
            _this.buildReportDropdownList();
        });
    };
    ReportComponent.prototype.buildReportDropdownList = function () {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9yZXBvcnQvcmVwb3J0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBdUY7QUFFdkYsOEVBQTRFO0FBQzVFLDhCQUFnQztBQUVoQyx1REFBb0Q7QUFDcEQsMkVBQXdFO0FBQ3hFLDJEQUErRDtBQVMvRDtJQUFxQyxtQ0FBYTtJQU1qRCx5QkFBb0Isd0JBQWtEO1FBQXRFLFlBQ0MsaUJBQU8sU0FDUDtRQUZtQiw4QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCOztJQUV0RSxDQUFDO0lBRUQsa0NBQVEsR0FBUjtRQUFBLGlCQUtDO1FBSkEsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7WUFDNUMsS0FBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBRUQsaURBQXVCLEdBQXZCO1FBQUEsaUJBY0M7UUFiQSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsSUFBSSxDQUFDLDJCQUFlLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRztZQUNoQyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDSCxLQUFLLEVBQUUsS0FBSyxHQUFFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUUsS0FBSztnQkFDdkQsS0FBSyxFQUFDLElBQUk7YUFDYixDQUFDLENBQUM7WUFDSCxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsaUNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFVBQUMsTUFBTTtnQkFDekYsT0FBTztvQkFDTixLQUFLLEVBQUUsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JELEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDO2lCQUN6QixDQUFBO1lBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELCtDQUFxQixHQUFyQixVQUFzQixTQUFTO1FBQzlCLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hGLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztRQUN2RCxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN6QixJQUFJLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsc0NBQVksR0FBWjtRQUNDLElBQUksSUFBSSxDQUFDLFlBQVk7WUFDcEIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBdkNvQztRQUFwQyxnQkFBUyxDQUFDLHFEQUF3QixDQUFDO2tDQUFZLHFEQUF3QjtzREFBQztJQUo3RCxlQUFlO1FBTjNCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUNuQyxDQUFDO3lDQU82QywrQkFBd0I7T0FOMUQsZUFBZSxDQThDM0I7SUFBRCxzQkFBQztDQTlDRCxBQThDQyxDQTlDb0MsOEJBQWEsR0E4Q2pEO0FBOUNZLDBDQUFlIiwiZmlsZSI6ImFwcC9hbmFseXNpcy9yZXBvcnQvcmVwb3J0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IFJlcG9ydFJlZ2lzdGVyIH0gZnJvbSAnLi9yZXBvcnQuZGVjb3JhdG9yJztcbmltcG9ydCB7IFJlcG9ydENvbnRhaW5lckRpcmVjdGl2ZSB9IGZyb20gJy4vcmVwb3J0LWNvbnRhaW5lci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUkVQT1JUX0NBVEVHT1JZIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5cblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAncmVwb3J0Jyxcblx0dGVtcGxhdGVVcmw6ICdyZXBvcnQuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsncmVwb3J0LmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgUmVwb3J0Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0cHJpdmF0ZSBpdGVtczogU2VsZWN0SXRlbVtdO1xuXHRwcml2YXRlIHNlbGVjdGVkSXRlbTogYW55O1xuXHRAVmlld0NoaWxkKFJlcG9ydENvbnRhaW5lckRpcmVjdGl2ZSkgY29udGFpbmVyOiBSZXBvcnRDb250YWluZXJEaXJlY3RpdmU7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmJ1aWxkUmVwb3J0RHJvcGRvd25MaXN0KCk7XG5cdFx0dGhpcy50cmFuc2xhdGVTZXJ2aWNlLm9uTGFuZ0NoYW5nZS5zdWJzY3JpYmUoKCk9PiB7XG5cdFx0XHR0aGlzLmJ1aWxkUmVwb3J0RHJvcGRvd25MaXN0KCk7XG5cdFx0fSlcblx0fVxuXG5cdGJ1aWxkUmVwb3J0RHJvcGRvd25MaXN0KCkge1xuXHRcdHRoaXMuaXRlbXMgPSBbXTtcblx0XHRfLmVhY2goUkVQT1JUX0NBVEVHT1JZLCAodmFsLCBrZXkpPT4ge1xuXHRcdFx0dGhpcy5pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJy0tICcrIHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KHZhbCkgKycgLS0nLFxuICAgICAgICAgICAgICAgIHZhbHVlOm51bGxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuY29uY2F0KF8ubWFwKFJlcG9ydFJlZ2lzdGVyLkluc3RhbmNlLmxvb2t1cChrZXkpLCAocmVwb3J0KT0+IHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRsYWJlbDogdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQocmVwb3J0W1widGl0bGVcIl0pLFxuXHRcdFx0XHRcdHZhbHVlOiByZXBvcnRbXCJjb21wb25lbnRcIl1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pKTtcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlclJlcG9ydENvbXBvbmVudChjb21wb25lbnQpIHtcblx0XHRsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCk7XG5cdFx0bGV0IHZpZXdDb250YWluZXJSZWYgPSB0aGlzLmNvbnRhaW5lci52aWV3Q29udGFpbmVyUmVmO1xuXHRcdHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblx0XHRsZXQgY29tcG9uZW50UmVmID0gdmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG5cdH1cblxuXHRzZWxlY3RSZXBvcnQoKSB7XG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWRJdGVtKVxuXHRcdFx0dGhpcy5yZW5kZXJSZXBvcnRDb21wb25lbnQodGhpcy5zZWxlY3RlZEl0ZW0pO1xuXHR9XG5cblxufVxuIl19

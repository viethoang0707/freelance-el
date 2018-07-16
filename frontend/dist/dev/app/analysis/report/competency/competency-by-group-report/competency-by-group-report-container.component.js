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
var base_component_1 = require("../../../../shared/components/base/base.component");
var constants_1 = require("../../../../shared/models/constants");
var report_decorator_1 = require("../../report.decorator");
var select_multi_group_dialog_component_1 = require("../../../../shared/components/select-multi-group-dialog/select-multi-group-dialog.component");
var select_competency_dialog_component_1 = require("../../../../shared/components/select-competency-dialog/select-competency-dialog.component");
var competency_by_group_report_component_1 = require("./competency-by-group-report.component");
var CompetencyByGroupReportContainerComponent = (function (_super) {
    __extends(CompetencyByGroupReportContainerComponent, _super);
    function CompetencyByGroupReportContainerComponent() {
        var _this = _super.call(this) || this;
        _this.GROUP_CATEGORY = constants_1.GROUP_CATEGORY;
        return _this;
    }
    CompetencyByGroupReportContainerComponent.prototype.export = function () {
        this.competencyReport.export();
    };
    CompetencyByGroupReportContainerComponent.prototype.selectGroups = function () {
        var _this = this;
        this.groupDialog.show();
        this.groupDialog.onSelectGroups.first().subscribe(function (groups) {
            _this.groups = groups;
            if (_this.competency && _this, groups.length) {
                _this.competencyReport.clear();
                _this.competencyReport.render(_this.competency, _this.groups);
            }
        });
    };
    CompetencyByGroupReportContainerComponent.prototype.selectCompetency = function () {
        var _this = this;
        this.competencyDialog.show();
        this.competencyDialog.onSelectCompetency.first().subscribe(function (competency) {
            _this.competency = competency;
            if (_this.competency && _this.groups.length) {
                _this.competencyReport.clear();
                _this.competencyReport.render(_this.competency, _this.groups);
            }
        });
    };
    __decorate([
        core_1.ViewChild(select_multi_group_dialog_component_1.SelectMultiGroupDialog),
        __metadata("design:type", select_multi_group_dialog_component_1.SelectMultiGroupDialog)
    ], CompetencyByGroupReportContainerComponent.prototype, "groupDialog", void 0);
    __decorate([
        core_1.ViewChild(select_competency_dialog_component_1.SelectCompetencyDialog),
        __metadata("design:type", select_competency_dialog_component_1.SelectCompetencyDialog)
    ], CompetencyByGroupReportContainerComponent.prototype, "competencyDialog", void 0);
    __decorate([
        core_1.ViewChild(competency_by_group_report_component_1.CompetencyByGroupReportComponent),
        __metadata("design:type", competency_by_group_report_component_1.CompetencyByGroupReportComponent)
    ], CompetencyByGroupReportContainerComponent.prototype, "competencyReport", void 0);
    CompetencyByGroupReportContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'competency-by-group-report-container',
            templateUrl: 'competency-by-group-report-container.component.html',
        }),
        report_decorator_1.Report({
            title: 'Competency by group report',
            category: constants_1.REPORT_CATEGORY.COMPETENCY
        }),
        __metadata("design:paramtypes", [])
    ], CompetencyByGroupReportContainerComponent);
    return CompetencyByGroupReportContainerComponent;
}(base_component_1.BaseComponent));
exports.CompetencyByGroupReportContainerComponent = CompetencyByGroupReportContainerComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9yZXBvcnQvY29tcGV0ZW5jeS9jb21wZXRlbmN5LWJ5LWdyb3VwLXJlcG9ydC9jb21wZXRlbmN5LWJ5LWdyb3VwLXJlcG9ydC1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFtRTtBQUtuRSxvRkFBa0Y7QUFLbEYsaUVBQTJLO0FBQzNLLDJEQUFnRDtBQUNoRCxtSkFBcUk7QUFDckksZ0pBQW1JO0FBR25JLCtGQUEwRjtBQVcxRjtJQUErRCw2REFBYTtJQVl4RTtRQUFBLFlBQ0ksaUJBQU8sU0FDVjtRQVpELG9CQUFjLEdBQUksMEJBQWMsQ0FBQzs7SUFZakMsQ0FBQztJQUVELDBEQUFNLEdBQU47UUFDQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELGdFQUFZLEdBQVo7UUFBQSxpQkFTQztRQVJBLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBYztZQUMxRCxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUMzQixJQUFJLEtBQUksQ0FBQyxVQUFVLElBQUksS0FBSSxFQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDOUIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsVUFBVSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM5RDtRQUNSLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELG9FQUFnQixHQUFoQjtRQUFBLGlCQVNDO1FBUkEsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQyxVQUFzQjtZQUNwRixLQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUNwQixJQUFJLEtBQUksQ0FBQyxVQUFVLElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDOUIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsVUFBVSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM5RDtRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ0QsQ0FBQztJQWpDK0I7UUFBbEMsZ0JBQVMsQ0FBQyw0REFBc0IsQ0FBQztrQ0FBYyw0REFBc0I7a0ZBQUM7SUFDakM7UUFBbEMsZ0JBQVMsQ0FBQywyREFBc0IsQ0FBQztrQ0FBbUIsMkRBQXNCO3VGQUFDO0lBQy9CO1FBQTVDLGdCQUFTLENBQUMsdUVBQWdDLENBQUM7a0NBQWtCLHVFQUFnQzt1RkFBQztJQVR0Rix5Q0FBeUM7UUFUckQsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsc0NBQXNDO1lBQ25ELFdBQVcsRUFBRSxxREFBcUQ7U0FDbEUsQ0FBQztRQUNELHlCQUFNLENBQUM7WUFDSixLQUFLLEVBQUMsNEJBQTRCO1lBQ2xDLFFBQVEsRUFBQywyQkFBZSxDQUFDLFVBQVU7U0FDdEMsQ0FBQzs7T0FDVyx5Q0FBeUMsQ0EwQ3JEO0lBQUQsZ0RBQUM7Q0ExQ0QsQUEwQ0MsQ0ExQzhELDhCQUFhLEdBMEMzRTtBQTFDWSw4RkFBeUMiLCJmaWxlIjoiYXBwL2FuYWx5c2lzL3JlcG9ydC9jb21wZXRlbmN5L2NvbXBldGVuY3ktYnktZ3JvdXAtcmVwb3J0L2NvbXBldGVuY3ktYnktZ3JvdXAtcmVwb3J0LWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBSZXBvcnRVdGlscyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3JlcG9ydC51dGlscyc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IENvbXBldGVuY3kgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb21wZXRlbmN5Lm1vZGVsJztcbmltcG9ydCB7IENvdXJzZUxvZyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2xvZy5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VNZW1iZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtbWVtYmVyLm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBFWFBPUlRfREFURVRJTUVfRk9STUFULCBSRVBPUlRfQ0FURUdPUlksIEdST1VQX0NBVEVHT1JZLCBDT1VSU0VfTU9ERSwgQ09VUlNFX01FTUJFUl9FTlJPTExfU1RBVFVTLCBFWFBPUlRfREFURV9GT1JNQVQgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IFJlcG9ydCB9IGZyb20gJy4uLy4uL3JlcG9ydC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgU2VsZWN0TXVsdGlHcm91cERpYWxvZyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC1tdWx0aS1ncm91cC1kaWFsb2cvc2VsZWN0LW11bHRpLWdyb3VwLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0Q29tcGV0ZW5jeURpYWxvZyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC1jb21wZXRlbmN5LWRpYWxvZy9zZWxlY3QtY29tcGV0ZW5jeS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFRpbWVDb252ZXJ0UGlwZX0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3BpcGVzL3RpbWUucGlwZSc7XG5pbXBvcnQgeyBFeGNlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvZXhjZWwuc2VydmljZSc7XG5pbXBvcnQgeyBDb21wZXRlbmN5QnlHcm91cFJlcG9ydENvbXBvbmVudCB9IGZyb20gJy4vY29tcGV0ZW5jeS1ieS1ncm91cC1yZXBvcnQuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2NvbXBldGVuY3ktYnktZ3JvdXAtcmVwb3J0LWNvbnRhaW5lcicsXG5cdHRlbXBsYXRlVXJsOiAnY29tcGV0ZW5jeS1ieS1ncm91cC1yZXBvcnQtY29udGFpbmVyLmNvbXBvbmVudC5odG1sJyxcbn0pXG5AUmVwb3J0KHtcbiAgICB0aXRsZTonQ29tcGV0ZW5jeSBieSBncm91cCByZXBvcnQnLFxuICAgIGNhdGVnb3J5OlJFUE9SVF9DQVRFR09SWS5DT01QRVRFTkNZXG59KVxuZXhwb3J0IGNsYXNzIENvbXBldGVuY3lCeUdyb3VwUmVwb3J0Q29udGFpbmVyQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudHtcblxuICAgIEdST1VQX0NBVEVHT1JZID0gIEdST1VQX0NBVEVHT1JZO1xuXG4gICAgcHJpdmF0ZSBncm91cHM6IEdyb3VwW107XG4gICAgcHJpdmF0ZSBjb21wZXRlbmN5OiBDb21wZXRlbmN5O1xuXG5cdEBWaWV3Q2hpbGQoU2VsZWN0TXVsdGlHcm91cERpYWxvZykgZ3JvdXBEaWFsb2c6IFNlbGVjdE11bHRpR3JvdXBEaWFsb2c7XG4gICAgQFZpZXdDaGlsZChTZWxlY3RDb21wZXRlbmN5RGlhbG9nKSBjb21wZXRlbmN5RGlhbG9nOiBTZWxlY3RDb21wZXRlbmN5RGlhbG9nO1xuICAgIEBWaWV3Q2hpbGQoQ29tcGV0ZW5jeUJ5R3JvdXBSZXBvcnRDb21wb25lbnQpIGNvbXBldGVuY3lSZXBvcnQ6Q29tcGV0ZW5jeUJ5R3JvdXBSZXBvcnRDb21wb25lbnQ7XG4gICAgXG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZXhwb3J0KCkge1xuICAgIFx0dGhpcy5jb21wZXRlbmN5UmVwb3J0LmV4cG9ydCgpO1xuICAgIH1cblxuICAgIHNlbGVjdEdyb3VwcygpIHtcbiAgICBcdHRoaXMuZ3JvdXBEaWFsb2cuc2hvdygpO1xuICAgIFx0dGhpcy5ncm91cERpYWxvZy5vblNlbGVjdEdyb3Vwcy5maXJzdCgpLnN1YnNjcmliZSgoZ3JvdXBzOkdyb3VwW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzID0gZ3JvdXBzO1xuICAgIFx0XHRpZiAodGhpcy5jb21wZXRlbmN5ICYmIHRoaXMsZ3JvdXBzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcGV0ZW5jeVJlcG9ydC5jbGVhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcGV0ZW5jeVJlcG9ydC5yZW5kZXIodGhpcy5jb21wZXRlbmN5LCB0aGlzLmdyb3Vwcyk7XG4gICAgICAgICAgICB9XG4gICAgXHR9KTtcbiAgICB9XG5cbiAgICBzZWxlY3RDb21wZXRlbmN5KCkge1xuICAgIFx0dGhpcy5jb21wZXRlbmN5RGlhbG9nLnNob3coKTtcbiAgICBcdHRoaXMuY29tcGV0ZW5jeURpYWxvZy5vblNlbGVjdENvbXBldGVuY3kuZmlyc3QoKS5zdWJzY3JpYmUoKGNvbXBldGVuY3k6IENvbXBldGVuY3kpID0+IHtcblx0XHRcdHRoaXMuY29tcGV0ZW5jeSA9IGNvbXBldGVuY3k7XG4gICAgICAgICAgICBpZiAodGhpcy5jb21wZXRlbmN5ICYmIHRoaXMuZ3JvdXBzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcGV0ZW5jeVJlcG9ydC5jbGVhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcGV0ZW5jeVJlcG9ydC5yZW5kZXIodGhpcy5jb21wZXRlbmN5LCB0aGlzLmdyb3Vwcyk7XG4gICAgICAgICAgICB9XG5cdFx0fSk7XG4gICAgfVxuXG59XG4iXX0=

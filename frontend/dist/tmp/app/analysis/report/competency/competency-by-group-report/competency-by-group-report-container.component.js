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
            template: "<div class=\"ui-g content\">     <div class=\"ui-g-12\">         <p-toolbar>             <div class=\"ui-toolbar-group-left\">                 <button pButton type=\"button\" label=\"{{'Select groups'|translate}}\" icon=\"ui-icon-open-in-browser\" class=\"green-btn\"                     (click)=\"selectGroups()\"></button>                 <button pButton type=\"button\" label=\"{{'Select individual users'|translate}}\" icon=\"ui-icon-open-in-browser\" class=\"green-btn\"                     (click)=\"selectCompetency()\"></button>             </div>             <div class=\"ui-toolbar-group-right\">                 <button pButton type=\"button\" label=\"{{'Export'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-file-download\" (click)=\"export()\"></button>             </div>         </p-toolbar>         <competency-by-group-report></competency-by-group-report>         <select-multi-group-dialog [category]=\"GROUP_CATEGORY.USER\"></select-multi-group-dialog>         <select-competency-dialog></select-competency-dialog>     </div> </div>",
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

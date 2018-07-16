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
var common_1 = require("@angular/common");
var report_utils_1 = require("../../../../shared/helpers/report.utils");
var base_component_1 = require("../../../../shared/components/base/base.component");
var competency_model_1 = require("../../../../shared/models/elearning/competency.model");
var competency_level_model_1 = require("../../../../shared/models/elearning/competency-level.model");
var _ = require("underscore");
var time_pipe_1 = require("../../../../shared/pipes/time.pipe");
var excel_service_1 = require("../../../../shared/services/excel.service");
var base_model_1 = require("../../../../shared/models/base.model");
var achievement_model_1 = require("../../../../shared/models/elearning/achievement.model");
var CompetencyByGroupReportComponent = (function (_super) {
    __extends(CompetencyByGroupReportComponent, _super);
    function CompetencyByGroupReportComponent(excelService, datePipe, timePipe) {
        var _this = _super.call(this) || this;
        _this.excelService = excelService;
        _this.datePipe = datePipe;
        _this.timePipe = timePipe;
        _this.reportUtils = new report_utils_1.ReportUtils();
        _this.competency = new competency_model_1.Competency();
        _this.levels = [];
        return _this;
    }
    CompetencyByGroupReportComponent.prototype.ngOnInit = function () {
    };
    CompetencyByGroupReportComponent.prototype.clear = function () {
        this.records = [];
    };
    CompetencyByGroupReportComponent.prototype.export = function () {
        var _this = this;
        var output = _.map(this.records, function (record) {
            var exportRow = { 'Group': record['group_name'] };
            _.each(_this.levels, function (level) {
                exportRow[level.name] = record[level.id];
            });
            return exportRow;
        });
        this.excelService.exportAsExcelFile(output, 'competency_by_group_report');
    };
    CompetencyByGroupReportComponent.prototype.render = function (competency, groups) {
        var _this = this;
        this.clear();
        this.competency = competency;
        competency_level_model_1.CompetencyLevel.listByCompetency(this, this.competency.id).subscribe(function (levels) {
            _this.levels = levels;
            _this.generateReport(competency, groups);
        });
    };
    CompetencyByGroupReportComponent.prototype.generateReport = function (competency, groups) {
        var _this = this;
        var apiList = [];
        for (var i = 0; i < groups.length; i++) {
            apiList.push(achievement_model_1.Achivement.__api__listByGroup(groups[i].id));
        }
        ;
        base_model_1.BaseModel.bulk_search.apply(base_model_1.BaseModel, [this].concat(apiList)).subscribe(function (jsonArr) {
            for (var i = 0; i < groups.length; i++) {
                var skills = achievement_model_1.Achivement.toArray(jsonArr[i]);
                var record = _this.generateReportRow(groups[i], skills);
                _this.records.push(record);
            }
        });
    };
    CompetencyByGroupReportComponent.prototype.generateReportRow = function (group, achievements) {
        var record = {};
        record["group_name"] = group.name;
        _.each(this.levels, function (level) {
            record[level.id] = 0;
        });
        var skillSets = _.groupBy(achievements, 'user_id');
        _.each(skillSets, function (skillSet) {
            var skill = _.max(skillSet, function (obj) {
                return obj.date_acquire.getTime();
            });
            record[skill.competency_level_id] += 1;
        });
        return record;
    };
    CompetencyByGroupReportComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'competency-by-group-report',
            template: "<div class=\"ui-g content\">     <div class=\"ui-g-12 removePd\">         <p-table #dataTable [value]=\"records\" [responsive]=\"true\" sortField=\"user_login\" sortMode=\"single\" (onSort)=\"onSort()\">             <ng-template pTemplate=\"caption\">                 {{'Competency by group report'|translate}}             </ng-template>             <ng-template pTemplate=\"header\">                 <tr>                     <th rowspan=\"2\">{{'Group'|translate}}</th>                     <th colspan=\"levels.length\">{{competency.name}}</th>                 </tr>                 <tr>                     <th *ngFor=\"let level of levels\">{{level.name}}</th>                 </tr>             </ng-template>             <ng-template pTemplate=\"body\" let-rowData let-rowIndex=\"rowIndex\">                 <tr>                     <td>{{rowData.group_name}}</td>                     <td *ngFor=\"let level of levels\">{{rowData[level.id]}}</td>                 </tr>             </ng-template>             <ng-template pTemplate=\"summary\">                 {{'Total records'|translate}} : {{records?.length}}             </ng-template>         </p-table>     </div> </div>",
            styles: [".content{position:relative}"],
        }),
        __metadata("design:paramtypes", [excel_service_1.ExcelService, common_1.DatePipe, time_pipe_1.TimeConvertPipe])
    ], CompetencyByGroupReportComponent);
    return CompetencyByGroupReportComponent;
}(base_component_1.BaseComponent));
exports.CompetencyByGroupReportComponent = CompetencyByGroupReportComponent;

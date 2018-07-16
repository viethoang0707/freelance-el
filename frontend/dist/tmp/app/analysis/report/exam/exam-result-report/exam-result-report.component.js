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
var exam_model_1 = require("../../../../shared/models/elearning/exam.model");
var base_component_1 = require("../../../../shared/components/base/base.component");
var log_model_1 = require("../../../../shared/models/elearning/log.model");
var exam_member_model_1 = require("../../../../shared/models/elearning/exam-member.model");
var _ = require("underscore");
var constants_1 = require("../../../../shared/models/constants");
var excel_service_1 = require("../../../../shared/services/excel.service");
var base_model_1 = require("../../../../shared/models/base.model");
var exam_record_model_1 = require("../../../../shared/models/elearning/exam-record.model");
var ExamResultReportComponent = (function (_super) {
    __extends(ExamResultReportComponent, _super);
    function ExamResultReportComponent(excelService, datePipe) {
        var _this = _super.call(this) || this;
        _this.excelService = excelService;
        _this.datePipe = datePipe;
        _this.reportUtils = new report_utils_1.ReportUtils();
        return _this;
    }
    ExamResultReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        exam_model_1.Exam.all(this).subscribe(function (exams) {
            _this.exams = exams;
        });
    };
    ExamResultReportComponent.prototype.clear = function () {
        this.records = [];
    };
    ExamResultReportComponent.prototype.export = function () {
        var output = _.map(this.records, function (record) {
            return { 'Name': record['user_name'], 'Login': record['user_login'], 'User group': record['user_group'], 'Attempt date': record['date_attempt'], 'Score': record['score'], 'Result': record['result'] };
        });
        this.excelService.exportAsExcelFile(output, 'course_by_member_report');
    };
    ExamResultReportComponent.prototype.render = function (exam) {
        var _this = this;
        this.clear();
        base_model_1.BaseModel
            .bulk_search(this, exam_member_model_1.ExamMember.__api__listCandidateByExam(exam.id), exam_record_model_1.ExamRecord.__api__listByExam(exam.id), log_model_1.ExamLog.__api__listByExam(exam.id))
            .subscribe(function (jsonArr) {
            var members = exam_member_model_1.ExamMember.toArray(jsonArr[0]);
            var records = exam_record_model_1.ExamRecord.toArray(jsonArr[1]);
            var logs = log_model_1.ExamLog.toArray(jsonArr[2]);
            _this.records = _this.generateReport(exam, records, logs, members);
        });
    };
    ExamResultReportComponent.prototype.generateReport = function (exam, records, logs, members) {
        var _this = this;
        var rows = [];
        _.each(members, function (member) {
            var userLogs = _.filter(logs, function (log) {
                return log.user_id == member.user_id;
            });
            var examRecord = _.find(records, function (obj) {
                return obj.member_id == member.id;
            });
            rows.push(_this.generateReportRow(exam, member, examRecord, userLogs));
        });
        return rows;
    };
    ExamResultReportComponent.prototype.generateReportRow = function (exam, member, examRecord, logs) {
        var record = {};
        record["user_login"] = member.login;
        record["user_name"] = member.name;
        record["user_group"] = member.group_id__DESC__;
        if (examRecord) {
            record["score"] = examRecord.score;
            record["grade"] = examRecord.grade;
        }
        if (logs && logs.length) {
            var result = this.reportUtils.analyzeExamMemberActivity(logs);
            if (result[0])
                record["date_attempt"] = this.datePipe.transform(result[0], constants_1.EXPORT_DATE_FORMAT);
        }
        return record;
    };
    ExamResultReportComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-result-report',
            template: "    <div class=\"ui-g\">         <div class=\"ui-g-12 removePd\">             <p-table #dataTable [value]=\"records\" [responsive]=\"true\">                 <ng-template pTemplate=\"caption\">                 \t{{'Exam result report'|translate}}                 </ng-template>                 <ng-template pTemplate=\"header\">                     <tr>                         <th>{{'User name'|translate}}</th>                         <th>{{'User login'|translate}}</th>                         <th>{{'User group'|translate}}</th>                         <th>{{'Attempt date'|translate}}</th>                         <th>{{'Score'|translate}}</th>                         <th>{{'Grade'|translate}}</th>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"body\" let-rowData let-rowIndex=\"rowIndex\">         \t\t\t<tr>                         <td>{{rowData.user_name}}</td>                         <td>{{rowData.user_login}}</td>                         <td>{{rowData.user_group}}</td>                         <td>{{rowData.date_attempt}}</td>                         <td>{{rowData.score}}</td>                         <td>{{rowData.grade}}</td>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"summary\">                     {{'Total records'|translate}} : {{records?.length}}                 </ng-template>             </p-table>         </div>     </div>",
        }),
        __metadata("design:paramtypes", [excel_service_1.ExcelService, common_1.DatePipe])
    ], ExamResultReportComponent);
    return ExamResultReportComponent;
}(base_component_1.BaseComponent));
exports.ExamResultReportComponent = ExamResultReportComponent;

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
var log_model_1 = require("../../../../shared/models/elearning/log.model");
var course_member_model_1 = require("../../../../shared/models/elearning/course-member.model");
var _ = require("underscore");
var constants_1 = require("../../../../shared/models/constants");
var time_pipe_1 = require("../../../../shared/pipes/time.pipe");
var excel_service_1 = require("../../../../shared/services/excel.service");
var base_model_1 = require("../../../../shared/models/base.model");
var CourseByMemberReportComponent = (function (_super) {
    __extends(CourseByMemberReportComponent, _super);
    function CourseByMemberReportComponent(excelService, datePipe, timePipe) {
        var _this = _super.call(this) || this;
        _this.excelService = excelService;
        _this.datePipe = datePipe;
        _this.timePipe = timePipe;
        _this.GROUP_CATEGORY = constants_1.GROUP_CATEGORY;
        _this.COURSE_MODE = constants_1.COURSE_MODE;
        _this.COURSE_MEMBER_ENROLL_STATUS = constants_1.COURSE_MEMBER_ENROLL_STATUS;
        _this.reportUtils = new report_utils_1.ReportUtils();
        return _this;
    }
    CourseByMemberReportComponent.prototype.ngOnInit = function () {
    };
    CourseByMemberReportComponent.prototype.clear = function () {
        this.records = [];
    };
    CourseByMemberReportComponent.prototype.export = function () {
        var output = _.map(this.records, function (record) {
            return { 'User login': record['user_login'], 'User name': record['user_name'], 'Course name': record['course_name'], 'Course mode': record['course_mode'], 'Course code': record['course_code'], 'Enroll status': record['enroll_status'], 'Date register': record['date_register'], 'First attempt': record['first_attempt'], 'Last attempt': record['last_attempt'], 'Time spent': '' };
        });
        this.excelService.exportAsExcelFile(output, 'course_by_member_report');
    };
    CourseByMemberReportComponent.prototype.render = function (users) {
        this.clear();
        this.generateReport(users);
    };
    CourseByMemberReportComponent.prototype.generateReport = function (users) {
        var _this = this;
        var apiList = [];
        for (var i = 0; i < users.length; i++) {
            apiList.push(course_member_model_1.CourseMember.__api__listByUser(users[i].id));
            apiList.push(log_model_1.CourseLog.__api__userStudyActivity(users[i].id, null));
        }
        ;
        var records = [];
        base_model_1.BaseModel.bulk_search.apply(base_model_1.BaseModel, [this].concat(apiList)).subscribe(function (jsonArr) {
            for (var i = 0; i < users.length; i++) {
                var members = course_member_model_1.CourseMember.toArray(jsonArr[2 * i]);
                members = _.filter(members, function (member) {
                    return member.role == 'student';
                });
                var logs = log_model_1.CourseLog.toArray(jsonArr[2 * i + 1]);
                var memberRecords = _.map(members, function (member) {
                    var courseLogs = _.filter(logs, function (log) {
                        return log.course_id == member.course_id;
                    });
                    return _this.generateReportRow(member, courseLogs);
                });
                memberRecords = memberRecords.filter(function (memberRecord) {
                    return memberRecord.course_code !== '' && memberRecord.course_mode !== '' && memberRecord.course_name !== '';
                });
                records = records.concat(memberRecords);
            }
            _this.rowGroupMetadata = _this.reportUtils.createRowGroupMetaData(records, "user_login");
            _.each(records, function (record) {
                record["index"] = _this.rowGroupMetadata[record["user_login"]].index;
                record["size"] = _this.rowGroupMetadata[record["user_login"]].size;
            });
            _this.records = _.sortBy(records, function (record) {
                return +record["index"];
            });
        });
    };
    CourseByMemberReportComponent.prototype.generateReportRow = function (member, logs) {
        var record = {};
        record["user_login"] = member.login;
        record["user_name"] = member.name;
        record["course_name"] = member.course_name;
        record["course_mode"] = member.course_mode;
        record["course_code"] = member.course_code;
        record["enroll_status"] = member.enroll_status;
        record["date_register"] = this.datePipe.transform(member.date_register, constants_1.EXPORT_DATE_FORMAT);
        var result = this.reportUtils.analyzeCourseMemberActivity(logs);
        if (result[0] != Infinity)
            record["first_attempt"] = this.datePipe.transform(result[0], constants_1.EXPORT_DATE_FORMAT);
        else
            record["first_attempt"] = '';
        if (result[1] != Infinity)
            record["last_attempt"] = this.datePipe.transform(result[1], constants_1.EXPORT_DATE_FORMAT);
        else
            record["last_attempt"] = '';
        if (!Number.isNaN(result[2]))
            record["time_spent"] = this.timePipe.transform(+(result[2]), 'min');
        else
            record["time_spent"] = 0;
        return record;
    };
    CourseByMemberReportComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-by-member-report',
            template: "<div class=\"ui-g content\">     <div class=\"ui-g-12 removePd\">         <p-table #dataTable [value]=\"records\" [responsive]=\"true\">             <ng-template pTemplate=\"caption\">                 {{'Course by member report'|translate}}             </ng-template>             <ng-template pTemplate=\"header\">                 <tr>                     <th colspan=\"2\">{{'Course member'|translate}}</th>                     <th colspan=\"3\">{{'Course'|translate}}</th>                     <th colspan=\"5\">{{'Status'|translate}}</th>                 </tr>                 <tr>                     <th>{{'Login'|translate}}</th>                     <th>{{'Name'|translate}}</th>                     <th>{{'Code'|translate}}</th>                     <th>{{'Name'|translate}}</th>                     <th>{{'Mode'|translate}}</th>                     <th>{{'Register date'|translate}}</th>                     <th>{{'First attempt'|translate}}</th>                     <th>{{'Last attempt'|translate}}</th>                     <th>{{'Enroll status'|translate}}</th>                     <th>{{'Time spent (mintes)'|translate}}</th>                 </tr>             </ng-template>             <ng-template pTemplate=\"body\" let-rowData let-rowIndex=\"rowIndex\">                 <tr>                     <td *ngIf=\"rowData.index == rowIndex\" [attr.rowspan]=\"rowData.size\">                         {{rowData.user_login}}                     </td>                     <td *ngIf=\"rowData.index == rowIndex\" [attr.rowspan]=\"rowData.size\">                         {{rowData.user_name}}                     </td>                     <td>{{rowData.course_code}} {{rowIndex}} {{rowData.index}}</td>                     <td>{{rowData.course_name}}</td>                     <td>{{COURSE_MODE[rowData.course_mode] | translate}}</td>                     <td>{{rowData.date_register}}</td>                     <td>{{rowData.first_attempt}}</td>                     <td>{{rowData.last_attempt}}</td>                     <td>{{COURSE_MEMBER_ENROLL_STATUS[rowData.enroll_status] | translate}}</td>                     <td>{{rowData.time_spent}}</td>                 </tr>             </ng-template>             <ng-template pTemplate=\"summary\">                 {{'Total records'|translate}} : {{records?.length}}             </ng-template>         </p-table>     </div> </div>",
            styles: [".content{position:relative}"],
        }),
        __metadata("design:paramtypes", [excel_service_1.ExcelService, common_1.DatePipe, time_pipe_1.TimeConvertPipe])
    ], CourseByMemberReportComponent);
    return CourseByMemberReportComponent;
}(base_component_1.BaseComponent));
exports.CourseByMemberReportComponent = CourseByMemberReportComponent;

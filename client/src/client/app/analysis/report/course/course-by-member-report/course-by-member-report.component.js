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
var select_group_dialog_component_1 = require("../../../../shared/components/select-group-dialog/select-group-dialog.component");
var select_user_dialog_component_1 = require("../../../../shared/components/select-user-dialog/select-user-dialog.component");
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
        this.updateRowGroupMetaData();
    };
    CourseByMemberReportComponent.prototype.clear = function () {
        this.records = [];
    };
    CourseByMemberReportComponent.prototype.onSort = function () {
        this.updateRowGroupMetaData();
    };
    CourseByMemberReportComponent.prototype.updateRowGroupMetaData = function () {
        this.rowGroupMetadata = {};
        if (this.records) {
            for (var i = 0; i < this.records.length; i++) {
                var rowData = this.records[i];
                var brand = rowData.user_login;
                if (i == 0) {
                    this.rowGroupMetadata[brand] = { index: 0, size: 1 };
                }
                else {
                    var previousRowData = this.records[i - 1];
                    var previousRowGroup = previousRowData.brand;
                    if (brand === previousRowGroup)
                        this.rowGroupMetadata[brand].size++;
                    else
                        this.rowGroupMetadata[brand] = { index: i, size: 1 };
                }
            }
        }
    };
    CourseByMemberReportComponent.prototype.export = function () {
        var output = [];
        this.records.forEach(function (record) {
            var course = { 'User login': record['user_login'], 'User name': record['user_name'], 'Course name': record['course_name'], 'Course mode': record['course_mode'], 'Course code': record['course_code'], 'Enroll status': record['enroll_status'], 'Date register': record['date_register'], 'First attempt': record['first_attempt'], 'Last attempt': record['last_attempt'], 'Time spent': '' };
            output.push(course);
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
        base_model_1.BaseModel.bulk_search.apply(base_model_1.BaseModel, [this].concat(apiList)).subscribe(function (jsonArr) {
            for (var i = 0; i < users.length; i++) {
                var members = course_member_model_1.CourseMember.toArray(jsonArr[2 * i]);
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
                _this.records = _this.records.concat(memberRecords);
            }
            _this.rowGroupMetadata = _this.reportUtils.createRowGroupMetaData(_this.records, "user_login");
            _this.records.forEach(function (record) {
                record.index = _this.rowGroupMetadata[record.user_login].index;
                record.size = _this.rowGroupMetadata[record.user_login].size;
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
        if (result[1] != Infinity)
            record["last_attempt"] = this.datePipe.transform(result[1], constants_1.EXPORT_DATE_FORMAT);
        if (!Number.isNaN(result[2]))
            record["time_spent"] = this.timePipe.transform(+(result[2]), 'min');
        return record;
    };
    __decorate([
        core_1.ViewChild(select_group_dialog_component_1.SelectGroupDialog),
        __metadata("design:type", select_group_dialog_component_1.SelectGroupDialog)
    ], CourseByMemberReportComponent.prototype, "groupDialog", void 0);
    __decorate([
        core_1.ViewChild(select_user_dialog_component_1.SelectUsersDialog),
        __metadata("design:type", select_user_dialog_component_1.SelectUsersDialog)
    ], CourseByMemberReportComponent.prototype, "userDialog", void 0);
    CourseByMemberReportComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-by-member-report',
            templateUrl: 'course-by-member-report.component.html',
            styleUrls: ['course-by-member-report.component.css'],
        }),
        __metadata("design:paramtypes", [excel_service_1.ExcelService, common_1.DatePipe, time_pipe_1.TimeConvertPipe])
    ], CourseByMemberReportComponent);
    return CourseByMemberReportComponent;
}(base_component_1.BaseComponent));
exports.CourseByMemberReportComponent = CourseByMemberReportComponent;
//# sourceMappingURL=course-by-member-report.component.js.map
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
var MemberByCourseReportComponent = (function (_super) {
    __extends(MemberByCourseReportComponent, _super);
    function MemberByCourseReportComponent(excelService, datePipe, timePipe) {
        var _this = _super.call(this) || this;
        _this.excelService = excelService;
        _this.datePipe = datePipe;
        _this.timePipe = timePipe;
        _this.GROUP_CATEGORY = constants_1.GROUP_CATEGORY;
        _this.records = [];
        _this.summary = _this.generateReportFooter(_this.records);
        _this.reportUtils = new report_utils_1.ReportUtils();
        return _this;
    }
    MemberByCourseReportComponent.prototype.export = function () {
        var output = _.map(this.records, function (record) {
            return { 'Course code': record['course_code'], 'Course name': record['course_name'], 'Total': record['total_member'], 'Total registered': record['total_member_registered'], 'Percentage registered': record['percentage_member_registered'], 'Total in-progress': record['total_member_inprogress'], 'Percentage in-progress': record['percentage_member_inprogress'], 'Total completed': record['total_member_completed'], 'Percentage completed': record['percentage_member_inprogress'], 'Time': record['time_spent'] };
        });
        this.excelService.exportAsExcelFile(output, 'course_by_member_report');
    };
    MemberByCourseReportComponent.prototype.clear = function () {
        this.records = [];
        this.summary = {};
    };
    MemberByCourseReportComponent.prototype.render = function (courses) {
        this.clear();
        this.generateReport(courses);
    };
    MemberByCourseReportComponent.prototype.generateReport = function (courses) {
        var _this = this;
        var apiList = [];
        for (var i = 0; i < courses.length; i++) {
            apiList.push(course_member_model_1.CourseMember.__api__listByCourse(courses[i].id));
            apiList.push(log_model_1.CourseLog.__api__courseActivity(courses[i].id));
        }
        ;
        base_model_1.BaseModel.bulk_search.apply(base_model_1.BaseModel, [this].concat(apiList)).subscribe(function (jsonArr) {
            for (var i = 0; i < courses.length; i++) {
                var members = course_member_model_1.CourseMember.toArray(jsonArr[2 * i]);
                members = _.filter(members, function (member) {
                    return member.role == 'student';
                });
                var logs = log_model_1.CourseLog.toArray(jsonArr[2 * i + 1]);
                var record = _this.generateReportRow(courses[i], members, logs);
                _this.records.push(record);
            }
            _this.summary = _this.generateReportFooter(_this.records);
        });
    };
    MemberByCourseReportComponent.prototype.generateReportRow = function (course, members, logs) {
        var record = {};
        record["course_name"] = course.name;
        record["course_code"] = course.code;
        var courseMemberData = this.reportUtils.analyseCourseMember(course, members);
        Object.assign(record, courseMemberData);
        var result = this.reportUtils.analyzeCourseMemberActivity(logs);
        record["time_spent"] = this.timePipe.transform(+result[2], 'min');
        return record;
    };
    MemberByCourseReportComponent.prototype.generateReportFooter = function (records) {
        var summary = {
            total_member_student: 0,
            total_member: 0,
            total_member_registered: 0,
            percentage_member_registered: 0,
            total_member_inprogress: 0,
            percentage_member_inprogress: 0,
            total_member_completed: 0,
            percentage_member_completed: 0,
            time_spent: 0
        };
        _.each(records, function (record) {
            _.each(summary, function (key) {
                summary[key] += record[key];
            });
        });
        return summary;
    };
    MemberByCourseReportComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'member-by-course-report',
            template: "<div class=\"ui-g content\">     <div class=\"ui-g-12 removePd\">         <p-table #dataTable [value]=\"records\" [responsive]=\"true\">             <ng-template pTemplate=\"caption\">                 {{'Member by course report'|translate}}             </ng-template>             <ng-template pTemplate=\"header\">                 <tr>                     <th colspan=\"2\" rowspan=\"2\">{{'Course'|translate}}</th>                     <th colspan=\"7\">{{'Course member'|translate}}</th>                     <th rowspan=\"3\">{{'Time'|translate}}</th>                 </tr>                 <tr>                     <th colspan=\"2\">{{'Registered'|translate}}</th>                     <th colspan=\"2\">{{'In-progress'|translate}}</th>                     <th colspan=\"2\">{{'Completed'|translate}}</th>                     <th rowspan=\"2\">{{'Total'|translate}}</th>                 </tr>                 <tr>                     <th>{{'Code'|translate}}</th>                     <th>{{'Name'|translate}}</th>                     <th>{{'Total'|translate}}</th>                     <th>{{'Percentage'|translate}}</th>                     <th>{{'Total'|translate}}</th>                     <th>{{'Percentage'|translate}}</th>                     <th>{{'Total'|translate}}</th>                     <th>{{'Percentage'|translate}}</th>                 </tr>             </ng-template>             <ng-template pTemplate=\"body\" let-record>                 <tr [pSelectableRow]=\"record\">                     <td>{{record.course_code}}</td>                     <td>{{record.course_name}}</td>                     <td>{{record.total_member_registered}}</td>                     <td>{{record.percentage_member_registered}}</td>                     <td>{{record.total_member_inprogress}}</td>                     <td>{{record.percentage_member_inprogress}}</td>                     <td>{{record.total_member_completed}}</td>                     <td>{{record.percentage_member_completed}}</td>                     <td>{{record.total_member_student}}</td>                     <td>{{record.total_time_spent | timeConvert:'min'}}</td>                 </tr>             </ng-template>             <ng-template pTemplate=\"summary\">                 {{'Total records'|translate}} : {{records?.length}}             </ng-template>         </p-table>     </div> </div>",
            styles: [".content{position:relative}"],
        }),
        __metadata("design:paramtypes", [excel_service_1.ExcelService, common_1.DatePipe, time_pipe_1.TimeConvertPipe])
    ], MemberByCourseReportComponent);
    return MemberByCourseReportComponent;
}(base_component_1.BaseComponent));
exports.MemberByCourseReportComponent = MemberByCourseReportComponent;

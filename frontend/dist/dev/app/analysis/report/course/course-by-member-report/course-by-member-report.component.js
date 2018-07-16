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
            templateUrl: 'course-by-member-report.component.html',
            styleUrls: ['course-by-member-report.component.css'],
        }),
        __metadata("design:paramtypes", [excel_service_1.ExcelService, common_1.DatePipe, time_pipe_1.TimeConvertPipe])
    ], CourseByMemberReportComponent);
    return CourseByMemberReportComponent;
}(base_component_1.BaseComponent));
exports.CourseByMemberReportComponent = CourseByMemberReportComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9yZXBvcnQvY291cnNlL2NvdXJzZS1ieS1tZW1iZXItcmVwb3J0L2NvdXJzZS1ieS1tZW1iZXItcmVwb3J0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFDcEUsMENBQTJDO0FBRzNDLHdFQUFzRTtBQUV0RSxvRkFBa0Y7QUFFbEYsMkVBQTBFO0FBQzFFLCtGQUF1RjtBQUN2Riw4QkFBZ0M7QUFDaEMsaUVBQTJLO0FBSTNLLGdFQUFxRTtBQUNyRSwyRUFBeUU7QUFHekUsbUVBQWlFO0FBU2pFO0lBQW1ELGlEQUFhO0lBVS9ELHVDQUFvQixZQUEwQixFQUFVLFFBQWtCLEVBQVUsUUFBeUI7UUFBN0csWUFDQyxpQkFBTyxTQUVQO1FBSG1CLGtCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsY0FBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLGNBQVEsR0FBUixRQUFRLENBQWlCO1FBUjdHLG9CQUFjLEdBQUcsMEJBQWMsQ0FBQztRQUM3QixpQkFBVyxHQUFHLHVCQUFXLENBQUM7UUFDMUIsaUNBQTJCLEdBQUcsdUNBQTJCLENBQUM7UUFRNUQsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDBCQUFXLEVBQUUsQ0FBQzs7SUFDdEMsQ0FBQztJQUVELGdEQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsNkNBQUssR0FBTDtRQUNDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCw4Q0FBTSxHQUFOO1FBQ0MsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUEsTUFBTTtZQUN0QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLGFBQWEsRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUs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U0FDcEQsQ0FBQzt5Q0FZaUMsNEJBQVksRUFBb0IsaUJBQVEsRUFBb0IsMkJBQWU7T0FWakcsNkJBQTZCLENBZ0d6QztJQUFELG9DQUFDO0NBaEdELEFBZ0dDLENBaEdrRCw4QkFBYSxHQWdHL0Q7QUFoR1ksc0VBQTZCIiwiZmlsZSI6ImFwcC9hbmFseXNpcy9yZXBvcnQvY291cnNlL2NvdXJzZS1ieS1tZW1iZXItcmVwb3J0L2NvdXJzZS1ieS1tZW1iZXItcmVwb3J0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IFJlcG9ydFV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvcmVwb3J0LnV0aWxzJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlTG9nIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvbG9nLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZU1lbWJlciB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IEVYUE9SVF9EQVRFVElNRV9GT1JNQVQsIFJFUE9SVF9DQVRFR09SWSwgR1JPVVBfQ0FURUdPUlksIENPVVJTRV9NT0RFLCBDT1VSU0VfTUVNQkVSX0VOUk9MTF9TVEFUVVMsIEVYUE9SVF9EQVRFX0ZPUk1BVCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgUmVwb3J0IH0gZnJvbSAnLi4vLi4vcmVwb3J0LmRlY29yYXRvcic7XG5pbXBvcnQgeyBTZWxlY3RHcm91cERpYWxvZyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC1ncm91cC1kaWFsb2cvc2VsZWN0LWdyb3VwLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0VXNlcnNEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtdXNlci1kaWFsb2cvc2VsZWN0LXVzZXItZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaW1lQ29udmVydFBpcGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvcGlwZXMvdGltZS5waXBlJztcbmltcG9ydCB7IEV4Y2VsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9leGNlbC5zZXJ2aWNlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnY291cnNlLWJ5LW1lbWJlci1yZXBvcnQnLFxuXHR0ZW1wbGF0ZVVybDogJ2NvdXJzZS1ieS1tZW1iZXItcmVwb3J0LmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJ2NvdXJzZS1ieS1tZW1iZXItcmVwb3J0LmNvbXBvbmVudC5jc3MnXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBDb3Vyc2VCeU1lbWJlclJlcG9ydENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdEdST1VQX0NBVEVHT1JZID0gR1JPVVBfQ0FURUdPUlk7XG4gICAgQ09VUlNFX01PREUgPSBDT1VSU0VfTU9ERTtcbiAgICBDT1VSU0VfTUVNQkVSX0VOUk9MTF9TVEFUVVMgPSBDT1VSU0VfTUVNQkVSX0VOUk9MTF9TVEFUVVM7XG5cblx0cHJpdmF0ZSByZWNvcmRzOiBhbnk7XG5cdHByaXZhdGUgcm93R3JvdXBNZXRhZGF0YTogYW55O1xuICAgIHByaXZhdGUgcmVwb3J0VXRpbHM6IFJlcG9ydFV0aWxzO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgZXhjZWxTZXJ2aWNlOiBFeGNlbFNlcnZpY2UsIHByaXZhdGUgZGF0ZVBpcGU6IERhdGVQaXBlLCBwcml2YXRlIHRpbWVQaXBlOiBUaW1lQ29udmVydFBpcGUpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMucmVwb3J0VXRpbHMgPSBuZXcgUmVwb3J0VXRpbHMoKTtcblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHR9XG5cblx0Y2xlYXIoKSB7XG5cdFx0dGhpcy5yZWNvcmRzID0gW107XG5cdH1cblxuXHRleHBvcnQoKSB7XG5cdFx0dmFyIG91dHB1dCA9IF8ubWFwKHRoaXMucmVjb3JkcywgcmVjb3JkPT4ge1xuXHRcdFx0cmV0dXJuIHsgJ1VzZXIgbG9naW4nOiByZWNvcmRbJ3VzZXJfbG9naW4nXSwgJ1VzZXIgbmFtZSc6IHJlY29yZFsndXNlcl9uYW1lJ10sICdDb3Vyc2UgbmFtZSc6IHJlY29yZFsnY291cnNlX25hbWUnXSwgJ0NvdXJzZSBtb2RlJzogcmVjb3JkWydjb3Vyc2VfbW9kZSddLCAnQ291cnNlIGNvZGUnOiByZWNvcmRbJ2NvdXJzZV9jb2RlJ10sICdFbnJvbGwgc3RhdHVzJzogcmVjb3JkWydlbnJvbGxfc3RhdHVzJ10sICdEYXRlIHJlZ2lzdGVyJzogcmVjb3JkWydkYXRlX3JlZ2lzdGVyJ10sICdGaXJzdCBhdHRlbXB0JzogcmVjb3JkWydmaXJzdF9hdHRlbXB0J10sICdMYXN0IGF0dGVtcHQnOiByZWNvcmRbJ2xhc3RfYXR0ZW1wdCddLCAnVGltZSBzcGVudCc6ICcnIH07XG5cdFx0fSlcblx0XHR0aGlzLmV4Y2VsU2VydmljZS5leHBvcnRBc0V4Y2VsRmlsZShvdXRwdXQsICdjb3Vyc2VfYnlfbWVtYmVyX3JlcG9ydCcpO1xuXHR9XG5cblxuXHRyZW5kZXIodXNlcnM6IFVzZXJbXSkge1xuXHRcdHRoaXMuY2xlYXIoKTtcblx0XHR0aGlzLmdlbmVyYXRlUmVwb3J0KHVzZXJzKTtcblx0fVxuXG5cdGdlbmVyYXRlUmVwb3J0KHVzZXJzOiBVc2VyW10pIHtcblx0XHR2YXIgYXBpTGlzdCA9IFtdO1xuXHRcdGZvciAodmFyIGk9MDtpPHVzZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRhcGlMaXN0LnB1c2goQ291cnNlTWVtYmVyLl9fYXBpX19saXN0QnlVc2VyKHVzZXJzW2ldLmlkKSk7XG5cdFx0XHRhcGlMaXN0LnB1c2goQ291cnNlTG9nLl9fYXBpX191c2VyU3R1ZHlBY3Rpdml0eSh1c2Vyc1tpXS5pZCxudWxsKSk7XG5cdFx0fTtcblx0XHR2YXIgcmVjb3JkcyA9IFtdO1xuXHRcdEJhc2VNb2RlbC5idWxrX3NlYXJjaCh0aGlzLCAuLi5hcGlMaXN0KS5zdWJzY3JpYmUoanNvbkFyciA9PiB7XG5cdFx0XHRmb3IgKHZhciBpPTA7aTx1c2Vycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgbWVtYmVycyA9IENvdXJzZU1lbWJlci50b0FycmF5KGpzb25BcnJbMippXSk7XG5cdFx0XHRcdG1lbWJlcnMgPSBfLmZpbHRlcihtZW1iZXJzLCAobWVtYmVyOkNvdXJzZU1lbWJlcik9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIG1lbWJlci5yb2xlID09J3N0dWRlbnQnO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0dmFyIGxvZ3MgPSBDb3Vyc2VMb2cudG9BcnJheShqc29uQXJyWzIqaSsxXSk7XG5cdFx0XHRcdHZhciBtZW1iZXJSZWNvcmRzID0gXy5tYXAobWVtYmVycywgKG1lbWJlcjogQ291cnNlTWVtYmVyKSA9PiB7XG5cdFx0XHRcdFx0dmFyIGNvdXJzZUxvZ3MgPSBfLmZpbHRlcihsb2dzLCAobG9nOiBDb3Vyc2VMb2cpID0+IHtcblx0XHRcdFx0XHRcdHJldHVybiBsb2cuY291cnNlX2lkID09IG1lbWJlci5jb3Vyc2VfaWQ7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZ2VuZXJhdGVSZXBvcnRSb3cobWVtYmVyLCBjb3Vyc2VMb2dzKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdG1lbWJlclJlY29yZHMgPSBtZW1iZXJSZWNvcmRzLmZpbHRlcigobWVtYmVyUmVjb3JkOiBhbnkpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gbWVtYmVyUmVjb3JkLmNvdXJzZV9jb2RlICE9PSAnJyAmJiBtZW1iZXJSZWNvcmQuY291cnNlX21vZGUgIT09ICcnICYmIG1lbWJlclJlY29yZC5jb3Vyc2VfbmFtZSAhPT0gJyc7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZWNvcmRzID0gcmVjb3Jkcy5jb25jYXQobWVtYmVyUmVjb3Jkcyk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnJvd0dyb3VwTWV0YWRhdGEgPSAgdGhpcy5yZXBvcnRVdGlscy5jcmVhdGVSb3dHcm91cE1ldGFEYXRhKHJlY29yZHMsXCJ1c2VyX2xvZ2luXCIpO1xuXHRcdFx0Xy5lYWNoKHJlY29yZHMsIHJlY29yZCA9PiB7XG5cdFx0XHRcdHJlY29yZFtcImluZGV4XCJdID0gdGhpcy5yb3dHcm91cE1ldGFkYXRhW3JlY29yZFtcInVzZXJfbG9naW5cIl1dLmluZGV4O1xuXHRcdFx0XHRyZWNvcmRbXCJzaXplXCJdID0gdGhpcy5yb3dHcm91cE1ldGFkYXRhW3JlY29yZFtcInVzZXJfbG9naW5cIl1dLnNpemU7XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMucmVjb3JkcyAgPSBfLnNvcnRCeShyZWNvcmRzICxyZWNvcmQ9PiB7XG5cdFx0XHRcdHJldHVybiArcmVjb3JkW1wiaW5kZXhcIl07XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGdlbmVyYXRlUmVwb3J0Um93KG1lbWJlcjogQ291cnNlTWVtYmVyLCBsb2dzOiBDb3Vyc2VMb2dbXSk6IGFueSB7XG5cdFx0dmFyIHJlY29yZCA9IHt9O1xuXHRcdHJlY29yZFtcInVzZXJfbG9naW5cIl0gPSBtZW1iZXIubG9naW47XG5cdFx0cmVjb3JkW1widXNlcl9uYW1lXCJdID0gbWVtYmVyLm5hbWU7XG5cdFx0cmVjb3JkW1wiY291cnNlX25hbWVcIl0gPSBtZW1iZXIuY291cnNlX25hbWU7XG5cdFx0cmVjb3JkW1wiY291cnNlX21vZGVcIl0gPSBtZW1iZXIuY291cnNlX21vZGU7XG5cdFx0cmVjb3JkW1wiY291cnNlX2NvZGVcIl0gPSBtZW1iZXIuY291cnNlX2NvZGU7XG5cdFx0cmVjb3JkW1wiZW5yb2xsX3N0YXR1c1wiXSA9IG1lbWJlci5lbnJvbGxfc3RhdHVzO1xuXHRcdHJlY29yZFtcImRhdGVfcmVnaXN0ZXJcIl0gPSB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShtZW1iZXIuZGF0ZV9yZWdpc3RlciwgRVhQT1JUX0RBVEVfRk9STUFUKTtcblx0XHR2YXIgcmVzdWx0ID0gdGhpcy5yZXBvcnRVdGlscy5hbmFseXplQ291cnNlTWVtYmVyQWN0aXZpdHkobG9ncyk7XG5cdFx0aWYgKHJlc3VsdFswXSAhPSBJbmZpbml0eSlcblx0XHRcdHJlY29yZFtcImZpcnN0X2F0dGVtcHRcIl0gPSB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShyZXN1bHRbMF0sIEVYUE9SVF9EQVRFX0ZPUk1BVCk7XG5cdFx0ZWxzZVxuXHRcdFx0cmVjb3JkW1wiZmlyc3RfYXR0ZW1wdFwiXT0nJztcblx0XHRpZiAocmVzdWx0WzFdICE9IEluZmluaXR5KVxuXHRcdFx0cmVjb3JkW1wibGFzdF9hdHRlbXB0XCJdID0gdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0ocmVzdWx0WzFdLCBFWFBPUlRfREFURV9GT1JNQVQpO1xuXHRcdGVsc2Vcblx0XHRcdHJlY29yZFtcImxhc3RfYXR0ZW1wdFwiXSA9Jyc7XG5cdFx0aWYgKCFOdW1iZXIuaXNOYU4ocmVzdWx0WzJdKSlcblx0XHRcdHJlY29yZFtcInRpbWVfc3BlbnRcIl0gPSB0aGlzLnRpbWVQaXBlLnRyYW5zZm9ybSgrKHJlc3VsdFsyXSksICdtaW4nKTtcblx0XHRlbHNlXG5cdFx0XHRyZWNvcmRbXCJ0aW1lX3NwZW50XCJdID0wO1xuXHRcdHJldHVybiByZWNvcmQ7XG5cdH1cblxufVxuIl19

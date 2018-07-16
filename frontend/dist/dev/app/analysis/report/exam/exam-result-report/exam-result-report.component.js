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
            templateUrl: 'exam-result-report.component.html',
        }),
        __metadata("design:paramtypes", [excel_service_1.ExcelService, common_1.DatePipe])
    ], ExamResultReportComponent);
    return ExamResultReportComponent;
}(base_component_1.BaseComponent));
exports.ExamResultReportComponent = ExamResultReportComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9yZXBvcnQvZXhhbS9leGFtLXJlc3VsdC1yZXBvcnQvZXhhbS1yZXN1bHQtcmVwb3J0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFDcEUsMENBQTJDO0FBRzNDLHdFQUFzRTtBQUN0RSw2RUFBc0U7QUFDdEUsb0ZBQWtGO0FBRWxGLDJFQUF3RTtBQUl4RSwyRkFBbUY7QUFDbkYsOEJBQWdDO0FBQ2hDLGlFQUEySztBQUszSywyRUFBeUU7QUFDekUsbUVBQWlFO0FBQ2pFLDJGQUFtRjtBQVFuRjtJQUErQyw2Q0FBYTtJQU94RCxtQ0FBb0IsWUFBMEIsRUFBVSxRQUFrQjtRQUExRSxZQUNJLGlCQUFPLFNBRVY7UUFIbUIsa0JBQVksR0FBWixZQUFZLENBQWM7UUFBVSxjQUFRLEdBQVIsUUFBUSxDQUFVO1FBRXRFLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBVyxFQUFFLENBQUM7O0lBQ3pDLENBQUM7SUFFRCw0Q0FBUSxHQUFSO1FBQUEsaUJBSUM7UUFIRyxpQkFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQzFCLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHlDQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsMENBQU0sR0FBTjtRQUNJLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFBLE1BQU07WUFDbkMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FB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QUU7WUFDckIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5RCxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSw4QkFBa0IsQ0FBQyxDQUFDO1NBQ3ZGO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQTNFUSx5QkFBeUI7UUFMckMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFdBQVcsRUFBRSxtQ0FBbUM7U0FDbkQsQ0FBQzt5Q0FRb0MsNEJBQVksRUFBb0IsaUJBQVE7T0FQakUseUJBQXlCLENBNkVyQztJQUFELGdDQUFDO0NBN0VELEFBNkVDLENBN0U4Qyw4QkFBYSxHQTZFM0Q7QUE3RVksOERBQXlCIiwiZmlsZSI6ImFwcC9hbmFseXNpcy9yZXBvcnQvZXhhbS9leGFtLXJlc3VsdC1yZXBvcnQvZXhhbS1yZXN1bHQtcmVwb3J0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IFJlcG9ydFV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvcmVwb3J0LnV0aWxzJztcbmltcG9ydCB7IEV4YW0gfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCB7IEV4YW1Mb2cgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9sb2cubW9kZWwnO1xuaW1wb3J0IHsgRXhhbUdyYWRlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1ncmFkZS5tb2RlbCc7XG5pbXBvcnQgeyBTdWJtaXNzaW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VibWlzc2lvbi5tb2RlbCc7XG5pbXBvcnQgeyBBbnN3ZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9hbnN3ZXIubW9kZWwnO1xuaW1wb3J0IHsgRXhhbU1lbWJlciB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tbWVtYmVyLm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBFWFBPUlRfREFURVRJTUVfRk9STUFULCBSRVBPUlRfQ0FURUdPUlksIEdST1VQX0NBVEVHT1JZLCBDT1VSU0VfTU9ERSwgQ09VUlNFX01FTUJFUl9FTlJPTExfU1RBVFVTLCBFWFBPUlRfREFURV9GT1JNQVQgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IFJlcG9ydCB9IGZyb20gJy4uLy4uL3JlcG9ydC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgU2VsZWN0R3JvdXBEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtZ3JvdXAtZGlhbG9nL3NlbGVjdC1ncm91cC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbGVjdFVzZXJzRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0LXVzZXItZGlhbG9nL3NlbGVjdC11c2VyLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGltZUNvbnZlcnRQaXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3BpcGVzL3RpbWUucGlwZSc7XG5pbXBvcnQgeyBFeGNlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvZXhjZWwuc2VydmljZSc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgRXhhbVJlY29yZCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tcmVjb3JkLm1vZGVsJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnZXhhbS1yZXN1bHQtcmVwb3J0JyxcbiAgICB0ZW1wbGF0ZVVybDogJ2V4YW0tcmVzdWx0LXJlcG9ydC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIEV4YW1SZXN1bHRSZXBvcnRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHByaXZhdGUgcmVjb3JkczogYW55O1xuICAgIHByaXZhdGUgZXhhbXM6IEV4YW1bXTtcbiAgICBwcml2YXRlIHNlbGVjdGVkRXhhbTogYW55O1xuICAgIHByaXZhdGUgcmVwb3J0VXRpbHM6IFJlcG9ydFV0aWxzO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBleGNlbFNlcnZpY2U6IEV4Y2VsU2VydmljZSwgcHJpdmF0ZSBkYXRlUGlwZTogRGF0ZVBpcGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5yZXBvcnRVdGlscyA9IG5ldyBSZXBvcnRVdGlscygpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBFeGFtLmFsbCh0aGlzKS5zdWJzY3JpYmUoZXhhbXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5leGFtcyA9IGV4YW1zO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5yZWNvcmRzID0gW107XG4gICAgfVxuXG4gICAgZXhwb3J0KCkge1xuICAgICAgICB2YXIgb3V0cHV0ID0gXy5tYXAodGhpcy5yZWNvcmRzLCByZWNvcmQgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgJ05hbWUnOiByZWNvcmRbJ3VzZXJfbmFtZSddLCAnTG9naW4nOiByZWNvcmRbJ3VzZXJfbG9naW4nXSwgJ1VzZXIgZ3JvdXAnOiByZWNvcmRbJ3VzZXJfZ3JvdXAnXSwgJ0F0dGVtcHQgZGF0ZSc6IHJlY29yZFsnZGF0ZV9hdHRlbXB0J10sICdTY29yZSc6IHJlY29yZFsnc2NvcmUnXSwgJ1Jlc3VsdCc6IHJlY29yZFsncmVzdWx0J10gfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZXhjZWxTZXJ2aWNlLmV4cG9ydEFzRXhjZWxGaWxlKG91dHB1dCwgJ2NvdXJzZV9ieV9tZW1iZXJfcmVwb3J0Jyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGV4YW06IEV4YW0pIHtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICBCYXNlTW9kZWxcbiAgICAgICAgICAgIC5idWxrX3NlYXJjaCh0aGlzLFxuICAgICAgICAgICAgICAgIEV4YW1NZW1iZXIuX19hcGlfX2xpc3RDYW5kaWRhdGVCeUV4YW0oZXhhbS5pZCksXG4gICAgICAgICAgICAgICAgRXhhbVJlY29yZC5fX2FwaV9fbGlzdEJ5RXhhbShleGFtLmlkKSxcbiAgICAgICAgICAgICAgICBFeGFtTG9nLl9fYXBpX19saXN0QnlFeGFtKGV4YW0uaWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShqc29uQXJyID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgbWVtYmVycyA9IEV4YW1NZW1iZXIudG9BcnJheShqc29uQXJyWzBdKTtcbiAgICAgICAgICAgICAgICB2YXIgcmVjb3JkcyA9IEV4YW1SZWNvcmQudG9BcnJheShqc29uQXJyWzFdKTtcbiAgICAgICAgICAgICAgICB2YXIgbG9ncyA9IEV4YW1Mb2cudG9BcnJheShqc29uQXJyWzJdKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29yZHMgPSB0aGlzLmdlbmVyYXRlUmVwb3J0KGV4YW0sIHJlY29yZHMsIGxvZ3MsIG1lbWJlcnMpO1xuICAgICAgICAgICAgfSlcbiAgICB9XG5cblxuICAgIGdlbmVyYXRlUmVwb3J0KGV4YW06IEV4YW0sIHJlY29yZHM6IEV4YW1SZWNvcmRbXSwgbG9nczogRXhhbUxvZ1tdLCBtZW1iZXJzOiBFeGFtTWVtYmVyW10pIHtcbiAgICAgICAgdmFyIHJvd3MgPSBbXTtcbiAgICAgICAgXy5lYWNoKG1lbWJlcnMsIChtZW1iZXI6IEV4YW1NZW1iZXIpID0+IHtcbiAgICAgICAgICAgIHZhciB1c2VyTG9ncyA9IF8uZmlsdGVyKGxvZ3MsIChsb2c6IEV4YW1Mb2cpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9nLnVzZXJfaWQgPT0gbWVtYmVyLnVzZXJfaWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBleGFtUmVjb3JkID0gXy5maW5kKHJlY29yZHMsIChvYmo6IEV4YW1SZWNvcmQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLm1lbWJlcl9pZCA9PSBtZW1iZXIuaWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJvd3MucHVzaCh0aGlzLmdlbmVyYXRlUmVwb3J0Um93KGV4YW0sIG1lbWJlciwgZXhhbVJlY29yZCwgdXNlckxvZ3MpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByb3dzO1xuICAgIH1cblxuICAgIGdlbmVyYXRlUmVwb3J0Um93KGV4YW06IEV4YW0sIG1lbWJlcjogRXhhbU1lbWJlciwgZXhhbVJlY29yZDogRXhhbVJlY29yZCwgbG9nczogRXhhbUxvZ1tdKTogYW55IHtcbiAgICAgICAgdmFyIHJlY29yZCA9IHt9O1xuICAgICAgICByZWNvcmRbXCJ1c2VyX2xvZ2luXCJdID0gbWVtYmVyLmxvZ2luO1xuICAgICAgICByZWNvcmRbXCJ1c2VyX25hbWVcIl0gPSBtZW1iZXIubmFtZTtcbiAgICAgICAgcmVjb3JkW1widXNlcl9ncm91cFwiXSA9IG1lbWJlci5ncm91cF9pZF9fREVTQ19fO1xuICAgICAgICBpZiAoZXhhbVJlY29yZCkge1xuICAgICAgICAgICAgcmVjb3JkW1wic2NvcmVcIl0gPSBleGFtUmVjb3JkLnNjb3JlO1xuICAgICAgICAgICAgcmVjb3JkW1wiZ3JhZGVcIl0gPSBleGFtUmVjb3JkLmdyYWRlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsb2dzICYmIGxvZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5yZXBvcnRVdGlscy5hbmFseXplRXhhbU1lbWJlckFjdGl2aXR5KGxvZ3MpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdFswXSlcbiAgICAgICAgICAgICAgICByZWNvcmRbXCJkYXRlX2F0dGVtcHRcIl0gPSB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShyZXN1bHRbMF0sIEVYUE9SVF9EQVRFX0ZPUk1BVCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVjb3JkO1xuICAgIH1cblxufVxuIl19

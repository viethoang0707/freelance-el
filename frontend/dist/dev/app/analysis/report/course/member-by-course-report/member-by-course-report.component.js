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
            templateUrl: 'member-by-course-report.component.html',
            styleUrls: ['member-by-course-report.component.css'],
        }),
        __metadata("design:paramtypes", [excel_service_1.ExcelService, common_1.DatePipe, time_pipe_1.TimeConvertPipe])
    ], MemberByCourseReportComponent);
    return MemberByCourseReportComponent;
}(base_component_1.BaseComponent));
exports.MemberByCourseReportComponent = MemberByCourseReportComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9yZXBvcnQvY291cnNlL21lbWJlci1ieS1jb3Vyc2UtcmVwb3J0L21lbWJlci1ieS1jb3Vyc2UtcmVwb3J0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFDcEUsMENBQTJDO0FBRzNDLHdFQUFzRTtBQUV0RSxvRkFBa0Y7QUFHbEYsMkVBQTBFO0FBQzFFLCtGQUF1RjtBQUN2Riw4QkFBZ0M7QUFDaEMsaUVBQTJLO0FBSTNLLGdFQUFxRTtBQUNyRSwyRUFBeUU7QUFDekUsbUVBQWlFO0FBUWpFO0lBQW1ELGlEQUFhO0lBUS9ELHVDQUFvQixZQUEwQixFQUFVLFFBQWtCLEVBQVUsUUFBeUI7UUFBN0csWUFDQyxpQkFBTyxTQUlQO1FBTG1CLGtCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsY0FBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLGNBQVEsR0FBUixRQUFRLENBQWlCO1FBTjFHLG9CQUFjLEdBQUcsMEJBQWMsQ0FBQztRQVFsQyxLQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkQsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDBCQUFXLEVBQUUsQ0FBQzs7SUFDdEMsQ0FBQztJQUVELDhDQUFNLEdBQU47UUFDQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBQSxNQUFNO1lBQ3RDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLGFBQWEsRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLENBQUMseUJBQXlCLENBQUMsRUFB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QUFXLEVBQUUsd0NBQXdDO1lBQ3JELFNBQVMsRUFBRSxDQUFDLHVDQUF1QyxDQUFDO1NBQ3BELENBQUM7eUNBU2lDLDRCQUFZLEVBQW9CLGlCQUFRLEVBQW9CLDJCQUFlO09BUmpHLDZCQUE2QixDQW9GekM7SUFBRCxvQ0FBQztDQXBGRCxBQW9GQyxDQXBGa0QsOEJBQWEsR0FvRi9EO0FBcEZZLHNFQUE2QiIsImZpbGUiOiJhcHAvYW5hbHlzaXMvcmVwb3J0L2NvdXJzZS9tZW1iZXItYnktY291cnNlLXJlcG9ydC9tZW1iZXItYnktY291cnNlLXJlcG9ydC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBSZXBvcnRVdGlscyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3JlcG9ydC51dGlscyc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VMb2cgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9sb2cubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgRVhQT1JUX0RBVEVUSU1FX0ZPUk1BVCwgUkVQT1JUX0NBVEVHT1JZLCBHUk9VUF9DQVRFR09SWSwgQ09VUlNFX01PREUsIENPVVJTRV9NRU1CRVJfRU5ST0xMX1NUQVRVUywgRVhQT1JUX0RBVEVfRk9STUFUIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBSZXBvcnQgfSBmcm9tICcuLi8uLi9yZXBvcnQuZGVjb3JhdG9yJztcbmltcG9ydCB7IFNlbGVjdEdyb3VwRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0LWdyb3VwLWRpYWxvZy9zZWxlY3QtZ3JvdXAtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWxlY3RDb3Vyc2VzRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0LWNvdXJzZS1kaWFsb2cvc2VsZWN0LWNvdXJzZS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFRpbWVDb252ZXJ0UGlwZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9waXBlcy90aW1lLnBpcGUnO1xuaW1wb3J0IHsgRXhjZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2V4Y2VsLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnbWVtYmVyLWJ5LWNvdXJzZS1yZXBvcnQnLFxuXHR0ZW1wbGF0ZVVybDogJ21lbWJlci1ieS1jb3Vyc2UtcmVwb3J0LmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJ21lbWJlci1ieS1jb3Vyc2UtcmVwb3J0LmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTWVtYmVyQnlDb3Vyc2VSZXBvcnRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuICAgIEdST1VQX0NBVEVHT1JZID0gR1JPVVBfQ0FURUdPUlk7XG5cblx0cHJpdmF0ZSByZWNvcmRzOiBhbnk7XG5cdHByaXZhdGUgc3VtbWFyeTogYW55O1xuXHRwcml2YXRlIHJlcG9ydFV0aWxzOiBSZXBvcnRVdGlscztcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGV4Y2VsU2VydmljZTogRXhjZWxTZXJ2aWNlLCBwcml2YXRlIGRhdGVQaXBlOiBEYXRlUGlwZSwgcHJpdmF0ZSB0aW1lUGlwZTogVGltZUNvbnZlcnRQaXBlKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnJlY29yZHMgPSBbXTtcblx0XHR0aGlzLnN1bW1hcnkgPSB0aGlzLmdlbmVyYXRlUmVwb3J0Rm9vdGVyKHRoaXMucmVjb3Jkcyk7XG5cdFx0dGhpcy5yZXBvcnRVdGlscyA9IG5ldyBSZXBvcnRVdGlscygpO1xuXHR9XG5cblx0ZXhwb3J0KCkge1xuXHRcdHZhciBvdXRwdXQgPSBfLm1hcCh0aGlzLnJlY29yZHMsIHJlY29yZD0+IHtcblx0XHRcdHJldHVybiB7ICdDb3Vyc2UgY29kZSc6IHJlY29yZFsnY291cnNlX2NvZGUnXSwgJ0NvdXJzZSBuYW1lJzogcmVjb3JkWydjb3Vyc2VfbmFtZSddLCAnVG90YWwnOiByZWNvcmRbJ3RvdGFsX21lbWJlciddLCAnVG90YWwgcmVnaXN0ZXJlZCc6IHJlY29yZFsndG90YWxfbWVtYmVyX3JlZ2lzdGVyZWQnXSwgJ1BlcmNlbnRhZ2UgcmVnaXN0ZXJlZCc6IHJlY29yZFsncGVyY2VudGFnZV9tZW1iZXJfcmVnaXN0ZXJlZCddLCAnVG90YWwgaW4tcHJvZ3Jlc3MnOiByZWNvcmRbJ3RvdGFsX21lbWJlcl9pbnByb2dyZXNzJ10sICdQZXJjZW50YWdlIGluLXByb2dyZXNzJzogcmVjb3JkWydwZXJjZW50YWdlX21lbWJlcl9pbnByb2dyZXNzJ10sICdUb3RhbCBjb21wbGV0ZWQnOiByZWNvcmRbJ3RvdGFsX21lbWJlcl9jb21wbGV0ZWQnXSwgJ1BlcmNlbnRhZ2UgY29tcGxldGVkJzogcmVjb3JkWydwZXJjZW50YWdlX21lbWJlcl9pbnByb2dyZXNzJ10sICdUaW1lJzogcmVjb3JkWyd0aW1lX3NwZW50J10gfTtcblx0XHR9KTtcblx0XHR0aGlzLmV4Y2VsU2VydmljZS5leHBvcnRBc0V4Y2VsRmlsZShvdXRwdXQsICdjb3Vyc2VfYnlfbWVtYmVyX3JlcG9ydCcpO1xuXHR9XG5cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLnJlY29yZHMgPSBbXTtcbiAgICAgICAgdGhpcy5zdW1tYXJ5ID0ge307XG4gICAgfVxuXG4gICAgcmVuZGVyKGNvdXJzZXM6Q291cnNlW10pIHtcblx0XHR0aGlzLmNsZWFyKCk7XG5cdFx0dGhpcy5nZW5lcmF0ZVJlcG9ydChjb3Vyc2VzKTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZVJlcG9ydChjb3Vyc2VzOkNvdXJzZVtdKXtcbiAgICAgICAgdmFyIGFwaUxpc3QgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaT0wO2k8Y291cnNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXBpTGlzdC5wdXNoKENvdXJzZU1lbWJlci5fX2FwaV9fbGlzdEJ5Q291cnNlKGNvdXJzZXNbaV0uaWQpKTtcbiAgICAgICAgICAgIGFwaUxpc3QucHVzaChDb3Vyc2VMb2cuX19hcGlfX2NvdXJzZUFjdGl2aXR5KGNvdXJzZXNbaV0uaWQpKTtcbiAgICAgICAgfTtcbiAgICAgICAgQmFzZU1vZGVsLmJ1bGtfc2VhcmNoKHRoaXMsIC4uLmFwaUxpc3QpLnN1YnNjcmliZShqc29uQXJyID0+IHtcbiAgICAgICAgICAgIGZvciAodmFyIGk9MDtpPGNvdXJzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbWVtYmVycyA9IENvdXJzZU1lbWJlci50b0FycmF5KGpzb25BcnJbMippXSk7XG4gICAgICAgICAgICAgICAgbWVtYmVycyA9IF8uZmlsdGVyKG1lbWJlcnMsIChtZW1iZXI6Q291cnNlTWVtYmVyKT0+IHtcblx0XHRcdFx0XHRyZXR1cm4gbWVtYmVyLnJvbGUgPT0nc3R1ZGVudCc7XG5cdFx0XHRcdH0pO1xuICAgICAgICAgICAgICAgIHZhciBsb2dzID0gQ291cnNlTG9nLnRvQXJyYXkoanNvbkFyclsyKmkrMV0pO1xuICAgICAgICAgICAgICAgIHZhciByZWNvcmQgPSB0aGlzLmdlbmVyYXRlUmVwb3J0Um93KGNvdXJzZXNbaV0sIG1lbWJlcnMsIGxvZ3MpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVjb3Jkcy5wdXNoKHJlY29yZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN1bW1hcnkgPSAgdGhpcy5nZW5lcmF0ZVJlcG9ydEZvb3Rlcih0aGlzLnJlY29yZHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblx0Z2VuZXJhdGVSZXBvcnRSb3coY291cnNlOiBDb3Vyc2UsIG1lbWJlcnM6IENvdXJzZU1lbWJlcltdLCBsb2dzOiBDb3Vyc2VMb2dbXSk6IGFueSB7XG5cdFx0dmFyIHJlY29yZCA9IHt9O1xuXHRcdHJlY29yZFtcImNvdXJzZV9uYW1lXCJdID0gY291cnNlLm5hbWU7XG5cdFx0cmVjb3JkW1wiY291cnNlX2NvZGVcIl0gPSBjb3Vyc2UuY29kZTtcblx0XHR2YXIgY291cnNlTWVtYmVyRGF0YSA9IHRoaXMucmVwb3J0VXRpbHMuYW5hbHlzZUNvdXJzZU1lbWJlcihjb3Vyc2UsIG1lbWJlcnMpO1xuXHRcdE9iamVjdC5hc3NpZ24ocmVjb3JkLCBjb3Vyc2VNZW1iZXJEYXRhKTtcblx0XHR2YXIgcmVzdWx0ID0gdGhpcy5yZXBvcnRVdGlscy5hbmFseXplQ291cnNlTWVtYmVyQWN0aXZpdHkobG9ncyk7XG5cdFx0cmVjb3JkW1widGltZV9zcGVudFwiXSA9IHRoaXMudGltZVBpcGUudHJhbnNmb3JtKCtyZXN1bHRbMl0sICdtaW4nKTtcblx0XHRyZXR1cm4gcmVjb3JkO1xuXHR9XG5cblx0Z2VuZXJhdGVSZXBvcnRGb290ZXIocmVjb3JkczogYW55KSB7XG5cdFx0dmFyIHN1bW1hcnkgPSB7XG5cdFx0XHR0b3RhbF9tZW1iZXJfc3R1ZGVudDogMCxcblx0XHRcdHRvdGFsX21lbWJlcjogMCxcblx0XHRcdHRvdGFsX21lbWJlcl9yZWdpc3RlcmVkOiAwLFxuXHRcdFx0cGVyY2VudGFnZV9tZW1iZXJfcmVnaXN0ZXJlZDogMCxcblx0XHRcdHRvdGFsX21lbWJlcl9pbnByb2dyZXNzOiAwLFxuXHRcdFx0cGVyY2VudGFnZV9tZW1iZXJfaW5wcm9ncmVzczogMCxcblx0XHRcdHRvdGFsX21lbWJlcl9jb21wbGV0ZWQ6IDAsXG5cdFx0XHRwZXJjZW50YWdlX21lbWJlcl9jb21wbGV0ZWQ6IDAsXG5cdFx0XHR0aW1lX3NwZW50OiAwXG5cdFx0fTtcblx0XHRfLmVhY2gocmVjb3JkcywgKHJlY29yZCkgPT4ge1xuXHRcdFx0Xy5lYWNoKHN1bW1hcnksIChrZXkpID0+IHtcblx0XHRcdFx0c3VtbWFyeVtrZXldICs9IHJlY29yZFtrZXldXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRyZXR1cm4gc3VtbWFyeTtcblx0fVxuXG59XG4iXX0=

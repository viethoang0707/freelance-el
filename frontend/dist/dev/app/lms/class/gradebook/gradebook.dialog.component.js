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
var base_component_1 = require("../../../shared/components/base/base.component");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var log_model_1 = require("../../../shared/models/elearning/log.model");
var report_utils_1 = require("../../../shared/helpers/report.utils");
var time_pipe_1 = require("../../../shared/pipes/time.pipe");
var answer_print_dialog_component_1 = require("../../exam/answer-print/answer-print.dialog.component");
var course_certificate_model_1 = require("../../../shared/models/elearning/course-certificate.model");
var course_certificate_dialog_component_1 = require("../../course/course-certificate/course-certificate.dialog.component");
var certificate_print_dialog_component_1 = require("../../course/certificate-print/certificate-print.dialog.component");
var project_submission_model_1 = require("../../../shared/models/elearning/project-submission.model");
var excel_service_1 = require("../../../shared/services/excel.service");
var base_model_1 = require("../../../shared/models/base.model");
var exam_record_model_1 = require("../../../shared/models/elearning/exam-record.model");
var GradebookDialog = (function (_super) {
    __extends(GradebookDialog, _super);
    function GradebookDialog(excelService, datePipe, timePipe) {
        var _this = _super.call(this) || this;
        _this.excelService = excelService;
        _this.datePipe = datePipe;
        _this.timePipe = timePipe;
        _this.exams = [];
        _this.projects = [];
        _this.stats = [];
        _this.reportUtils = new report_utils_1.ReportUtils();
        _this.member = new course_member_model_1.CourseMember();
        return _this;
    }
    GradebookDialog.prototype.ngOnInit = function () {
    };
    GradebookDialog.prototype.downloadScoreReport = function () {
        var _this = this;
        var header = [
            this.translateService.instant('Unit'),
            this.translateService.instant('Score'),
        ];
        var records = [];
        records = records.concat(_.map(this.exams, function (exam) {
            var examRecord = _this.getExamRecord(exam);
            return [exam.name, examRecord.score];
        }));
        records = records.concat(_.map(this.projects, function (project) {
            var submit = _this.getProjectSubmit(project);
            return [project.name, submit.score];
        }));
        this.excelService.exportAsExcelFile(header.concat(records), 'gradebook_report');
    };
    GradebookDialog.prototype.hide = function () {
        this.display = false;
    };
    GradebookDialog.prototype.printCertificate = function () {
        this.certPrintDialog.show(this.certificate);
    };
    GradebookDialog.prototype.issueCertificate = function () {
        var _this = this;
        if (this.member.enroll_status == 'completed') {
            this.error('This member already completed the course');
            return;
        }
        var certificate = new course_certificate_model_1.Certificate();
        certificate.date_issue = new Date();
        certificate.course_id = this.member.course_id;
        certificate.member_id = this.member.id;
        this.certDialog.show(certificate);
        this.certDialog.onCreateComplete.subscribe(function (obj) {
            _this.certificate = obj;
            _this.member.completeCourse(_this, certificate.id).subscribe(function () {
                _this.member.enroll_status = 'completed';
                _this.success('Congratulations! You have completed the course.');
            });
        });
    };
    GradebookDialog.prototype.show = function (member) {
        var _this = this;
        this.display = true;
        this.exams = [];
        this.projects = [];
        this.stats = [];
        this.member = member;
        this.lmsProfileService.init(this).subscribe(function () {
            _this.course = _this.lmsProfileService.courseById(member.course_id);
            _this.exams = _this.lmsProfileService.examsByClass(_this.member.class_id);
            _this.lmsProfileService.getClassContent(_this.member.class_id).subscribe(function (content) {
                _this.projects = content["projects"];
                base_model_1.BaseModel.bulk_search(_this, course_certificate_model_1.Certificate.__api__listByMember(_this.member.id), project_submission_model_1.ProjectSubmission.__api__listByMember(_this.member.id), exam_record_model_1.ExamRecord.__api__listByCourseMember(_this.member.id))
                    .subscribe(function (jsonArr) {
                    var certificates = course_certificate_model_1.Certificate.toArray(jsonArr[0]);
                    if (certificates.length)
                        _this.certificate = certificates[0];
                    _this.projectSubmits = project_submission_model_1.ProjectSubmission.toArray(jsonArr[1]);
                    _this.examRecords = exam_record_model_1.ExamRecord.toArray(jsonArr[2]);
                    log_model_1.CourseLog.memberStudyActivity(_this, _this.member.id, _this.member.course_id)
                        .subscribe(function (logs) {
                        _this.computeCourseStats(logs);
                    });
                });
            });
        });
    };
    GradebookDialog.prototype.computeCourseStats = function (logs) {
        var record = {};
        record["total_unit"] = this.course.unit_count;
        var result = this.reportUtils.analyzeCourseMemberActivity(logs);
        if (result[0] != Infinity)
            record["first_attempt"] = this.datePipe.transform(result[0], constants_1.EXPORT_DATETIME_FORMAT);
        if (result[1] != Infinity)
            record["last_attempt"] = this.datePipe.transform(result[1], constants_1.EXPORT_DATETIME_FORMAT);
        record["time_spent"] = this.timePipe.transform(+result[2], 'min');
        if (this.course.unit_count)
            record["complete_percent"] = Math.floor(+result[3] * 100 / +this.course.unit_count);
        else
            record["complete_percent"] = 0;
        record["complete_unit"] = +result[3];
        this.stats.push(record);
    };
    GradebookDialog.prototype.getExamRecord = function (exam) {
        return _.find(this.examRecords, function (record) {
            return record.exam_id == exam.id;
        }) || new exam_record_model_1.ExamRecord();
    };
    GradebookDialog.prototype.getProjectSubmit = function (project) {
        return _.find(this.projectSubmits, function (submit) {
            return submit.project_id == project.id;
        }) || new project_submission_model_1.ProjectSubmission();
    };
    __decorate([
        core_1.ViewChild(answer_print_dialog_component_1.AnswerPrintDialog),
        __metadata("design:type", answer_print_dialog_component_1.AnswerPrintDialog)
    ], GradebookDialog.prototype, "answerSheetDialog", void 0);
    __decorate([
        core_1.ViewChild(course_certificate_dialog_component_1.CourseCertificateDialog),
        __metadata("design:type", course_certificate_dialog_component_1.CourseCertificateDialog)
    ], GradebookDialog.prototype, "certDialog", void 0);
    __decorate([
        core_1.ViewChild(certificate_print_dialog_component_1.CertificatePrintDialog),
        __metadata("design:type", certificate_print_dialog_component_1.CertificatePrintDialog)
    ], GradebookDialog.prototype, "certPrintDialog", void 0);
    GradebookDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gradebook-dialog',
            templateUrl: 'gradebook.dialog.component.html',
            styleUrls: ['gradebook.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [excel_service_1.ExcelService, common_1.DatePipe, time_pipe_1.TimeConvertPipe])
    ], GradebookDialog);
    return GradebookDialog;
}(base_component_1.BaseComponent));
exports.GradebookDialog = GradebookDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvY2xhc3MvZ3JhZGVib29rL2dyYWRlYm9vay5kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUE0RTtBQUM1RSwwQ0FBMkM7QUFLM0MsaUZBQStFO0FBRS9FLDhCQUFnQztBQUNoQyw4REFBbUk7QUFDbkksNEZBQW9GO0FBSXBGLHdFQUF1RTtBQUV2RSxxRUFBbUU7QUFFbkUsNkRBQWtFO0FBR2xFLHVHQUEwRjtBQUUxRixzR0FBd0Y7QUFDeEYsMkhBQThHO0FBQzlHLHdIQUEyRztBQUczRyxzR0FBOEY7QUFDOUYsd0VBQXNFO0FBQ3RFLGdFQUE4RDtBQUU5RCx3RkFBZ0Y7QUFVaEY7SUFBcUMsbUNBQWE7SUFpQjlDLHlCQUFvQixZQUEwQixFQUFVLFFBQWtCLEVBQVUsUUFBeUI7UUFBN0csWUFDSSxpQkFBTyxTQU1WO1FBUG1CLGtCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsY0FBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLGNBQVEsR0FBUixRQUFRLENBQWlCO1FBRXpHLEtBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEtBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLEtBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBVyxFQUFFLENBQUM7UUFDckMsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGtDQUFZLEVBQUUsQ0FBQzs7SUFDckMsQ0FBQztJQUVELGtDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsNkNBQW1CLEdBQW5CO1FBQUEsaUJBZUM7UUFkRyxJQUFJLE1BQU0sR0FBRztZQUNULElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1NBQ3pDLENBQUE7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QUFZLEVBQW9CLGlCQUFRLEVBQW9CLDJCQUFlO09BakJwRyxlQUFlLENBcUkzQjtJQUFELHNCQUFDO0NBcklELEFBcUlDLENBcklvQyw4QkFBYSxHQXFJakQ7QUFySVksMENBQWUiLCJmaWxlIjoiYXBwL2xtcy9jbGFzcy9ncmFkZWJvb2svZ3JhZGVib29rLmRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE5nWm9uZSwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlRmFxIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLWZhcS5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgRVhQT1JUX0RBVEVUSU1FX0ZPUk1BVCwgQ09VUlNFX01FTUJFUl9FTlJPTExfU1RBVFVTLCBFWEFNX1NUQVRVUywgUFJPSkVDVF9TVEFUVVMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IENvdXJzZU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlQ2xhc3MgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtY2xhc3MubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlVW5pdCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS11bml0Lm1vZGVsJztcbmltcG9ydCB7IENvdXJzZVN5bGxhYnVzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLXN5bGxhYnVzLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZUxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2xvZy5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtUXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLXF1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCB7IFJlcG9ydFV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvcmVwb3J0LnV0aWxzJztcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBUaW1lQ29udmVydFBpcGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvcGlwZXMvdGltZS5waXBlJztcbmltcG9ydCB7IEV4YW0gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLm1vZGVsJztcbmltcG9ydCB7IEV4YW1NZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgeyBBbnN3ZXJQcmludERpYWxvZyB9IGZyb20gJy4uLy4uL2V4YW0vYW5zd2VyLXByaW50L2Fuc3dlci1wcmludC5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEV4YW1HcmFkZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tZ3JhZGUubW9kZWwnO1xuaW1wb3J0IHsgQ2VydGlmaWNhdGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtY2VydGlmaWNhdGUubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlQ2VydGlmaWNhdGVEaWFsb2cgfSBmcm9tICcuLi8uLi9jb3Vyc2UvY291cnNlLWNlcnRpZmljYXRlL2NvdXJzZS1jZXJ0aWZpY2F0ZS5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IENlcnRpZmljYXRlUHJpbnREaWFsb2cgfSBmcm9tICcuLi8uLi9jb3Vyc2UvY2VydGlmaWNhdGUtcHJpbnQvY2VydGlmaWNhdGUtcHJpbnQuZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvcHJvamVjdC5tb2RlbCc7XG5pbXBvcnQgeyBTdWJtaXNzaW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VibWlzc2lvbi5tb2RlbCc7XG5pbXBvcnQgeyBQcm9qZWN0U3VibWlzc2lvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3Byb2plY3Qtc3VibWlzc2lvbi5tb2RlbCc7XG5pbXBvcnQgeyBFeGNlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvZXhjZWwuc2VydmljZSc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgRXhhbVJlY29yZCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tcmVjb3JkLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS5tb2RlbCc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2dyYWRlYm9vay1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAnZ3JhZGVib29rLmRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2dyYWRlYm9vay5kaWFsb2cuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBHcmFkZWJvb2tEaWFsb2cgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuICAgIHByaXZhdGUgZGlzcGxheTogYm9vbGVhbjtcbiAgICBwcml2YXRlIG1lbWJlcjogQ291cnNlTWVtYmVyO1xuICAgIHByaXZhdGUgY291cnNlOiBDb3Vyc2U7XG4gICAgcHJpdmF0ZSBleGFtczogRXhhbVtdO1xuICAgIHByaXZhdGUgZXhhbVJlY29yZHM6IEV4YW1SZWNvcmRbXTtcbiAgICBwcml2YXRlIHByb2plY3RzOiBQcm9qZWN0W107XG4gICAgcHJpdmF0ZSBwcm9qZWN0U3VibWl0czogUHJvamVjdFN1Ym1pc3Npb25bXTtcbiAgICBwcml2YXRlIGNlcnRpZmljYXRlOiBDZXJ0aWZpY2F0ZTtcbiAgICBwcml2YXRlIHN0YXRzOiBhbnk7XG4gICAgcHJpdmF0ZSByZXBvcnRVdGlsczogUmVwb3J0VXRpbHM7XG5cbiAgICBAVmlld0NoaWxkKEFuc3dlclByaW50RGlhbG9nKSBhbnN3ZXJTaGVldERpYWxvZzogQW5zd2VyUHJpbnREaWFsb2c7XG4gICAgQFZpZXdDaGlsZChDb3Vyc2VDZXJ0aWZpY2F0ZURpYWxvZykgY2VydERpYWxvZzogQ291cnNlQ2VydGlmaWNhdGVEaWFsb2c7XG4gICAgQFZpZXdDaGlsZChDZXJ0aWZpY2F0ZVByaW50RGlhbG9nKSBjZXJ0UHJpbnREaWFsb2c6IENlcnRpZmljYXRlUHJpbnREaWFsb2c7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV4Y2VsU2VydmljZTogRXhjZWxTZXJ2aWNlLCBwcml2YXRlIGRhdGVQaXBlOiBEYXRlUGlwZSwgcHJpdmF0ZSB0aW1lUGlwZTogVGltZUNvbnZlcnRQaXBlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZXhhbXMgPSBbXTtcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IFtdO1xuICAgICAgICB0aGlzLnN0YXRzID0gW107XG4gICAgICAgIHRoaXMucmVwb3J0VXRpbHMgPSBuZXcgUmVwb3J0VXRpbHMoKTtcbiAgICAgICAgdGhpcy5tZW1iZXIgPSBuZXcgQ291cnNlTWVtYmVyKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxuXG4gICAgZG93bmxvYWRTY29yZVJlcG9ydCgpIHtcbiAgICAgICAgdmFyIGhlYWRlciA9IFtcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdVbml0JyksXG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnU2NvcmUnKSxcbiAgICAgICAgXVxuICAgICAgICB2YXIgcmVjb3JkcyA9IFtdO1xuICAgICAgICByZWNvcmRzID0gcmVjb3Jkcy5jb25jYXQoXy5tYXAodGhpcy5leGFtcywgKGV4YW06IEV4YW0pID0+IHtcbiAgICAgICAgICAgIGxldCBleGFtUmVjb3JkOiBFeGFtUmVjb3JkID0gdGhpcy5nZXRFeGFtUmVjb3JkKGV4YW0pO1xuICAgICAgICAgICAgcmV0dXJuIFtleGFtLm5hbWUsIGV4YW1SZWNvcmQuc2NvcmVdO1xuICAgICAgICB9KSk7XG4gICAgICAgIHJlY29yZHMgPSByZWNvcmRzLmNvbmNhdChfLm1hcCh0aGlzLnByb2plY3RzLCAocHJvamVjdDogUHJvamVjdCkgPT4ge1xuICAgICAgICAgICAgbGV0IHN1Ym1pdDogUHJvamVjdFN1Ym1pc3Npb24gPSB0aGlzLmdldFByb2plY3RTdWJtaXQocHJvamVjdCk7XG4gICAgICAgICAgICByZXR1cm4gW3Byb2plY3QubmFtZSwgc3VibWl0LnNjb3JlXTtcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLmV4Y2VsU2VydmljZS5leHBvcnRBc0V4Y2VsRmlsZShoZWFkZXIuY29uY2F0KHJlY29yZHMpLCAnZ3JhZGVib29rX3JlcG9ydCcpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaW50Q2VydGlmaWNhdGUoKSB7XG4gICAgICAgIHRoaXMuY2VydFByaW50RGlhbG9nLnNob3codGhpcy5jZXJ0aWZpY2F0ZSk7XG4gICAgfVxuXG4gICAgaXNzdWVDZXJ0aWZpY2F0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubWVtYmVyLmVucm9sbF9zdGF0dXMgPT0gJ2NvbXBsZXRlZCcpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoJ1RoaXMgbWVtYmVyIGFscmVhZHkgY29tcGxldGVkIHRoZSBjb3Vyc2UnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2VydGlmaWNhdGUgPSBuZXcgQ2VydGlmaWNhdGUoKTtcbiAgICAgICAgY2VydGlmaWNhdGUuZGF0ZV9pc3N1ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNlcnRpZmljYXRlLmNvdXJzZV9pZCA9IHRoaXMubWVtYmVyLmNvdXJzZV9pZDtcbiAgICAgICAgY2VydGlmaWNhdGUubWVtYmVyX2lkID0gdGhpcy5tZW1iZXIuaWQ7XG4gICAgICAgIHRoaXMuY2VydERpYWxvZy5zaG93KGNlcnRpZmljYXRlKTtcbiAgICAgICAgdGhpcy5jZXJ0RGlhbG9nLm9uQ3JlYXRlQ29tcGxldGUuc3Vic2NyaWJlKChvYmo6IENlcnRpZmljYXRlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNlcnRpZmljYXRlID0gb2JqO1xuICAgICAgICAgICAgdGhpcy5tZW1iZXIuY29tcGxldGVDb3Vyc2UodGhpcywgY2VydGlmaWNhdGUuaWQpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZW1iZXIuZW5yb2xsX3N0YXR1cyA9ICdjb21wbGV0ZWQnO1xuICAgICAgICAgICAgICAgIHRoaXMuc3VjY2VzcygnQ29uZ3JhdHVsYXRpb25zISBZb3UgaGF2ZSBjb21wbGV0ZWQgdGhlIGNvdXJzZS4nKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNob3cobWVtYmVyOiBDb3Vyc2VNZW1iZXIpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5leGFtcyA9IFtdO1xuICAgICAgICB0aGlzLnByb2plY3RzID0gW107XG4gICAgICAgIHRoaXMuc3RhdHMgPSBbXTtcbiAgICAgICAgdGhpcy5tZW1iZXIgPSBtZW1iZXI7XG4gICAgICAgIHRoaXMubG1zUHJvZmlsZVNlcnZpY2UuaW5pdCh0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb3Vyc2UgPSB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmNvdXJzZUJ5SWQobWVtYmVyLmNvdXJzZV9pZCk7XG4gICAgICAgICAgICB0aGlzLmV4YW1zID0gdGhpcy5sbXNQcm9maWxlU2VydmljZS5leGFtc0J5Q2xhc3ModGhpcy5tZW1iZXIuY2xhc3NfaWQpO1xuICAgICAgICAgICAgdGhpcy5sbXNQcm9maWxlU2VydmljZS5nZXRDbGFzc0NvbnRlbnQodGhpcy5tZW1iZXIuY2xhc3NfaWQpLnN1YnNjcmliZShjb250ZW50PT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdHMgPSBjb250ZW50W1wicHJvamVjdHNcIl07XG4gICAgICAgICAgICAgICAgQmFzZU1vZGVsLmJ1bGtfc2VhcmNoKHRoaXMsXG4gICAgICAgICAgICAgICAgQ2VydGlmaWNhdGUuX19hcGlfX2xpc3RCeU1lbWJlcih0aGlzLm1lbWJlci5pZCksXG4gICAgICAgICAgICAgICAgUHJvamVjdFN1Ym1pc3Npb24uX19hcGlfX2xpc3RCeU1lbWJlcih0aGlzLm1lbWJlci5pZCksXG4gICAgICAgICAgICAgICAgRXhhbVJlY29yZC5fX2FwaV9fbGlzdEJ5Q291cnNlTWVtYmVyKHRoaXMubWVtYmVyLmlkKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKGpzb25BcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2VydGlmaWNhdGVzID0gQ2VydGlmaWNhdGUudG9BcnJheShqc29uQXJyWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlcnRpZmljYXRlcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlcnRpZmljYXRlID0gY2VydGlmaWNhdGVzWzBdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RTdWJtaXRzID0gUHJvamVjdFN1Ym1pc3Npb24udG9BcnJheShqc29uQXJyWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leGFtUmVjb3JkcyA9IEV4YW1SZWNvcmQudG9BcnJheShqc29uQXJyWzJdKTtcbiAgICAgICAgICAgICAgICAgICAgQ291cnNlTG9nLm1lbWJlclN0dWR5QWN0aXZpdHkodGhpcywgdGhpcy5tZW1iZXIuaWQsIHRoaXMubWVtYmVyLmNvdXJzZV9pZClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUobG9ncyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wdXRlQ291cnNlU3RhdHMobG9ncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21wdXRlQ291cnNlU3RhdHMobG9nczogQ291cnNlTG9nW10pIHtcbiAgICAgICAgdmFyIHJlY29yZCA9IHt9O1xuICAgICAgICByZWNvcmRbXCJ0b3RhbF91bml0XCJdID0gdGhpcy5jb3Vyc2UudW5pdF9jb3VudDtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMucmVwb3J0VXRpbHMuYW5hbHl6ZUNvdXJzZU1lbWJlckFjdGl2aXR5KGxvZ3MpO1xuICAgICAgICBpZiAocmVzdWx0WzBdICE9IEluZmluaXR5KVxuICAgICAgICAgICAgcmVjb3JkW1wiZmlyc3RfYXR0ZW1wdFwiXSA9IHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKHJlc3VsdFswXSwgRVhQT1JUX0RBVEVUSU1FX0ZPUk1BVCk7XG4gICAgICAgIGlmIChyZXN1bHRbMV0gIT0gSW5maW5pdHkpXG4gICAgICAgICAgICByZWNvcmRbXCJsYXN0X2F0dGVtcHRcIl0gPSB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShyZXN1bHRbMV0sIEVYUE9SVF9EQVRFVElNRV9GT1JNQVQpO1xuICAgICAgICByZWNvcmRbXCJ0aW1lX3NwZW50XCJdID0gdGhpcy50aW1lUGlwZS50cmFuc2Zvcm0oK3Jlc3VsdFsyXSwgJ21pbicpO1xuICAgICAgICBpZiAodGhpcy5jb3Vyc2UudW5pdF9jb3VudClcbiAgICAgICAgICAgIHJlY29yZFtcImNvbXBsZXRlX3BlcmNlbnRcIl0gPSBNYXRoLmZsb29yKCtyZXN1bHRbM10gKiAxMDAgLyArdGhpcy5jb3Vyc2UudW5pdF9jb3VudCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJlY29yZFtcImNvbXBsZXRlX3BlcmNlbnRcIl0gPSAwO1xuICAgICAgICByZWNvcmRbXCJjb21wbGV0ZV91bml0XCJdID0gK3Jlc3VsdFszXTtcbiAgICAgICAgdGhpcy5zdGF0cy5wdXNoKHJlY29yZCk7XG4gICAgfVxuXG5cbiAgICBnZXRFeGFtUmVjb3JkKGV4YW06IEV4YW0pIHtcbiAgICAgICAgcmV0dXJuIF8uZmluZCh0aGlzLmV4YW1SZWNvcmRzLCAocmVjb3JkOiBFeGFtUmVjb3JkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkLmV4YW1faWQgPT0gZXhhbS5pZDtcbiAgICAgICAgfSkgfHwgbmV3IEV4YW1SZWNvcmQoKTtcbiAgICB9XG5cbiAgICBnZXRQcm9qZWN0U3VibWl0KHByb2plY3Q6IFByb2plY3QpIHtcbiAgICAgICAgcmV0dXJuIF8uZmluZCh0aGlzLnByb2plY3RTdWJtaXRzLCAoc3VibWl0OiBQcm9qZWN0U3VibWlzc2lvbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHN1Ym1pdC5wcm9qZWN0X2lkID09IHByb2plY3QuaWQ7XG4gICAgICAgIH0pIHx8IG5ldyBQcm9qZWN0U3VibWlzc2lvbigpO1xuICAgIH1cblxufVxuXG4iXX0=

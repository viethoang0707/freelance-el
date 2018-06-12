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
var exam_grade_model_1 = require("../../../../shared/models/elearning/exam-grade.model");
var submission_model_1 = require("../../../../shared/models/elearning/submission.model");
var exam_member_model_1 = require("../../../../shared/models/elearning/exam-member.model");
var _ = require("underscore");
var constants_1 = require("../../../../shared/models/constants");
var excel_service_1 = require("../../../../shared/services/excel.service");
var base_model_1 = require("../../../../shared/models/base.model");
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
        var output = [];
        this.records.forEach(function (record) {
            var course = { 'Name': record['user_name'], 'Login': record['user_login'], 'User group': record['user_group'], 'Attempt date': record['date_attempt'], 'Score': record['score'], 'Result': record['result'] };
            output.push(course);
        });
        this.excelService.exportAsExcelFile(output, 'course_by_member_report');
    };
    ExamResultReportComponent.prototype.selectExam = function () {
        var _this = this;
        if (this.selectedExam) {
            this.startTransaction();
            exam_member_model_1.ExamMember.listByExam(this, this.selectedExam.id).subscribe(function (members) {
                exam_grade_model_1.ExamGrade.listByExam(_this, _this.selectedExam.id).subscribe(function (grades) {
                    submission_model_1.Submission.listByExam(_this, _this.selectedExam.id).subscribe(function (submits) {
                        log_model_1.ExamLog.listByExam(_this, _this.selectedExam.id).subscribe(function (logs) {
                            _this.records = _this.generateReport(_this.selectedExam, grades, submits, logs, members);
                        });
                    });
                });
            });
        }
    };
    ExamResultReportComponent.prototype.render = function (exam) {
        var _this = this;
        this.clear();
        base_model_1.BaseModel
            .bulk_search(this, exam_member_model_1.ExamMember.__api__listCandidateByExam(exam.id), exam_grade_model_1.ExamGrade.__api__all(), submission_model_1.Submission.__api__listByExam(exam.id), log_model_1.ExamLog.__api__listByExam(exam.id))
            .subscribe(function (jsonArr) {
            var members = exam_member_model_1.ExamMember.toArray(jsonArr[0]);
            var grades = exam_grade_model_1.ExamGrade.toArray(jsonArr[1]);
            var submits = submission_model_1.Submission.toArray(jsonArr[2]);
            var logs = log_model_1.ExamLog.toArray(jsonArr[3]);
            _this.records = _this.generateReport(exam, grades, submits, logs, members);
        });
    };
    ExamResultReportComponent.prototype.generateReport = function (exam, grades, submits, logs, members) {
        var _this = this;
        var rows = [];
        _.each(members, function (member) {
            var userLogs = _.filter(logs, function (log) {
                return log.user_id == member.user_id;
            });
            var submit = _.find(submits, function (obj) {
                return obj.member_id == member.id;
            });
            rows.push(_this.generateReportRow(exam, grades, member, submit, userLogs));
        });
        return rows;
    };
    ExamResultReportComponent.prototype.generateReportRow = function (exam, grades, member, submit, logs) {
        var record = {};
        record["user_login"] = member.login;
        record["user_name"] = member.name;
        record["user_group"] = member.group_id__DESC__;
        if (submit) {
            record["score"] = submit.score;
            var grade = _.find(grades, function (obj) {
                return obj.min_score <= record["score"] && obj.max_score >= record["score"];
            });
            if (grade)
                record["grade"] = grade.name;
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
//# sourceMappingURL=exam-result-report.component.js.map
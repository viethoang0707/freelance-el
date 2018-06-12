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
var course_unit_model_1 = require("../../../shared/models/elearning/course-unit.model");
var course_syllabus_model_1 = require("../../../shared/models/elearning/course-syllabus.model");
var log_model_1 = require("../../../shared/models/elearning/log.model");
var exam_question_model_1 = require("../../../shared/models/elearning/exam-question.model");
var report_utils_1 = require("../../../shared/helpers/report.utils");
var time_pipe_1 = require("../../../shared/pipes/time.pipe");
var exam_model_1 = require("../../../shared/models/elearning/exam.model");
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var answer_print_dialog_component_1 = require("../../exam/answer-print/answer-print.dialog.component");
var exam_grade_model_1 = require("../../../shared/models/elearning/exam-grade.model");
var course_certificate_model_1 = require("../../../shared/models/elearning/course-certificate.model");
var course_certificate_dialog_component_1 = require("../course-certificate/course-certificate.dialog.component");
var certificate_print_dialog_component_1 = require("../certificate-print/certificate-print.dialog.component");
var project_model_1 = require("../../../shared/models/elearning/project.model");
var submission_model_1 = require("../../../shared/models/elearning/submission.model");
var project_submission_model_1 = require("../../../shared/models/elearning/project-submission.model");
var excel_service_1 = require("../../../shared/services/excel.service");
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
        return _this;
    }
    GradebookDialog.prototype.ngOnInit = function () {
    };
    GradebookDialog.prototype.downloadScoreReport = function () {
        var header = [
            this.translateService.instant('Unit'),
            this.translateService.instant('Score'),
        ];
        var records = [];
        records = records.concat(_.map(this.exams, function (exam) {
            return [exam["name"], exam["score"]];
        }));
        records = records.concat(_.map(this.projects, function (project) {
            return [project["name"], project["score"]];
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
        if (this.member.enroll_status != 'completed') {
            this.error('This member has not completed the course');
            return;
        }
        var certificate = new course_certificate_model_1.Certificate();
        certificate.date_issue = new Date();
        certificate.course_id = this.member.course_id;
        certificate.member_id = this.member.id;
        this.certDialog.show(certificate);
        this.certDialog.onCreateComplete.subscribe(function (obj) {
            _this.certificate = obj;
        });
    };
    GradebookDialog.prototype.show = function (member) {
        this.display = true;
        this.member = member;
        this.computeCourseStats();
        this.loadCertificate();
        this.loadExamScore();
        this.loadProjectScore();
    };
    GradebookDialog.prototype.computeCourseStats = function () {
        var _this = this;
        var record = {};
        course_syllabus_model_1.CourseSyllabus.byCourse(this, this.member.course_id).subscribe(function (syllabus) {
            course_unit_model_1.CourseUnit.countBySyllabus(_this, syllabus.id).subscribe(function (totalUnit) {
                log_model_1.CourseLog.memberStudyActivity(_this, _this.member.id, _this.member.class_id).subscribe(function (logs) {
                    record["total_unit"] = totalUnit;
                    var result = _this.reportUtils.analyzeCourseMemberActivity(logs);
                    if (result[0] != Infinity)
                        record["first_attempt"] = _this.datePipe.transform(result[0], constants_1.EXPORT_DATETIME_FORMAT);
                    if (result[1] != Infinity)
                        record["last_attempt"] = _this.datePipe.transform(result[1], constants_1.EXPORT_DATETIME_FORMAT);
                    record["time_spent"] = _this.timePipe.transform(+result[2], 'min');
                    if (totalUnit)
                        record["complete_percent"] = Math.floor(+result[3] * 100 / +totalUnit);
                    else
                        record["complete_percent"] = 0;
                    record["complete_unit"] = +result[3];
                });
            });
        });
    };
    GradebookDialog.prototype.loadCertificate = function () {
        var _this = this;
        course_certificate_model_1.Certificate.byMember(this, this.member.id).subscribe(function (certificate) {
            _this.certificate = certificate;
        });
    };
    GradebookDialog.prototype.loadExamScore = function () {
        var _this = this;
        exam_grade_model_1.ExamGrade.all(this).subscribe(function (grades) {
            exam_member_model_1.ExamMember.listByUser(_this, _this.member.user_id).subscribe(function (members) {
                var examIds = _.pluck(members, 'exam_id');
                exam_model_1.Exam.array(_this, examIds)
                    .subscribe(function (exams) {
                    _this.exams = _.filter(exams, function (exam) {
                        return exam.status == 'published';
                    });
                    _.each(_this.exams, (function (exam) {
                        var member = _.find(members, function (examMember) {
                            return examMember.exam_id == exam.id;
                        });
                        exam["member"] = member;
                        submission_model_1.Submission.byMemberAndExam(_this, member.id, exam.id).subscribe(function (submit) {
                            if (submit) {
                                exam["score"] = submit.score;
                                exam["submit"] = submit;
                                var grade = exam_grade_model_1.ExamGrade.gradeScore(grades, submit.score);
                                if (grade)
                                    exam["grade"] = grade.name;
                            }
                        });
                        exam_question_model_1.ExamQuestion.countByExam(_this, exam.id).subscribe(function (count) {
                            exam["question_count"] = count;
                        });
                    }));
                });
            });
        });
    };
    GradebookDialog.prototype.loadProjectScore = function () {
        var _this = this;
        project_model_1.Project.listByClass(this, this.member.class_id).subscribe(function (projects) {
            project_submission_model_1.ProjectSubmission.listByMember(_this, _this.member.id).subscribe(function (submits) {
                _this.projects = projects;
                _this.projects = _.filter(projects, function (project) {
                    return project.status == 'published';
                });
                _.each(_this.projects, function (project) {
                    var submit = _.find(submits, function (submit) {
                        return submit.project_id == project.id;
                    });
                    if (submit) {
                        project["score"] = submit.score;
                        project["submit"] = submit;
                    }
                });
            });
        });
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
//# sourceMappingURL=gradebook.dialog.component.js.map
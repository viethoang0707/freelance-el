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
            template: "<p-dialog header=\"{{'Gradebook'|translate}}: {{member.name}}\" [(visible)]=\"display\" modal=\"true\" width=\"1100\" [responsive]=\"true\"     appendTo=\"body\">     <div class=\"spinner\" [hidden]=\"!loading\"></div>     <p-scrollPanel [style]=\"{width: '100%', height: '480px'}\">         <div class=\"ui-g-12 \">             <p-toolbar>                 <div class=\"ui-toolbar-group-left\">                     <button pButton type=\"button \" label=\"{{ 'Issue certificate'|translate}} \" class=\"blue-grey-btn \" icon=\"ui-icon-beenhere \"                         (click)=\"issueCertificate()\" *ngIf=\"!certificate\"></button>                     <button pButton type=\"button \" label=\"{{ 'View certificate'|translate}} \" class=\"blue-grey-btn \" icon=\"ui-icon-print \" (click)=\"printCertificate()\"                         *ngIf=\"certificate\"></button>                 </div>                 <div class=\"ui-toolbar-group-right\">                     <button pButton type=\"button \" label=\"{{ 'Download score'|translate}} \" class=\"blue-grey-btn \" icon=\"ui-icon-insert-chart \"                         (click)=\"downloadScoreReport()\"></button>                 </div>             </p-toolbar>              <p-table #stasTable [value]=\"stats\" [paginator]=\"false\" [rows]=\"1\" [responsive]=\"true\">                 <ng-template pTemplate=\"header\">                     <tr>                         <th> {{'Total course unit'|translate}}</th>                         <th> {{'Completed course unit'|translate}}</th>                         <th>                             {{'% completion'|translate}}                         </th>                         <th>                             {{'First attempt'|translate}}                         </th>                         <th>                             {{'Last attempt'|translate}}                         </th>                         <th>                             {{'Time spend'|translate}}                         </th>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"body\" let-record>                     <tr [pSelectableRow]=\"record\">                         <td>{{stats.total_unit}}</td>                         <td>{{stats.complete_unit}}</td>                         <td>{{record.complete_percent}}</td>                         <td>{{record.first_attempt}} %</td>                         <td>{{record.last_attempt}} %</td>                         <td>{{record.time_spent}} {{'minute'|translate}}</td>                     </tr>                 </ng-template>             </p-table>             <div *ngIf=\"exams.length\">                 <p-dataList [value]=\"exams\" [paginator]=\"true\" [rows]=\"5\">                     <ng-template let-exam pTemplate=\"item\">                         <p-card *ngVar=\"getExamRecord(exam) as examRecord\">                             <p-header>                                 <div class=\"head-exam\">                                 </div>                             </p-header>                             <div class=\"ui-g body-exam\">                                 <div class=\"ui-g-8\">                                     <h4>{{exam.name}}</h4>                                     <span class=\"e-status\">{{exam.status}}</span>                                     <h5 class=\"e-title\">{{'Summary'|translate}}</h5>                                     <p>                                         {{exam.summary}}                                     </p>                                     <h5 class=\"e-title\">{{'Instruction'|translate}}</h5>                                     <p [innerHTML]=\"exam.instruction\"></p>                                 </div>                                 <div class=\"ui-g-4\">                                     <p-card>                                         <ul class=\"list-cmt\">                                             <li class=\"clearfix\">                                                 <i class=\"material-icons\">date_range</i>                                                 <span class=\"cmt-title\">{{'Start date'|translate}}</span>                                                 <span class=\"cmt-detail\">{{exam.start | date : \"dd/MM/yyyy\"}}</span>                                             </li>                                             <li class=\"clearfix\">                                                 <i class=\"material-icons\">date_range</i>                                                 <span class=\"cmt-title\">{{'End date'|translate}}</span>                                                 <span class=\"cmt-detail\">{{exam.end | date : \"dd/MM/yyyy\"}}</span>                                             </li>                                             <li class=\"clearfix\">                                                 <i class=\"material-icons\">alarm</i>                                                 <span class=\"cmt-title\">{{'Duration (mintes)'|translate}}</span>                                                 <span class=\"cmt-detail\">{{exam.duration}}</span>                                             </li>                                             <li class=\"clearfix\">                                                 <i class=\"material-icons\">star</i>                                                 <span class=\"cmt-title\">{{'Score'|translate}}</span>                                                 <span class=\"cmt-detail\">{{examRecord.score}}</span>                                             </li>                                             <li class=\"clearfix\">                                                 <i class=\"material-icons\">star</i>                                                 <span class=\"cmt-title\">{{'Grade'|translate}}</span>                                                 <span class=\"cmt-detail\">{{examRecord.grade}}</span>                                             </li>                                         </ul>                                         <p-footer>                                             <button pButton type=\"button\" icon=\"ui-icon-timeline\" title=\"{{'View answer'| translate}}\" label=\"{{'View answer'|translate}}\" class=\"orange-btn\"                                                 style=\"margin-right:4px;\" (click)=\"viewAnswer(exam)\"></button>                                         </p-footer>                                     </p-card>                                 </div>                             </div>                         </p-card>                     </ng-template>                 </p-dataList>             </div>             <div *ngIf=\"projects.length\">                 <p-dataList [value]=\"projects\" [paginator]=\"true\" [rows]=\"5\">                     <ng-template let-project pTemplate=\"item\">                         <p-card *ngVar=\"getProjectSubmit(project) as projectSubmit\">                             <p-header>                                 <div class=\"head-exam\">                                 </div>                             </p-header>                             <div class=\"ui-g body-exam\">                                 <div class=\"ui-g-8\">                                     <h4>{{project.name}}</h4>                                     <span class=\"e-status\">{{project.status}}</span>                                     <h5 class=\"e-title\">{{'Summary'|translate}}</h5>                                     <p>                                         {{project.summary}}                                     </p>                                     <h5 class=\"e-title\">{{'Instruction'|translate}}</h5>                                     <p [innerHTML]=\"project.instruction\"></p>                                 </div>                                 <div class=\"ui-g-4\">                                     <p-card>                                         <ul class=\"list-cmt\">                                             <li class=\"clearfix\">                                                 <i class=\"material-icons\">date_range</i>                                                 <span class=\"cmt-title\">{{'Start date'|translate}}</span>                                                 <span class=\"cmt-detail\">{{project.start | date : \"dd/MM/yyyy\"}}</span>                                             </li>                                             <li class=\"clearfix\">                                                 <i class=\"material-icons\">date_range</i>                                                 <span class=\"cmt-title\">{{'End date'|translate}}</span>                                                 <span class=\"cmt-detail\">{{project.end | date : \"dd/MM/yyyy\"}}</span>                                             </li>                                             <li class=\"clearfix\">                                                 <i class=\"material-icons\">date_range</i>                                                 <span class=\"cmt-title\">{{'Submit date'|translate}}</span>                                                 <span class=\"cmt-detail\">{{projectSubmit.date_submit | date : \"dd/MM/yyyy\"}}</span>                                             </li>                                             <li class=\"clearfix\">                                                 <i class=\"material-icons\">star</i>                                                 <span class=\"cmt-title\">{{'Score'|translate}}</span>                                                 <span class=\"cmt-detail\">{{projectSubmit.score}}</span>                                             </li>                                         </ul>                                         <p-footer>                                         </p-footer>                                     </p-card>                                 </div>                             </div>                         </p-card>                     </ng-template>                 </p-dataList>             </div>         </div>     </p-scrollPanel>     <answer-print-dialog></answer-print-dialog>     <course-certificate-dialog></course-certificate-dialog>     <certificate-print-dialog></certificate-print-dialog>     <p-footer>         <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>     </p-footer> </p-dialog>",
            styles: [".mrg-bt{margin-bottom:15px}.head-exam{background-color:#e91e63}.head-exam button{margin:5px 0 5px 5px}.list-cmt{padding-left:0}.list-cmt li{list-style:none;padding:16px 24px;border-bottom:1px solid #dbdbdb}.list-cmt li i{font-size:24px;margin-right:8px;width:32px;vertical-align:middle;color:#757575}.list-cmt li .cmt-title{font-weight:700;margin-right:8px}.list-cmt li .cmt-detail{color:#757575;float:right}.e-title{font-size:15px}.e-status{background-color:#e91e63;border-radius:9px;padding:2px 8px;color:#fff}"],
        }),
        __metadata("design:paramtypes", [excel_service_1.ExcelService, common_1.DatePipe, time_pipe_1.TimeConvertPipe])
    ], GradebookDialog);
    return GradebookDialog;
}(base_component_1.BaseComponent));
exports.GradebookDialog = GradebookDialog;

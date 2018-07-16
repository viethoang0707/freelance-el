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
var router_1 = require("@angular/router");
var base_component_1 = require("../../../shared/components/base/base.component");
var _ = require("underscore");
var exam_model_1 = require("../../../shared/models/elearning/exam.model");
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var question_marking_dialog_component_1 = require("../question-marking/question-marking.dialog.component");
var answer_print_dialog_component_1 = require("../answer-print/answer-print.dialog.component");
var question_sheet_print_dialog_component_1 = require("../question-sheet-print/question-sheet-print.dialog.component");
var question_sheet_model_1 = require("../../../shared/models/elearning/question-sheet.model");
var exam_report_dialog_component_1 = require("../exam-report/exam-report.dialog.component");
var exam_stats_dialog_component_1 = require("../exam-stats/exam-stats.dialog.component");
var base_model_1 = require("../../../shared/models/base.model");
var exam_record_model_1 = require("../../../shared/models/elearning/exam-record.model");
var ExamManageComponent = (function (_super) {
    __extends(ExamManageComponent, _super);
    function ExamManageComponent(router, route) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.route = route;
        _this.exam = new exam_model_1.Exam();
        _this.member = new exam_member_model_1.ExamMember();
        return _this;
    }
    ExamManageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var memberId = +params['memberId'];
            var examId = +params['examId'];
            _this.lmsProfileService.init(_this).subscribe(function () {
                _this.exam = _this.lmsProfileService.examById(examId);
                _this.member = _this.lmsProfileService.examMemberById(memberId);
                _this.loadScores();
            });
        });
    };
    ExamManageComponent.prototype.showQuestionSheet = function () {
        var _this = this;
        question_sheet_model_1.QuestionSheet.get(this, this.exam.sheet_id).subscribe(function (sheet) {
            if (!sheet || !sheet.finalized)
                _this.error(_this.translateService.instant('The exam questions has not been set up'));
            else
                _this.questionSheetDialog.show(_this.exam, sheet);
        });
    };
    ExamManageComponent.prototype.viewAnswerSheet = function () {
        if (this.selectedMember) {
            if (this.selectedMember.enroll_status != 'completed')
                this.info(this.translateService.instant('Student has not completed the exam'));
            else
                this.answerSheetDialog.show(this.exam, this.selectedMember);
        }
    };
    ExamManageComponent.prototype.loadScores = function () {
        var _this = this;
        base_model_1.BaseModel.bulk_search(this, exam_member_model_1.ExamMember.__api__listCandidateByExam(this.exam.id), exam_record_model_1.ExamRecord.__api__listByExam(this.exam.id))
            .subscribe(function (jsonArr) {
            _this.members = exam_member_model_1.ExamMember.toArray(jsonArr[0]);
            _this.records = exam_record_model_1.ExamRecord.toArray(jsonArr[1]);
        });
    };
    ExamManageComponent.prototype.showExamReport = function () {
        this.reportDialog.show(this.exam);
    };
    ExamManageComponent.prototype.showExamStats = function () {
        this.statsDialog.show(this.exam);
    };
    ExamManageComponent.prototype.getExamRecord = function (member) {
        return _.find(this.records, function (record) {
            return record.member_id == member.id;
        }) || new exam_record_model_1.ExamRecord();
    };
    __decorate([
        core_1.ViewChild(question_marking_dialog_component_1.QuestionMarkingDialog),
        __metadata("design:type", question_marking_dialog_component_1.QuestionMarkingDialog)
    ], ExamManageComponent.prototype, "questionMarkDialog", void 0);
    __decorate([
        core_1.ViewChild(answer_print_dialog_component_1.AnswerPrintDialog),
        __metadata("design:type", answer_print_dialog_component_1.AnswerPrintDialog)
    ], ExamManageComponent.prototype, "answerSheetDialog", void 0);
    __decorate([
        core_1.ViewChild(question_sheet_print_dialog_component_1.QuestionSheetPrintDialog),
        __metadata("design:type", question_sheet_print_dialog_component_1.QuestionSheetPrintDialog)
    ], ExamManageComponent.prototype, "questionSheetDialog", void 0);
    __decorate([
        core_1.ViewChild(exam_report_dialog_component_1.ExamReportDialog),
        __metadata("design:type", exam_report_dialog_component_1.ExamReportDialog)
    ], ExamManageComponent.prototype, "reportDialog", void 0);
    __decorate([
        core_1.ViewChild(exam_stats_dialog_component_1.ExamStatsDialog),
        __metadata("design:type", exam_stats_dialog_component_1.ExamStatsDialog)
    ], ExamManageComponent.prototype, "statsDialog", void 0);
    ExamManageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-manage',
            template: "<div class=\"card card-w-title exam-manage\">     <h1>{{'Exam'|translate}}: {{exam.name}} </h1>     <div class=\"ui-g-12 \">         <p-toolbar>             <div class=\"ui-toolbar-group-left \">                 <button pButton type=\"button \" label=\"{{ 'Question sheet'|translate}} \" class=\"blue-grey-btn \" icon=\"ui-icon-question-answer\" (click)=\"showQuestionSheet()\"></button>                 <button pButton type=\"button \" label=\"{{ 'Answer sheet'|translate}} \" class=\"blue-grey-btn \" icon=\"ui-icon-content-paste\" (click)=\"viewAnswerSheet()\" [disabled]=\"!selectedMember\"></button>             </div>             <div class=\"ui-toolbar-group-right \">                 <button pButton type=\"button \" label=\"{{ 'Result report'|translate}} \" class=\"blue-grey-btn \" icon=\"ui-icon-data-usage\" (click)=\"showExamReport()\"></button>                 <button pButton type=\"button \" label=\"{{ 'Statistics'|translate}} \" class=\"blue-grey-btn \" icon=\"ui-icon-equalizer\" (click)=\"showExamStats()\"></button>             </div>         </p-toolbar>         <p-table #scoreTable [value]=\"members\" [paginator]=\"true\" [rows]=\"10\" selectionMode=\"single\" [(selection)]=\"selectedMember\" [responsive]=\"true\">             <!--  sortField=\"role\" -->             <ng-template pTemplate=\"header\">                 <tr>                     <th [pSortableColumn]=\"'name'\">                         {{'Name'|translate}}                         <p-sortIcon [field]=\"'name'\"></p-sortIcon>                     </th>                     <th [pSortableColumn]=\"'group_id__DESC__'\">                         {{'Group'|translate}}                         <p-sortIcon [field]=\"'group_id__DESC__'\"></p-sortIcon>                     </th>                     <th [pSortableColumn]=\"'score'\">                         {{'Score'|translate}}                         <p-sortIcon [field]=\"'score'\"></p-sortIcon>                     </th>                     <th [pSortableColumn]=\"'grade'\">                         {{'Grade'|translate}}                         <p-sortIcon [field]=\"'grade'\"></p-sortIcon>                     </th>                 </tr>             </ng-template>             <ng-template pTemplate=\"body\" let-member>                 <tr [pSelectableRow]=\"member\" *ngVar=\"getExamRecord(member) as record\">                     <td>{{member.name}}</td>                     <td>{{member.group_id__DESC__}}</td>                     <td>{{record.score}}</td>                     <td>{{record.grade}}</td>                 </tr>             </ng-template>             <ng-template pTemplate=\"summary\">                 {{'Total records'|translate}} : {{members?.length}}             </ng-template>         </p-table>     </div>     <question-marking-dialog></question-marking-dialog>     <question-sheet-print-dialog></question-sheet-print-dialog>     <answer-print-dialog></answer-print-dialog>     <exam-report-dialog></exam-report-dialog>     <exam-stats-dialog></exam-stats-dialog> </div>",
            styles: [".exam-manage{min-height:480px}"],
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute])
    ], ExamManageComponent);
    return ExamManageComponent;
}(base_component_1.BaseComponent));
exports.ExamManageComponent = ExamManageComponent;

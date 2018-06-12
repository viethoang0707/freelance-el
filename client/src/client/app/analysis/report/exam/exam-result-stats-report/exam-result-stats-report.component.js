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
var statistics_utils_1 = require("../../../../shared/helpers/statistics.utils");
var base_component_1 = require("../../../../shared/components/base/base.component");
var answer_model_1 = require("../../../../shared/models/elearning/answer.model");
var _ = require("underscore");
var excel_service_1 = require("../../../../shared/services/excel.service");
var exam_question_model_1 = require("../../../../shared/models/elearning/exam-question.model");
var question_sheet_model_1 = require("../../../../shared/models/elearning/question-sheet.model");
require("rxjs/add/observable/timer");
var option_model_1 = require("../../../../shared/models/elearning/option.model");
var base_model_1 = require("../../../../shared/models/base.model");
var ExamResultStatsReportComponent = (function (_super) {
    __extends(ExamResultStatsReportComponent, _super);
    function ExamResultStatsReportComponent(excelService, datePipe) {
        var _this = _super.call(this) || this;
        _this.excelService = excelService;
        _this.datePipe = datePipe;
        _this.optionPercentage = {};
        _this.statsUtils = new statistics_utils_1.StatsUtils();
        return _this;
    }
    ExamResultStatsReportComponent.prototype.export = function () {
        var header = [
            this.translateService.instant('Question'),
            this.translateService.instant('Option'),
            this.translateService.instant('Percentage'),
        ];
        this.excelService.exportAsExcelFile(header.concat(this.records), 'answer_statis');
    };
    ExamResultStatsReportComponent.prototype.clear = function () {
        this.records = [];
        this.optionPercentage = {};
    };
    ExamResultStatsReportComponent.prototype.render = function (exam) {
        var _this = this;
        this.clear();
        base_model_1.BaseModel
            .bulk_search(this, question_sheet_model_1.QuestionSheet.__api__byExam(exam.id), answer_model_1.Answer.__api__listByExam(exam.id))
            .subscribe(function (jsonArr) {
            var sheets = question_sheet_model_1.QuestionSheet.toArray(jsonArr[0]);
            var answers = answer_model_1.Answer.toArray(jsonArr[1]);
            _this.optionPercentage = _this.statsUtils.examAnswerStatistics(answers);
            exam_question_model_1.ExamQuestion.listBySheet(_this, sheets[0].id).subscribe(function (examQuestions) {
                var apiList = _.map(examQuestions, function (examQuestion) {
                    return option_model_1.QuestionOption.__api__listByQuestion(examQuestion.question_id);
                });
                base_model_1.BaseModel.bulk_search.apply(base_model_1.BaseModel, [_this].concat(apiList)).map(function (jsonArr) { return _.flatten(jsonArr); })
                    .subscribe(function (jsonArr) {
                    var options = option_model_1.QuestionOption.toArray(jsonArr);
                    _.each(examQuestions, function (examQuestion) {
                        examQuestion["options"] = _.filter(options, function (opt) {
                            return opt.question_id == examQuestion.question_id;
                        });
                    });
                    _this.records = examQuestions;
                });
            });
        });
    };
    ExamResultStatsReportComponent.prototype.getCheckPercentage = function (option) {
        if (this.optionPercentage[option.id])
            return this.optionPercentage[option.id];
        else
            return 0;
    };
    ExamResultStatsReportComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-result-stats-report',
            templateUrl: 'exam-result-stats-report.component.html',
        }),
        __metadata("design:paramtypes", [excel_service_1.ExcelService, common_1.DatePipe])
    ], ExamResultStatsReportComponent);
    return ExamResultStatsReportComponent;
}(base_component_1.BaseComponent));
exports.ExamResultStatsReportComponent = ExamResultStatsReportComponent;
//# sourceMappingURL=exam-result-stats-report.component.js.map
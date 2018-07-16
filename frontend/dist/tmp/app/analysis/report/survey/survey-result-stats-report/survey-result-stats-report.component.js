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
var survey_answer_model_1 = require("../../../../shared/models/elearning/survey-answer.model");
var excel_service_1 = require("../../../../shared/services/excel.service");
var survey_question_model_1 = require("../../../../shared/models/elearning/survey-question.model");
var survey_sheet_model_1 = require("../../../../shared/models/elearning/survey-sheet.model");
require("rxjs/add/observable/timer");
var _ = require("underscore");
var option_model_1 = require("../../../../shared/models/elearning/option.model");
var base_model_1 = require("../../../../shared/models/base.model");
var SurveyResultStatsReportComponent = (function (_super) {
    __extends(SurveyResultStatsReportComponent, _super);
    function SurveyResultStatsReportComponent(excelService, datePipe) {
        var _this = _super.call(this) || this;
        _this.excelService = excelService;
        _this.datePipe = datePipe;
        _this.optionPercentage = {};
        _this.statsUtils = new statistics_utils_1.StatsUtils();
        return _this;
    }
    SurveyResultStatsReportComponent.prototype.export = function () {
        var _this = this;
        var output = _.map(this.records, function (record) {
            var row = {};
            row["Qiestion"] = record["title"] + "/" + record["content"];
            row["Options"] = "";
            _.each(record["options"], function (option) {
                row["Options"] += _this.getRatePercentage(option) + ";";
            });
            return row;
        });
        this.excelService.exportAsExcelFile(output, 'exam_member_result_report');
    };
    SurveyResultStatsReportComponent.prototype.clear = function () {
        this.records = [];
        this.optionPercentage = {};
    };
    SurveyResultStatsReportComponent.prototype.render = function (survey) {
        var _this = this;
        this.clear();
        survey_sheet_model_1.SurveySheet.get(this, survey.sheet_id).subscribe(function (sheet) {
            survey_answer_model_1.SurveyAnswer.listBySurvey(_this, survey.id).subscribe(function (answers) {
                var statistics = _this.statsUtils.surveyAnswerStatistics(answers);
                _this.optionPercentage = statistics['multichoice'];
                _this.ratingPercentage = statistics['rating'];
                _this.openAnswers = statistics['open'];
                survey_question_model_1.SurveyQuestion.listBySheet(_this, sheet.id).subscribe(function (surveyQuestions) {
                    var apiList = _.map(surveyQuestions, function (surveyQuestion) {
                        return option_model_1.QuestionOption.__api__listByQuestion(surveyQuestion.question_id);
                    });
                    base_model_1.BaseModel.bulk_search.apply(base_model_1.BaseModel, [_this].concat(apiList)).map(function (jsonArr) { return _.flatten(jsonArr); })
                        .subscribe(function (jsonArr) {
                        var options = option_model_1.QuestionOption.toArray(jsonArr);
                        _.each(surveyQuestions, function (surveyQuestion) {
                            surveyQuestion["options"] = _.filter(options, function (opt) {
                                return opt.question_id == surveyQuestion.question_id;
                            });
                        });
                        _this.records = surveyQuestions;
                    });
                });
            });
        });
    };
    SurveyResultStatsReportComponent.prototype.getOpenAnswers = function (question) {
        if (this.openAnswers[question.id])
            return this.openAnswers[question.id];
        else
            return [];
    };
    SurveyResultStatsReportComponent.prototype.getRatePercentage = function (question) {
        if (this.ratingPercentage[question.id])
            return this.ratingPercentage[question.id];
        else
            return 0;
    };
    SurveyResultStatsReportComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'survey-result-stats-report',
            template: "    <div class=\"ui-g\">         <div class=\"ui-g-12\">             <p-table #dataTable [value]=\"records\" [responsive]=\"true\">             <ng-template pTemplate=\"caption\">                 {{'Exam answer statistics'|translate}}             </ng-template>             <ng-template pTemplate=\"header\">                 <tr>                     <th>{{'Option'|translate}}</th>                     <th>{{'Percent check'|translate}}</th>                 </tr>             </ng-template>             <ng-template pTemplate=\"body\" let-rowData let-rowIndex=\"rowIndex\">                 <tr>                     <td colspan=\"2\">                         <span>{{'Question'|translate}} {{1+rowIndex}}:</span>                         <div>{{rowData.title}}</div>                          <p [innerHTML]=\"rowData.content\"></p>                     </td>                 </tr>                 <tr *ngIf=\"rowData.type=='rate'\">                     <td>                         {{getRatePercentage(rowData)}} / {{rowData.max_rating}}                     </td>                 </tr>             </ng-template>             <ng-template pTemplate=\"summary\">                 {{'Total records'|translate}} : {{records?.length}}             </ng-template>             <ng-template pTemplate=\"emptymessage\">                 <tr>                     <td [attr.colspan]=\"2\">                         {{'No records found'|translate}}                     </td>                 </tr>             </ng-template>         </p-table>         </div>     </div>",
        }),
        __metadata("design:paramtypes", [excel_service_1.ExcelService, common_1.DatePipe])
    ], SurveyResultStatsReportComponent);
    return SurveyResultStatsReportComponent;
}(base_component_1.BaseComponent));
exports.SurveyResultStatsReportComponent = SurveyResultStatsReportComponent;

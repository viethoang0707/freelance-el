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
            templateUrl: 'survey-result-stats-report.component.html',
        }),
        __metadata("design:paramtypes", [excel_service_1.ExcelService, common_1.DatePipe])
    ], SurveyResultStatsReportComponent);
    return SurveyResultStatsReportComponent;
}(base_component_1.BaseComponent));
exports.SurveyResultStatsReportComponent = SurveyResultStatsReportComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9yZXBvcnQvc3VydmV5L3N1cnZleS1yZXN1bHQtc3RhdHMtcmVwb3J0L3N1cnZleS1yZXN1bHQtc3RhdHMtcmVwb3J0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFDcEUsMENBQTJDO0FBRzNDLGdGQUF5RTtBQUV6RSxvRkFBa0Y7QUFLbEYsK0ZBQXVGO0FBT3ZGLDJFQUF5RTtBQUV6RSxtR0FBMkY7QUFHM0YsNkZBQXFGO0FBR3JGLHFDQUFtQztBQUNuQyw4QkFBZ0M7QUFDaEMsaUZBQWtGO0FBQ2xGLG1FQUFpRTtBQVFqRTtJQUFzRCxvREFBYTtJQVEvRCwwQ0FBb0IsWUFBMEIsRUFBVSxRQUFrQjtRQUExRSxZQUNJLGlCQUFPLFNBR1Y7UUFKbUIsa0JBQVksR0FBWixZQUFZLENBQWM7UUFBVSxjQUFRLEdBQVIsUUFBUSxDQUFVO1FBRXRFLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDM0IsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDZCQUFVLEVBQUUsQ0FBQzs7SUFDdkMsQ0FBQztJQUdELGlEQUFNLEdBQU47UUFBQSxpQkFXQTtRQVZJLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFDLE1BQU07WUFDcEMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2IsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRSxHQUFHLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNELEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUE7WUFDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsVUFBQSxNQUFNO2dCQUM1QixHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksS0FBSSxDQUFD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QkFBZ0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7O1lBRXpDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUF6RVEsZ0NBQWdDO1FBTDVDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLDRCQUE0QjtZQUN0QyxXQUFXLEVBQUUsMkNBQTJDO1NBQzNELENBQUM7eUNBU29DLDRCQUFZLEVBQW9CLGlCQUFRO09BUmpFLGdDQUFnQyxDQTJFNUM7SUFBRCx1Q0FBQztDQTNFRCxBQTJFQyxDQTNFcUQsOEJBQWEsR0EyRWxFO0FBM0VZLDRFQUFnQyIsImZpbGUiOiJhcHAvYW5hbHlzaXMvcmVwb3J0L3N1cnZleS9zdXJ2ZXktcmVzdWx0LXN0YXRzLXJlcG9ydC9zdXJ2ZXktcmVzdWx0LXN0YXRzLXJlcG9ydC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBTdGF0c1V0aWxzIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvc3RhdGlzdGljcy51dGlscyc7XG5pbXBvcnQgeyBFeGFtIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtTG9nIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvbG9nLm1vZGVsJztcbmltcG9ydCB7IEV4YW1HcmFkZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tZ3JhZGUubW9kZWwnO1xuaW1wb3J0IHsgU3VibWlzc2lvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1Ym1pc3Npb24ubW9kZWwnO1xuaW1wb3J0IHsgU3VydmV5QW5zd2VyIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VydmV5LWFuc3dlci5tb2RlbCc7XG5pbXBvcnQgeyBTdXJ2ZXlNZW1iZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXktbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IEVYUE9SVF9EQVRFVElNRV9GT1JNQVQsIFJFUE9SVF9DQVRFR09SWSwgR1JPVVBfQ0FURUdPUlksIENPVVJTRV9NT0RFLCBDT1VSU0VfTUVNQkVSX0VOUk9MTF9TVEFUVVMsIEVYUE9SVF9EQVRFX0ZPUk1BVCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgUmVwb3J0IH0gZnJvbSAnLi4vLi4vcmVwb3J0LmRlY29yYXRvcic7XG5pbXBvcnQgeyBTZWxlY3RHcm91cERpYWxvZyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC1ncm91cC1kaWFsb2cvc2VsZWN0LWdyb3VwLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0VXNlcnNEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtdXNlci1kaWFsb2cvc2VsZWN0LXVzZXItZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaW1lQ29udmVydFBpcGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvcGlwZXMvdGltZS5waXBlJztcbmltcG9ydCB7IEV4Y2VsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9leGNlbC5zZXJ2aWNlJztcbmltcG9ydCB7IFN1cnZleSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1cnZleS5tb2RlbCc7XG5pbXBvcnQgeyBTdXJ2ZXlRdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1cnZleS1xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY2xvdWQvdG9rZW4ubW9kZWwnO1xuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBTdXJ2ZXlTaGVldCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1cnZleS1zaGVldC5tb2RlbCc7XG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgUXVlc3Rpb25Db250YWluZXJEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi8uLi8uLi9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL3F1ZXN0aW9uLWNvbnRhaW5lci5kaXJlY3RpdmUnO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL3RpbWVyJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBRdWVzdGlvbk9wdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL29wdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdzdXJ2ZXktcmVzdWx0LXN0YXRzLXJlcG9ydCcsXG4gICAgdGVtcGxhdGVVcmw6ICdzdXJ2ZXktcmVzdWx0LXN0YXRzLXJlcG9ydC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFN1cnZleVJlc3VsdFN0YXRzUmVwb3J0Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cbiAgICBwcml2YXRlIHJlY29yZHM6IGFueTtcbiAgICBwcml2YXRlIHN0YXRzVXRpbHM6IFN0YXRzVXRpbHM7XG4gICAgcHJpdmF0ZSBvcHRpb25QZXJjZW50YWdlOiBhbnk7XG4gICAgcHJpdmF0ZSByYXRpbmdQZXJjZW50YWdlOiBhbnk7XG4gICAgcHJpdmF0ZSBvcGVuQW5zd2VyczogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBleGNlbFNlcnZpY2U6IEV4Y2VsU2VydmljZSwgcHJpdmF0ZSBkYXRlUGlwZTogRGF0ZVBpcGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5vcHRpb25QZXJjZW50YWdlID0ge307XG4gICAgICAgIHRoaXMuc3RhdHNVdGlscyA9IG5ldyBTdGF0c1V0aWxzKCk7XG4gICAgfVxuXG5cbiAgICBleHBvcnQoKSB7XG4gICAgICAgIHZhciBvdXRwdXQgPSBfLm1hcCh0aGlzLnJlY29yZHMsIChyZWNvcmQpID0+IHtcbiAgICAgICAgICAgIHZhciByb3cgPSB7fTtcbiAgICAgICAgICAgIHJvd1tcIlFpZXN0aW9uXCJdID0gcmVjb3JkW1widGl0bGVcIl0gK1wiL1wiICsgcmVjb3JkW1wiY29udGVudFwiXTtcbiAgICAgICAgICAgIHJvd1tcIk9wdGlvbnNcIl0gPSBcIlwiXG4gICAgICAgICAgICBfLmVhY2gocmVjb3JkW1wib3B0aW9uc1wiXSwgb3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgICByb3dbXCJPcHRpb25zXCJdICs9IHRoaXMuZ2V0UmF0ZVBlcmNlbnRhZ2Uob3B0aW9uKStcIjtcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcm93O1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5leGNlbFNlcnZpY2UuZXhwb3J0QXNFeGNlbEZpbGUob3V0cHV0LCAnZXhhbV9tZW1iZXJfcmVzdWx0X3JlcG9ydCcpO1xuICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMucmVjb3JkcyA9IFtdO1xuICAgICAgICB0aGlzLm9wdGlvblBlcmNlbnRhZ2UgPSB7fTtcbiAgICB9XG5cbiAgICByZW5kZXIoc3VydmV5OiBTdXJ2ZXkpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICBTdXJ2ZXlTaGVldC5nZXQodGhpcywgc3VydmV5LnNoZWV0X2lkKS5zdWJzY3JpYmUoc2hlZXQgPT4ge1xuICAgICAgICAgICAgU3VydmV5QW5zd2VyLmxpc3RCeVN1cnZleSh0aGlzLCBzdXJ2ZXkuaWQpLnN1YnNjcmliZShhbnN3ZXJzID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGlzdGljcyA9IHRoaXMuc3RhdHNVdGlscy5zdXJ2ZXlBbnN3ZXJTdGF0aXN0aWNzKGFuc3dlcnMpO1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uUGVyY2VudGFnZSA9IHN0YXRpc3RpY3NbJ211bHRpY2hvaWNlJ107XG4gICAgICAgICAgICAgICAgdGhpcy5yYXRpbmdQZXJjZW50YWdlID0gc3RhdGlzdGljc1sncmF0aW5nJ107XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuQW5zd2VycyA9IHN0YXRpc3RpY3NbJ29wZW4nXTtcbiAgICAgICAgICAgICAgICBTdXJ2ZXlRdWVzdGlvbi5saXN0QnlTaGVldCh0aGlzLCBzaGVldC5pZCkuc3Vic2NyaWJlKHN1cnZleVF1ZXN0aW9ucyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhcGlMaXN0ID0gXy5tYXAoc3VydmV5UXVlc3Rpb25zLCAoc3VydmV5UXVlc3Rpb246IFN1cnZleVF1ZXN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUXVlc3Rpb25PcHRpb24uX19hcGlfX2xpc3RCeVF1ZXN0aW9uKHN1cnZleVF1ZXN0aW9uLnF1ZXN0aW9uX2lkKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgQmFzZU1vZGVsLmJ1bGtfc2VhcmNoKHRoaXMsIC4uLmFwaUxpc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwKGpzb25BcnIgPT4gXy5mbGF0dGVuKGpzb25BcnIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShqc29uQXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IFF1ZXN0aW9uT3B0aW9uLnRvQXJyYXkoanNvbkFycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5lYWNoKHN1cnZleVF1ZXN0aW9ucywgKHN1cnZleVF1ZXN0aW9uOiBTdXJ2ZXlRdWVzdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXJ2ZXlRdWVzdGlvbltcIm9wdGlvbnNcIl0gPSBfLmZpbHRlcihvcHRpb25zLCAob3B0OiBRdWVzdGlvbk9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdC5xdWVzdGlvbl9pZCA9PSBzdXJ2ZXlRdWVzdGlvbi5xdWVzdGlvbl9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNvcmRzID0gc3VydmV5UXVlc3Rpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0T3BlbkFuc3dlcnMocXVlc3Rpb24pIHtcbiAgICAgICAgaWYgKHRoaXMub3BlbkFuc3dlcnNbcXVlc3Rpb24uaWRdKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbkFuc3dlcnNbcXVlc3Rpb24uaWRdXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBnZXRSYXRlUGVyY2VudGFnZShxdWVzdGlvbikge1xuICAgICAgICBpZiAodGhpcy5yYXRpbmdQZXJjZW50YWdlW3F1ZXN0aW9uLmlkXSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhdGluZ1BlcmNlbnRhZ2VbcXVlc3Rpb24uaWRdXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgIH1cblxufVxuIl19

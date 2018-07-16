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
        var _this = this;
        var output = _.map(this.records, function (record) {
            var row = {};
            row["Question"] = _this.strip(record["content"]);
            row["Options"] = "";
            row["Options Percentages"] = "";
            _.each(record["options"], function (option) {
                row["Options Percentages"] += Math.round(_this.getCheckPercentage(option) * 100) / 100 + "| ";
                row["Options"] += option.content + "| ";
            });
            return row;
        });
        this.excelService.exportAsExcelFile(output, 'exam_member_result_report');
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
            var statistics = _this.statsUtils.examAnswerStatistics(answers);
            _this.optionPercentage = statistics['multichoice'];
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
    ExamResultStatsReportComponent.prototype.strip = function (html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9yZXBvcnQvZXhhbS9leGFtLXJlc3VsdC1zdGF0cy1yZXBvcnQvZXhhbS1yZXN1bHQtc3RhdHMtcmVwb3J0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFDcEUsMENBQTJDO0FBRzNDLGdGQUF5RTtBQUV6RSxvRkFBa0Y7QUFLbEYsaUZBQTBFO0FBRTFFLDhCQUFnQztBQU1oQywyRUFBeUU7QUFFekUsK0ZBQXVGO0FBR3ZGLGlHQUF5RjtBQUd6RixxQ0FBbUM7QUFDbkMsaUZBQWtGO0FBQ2xGLG1FQUFpRTtBQVFqRTtJQUFvRCxrREFBYTtJQU03RCx3Q0FBb0IsWUFBMEIsRUFBVSxRQUFrQjtRQUExRSxZQUNJLGlCQUFPLFNBR1Y7UUFKbUIsa0JBQVksR0FBWixZQUFZLENBQWM7UUFBVSxjQUFRLEdBQVIsUUFBUSxDQUFVO1FBRXRFLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDM0IsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDZCQUFVLEVBQUUsQ0FBQzs7SUFDdkMsQ0FBQztJQUVELCtDQUFNLEdBQU47UUFBQSxpQkFhQztRQVpHLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFDLE1BQU07WUFDcEMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2IsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDaEQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNwQixHQUFHLENBQUMscUJBQXFCLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsVUFBQyxNQUFXO2dCQUNsQyxHQUFHLENB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QUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBOztZQUV2QyxPQUFPLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBR0QsOENBQUssR0FBTCxVQUFNLElBQUk7UUFDTixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE9BQU8sR0FBRyxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBM0VRLDhCQUE4QjtRQUwxQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSwwQkFBMEI7WUFDcEMsV0FBVyxFQUFFLHlDQUF5QztTQUN6RCxDQUFDO3lDQU9vQyw0QkFBWSxFQUFvQixpQkFBUTtPQU5qRSw4QkFBOEIsQ0E0RTFDO0lBQUQscUNBQUM7Q0E1RUQsQUE0RUMsQ0E1RW1ELDhCQUFhLEdBNEVoRTtBQTVFWSx3RUFBOEIiLCJmaWxlIjoiYXBwL2FuYWx5c2lzL3JlcG9ydC9leGFtL2V4YW0tcmVzdWx0LXN0YXRzLXJlcG9ydC9leGFtLXJlc3VsdC1zdGF0cy1yZXBvcnQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RhdHNVdGlscyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3N0YXRpc3RpY3MudXRpbHMnO1xuaW1wb3J0IHsgRXhhbSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0ubW9kZWwnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgRXhhbUxvZyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2xvZy5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtR3JhZGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLWdyYWRlLm1vZGVsJztcbmltcG9ydCB7IFN1Ym1pc3Npb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdWJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IEFuc3dlciB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2Fuc3dlci5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IEVYUE9SVF9EQVRFVElNRV9GT1JNQVQsIFJFUE9SVF9DQVRFR09SWSwgR1JPVVBfQ0FURUdPUlksIENPVVJTRV9NT0RFLCBDT1VSU0VfTUVNQkVSX0VOUk9MTF9TVEFUVVMsIEVYUE9SVF9EQVRFX0ZPUk1BVCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgUmVwb3J0IH0gZnJvbSAnLi4vLi4vcmVwb3J0LmRlY29yYXRvcic7XG5pbXBvcnQgeyBTZWxlY3RHcm91cERpYWxvZyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC1ncm91cC1kaWFsb2cvc2VsZWN0LWdyb3VwLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0VXNlcnNEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtdXNlci1kaWFsb2cvc2VsZWN0LXVzZXItZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaW1lQ29udmVydFBpcGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvcGlwZXMvdGltZS5waXBlJztcbmltcG9ydCB7IEV4Y2VsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9leGNlbC5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgRXhhbVF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY2xvdWQvdG9rZW4ubW9kZWwnO1xuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBRdWVzdGlvblNoZWV0IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvcXVlc3Rpb24tc2hlZXQubW9kZWwnO1xuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IFF1ZXN0aW9uQ29udGFpbmVyRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vLi4vLi4vYXNzZXNzbWVudC9xdWVzdGlvbi9xdWVzdGlvbi10ZW1wbGF0ZS9xdWVzdGlvbi1jb250YWluZXIuZGlyZWN0aXZlJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS90aW1lcic7XG5pbXBvcnQgeyBRdWVzdGlvbk9wdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL29wdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdleGFtLXJlc3VsdC1zdGF0cy1yZXBvcnQnLFxuICAgIHRlbXBsYXRlVXJsOiAnZXhhbS1yZXN1bHQtc3RhdHMtcmVwb3J0LmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgRXhhbVJlc3VsdFN0YXRzUmVwb3J0Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cbiAgICBwcml2YXRlIHJlY29yZHM6IGFueTtcbiAgICBwcml2YXRlIHN0YXRzVXRpbHM6IFN0YXRzVXRpbHM7XG4gICAgcHJpdmF0ZSBvcHRpb25QZXJjZW50YWdlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV4Y2VsU2VydmljZTogRXhjZWxTZXJ2aWNlLCBwcml2YXRlIGRhdGVQaXBlOiBEYXRlUGlwZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm9wdGlvblBlcmNlbnRhZ2UgPSB7fTtcbiAgICAgICAgdGhpcy5zdGF0c1V0aWxzID0gbmV3IFN0YXRzVXRpbHMoKTtcbiAgICB9XG5cbiAgICBleHBvcnQoKSB7XG4gICAgICAgIHZhciBvdXRwdXQgPSBfLm1hcCh0aGlzLnJlY29yZHMsIChyZWNvcmQpID0+IHtcbiAgICAgICAgICAgIHZhciByb3cgPSB7fTtcbiAgICAgICAgICAgIHJvd1tcIlF1ZXN0aW9uXCJdID0gdGhpcy5zdHJpcChyZWNvcmRbXCJjb250ZW50XCJdKTtcbiAgICAgICAgICAgIHJvd1tcIk9wdGlvbnNcIl0gPSBcIlwiO1xuICAgICAgICAgICAgcm93W1wiT3B0aW9ucyBQZXJjZW50YWdlc1wiXSA9IFwiXCI7XG4gICAgICAgICAgICBfLmVhY2gocmVjb3JkW1wib3B0aW9uc1wiXSwgKG9wdGlvbjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcm93W1wiT3B0aW9ucyBQZXJjZW50YWdlc1wiXSArPSBNYXRoLnJvdW5kKHRoaXMuZ2V0Q2hlY2tQZXJjZW50YWdlKG9wdGlvbikgKiAxMDApIC8gMTAwICsgXCJ8IFwiO1xuICAgICAgICAgICAgICAgIHJvd1tcIk9wdGlvbnNcIl0gKz0gb3B0aW9uLmNvbnRlbnQgKyBcInwgXCI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByb3c7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmV4Y2VsU2VydmljZS5leHBvcnRBc0V4Y2VsRmlsZShvdXRwdXQsICdleGFtX21lbWJlcl9yZXN1bHRfcmVwb3J0Jyk7XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMucmVjb3JkcyA9IFtdO1xuICAgICAgICB0aGlzLm9wdGlvblBlcmNlbnRhZ2UgPSB7fTtcbiAgICB9XG5cbiAgICByZW5kZXIoZXhhbTogRXhhbSkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIEJhc2VNb2RlbFxuICAgICAgICAgICAgLmJ1bGtfc2VhcmNoKHRoaXMsXG4gICAgICAgICAgICAgICAgUXVlc3Rpb25TaGVldC5fX2FwaV9fYnlFeGFtKGV4YW0uaWQpLFxuICAgICAgICAgICAgICAgIEFuc3dlci5fX2FwaV9fbGlzdEJ5RXhhbShleGFtLmlkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoanNvbkFyciA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHNoZWV0cyA9IFF1ZXN0aW9uU2hlZXQudG9BcnJheShqc29uQXJyWzBdKTtcbiAgICAgICAgICAgICAgICB2YXIgYW5zd2VycyA9IEFuc3dlci50b0FycmF5KGpzb25BcnJbMV0pO1xuICAgICAgICAgICAgICAgIHZhciBzdGF0aXN0aWNzID0gdGhpcy5zdGF0c1V0aWxzLmV4YW1BbnN3ZXJTdGF0aXN0aWNzKGFuc3dlcnMpO1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uUGVyY2VudGFnZSA9IHN0YXRpc3RpY3NbJ211bHRpY2hvaWNlJ107XG4gICAgICAgICAgICAgICAgRXhhbVF1ZXN0aW9uLmxpc3RCeVNoZWV0KHRoaXMsIHNoZWV0c1swXS5pZCkuc3Vic2NyaWJlKGV4YW1RdWVzdGlvbnMgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXBpTGlzdCA9IF8ubWFwKGV4YW1RdWVzdGlvbnMsIChleGFtUXVlc3Rpb246IEV4YW1RdWVzdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFF1ZXN0aW9uT3B0aW9uLl9fYXBpX19saXN0QnlRdWVzdGlvbihleGFtUXVlc3Rpb24ucXVlc3Rpb25faWQpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBCYXNlTW9kZWwuYnVsa19zZWFyY2godGhpcywgLi4uYXBpTGlzdClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoanNvbkFyciA9PiBfLmZsYXR0ZW4oanNvbkFycikpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKGpzb25BcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gUXVlc3Rpb25PcHRpb24udG9BcnJheShqc29uQXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmVhY2goZXhhbVF1ZXN0aW9ucywgKGV4YW1RdWVzdGlvbjogRXhhbVF1ZXN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4YW1RdWVzdGlvbltcIm9wdGlvbnNcIl0gPSBfLmZpbHRlcihvcHRpb25zLCAob3B0OiBRdWVzdGlvbk9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdC5xdWVzdGlvbl9pZCA9PSBleGFtUXVlc3Rpb24ucXVlc3Rpb25faWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVjb3JkcyA9IGV4YW1RdWVzdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgZ2V0Q2hlY2tQZXJjZW50YWdlKG9wdGlvbikge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25QZXJjZW50YWdlW29wdGlvbi5pZF0pXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25QZXJjZW50YWdlW29wdGlvbi5pZF1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG5cbiAgICBzdHJpcChodG1sKSB7XG4gICAgICAgIHZhciB0bXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiRElWXCIpO1xuICAgICAgICB0bXAuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgcmV0dXJuIHRtcC50ZXh0Q29udGVudCB8fCB0bXAuaW5uZXJUZXh0IHx8IFwiXCI7XG4gICAgfVxufVxuIl19

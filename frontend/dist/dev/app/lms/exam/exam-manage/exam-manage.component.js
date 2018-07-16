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
            templateUrl: 'exam-manage.component.html',
            styleUrls: ['exam-manage.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute])
    ], ExamManageComponent);
    return ExamManageComponent;
}(base_component_1.BaseComponent));
exports.ExamManageComponent = ExamManageComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvZXhhbS9leGFtLW1hbmFnZS9leGFtLW1hbmFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBQ3BFLDBDQUFpRTtBQUdqRSxpRkFBK0U7QUFLL0UsOEJBQWdDO0FBVWhDLDBFQUFtRTtBQUluRSx3RkFBZ0Y7QUFDaEYsMkdBQThGO0FBRzlGLCtGQUFrRjtBQUNsRix1SEFBeUc7QUFDekcsOEZBQXNGO0FBQ3RGLDRGQUErRTtBQUMvRSx5RkFBNEU7QUFDNUUsZ0VBQThEO0FBQzlELHdGQUFnRjtBQVNoRjtJQUF5Qyx1Q0FBYTtJQWVsRCw2QkFBb0IsTUFBYyxFQUFVLEtBQXFCO1FBQWpFLFlBQ0ksaUJBQU8sU0FHVjtRQUptQixZQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsV0FBSyxHQUFMLEtBQUssQ0FBZ0I7UUFFN0QsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFJLEVBQUUsQ0FBQztRQUN2QixLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksOEJBQVUsRUFBRSxDQUFDOztJQUNuQyxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUFBLGlCQVVDO1FBVEcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUM5QixJQUFJLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuQyxJQUFJLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvQixLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDeEMsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwRCxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxj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UUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7U0FDM0MsQ0FBQzt5Q0FnQjhCLGVBQU0sRUFBaUIsdUJBQWM7T0FmeEQsbUJBQW1CLENBMkUvQjtJQUFELDBCQUFDO0NBM0VELEFBMkVDLENBM0V3Qyw4QkFBYSxHQTJFckQ7QUEzRVksa0RBQW1CIiwiZmlsZSI6ImFwcC9sbXMvZXhhbS9leGFtLW1hbmFnZS9leGFtLW1hbmFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UubW9kZWwnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlQ2xhc3MgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtY2xhc3MubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgVHJlZVV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvdHJlZS51dGlscyc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IFNlbGVjdEl0ZW0sIE1lbnVJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtcbiAgICBHUk9VUF9DQVRFR09SWSwgQ09OVEVOVF9TVEFUVVMsIENPVVJTRV9NT0RFLCBDT1VSU0VfTUVNQkVSX1JPTEUsXG4gICAgQ09VUlNFX01FTUJFUl9TVEFUVVMsIENPVVJTRV9NRU1CRVJfRU5ST0xMX1NUQVRVU1xufSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IFNlbGVjdFVzZXJzRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0LXVzZXItZGlhbG9nL3NlbGVjdC11c2VyLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgRXhhbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0ubW9kZWwnO1xuaW1wb3J0IHsgQW5zd2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvYW5zd2VyLm1vZGVsJztcbmltcG9ydCB7IFN1Ym1pc3Npb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdWJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IEV4YW1RdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgRXhhbU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uTWFya2luZ0RpYWxvZyB9IGZyb20gJy4uL3F1ZXN0aW9uLW1hcmtpbmcvcXVlc3Rpb24tbWFya2luZy5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEV4YW1HcmFkZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tZ3JhZGUubW9kZWwnO1xuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IEFuc3dlclByaW50RGlhbG9nIH0gZnJvbSAnLi4vYW5zd2VyLXByaW50L2Fuc3dlci1wcmludC5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFF1ZXN0aW9uU2hlZXRQcmludERpYWxvZyB9IGZyb20gJy4uL3F1ZXN0aW9uLXNoZWV0LXByaW50L3F1ZXN0aW9uLXNoZWV0LXByaW50LmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUXVlc3Rpb25TaGVldCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLXNoZWV0Lm1vZGVsJztcbmltcG9ydCB7IEV4YW1SZXBvcnREaWFsb2cgfSBmcm9tICcuLi9leGFtLXJlcG9ydC9leGFtLXJlcG9ydC5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEV4YW1TdGF0c0RpYWxvZyB9IGZyb20gJy4uL2V4YW0tc3RhdHMvZXhhbS1zdGF0cy5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtUmVjb3JkIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1yZWNvcmQubW9kZWwnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdleGFtLW1hbmFnZScsXG4gICAgdGVtcGxhdGVVcmw6ICdleGFtLW1hbmFnZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2V4YW0tbWFuYWdlLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgRXhhbU1hbmFnZUNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHJpdmF0ZSBleGFtOiBFeGFtO1xuICAgIHByaXZhdGUgbWVtYmVyOiBFeGFtTWVtYmVyO1xuICAgIHByaXZhdGUgbWVtYmVyczogRXhhbU1lbWJlcltdO1xuICAgIHByaXZhdGUgc2VsZWN0ZWRNZW1iZXI6IGFueTtcbiAgICBwcml2YXRlIHF1ZXN0aW9uczogRXhhbVF1ZXN0aW9uW107XG4gICAgcHJpdmF0ZSByZWNvcmRzOiBFeGFtUmVjb3JkW107XG5cbiAgICBAVmlld0NoaWxkKFF1ZXN0aW9uTWFya2luZ0RpYWxvZykgcXVlc3Rpb25NYXJrRGlhbG9nOiBRdWVzdGlvbk1hcmtpbmdEaWFsb2c7XG4gICAgQFZpZXdDaGlsZChBbnN3ZXJQcmludERpYWxvZykgYW5zd2VyU2hlZXREaWFsb2c6IEFuc3dlclByaW50RGlhbG9nO1xuICAgIEBWaWV3Q2hpbGQoUXVlc3Rpb25TaGVldFByaW50RGlhbG9nKSBxdWVzdGlvblNoZWV0RGlhbG9nOiBRdWVzdGlvblNoZWV0UHJpbnREaWFsb2c7XG4gICAgQFZpZXdDaGlsZChFeGFtUmVwb3J0RGlhbG9nKSByZXBvcnREaWFsb2c6IEV4YW1SZXBvcnREaWFsb2c7XG4gICAgQFZpZXdDaGlsZChFeGFtU3RhdHNEaWFsb2cpIHN0YXRzRGlhbG9nOiBFeGFtU3RhdHNEaWFsb2c7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmV4YW0gPSBuZXcgRXhhbSgpO1xuICAgICAgICB0aGlzLm1lbWJlciA9IG5ldyBFeGFtTWVtYmVyKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICAgICAgdmFyIG1lbWJlcklkID0gK3BhcmFtc1snbWVtYmVySWQnXTtcbiAgICAgICAgICAgIHZhciBleGFtSWQgPSArcGFyYW1zWydleGFtSWQnXTtcbiAgICAgICAgICAgIHRoaXMubG1zUHJvZmlsZVNlcnZpY2UuaW5pdCh0aGlzKS5zdWJzY3JpYmUoKCk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5leGFtID0gdGhpcy5sbXNQcm9maWxlU2VydmljZS5leGFtQnlJZChleGFtSWQpO1xuICAgICAgICAgICAgICAgIHRoaXMubWVtYmVyID0gdGhpcy5sbXNQcm9maWxlU2VydmljZS5leGFtTWVtYmVyQnlJZChtZW1iZXJJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkU2NvcmVzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hvd1F1ZXN0aW9uU2hlZXQoKSB7XG4gICAgICAgIFF1ZXN0aW9uU2hlZXQuZ2V0KHRoaXMsIHRoaXMuZXhhbS5zaGVldF9pZCkuc3Vic2NyaWJlKChzaGVldDogUXVlc3Rpb25TaGVldCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFzaGVldCB8fCAhc2hlZXQuZmluYWxpemVkKVxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IodGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ1RoZSBleGFtIHF1ZXN0aW9ucyBoYXMgbm90IGJlZW4gc2V0IHVwJykpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMucXVlc3Rpb25TaGVldERpYWxvZy5zaG93KHRoaXMuZXhhbSwgc2hlZXQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIHZpZXdBbnN3ZXJTaGVldCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRNZW1iZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTWVtYmVyLmVucm9sbF9zdGF0dXMgIT0gJ2NvbXBsZXRlZCcpXG4gICAgICAgICAgICAgICAgdGhpcy5pbmZvKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdTdHVkZW50IGhhcyBub3QgY29tcGxldGVkIHRoZSBleGFtJykpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuYW5zd2VyU2hlZXREaWFsb2cuc2hvdyh0aGlzLmV4YW0sIHRoaXMuc2VsZWN0ZWRNZW1iZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZFNjb3JlcygpIHtcbiAgICAgICAgQmFzZU1vZGVsLmJ1bGtfc2VhcmNoKHRoaXMsXG4gICAgICAgICAgICBFeGFtTWVtYmVyLl9fYXBpX19saXN0Q2FuZGlkYXRlQnlFeGFtKHRoaXMuZXhhbS5pZCksXG4gICAgICAgICAgICBFeGFtUmVjb3JkLl9fYXBpX19saXN0QnlFeGFtKHRoaXMuZXhhbS5pZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGpzb25BcnIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWVtYmVycyA9IEV4YW1NZW1iZXIudG9BcnJheShqc29uQXJyWzBdKTtcbiAgICAgICAgICAgICAgICB0aGlzLiByZWNvcmRzID0gRXhhbVJlY29yZC50b0FycmF5KGpzb25BcnJbMV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hvd0V4YW1SZXBvcnQoKSB7XG4gICAgICAgIHRoaXMucmVwb3J0RGlhbG9nLnNob3codGhpcy5leGFtKTtcbiAgICB9XG5cbiAgICBzaG93RXhhbVN0YXRzKCkge1xuICAgICAgICB0aGlzLnN0YXRzRGlhbG9nLnNob3codGhpcy5leGFtKTtcbiAgICB9XG5cbiAgICBnZXRFeGFtUmVjb3JkKG1lbWJlcjogRXhhbU1lbWJlcikge1xuICAgICAgICByZXR1cm4gXy5maW5kKHRoaXMucmVjb3JkcywgKHJlY29yZDogRXhhbVJlY29yZCk9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkLm1lbWJlcl9pZCA9PSBtZW1iZXIuaWRcbiAgICAgICAgfSkgfHwgbmV3IEV4YW1SZWNvcmQoKTtcbiAgICB9XG59XG4iXX0=

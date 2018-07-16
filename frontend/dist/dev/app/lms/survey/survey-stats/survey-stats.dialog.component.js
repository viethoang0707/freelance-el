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
var base_component_1 = require("../../../shared/components/base/base.component");
require("rxjs/add/observable/timer");
var survey_result_stats_report_component_1 = require("../../../analysis/report/survey/survey-result-stats-report/survey-result-stats-report.component");
var SurveyStatsDialog = (function (_super) {
    __extends(SurveyStatsDialog, _super);
    function SurveyStatsDialog() {
        var _this = _super.call(this) || this;
        _this.display = false;
        return _this;
    }
    SurveyStatsDialog.prototype.show = function (survey) {
        this.display = true;
        this.statsReport.render(survey);
    };
    SurveyStatsDialog.prototype.hide = function () {
        this.display = false;
        this.statsReport.clear();
    };
    SurveyStatsDialog.prototype.export = function () {
        this.statsReport.export();
    };
    __decorate([
        core_1.ViewChild(survey_result_stats_report_component_1.SurveyResultStatsReportComponent),
        __metadata("design:type", survey_result_stats_report_component_1.SurveyResultStatsReportComponent)
    ], SurveyStatsDialog.prototype, "statsReport", void 0);
    SurveyStatsDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'survey-stats-dialog',
            templateUrl: 'survey-stats.dialog.component.html',
            styleUrls: ['survey-stats.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], SurveyStatsDialog);
    return SurveyStatsDialog;
}(base_component_1.BaseComponent));
exports.SurveyStatsDialog = SurveyStatsDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvc3VydmV5L3N1cnZleS1zdGF0cy9zdXJ2ZXktc3RhdHMuZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBdUg7QUFLdkgsaUZBQStFO0FBYS9FLHFDQUFtQztBQUduQyx3SkFBbUo7QUFRbko7SUFBdUMscUNBQWE7SUFPaEQ7UUFBQSxZQUNJLGlCQUFPLFNBRVY7UUFERyxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs7SUFDekIsQ0FBQztJQUVELGdDQUFJLEdBQUosVUFBSyxNQUFjO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELGdDQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRixrQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBbkI2QztRQUE1QyxnQkFBUyxDQUFDLHVFQUFnQyxDQUFDO2tDQUFjLHVFQUFnQzswREFBQztJQUxsRixpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFdBQVcsRUFBRSxvQ0FBb0M7WUFDakQsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7U0FDbkQsQ0FBQzs7T0FDVyxpQkFBaUIsQ0F5QjdCO0lBQUQsd0JBQUM7Q0F6QkQsQUF5QkMsQ0F6QnNDLDhCQUFhLEdBeUJuRDtBQXpCWSw4Q0FBaUIiLCJmaWxlIjoiYXBwL2xtcy9zdXJ2ZXkvc3VydmV5LXN0YXRzL3N1cnZleS1zdGF0cy5kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIFZpZXdDaGlsZHJlbiwgUXVlcnlMaXN0LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXhjZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2V4Y2VsLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdXJ2ZXkgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXkubW9kZWwnO1xuaW1wb3J0IHsgRXhhbVF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBBbnN3ZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9hbnN3ZXIubW9kZWwnO1xuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Nsb3VkL3Rva2VuLm1vZGVsJztcbmltcG9ydCB7IFN1Ym1pc3Npb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdWJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgUXVlc3Rpb25TaGVldCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLXNoZWV0Lm1vZGVsJztcbmltcG9ydCB7IEV4YW1NZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgUXVlc3Rpb25Db250YWluZXJEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi8uLi9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL3F1ZXN0aW9uLWNvbnRhaW5lci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSVF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vYXNzZXNzbWVudC9xdWVzdGlvbi9xdWVzdGlvbi10ZW1wbGF0ZS9xdWVzdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUXVlc3Rpb25SZWdpc3RlciB9IGZyb20gJy4uLy4uLy4uL2Fzc2Vzc21lbnQvcXVlc3Rpb24vcXVlc3Rpb24tdGVtcGxhdGUvcXVlc3Rpb24uZGVjb3JhdG9yJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS90aW1lcic7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgUXVlc3Rpb25PcHRpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9vcHRpb24ubW9kZWwnO1xuaW1wb3J0IHsgU3VydmV5UmVzdWx0U3RhdHNSZXBvcnRDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9hbmFseXNpcy9yZXBvcnQvc3VydmV5L3N1cnZleS1yZXN1bHQtc3RhdHMtcmVwb3J0L3N1cnZleS1yZXN1bHQtc3RhdHMtcmVwb3J0LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdzdXJ2ZXktc3RhdHMtZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3N1cnZleS1zdGF0cy5kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydzdXJ2ZXktc3RhdHMuZGlhbG9nLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgU3VydmV5U3RhdHNEaWFsb2cgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgICBcbiAgICBcbiAgICBwcml2YXRlIGRpc3BsYXk6IGJvb2xlYW47XG4gICAgXG4gICAgQFZpZXdDaGlsZChTdXJ2ZXlSZXN1bHRTdGF0c1JlcG9ydENvbXBvbmVudCkgc3RhdHNSZXBvcnQ6IFN1cnZleVJlc3VsdFN0YXRzUmVwb3J0Q29tcG9uZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNob3coc3VydmV5OiBTdXJ2ZXkpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zdGF0c1JlcG9ydC5yZW5kZXIoc3VydmV5KTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0c1JlcG9ydC5jbGVhcigpO1xuICAgIH1cblxuICAgZXhwb3J0KCkge1xuICAgICAgIHRoaXMuc3RhdHNSZXBvcnQuZXhwb3J0KCk7XG4gICB9XG59XG5cblxuXG4iXX0=

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
var exam_model_1 = require("../../../../shared/models/elearning/exam.model");
var base_component_1 = require("../../../../shared/components/base/base.component");
var constants_1 = require("../../../../shared/models/constants");
var report_decorator_1 = require("../../report.decorator");
var exam_result_report_component_1 = require("./exam-result-report.component");
var ExamResultReportContainerComponent = (function (_super) {
    __extends(ExamResultReportContainerComponent, _super);
    function ExamResultReportContainerComponent() {
        return _super.call(this) || this;
    }
    ExamResultReportContainerComponent.prototype.ngOnInit = function () {
        var _this = this;
        exam_model_1.Exam.all(this).subscribe(function (exams) {
            _this.exams = exams;
        });
    };
    ExamResultReportContainerComponent.prototype.export = function () {
        if (this.selectedExam)
            this.examReport.export();
    };
    ExamResultReportContainerComponent.prototype.selectExam = function () {
        if (this.selectedExam) {
            this.examReport.clear();
            this.examReport.render(this.selectedExam);
        }
    };
    __decorate([
        core_1.ViewChild(exam_result_report_component_1.ExamResultReportComponent),
        __metadata("design:type", exam_result_report_component_1.ExamResultReportComponent)
    ], ExamResultReportContainerComponent.prototype, "examReport", void 0);
    ExamResultReportContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-result-report-container',
            templateUrl: 'exam-result-report-container.component.html',
        }),
        report_decorator_1.Report({
            title: 'Exam result report',
            category: constants_1.REPORT_CATEGORY.EXAM
        }),
        __metadata("design:paramtypes", [])
    ], ExamResultReportContainerComponent);
    return ExamResultReportContainerComponent;
}(base_component_1.BaseComponent));
exports.ExamResultReportContainerComponent = ExamResultReportContainerComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9yZXBvcnQvZXhhbS9leGFtLXJlc3VsdC1yZXBvcnQvZXhhbS1yZXN1bHQtcmVwb3J0LWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW1FO0FBS25FLDZFQUFzRTtBQUN0RSxvRkFBa0Y7QUFRbEYsaUVBQTJLO0FBQzNLLDJEQUFnRDtBQUtoRCwrRUFBMkU7QUFZM0U7SUFBd0Qsc0RBQWE7SUFNakU7ZUFDSSxpQkFBTztJQUNYLENBQUM7SUFFRCxxREFBUSxHQUFSO1FBQUEsaUJBSUM7UUFIQSxpQkFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQzdCLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELG1EQUFNLEdBQU47UUFDQyxJQUFJLElBQUksQ0FBQyxZQUFZO1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsdURBQVUsR0FBVjtRQUNDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNoRDtJQUNGLENBQUM7SUF0QnFDO1FBQXJDLGdCQUFTLENBQUMsd0RBQXlCLENBQUM7a0NBQWEsd0RBQXlCOzBFQUFDO0lBSm5FLGtDQUFrQztRQVQ5QyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSw4QkFBOEI7WUFDeEMsV0FBVyxFQUFFLDZDQUE2QztTQUM3RCxDQUFDO1FBQ0QseUJBQU0sQ0FBQztZQUNKLEtBQUssRUFBQyxvQkFBb0I7WUFDMUIsUUFBUSxFQUFDLDJCQUFlLENBQUMsSUFBSTtTQUNoQyxDQUFDOztPQUNXLGtDQUFrQyxDQTRCOUM7SUFBRCx5Q0FBQztDQTVCRCxBQTRCQyxDQTVCdUQsOEJBQWEsR0E0QnBFO0FBNUJZLGdGQUFrQyIsImZpbGUiOiJhcHAvYW5hbHlzaXMvcmVwb3J0L2V4YW0vZXhhbS1yZXN1bHQtcmVwb3J0L2V4YW0tcmVzdWx0LXJlcG9ydC1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBSZXBvcnRVdGlscyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3JlcG9ydC51dGlscyc7XG5pbXBvcnQgeyBFeGFtIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtTG9nIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvbG9nLm1vZGVsJztcbmltcG9ydCB7IEV4YW1HcmFkZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tZ3JhZGUubW9kZWwnO1xuaW1wb3J0IHsgU3VibWlzc2lvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1Ym1pc3Npb24ubW9kZWwnO1xuaW1wb3J0IHsgQW5zd2VyIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvYW5zd2VyLm1vZGVsJztcbmltcG9ydCB7IEV4YW1NZW1iZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgRVhQT1JUX0RBVEVUSU1FX0ZPUk1BVCwgUkVQT1JUX0NBVEVHT1JZLCBHUk9VUF9DQVRFR09SWSwgQ09VUlNFX01PREUsIENPVVJTRV9NRU1CRVJfRU5ST0xMX1NUQVRVUywgRVhQT1JUX0RBVEVfRk9STUFUIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBSZXBvcnQgfSBmcm9tICcuLi8uLi9yZXBvcnQuZGVjb3JhdG9yJztcbmltcG9ydCB7IFNlbGVjdEdyb3VwRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0LWdyb3VwLWRpYWxvZy9zZWxlY3QtZ3JvdXAtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWxlY3RVc2Vyc0RpYWxvZyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC11c2VyLWRpYWxvZy9zZWxlY3QtdXNlci1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFRpbWVDb252ZXJ0UGlwZX0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3BpcGVzL3RpbWUucGlwZSc7XG5pbXBvcnQgeyBFeGNlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvZXhjZWwuc2VydmljZSc7XG5pbXBvcnQgeyBFeGFtUmVzdWx0UmVwb3J0Q29tcG9uZW50IH0gZnJvbSAnLi9leGFtLXJlc3VsdC1yZXBvcnQuY29tcG9uZW50JztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnZXhhbS1yZXN1bHQtcmVwb3J0LWNvbnRhaW5lcicsXG4gICAgdGVtcGxhdGVVcmw6ICdleGFtLXJlc3VsdC1yZXBvcnQtY29udGFpbmVyLmNvbXBvbmVudC5odG1sJyxcbn0pXG5AUmVwb3J0KHtcbiAgICB0aXRsZTonRXhhbSByZXN1bHQgcmVwb3J0JyxcbiAgICBjYXRlZ29yeTpSRVBPUlRfQ0FURUdPUlkuRVhBTVxufSlcbmV4cG9ydCBjbGFzcyBFeGFtUmVzdWx0UmVwb3J0Q29udGFpbmVyQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcblxuICAgIHByaXZhdGUgZXhhbXM6IEV4YW1bXTtcbiAgICBwcml2YXRlIHNlbGVjdGVkRXhhbTogYW55O1xuICAgIEBWaWV3Q2hpbGQoRXhhbVJlc3VsdFJlcG9ydENvbXBvbmVudCkgZXhhbVJlcG9ydDogRXhhbVJlc3VsdFJlcG9ydENvbXBvbmVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgIFx0RXhhbS5hbGwodGhpcykuc3Vic2NyaWJlKGV4YW1zID0+IHtcbiAgICBcdFx0dGhpcy5leGFtcyA9IGV4YW1zO1xuICAgIFx0fSk7XG4gICAgfVxuXG4gICAgZXhwb3J0KCkge1xuICAgIFx0aWYgKHRoaXMuc2VsZWN0ZWRFeGFtKVxuICAgICAgICAgICAgdGhpcy5leGFtUmVwb3J0LmV4cG9ydCgpO1xuICAgIH1cblxuICAgIHNlbGVjdEV4YW0oKSB7XG4gICAgXHRpZiAodGhpcy5zZWxlY3RlZEV4YW0pIHtcbiAgICAgICAgICAgIHRoaXMuZXhhbVJlcG9ydC5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5leGFtUmVwb3J0LnJlbmRlcih0aGlzLnNlbGVjdGVkRXhhbSk7XG4gICAgXHR9XG4gICAgfVxuXG59XG4iXX0=

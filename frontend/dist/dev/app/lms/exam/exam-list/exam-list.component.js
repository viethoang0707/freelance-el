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
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var exam_content_dialog_component_1 = require("../../../cms/exam/content-dialog/exam-content.dialog.component");
var exam_study_dialog_component_1 = require("../exam-study/exam-study.dialog.component");
var report_utils_1 = require("../../../shared/helpers/report.utils");
var router_1 = require("@angular/router");
var ExamListComponent = (function (_super) {
    __extends(ExamListComponent, _super);
    function ExamListComponent(router) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.EXAM_STATUS = constants_1.EXAM_STATUS;
        _this.exams = [];
        _this.reportUtils = new report_utils_1.ReportUtils();
        return _this;
    }
    ExamListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.lmsProfileService.init(this).subscribe(function () {
            _this.displayExams(_this.lmsProfileService.MyExams);
        });
    };
    ExamListComponent.prototype.displayExams = function (exams) {
        var _this = this;
        _.each(exams, function (exam) {
            exam['candidate'] = _this.lmsProfileService.getExamMemberByRole('candidate', exam.id);
            exam['editor'] = _this.lmsProfileService.getExamMemberByRole('editor', exam.id);
            exam['supervisor'] = _this.lmsProfileService.getExamMemberByRole('supervisor', exam.id);
            if (exam['supervisor'])
                exam['editor'] = exam['supervisor'];
        });
        exams.sort(function (exam1, exam2) {
            return _this.lmsProfileService.getLastExamTimestamp(exam2) - _this.lmsProfileService.getLastExamTimestamp(exam1);
        });
        this.exams = exams;
    };
    ExamListComponent.prototype.manageExam = function (exam, member) {
        if (!exam.IsAvailable) {
            this.warn(this.translateService.instant('Exam is not available.'));
            return;
        }
        this.router.navigate(['/lms/exams/manage', exam.id, member.id]);
    };
    ExamListComponent.prototype.editContent = function (exam) {
        this.examContentDialog.show(exam);
    };
    ExamListComponent.prototype.publishExam = function (exam) {
        exam.sheet_status = 'published';
        exam.save(this).subscribe();
    };
    ExamListComponent.prototype.unpublishExam = function (exam) {
        exam.sheet_status = 'unpublished';
        exam.save(this).subscribe();
    };
    ExamListComponent.prototype.startExam = function (exam, member) {
        var _this = this;
        this.confirmationService.confirm({
            message: this.translateService.instant('Are you sure to start?'),
            accept: function () {
                _this.examStudyDialog.show(exam, member);
            }
        });
    };
    __decorate([
        core_1.ViewChild(exam_content_dialog_component_1.ExamContentDialog),
        __metadata("design:type", exam_content_dialog_component_1.ExamContentDialog)
    ], ExamListComponent.prototype, "examContentDialog", void 0);
    __decorate([
        core_1.ViewChild(exam_study_dialog_component_1.ExamStudyDialog),
        __metadata("design:type", exam_study_dialog_component_1.ExamStudyDialog)
    ], ExamListComponent.prototype, "examStudyDialog", void 0);
    ExamListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'lms-exam-list',
            templateUrl: 'exam-list.component.html',
            styleUrls: ['exam-list.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], ExamListComponent);
    return ExamListComponent;
}(base_component_1.BaseComponent));
exports.ExamListComponent = ExamListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvZXhhbS9leGFtLWxpc3QvZXhhbS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFFcEUsaUZBQStFO0FBRy9FLDhCQUFnQztBQUNoQyw4REFBOEU7QUFPOUUsZ0hBQW1HO0FBQ25HLHlGQUE0RTtBQUM1RSxxRUFBbUU7QUFDbkUsMENBQWdEO0FBWWhEO0lBQXVDLHFDQUFhO0lBVWhELDJCQUFvQixNQUFjO1FBQWxDLFlBQ0ksaUJBQU8sU0FHVjtRQUptQixZQUFNLEdBQU4sTUFBTSxDQUFRO1FBUmxDLGlCQUFXLEdBQUcsdUJBQVcsQ0FBQztRQVV0QixLQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQVcsRUFBRSxDQUFDOztJQUN6QyxDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUFBLGlCQUlDO1FBSEcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDeEMsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsd0NBQVksR0FBWixVQUFhLEtBQWE7UUFBMUIsaUJBWUM7UUFYRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFDLElBQVM7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFJLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBSSxLQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoRixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUksS0FBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDeEYsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFDLEtBQVcsRUFBRSxLQUFXO1lBQ2hDLE9BQU8sS0FBSSxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuSCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxzQ0FBVSxHQUFWLFVBQVcsSUFBVSxFQUFFLE1BQWtCO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7WUFDbkUsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCx1Q0FBVyxHQUFYLFVBQVksSUFBVTtRQUNsQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCx1Q0FBVyxHQUFYLFVBQVksSUFBUztRQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCx5Q0FBYSxHQUFiLFVBQWMsSUFBUztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQztRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxxQ0FBUyxHQUFULFVBQVUsSUFBVSxFQUFFLE1BQWtCO1FBQXhDLGlCQU9DO1FBTkcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztZQUM3QixPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztZQUNoRSxNQUFNLEVBQUU7Z0JBQ0osS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzVDLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBMUQ2QjtRQUE3QixnQkFBUyxDQUFDLGlEQUFpQixDQUFDO2tDQUFvQixpREFBaUI7Z0VBQUM7SUFDdkM7UUFBM0IsZ0JBQVMsQ0FBQyw2Q0FBZSxDQUFDO2tDQUFrQiw2Q0FBZTs4REFBQztJQVJwRCxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1NBQ3pDLENBQUM7eUNBVzhCLGVBQU07T0FWekIsaUJBQWlCLENBbUU3QjtJQUFELHdCQUFDO0NBbkVELEFBbUVDLENBbkVzQyw4QkFBYSxHQW1FbkQ7QUFuRVksOENBQWlCIiwiZmlsZSI6ImFwcC9sbXMvZXhhbS9leGFtLWxpc3QvZXhhbS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgR1JPVVBfQ0FURUdPUlksIEVYQU1fU1RBVFVTIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBFeGFtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0IHsgRXhhbVF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IFN1Ym1pc3Npb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdWJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBFeGFtQ29udGVudERpYWxvZyB9IGZyb20gJy4uLy4uLy4uL2Ntcy9leGFtL2NvbnRlbnQtZGlhbG9nL2V4YW0tY29udGVudC5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEV4YW1TdHVkeURpYWxvZyB9IGZyb20gJy4uL2V4YW0tc3R1ZHkvZXhhbS1zdHVkeS5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFJlcG9ydFV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvcmVwb3J0LnV0aWxzJztcbmltcG9ydCB7IFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCB7IEV4YW1SZWNvcmQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLXJlY29yZC5tb2RlbCc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2xtcy1leGFtLWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnZXhhbS1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnZXhhbS1saXN0LmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgRXhhbUxpc3RDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEVYQU1fU1RBVFVTID0gRVhBTV9TVEFUVVM7XG5cbiAgICBwcml2YXRlIGV4YW1zOiBFeGFtW107XG4gICAgcHJpdmF0ZSByZXBvcnRVdGlsczogUmVwb3J0VXRpbHM7XG5cbiAgICBAVmlld0NoaWxkKEV4YW1Db250ZW50RGlhbG9nKSBleGFtQ29udGVudERpYWxvZzogRXhhbUNvbnRlbnREaWFsb2c7XG4gICAgQFZpZXdDaGlsZChFeGFtU3R1ZHlEaWFsb2cpIGV4YW1TdHVkeURpYWxvZzogRXhhbVN0dWR5RGlhbG9nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmV4YW1zID0gW107XG4gICAgICAgIHRoaXMucmVwb3J0VXRpbHMgPSBuZXcgUmVwb3J0VXRpbHMoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5sbXNQcm9maWxlU2VydmljZS5pbml0KHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlFeGFtcyh0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLk15RXhhbXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkaXNwbGF5RXhhbXMoZXhhbXM6IEV4YW1bXSkge1xuICAgICAgICBfLmVhY2goZXhhbXMsIChleGFtOkV4YW0pPT4ge1xuICAgICAgICAgICAgZXhhbVsnY2FuZGlkYXRlJ10gPSAgdGhpcy5sbXNQcm9maWxlU2VydmljZS5nZXRFeGFtTWVtYmVyQnlSb2xlKCdjYW5kaWRhdGUnLCBleGFtLmlkKTtcbiAgICAgICAgICAgIGV4YW1bJ2VkaXRvciddID0gIHRoaXMubG1zUHJvZmlsZVNlcnZpY2UuZ2V0RXhhbU1lbWJlckJ5Um9sZSgnZWRpdG9yJywgZXhhbS5pZCk7XG4gICAgICAgICAgICBleGFtWydzdXBlcnZpc29yJ10gPSAgdGhpcy5sbXNQcm9maWxlU2VydmljZS5nZXRFeGFtTWVtYmVyQnlSb2xlKCdzdXBlcnZpc29yJywgZXhhbS5pZCk7XG4gICAgICAgICAgICBpZiAoZXhhbVsnc3VwZXJ2aXNvciddKVxuICAgICAgICAgICAgICAgIGV4YW1bJ2VkaXRvciddID0gIGV4YW1bJ3N1cGVydmlzb3InXTtcbiAgICAgICAgfSk7XG4gICAgICAgIGV4YW1zLnNvcnQoKGV4YW0xOiBFeGFtLCBleGFtMjogRXhhbSk6IGFueSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sbXNQcm9maWxlU2VydmljZS5nZXRMYXN0RXhhbVRpbWVzdGFtcChleGFtMikgLSB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmdldExhc3RFeGFtVGltZXN0YW1wKGV4YW0xKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZXhhbXMgPSBleGFtcztcbiAgICB9XG5cbiAgICBtYW5hZ2VFeGFtKGV4YW06IEV4YW0sIG1lbWJlcjogRXhhbU1lbWJlcikge1xuICAgICAgICBpZiAoIWV4YW0uSXNBdmFpbGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMud2Fybih0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnRXhhbSBpcyBub3QgYXZhaWxhYmxlLicpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sbXMvZXhhbXMvbWFuYWdlJywgZXhhbS5pZCwgbWVtYmVyLmlkXSk7XG4gICAgfVxuXG4gICAgZWRpdENvbnRlbnQoZXhhbTogRXhhbSkge1xuICAgICAgICB0aGlzLmV4YW1Db250ZW50RGlhbG9nLnNob3coZXhhbSk7XG4gICAgfVxuXG4gICAgcHVibGlzaEV4YW0oZXhhbTpFeGFtKSB7XG4gICAgICAgIGV4YW0uc2hlZXRfc3RhdHVzID0gJ3B1Ymxpc2hlZCc7XG4gICAgICAgIGV4YW0uc2F2ZSh0aGlzKS5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICB1bnB1Ymxpc2hFeGFtKGV4YW06RXhhbSkge1xuICAgICAgICBleGFtLnNoZWV0X3N0YXR1cyA9ICd1bnB1Ymxpc2hlZCc7XG4gICAgICAgIGV4YW0uc2F2ZSh0aGlzKS5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBzdGFydEV4YW0oZXhhbTogRXhhbSwgbWVtYmVyOiBFeGFtTWVtYmVyKSB7XG4gICAgICAgIHRoaXMuY29uZmlybWF0aW9uU2VydmljZS5jb25maXJtKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdBcmUgeW91IHN1cmUgdG8gc3RhcnQ/JyksXG4gICAgICAgICAgICBhY2NlcHQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4YW1TdHVkeURpYWxvZy5zaG93KGV4YW0sIG1lbWJlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufSJdfQ==

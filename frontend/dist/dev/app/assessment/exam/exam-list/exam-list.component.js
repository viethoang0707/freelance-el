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
var constants_1 = require("../../../shared/models/constants");
var exam_model_1 = require("../../../shared/models/elearning/exam.model");
var exam_dialog_component_1 = require("../exam-dialog/exam-dialog.component");
var enrollment_dialog_component_1 = require("../enrollment-dialog/enrollment-dialog.component");
var ExamListComponent = (function (_super) {
    __extends(ExamListComponent, _super);
    function ExamListComponent() {
        var _this = _super.call(this) || this;
        _this.EXAM_STATUS = constants_1.EXAM_STATUS;
        _this.REVIEW_STATE = constants_1.REVIEW_STATE;
        return _this;
    }
    ExamListComponent.prototype.ngOnInit = function () {
        this.loadExams();
    };
    ExamListComponent.prototype.addExam = function () {
        var _this = this;
        var exam = new exam_model_1.Exam();
        exam.is_public = true;
        this.examDialog.show(exam);
        this.examDialog.onCreateComplete.subscribe(function () {
            _this.loadExams();
        });
    };
    ExamListComponent.prototype.editExam = function () {
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedExam.supervisor_id) {
            this.error('You do not have enroll permission for this exam');
            return;
        }
        this.examDialog.show(this.selectedExam);
    };
    ExamListComponent.prototype.deleteExam = function () {
        var _this = this;
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedExam.supervisor_id) {
            this.error('You do not have enroll permission for this exam');
            return;
        }
        this.confirm('Are you sure to delete ?', function () {
            _this.selectedExam.delete(_this).subscribe(function () {
                _this.loadExams();
                _this.selectedExam = null;
            });
        });
    };
    ExamListComponent.prototype.loadExams = function () {
        var _this = this;
        exam_model_1.Exam.listPublicExam(this).subscribe(function (exams) {
            _this.exams = exams;
            _this.exams.sort(function (exam1, exam2) {
                return exam1.id - exam2.id;
            });
        });
    };
    ExamListComponent.prototype.requestReview = function () {
        var _this = this;
        if (this.ContextUser.id != this.selectedExam.supervisor_id) {
            this.error('You do not have submit-review permission for this exam');
            return;
        }
        this.workflowService.createExamReviewTicket(this, this.selectedExam).subscribe(function () {
            _this.success('Request submitted');
            _this.selectedExam.refresh(_this).subscribe();
        });
    };
    __decorate([
        core_1.ViewChild(exam_dialog_component_1.ExamDialog),
        __metadata("design:type", exam_dialog_component_1.ExamDialog)
    ], ExamListComponent.prototype, "examDialog", void 0);
    __decorate([
        core_1.ViewChild(enrollment_dialog_component_1.ExamEnrollDialog),
        __metadata("design:type", enrollment_dialog_component_1.ExamEnrollDialog)
    ], ExamListComponent.prototype, "examEnrollDialog", void 0);
    ExamListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-list',
            templateUrl: 'exam-list.component.html',
            styleUrls: ['exam-list.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], ExamListComponent);
    return ExamListComponent;
}(base_component_1.BaseComponent));
exports.ExamListComponent = ExamListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L2V4YW0vZXhhbS1saXN0L2V4YW0tbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBRXBFLGlGQUErRTtBQUkvRSw4REFBOEc7QUFDOUcsMEVBQW1FO0FBRW5FLDhFQUFrRTtBQUNsRSxnR0FBb0Y7QUFVcEY7SUFBdUMscUNBQWE7SUFZaEQ7UUFBQSxZQUNJLGlCQUFPLFNBQ1Y7UUFaRCxpQkFBVyxHQUFHLHVCQUFXLENBQUM7UUFDMUIsa0JBQVksR0FBRyx3QkFBWSxDQUFDOztJQVc1QixDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBR0QsbUNBQU8sR0FBUDtRQUFBLGlCQU9DO1FBTkcsSUFBSSxJQUFJLEdBQUcsSUFBSSxpQkFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7WUFDdkMsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUU7WUFDMUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO1lBQzlELE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsc0NBQVUsR0FBVjtRQUFBLGlCQVdDO1FBVkcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFO1lBQzFGLElBQUksQ0FBQyxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztZQUM5RCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFO1lBQ3JDLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDckMsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNqQixLQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHFDQUFTLEdBQVQ7UUFBQSxpQkFPQztRQU5HLGlCQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDckMsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFLLEVBQUUsS0FBSztnQkFDekIsT0FBTyxLQUFLLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx5Q0FBYSxHQUFiO1FBQUEsaUJBU0M7UUFSRyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFO1lBQ3hELElBQUksQ0FBQyxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQztZQUNyRSxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzNFLEtBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNsQyxLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUE1RHNCO1FBQXRCLGdCQUFTLENBQUMsa0NBQVUsQ0FBQztrQ0FBYSxrQ0FBVTt5REFBQztJQUNqQjtRQUE1QixnQkFBUyxDQUFDLDhDQUFnQixDQUFDO2tDQUFtQiw4Q0FBZ0I7K0RBQUM7SUFWdkQsaUJBQWlCO1FBTjdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztTQUN6QyxDQUFDOztPQUNXLGlCQUFpQixDQXNFN0I7SUFBRCx3QkFBQztDQXRFRCxBQXNFQyxDQXRFc0MsOEJBQWEsR0FzRW5EO0FBdEVZLDhDQUFpQiIsImZpbGUiOiJhcHAvYXNzZXNzbWVudC9leGFtL2V4YW0tbGlzdC9leGFtLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IEdST1VQX0NBVEVHT1JZLCBFWEFNX1NUQVRVUywgU0NIRURVTEVSX0hFQURFUiwgUkVWSUVXX1NUQVRFIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBFeGFtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS5tb2RlbCc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IEV4YW1EaWFsb2cgfSBmcm9tICcuLi9leGFtLWRpYWxvZy9leGFtLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXhhbUVucm9sbERpYWxvZyB9IGZyb20gJy4uL2Vucm9sbG1lbnQtZGlhbG9nL2Vucm9sbG1lbnQtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnZXhhbS1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJ2V4YW0tbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2V4YW0tbGlzdC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEV4YW1MaXN0Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cbiAgICBFWEFNX1NUQVRVUyA9IEVYQU1fU1RBVFVTO1xuICAgIFJFVklFV19TVEFURSA9IFJFVklFV19TVEFURTtcblxuICAgIHByaXZhdGUgc2VsZWN0ZWRFeGFtOiBFeGFtO1xuICAgIHByaXZhdGUgZXhhbXM6IEV4YW1bXTtcbiAgICBwcml2YXRlIGV2ZW50czogYW55W107XG5cbiAgICBAVmlld0NoaWxkKEV4YW1EaWFsb2cpIGV4YW1EaWFsb2c6IEV4YW1EaWFsb2c7XG4gICAgQFZpZXdDaGlsZChFeGFtRW5yb2xsRGlhbG9nKSBleGFtRW5yb2xsRGlhbG9nOiBFeGFtRW5yb2xsRGlhbG9nO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubG9hZEV4YW1zKCk7XG4gICAgfVxuXG5cbiAgICBhZGRFeGFtKCkge1xuICAgICAgICB2YXIgZXhhbSA9IG5ldyBFeGFtKCk7XG4gICAgICAgIGV4YW0uaXNfcHVibGljID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5leGFtRGlhbG9nLnNob3coZXhhbSk7XG4gICAgICAgIHRoaXMuZXhhbURpYWxvZy5vbkNyZWF0ZUNvbXBsZXRlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRFeGFtcygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBlZGl0RXhhbSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLkNvbnRleHRVc2VyLklzU3VwZXJBZG1pbiAmJiB0aGlzLkNvbnRleHRVc2VyLmlkICE9IHRoaXMuc2VsZWN0ZWRFeGFtLnN1cGVydmlzb3JfaWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoJ1lvdSBkbyBub3QgaGF2ZSBlbnJvbGwgcGVybWlzc2lvbiBmb3IgdGhpcyBleGFtJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5leGFtRGlhbG9nLnNob3codGhpcy5zZWxlY3RlZEV4YW0pO1xuICAgIH1cblxuICAgIGRlbGV0ZUV4YW0oKSB7XG4gICAgICAgIGlmICghdGhpcy5Db250ZXh0VXNlci5Jc1N1cGVyQWRtaW4gJiYgdGhpcy5Db250ZXh0VXNlci5pZCAhPSB0aGlzLnNlbGVjdGVkRXhhbS5zdXBlcnZpc29yX2lkKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yKCdZb3UgZG8gbm90IGhhdmUgZW5yb2xsIHBlcm1pc3Npb24gZm9yIHRoaXMgZXhhbScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29uZmlybSgnQXJlIHlvdSBzdXJlIHRvIGRlbGV0ZSA/JywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEV4YW0uZGVsZXRlKHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkRXhhbXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRXhhbSA9IG51bGw7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkRXhhbXMoKSB7XG4gICAgICAgIEV4YW0ubGlzdFB1YmxpY0V4YW0odGhpcykuc3Vic2NyaWJlKGV4YW1zID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXhhbXMgPSBleGFtcztcbiAgICAgICAgICAgIHRoaXMuZXhhbXMuc29ydCgoZXhhbTEsIGV4YW0yKTogYW55ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXhhbTEuaWQgLSBleGFtMi5pZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXF1ZXN0UmV2aWV3KCkge1xuICAgICAgICBpZiAodGhpcy5Db250ZXh0VXNlci5pZCAhPSB0aGlzLnNlbGVjdGVkRXhhbS5zdXBlcnZpc29yX2lkKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yKCdZb3UgZG8gbm90IGhhdmUgc3VibWl0LXJldmlldyBwZXJtaXNzaW9uIGZvciB0aGlzIGV4YW0nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndvcmtmbG93U2VydmljZS5jcmVhdGVFeGFtUmV2aWV3VGlja2V0KHRoaXMsIHRoaXMuc2VsZWN0ZWRFeGFtKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdWNjZXNzKCdSZXF1ZXN0IHN1Ym1pdHRlZCcpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEV4YW0ucmVmcmVzaCh0aGlzKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==

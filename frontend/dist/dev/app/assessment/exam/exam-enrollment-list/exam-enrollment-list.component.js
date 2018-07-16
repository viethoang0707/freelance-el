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
var ExamEnrollmentListComponent = (function (_super) {
    __extends(ExamEnrollmentListComponent, _super);
    function ExamEnrollmentListComponent() {
        var _this = _super.call(this) || this;
        _this.EXAM_STATUS = constants_1.EXAM_STATUS;
        _this.REVIEW_STATE = constants_1.REVIEW_STATE;
        _this.header = constants_1.SCHEDULER_HEADER;
        return _this;
    }
    ExamEnrollmentListComponent.prototype.enrollExam = function () {
        if (this.selectedExam) {
            if (this.selectedExam.review_state != 'approved') {
                this.warn('Exam not reviewed yet');
                return;
            }
            if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedExam.supervisor_id) {
                this.error('You do not have enroll permission for this exam');
                return;
            }
            this.examEnrollDialog.enroll(this.selectedExam);
        }
    };
    ExamEnrollmentListComponent.prototype.ngOnInit = function () {
        var _this = this;
        exam_model_1.Exam.allForEnrollPublic(this).subscribe(function (exams) {
            _this.exams = exams;
        });
    };
    ExamEnrollmentListComponent.prototype.closeExam = function () {
        var _this = this;
        if (this.selectedExam) {
            if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedExam.supervisor_id) {
                this.error('You do not have close permission for this exam');
                return;
            }
            this.confirm('Are you sure to proceed ?  You will not be able to enroll students after the exam is closed', function () {
                _this.selectedExam.close(_this).subscribe(function () {
                    _this.selectedExam.status = 'closed';
                    _this.success('Exam close');
                });
            });
        }
    };
    ExamEnrollmentListComponent.prototype.openExam = function () {
        var _this = this;
        if (this.selectedExam) {
            if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedExam.supervisor_id) {
                this.error('You do not have open permission for this exam');
                return;
            }
            this.confirm('Are you sure to proceed ?', function () {
                _this.selectedExam.open(_this).subscribe(function () {
                    _this.selectedExam.status = 'open';
                    _this.success('Exam open');
                });
            });
        }
    };
    __decorate([
        core_1.ViewChild(exam_dialog_component_1.ExamDialog),
        __metadata("design:type", exam_dialog_component_1.ExamDialog)
    ], ExamEnrollmentListComponent.prototype, "examDialog", void 0);
    __decorate([
        core_1.ViewChild(enrollment_dialog_component_1.ExamEnrollDialog),
        __metadata("design:type", enrollment_dialog_component_1.ExamEnrollDialog)
    ], ExamEnrollmentListComponent.prototype, "examEnrollDialog", void 0);
    ExamEnrollmentListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-enrollment-list',
            templateUrl: 'exam-enrollment-list.component.html',
            styleUrls: ['exam-enrollment-list.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], ExamEnrollmentListComponent);
    return ExamEnrollmentListComponent;
}(base_component_1.BaseComponent));
exports.ExamEnrollmentListComponent = ExamEnrollmentListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L2V4YW0vZXhhbS1lbnJvbGxtZW50LWxpc3QvZXhhbS1lbnJvbGxtZW50LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFvRTtBQUVwRSxpRkFBK0U7QUFJL0UsOERBQThHO0FBQzlHLDBFQUFtRTtBQUVuRSw4RUFBa0U7QUFDbEUsZ0dBQW9GO0FBVXBGO0lBQWlELCtDQUFhO0lBYTFEO1FBQUEsWUFDSSxpQkFBTyxTQUVWO1FBZEQsaUJBQVcsR0FBRyx1QkFBVyxDQUFDO1FBQzFCLGtCQUFZLEdBQUcsd0JBQVksQ0FBQztRQVl4QixLQUFJLENBQUMsTUFBTSxHQUFHLDRCQUFnQixDQUFDOztJQUNuQyxDQUFDO0lBRUQsZ0RBQVUsR0FBVjtRQUNJLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRztZQUNwQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxJQUFJLFVBQVUsRUFBRTtnQkFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2dCQUNuQyxPQUFPO2FBQ1Y7WUFDRCxJQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUU7Z0JBQzNGLElBQUksQ0FBQyxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztnQkFDOUQsT0FBTzthQUNWO1lBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDbkQ7SUFDTCxDQUFDO0lBRUQsOENBQVEsR0FBUjtRQUFBLGlCQUlDO1FBSEcsaUJBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQ3pDLEtBQUksQ0FBQyxLQUFLLEdBQUksS0FBSyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELCtDQUFTLEdBQVQ7UUFBQSxpQkFhQztRQVpHLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixJQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUU7Z0JBQzNGLElBQUksQ0FBQyxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztnQkFDN0QsT0FBTzthQUNWO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyw2RkFBNkYsRUFBRTtnQkFDeEcsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLENBQUMsU0FBUyxDQUFDO29CQUNwQyxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7b0JBQ3BDLEtBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQy9CLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCw4Q0FBUSxHQUFSO1FBQUEsaUJBYUM7UUFaRyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsSUFBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFO2dCQUMzRixJQUFJLENBQUMsS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7Z0JBQzVELE9BQU87YUFDVjtZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsMkJBQTJCLEVBQUU7Z0JBQ3RDLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztvQkFDbkMsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO29CQUNsQyxLQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUM5QixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBeERzQjtRQUF0QixnQkFBUyxDQUFDLGtDQUFVLENBQUM7a0NBQWEsa0NBQVU7bUVBQUM7SUFDakI7UUFBNUIsZ0JBQVMsQ0FBQyw4Q0FBZ0IsQ0FBQztrQ0FBbUIsOENBQWdCO3lFQUFDO0lBWHZELDJCQUEyQjtRQU52QyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsV0FBVyxFQUFFLHFDQUFxQztZQUNsRCxTQUFTLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztTQUNwRCxDQUFDOztPQUNXLDJCQUEyQixDQW1FdkM7SUFBRCxrQ0FBQztDQW5FRCxBQW1FQyxDQW5FZ0QsOEJBQWEsR0FtRTdEO0FBbkVZLGtFQUEyQiIsImZpbGUiOiJhcHAvYXNzZXNzbWVudC9leGFtL2V4YW0tZW5yb2xsbWVudC1saXN0L2V4YW0tZW5yb2xsbWVudC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBHUk9VUF9DQVRFR09SWSwgRVhBTV9TVEFUVVMsIFNDSEVEVUxFUl9IRUFERVIsIFJFVklFV19TVEFURSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgRXhhbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0ubW9kZWwnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtRGlhbG9nIH0gZnJvbSAnLi4vZXhhbS1kaWFsb2cvZXhhbS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEV4YW1FbnJvbGxEaWFsb2cgfSBmcm9tICcuLi9lbnJvbGxtZW50LWRpYWxvZy9lbnJvbGxtZW50LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2V4YW0tZW5yb2xsbWVudC1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJ2V4YW0tZW5yb2xsbWVudC1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnZXhhbS1lbnJvbGxtZW50LWxpc3QuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBFeGFtRW5yb2xsbWVudExpc3RDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuICAgIEVYQU1fU1RBVFVTID0gRVhBTV9TVEFUVVM7XG4gICAgUkVWSUVXX1NUQVRFID0gUkVWSUVXX1NUQVRFO1xuXG4gICAgcHJpdmF0ZSBzZWxlY3RlZEV4YW06IEV4YW07XG4gICAgcHJpdmF0ZSBleGFtczogRXhhbVtdO1xuICAgIHByaXZhdGUgZXZlbnRzOiBhbnlbXTtcbiAgICBwcml2YXRlIGhlYWRlcjogYW55O1xuICAgIFxuICAgIEBWaWV3Q2hpbGQoRXhhbURpYWxvZykgZXhhbURpYWxvZzogRXhhbURpYWxvZztcbiAgICBAVmlld0NoaWxkKEV4YW1FbnJvbGxEaWFsb2cpIGV4YW1FbnJvbGxEaWFsb2c6IEV4YW1FbnJvbGxEaWFsb2c7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBTQ0hFRFVMRVJfSEVBREVSO1xuICAgIH1cblxuICAgIGVucm9sbEV4YW0oKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkRXhhbSApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkRXhhbS5yZXZpZXdfc3RhdGUgIT0gJ2FwcHJvdmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMud2FybignRXhhbSBub3QgcmV2aWV3ZWQgeWV0Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgICghdGhpcy5Db250ZXh0VXNlci5Jc1N1cGVyQWRtaW4gJiYgdGhpcy5Db250ZXh0VXNlci5pZCAhPSB0aGlzLnNlbGVjdGVkRXhhbS5zdXBlcnZpc29yX2lkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvcignWW91IGRvIG5vdCBoYXZlIGVucm9sbCBwZXJtaXNzaW9uIGZvciB0aGlzIGV4YW0nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmV4YW1FbnJvbGxEaWFsb2cuZW5yb2xsKHRoaXMuc2VsZWN0ZWRFeGFtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBFeGFtLmFsbEZvckVucm9sbFB1YmxpYyh0aGlzKS5zdWJzY3JpYmUoZXhhbXM9PiB7XG4gICAgICAgICAgICB0aGlzLmV4YW1zID0gIGV4YW1zO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbG9zZUV4YW0oKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkRXhhbSkge1xuICAgICAgICAgICAgaWYgICghdGhpcy5Db250ZXh0VXNlci5Jc1N1cGVyQWRtaW4gJiYgdGhpcy5Db250ZXh0VXNlci5pZCAhPSB0aGlzLnNlbGVjdGVkRXhhbS5zdXBlcnZpc29yX2lkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvcignWW91IGRvIG5vdCBoYXZlIGNsb3NlIHBlcm1pc3Npb24gZm9yIHRoaXMgZXhhbScpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29uZmlybSgnQXJlIHlvdSBzdXJlIHRvIHByb2NlZWQgPyAgWW91IHdpbGwgbm90IGJlIGFibGUgdG8gZW5yb2xsIHN0dWRlbnRzIGFmdGVyIHRoZSBleGFtIGlzIGNsb3NlZCcsICgpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRFeGFtLmNsb3NlKHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRFeGFtLnN0YXR1cyA9ICdjbG9zZWQnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3MoJ0V4YW0gY2xvc2UnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3BlbkV4YW0oKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkRXhhbSkge1xuICAgICAgICAgICAgaWYgICghdGhpcy5Db250ZXh0VXNlci5Jc1N1cGVyQWRtaW4gJiYgdGhpcy5Db250ZXh0VXNlci5pZCAhPSB0aGlzLnNlbGVjdGVkRXhhbS5zdXBlcnZpc29yX2lkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvcignWW91IGRvIG5vdCBoYXZlIG9wZW4gcGVybWlzc2lvbiBmb3IgdGhpcyBleGFtJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb25maXJtKCdBcmUgeW91IHN1cmUgdG8gcHJvY2VlZCA/JywgKCk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEV4YW0ub3Blbih0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRXhhbS5zdGF0dXMgPSAnb3Blbic7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VjY2VzcygnRXhhbSBvcGVuJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=

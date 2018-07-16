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
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var exam_model_1 = require("../../../shared/models/elearning/exam.model");
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var base_model_1 = require("../../../shared/models/base.model");
var ClassExamEnrollDialog = (function (_super) {
    __extends(ClassExamEnrollDialog, _super);
    function ClassExamEnrollDialog() {
        var _this = _super.call(this) || this;
        _this.display = false;
        _this.examMembers = [];
        _this.courseMembers = [];
        _this.exam = new exam_model_1.Exam();
        return _this;
    }
    ClassExamEnrollDialog.prototype.show = function (exam) {
        var _this = this;
        this.display = true;
        this.examMembers = [];
        this.courseMembers = [];
        this.exam = exam;
        base_model_1.BaseModel
            .bulk_search(this, course_member_model_1.CourseMember.__api__listByClass(exam.course_class_id), exam_member_model_1.ExamMember.__api__listByExam(exam.id))
            .subscribe(function (jsonArr) {
            var courseMembers = course_member_model_1.CourseMember.toArray(jsonArr[0]);
            _this.courseMembers = _.filter(courseMembers, function (member) {
                return member.role == 'student';
            });
            var examMembers = exam_member_model_1.ExamMember.toArray(jsonArr[1]);
            _this.examMembers = _.filter(examMembers, function (member) {
                return member.role == 'candidate';
            });
        });
    };
    ClassExamEnrollDialog.prototype.hide = function () {
        this.display = false;
    };
    ClassExamEnrollDialog.prototype.enrollAll = function () {
        var _this = this;
        var userIds = _.pluck(this.courseMembers, 'user_id');
        this.exam.enroll(this, userIds).subscribe(function () {
            exam_member_model_1.ExamMember.listByExam(_this, _this.exam.id).subscribe(function (members) {
                _this.examMembers = members;
            });
            _this.info('Register all successfully');
        });
    };
    ClassExamEnrollDialog.prototype.activateMember = function (member) {
        member.status = 'active';
        member.save(this).subscribe();
    };
    ClassExamEnrollDialog.prototype.suspendMember = function (member) {
        member.status = 'suspend';
        member.save(this).subscribe();
    };
    ClassExamEnrollDialog.prototype.closeExam = function () {
        var _this = this;
        this.confirm('Are you sure to proceed ?', function () {
            _this.exam.close(_this).subscribe(function () {
                _this.exam.status = 'closed';
                _this.success('Exam close');
            });
        });
    };
    ClassExamEnrollDialog.prototype.openExam = function () {
        var _this = this;
        this.confirm('Are you sure to proceed ? You will not be able to enroll students after the exam is opened', function () {
            _this.exam.open(_this).subscribe(function () {
                _this.exam.status = 'open';
                _this.success('Exam open');
            });
        });
    };
    ClassExamEnrollDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'class-exam-enroll-dialog',
            templateUrl: 'class-exam-enroll.dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], ClassExamEnrollDialog);
    return ClassExamEnrollDialog;
}(base_component_1.BaseComponent));
exports.ClassExamEnrollDialog = ClassExamEnrollDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvY2xhc3MvY2xhc3MtZXhhbS1lbnJvbGwvY2xhc3MtZXhhbS1lbnJvbGwuZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFFcEUsaUZBQStFO0FBRy9FLDhCQUFnQztBQUdoQyw0RkFBb0Y7QUFDcEYsMEVBQW1FO0FBQ25FLHdGQUFnRjtBQUVoRixnRUFBOEQ7QUFROUQ7SUFBMkMseUNBQWE7SUFRdkQ7UUFBQSxZQUNDLGlCQUFPLFNBS1A7UUFKQSxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixLQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixLQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixLQUFJLENBQUMsSUFBSSxHQUFJLElBQUksaUJBQUksRUFBRSxDQUFDOztJQUN6QixDQUFDO0lBRUQsb0NBQUksR0FBSixVQUFLLElBQVU7UUFBZixpQkFpQkM7UUFoQkEsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsc0JBQVM7YUFDUCxXQUFXLENBQUMsSUFBSSxFQUFFLGtDQUFZLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLDhCQUFVLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQy9HLFNBQVMsQ0FBQyxVQUFBLE9BQU87WUFDakIsSUFBSSxhQUFhLEdBQUcsa0NBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckQsS0FBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFD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YXNzLWV4YW0tZW5yb2xsLmRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgR1JPVVBfQ0FURUdPUlksIEVYQU1fU1RBVFVTIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBDb3Vyc2VDbGFzcyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1jbGFzcy5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VNZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IEV4YW0gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLm1vZGVsJztcbmltcG9ydCB7IEV4YW1NZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ2NsYXNzLWV4YW0tZW5yb2xsLWRpYWxvZycsXG5cdHRlbXBsYXRlVXJsOiAnY2xhc3MtZXhhbS1lbnJvbGwuZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQ2xhc3NFeGFtRW5yb2xsRGlhbG9nIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cblx0cHJpdmF0ZSBkaXNwbGF5OiBib29sZWFuO1xuXHRwcml2YXRlIGV4YW06IEV4YW07XG5cdHByaXZhdGUgc2VsZWN0ZWRNZW1iZXI6IEV4YW1NZW1iZXI7XG5cdHByaXZhdGUgZXhhbU1lbWJlcnM6IEV4YW1NZW1iZXJbXTtcblx0cHJpdmF0ZSBjb3Vyc2VNZW1iZXJzOiBDb3Vyc2VNZW1iZXJbXTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuXHRcdHRoaXMuZXhhbU1lbWJlcnMgPSBbXTtcblx0XHR0aGlzLmNvdXJzZU1lbWJlcnMgPSBbXTtcblx0XHR0aGlzLmV4YW0gPSAgbmV3IEV4YW0oKTtcblx0fVxuXG5cdHNob3coZXhhbTogRXhhbSkge1xuXHRcdHRoaXMuZGlzcGxheSA9IHRydWU7XG5cdFx0dGhpcy5leGFtTWVtYmVycyA9IFtdO1xuXHRcdHRoaXMuY291cnNlTWVtYmVycyA9IFtdO1xuXHRcdHRoaXMuZXhhbSA9IGV4YW07XG5cdFx0QmFzZU1vZGVsXG5cdFx0XHQuYnVsa19zZWFyY2godGhpcywgQ291cnNlTWVtYmVyLl9fYXBpX19saXN0QnlDbGFzcyhleGFtLmNvdXJzZV9jbGFzc19pZCksIEV4YW1NZW1iZXIuX19hcGlfX2xpc3RCeUV4YW0oZXhhbS5pZCkpXG5cdFx0XHQuc3Vic2NyaWJlKGpzb25BcnIgPT4ge1xuXHRcdFx0XHR2YXIgY291cnNlTWVtYmVycyA9IENvdXJzZU1lbWJlci50b0FycmF5KGpzb25BcnJbMF0pO1xuXHRcdFx0XHR0aGlzLmNvdXJzZU1lbWJlcnMgPSBfLmZpbHRlcihjb3Vyc2VNZW1iZXJzLCAobWVtYmVyOkNvdXJzZU1lbWJlcik9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIG1lbWJlci5yb2xlID09J3N0dWRlbnQnO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0dmFyIGV4YW1NZW1iZXJzID0gRXhhbU1lbWJlci50b0FycmF5KGpzb25BcnJbMV0pO1xuXHRcdFx0XHR0aGlzLmV4YW1NZW1iZXJzID0gXy5maWx0ZXIoZXhhbU1lbWJlcnMsIChtZW1iZXI6RXhhbU1lbWJlcik9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIG1lbWJlci5yb2xlID09J2NhbmRpZGF0ZSc7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRoaWRlKCkge1xuXHRcdHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuXHR9XG5cblx0ZW5yb2xsQWxsKCkge1xuXHRcdHZhciB1c2VySWRzID0gXy5wbHVjayh0aGlzLmNvdXJzZU1lbWJlcnMsJ3VzZXJfaWQnKTtcblx0XHR0aGlzLmV4YW0uZW5yb2xsKHRoaXMsIHVzZXJJZHMpLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRFeGFtTWVtYmVyLmxpc3RCeUV4YW0odGhpcywgdGhpcy5leGFtLmlkKS5zdWJzY3JpYmUobWVtYmVycz0+IHtcblx0XHRcdFx0XHR0aGlzLmV4YW1NZW1iZXJzID0gbWVtYmVycztcblx0XHRcdFx0fSlcblx0XHRcdHRoaXMuaW5mbygnUmVnaXN0ZXIgYWxsIHN1Y2Nlc3NmdWxseScpO1xuXHRcdH0pO1xuXHR9XG5cblx0YWN0aXZhdGVNZW1iZXIobWVtYmVyOkV4YW1NZW1iZXIpIHtcblx0XHRtZW1iZXIuc3RhdHVzID0gJ2FjdGl2ZSc7XG5cdFx0bWVtYmVyLnNhdmUodGhpcykuc3Vic2NyaWJlKCk7XG5cdH1cblxuXG5cdHN1c3BlbmRNZW1iZXIobWVtYmVyOkV4YW1NZW1iZXIpIHtcblx0XHRtZW1iZXIuc3RhdHVzID0gJ3N1c3BlbmQnO1xuXHRcdG1lbWJlci5zYXZlKHRoaXMpLnN1YnNjcmliZSgpO1xuXHR9XG5cblx0Y2xvc2VFeGFtKCkge1xuICAgICAgICB0aGlzLmNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB0byBwcm9jZWVkID8nLCAoKT0+IHtcbiAgICAgICAgICAgIHRoaXMuZXhhbS5jbG9zZSh0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgXHR0aGlzLmV4YW0uc3RhdHVzID0gICdjbG9zZWQnO1xuICAgICAgICAgICAgICAgIHRoaXMuc3VjY2VzcygnRXhhbSBjbG9zZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9wZW5FeGFtKCkge1xuICAgICAgICB0aGlzLmNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB0byBwcm9jZWVkID8gWW91IHdpbGwgbm90IGJlIGFibGUgdG8gZW5yb2xsIHN0dWRlbnRzIGFmdGVyIHRoZSBleGFtIGlzIG9wZW5lZCcsICgpPT4ge1xuICAgICAgICAgICAgdGhpcy5leGFtLm9wZW4odGhpcykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIFx0dGhpcy5leGFtLnN0YXR1cyA9ICAnb3Blbic7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzKCdFeGFtIG9wZW4nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=

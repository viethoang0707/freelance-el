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
var Observable_1 = require("rxjs/Observable");
var base_component_1 = require("../../../shared/components/base/base.component");
var _ = require("underscore");
var exam_setting_model_1 = require("../../../shared/models/elearning/exam-setting.model");
var exam_grade_model_1 = require("../../../shared/models/elearning/exam-grade.model");
var ExamSettingDialog = (function (_super) {
    __extends(ExamSettingDialog, _super);
    function ExamSettingDialog() {
        var _this = _super.call(this) || this;
        _this.setting = new exam_setting_model_1.ExamSetting();
        _this.grades = [];
        _this.deletedGrades = [];
        _this.display = false;
        return _this;
    }
    ExamSettingDialog.prototype.show = function (exam) {
        var _this = this;
        this.display = true;
        this.exam = exam;
        this.grades = [];
        this.deletedGrades = [];
        exam_grade_model_1.ExamGrade.listByExam(this, exam.id).subscribe(function (grades) {
            _this.grades = grades;
        });
        exam_setting_model_1.ExamSetting.byExam(this, exam.id).subscribe(function (setting) {
            if (!setting) {
                setting = new exam_setting_model_1.ExamSetting();
                setting.exam_id = exam.id;
            }
            _this.setting = setting;
        });
    };
    ExamSettingDialog.prototype.hide = function () {
        this.display = false;
    };
    ExamSettingDialog.prototype.addGrade = function () {
        var grade = new exam_grade_model_1.ExamGrade();
        grade.name = 'New grade';
        grade.exam_id = this.exam.id;
        this.grades.push(grade);
    };
    ExamSettingDialog.prototype.saveExamSetting = function () {
        var _this = this;
        this.setting.save(this).subscribe(function () {
            var existGrades = _.filter(_this.grades, function (grade) {
                return !grade.IsNew && (grade.name && grade.name != '');
            });
            var newGrades = _.filter(_this.grades, function (grade) {
                return grade.IsNew && (grade.name && grade.name != '');
            });
            var deleteGrades = _.filter(_this.grades, function (grade) {
                return !grade.IsNew && (!grade.name || grade.name === '');
            });
            Observable_1.Observable.forkJoin(exam_grade_model_1.ExamGrade.updateArray(_this, existGrades), exam_grade_model_1.ExamGrade.createArray(_this, newGrades), exam_grade_model_1.ExamGrade.deleteArray(_this, deleteGrades))
                .subscribe(function () {
                _this.success(_this.translateService.instant('Setting saved successfully.'));
                _this.hide();
            });
        });
    };
    ExamSettingDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-setting-dialog',
            templateUrl: 'exam-setting.dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], ExamSettingDialog);
    return ExamSettingDialog;
}(base_component_1.BaseComponent));
exports.ExamSettingDialog = ExamSettingDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvZXhhbS9leGFtLXNldHRpbmcvZXhhbS1zZXR0aW5nLmRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBQ3BFLDhDQUE2QztBQUk3QyxpRkFBK0U7QUFNL0UsOEJBQWdDO0FBR2hDLDBGQUFrRjtBQUNsRixzRkFBOEU7QUFROUU7SUFBdUMscUNBQWE7SUFRaEQ7UUFBQSxZQUNJLGlCQUFPLFNBS1Y7UUFKRyxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksZ0NBQVcsRUFBRSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDOztJQUN6QixDQUFDO0lBRUQsZ0NBQUksR0FBSixVQUFLLElBQVU7UUFBZixpQkFlQztRQWRHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLDRCQUFTLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUNoRCxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQTtRQUNGLGdDQUFXLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsT0FBb0I7WUFDN0QsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDVixPQUFPLEdBQUcsSUFBSSxnQ0FBVyxFQUFFLENBQUM7Z0JBQzVCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQzthQUM3QjtZQUNELEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELGdDQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNJLElBQUksS0FBSyxHQUFHLElBQUksNEJBQVMsRUFBRSxDQUFDO1FBQzVCLEtBQUssQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO1FBQ3pCLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUdELDJDQUFlLEdBQWY7UUFBQSxpQkFvQkM7UUFuQkcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzlCLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQWU7Z0JBQ3BELE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQzNELENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsTUFBTSxFQUFFLFVBQUMsS0FBZTtnQkFDbEQsT0FBTyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQzFELENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsTUFBTSxFQUFFLFVBQUMsS0FBZTtnQkFDckQsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksS0FBSSxFQUFFLENBQUMsQ0FBQztZQUM3RCxDQUFDLENBQUMsQ0FBQztZQUNILHVCQUFVLENBQUMsUUFBUSxDQUFDLDRCQUFTLENBQUMsV0FBVyxDQUFDLEtBQUksRUFBRSxXQUFXLENBQUMsRUFDeEQsNEJBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSSxFQUFFLFNBQVMsQ0FBQyxFQUN0Qyw0QkFBUyxDQUFDLFdBQVcsQ0FBQyxLQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7aUJBQzdDLFNBQVMsQ0FBQztnQkFDSCxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDO2dCQUMzRSxLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFcEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFqRVEsaUJBQWlCO1FBTDdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixXQUFXLEVBQUUsb0NBQW9DO1NBQ3BELENBQUM7O09BQ1csaUJBQWlCLENBa0U3QjtJQUFELHdCQUFDO0NBbEVELEFBa0VDLENBbEVzQyw4QkFBYSxHQWtFbkQ7QUFsRVksOENBQWlCIiwiZmlsZSI6ImFwcC9jbXMvZXhhbS9leGFtLXNldHRpbmcvZXhhbS1zZXR0aW5nLmRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IFN5bGxhYnVzVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy9zeWxsYWJ1cy51dGlscyc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZVVuaXQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtdW5pdC5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VTeWxsYWJ1cyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1zeWxsYWJ1cy5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlTm9kZSwgTWVudUl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBDT1VSU0VfVU5JVF9UWVBFLCBDT1VSU0VfVU5JVF9JQ09OIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFNlbGVjdENvdXJzZXNEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtY291cnNlLWRpYWxvZy9zZWxlY3QtY291cnNlLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXhhbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0ubW9kZWwnO1xuaW1wb3J0IHsgRXhhbVNldHRpbmcgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLXNldHRpbmcubW9kZWwnO1xuaW1wb3J0IHsgRXhhbUdyYWRlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1ncmFkZS5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnZXhhbS1zZXR0aW5nLWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICdleGFtLXNldHRpbmcuZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgRXhhbVNldHRpbmdEaWFsb2cgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuICAgIHByaXZhdGUgc2V0dGluZzogRXhhbVNldHRpbmc7XG4gICAgcHJpdmF0ZSBncmFkZXM6IEV4YW1HcmFkZVtdO1xuICAgIHByaXZhdGUgZGlzcGxheTogYm9vbGVhbjtcbiAgICBwcml2YXRlIGV4YW06IEV4YW07XG4gICAgcHJpdmF0ZSBkZWxldGVkR3JhZGVzOiBFeGFtR3JhZGVbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNldHRpbmcgPSBuZXcgRXhhbVNldHRpbmcoKTtcbiAgICAgICAgdGhpcy5ncmFkZXMgPSBbXTtcbiAgICAgICAgdGhpcy5kZWxldGVkR3JhZGVzID0gW107XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNob3coZXhhbTogRXhhbSkge1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSB0cnVlO1xuICAgICAgICB0aGlzLmV4YW0gPSBleGFtO1xuICAgICAgICB0aGlzLmdyYWRlcyA9IFtdO1xuICAgICAgICB0aGlzLmRlbGV0ZWRHcmFkZXMgPSBbXTtcbiAgICAgICAgRXhhbUdyYWRlLmxpc3RCeUV4YW0odGhpcywgZXhhbS5pZCkuc3Vic2NyaWJlKGdyYWRlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLmdyYWRlcyA9IGdyYWRlcztcbiAgICAgICAgfSlcbiAgICAgICAgRXhhbVNldHRpbmcuYnlFeGFtKHRoaXMsIGV4YW0uaWQpLnN1YnNjcmliZSgoc2V0dGluZzogRXhhbVNldHRpbmcpID0+IHtcbiAgICAgICAgICAgIGlmICghc2V0dGluZykge1xuICAgICAgICAgICAgICAgIHNldHRpbmcgPSBuZXcgRXhhbVNldHRpbmcoKTtcbiAgICAgICAgICAgICAgICBzZXR0aW5nLmV4YW1faWQgPSBleGFtLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXR0aW5nID0gc2V0dGluZztcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBhZGRHcmFkZSgpIHtcbiAgICAgICAgdmFyIGdyYWRlID0gbmV3IEV4YW1HcmFkZSgpO1xuICAgICAgICBncmFkZS5uYW1lID0gJ05ldyBncmFkZSc7XG4gICAgICAgIGdyYWRlLmV4YW1faWQgPSB0aGlzLmV4YW0uaWQ7XG4gICAgICAgIHRoaXMuZ3JhZGVzLnB1c2goZ3JhZGUpO1xuICAgIH1cblxuXG4gICAgc2F2ZUV4YW1TZXR0aW5nKCkge1xuICAgICAgICB0aGlzLnNldHRpbmcuc2F2ZSh0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdmFyIGV4aXN0R3JhZGVzID0gXy5maWx0ZXIodGhpcy5ncmFkZXMsIChncmFkZTpFeGFtR3JhZGUpPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAhZ3JhZGUuSXNOZXcgJiYgKGdyYWRlLm5hbWUgJiYgZ3JhZGUubmFtZSAhPScnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIG5ld0dyYWRlcyA9IF8uZmlsdGVyKHRoaXMuZ3JhZGVzLCAoZ3JhZGU6RXhhbUdyYWRlKT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ3JhZGUuSXNOZXcgJiYgKGdyYWRlLm5hbWUgJiYgZ3JhZGUubmFtZSAhPScnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGRlbGV0ZUdyYWRlcyA9IF8uZmlsdGVyKHRoaXMuZ3JhZGVzLCAoZ3JhZGU6RXhhbUdyYWRlKT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIWdyYWRlLklzTmV3ICYmICghZ3JhZGUubmFtZSB8fCBncmFkZS5uYW1lID09PScnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgT2JzZXJ2YWJsZS5mb3JrSm9pbihFeGFtR3JhZGUudXBkYXRlQXJyYXkodGhpcywgZXhpc3RHcmFkZXMpLFxuICAgICAgICAgICAgICAgIEV4YW1HcmFkZS5jcmVhdGVBcnJheSh0aGlzLCBuZXdHcmFkZXMpLCBcbiAgICAgICAgICAgICAgICBFeGFtR3JhZGUuZGVsZXRlQXJyYXkodGhpcywgZGVsZXRlR3JhZGVzKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VjY2Vzcyh0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnU2V0dGluZyBzYXZlZCBzdWNjZXNzZnVsbHkuJykpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuIl19

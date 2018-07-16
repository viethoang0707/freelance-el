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
var report_utils_1 = require("../../../shared/helpers/report.utils");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var course_syllabus_dialog_component_1 = require("../../../cms/course/course-syllabus/course-syllabus.dialog.component");
var course_publish_dialog_component_1 = require("../../../cms/course/course-publish/course-publish.dialog.component");
var CourseListComponent = (function (_super) {
    __extends(CourseListComponent, _super);
    function CourseListComponent(router) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.COURSE_STATUS = constants_1.COURSE_STATUS;
        _this.COURSE_MODE = constants_1.COURSE_MODE;
        _this.reportUtils = new report_utils_1.ReportUtils();
        return _this;
    }
    CourseListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.lmsProfileService.init(this).subscribe(function () {
            var courses = _this.lmsProfileService.MyCourses;
            _this.displayCourses(courses);
        });
    };
    CourseListComponent.prototype.displayCourses = function (courses) {
        var _this = this;
        _.each(courses, function (course) {
            course['student'] = _this.lmsProfileService.getCourseMemberByRole('student', course.id);
            course['teacher'] = _this.lmsProfileService.getCourseMemberByRole('teacher', course.id);
            course['editor'] = _this.lmsProfileService.getCourseMemberByRole('editor', course.id);
            course['supervisor'] = _this.lmsProfileService.getCourseMemberByRole('supervisor', course.id);
            if (course['supervisor'])
                course['editor'] = course['supervisor'];
        });
        this.courses = this.filteredCourses = _.sortBy(courses, function (course) {
            return -_this.lmsProfileService.getLastCourseTimestamp(course);
        });
    };
    CourseListComponent.prototype.studyCourse = function (course, member) {
        this.router.navigate(['/lms/courses/study', course.id, member.id]);
    };
    CourseListComponent.prototype.withdrawCourse = function (course, member) {
        var _this = this;
        this.confirm('Are you sure to proceed ?', function () {
            member.status = 'withdraw';
            member.save(_this).subscribe(function () {
                _this.lmsProfileService.invalidateAll();
            });
        });
    };
    CourseListComponent.prototype.viewCourse = function (course) {
        this.router.navigate(['/lms/courses/view', course.id]);
    };
    CourseListComponent.prototype.editSyllabus = function (course, member) {
        this.router.navigate(['/lms/courses/edit', course.id, member.id]);
    };
    CourseListComponent.prototype.publishCourse = function (course) {
        this.publisiDialog.show(course);
    };
    CourseListComponent.prototype.manageCourse = function (course, member) {
        this.router.navigate(['/lms/courses/manage', course.id, member.id]);
    };
    CourseListComponent.prototype.filterCourse = function () {
        var _this = this;
        if (!this.keyword)
            return;
        this.keyword = this.keyword.trim();
        if (this.keyword.length == 0)
            this.filteredCourses = this.courses;
        else {
            var keyword = this.keyword.toLowerCase();
            this.filteredCourses = _.filter(this.courses, function (course) {
                return course.name.toLowerCase().includes(_this.keyword)
                    || course.summary.toLowerCase().includes(_this.keyword)
                    || course.code.toLowerCase().includes(_this.keyword)
                    || course.description.toLowerCase().includes(_this.keyword);
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CourseListComponent.prototype, "keyword", void 0);
    __decorate([
        core_1.ViewChild(course_syllabus_dialog_component_1.CourseSyllabusDialog),
        __metadata("design:type", course_syllabus_dialog_component_1.CourseSyllabusDialog)
    ], CourseListComponent.prototype, "syllabusDialog", void 0);
    __decorate([
        core_1.ViewChild(course_publish_dialog_component_1.CoursePublishDialog),
        __metadata("design:type", course_publish_dialog_component_1.CoursePublishDialog)
    ], CourseListComponent.prototype, "publisiDialog", void 0);
    CourseListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'lms-course-list',
            templateUrl: 'course-list.component.html',
            styleUrls: ['course-list.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], CourseListComponent);
    return CourseListComponent;
}(base_component_1.BaseComponent));
exports.CourseListComponent = CourseListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvY291cnNlL2NvdXJzZS1saXN0L2NvdXJzZS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFDcEUsMENBQXlDO0FBR3pDLGlGQUErRTtBQUcvRSxxRUFBbUU7QUFDbkUsOEJBQWdDO0FBQ2hDLDhEQUE2RjtBQVE3Rix5SEFBNEc7QUFFNUcsc0hBQXlHO0FBVXpHO0lBQXlDLHVDQUFhO0lBY2xELDZCQUFvQixNQUFjO1FBQWxDLFlBQ0ksaUJBQU8sU0FFVjtRQUhtQixZQUFNLEdBQU4sTUFBTSxDQUFRO1FBWmxDLG1CQUFhLEdBQUcseUJBQWEsQ0FBQztRQUM5QixpQkFBVyxHQUFHLHVCQUFXLENBQUM7UUFhdEIsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDBCQUFXLEVBQUUsQ0FBQzs7SUFDekMsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFBQSxpQkFLQztRQUpHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3hDLElBQUksT0FBTyxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7WUFDL0MsS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCw0Q0FBYyxHQUFkLFVBQWUsT0FBZ0I7UUFBL0IsaUJBWUM7UUFYRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFDLE1BQWE7WUFDMUIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFJLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hGLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBSSxLQUFJLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLE1B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QkFDekQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDO3VCQUNoRCxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDO3VCQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDO3VCQUNoRCxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkUsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUVMLENBQUM7SUE1RVE7UUFBUixZQUFLLEVBQUU7O3dEQUFpQjtJQUVRO1FBQWhDLGdCQUFTLENBQUMsdURBQW9CLENBQUM7a0NBQWlCLHVEQUFvQjsrREFBQztJQUN0QztRQUEvQixnQkFBUyxDQUFDLHFEQUFtQixDQUFDO2tDQUFnQixxREFBbUI7OERBQUM7SUFaMUQsbUJBQW1CO1FBUC9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1NBQzNDLENBQUM7eUNBZ0I4QixlQUFNO09BZHpCLG1CQUFtQixDQXNGL0I7SUFBRCwwQkFBQztDQXRGRCxBQXNGQyxDQXRGd0MsOEJBQWEsR0FzRnJEO0FBdEZZLGtEQUFtQiIsImZpbGUiOiJhcHAvbG1zL2NvdXJzZS9jb3Vyc2UtbGlzdC9jb3Vyc2UtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcCwgY29uY2F0QWxsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBSZXBvcnRVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3JlcG9ydC51dGlscyc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgR1JPVVBfQ0FURUdPUlksIENPVVJTRV9TVEFUVVMsIENPVVJTRV9NT0RFIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlVW5pdCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS11bml0Lm1vZGVsJztcbmltcG9ydCB7IENvdXJzZVN5bGxhYnVzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLXN5bGxhYnVzLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQ291cnNlU3lsbGFidXNEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9jbXMvY291cnNlL2NvdXJzZS1zeWxsYWJ1cy9jb3Vyc2Utc3lsbGFidXMuZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlUHVibGlzaERpYWxvZyB9IGZyb20gJy4uLy4uLy4uL2Ntcy9jb3Vyc2UvY291cnNlLXB1Ymxpc2gvY291cnNlLXB1Ymxpc2guZGlhbG9nLmNvbXBvbmVudCc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2xtcy1jb3Vyc2UtbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICdjb3Vyc2UtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2NvdXJzZS1saXN0LmNvbXBvbmVudC5jc3MnXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBDb3Vyc2VMaXN0Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBDT1VSU0VfU1RBVFVTID0gQ09VUlNFX1NUQVRVUztcbiAgICBDT1VSU0VfTU9ERSA9IENPVVJTRV9NT0RFO1xuXG4gICAgcHJpdmF0ZSBjb3Vyc2VzOiBDb3Vyc2VbXTtcbiAgICBwcml2YXRlIGZpbHRlcmVkQ291cnNlczogQ291cnNlW107XG4gICAgcHJpdmF0ZSBjb3Vyc2VNZW1iZXJzOiBDb3Vyc2VNZW1iZXJbXTtcbiAgICBwcml2YXRlIHJlcG9ydFV0aWxzOiBSZXBvcnRVdGlscztcbiAgICBASW5wdXQoKSBrZXl3b3JkOiBzdHJpbmc7XG5cbiAgICBAVmlld0NoaWxkKENvdXJzZVN5bGxhYnVzRGlhbG9nKSBzeWxsYWJ1c0RpYWxvZzogQ291cnNlU3lsbGFidXNEaWFsb2c7XG4gICAgQFZpZXdDaGlsZChDb3Vyc2VQdWJsaXNoRGlhbG9nKSBwdWJsaXNpRGlhbG9nOiBDb3Vyc2VQdWJsaXNoRGlhbG9nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnJlcG9ydFV0aWxzID0gbmV3IFJlcG9ydFV0aWxzKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubG1zUHJvZmlsZVNlcnZpY2UuaW5pdCh0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdmFyIGNvdXJzZXMgPSB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLk15Q291cnNlcztcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUNvdXJzZXMoY291cnNlcyk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZGlzcGxheUNvdXJzZXMoY291cnNlczpDb3Vyc2VbXSkge1xuICAgICAgICBfLmVhY2goY291cnNlcywgKGNvdXJzZTpDb3Vyc2UpPT4ge1xuICAgICAgICAgICAgY291cnNlWydzdHVkZW50J10gPSAgdGhpcy5sbXNQcm9maWxlU2VydmljZS5nZXRDb3Vyc2VNZW1iZXJCeVJvbGUoJ3N0dWRlbnQnLCBjb3Vyc2UuaWQpO1xuICAgICAgICAgICAgY291cnNlWyd0ZWFjaGVyJ10gPSAgdGhpcy5sbXNQcm9maWxlU2VydmljZS5nZXRDb3Vyc2VNZW1iZXJCeVJvbGUoJ3RlYWNoZXInLCBjb3Vyc2UuaWQpO1xuICAgICAgICAgICAgY291cnNlWydlZGl0b3InXSA9ICB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmdldENvdXJzZU1lbWJlckJ5Um9sZSgnZWRpdG9yJywgY291cnNlLmlkKTtcbiAgICAgICAgICAgIGNvdXJzZVsnc3VwZXJ2aXNvciddID0gIHRoaXMubG1zUHJvZmlsZVNlcnZpY2UuZ2V0Q291cnNlTWVtYmVyQnlSb2xlKCdzdXBlcnZpc29yJywgY291cnNlLmlkKTtcbiAgICAgICAgICAgIGlmIChjb3Vyc2VbJ3N1cGVydmlzb3InXSlcbiAgICAgICAgICAgICAgICBjb3Vyc2VbJ2VkaXRvciddID0gIGNvdXJzZVsnc3VwZXJ2aXNvciddO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb3Vyc2VzID0gdGhpcy5maWx0ZXJlZENvdXJzZXMgPSBfLnNvcnRCeShjb3Vyc2VzLCAoY291cnNlOiBDb3Vyc2UpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAtdGhpcy5sbXNQcm9maWxlU2VydmljZS5nZXRMYXN0Q291cnNlVGltZXN0YW1wKGNvdXJzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0dWR5Q291cnNlKGNvdXJzZTogQ291cnNlLCBtZW1iZXI6IENvdXJzZU1lbWJlcikge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sbXMvY291cnNlcy9zdHVkeScsIGNvdXJzZS5pZCwgbWVtYmVyLmlkXSk7XG4gICAgfVxuXG4gICAgd2l0aGRyYXdDb3Vyc2UoY291cnNlOiBDb3Vyc2UsIG1lbWJlcjogQ291cnNlTWVtYmVyKSB7XG4gICAgICAgIHRoaXMuY29uZmlybSgnQXJlIHlvdSBzdXJlIHRvIHByb2NlZWQgPycsICgpPT4ge1xuICAgICAgICAgICAgbWVtYmVyLnN0YXR1cyA9ICd3aXRoZHJhdyc7XG4gICAgICAgICAgICBtZW1iZXIuc2F2ZSh0aGlzKS5zdWJzY3JpYmUoKCk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sbXNQcm9maWxlU2VydmljZS5pbnZhbGlkYXRlQWxsKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2aWV3Q291cnNlKGNvdXJzZTogQ291cnNlKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xtcy9jb3Vyc2VzL3ZpZXcnLCBjb3Vyc2UuaWRdKTtcbiAgICB9XG5cbiAgICBlZGl0U3lsbGFidXMoY291cnNlOiBDb3Vyc2UsIG1lbWJlcjogQ291cnNlTWVtYmVyKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xtcy9jb3Vyc2VzL2VkaXQnLCBjb3Vyc2UuaWQsIG1lbWJlci5pZF0pO1xuICAgIH1cblxuICAgIHB1Ymxpc2hDb3Vyc2UoY291cnNlOiBDb3Vyc2UpIHtcbiAgICAgICAgdGhpcy5wdWJsaXNpRGlhbG9nLnNob3coY291cnNlKTtcbiAgICB9XG5cbiAgICBtYW5hZ2VDb3Vyc2UoY291cnNlOiBDb3Vyc2UsIG1lbWJlcjogQ291cnNlTWVtYmVyKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xtcy9jb3Vyc2VzL21hbmFnZScsIGNvdXJzZS5pZCwgbWVtYmVyLmlkXSk7XG4gICAgfVxuXG4gICAgZmlsdGVyQ291cnNlKCkge1xuICAgICAgICBpZiAoIXRoaXMua2V5d29yZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5rZXl3b3JkID0gdGhpcy5rZXl3b3JkLnRyaW0oKTtcbiAgICAgICAgaWYgKHRoaXMua2V5d29yZC5sZW5ndGggPT0gMClcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyZWRDb3Vyc2VzID0gdGhpcy5jb3Vyc2VzO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBrZXl3b3JkID0gdGhpcy5rZXl3b3JkLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcmVkQ291cnNlcyA9IF8uZmlsdGVyKHRoaXMuY291cnNlcywgKGNvdXJzZTogQ291cnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModGhpcy5rZXl3b3JkKVxuICAgICAgICAgICAgICAgICAgICB8fCBjb3Vyc2Uuc3VtbWFyeS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHRoaXMua2V5d29yZClcbiAgICAgICAgICAgICAgICAgICAgfHwgY291cnNlLmNvZGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh0aGlzLmtleXdvcmQpXG4gICAgICAgICAgICAgICAgICAgIHx8IGNvdXJzZS5kZXNjcmlwdGlvbi50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHRoaXMua2V5d29yZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxufSJdfQ==

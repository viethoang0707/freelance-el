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
var course_model_1 = require("../../../shared/models/elearning/course.model");
var group_model_1 = require("../../../shared/models/elearning/group.model");
var course_dialog_component_1 = require("../course-dialog/course-dialog.component");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var CourseListComponent = (function (_super) {
    __extends(CourseListComponent, _super);
    function CourseListComponent() {
        var _this = _super.call(this) || this;
        _this.COURSE_MODE = constants_1.COURSE_MODE;
        _this.COURSE_STATUS = constants_1.COURSE_STATUS;
        _this.REVIEW_STATE = constants_1.REVIEW_STATE;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    CourseListComponent.prototype.ngOnInit = function () {
        var _this = this;
        group_model_1.Group.listCourseGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
        });
        this.loadCourses();
    };
    CourseListComponent.prototype.checkDuplicate = function (course) {
        var duplicates = _.filter(this.courses, function (obj) {
            return course.code == obj.code;
        });
        if (duplicates.length >= 2)
            this.warn(this.translateService.instant('There is another course with same code in database'));
    };
    CourseListComponent.prototype.addCourse = function () {
        var _this = this;
        var course = new course_model_1.Course();
        this.courseDialog.show(course);
        this.courseDialog.onCreateComplete.subscribe(function () {
            _this.checkDuplicate(course);
            _this.loadCourses();
        });
    };
    CourseListComponent.prototype.editCourse = function () {
        var _this = this;
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedCourse.supervisor_id) {
            this.error('You do not have edit permission for this course');
            return;
        }
        this.courseDialog.show(this.selectedCourse);
        this.courseDialog.onUpdateComplete.subscribe(function () {
            _this.checkDuplicate(_this.selectedCourse);
        });
    };
    CourseListComponent.prototype.requestReview = function () {
        var _this = this;
        if (this.ContextUser.id != this.selectedCourse.supervisor_id) {
            this.error('You do not have submit-review permission for this course');
            return;
        }
        this.workflowService.createCourseReviewTicket(this, this.selectedCourse).subscribe(function () {
            _this.success('Request submitted');
            _this.selectedCourse.refresh(_this).subscribe();
        });
    };
    CourseListComponent.prototype.deleteCourse = function () {
        var _this = this;
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedCourse.supervisor_id) {
            this.error('You do not have delete permission for this course');
            return;
        }
        this.confirm('Are you sure to delete ?', function () {
            _this.selectedCourse.delete(_this).subscribe(function () {
                _this.loadCourses();
                _this.selectedCourse = null;
            });
        });
    };
    CourseListComponent.prototype.loadCourses = function () {
        var _this = this;
        course_model_1.Course.all(this).subscribe(function (courses) {
            _this.courses = courses;
            _this.displayCourses = courses;
            _this.displayCourses.sort(function (course1, course2) {
                return (course2.id - course1.id);
            });
        });
    };
    CourseListComponent.prototype.filterCourse = function () {
        var _this = this;
        if (this.selectedGroupNodes.length != 0) {
            this.displayCourses = _.filter(this.courses, function (course) {
                var parentGroupNode = _.find(_this.selectedGroupNodes, function (node) {
                    return node.data.id == course.group_id;
                });
                return parentGroupNode != null;
            });
        }
        else {
            this.displayCourses = this.courses;
        }
    };
    __decorate([
        core_1.ViewChild(course_dialog_component_1.CourseDialog),
        __metadata("design:type", course_dialog_component_1.CourseDialog)
    ], CourseListComponent.prototype, "courseDialog", void 0);
    CourseListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-list',
            templateUrl: 'course-list.component.html',
            styleUrls: ['course-list.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], CourseListComponent);
    return CourseListComponent;
}(base_component_1.BaseComponent));
exports.CourseListComponent = CourseListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb3Vyc2UvY291cnNlL2NvdXJzZS1saXN0L2NvdXJzZS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFFcEUsaUZBQStFO0FBRy9FLDhCQUFnQztBQUNoQyw4REFBd0g7QUFDeEgsOEVBQXVFO0FBQ3ZFLDRFQUFxRTtBQUNyRSxvRkFBd0U7QUFDeEUsaUVBQStEO0FBVy9EO0lBQXlDLHVDQUFhO0lBZWxEO1FBQUEsWUFDSSxpQkFBTyxTQUVWO1FBaEJELGlCQUFXLEdBQUcsdUJBQVcsQ0FBQztRQUMxQixtQkFBYSxHQUFHLHlCQUFhLENBQUM7UUFDOUIsa0JBQVksR0FBRyx3QkFBWSxDQUFDO1FBYXhCLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxzQkFBUyxFQUFFLENBQUM7O0lBQ3JDLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBQUEsaUJBS0M7UUFKRyxtQkFBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ3hDLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELDRDQUFjLEdBQWQsVUFBZSxNQUFjO1FBQ3pCLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFDLEdBQVc7WUFDaEQsT0FBTyxNQUFNLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMs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SUFFRCwwQ0FBWSxHQUFaO1FBQUEsaUJBV0M7UUFWRyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUEsTUFBTTtnQkFDL0MsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsa0JBQWtCLEVBQUUsVUFBQSxJQUFJO29CQUN0RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQzNDLENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU8sZUFBZSxJQUFJLElBQUksQ0FBQztZQUNuQyxDQUFDLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDdEM7SUFDTCxDQUFDO0lBeEZ3QjtRQUF4QixnQkFBUyxDQUFDLHNDQUFZLENBQUM7a0NBQWUsc0NBQVk7NkRBQUM7SUFiM0MsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztTQUMzQyxDQUFDOztPQUNXLG1CQUFtQixDQXNHL0I7SUFBRCwwQkFBQztDQXRHRCxBQXNHQyxDQXRHd0MsOEJBQWEsR0FzR3JEO0FBdEdZLGtEQUFtQiIsImZpbGUiOiJhcHAvY291cnNlL2NvdXJzZS9jb3Vyc2UtbGlzdC9jb3Vyc2UtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgVVNFUl9TVEFUVVMsIEdST1VQX0NBVEVHT1JZLCBDT1VSU0VfTU9ERSwgQ09VUlNFX1NUQVRVUywgUkVWSUVXX1NUQVRFIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UubW9kZWwnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VEaWFsb2cgfSBmcm9tICcuLi9jb3Vyc2UtZGlhbG9nL2NvdXJzZS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3RyZWUudXRpbHMnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnY291cnNlLWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnY291cnNlLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydjb3Vyc2UtbGlzdC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIENvdXJzZUxpc3RDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuICAgIENPVVJTRV9NT0RFID0gQ09VUlNFX01PREU7XG4gICAgQ09VUlNFX1NUQVRVUyA9IENPVVJTRV9TVEFUVVM7XG4gICAgUkVWSUVXX1NUQVRFID0gUkVWSUVXX1NUQVRFO1xuXG4gICAgcHJpdmF0ZSB0cmVlOiBUcmVlTm9kZVtdO1xuICAgIHByaXZhdGUgY291cnNlczogQ291cnNlW107XG4gICAgcHJpdmF0ZSBkaXNwbGF5Q291cnNlczogQ291cnNlW107XG4gICAgcHJpdmF0ZSBzZWxlY3RlZEdyb3VwTm9kZXM6IFRyZWVOb2RlW107XG4gICAgcHJpdmF0ZSBzZWxlY3RlZENvdXJzZTogYW55O1xuICAgIHByaXZhdGUgdHJlZVV0aWxzOiBUcmVlVXRpbHM7XG5cbiAgICBAVmlld0NoaWxkKENvdXJzZURpYWxvZykgY291cnNlRGlhbG9nOiBDb3Vyc2VEaWFsb2c7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50cmVlVXRpbHMgPSBuZXcgVHJlZVV0aWxzKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIEdyb3VwLmxpc3RDb3Vyc2VHcm91cCh0aGlzKS5zdWJzY3JpYmUoZ3JvdXBzID0+IHtcbiAgICAgICAgICAgIHRoaXMudHJlZSA9IHRoaXMudHJlZVV0aWxzLmJ1aWxkR3JvdXBUcmVlKGdyb3Vwcyk7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMubG9hZENvdXJzZXMoKTtcbiAgICB9XG5cbiAgICBjaGVja0R1cGxpY2F0ZShjb3Vyc2U6IENvdXJzZSkge1xuICAgICAgICB2YXIgZHVwbGljYXRlcyA9IF8uZmlsdGVyKHRoaXMuY291cnNlcywgKG9iajogQ291cnNlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY291cnNlLmNvZGUgPT0gb2JqLmNvZGU7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZHVwbGljYXRlcy5sZW5ndGggPj0gMilcbiAgICAgICAgICAgIHRoaXMud2Fybih0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnVGhlcmUgaXMgYW5vdGhlciBjb3Vyc2Ugd2l0aCBzYW1lIGNvZGUgaW4gZGF0YWJhc2UnKSk7XG4gICAgfVxuXG4gICAgYWRkQ291cnNlKCkge1xuICAgICAgICB2YXIgY291cnNlID0gbmV3IENvdXJzZSgpO1xuICAgICAgICB0aGlzLmNvdXJzZURpYWxvZy5zaG93KGNvdXJzZSk7XG4gICAgICAgIHRoaXMuY291cnNlRGlhbG9nLm9uQ3JlYXRlQ29tcGxldGUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tEdXBsaWNhdGUoY291cnNlKTtcbiAgICAgICAgICAgIHRoaXMubG9hZENvdXJzZXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZWRpdENvdXJzZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLkNvbnRleHRVc2VyLklzU3VwZXJBZG1pbiAmJiB0aGlzLkNvbnRleHRVc2VyLmlkICE9IHRoaXMuc2VsZWN0ZWRDb3Vyc2Uuc3VwZXJ2aXNvcl9pZCkge1xuICAgICAgICAgICAgdGhpcy5lcnJvcignWW91IGRvIG5vdCBoYXZlIGVkaXQgcGVybWlzc2lvbiBmb3IgdGhpcyBjb3Vyc2UnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvdXJzZURpYWxvZy5zaG93KHRoaXMuc2VsZWN0ZWRDb3Vyc2UpO1xuICAgICAgICB0aGlzLmNvdXJzZURpYWxvZy5vblVwZGF0ZUNvbXBsZXRlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrRHVwbGljYXRlKHRoaXMuc2VsZWN0ZWRDb3Vyc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXF1ZXN0UmV2aWV3KCkge1xuICAgICAgICBpZiAodGhpcy5Db250ZXh0VXNlci5pZCAhPSB0aGlzLnNlbGVjdGVkQ291cnNlLnN1cGVydmlzb3JfaWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoJ1lvdSBkbyBub3QgaGF2ZSBzdWJtaXQtcmV2aWV3IHBlcm1pc3Npb24gZm9yIHRoaXMgY291cnNlJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53b3JrZmxvd1NlcnZpY2UuY3JlYXRlQ291cnNlUmV2aWV3VGlja2V0KHRoaXMsIHRoaXMuc2VsZWN0ZWRDb3Vyc2UpLnN1YnNjcmliZSgoKT0+IHtcbiAgICAgICAgICAgIHRoaXMuc3VjY2VzcygnUmVxdWVzdCBzdWJtaXR0ZWQnKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb3Vyc2UucmVmcmVzaCh0aGlzKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlQ291cnNlKCkge1xuICAgICAgICBpZiAoIXRoaXMuQ29udGV4dFVzZXIuSXNTdXBlckFkbWluICYmIHRoaXMuQ29udGV4dFVzZXIuaWQgIT0gdGhpcy5zZWxlY3RlZENvdXJzZS5zdXBlcnZpc29yX2lkKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yKCdZb3UgZG8gbm90IGhhdmUgZGVsZXRlIHBlcm1pc3Npb24gZm9yIHRoaXMgY291cnNlJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25maXJtKCdBcmUgeW91IHN1cmUgdG8gZGVsZXRlID8nLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ291cnNlLmRlbGV0ZSh0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZENvdXJzZXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ291cnNlID0gbnVsbDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvYWRDb3Vyc2VzKCkge1xuICAgICAgICBDb3Vyc2UuYWxsKHRoaXMpLnN1YnNjcmliZShjb3Vyc2VzID0+IHtcbiAgICAgICAgICAgIHRoaXMuY291cnNlcyA9IGNvdXJzZXM7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlDb3Vyc2VzID0gY291cnNlcztcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUNvdXJzZXMuc29ydCgoY291cnNlMSwgY291cnNlMik6IGFueSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChjb3Vyc2UyLmlkIC0gY291cnNlMS5pZClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZpbHRlckNvdXJzZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRHcm91cE5vZGVzLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlDb3Vyc2VzID0gXy5maWx0ZXIodGhpcy5jb3Vyc2VzLCBjb3Vyc2UgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRHcm91cE5vZGUgPSBfLmZpbmQodGhpcy5zZWxlY3RlZEdyb3VwTm9kZXMsIG5vZGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5kYXRhLmlkID09IGNvdXJzZS5ncm91cF9pZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50R3JvdXBOb2RlICE9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUNvdXJzZXMgPSB0aGlzLmNvdXJzZXM7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiJdfQ==

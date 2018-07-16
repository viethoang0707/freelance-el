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
var class_list_dialog_component_1 = require("../class-list/class-list-dialog.component");
var enrollment_dialog_component_1 = require("../enrollment-dialog/enrollment-dialog.component");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var CourseEnrollmentListComponent = (function (_super) {
    __extends(CourseEnrollmentListComponent, _super);
    function CourseEnrollmentListComponent() {
        var _this = _super.call(this) || this;
        _this.COURSE_MODE = constants_1.COURSE_MODE;
        _this.COURSE_STATUS = constants_1.COURSE_STATUS;
        _this.REVIEW_STATE = constants_1.REVIEW_STATE;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    CourseEnrollmentListComponent.prototype.ngOnInit = function () {
        var _this = this;
        group_model_1.Group.listCourseGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
        });
        this.loadCourses();
    };
    CourseEnrollmentListComponent.prototype.enrollCourse = function () {
        if (this.ContextUser.id != this.selectedCourse.supervisor_id) {
            this.error(this.translateService.instant('You do not have enroll permission for this course'));
            return;
        }
        if (this.selectedCourse.mode == 'self-study')
            this.courseEnrollDialog.enrollCourse(this.selectedCourse);
        else if (this.selectedCourse.mode == 'group')
            this.classListDialog.show(this.selectedCourse);
    };
    CourseEnrollmentListComponent.prototype.loadCourses = function () {
        var _this = this;
        course_model_1.Course.allForEnroll(this).subscribe(function (courses) {
            _this.courses = courses;
            _this.displayCourses = courses;
            _this.displayCourses.sort(function (course1, course2) {
                return (course2.id - course1.id);
            });
        });
    };
    CourseEnrollmentListComponent.prototype.filterCourse = function () {
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
    CourseEnrollmentListComponent.prototype.closeCourse = function () {
        var _this = this;
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedCourse.supervisor_id) {
            this.error('You do not have close permission for this class');
            return;
        }
        this.confirm('Are you sure to proceed ? You will not be able to add new class after the course is closed', function () {
            _this.selectedCourse.close(_this).subscribe(function () {
                _this.selectedCourse.status = 'closed';
                _this.success('Class close');
            });
        });
    };
    CourseEnrollmentListComponent.prototype.openCourse = function () {
        var _this = this;
        if (this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedCourse.supervisor_id) {
            this.error('You do not have open permission for this class');
            return;
        }
        this.confirm('Are you sure to proceed ?.', function () {
            _this.selectedCourse.open(_this).subscribe(function () {
                _this.selectedCourse.status = 'open';
                _this.success('Class close');
            });
        });
    };
    __decorate([
        core_1.ViewChild(enrollment_dialog_component_1.CourseEnrollDialog),
        __metadata("design:type", enrollment_dialog_component_1.CourseEnrollDialog)
    ], CourseEnrollmentListComponent.prototype, "courseEnrollDialog", void 0);
    __decorate([
        core_1.ViewChild(class_list_dialog_component_1.ClassListDialog),
        __metadata("design:type", class_list_dialog_component_1.ClassListDialog)
    ], CourseEnrollmentListComponent.prototype, "classListDialog", void 0);
    CourseEnrollmentListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-enrollment-list',
            templateUrl: 'course-list.component.html',
            styleUrls: ['course-list.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], CourseEnrollmentListComponent);
    return CourseEnrollmentListComponent;
}(base_component_1.BaseComponent));
exports.CourseEnrollmentListComponent = CourseEnrollmentListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb3Vyc2UvZW5yb2xsbWVudC9jb3Vyc2UtbGlzdC9jb3Vyc2UtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBRXBFLGlGQUErRTtBQUcvRSw4QkFBZ0M7QUFDaEMsOERBQXdIO0FBQ3hILDhFQUF1RTtBQUN2RSw0RUFBcUU7QUFDckUseUZBQTRFO0FBQzVFLGdHQUFzRjtBQUN0RixpRUFBK0Q7QUFXL0Q7SUFBbUQsaURBQWE7SUFnQjVEO1FBQUEsWUFDSSxpQkFBTyxTQUVWO1FBakJELGlCQUFXLEdBQUcsdUJBQVcsQ0FBQztRQUMxQixtQkFBYSxHQUFHLHlCQUFhLENBQUM7UUFDOUIsa0JBQVksR0FBRyx3QkFBWSxDQUFDO1FBY3hCLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxzQkFBUyxFQUFFLENBQUM7O0lBQ3JDLENBQUM7SUFFRCxnREFBUSxHQUFSO1FBQUEsaUJBS0M7UUFKRyxtQkFBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ3hDLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUdELG9EQUFZLEdBQVo7UUFDSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFO1lBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxtREFBbUQsQ0FBQyxDQUFDLENBQUM7WUFDL0YsT0FBTztTQUNWO1FBQ0QsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksSUFBSSxZQUFZO1lBQ3hDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ3pELElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksT0FBTztZQUN4QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELG1EQUFXLEdBQVg7UUFBQSxpQkFRQztRQVBHLHFCQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87WUFDdkMsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsS0FBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7WUFDOUIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFPLEVBQUUsT0FBTztnQkFDdEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ3BDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsb0RBQVksR0FBWjtRQUFBLGlCQVdDO1FBVkcsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNyQyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFBLE1BQU07Z0JBQy9DLElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGtCQUFrQixFQUFFLFVBQUEsSUFBSTtvQkFDdEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDO2dCQUMzQyxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPLGVBQWUsSUFBSSxJQUFJLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3RDO0lBQ0wsQ0FBQztJQUVELG1EQUFXLEdBQVg7UUFBQSxpQkFXQztRQVZHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRTtZQUM1RixJQUFJLENBQUMsS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7WUFDOUQsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyw0RkFBNEYsRUFBRTtZQUN2RyxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ3RDLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztnQkFDdEMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGtEQUFVLEdBQVY7UUFBQSxpQkFZQztRQVhHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUU7WUFDM0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1lBQzdELE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsNEJBQTRCLEVBQUU7WUFDdkMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUNyQyxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQ3BDLEtBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUEzRThCO1FBQTlCLGdCQUFTLENBQUMsZ0RBQWtCLENBQUM7a0NBQXFCLGdEQUFrQjs2RUFBQztJQUMxQztRQUEzQixnQkFBUyxDQUFDLDZDQUFlLENBQUM7a0NBQWtCLDZDQUFlOzBFQUFDO0lBZHBELDZCQUE2QjtRQU56QyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztTQUMzQyxDQUFDOztPQUNXLDZCQUE2QixDQXlGekM7SUFBRCxvQ0FBQztDQXpGRCxBQXlGQyxDQXpGa0QsOEJBQWEsR0F5Ri9EO0FBekZZLHNFQUE2QiIsImZpbGUiOiJhcHAvY291cnNlL2Vucm9sbG1lbnQvY291cnNlLWxpc3QvY291cnNlLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFVTRVJfU1RBVFVTLCBHUk9VUF9DQVRFR09SWSwgQ09VUlNFX01PREUsIENPVVJTRV9TVEFUVVMsIFJFVklFV19TVEFURSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLm1vZGVsJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgQ2xhc3NMaXN0RGlhbG9nIH0gZnJvbSAnLi4vY2xhc3MtbGlzdC9jbGFzcy1saXN0LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlRW5yb2xsRGlhbG9nIH0gZnJvbSAnLi4vZW5yb2xsbWVudC1kaWFsb2cvZW5yb2xsbWVudC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3RyZWUudXRpbHMnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnY291cnNlLWVucm9sbG1lbnQtbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICdjb3Vyc2UtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2NvdXJzZS1saXN0LmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQ291cnNlRW5yb2xsbWVudExpc3RDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuICAgIENPVVJTRV9NT0RFID0gQ09VUlNFX01PREU7XG4gICAgQ09VUlNFX1NUQVRVUyA9IENPVVJTRV9TVEFUVVM7XG4gICAgUkVWSUVXX1NUQVRFID0gUkVWSUVXX1NUQVRFO1xuXG4gICAgcHJpdmF0ZSB0cmVlOiBUcmVlTm9kZVtdO1xuICAgIHByaXZhdGUgY291cnNlczogQ291cnNlW107XG4gICAgcHJpdmF0ZSBkaXNwbGF5Q291cnNlczogQ291cnNlW107XG4gICAgcHJpdmF0ZSBzZWxlY3RlZEdyb3VwTm9kZXM6IFRyZWVOb2RlW107XG4gICAgcHJpdmF0ZSBzZWxlY3RlZENvdXJzZTogQ291cnNlO1xuICAgIHByaXZhdGUgdHJlZVV0aWxzOiBUcmVlVXRpbHM7XG5cbiAgICBAVmlld0NoaWxkKENvdXJzZUVucm9sbERpYWxvZykgY291cnNlRW5yb2xsRGlhbG9nOiBDb3Vyc2VFbnJvbGxEaWFsb2c7XG4gICAgQFZpZXdDaGlsZChDbGFzc0xpc3REaWFsb2cpIGNsYXNzTGlzdERpYWxvZzogQ2xhc3NMaXN0RGlhbG9nO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudHJlZVV0aWxzID0gbmV3IFRyZWVVdGlscygpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBHcm91cC5saXN0Q291cnNlR3JvdXAodGhpcykuc3Vic2NyaWJlKGdyb3VwcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnRyZWUgPSB0aGlzLnRyZWVVdGlscy5idWlsZEdyb3VwVHJlZShncm91cHMpO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLmxvYWRDb3Vyc2VzKCk7XG4gICAgfVxuXG5cbiAgICBlbnJvbGxDb3Vyc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLkNvbnRleHRVc2VyLmlkICE9IHRoaXMuc2VsZWN0ZWRDb3Vyc2Uuc3VwZXJ2aXNvcl9pZCkge1xuICAgICAgICAgICAgdGhpcy5lcnJvcih0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnWW91IGRvIG5vdCBoYXZlIGVucm9sbCBwZXJtaXNzaW9uIGZvciB0aGlzIGNvdXJzZScpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZENvdXJzZS5tb2RlID09ICdzZWxmLXN0dWR5JylcbiAgICAgICAgICAgIHRoaXMuY291cnNlRW5yb2xsRGlhbG9nLmVucm9sbENvdXJzZSh0aGlzLnNlbGVjdGVkQ291cnNlKTtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zZWxlY3RlZENvdXJzZS5tb2RlID09ICdncm91cCcpXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdERpYWxvZy5zaG93KHRoaXMuc2VsZWN0ZWRDb3Vyc2UpO1xuICAgIH1cblxuICAgIGxvYWRDb3Vyc2VzKCkge1xuICAgICAgICBDb3Vyc2UuYWxsRm9yRW5yb2xsKHRoaXMpLnN1YnNjcmliZShjb3Vyc2VzID0+IHtcbiAgICAgICAgICAgIHRoaXMuY291cnNlcyA9IGNvdXJzZXM7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlDb3Vyc2VzID0gY291cnNlcztcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUNvdXJzZXMuc29ydCgoY291cnNlMSwgY291cnNlMik6IGFueSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChjb3Vyc2UyLmlkIC0gY291cnNlMS5pZClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmaWx0ZXJDb3Vyc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkR3JvdXBOb2Rlcy5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5Q291cnNlcyA9IF8uZmlsdGVyKHRoaXMuY291cnNlcywgY291cnNlID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50R3JvdXBOb2RlID0gXy5maW5kKHRoaXMuc2VsZWN0ZWRHcm91cE5vZGVzLCBub2RlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUuZGF0YS5pZCA9PSBjb3Vyc2UuZ3JvdXBfaWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudEdyb3VwTm9kZSAhPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlDb3Vyc2VzID0gdGhpcy5jb3Vyc2VzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2VDb3Vyc2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5Db250ZXh0VXNlci5Jc1N1cGVyQWRtaW4gJiYgdGhpcy5Db250ZXh0VXNlci5pZCAhPSB0aGlzLnNlbGVjdGVkQ291cnNlLnN1cGVydmlzb3JfaWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoJ1lvdSBkbyBub3QgaGF2ZSBjbG9zZSBwZXJtaXNzaW9uIGZvciB0aGlzIGNsYXNzJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25maXJtKCdBcmUgeW91IHN1cmUgdG8gcHJvY2VlZCA/IFlvdSB3aWxsIG5vdCBiZSBhYmxlIHRvIGFkZCBuZXcgY2xhc3MgYWZ0ZXIgdGhlIGNvdXJzZSBpcyBjbG9zZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ291cnNlLmNsb3NlKHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENvdXJzZS5zdGF0dXMgPSAnY2xvc2VkJztcbiAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3MoJ0NsYXNzIGNsb3NlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb3BlbkNvdXJzZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuQ29udGV4dFVzZXIuSXNTdXBlckFkbWluICYmIHRoaXMuQ29udGV4dFVzZXIuaWQgIT0gdGhpcy5zZWxlY3RlZENvdXJzZS5zdXBlcnZpc29yX2lkKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yKCdZb3UgZG8gbm90IGhhdmUgb3BlbiBwZXJtaXNzaW9uIGZvciB0aGlzIGNsYXNzJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25maXJtKCdBcmUgeW91IHN1cmUgdG8gcHJvY2VlZCA/LicsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb3Vyc2Uub3Blbih0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb3Vyc2Uuc3RhdHVzID0gJ29wZW4nO1xuICAgICAgICAgICAgICAgIHRoaXMuc3VjY2VzcygnQ2xhc3MgY2xvc2UnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH1cbn1cbiJdfQ==

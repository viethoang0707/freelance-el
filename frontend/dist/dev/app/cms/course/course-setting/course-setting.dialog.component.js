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
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var select_course_dialog_component_1 = require("../../../shared/components/select-course-dialog/select-course-dialog.component");
var CourseSettingDialog = (function (_super) {
    __extends(CourseSettingDialog, _super);
    function CourseSettingDialog() {
        return _super.call(this) || this;
    }
    CourseSettingDialog.prototype.selectCourse = function () {
        var _this = this;
        this.coursesDialog.show();
        this.coursesDialog.onSelectCourses.first().subscribe(function (courses) {
            if (courses && courses.length) {
                _this.object.prequisite_course_id = courses[0].id;
                _this.object.prequisite_course_id__DESC__ = courses[0].name;
            }
        });
    };
    __decorate([
        core_1.ViewChild(select_course_dialog_component_1.SelectCoursesDialog),
        __metadata("design:type", select_course_dialog_component_1.SelectCoursesDialog)
    ], CourseSettingDialog.prototype, "coursesDialog", void 0);
    CourseSettingDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-setting-dialog',
            templateUrl: 'course-setting.dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], CourseSettingDialog);
    return CourseSettingDialog;
}(base_dialog_1.BaseDialog));
exports.CourseSettingDialog = CourseSettingDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvY291cnNlL2NvdXJzZS1zZXR0aW5nL2NvdXJzZS1zZXR0aW5nLmRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBS3BFLDJFQUF5RTtBQVN6RSxpSUFBcUg7QUFRckg7SUFBeUMsdUNBQWtCO0lBSXZEO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lBRUQsMENBQVksR0FBWjtRQUFBLGlCQVNDO1FBUkcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPO1lBQ3hELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQzNCLEtBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDakQsS0FBSSxDQUFDLE1BQU0sQ0FBQyw0QkFBNEIsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2FBQzlEO1FBRUwsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBZitCO1FBQS9CLGdCQUFTLENBQUMsb0RBQW1CLENBQUM7a0NBQWdCLG9EQUFtQjs4REFBQztJQUYxRCxtQkFBbUI7UUFML0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLFdBQVcsRUFBRSxzQ0FBc0M7U0FDdEQsQ0FBQzs7T0FDVyxtQkFBbUIsQ0FrQi9CO0lBQUQsMEJBQUM7Q0FsQkQsQUFrQkMsQ0FsQndDLHdCQUFVLEdBa0JsRDtBQWxCWSxrREFBbUIiLCJmaWxlIjoiYXBwL2Ntcy9jb3Vyc2UvY291cnNlLXNldHRpbmcvY291cnNlLXNldHRpbmcuZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3lsbGFidXNVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3N5bGxhYnVzLnV0aWxzJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgQmFzZURpYWxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5kaWFsb2cnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlVW5pdCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS11bml0Lm1vZGVsJztcbmltcG9ydCB7IENvdXJzZVN5bGxhYnVzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLXN5bGxhYnVzLm1vZGVsJztcbmltcG9ydCB7IFRyZWVOb2RlLCBNZW51SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IENPVVJTRV9VTklUX1RZUEUsIENPVVJTRV9VTklUX0lDT04gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBDb3Vyc2VVbml0RGlhbG9nIH0gZnJvbSAnLi4vY291cnNlLXVuaXQtZGlhbG9nL2NvdXJzZS11bml0LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlVW5pdFByZXZpZXdEaWFsb2cgfSBmcm9tICcuLi9jb3Vyc2UtdW5pdC1wcmV2aWV3LWRpYWxvZy9jb3Vyc2UtdW5pdC1wcmV2aWV3LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFNlbGVjdENvdXJzZXNEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtY291cnNlLWRpYWxvZy9zZWxlY3QtY291cnNlLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2NvdXJzZS1zZXR0aW5nLWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICdjb3Vyc2Utc2V0dGluZy5kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBDb3Vyc2VTZXR0aW5nRGlhbG9nIGV4dGVuZHMgQmFzZURpYWxvZzxDb3Vyc2U+IHtcblxuICAgIEBWaWV3Q2hpbGQoU2VsZWN0Q291cnNlc0RpYWxvZykgY291cnNlc0RpYWxvZzogU2VsZWN0Q291cnNlc0RpYWxvZztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHNlbGVjdENvdXJzZSgpIHtcbiAgICAgICAgdGhpcy5jb3Vyc2VzRGlhbG9nLnNob3coKTtcbiAgICAgICAgdGhpcy5jb3Vyc2VzRGlhbG9nLm9uU2VsZWN0Q291cnNlcy5maXJzdCgpLnN1YnNjcmliZShjb3Vyc2VzID0+IHtcbiAgICAgICAgICAgIGlmIChjb3Vyc2VzICYmIGNvdXJzZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3QucHJlcXVpc2l0ZV9jb3Vyc2VfaWQgPSBjb3Vyc2VzWzBdLmlkO1xuICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0LnByZXF1aXNpdGVfY291cnNlX2lkX19ERVNDX18gPSBjb3Vyc2VzWzBdLm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4iXX0=

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
var syllabus_utils_1 = require("../../../shared/helpers/syllabus.utils");
var base_component_1 = require("../../../shared/components/base/base.component");
var course_model_1 = require("../../../shared/models/elearning/course.model");
var course_unit_model_1 = require("../../../shared/models/elearning/course-unit.model");
var course_syllabus_model_1 = require("../../../shared/models/elearning/course-syllabus.model");
var constants_1 = require("../../../shared/models/constants");
var course_unit_preview_dialog_component_1 = require("../course-unit-preview-dialog/course-unit-preview-dialog.component");
var _ = require("underscore");
var base_model_1 = require("../../../shared/models/base.model");
var CoursePublishDialog = (function (_super) {
    __extends(CoursePublishDialog, _super);
    function CoursePublishDialog() {
        var _this = _super.call(this) || this;
        _this.COURSE_UNIT_TYPE = constants_1.COURSE_UNIT_TYPE;
        _this.sylUtils = new syllabus_utils_1.SyllabusUtils();
        _this.syl = new course_syllabus_model_1.CourseSyllabus();
        _this.course = new course_model_1.Course();
        _this.contentStatus = _.map(constants_1.CONTENT_STATUS, function (val, key) {
            return {
                label: _this.translateService.instant(val),
                value: key
            };
        });
        return _this;
    }
    CoursePublishDialog.prototype.show = function (course) {
        var _this = this;
        this.display = true;
        this.course = course;
        course_syllabus_model_1.CourseSyllabus.get(this, course.syllabus_id).subscribe(function (syl) {
            _this.syl = syl;
            _this.buildCourseTree();
        });
    };
    CoursePublishDialog.prototype.clearSelection = function () {
        this.selectedNode = null;
        this.selectedUnit = null;
    };
    CoursePublishDialog.prototype.buildCourseTree = function () {
        var _this = this;
        if (this.syl) {
            course_unit_model_1.CourseUnit.listBySyllabus(this, this.syl.id).subscribe(function (units) {
                _this.units = units;
                _this.tree = _this.sylUtils.buildGroupTree(units);
            });
        }
    };
    CoursePublishDialog.prototype.hide = function () {
        this.clearSelection();
        this.display = false;
    };
    CoursePublishDialog.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            if (this.selectedUnit && this.selectedUnit.id == this.selectedNode.data.id) {
                this.clearSelection();
            }
            else
                this.selectedUnit = this.selectedNode.data;
        }
    };
    CoursePublishDialog.prototype.previewUnit = function () {
        if (this.selectedNode) {
            this.selectedNode.data.course_id = this.course.id;
            this.unitPreviewDialog.show(this.selectedNode.data);
        }
    };
    CoursePublishDialog.prototype.save = function () {
        var _this = this;
        var saveApiList = _.map(this.units, function (unit) {
            return unit.__api__update();
        });
        saveApiList.push(this.syl.__api__update());
        base_model_1.BaseModel.bulk_update.apply(base_model_1.BaseModel, [this].concat(saveApiList)).subscribe(function () {
            _this.hide();
        });
    };
    __decorate([
        core_1.ViewChild(course_unit_preview_dialog_component_1.CourseUnitPreviewDialog),
        __metadata("design:type", course_unit_preview_dialog_component_1.CourseUnitPreviewDialog)
    ], CoursePublishDialog.prototype, "unitPreviewDialog", void 0);
    CoursePublishDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-publish-dialog',
            templateUrl: 'course-publish.dialog.component.html',
            styleUrls: ['course-publish.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], CoursePublishDialog);
    return CoursePublishDialog;
}(base_component_1.BaseComponent));
exports.CoursePublishDialog = CoursePublishDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvY291cnNlL2NvdXJzZS1wdWJsaXNoL2NvdXJzZS1wdWJsaXNoLmRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW1FO0FBR25FLHlFQUF1RTtBQUd2RSxpRkFBK0U7QUFFL0UsOEVBQXVFO0FBQ3ZFLHdGQUFnRjtBQUNoRixnR0FBeUY7QUFFekYsOERBQXNHO0FBRXRHLDJIQUE2RztBQUU3Ryw4QkFBZ0M7QUFFaEMsZ0VBQThEO0FBUTlEO0lBQXlDLHVDQUFhO0lBaUJsRDtRQUFBLFlBQ0ksaUJBQU8sU0FVVjtRQTFCSixzQkFBZ0IsR0FBRyw0QkFBZ0IsQ0FBQztRQWlCN0IsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLDhCQUFhLEVBQUUsQ0FBQztRQUNwQyxLQUFJLENBQUMsR0FBRyxHQUFHLElBQUksc0NBQWMsRUFBRSxDQUFDO1FBQ2hDLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxxQkFBTSxFQUFFLENBQUM7UUFDM0IsS0FBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLDBCQUFjLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRztZQUN6RCxPQUFPO2dCQUNOLEtBQUssRUFBRSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztnQkFDekMsS0FBSyxFQUFFLEdBQUc7YUFDVixDQUFBO1FBQ0YsQ0FBQyxDQUFDLENBQUM7O0lBQ0QsQ0FBQztJQUVELGtDQUFJLEdBQUosVUFBSyxNQUFjO1FBQW5CLGlCQU9GO1FBTkEsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsc0NBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFHO1lBQzFELEtBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ2YsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELDRDQUFjLEdBQWQ7UUFDQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQsNkNBQWUsR0FBZjtRQUFBLGlCQU9DO1FBTkEsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2IsOEJBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztnQkFDMUQsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ25CLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsQ0FBQyxDQUFDLENBQUM7U0FDVDtJQUNGLENBQUM7SUFFRCxrQ0FBSSxHQUFKO1FBQ0MsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFHRCx3Q0FBVSxHQUFWLFVBQVcsS0FBUztRQUNuQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDM0UsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3RCOztnQkFFQSxJQUFJLENBQUMsWUFBWSxHQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1NBQzdDO0lBQ0YsQ0FBQztJQUVELHlDQUFXLEdBQVg7UUFDQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2xELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwRDtJQUNGLENBQUM7SUFFRCxrQ0FBSSxHQUFKO1FBQUEsaUJBUUM7UUFQQSxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBQyxJQUFlO1lBQ25ELE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDM0Msc0JBQVMsQ0FBQyxXQUFXLE9BQXJCLHNCQUFTLEdBQWEsSUFBSSxTQUFLLFdBQVcsR0FBRSxTQUFTLENBQUM7WUFDckQsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBckVtQztRQUFuQyxnQkFBUyxDQUFDLDhEQUF1QixDQUFDO2tDQUFvQiw4REFBdUI7a0VBQUM7SUFmbkUsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxXQUFXLEVBQUUsc0NBQXNDO1lBQ25ELFNBQVMsRUFBRSxDQUFDLHFDQUFxQyxDQUFDO1NBQ3JELENBQUM7O09BQ1csbUJBQW1CLENBdUYvQjtJQUFELDBCQUFDO0NBdkZELEFBdUZDLENBdkZ3Qyw4QkFBYSxHQXVGckQ7QUF2Rlksa0RBQW1CIiwiZmlsZSI6ImFwcC9jbXMvY291cnNlL2NvdXJzZS1wdWJsaXNoL2NvdXJzZS1wdWJsaXNoLmRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IFN5bGxhYnVzVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy9zeWxsYWJ1cy51dGlscyc7XG5pbXBvcnQgeyBXZWJTb2NrZXRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3NvY2tldC5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZVVuaXQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtdW5pdC5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VTeWxsYWJ1cyB9ICBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2Utc3lsbGFidXMubW9kZWwnO1xuaW1wb3J0IHsgVHJlZU5vZGUsIE1lbnVJdGVtLCBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQ09VUlNFX1VOSVRfVFlQRSwgQ09VUlNFX1VOSVRfSUNPTiwgQ09OVEVOVF9TVEFUVVMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBDb3Vyc2VVbml0RGlhbG9nIH0gZnJvbSAnLi4vY291cnNlLXVuaXQtZGlhbG9nL2NvdXJzZS11bml0LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlVW5pdFByZXZpZXdEaWFsb2cgfSBmcm9tICcuLi9jb3Vyc2UtdW5pdC1wcmV2aWV3LWRpYWxvZy9jb3Vyc2UtdW5pdC1wcmV2aWV3LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlU2V0dGluZ0RpYWxvZyB9IGZyb20gJy4uL2NvdXJzZS1zZXR0aW5nL2NvdXJzZS1zZXR0aW5nLmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IENvdXJzZU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2NvdXJzZS1wdWJsaXNoLWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICdjb3Vyc2UtcHVibGlzaC5kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydjb3Vyc2UtcHVibGlzaC5kaWFsb2cuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBDb3Vyc2VQdWJsaXNoRGlhbG9nIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cblx0Q09VUlNFX1VOSVRfVFlQRSA9IENPVVJTRV9VTklUX1RZUEU7XG5cblx0cHJpdmF0ZSBkaXNwbGF5OiBib29sZWFuO1xuXHRwcml2YXRlIHRyZWU6IFRyZWVOb2RlW107XG5cdHByaXZhdGUgc3lsOiBDb3Vyc2VTeWxsYWJ1cztcblx0cHJpdmF0ZSBzZWxlY3RlZE5vZGU6IFRyZWVOb2RlO1xuXHRwcml2YXRlIGl0ZW1zOiBNZW51SXRlbVtdO1xuXHRwcml2YXRlIHVuaXRzOiBDb3Vyc2VVbml0W107XG5cdHByaXZhdGUgc2VsZWN0ZWRVbml0OkNvdXJzZVVuaXQ7XG5cdHByaXZhdGUgc3lsVXRpbHMgOiBTeWxsYWJ1c1V0aWxzO1xuXHRwcml2YXRlIGNvdXJzZTogQ291cnNlO1xuXHRwcml2YXRlIGNvbnRlbnRTdGF0dXM6IFNlbGVjdEl0ZW1bXTtcblxuXHRAVmlld0NoaWxkKENvdXJzZVVuaXRQcmV2aWV3RGlhbG9nKSB1bml0UHJldmlld0RpYWxvZzogQ291cnNlVW5pdFByZXZpZXdEaWFsb2c7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zeWxVdGlscyA9IG5ldyBTeWxsYWJ1c1V0aWxzKCk7XG4gICAgICAgIHRoaXMuc3lsID0gbmV3IENvdXJzZVN5bGxhYnVzKCk7XG4gICAgICAgIHRoaXMuY291cnNlID0gbmV3IENvdXJzZSgpO1xuICAgICAgICB0aGlzLmNvbnRlbnRTdGF0dXMgPSBfLm1hcChDT05URU5UX1NUQVRVUywgKHZhbCwga2V5KT0+IHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGxhYmVsOiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCh2YWwpLFxuXHRcdFx0XHR2YWx1ZToga2V5XG5cdFx0XHR9XG5cdFx0fSk7XG4gICAgfVxuXG4gICAgc2hvdyhjb3Vyc2U6IENvdXJzZSkge1xuXHRcdHRoaXMuZGlzcGxheSA9IHRydWU7XG5cdFx0dGhpcy5jb3Vyc2UgPSBjb3Vyc2U7XG5cdFx0Q291cnNlU3lsbGFidXMuZ2V0KHRoaXMsIGNvdXJzZS5zeWxsYWJ1c19pZCkuc3Vic2NyaWJlKChzeWwpPT4ge1xuXHRcdFx0dGhpcy5zeWwgPSBzeWw7XG5cdFx0XHR0aGlzLmJ1aWxkQ291cnNlVHJlZSgpO1xuXHRcdH0pO1xuXHR9XG5cblx0Y2xlYXJTZWxlY3Rpb24oKSB7XG5cdFx0dGhpcy5zZWxlY3RlZE5vZGUgPSBudWxsO1xuXHRcdHRoaXMuc2VsZWN0ZWRVbml0ID0gbnVsbDtcblx0fVxuXG5cdGJ1aWxkQ291cnNlVHJlZSgpIHtcblx0XHRpZiAodGhpcy5zeWwpIHtcblx0XHRcdENvdXJzZVVuaXQubGlzdEJ5U3lsbGFidXModGhpcyx0aGlzLnN5bC5pZCkuc3Vic2NyaWJlKHVuaXRzID0+IHtcblx0XHRcdFx0dGhpcy51bml0cyA9IHVuaXRzO1xuXHRcdFx0XHR0aGlzLnRyZWUgPSB0aGlzLnN5bFV0aWxzLmJ1aWxkR3JvdXBUcmVlKHVuaXRzKTtcblx0ICAgICAgICB9KTtcblx0XHR9XG5cdH1cblxuXHRoaWRlKCkge1xuXHRcdHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcblx0XHR0aGlzLmRpc3BsYXkgPSBmYWxzZTtcblx0fVxuXG5cdFxuXHRub2RlU2VsZWN0KGV2ZW50OmFueSkge1xuXHRcdGlmICh0aGlzLnNlbGVjdGVkTm9kZSkge1xuXHRcdFx0aWYgKHRoaXMuc2VsZWN0ZWRVbml0ICYmIHRoaXMuc2VsZWN0ZWRVbml0LmlkID09IHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEuaWQpIHtcblx0XHRcdFx0dGhpcy5jbGVhclNlbGVjdGlvbigpO1xuXHRcdFx0fSBcblx0XHRcdGVsc2Vcblx0XHRcdFx0dGhpcy5zZWxlY3RlZFVuaXQgPSAgdGhpcy5zZWxlY3RlZE5vZGUuZGF0YTtcblx0XHR9XG5cdH1cblxuXHRwcmV2aWV3VW5pdCgpIHtcblx0XHRpZiAodGhpcy5zZWxlY3RlZE5vZGUpIHtcblx0XHRcdHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEuY291cnNlX2lkID0gdGhpcy5jb3Vyc2UuaWQ7XG5cdFx0XHR0aGlzLnVuaXRQcmV2aWV3RGlhbG9nLnNob3codGhpcy5zZWxlY3RlZE5vZGUuZGF0YSk7XG5cdFx0fVxuXHR9XG5cblx0c2F2ZSgpIHtcblx0XHR2YXIgc2F2ZUFwaUxpc3QgPSBfLm1hcCh0aGlzLnVuaXRzLCAodW5pdDpDb3Vyc2VVbml0KT0+IHtcblx0XHRcdHJldHVybiB1bml0Ll9fYXBpX191cGRhdGUoKTtcblx0XHR9KTtcblx0XHRzYXZlQXBpTGlzdC5wdXNoKHRoaXMuc3lsLl9fYXBpX191cGRhdGUoKSk7XG5cdFx0QmFzZU1vZGVsLmJ1bGtfdXBkYXRlKHRoaXMsIC4uLnNhdmVBcGlMaXN0KS5zdWJzY3JpYmUoKCk9PiB7XG5cdFx0XHR0aGlzLmhpZGUoKTtcblx0XHR9KTtcblx0fVxuXG5cbn1cblxuIl19

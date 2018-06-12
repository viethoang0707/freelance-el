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
        this.coursesDialog.onSelectCourses.subscribe(function (courses) {
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
//# sourceMappingURL=course-setting.dialog.component.js.map
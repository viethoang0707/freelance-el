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
var base_component_1 = require("../../../../shared/components/base/base.component");
var course_model_1 = require("../../../../shared/models/elearning/course.model");
var constants_1 = require("../../../../shared/models/constants");
var report_decorator_1 = require("../../report.decorator");
var select_group_dialog_component_1 = require("../../../../shared/components/select-group-dialog/select-group-dialog.component");
var select_course_dialog_component_1 = require("../../../../shared/components/select-course-dialog/select-course-dialog.component");
var member_by_course_report_component_1 = require("./member-by-course-report.component");
var MemberByCourseReportContainerComponent = (function (_super) {
    __extends(MemberByCourseReportContainerComponent, _super);
    function MemberByCourseReportContainerComponent() {
        var _this = _super.call(this) || this;
        _this.GROUP_CATEGORY = constants_1.GROUP_CATEGORY;
        return _this;
    }
    MemberByCourseReportContainerComponent.prototype.export = function () {
        this.memberReport.export();
    };
    MemberByCourseReportContainerComponent.prototype.selectCourseGroup = function () {
        var _this = this;
        this.groupDialog.show();
        this.groupDialog.onSelectGroup.subscribe(function (group) {
            course_model_1.Course.listByGroup(_this, group.id).subscribe(function (courses) {
                _this.memberReport.render(courses);
            });
        });
    };
    MemberByCourseReportContainerComponent.prototype.selectIndividualCourses = function () {
        var _this = this;
        this.courseDialog.show();
        this.courseDialog.onSelectCourses.subscribe(function (courses) {
            _this.memberReport.render(courses);
        });
    };
    __decorate([
        core_1.ViewChild(select_group_dialog_component_1.SelectGroupDialog),
        __metadata("design:type", select_group_dialog_component_1.SelectGroupDialog)
    ], MemberByCourseReportContainerComponent.prototype, "groupDialog", void 0);
    __decorate([
        core_1.ViewChild(select_course_dialog_component_1.SelectCoursesDialog),
        __metadata("design:type", select_course_dialog_component_1.SelectCoursesDialog)
    ], MemberByCourseReportContainerComponent.prototype, "courseDialog", void 0);
    __decorate([
        core_1.ViewChild(member_by_course_report_component_1.MemberByCourseReportComponent),
        __metadata("design:type", member_by_course_report_component_1.MemberByCourseReportComponent)
    ], MemberByCourseReportContainerComponent.prototype, "memberReport", void 0);
    MemberByCourseReportContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'member-by-course-report-container',
            templateUrl: 'member-by-course-report-container.component.html',
        }),
        report_decorator_1.Report({
            title: 'Member by course report',
            category: constants_1.REPORT_CATEGORY.COURSE
        }),
        __metadata("design:paramtypes", [])
    ], MemberByCourseReportContainerComponent);
    return MemberByCourseReportContainerComponent;
}(base_component_1.BaseComponent));
exports.MemberByCourseReportContainerComponent = MemberByCourseReportContainerComponent;
//# sourceMappingURL=member-by-course-report-container.component.js.map
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
var class_list_dialog_component_1 = require("../../class/class-list/class-list-dialog.component");
var enrollment_dialog_component_1 = require("../../class/enrollment-dialog/enrollment-dialog.component");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var CourseListComponent = (function (_super) {
    __extends(CourseListComponent, _super);
    function CourseListComponent() {
        var _this = _super.call(this) || this;
        _this.COURSE_MODE = constants_1.COURSE_MODE;
        _this.CONTENT_STATUS = constants_1.CONTENT_STATUS;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    CourseListComponent.prototype.ngOnInit = function () {
        this.buildCoursTree();
        this.loadCourses();
    };
    CourseListComponent.prototype.buildCoursTree = function () {
        var _this = this;
        group_model_1.Group.listCourseGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
        });
    };
    CourseListComponent.prototype.addCourse = function () {
        var _this = this;
        var course = new course_model_1.Course();
        this.courseDialog.show(course);
        this.courseDialog.onCreateComplete.subscribe(function () {
            var duplicateCates = _.filter(_this.courses, function (obj) {
                return course.code == obj.code;
            });
            if (duplicateCates.length >= 2)
                _this.warn(_this.translateService.instant('There is another course with same code in database'));
            _this.loadCourses();
        });
    };
    CourseListComponent.prototype.editCourse = function () {
        var _this = this;
        if (this.selectedCourse)
            this.courseDialog.show(this.selectedCourse);
        this.courseDialog.onUpdateComplete.subscribe(function () {
            var duplicateCates = _.filter(_this.courses, function (obj) {
                return _this.selectedCourse.code == obj.code;
            });
            if (duplicateCates.length >= 2)
                _this.warn(_this.translateService.instant('There is another course with same code in database'));
        });
    };
    CourseListComponent.prototype.enrollCourse = function () {
        if (this.selectedCourse) {
            if (this.selectedCourse.status != 'published') {
                this.error(this.translateService.instant('You have to publish the course first'));
                return;
            }
            if (this.selectedCourse.mode == 'self-study')
                this.courseEnrollDialog.enrollCourse(this.selectedCourse);
            else if (this.selectedCourse.mode == 'group')
                this.classListDialog.show(this.selectedCourse);
        }
    };
    CourseListComponent.prototype.loadCourses = function () {
        var _this = this;
        course_model_1.Course.all(this).subscribe(function (courses) {
            _this.courses = courses;
            _this.displayCourses = courses;
            _this.displayCourses.sort(function (course1, course2) {
                if (course1.id > course2.id)
                    return -1;
                else if (course1.id < course2.id)
                    return 1;
                else
                    return 0;
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
    __decorate([
        core_1.ViewChild(enrollment_dialog_component_1.CourseEnrollDialog),
        __metadata("design:type", enrollment_dialog_component_1.CourseEnrollDialog)
    ], CourseListComponent.prototype, "courseEnrollDialog", void 0);
    __decorate([
        core_1.ViewChild(class_list_dialog_component_1.ClassListDialog),
        __metadata("design:type", class_list_dialog_component_1.ClassListDialog)
    ], CourseListComponent.prototype, "classListDialog", void 0);
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
//# sourceMappingURL=course-list.component.js.map
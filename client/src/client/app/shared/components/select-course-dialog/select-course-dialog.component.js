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
var Rx_1 = require("rxjs/Rx");
var group_model_1 = require("../../models/elearning/group.model");
var base_component_1 = require("../base/base.component");
var course_model_1 = require("../../../shared/models/elearning/course.model");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var SelectCoursesDialog = (function (_super) {
    __extends(SelectCoursesDialog, _super);
    function SelectCoursesDialog() {
        var _this = _super.call(this) || this;
        _this.onSelectCoursesReceiver = new Rx_1.Subject();
        _this.onSelectCourses = _this.onSelectCoursesReceiver.asObservable();
        _this.display = false;
        _this.selectedCourses = [];
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    SelectCoursesDialog.prototype.hide = function () {
        this.display = false;
    };
    SelectCoursesDialog.prototype.nodeSelect = function (event) {
        var _this = this;
        if (this.selectedNode) {
            course_model_1.Course.listByGroup(this, this.selectedNode.data.id).subscribe(function (courses) {
                _this.courses = courses;
            });
        }
    };
    SelectCoursesDialog.prototype.show = function () {
        var _this = this;
        this.display = true;
        this.selectedCourses = [];
        group_model_1.Group.listCourseGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
        });
    };
    SelectCoursesDialog.prototype.selectCourse = function () {
        this.onSelectCoursesReceiver.next(this.selectedCourses);
        this.selectedCourses = [];
        this.hide();
    };
    SelectCoursesDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'select-course-dialog',
            templateUrl: 'select-course-dialog.component.html',
            styleUrls: ['select-course-dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], SelectCoursesDialog);
    return SelectCoursesDialog;
}(base_component_1.BaseComponent));
exports.SelectCoursesDialog = SelectCoursesDialog;
//# sourceMappingURL=select-course-dialog.component.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var auth_module_1 = require("../auth/auth.module");
var shared_module_1 = require("../shared/shared.module");
var course_component_1 = require("./course.component");
var course_pipe_1 = require("./course.pipe");
var class_pipe_1 = require("./class.pipe");
var class_list_dialog_component_1 = require("./enrollment/class-list/class-list-dialog.component");
var class_dialog_component_1 = require("./enrollment/class-dialog/class-dialog.component");
var course_list_component_1 = require("./course/course-list/course-list.component");
var course_dialog_component_1 = require("./course/course-dialog/course-dialog.component");
var enrollment_dialog_component_1 = require("./enrollment/enrollment-dialog/enrollment-dialog.component");
var course_list_component_2 = require("./enrollment/course-list/course-list.component");
var course_routing_1 = require("./course-routing");
var CourseModule = (function () {
    function CourseModule() {
    }
    CourseModule = __decorate([
        core_1.NgModule({
            imports: [course_routing_1.CourseRoutingModule, shared_module_1.ErpSharedModule, auth_module_1.AuthModule],
            declarations: [course_component_1.CourseComponent, class_dialog_component_1.CourseClassDialog, class_list_dialog_component_1.ClassListDialog, course_pipe_1.ByCoursePipe, class_pipe_1.ByClassPipe,
                course_list_component_1.CourseListComponent, course_dialog_component_1.CourseDialog, enrollment_dialog_component_1.CourseEnrollDialog, course_list_component_2.CourseEnrollmentListComponent],
            exports: [course_dialog_component_1.CourseDialog, class_dialog_component_1.CourseClassDialog],
            providers: []
        })
    ], CourseModule);
    return CourseModule;
}());
exports.CourseModule = CourseModule;

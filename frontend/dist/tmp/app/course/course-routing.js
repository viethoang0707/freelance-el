"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var course_component_1 = require("./course.component");
var course_list_component_1 = require("./course/course-list/course-list.component");
var group_list_component_1 = require("../shared/components/group-list/group-list.component");
var admin_guard_1 = require("../shared/guards/admin.guard");
var course_list_component_2 = require("./enrollment/course-list/course-list.component");
var router_1 = require("@angular/router");
exports.CourseRoutes = [
    {
        path: 'course',
        component: course_component_1.CourseComponent,
        data: {
            breadcrumb: 'Syllabus'
        },
        canActivate: [admin_guard_1.AdminGuard],
        children: [
            {
                path: "courses",
                component: course_list_component_1.CourseListComponent,
                data: {
                    breadcrumb: 'Courses'
                }
            },
            {
                path: "enrollment",
                component: course_list_component_2.CourseEnrollmentListComponent,
                data: {
                    breadcrumb: 'Enrollment'
                }
            },
            {
                path: "groups",
                component: group_list_component_1.GroupListComponent,
                data: {
                    breadcrumb: 'Groups',
                    category: 'course'
                },
            }
        ]
    }
];
var CourseRoutingModule = (function () {
    function CourseRoutingModule() {
    }
    CourseRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(exports.CourseRoutes)],
            exports: [router_1.RouterModule]
        })
    ], CourseRoutingModule);
    return CourseRoutingModule;
}());
exports.CourseRoutingModule = CourseRoutingModule;

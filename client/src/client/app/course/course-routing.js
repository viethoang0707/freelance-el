"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var course_component_1 = require("./course.component");
var course_list_component_1 = require("./course/course-list/course-list.component");
var group_list_component_1 = require("../shared/components/group-list/group-list.component");
var admin_guard_1 = require("../shared/guards/admin.guard");
exports.CourseRoutes = [
    {
        path: "course",
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
//# sourceMappingURL=course-routing.js.map
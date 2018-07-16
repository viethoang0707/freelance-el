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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb3Vyc2UvY291cnNlLXJvdXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBeUM7QUFFekMsdURBQXFEO0FBQ3JELG9GQUFpRjtBQUNqRiw2RkFBMEY7QUFDMUYsNERBQTBEO0FBQzFELHdGQUErRjtBQUMvRiwwQ0FBK0M7QUFFbEMsUUFBQSxZQUFZLEdBQVc7SUFDaEM7UUFDRyxJQUFJLEVBQUUsUUFBUTtRQUNkLFNBQVMsRUFBRSxrQ0FBZTtRQUMxQixJQUFJLEVBQUU7WUFDUCxVQUFVLEVBQUUsVUFBVTtTQUN2QjtRQUNELFdBQVcsRUFBRSxDQUFDLHdCQUFVLENBQUM7UUFDdEIsUUFBUSxFQUNSO1lBQ0s7Z0JBQ0csSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsU0FBUyxFQUFFLDJDQUFtQjtnQkFDOUIsSUFBSSxFQUFFO29CQUNILFVBQVUsRUFBRSxTQUFTO2lCQUN0QjthQUNKO1lBQ0Q7Z0JBQ0csSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLFNBQVMsRUFBRSxxREFBNkI7Z0JBQ3hDLElBQUksRUFBRTtvQkFDSCxVQUFVLEVBQUUsWUFBWTtpQkFDekI7YUFDSjtZQUNEO2dCQUNHLElBQUksRUFBRSxRQUFRO2dCQUNkLFNBQVMsRUFBRSx5Q0FBa0I7Z0JBQzdCLElBQUksRUFBRTtvQkFDTCxVQUFVLEVBQUUsUUFBUTtvQkFDcEIsUUFBUSxFQUFDLFFBQVE7aUJBQ2xCO2FBQ0Y7U0FHTDtLQUNIO0NBRUosQ0FBQTtBQU1EO0lBQUE7SUFBa0MsQ0FBQztJQUF0QixtQkFBbUI7UUFKL0IsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQyxRQUFRLENBQUMsb0JBQVksQ0FBQyxDQUFDO1lBQzlDLE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUM7U0FDeEIsQ0FBQztPQUNXLG1CQUFtQixDQUFHO0lBQUQsMEJBQUM7Q0FBbkMsQUFBbUMsSUFBQTtBQUF0QixrREFBbUIiLCJmaWxlIjoiYXBwL2NvdXJzZS9jb3Vyc2Utcm91dGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0ICB7IENvdXJzZUNvbXBvbmVudCB9IGZyb20gJy4vY291cnNlLmNvbXBvbmVudCdcbmltcG9ydCB7IENvdXJzZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvdXJzZS9jb3Vyc2UtbGlzdC9jb3Vyc2UtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgR3JvdXBMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvZ3JvdXAtbGlzdC9ncm91cC1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBZG1pbkd1YXJkIH0gZnJvbSAnLi4vc2hhcmVkL2d1YXJkcy9hZG1pbi5ndWFyZCc7XG5pbXBvcnQgeyBDb3Vyc2VFbnJvbGxtZW50TGlzdENvbXBvbmVudCB9IGZyb20gJy4vZW5yb2xsbWVudC9jb3Vyc2UtbGlzdC9jb3Vyc2UtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuZXhwb3J0IGNvbnN0IENvdXJzZVJvdXRlczogUm91dGVzID0gW1xuICAgIHtcbiAgICAgICBwYXRoOiAnY291cnNlJyxcbiAgICAgICBjb21wb25lbnQ6IENvdXJzZUNvbXBvbmVudCxcbiAgICAgICBkYXRhOiB7XG4gICAgICBicmVhZGNydW1iOiAnU3lsbGFidXMnXG4gICAgfSxcbiAgICBjYW5BY3RpdmF0ZTogW0FkbWluR3VhcmRdLFxuICAgICAgIGNoaWxkcmVuOlxuICAgICAgIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIHBhdGg6IFwiY291cnNlc1wiLFxuICAgICAgICAgICAgICAgY29tcG9uZW50OiBDb3Vyc2VMaXN0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgYnJlYWRjcnVtYjogJ0NvdXJzZXMnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIHBhdGg6IFwiZW5yb2xsbWVudFwiLFxuICAgICAgICAgICAgICAgY29tcG9uZW50OiBDb3Vyc2VFbnJvbGxtZW50TGlzdENvbXBvbmVudCxcbiAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgIGJyZWFkY3J1bWI6ICdFbnJvbGxtZW50J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICBwYXRoOiBcImdyb3Vwc1wiLFxuICAgICAgICAgICAgICAgY29tcG9uZW50OiBHcm91cExpc3RDb21wb25lbnQsXG4gICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgYnJlYWRjcnVtYjogJ0dyb3VwcycsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6J2NvdXJzZSdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgXVxuICAgIH1cblxuXVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbUm91dGVyTW9kdWxlLmZvckNoaWxkKENvdXJzZVJvdXRlcyldLFxuICBleHBvcnRzOiBbUm91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBDb3Vyc2VSb3V0aW5nTW9kdWxlIHt9Il19

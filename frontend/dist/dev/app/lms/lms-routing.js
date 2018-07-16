"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var lms_component_1 = require("./lms.component");
var exam_list_component_1 = require("./exam/exam-list/exam-list.component");
var course_list_component_1 = require("./course/course-list/course-list.component");
var conference_list_component_1 = require("./conference/conference-list/conference-list.component");
var course_manage_component_1 = require("./course/course-manage/course-manage.component");
var course_study_component_1 = require("./course/course-study/course-study.component");
var exam_manage_component_1 = require("./exam/exam-manage/exam-manage.component");
var course_search_component_1 = require("./course/course-search/course-search.component");
var survey_list_component_1 = require("./survey/survey-list/survey-list.component");
var course_recommend_component_1 = require("./course/course-recommend/course-recommend.component");
var course_view_component_1 = require("./course/course-view/course-view.component");
var course_edit_component_1 = require("./course/course-edit/course-edit.component");
var class_manage_component_1 = require("./class/class-manage/class-manage.component");
var course_guard_1 = require("../shared/guards/course.guard");
var exam_guard_1 = require("../shared/guards/exam.guard");
var syllabus_guard_1 = require("../shared/guards/syllabus.guard");
var router_1 = require("@angular/router");
exports.LMSRoutes = [
    {
        path: 'lms',
        component: lms_component_1.LMSComponent,
        data: {
            breadcrumb: 'LMS'
        },
        children: [
            {
                path: "exams",
                component: exam_list_component_1.ExamListComponent,
                data: {
                    breadcrumb: 'My exams'
                }
            },
            {
                path: "exams/manage/:examId/:memberId",
                component: exam_manage_component_1.ExamManageComponent,
                data: {
                    breadcrumb: 'Manage exam'
                },
                canActivate: [exam_guard_1.ExamGuard]
            },
            {
                path: "courses",
                component: course_list_component_1.CourseListComponent,
                data: {
                    breadcrumb: 'My courses'
                }
            },
            {
                path: "courses/search",
                component: course_search_component_1.CourseSearchComponent,
                data: {
                    breadcrumb: 'Search courses'
                }
            },
            {
                path: "courses/recommend",
                component: course_recommend_component_1.CourseRecommendComponent,
                data: {
                    breadcrumb: 'Search courses'
                }
            },
            {
                path: "courses/edit/:courseId/:memberId",
                component: course_edit_component_1.CourseEditComponent,
                data: {
                    breadcrumb: 'Edit course'
                },
                canActivate: [syllabus_guard_1.SyllabusGuard]
            },
            {
                path: "courses/manage/:courseId/:memberId",
                component: course_manage_component_1.CourseManageComponent,
                data: {
                    breadcrumb: 'Manage course'
                },
                canActivate: [course_guard_1.CourseGuard]
            },
            {
                path: "courses/manage/class/:courseId/:classId/:memberId",
                component: class_manage_component_1.ClassManageComponent,
                data: {
                    breadcrumb: 'Manage class student'
                },
                canActivate: [course_guard_1.CourseGuard]
            },
            {
                path: "courses/view/:courseId",
                component: course_view_component_1.CourseViewComponent,
                data: {
                    breadcrumb: 'View course'
                }
            },
            {
                path: "courses/study/:courseId/:memberId",
                component: course_study_component_1.CourseStudyComponent,
                data: {
                    breadcrumb: 'Study course'
                },
            },
            {
                path: "meetings",
                component: conference_list_component_1.ConferenceListComponent,
                data: {
                    breadcrumb: 'My conferences'
                }
            },
            {
                path: "surveys",
                component: survey_list_component_1.SurveyListComponent,
                data: {
                    breadcrumb: 'My surveys'
                }
            }
        ]
    }
];
var LMSRoutingModule = (function () {
    function LMSRoutingModule() {
    }
    LMSRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(exports.LMSRoutes)],
            exports: [router_1.RouterModule]
        })
    ], LMSRoutingModule);
    return LMSRoutingModule;
}());
exports.LMSRoutingModule = LMSRoutingModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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SDtDQUVKLENBQUE7QUFNRDtJQUFBO0lBQStCLENBQUM7SUFBbkIsZ0JBQWdCO1FBSjVCLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUMsUUFBUSxDQUFDLGlCQUFTLENBQUMsQ0FBQztZQUMzQyxPQUFPLEVBQUUsQ0FBQyxxQkFBWSxDQUFDO1NBQ3hCLENBQUM7T0FDVyxnQkFBZ0IsQ0FBRztJQUFELHVCQUFDO0NBQWhDLEFBQWdDLElBQUE7QUFBbkIsNENBQWdCIiwiZmlsZSI6ImFwcC9sbXMvbG1zLXJvdXRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IExNU0NvbXBvbmVudCB9IGZyb20gJy4vbG1zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFeGFtTGlzdENvbXBvbmVudH0gZnJvbSAnLi9leGFtL2V4YW0tbGlzdC9leGFtLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IENvdXJzZUxpc3RDb21wb25lbnR9IGZyb20gJy4vY291cnNlL2NvdXJzZS1saXN0L2NvdXJzZS1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25mZXJlbmNlTGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29uZmVyZW5jZS9jb25mZXJlbmNlLWxpc3QvY29uZmVyZW5jZS1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb3Vyc2VNYW5hZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvdXJzZS9jb3Vyc2UtbWFuYWdlL2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IENvdXJzZVN0dWR5Q29tcG9uZW50IH0gZnJvbSAnLi9jb3Vyc2UvY291cnNlLXN0dWR5L2NvdXJzZS1zdHVkeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXhhbU1hbmFnZUNvbXBvbmVudCB9IGZyb20gJy4vZXhhbS9leGFtLW1hbmFnZS9leGFtLW1hbmFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlU2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnLi9jb3Vyc2UvY291cnNlLXNlYXJjaC9jb3Vyc2Utc2VhcmNoLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdXJ2ZXlMaXN0Q29tcG9uZW50fSBmcm9tICcuL3N1cnZleS9zdXJ2ZXktbGlzdC9zdXJ2ZXktbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlUmVjb21tZW5kQ29tcG9uZW50IH0gZnJvbSAnLi9jb3Vyc2UvY291cnNlLXJlY29tbWVuZC9jb3Vyc2UtcmVjb21tZW5kLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb3Vyc2VWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jb3Vyc2UvY291cnNlLXZpZXcvY291cnNlLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IENvdXJzZUVkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvdXJzZS9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2xhc3NNYW5hZ2VDb21wb25lbnQgfSBmcm9tICcuL2NsYXNzL2NsYXNzLW1hbmFnZS9jbGFzcy1tYW5hZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IENvdXJzZUd1YXJkIH0gZnJvbSAnLi4vc2hhcmVkL2d1YXJkcy9jb3Vyc2UuZ3VhcmQnO1xuaW1wb3J0IHsgRXhhbUd1YXJkIH0gZnJvbSAnLi4vc2hhcmVkL2d1YXJkcy9leGFtLmd1YXJkJztcbmltcG9ydCB7IFN5bGxhYnVzR3VhcmQgfSBmcm9tICcuLi9zaGFyZWQvZ3VhcmRzL3N5bGxhYnVzLmd1YXJkJztcbmltcG9ydCB7IFN1cnZleUd1YXJkIH0gZnJvbSAnLi4vc2hhcmVkL2d1YXJkcy9zdXJ2ZXkuZ3VhcmQnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuZXhwb3J0IGNvbnN0IExNU1JvdXRlczogUm91dGVzID0gW1xuICAgIHtcbiAgICAgICBwYXRoOiAnbG1zJyxcbiAgICAgICBjb21wb25lbnQ6IExNU0NvbXBvbmVudCxcbiAgICAgICBkYXRhOiB7XG4gICAgICAgICBicmVhZGNydW1iOidMTVMnXG4gICAgICAgfSxcbiAgICAgICBjaGlsZHJlbjpcbiAgICAgICBbXG4gICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIHBhdGg6IFwiZXhhbXNcIixcbiAgICAgICAgICAgICAgIGNvbXBvbmVudDogRXhhbUxpc3RDb21wb25lbnQsXG4gICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgIGJyZWFkY3J1bWI6J015IGV4YW1zJ1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIHBhdGg6IFwiZXhhbXMvbWFuYWdlLzpleGFtSWQvOm1lbWJlcklkXCIsXG4gICAgICAgICAgICAgICBjb21wb25lbnQ6IEV4YW1NYW5hZ2VDb21wb25lbnQsXG4gICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgIGJyZWFkY3J1bWI6J01hbmFnZSBleGFtJ1xuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIGNhbkFjdGl2YXRlOltFeGFtR3VhcmRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgcGF0aDogXCJjb3Vyc2VzXCIsXG4gICAgICAgICAgICAgICBjb21wb25lbnQ6IENvdXJzZUxpc3RDb21wb25lbnQsXG4gICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgIGJyZWFkY3J1bWI6J015IGNvdXJzZXMnXG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgcGF0aDogXCJjb3Vyc2VzL3NlYXJjaFwiLFxuICAgICAgICAgICAgICAgY29tcG9uZW50OiBDb3Vyc2VTZWFyY2hDb21wb25lbnQsXG4gICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgIGJyZWFkY3J1bWI6J1NlYXJjaCBjb3Vyc2VzJ1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIHBhdGg6IFwiY291cnNlcy9yZWNvbW1lbmRcIixcbiAgICAgICAgICAgICAgIGNvbXBvbmVudDogQ291cnNlUmVjb21tZW5kQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICBicmVhZGNydW1iOidTZWFyY2ggY291cnNlcydcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICBwYXRoOiBcImNvdXJzZXMvZWRpdC86Y291cnNlSWQvOm1lbWJlcklkXCIsXG4gICAgICAgICAgICAgICBjb21wb25lbnQ6IENvdXJzZUVkaXRDb21wb25lbnQsXG4gICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgIGJyZWFkY3J1bWI6J0VkaXQgY291cnNlJ1xuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIGNhbkFjdGl2YXRlOltTeWxsYWJ1c0d1YXJkXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIHBhdGg6IFwiY291cnNlcy9tYW5hZ2UvOmNvdXJzZUlkLzptZW1iZXJJZFwiLFxuICAgICAgICAgICAgICAgY29tcG9uZW50OiBDb3Vyc2VNYW5hZ2VDb21wb25lbnQsXG4gICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgIGJyZWFkY3J1bWI6J01hbmFnZSBjb3Vyc2UnXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgY2FuQWN0aXZhdGU6W0NvdXJzZUd1YXJkXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIHBhdGg6IFwiY291cnNlcy9tYW5hZ2UvY2xhc3MvOmNvdXJzZUlkLzpjbGFzc0lkLzptZW1iZXJJZFwiLFxuICAgICAgICAgICAgICAgY29tcG9uZW50OiBDbGFzc01hbmFnZUNvbXBvbmVudCxcbiAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgYnJlYWRjcnVtYjonTWFuYWdlIGNsYXNzIHN0dWRlbnQnXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgY2FuQWN0aXZhdGU6W0NvdXJzZUd1YXJkXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIHBhdGg6IFwiY291cnNlcy92aWV3Lzpjb3Vyc2VJZFwiLFxuICAgICAgICAgICAgICAgY29tcG9uZW50OiBDb3Vyc2VWaWV3Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICBicmVhZGNydW1iOidWaWV3IGNvdXJzZSdcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICBwYXRoOiBcImNvdXJzZXMvc3R1ZHkvOmNvdXJzZUlkLzptZW1iZXJJZFwiLFxuICAgICAgICAgICAgICAgY29tcG9uZW50OiBDb3Vyc2VTdHVkeUNvbXBvbmVudCxcbiAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgYnJlYWRjcnVtYjonU3R1ZHkgY291cnNlJ1xuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICBwYXRoOiBcIm1lZXRpbmdzXCIsXG4gICAgICAgICAgICAgICBjb21wb25lbnQ6IENvbmZlcmVuY2VMaXN0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICBicmVhZGNydW1iOidNeSBjb25mZXJlbmNlcydcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICBwYXRoOiBcInN1cnZleXNcIixcbiAgICAgICAgICAgICAgIGNvbXBvbmVudDogU3VydmV5TGlzdENvbXBvbmVudCxcbiAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgYnJlYWRjcnVtYjonTXkgc3VydmV5cydcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICBdXG4gICAgfVxuXG5dXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoTE1TUm91dGVzKV0sXG4gIGV4cG9ydHM6IFtSb3V0ZXJNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIExNU1JvdXRpbmdNb2R1bGUge30iXX0=

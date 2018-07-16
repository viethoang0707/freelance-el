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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lms_component_1 = require("./lms.component");
var exam_list_component_1 = require("./exam/exam-list/exam-list.component");
var course_list_component_1 = require("./course/course-list/course-list.component");
var conference_list_component_1 = require("./conference/conference-list/conference-list.component");
var course_manage_component_1 = require("./course/course-manage/course-manage.component");
var course_study_component_1 = require("./course/course-study/course-study.component");
var exam_manage_component_1 = require("./exam/exam-manage/exam-manage.component");
var student_guard_1 = require("../shared/guards/student.guard");
var teacher_guard_1 = require("../shared/guards/teacher.guard");
var supervisor_guard_1 = require("../shared/guards/supervisor.guard");
exports.LMSRoutes = [
    {
        path: "lms",
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
                canActivate: [supervisor_guard_1.SupervisorGuard]
            },
            {
                path: "courses",
                component: course_list_component_1.CourseListComponent,
                data: {
                    breadcrumb: 'My courses'
                }
            },
            {
                path: "courses/manage/:courseId",
                component: course_manage_component_1.CourseManageComponent,
                data: {
                    breadcrumb: 'Manage course'
                },
                canActivate: [teacher_guard_1.TeacherGuard]
            },
            {
                path: "courses/study/:courseId/:memberId",
                component: course_study_component_1.CourseStudyComponent,
                data: {
                    breadcrumb: 'Study course'
                },
                canActivate: [student_guard_1.StudentGuard]
            },
            {
                path: "meetings",
                component: conference_list_component_1.ConferenceListComponent,
                data: {
                    breadcrumb: 'My conferences'
                }
            },
        ]
    }
];
//# sourceMappingURL=lms-routing.js.map
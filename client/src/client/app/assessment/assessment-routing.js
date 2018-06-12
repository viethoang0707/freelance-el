"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assessment_component_1 = require("./assessment.component");
var exam_list_component_1 = require("./exam/exam-list/exam-list.component");
var question_list_component_1 = require("./question/question-list/question-list.component");
var admin_guard_1 = require("../shared/guards/admin.guard");
var group_list_component_1 = require("../shared/components/group-list/group-list.component");
exports.AssessmentRoutes = [
    {
        path: "assessment",
        component: assessment_component_1.AssessmentComponent,
        data: {
            breadcrumb: 'Assessment'
        },
        canActivate: [admin_guard_1.AdminGuard],
        children: [
            {
                path: "exams",
                component: exam_list_component_1.ExamListComponent,
                data: {
                    breadcrumb: 'Exams'
                }
            },
            {
                path: "questions",
                component: question_list_component_1.QuestionListComponent,
                data: {
                    breadcrumb: 'Questions'
                }
            },
            {
                path: "groups",
                component: group_list_component_1.GroupListComponent,
                data: {
                    breadcrumb: 'Question groups',
                    category: 'question'
                },
            }
        ]
    }
];
//# sourceMappingURL=assessment-routing.js.map
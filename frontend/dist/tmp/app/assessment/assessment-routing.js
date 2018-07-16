"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var assessment_component_1 = require("./assessment.component");
var exam_list_component_1 = require("./exam/exam-list/exam-list.component");
var question_list_component_1 = require("./question/question-list/question-list.component");
var admin_guard_1 = require("../shared/guards/admin.guard");
var group_list_component_1 = require("../shared/components/group-list/group-list.component");
var survey_sheet_list_component_1 = require("./question/survey-sheet-list/survey-sheet-list.component");
var question_sheet_list_component_1 = require("./question/question-sheet-list/question-sheet-list.component");
var exam_enrollment_list_component_1 = require("./exam/exam-enrollment-list/exam-enrollment-list.component");
var survey_enrollment_list_component_1 = require("./survey/survey-enrollment-list/survey-enrollment-list.component");
var survey_list_component_1 = require("./survey/survey-list/survey-list.component");
var router_1 = require("@angular/router");
exports.AssessmentRoutes = [
    {
        path: 'assessment',
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
                path: "exam-enrollments",
                component: exam_enrollment_list_component_1.ExamEnrollmentListComponent,
                data: {
                    breadcrumb: 'Exam enrollments'
                }
            },
            {
                path: "question-sheets",
                component: question_sheet_list_component_1.QuestionSheetListComponent,
                data: {
                    breadcrumb: 'Question sheets'
                }
            },
            {
                path: "surveys",
                component: survey_list_component_1.SurveyListComponent,
                data: {
                    breadcrumb: 'Surveys'
                }
            },
            {
                path: "survey-enrollments",
                component: survey_enrollment_list_component_1.SurveyEnrollmentListComponent,
                data: {
                    breadcrumb: 'Survey enrollment'
                }
            },
            {
                path: "survey-sheets",
                component: survey_sheet_list_component_1.SurveySheetListComponent,
                data: {
                    breadcrumb: 'Survey sheets'
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
var AssessmentRoutingModule = (function () {
    function AssessmentRoutingModule() {
    }
    AssessmentRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(exports.AssessmentRoutes)],
            exports: [router_1.RouterModule]
        })
    ], AssessmentRoutingModule);
    return AssessmentRoutingModule;
}());
exports.AssessmentRoutingModule = AssessmentRoutingModule;

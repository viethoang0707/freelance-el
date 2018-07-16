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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L2Fzc2Vzc21lbnQtcm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUF5QztBQUV6QywrREFBNEQ7QUFDNUQsNEVBQXlFO0FBRXpFLDRGQUF5RjtBQUV6Riw0REFBMEQ7QUFDMUQsNkZBQTBGO0FBQzFGLHdHQUFvRztBQUNwRyw4R0FBMEc7QUFDMUcsNkdBQXlHO0FBQ3pHLHFIQUFpSDtBQUNqSCxvRkFBaUY7QUFDakYsMENBQStDO0FBRWxDLFFBQUEsZ0JBQWdCLEdBQVc7SUFDdEM7UUFDRSxJQUFJLEVBQUUsWUFBWTtRQUNsQixTQUFTLEVBQUUsMENBQW1CO1FBQzlCLElBQUksRUFBRTtZQUNKLFVBQVUsRUFBRSxZQUFZO1NBQ3pCO1FBQ0QsV0FBVyxFQUFFLENBQUMsd0JBQVUsQ0FBQztRQUN6QixRQUFRLEVBQ1I7WUFDRTtnQkFDRSxJQUFJLEVBQUUsT0FBTztnQkFDYixTQUFTLEVBQUUsdUNBQWlCO2dCQUM1QixJQUFJLEVBQUU7b0JBQ0osVUFBVSxFQUFFLE9BQU87aUJBQ3BCO2FBQ0Y7WUFDRDtnQkFDRSxJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixTQUFTLEVBQUUsNERBQTJCO2dCQUN0QyxJQUFJLEVBQUU7b0JBQ0osVUFBVSxFQUFFLGtCQUFrQjtpQkFDL0I7YUFDRjtZQUNEO2dCQUNFLElBQUksRUFBRSxpQkFBaUI7Z0JBQ3ZCLFNBQVMsRUFBRSwwREFBMEI7Z0JBQ3JDLElBQUksRUFBRTtvQkFDSixVQUFVLEVBQUUsaUJBQWlCO2lCQUM5QjthQUNGO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsU0FBUyxFQUFFLDJDQUFtQjtnQkFDOUIsSUFBSSxFQUFFO29CQUNKLFVBQVUsRUFBRSxTQUFTO2lCQUN0QjthQUNGO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLG9CQUFvQjtnQkFDMUIsU0FBUyxFQUFFLGdFQUE2QjtnQkFDeEMsSUFBSSxFQUFFO29CQUNKLFVBQVUsRUFBRSxtQkFBbUI7aUJBQ2hDO2FBQ0Y7WUFDRDtnQkFDRSxJQUFJLEVBQUUsZUFBZTtnQkFDckIsU0FBUyxFQUFFLHNEQUF3QjtnQkFDbkMsSUFBSSxFQUFFO29CQUNKLFVBQVUsRUFBRSxlQUFlO2lCQUM1QjthQUNGO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFNBQVMsRUFBRSwrQ0FBcUI7Z0JBQ2hDLElBQUksRUFBRTtvQkFDSixVQUFVLEVBQUUsV0FBVztpQkFDeEI7YUFDRjtZQUNEO2dCQUNFLElBQUksRUFBRSxRQUFRO2dCQUNkLFNBQVMsRUFBRSx5Q0FBa0I7Z0JBQzdCLElBQUksRUFBRTtvQkFDSixVQUFVLEVBQUUsaUJBQWlCO29CQUM3QixRQUFRLEVBQUUsVUFBVTtpQkFDckI7YUFDRjtTQUNGO0tBQ0Y7Q0FFRixDQUFBO0FBTUQ7SUFBQTtJQUFzQyxDQUFDO0lBQTFCLHVCQUF1QjtRQUpuQyxlQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxxQkFBWSxDQUFDLFFBQVEsQ0FBQyx3QkFBZ0IsQ0FBQyxDQUFDO1lBQ2xELE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUM7U0FDeEIsQ0FBQztPQUNXLHVCQUF1QixDQUFHO0lBQUQsOEJBQUM7Q0FBdkMsQUFBdUMsSUFBQTtBQUExQiwwREFBdUIiLCJmaWxlIjoiYXBwL2Fzc2Vzc21lbnQvYXNzZXNzbWVudC1yb3V0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBc3Nlc3NtZW50Q29tcG9uZW50IH0gZnJvbSAnLi9hc3Nlc3NtZW50LmNvbXBvbmVudCdcbmltcG9ydCB7IEV4YW1MaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9leGFtL2V4YW0tbGlzdC9leGFtLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IEV4YW1EaWFsb2cgfSBmcm9tICcuL2V4YW0vZXhhbS1kaWFsb2cvZXhhbS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFF1ZXN0aW9uTGlzdENvbXBvbmVudCB9IGZyb20gJy4vcXVlc3Rpb24vcXVlc3Rpb24tbGlzdC9xdWVzdGlvbi1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBRdWVzdGlvbkRpYWxvZyB9IGZyb20gJy4vcXVlc3Rpb24vcXVlc3Rpb24tZGlhbG9nL3F1ZXN0aW9uLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWRtaW5HdWFyZCB9IGZyb20gJy4uL3NoYXJlZC9ndWFyZHMvYWRtaW4uZ3VhcmQnO1xuaW1wb3J0IHsgR3JvdXBMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvZ3JvdXAtbGlzdC9ncm91cC1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdXJ2ZXlTaGVldExpc3RDb21wb25lbnQgfSBmcm9tICcuL3F1ZXN0aW9uL3N1cnZleS1zaGVldC1saXN0L3N1cnZleS1zaGVldC1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBRdWVzdGlvblNoZWV0TGlzdENvbXBvbmVudCB9IGZyb20gJy4vcXVlc3Rpb24vcXVlc3Rpb24tc2hlZXQtbGlzdC9xdWVzdGlvbi1zaGVldC1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFeGFtRW5yb2xsbWVudExpc3RDb21wb25lbnQgfSBmcm9tICcuL2V4YW0vZXhhbS1lbnJvbGxtZW50LWxpc3QvZXhhbS1lbnJvbGxtZW50LWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFN1cnZleUVucm9sbG1lbnRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9zdXJ2ZXkvc3VydmV5LWVucm9sbG1lbnQtbGlzdC9zdXJ2ZXktZW5yb2xsbWVudC1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdXJ2ZXlMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9zdXJ2ZXkvc3VydmV5LWxpc3Qvc3VydmV5LWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmV4cG9ydCBjb25zdCBBc3Nlc3NtZW50Um91dGVzOiBSb3V0ZXMgPSBbXG4gIHtcbiAgICBwYXRoOiAnYXNzZXNzbWVudCcsXG4gICAgY29tcG9uZW50OiBBc3Nlc3NtZW50Q29tcG9uZW50LFxuICAgIGRhdGE6IHtcbiAgICAgIGJyZWFkY3J1bWI6ICdBc3Nlc3NtZW50J1xuICAgIH0sXG4gICAgY2FuQWN0aXZhdGU6IFtBZG1pbkd1YXJkXSxcbiAgICBjaGlsZHJlbjpcbiAgICBbXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiZXhhbXNcIixcbiAgICAgICAgY29tcG9uZW50OiBFeGFtTGlzdENvbXBvbmVudCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGJyZWFkY3J1bWI6ICdFeGFtcydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCJleGFtLWVucm9sbG1lbnRzXCIsXG4gICAgICAgIGNvbXBvbmVudDogRXhhbUVucm9sbG1lbnRMaXN0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgYnJlYWRjcnVtYjogJ0V4YW0gZW5yb2xsbWVudHMnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwicXVlc3Rpb24tc2hlZXRzXCIsXG4gICAgICAgIGNvbXBvbmVudDogUXVlc3Rpb25TaGVldExpc3RDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBicmVhZGNydW1iOiAnUXVlc3Rpb24gc2hlZXRzJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcInN1cnZleXNcIixcbiAgICAgICAgY29tcG9uZW50OiBTdXJ2ZXlMaXN0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgYnJlYWRjcnVtYjogJ1N1cnZleXMnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwic3VydmV5LWVucm9sbG1lbnRzXCIsXG4gICAgICAgIGNvbXBvbmVudDogU3VydmV5RW5yb2xsbWVudExpc3RDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBicmVhZGNydW1iOiAnU3VydmV5IGVucm9sbG1lbnQnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwic3VydmV5LXNoZWV0c1wiLFxuICAgICAgICBjb21wb25lbnQ6IFN1cnZleVNoZWV0TGlzdENvbXBvbmVudCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGJyZWFkY3J1bWI6ICdTdXJ2ZXkgc2hlZXRzJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcInF1ZXN0aW9uc1wiLFxuICAgICAgICBjb21wb25lbnQ6IFF1ZXN0aW9uTGlzdENvbXBvbmVudCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGJyZWFkY3J1bWI6ICdRdWVzdGlvbnMnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiZ3JvdXBzXCIsXG4gICAgICAgIGNvbXBvbmVudDogR3JvdXBMaXN0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgYnJlYWRjcnVtYjogJ1F1ZXN0aW9uIGdyb3VwcycsXG4gICAgICAgICAgY2F0ZWdvcnk6ICdxdWVzdGlvbidcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICBdXG4gIH1cblxuXVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbUm91dGVyTW9kdWxlLmZvckNoaWxkKEFzc2Vzc21lbnRSb3V0ZXMpXSxcbiAgZXhwb3J0czogW1JvdXRlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgQXNzZXNzbWVudFJvdXRpbmdNb2R1bGUge31cbiJdfQ==

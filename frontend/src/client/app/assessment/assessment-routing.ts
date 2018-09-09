import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AssessmentComponent } from './assessment.component'
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { ExamFormComponent } from './exam/exam-form/exam-form.component';
import { ExamViewComponent } from './exam/exam-view/exam-view.component';import { QuestionListComponent } from './question/question-list/question-list.component';
import { QuestionDialog } from './question/question-dialog/question-dialog.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { GroupListComponent } from '../shared/components/group-list/group-list.component';
import { SurveySheetListComponent } from './survey/survey-sheet-list/survey-sheet-list.component';
import { QuestionSheetListComponent } from './exam/question-sheet-list/question-sheet-list.component';
import { ExamEnrollmentListComponent } from './exam/exam-enrollment-list/exam-enrollment-list.component';
import { SurveyFormComponent } from './survey/survey-form/survey-form.component';
import { SurveyViewComponent } from './survey/survey-view/survey-view.component';
import { SurveyEnrollComponent } from './survey/survey-enroll/survey-enroll.component';import { SurveyListComponent } from './survey/survey-list/survey-list.component';
import { ExamResolve,SurveyResolve } from './route.resolver';
import { ExamEnrollComponent } from './exam/exam-enroll/exam-enroll.component';
import { SurveyEnrollmentListComponent } from './survey/survey-enrollment-list/survey-enrollment-list.component';

export const AssessmentRoutes: Routes = [
  {
    path: 'assessment',
    component: AssessmentComponent,
    data: {
      breadcrumb: 'Assessment'
    },
    canActivate: [AdminGuard],
    children:
    [
      {
        path: "exams",
        component: ExamListComponent,
        data: {
          breadcrumb: 'Exams'
        }
      },
      {
        path: "exam/form",
        component: ExamFormComponent,
        data: {
          breadcrumb: 'Exam edit form'
        }
      },
      {
        path: "exam/form/:examId",
        component: ExamFormComponent,
        data: {
          breadcrumb: 'Exam create form'
        },
        resolve: {
          exam: ExamResolve,
        },
      },
      {
        path: "exam/view/:examId",
        component: ExamViewComponent,
        data: {
          breadcrumb: 'Exam view form'
        },
        resolve: {
          exam: ExamResolve,
        },
      },
      {
        path: "exams/enrollment",
        component: ExamEnrollmentListComponent,
        data: {
          breadcrumb: 'Exam enrollments'
        }
      },
      {
        path: "exam/enroll/:examId",
        component: ExamEnrollComponent,
        data: {
          breadcrumb: 'Exam enroll'
        },
        resolve: {
          exam: ExamResolve,
        },
      },
      {
        path: "exams/sheets",
        component: QuestionSheetListComponent,
        data: {
          breadcrumb: 'Question sheets'
        }
      },
      {
        path: "surveys",
        component: SurveyListComponent,
        data: {
          breadcrumb: 'Surveys'
        }
      },
      {
        path: "surveys/enrollment",
        component: SurveyEnrollmentListComponent,
        data: {
          breadcrumb: 'Survey enrollment'
        }
      },
      {
        path: "survey/form",
        component: SurveyFormComponent,
        data: {
          breadcrumb: 'Survey create form'
        },
        resolve: {
          survey: SurveyResolve,
        },
      },
      {
        path: "survey/form/:surveyId",
        component: SurveyFormComponent,
        data: {
          breadcrumb: 'Survey edit form'
        },
        resolve: {
          survey: SurveyResolve,
        },
      },
      {
        path: "survey/view/:surveyId",
        component: SurveyViewComponent,
        data: {
          breadcrumb: 'Survey view form'
        },
        resolve: {
          survey: SurveyResolve,
        },
      },
      {
        path: "survey/enroll/:surveyId",
        component: SurveyEnrollComponent,
        data: {
          breadcrumb: 'Survey enroll'
        },
        resolve: {
          survey: SurveyResolve,
        },
      },
      {
        path: "surveys/sheets",
        component: SurveySheetListComponent,
        data: {
          breadcrumb: 'Survey sheets'
        }
      },
      {
        path: "questions",
        component: QuestionListComponent,
        data: {
          breadcrumb: 'Questions'
        }
      },
      {
        path: "groups",
        component: GroupListComponent,
        data: {
          breadcrumb: 'Question groups',
          category: 'question'
        },
      }
    ]
  }

]



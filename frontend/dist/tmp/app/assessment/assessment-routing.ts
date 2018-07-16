import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AssessmentComponent } from './assessment.component'
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { ExamDialog } from './exam/exam-dialog/exam-dialog.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { QuestionDialog } from './question/question-dialog/question-dialog.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { GroupListComponent } from '../shared/components/group-list/group-list.component';
import { SurveySheetListComponent } from './question/survey-sheet-list/survey-sheet-list.component';
import { QuestionSheetListComponent } from './question/question-sheet-list/question-sheet-list.component';
import { ExamEnrollmentListComponent } from './exam/exam-enrollment-list/exam-enrollment-list.component';
import { SurveyEnrollmentListComponent } from './survey/survey-enrollment-list/survey-enrollment-list.component';
import { SurveyListComponent } from './survey/survey-list/survey-list.component';
import { RouterModule } from '@angular/router';

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
        path: "exam-enrollments",
        component: ExamEnrollmentListComponent,
        data: {
          breadcrumb: 'Exam enrollments'
        }
      },
      {
        path: "question-sheets",
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
        path: "survey-enrollments",
        component: SurveyEnrollmentListComponent,
        data: {
          breadcrumb: 'Survey enrollment'
        }
      },
      {
        path: "survey-sheets",
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

@NgModule({
  imports: [RouterModule.forChild(AssessmentRoutes)],
  exports: [RouterModule]
})
export class AssessmentRoutingModule {}

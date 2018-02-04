import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AssessmentComponent } from './assessment.component'
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { ExamDialog } from './exam/exam-dialog/exam-dialog.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { QuestionDialog } from './question/question-dialog/question-dialog.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { GroupListComponent } from '../shared/components/group-list/group-list.component';

export const AssessmentRoutes: Routes = [
  {
    path: "assessment",
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
          breadcrumb: 'Groups',
          category: 'question'
        },
      }


    ]
  }

]

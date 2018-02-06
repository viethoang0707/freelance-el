import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { CMSComponent } from './cms.component'
import { TeacherGuard } from '../shared/guards/teacher.guard';
import { SupervisorGuard } from '../shared/guards/supervisor.guard';
import { ExamContentComponent } from './exam/content/exam-content.component';
import { SyllabusLayoutComponent } from './course/syllabus-layout/syllabus-layout.component';


export const CMSRoutes: Routes = [
  {
    path: "cms",
    component: CMSComponent,
    data: {
      breadcrumb: 'Content Management'
    },
    children:
    [
      {
        path: "exam/:examId",
        canActivate: [SupervisorGuard],
        component: ExamContentComponent,
        data: {
          breadcrumb: 'Exam content'
        }
      },
      {
        path: "course/:courseId",
        canActivate: [TeacherGuard],
        component: SyllabusLayoutComponent,
        data: {
          breadcrumb: 'Course syllabus'
        }
      },
    ]
  }

]
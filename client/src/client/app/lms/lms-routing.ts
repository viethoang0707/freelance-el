import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LMSComponent } from './lms.component';
import { ExamListComponent} from './exam/exam-list/exam-list.component';
import { ExamStudyComponent} from './exam/exam-study/exam-study.component';
import { CourseListComponent} from './course/course-list/course-list.component';
import { CourseStudyComponent} from './course/course-study/course-study.component';

export const LMSRoutes: Routes = [
    {
       path: "lms",
       component: LMSComponent,
       children:
       [
           {
               path: "exams",
               component: ExamListComponent
            },
            {
               path: "exam/:examId",
               component: ExamStudyComponent
            },
            {
               path: "courses",
               component: CourseListComponent
            },
            {
               path: "course/:courseId",
               component: CourseStudyComponent
            }

       ]
    }

]

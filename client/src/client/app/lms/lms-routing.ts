import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LMSComponent } from './lms.component';
import { ExamListComponent} from './exam/exam-list/exam-list.component';
import { CourseListComponent} from './course/course-list/course-list.component';
import { ConferenceListComponent } from './conference/conference-list/conference-list.component';
import { CourseManageComponent } from './course/course-manage/course-manage.component';
import { CourseStudyComponent } from './course/course-study/course-study.component';
import { ExamManageComponent } from './exam/exam-manage/exam-manage.component';

export const LMSRoutes: Routes = [
    {
       path: "lms",
       component: LMSComponent,
       data: {
         breadcrumb:'LMS'
       },
       children:
       [
           {
               path: "exams",
               component: ExamListComponent,
               data: {
                 breadcrumb:'My exams'
               }
            },
            {
               path: "exams/manage/:examId/:memberId",
               component: ExamManageComponent,
               data: {
                 breadcrumb:'Manage exam'
               }
            },
            {
               path: "courses",
               component: CourseListComponent,
               data: {
                 breadcrumb:'My courses'
               }
            },
            {
               path: "courses/manage/:courseId/:memberId",
               component: CourseManageComponent,
               data: {
                 breadcrumb:'Manage course'
               }
            },
            {
               path: "courses/study/:courseId/:memberId",
               component: CourseStudyComponent,
               data: {
                 breadcrumb:'Study course'
               }
            },
            {
               path: "meetings",
               component: ConferenceListComponent,
               data: {
                 breadcrumb:'My conferences'
               }
            },
       ]
    }

]

import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LMSComponent } from './lms.component';
import { CourseManageComponent } from './course/course-manage/course-manage.component';
import { CourseStudyComponent } from './course/course-study/course-study.component';
import { ExamManageComponent } from './exam/exam-manage/exam-manage.component';
import { CourseViewComponent } from './course/course-view/course-view.component';
import { CourseEditComponent } from './course/course-edit/course-edit.component';
import { ClassManageComponent } from './class/class-manage/class-manage.component';
import { CourseGuard } from '../shared/guards/course.guard';
import { ExamGuard } from '../shared/guards/exam.guard';
import { SyllabusGuard } from '../shared/guards/syllabus.guard';
import { SurveyGuard } from '../shared/guards/survey.guard';
import { RouterModule } from '@angular/router';
import { ClassGuard } from '../shared/guards/class.guard';

export const LMSRoutes: Routes = [
    {
       path: 'lms',
       component: LMSComponent,
       data: {
         breadcrumb:'LMS'
       },
       children:
       [
            {
               path: "exams/manage/:examId/:memberId",
               component: ExamManageComponent,
               data: {
                 breadcrumb:'Manage exam'
               },
               canActivate:[ExamGuard]
            },
            {
               path: "courses/edit/:courseId/:memberId",
               component: CourseEditComponent,
               data: {
                 breadcrumb:'Edit course'
               },
               canActivate:[SyllabusGuard]
            },
            {
               path: "courses/manage/:courseId/:memberId",
               component: CourseManageComponent,
               data: {
                 breadcrumb:'Manage course'
               },
               canActivate:[CourseGuard]
            },
            {
               path: "courses/manage/class/:courseId/:classId/:memberId",
               component: ClassManageComponent,
               data: {
                 breadcrumb:'Manage class student'
               },
               canActivate:[ClassGuard]
            },
            {
               path: "courses/view/:courseId",
               component: CourseViewComponent,
               data: {
                 breadcrumb:'View course'
               }
            },
            {
               path: "courses/study/:courseId/:memberId",
               component: CourseStudyComponent,
               data: {
                 breadcrumb:'Study course'
               },
            },
       ]
    }

]


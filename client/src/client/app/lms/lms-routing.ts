import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LMSComponent } from './lms.component';
import { ExamListComponent} from './exam/exam-list/exam-list.component';
import { CourseListComponent} from './course/course-list/course-list.component';
import { ConferenceListComponent } from './conference/conference-list/conference-list.component';
import { CourseManageComponent } from './course/course-manage/course-manage.component';
import { CourseStudyComponent } from './course/course-study/course-study.component';
import { ExamManageComponent } from './exam/exam-manage/exam-manage.component';
import { StudentGuard } from '../shared/guards/student.guard';
import { TeacherGuard } from '../shared/guards/teacher.guard';
import { ExamSupervisorGuard } from '../shared/guards/exam-supervisor.guard';
import { CourseSearchComponent } from './course/course-search/course-search.component';
import { SurveySupervisorGuard } from '../shared/guards/survey-supervisor.guard';
import { SurveyListComponent} from './survey/survey-list/survey-list.component';
import { CourseRecommendComponent } from './course/course-recommend/course-recommend.component';
import { CourseViewComponent } from './course/course-view/course-view.component';
import { CourseEditComponent } from './course/course-edit/course-edit.component';


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
               },
            },
            {
               path: "courses",
               component: CourseListComponent,
               data: {
                 breadcrumb:'My courses'
               }
            },
            {
               path: "courses/search",
               component: CourseSearchComponent,
               data: {
                 breadcrumb:'Search courses'
               }
            },
            {
               path: "courses/recommend",
               component: CourseRecommendComponent,
               data: {
                 breadcrumb:'Search courses'
               }
            },
            {
               path: "courses/edit/:courseId/:memberId",
               component: CourseEditComponent,
               data: {
                 breadcrumb:'Edit course'
               },
            },
            {
               path: "courses/manage/:courseId",
               component: CourseManageComponent,
               data: {
                 breadcrumb:'Manage course'
               },
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
            {
               path: "meetings",
               component: ConferenceListComponent,
               data: {
                 breadcrumb:'My conferences'
               }
            },
            {
               path: "surveys",
               component: SurveyListComponent,
               data: {
                 breadcrumb:'My surveys'
               }
            }
       ]
    }

]

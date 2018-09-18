import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LMSComponent } from './lms.component';
import { CourseGroupManageComponent } from './course/course-manage/course-group-manage.component';
import { CourseSelfStudyManageComponent } from './course/course-manage/course-self-study-manage.component'; import { CourseStudyComponent } from './course/course-study/course-study.component';
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
import { ClassConferenceComponent } from './class/class-conference/class-conference.component';
import { ClassExamEnrollComponent } from './class/class-exam-enroll/class-exam-enroll.component';
import { ClassSurveyEnrollComponent } from './class/class-survey-enroll/class-survey-enroll.component';
import { ConferenceeResolve, ProjectResolve, CourseResolve, CourseClassResolve, ExamResolve, SurveyResolve, CourseMemberResolve } from './router.resolve';
import { ProjectManageComponent } from './class/project-manage/project-manage.component';
import { CourseMemberResolve } from '../../../../dist/tmp/app/lms/router.resolve';

export const LMSRoutes: Routes = [
  {
    path: 'lms',
    component: LMSComponent,
    data: {
      breadcrumb: 'LMS'
    },
    children:
      [
        {
          path: "exam/manage/:examId",
          component: ExamManageComponent,
          data: {
            breadcrumb: 'Manage exam'
          },
          resolve: {
            exam: ExamResolve,
          },
          canActivate: [ExamGuard]
        },
        {
          path: "course/edit/:courseId",
          component: CourseEditComponent,
          data: {
            breadcrumb: 'Edit course'
          },
          resolve: {
            course: CourseResolve,
          },
          canActivate: [SyllabusGuard]
        },
        {
          path: "course/group-manage/:courseId/:memberId",
          component: CourseGroupManageComponent,
          data: {
            breadcrumb: 'Manage course'
          },
          resolve: {
            course: CourseResolve,
            supervisor: CourseMemberResolve
          },
          canActivate: [CourseGuard]
        },
        {
          path: "course/self-study-manage/:courseId/:memberId",
          component: CourseSelfStudyManageComponent,
          data: {
            breadcrumb: 'Manage class student'
          },
          resolve: {
            course: CourseResolve,
            supervisor: CourseMemberResolve
          },
          canActivate: [CourseGuard]
        }, {
          path: "class/manage/:classId/:memberId",
          component: ClassManageComponent,
          data: {
            breadcrumb: 'Manage class exam enrollment'
          },
          resolve: {
            courseClass : CourseClassResolve,
            supervisor: CourseMemberResolve
          },
          canActivate: [ClassGuard]
        }, {
          path: "class/manage/exam/:classId/:examId",
          component: ClassExamEnrollComponent,
          data: {
            breadcrumb: 'Manage class exam enrollment'
          },
          resolve: {
            exam: ExamResolve
          },
          canActivate: [ClassGuard]
        },
        {
          path: "class/manage/project/:classId/:projectId",
          component: ProjectManageComponent,
          data: {
            breadcrumb: 'Manage class project'
          },
          resolve: {
            project: ProjectResolve
          },
          canActivate: [ClassGuard]
        },
        {
          path: "class/manage/survey/:classId/:surveyId",
          component: ClassSurveyEnrollComponent,
          data: {
            breadcrumb: 'Manage class survey enrollment'
          },
          resolve: {
            survey: SurveyResolve
          },
          canActivate: [ClassGuard]
        },
        {
          path: "class/manage/conference/:classId/:conferenceId",
          component: ClassConferenceComponent,
          data: {
            breadcrumb: 'Manage class conference'
          },
          resolve: {
            conference: ConferenceeResolve,
          },
          canActivate: [ClassGuard]
        },
        {
          path: "course/view/:courseId",
          component: CourseViewComponent,
          data: {
            breadcrumb: 'View course'
          },
          resolve: {
            course: CourseResolve,
          },
        },
        {
          path: "course/study/:courseId/:memberId",
          component: CourseStudyComponent,
          data: {
            breadcrumb: 'Study course'
          },
          resolve: {
            course: CourseResolve,
            member: CourseMemberResolve
          },
        },
      ]
  }

]


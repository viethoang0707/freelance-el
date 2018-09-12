import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { CourseComponent } from './course.component'
import { CourseListComponent } from './course/course-list/course-list.component';
import { GroupListComponent } from '../shared/components/group-list/group-list.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { CourseClassFormComponent } from './enrollment/class-form/class-form.component';
import { CourseClassViewComponent } from './enrollment/class-view/class-view.component';
import { CourseFormComponent } from './course/course-form/course-form.component';
import { CourseViewComponent } from './course/course-view/course-view.component';
import { CourseEnrollmentFormComponent } from './enrollment/enrollment-form/course-enrollment-form.component';
import { CourseEnrollmentListComponent } from './enrollment/course-list/course-list.component';
import { CourseResolve, CourseClassResolve } from './route.resolver';
import { CourseClassListComponent } from './enrollment/class-list/class-list.component';
import { CourseClassEnrollmentFormComponent } from './enrollment/enrollment-form/class-enrollment-form.component';

export const CourseRoutes: Routes = [
  {
    path: 'course',
    component: CourseComponent,
    data: {
      breadcrumb: 'Syllabus'
    },
    canActivate: [AdminGuard],
    children:
      [
        {
          path: "list",
          component: CourseListComponent,
          data: {
            breadcrumb: 'Courses'
          }
        },
        {
          path: "form",
          component: CourseFormComponent,
          data: {
            breadcrumb: 'Course form'
          },
          resolve: {
            course: CourseResolve,
          },
        },
        {
          path: "form/:courseId",
          component: CourseFormComponent,
          data: {
            breadcrumb: 'Course form'
          },
          resolve: {
            course: CourseResolve,
          },
        },
        {
          path: "view/:courseId",
          component: CourseViewComponent,
          data: {
            breadcrumb: 'Course view'
          },
          resolve: {
            course: CourseResolve,
          },
        },
        {
          path: "class/list/:courseId",
          component: CourseClassListComponent,
          data: {
            breadcrumb: 'Class form'
          },
        },
        {
          path: "class/form/:courseId",
          component: CourseClassFormComponent,
          data: {
            breadcrumb: 'Class form'
          },
          resolve: {
            courseClass: CourseClassResolve,
          },
        },
        {
          path: "class/form/:courseId/:classId",
          component: CourseClassFormComponent,
          data: {
            breadcrumb: 'Class form'
          },
          resolve: {
            courseClass: CourseClassResolve,
          },
        },
        {
          path: "class/view/:classId",
          component: CourseClassViewComponent,
          data: {
            breadcrumb: 'Class view'
          },
          resolve: {
            courseClass: CourseClassResolve,
          },
        },
        {
          path: "enrollments",
          component: CourseEnrollmentListComponent,
          data: {
            breadcrumb: 'Enrollment'
          }
        },
        {
          path: "enroll/:courseId",
          component: CourseEnrollmentFormComponent,
          data: {
            breadcrumb: 'Course enrollment'
          },
          resolve: {
            course: CourseResolve,
          },
        },
        {
          path: "enroll/class/:classId",
          component: CourseClassEnrollmentFormComponent,
          data: {
            breadcrumb: 'Class enrollment'
          },
          resolve: {
            courseClass: CourseClassResolve,
          },
        },
        {
          path: "groups",
          component: GroupListComponent,
          data: {
            breadcrumb: 'Groups',
            category: 'course'
          },
        }
      ]
  }

]


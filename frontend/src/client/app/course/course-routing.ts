import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import  { CourseComponent } from './course.component'
import { CourseListComponent } from './course/course-list/course-list.component';
import { GroupListComponent } from '../shared/components/group-list/group-list.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { CourseEnrollmentListComponent } from './enrollment/course-list/course-list.component';
import { RouterModule } from '@angular/router';

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
               path: "courses",
               component: CourseListComponent,
               data: {
                  breadcrumb: 'Courses'
                }
            },
            {
               path: "enrollment",
               component: CourseEnrollmentListComponent,
               data: {
                  breadcrumb: 'Enrollment'
                }
            },
            {
               path: "groups",
               component: GroupListComponent,
               data: {
                breadcrumb: 'Groups',
                category:'course'
              },
            }


       ]
    }

]


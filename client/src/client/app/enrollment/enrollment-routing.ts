import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import  { EnrollmentComponent } from './enrollment.component'
import { CourseClassListComponent } from './class/class-list/class-list.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { CourseMemberListComponent } from './member/member-list/member-list.component';
import { GroupListComponent } from '../shared/components/group-list/group-list.component';
import { AdminGuard } from '../shared/guards/admin.guard';

export const EnrollmentRoutes: Routes = [
    {
       path: "enrollment",
       component: EnrollmentComponent,
       data: {
      breadcrumb: 'Enrollment'
    },
    canActivate: [AdminGuard],
       children:
       [
           {
               path: "classes",
               component: CourseClassListComponent,
               data: {
                breadcrumb: 'Classes'
              }
            },
            {
               path: "courses",
               component: CourseListComponent,
               data: {
                  breadcrumb: 'Courses'
                }
            },
            {
               path: "members",
               component: CourseMemberListComponent,
               data: {
                  breadcrumb: 'Members'
                },
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

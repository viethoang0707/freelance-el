import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import  { EnrollmentComponent } from './enrollment.component'
import { ByCoursePipe } from './course.pipe';
import { ByClassPipe } from './class.pipe';
import { CourseClassListComponent } from './class/class-list/class-list.component';
import { CourseClassDialog } from './class/class-dialog/class-dialog.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { CourseDialog } from './course/course-dialog/course-dialog.component';
import { CourseMemberListComponent } from './member/member-list/member-list.component';
import { CourseMemberDialog } from './member/member-dialog/member-dialog.component';

@NgModule({
    imports: [ErpSharedModule, AuthModule],
    declarations: [EnrollmentComponent, CourseClassDialog, CourseClassListComponent,ByCoursePipe,ByClassPipe,
    				CourseListComponent, CourseDialog, CourseMemberListComponent, CourseMemberDialog],
    exports: [],
    providers: []
})
export class EnrollmentModule {
}

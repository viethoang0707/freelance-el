import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import  { CourseComponent } from './course.component'
import { ByCoursePipe } from './course.pipe';
import { ByClassPipe } from './class.pipe';
import { CourseClassListComponent } from './class/class-list/class-list.component';
import { CourseClassDialog } from './class/class-dialog/class-dialog.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { CourseDialog } from './course/course-dialog/course-dialog.component';
import { CourseEnrollDialog } from './enrollment-dialog/enrollment-dialog.component';

@NgModule({
    imports: [ErpSharedModule, AuthModule],
    declarations: [CourseComponent, CourseClassDialog, CourseClassListComponent,ByCoursePipe,ByClassPipe,
    				CourseListComponent, CourseDialog, CourseEnrollDialog],
    exports: [],
    providers: []
})
export class CourseModule {
}

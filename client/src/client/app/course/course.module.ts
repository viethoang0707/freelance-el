import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import  { CourseComponent } from './course.component'
import { ByCoursePipe } from './course.pipe';
import { ByClassPipe } from './class.pipe';
import { ClassListDialog } from './class/class-list/class-list-dialog.component';
import { CourseClassDialog } from './class/class-dialog/class-dialog.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { CourseDialog } from './course/course-dialog/course-dialog.component';
import { CourseEnrollDialog } from './class/enrollment-dialog/enrollment-dialog.component';

@NgModule({
    imports: [ErpSharedModule, AuthModule],
    declarations: [CourseComponent, CourseClassDialog, ClassListDialog,ByCoursePipe,ByClassPipe,
    				CourseListComponent, CourseDialog, CourseEnrollDialog],
    exports: [],
    providers: []
})
export class CourseModule {
}

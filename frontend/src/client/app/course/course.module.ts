import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { CourseComponent } from './course.component'
import { ClassListDialog } from './enrollment/class-list/class-list-dialog.component';
import { CourseClassDialog } from './enrollment/class-dialog/class-dialog.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { CourseDialog } from './course/course-dialog/course-dialog.component';
import { CourseEnrollDialog } from './enrollment/enrollment-dialog/enrollment-dialog.component';
import { CourseEnrollmentListComponent } from './enrollment/course-list/course-list.component';

@NgModule({
	imports: [
		ErpSharedModule,
		AuthModule
	],
	declarations: [
		CourseComponent,
		CourseClassDialog,
		ClassListDialog,
		CourseListComponent,
		CourseDialog,
		CourseEnrollDialog,
		CourseEnrollmentListComponent
	],
	exports: [
		CourseDialog,
		CourseClassDialog
	],
	providers: []
})
export class CourseModule {
}

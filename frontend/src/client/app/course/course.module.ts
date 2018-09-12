import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { CourseComponent } from './course.component'
import { CourseClassFormComponent } from './enrollment/class-form/class-form.component';
import { CourseClassViewComponent } from './enrollment/class-view/class-view.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { CourseFormComponent } from './course/course-form/course-form.component';
import { CourseViewComponent } from './course/course-view/course-view.component';
import { CourseEnrollmentFormComponent } from './enrollment/enrollment-form/course-enrollment-form.component';
import { CourseEnrollmentListComponent } from './enrollment/course-list/course-list.component';
import { CourseResolve, CourseClassResolve } from './route.resolver';
import { CourseClassListComponent } from './enrollment/class-list/class-list.component';
import { CourseClassEnrollmentFormComponent } from './enrollment/enrollment-form/class-enrollment-form.component';

@NgModule({
	imports: [
		ErpSharedModule,
		AuthModule
	],
	declarations: [
		CourseComponent,
		CourseEnrollmentFormComponent,
		CourseClassListComponent,
		CourseListComponent,
		CourseViewComponent,
		CourseFormComponent,
		CourseEnrollmentListComponent,
		CourseClassEnrollmentFormComponent,
		CourseClassFormComponent,
		CourseClassViewComponent
	],
	exports: [
	],
	providers: [
		CourseResolve,
		CourseClassResolve
	]
})
export class CourseModule {
}

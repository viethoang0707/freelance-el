import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { CMSModule } from '../cms/cms.module';
import { LMSComponent } from './lms.component';
import { ExamListComponent} from './exam/exam-list/exam-list.component';
import { ExamStudyComponent} from './exam/exam-study/exam-study.component';
import { CourseListComponent} from './course/course-list/course-list.component';
import { CourseStudyComponent} from './course/course-study/course-study.component';

@NgModule({
    imports: [ErpSharedModule, CMSModule, AuthModule],
    declarations: [LMSComponent, ExamListComponent, ExamStudyComponent,
    				CourseListComponent, CourseStudyComponent],
    exports: [],
    providers: []
})
export class LMSModule {
}

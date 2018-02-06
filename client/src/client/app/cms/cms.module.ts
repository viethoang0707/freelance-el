import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import  { CMSComponent } from './cms.component'
import { ExamContentComponent } from './exam/content/exam-content.component';
import { SyllabusLayoutComponent } from './course/syllabus-layout/syllabus-layout.component';

@NgModule({
    imports: [ErpSharedModule, AuthModule],
    declarations: [CMSComponent, ExamContentComponent, SyllabusLayoutComponent,],
    exports: [],
    providers: []
})
export class CMSModule {
}

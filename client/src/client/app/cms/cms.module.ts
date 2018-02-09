import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import  { CMSComponent } from './cms.component'
import { ExamContentDialog } from './exam/content/exam-content.dialog.component';
import { SyllabusLayoutComponent } from './course/syllabus-layout/syllabus-layout.component';
import { ValidateGradePipe } from './exam/grade.pipe';

@NgModule({
    imports: [ErpSharedModule, AuthModule],
    declarations: [CMSComponent, ValidateGradePipe, ExamContentDialog, SyllabusLayoutComponent,],
    exports: [ExamContentDialog],
    providers: []
})
export class CMSModule {
}

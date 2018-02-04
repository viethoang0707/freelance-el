import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import  { AssessmentComponent } from './assessment.component'
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { ExamDialog } from './exam/exam-dialog/exam-dialog.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { QuestionDialog } from './question/question-dialog/question-dialog.component';

@NgModule({
    imports: [ErpSharedModule, AuthModule],
    declarations: [AssessmentComponent, ExamListComponent, ExamDialog,
    				QuestionListComponent, QuestionDialog],
    exports: [],
    providers: []
})
export class AssessmentModule {
}

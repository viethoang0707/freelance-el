import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { AssessmentModule } from '../assessment/assessment.module';
import { CMSModule } from '../cms/cms.module';
import { LMSComponent } from './lms.component';
import { ExamListComponent} from './exam/exam-list/exam-list.component';
import { ExamStudyDialog} from './exam/exam-study/exam-study.dialog.component';
import { ExamMarkingDialog} from './exam/exam-marking/exam-marking.dialog.component';
import { CourseListComponent} from './course/course-list/course-list.component';
import { CourseStudyComponent} from './course/course-study/course-study.component';
import { QuestionMarkingDialog} from './exam/question-marking/question-marking.dialog.component';
import { ExamScoreDialog } from './exam/exam-score/exam-score.dialog.component';
import { AnswerSheetDialog } from './exam/answer-sheet/answer-sheet.dialog.component';

@NgModule({
    imports: [ErpSharedModule, CMSModule, AssessmentModule, AuthModule],
    declarations: [LMSComponent, ExamListComponent, ExamStudyDialog,ExamMarkingDialog,
    				CourseListComponent, CourseStudyComponent, QuestionMarkingDialog,
    				ExamScoreDialog, AnswerSheetDialog],
    exports: [],
    providers: []
})
export class LMSModule {
}

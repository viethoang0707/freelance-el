import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { CompetencyComponent } from './competency.component'
import { CompetencyListComponent } from './competency-list/competency-list.component';
import { CompetencyDialog } from './competency-dialog/question-competency.component';

@NgModule({
    imports: [ErpSharedModule, AuthModule],
    declarations: [CompetencyComponent,CompetencyListComponent,CompetencyDialog],
    providers: [],
    exports: [],
})
export class CompetencyModule {
}

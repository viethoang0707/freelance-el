import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { CompetencyComponent } from './competency.component'
import { CompetencyListComponent } from './competency-list/competency-list.component';
import { CompetencyDialog } from './competency-dialog/competency-dialog.component';
import { CompetencyMatrixComponent } from './competency-matrix/competency-matrix.component';
import { CompetencyRoutingModule } from './competency-routing';

@NgModule({
    imports: [CompetencyRoutingModule, ErpSharedModule, AuthModule],
    declarations: [CompetencyComponent,CompetencyListComponent,CompetencyDialog, CompetencyMatrixComponent],
    providers: [],
    exports: [],
})
export class CompetencyModule {
}

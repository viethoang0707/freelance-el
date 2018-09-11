import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { CompetencyComponent } from './competency.component'
import { CompetencyListComponent } from './competency-list/competency-list.component';
import { CompetencyFormComponent } from './competency-form/competency-form.component';
import { CompetencyMatrixComponent } from './competency-matrix/competency-matrix.component';
import { CompetencyViewComponent } from './competency-view/competency-view.component';
import { CompetencyResolve } from './route.resolver';

@NgModule({
	imports: [
		ErpSharedModule,
		AuthModule],
	declarations: [
		CompetencyComponent,
		CompetencyListComponent,
		CompetencyFormComponent,
		CompetencyViewComponent,
		CompetencyMatrixComponent],
	providers: [
		CompetencyResolve
	],
	exports: [],
})
export class CompetencyModule {
}

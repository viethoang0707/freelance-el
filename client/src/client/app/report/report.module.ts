import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { ReportComponent } from './report.component'
import { UserByGroupReportComponent } from './user/user-by-group-report/user-by-group-report.component';
import { ReportContainerDirective } from './report-container.directive';

@NgModule({
	imports: [ErpSharedModule, AuthModule],
	declarations: [ReportComponent, UserByGroupReportComponent, ReportContainerDirective],
	entryComponents: [
        UserByGroupReportComponent
    ],
	exports: [],
	providers: []
})
export class ReportModule {
}

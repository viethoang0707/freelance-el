import {NgModule} from '@angular/core';
import {AuthModule} from '../auth/auth.module';
import { HrmSharedModule } from '../shared/shared.module';


import {DashboardComponent} from './dashboard.component'

@NgModule({
    imports: [HrmSharedModule, AuthModule],
    declarations: [DashboardComponent],
    exports: [DashboardComponent],
    providers: []
})
export class DashboardModule {
}

import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { SettingComponent } from './setting.component';
import { SettingRoutingModule } from './setting-routing';

@NgModule({
    imports: [SettingRoutingModule,ErpSharedModule, AuthModule],
    declarations: [ SettingComponent],
    exports: [],
    providers: []
})
export class SettingModule {
}

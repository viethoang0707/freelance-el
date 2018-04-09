import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { SettingAppComponent } from './application/setting-app.component';
import { SettingComponent } from './setting.component';

@NgModule({
    imports: [ErpSharedModule, AuthModule],
    declarations: [SettingAppComponent, SettingComponent],
    exports: [],
    providers: []
})
export class SettingModule {
}

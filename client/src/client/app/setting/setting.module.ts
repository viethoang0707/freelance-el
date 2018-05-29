import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { SettingExamComponent } from './exam/setting-exam.component';
import { SettingComponent } from './setting.component';
import { ValidateGradePipe } from './exam/grade.pipe';

@NgModule({
    imports: [ErpSharedModule, AuthModule],
    declarations: [SettingExamComponent, SettingComponent, ValidateGradePipe],
    exports: [],
    providers: []
})
export class SettingModule {
}

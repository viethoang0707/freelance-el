import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { SettingDialog } from './setting-dialog.component';

@NgModule({
	imports: [
		ErpSharedModule,
		AuthModule
	],
	declarations: [
		SettingDialog
	],
	exports: [SettingDialog],
	providers: []
})
export class SettingModule {
}

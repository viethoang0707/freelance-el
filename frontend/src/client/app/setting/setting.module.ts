import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { SettingRoutingModule } from './setting-routing';
import { SettingComponent } from './setting.component';
import { SettingDialog } from './setting-dialog.component';
import { MailTemplateListComponent } from './mail-template-list/mail-template-list.component';
import { MailTemplateDialog } from './mail-template-dialog/mail-template-dialog.component';
@NgModule({
	imports: [
		ErpSharedModule,
		SettingRoutingModule,
		AuthModule
	],
	declarations: [
		SettingDialog,
		SettingComponent,
		MailTemplateDialog,
		MailTemplateListComponent
	],
	exports: [SettingDialog],
	providers: []
})
export class SettingModule {
}

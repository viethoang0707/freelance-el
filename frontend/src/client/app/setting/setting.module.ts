import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErpSharedModule } from '../shared/shared.module';
import { SettingComponent } from './setting.component';
import { SettingDialog } from './setting-dialog.component';
import { MailTemplateListComponent } from './mail-template-list/mail-template-list.component';
import { MailTemplateFormComponent } from './mail-template-form/mail-template-form.component';
import { MailTemplateViewComponent } from './mail-template-view/mail-template-view.component';
import { TemplateResolve } from './route.resolver';

@NgModule({
	imports: [
		ErpSharedModule,
		AuthModule
	],
	declarations: [
		SettingDialog,
		SettingComponent,
		MailTemplateFormComponent,
		MailTemplateViewComponent,
		MailTemplateListComponent
	],
	exports: [SettingDialog],
	providers: [
		TemplateResolve
	]
})
export class SettingModule {
}

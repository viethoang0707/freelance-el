import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover/recover-password.component';
import { ErpSharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthComponent } from './auth.component';

@NgModule({
	imports: [CommonModule, AuthRoutingModule, ErpSharedModule],
	declarations: [LoginComponent, RecoverPasswordComponent, AuthComponent],
	exports: []
})
export class AuthModule {

}

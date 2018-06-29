import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover/recover-password.component';
import { ErpSharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthComponent } from './auth.component';
import { ResetPasswordComponent } from './reset/reset-password.component';
import { MatchInputValidatorDirective } from './reset/match-input.validator';

@NgModule({
	imports: [CommonModule, AuthRoutingModule, ErpSharedModule],
	declarations: [LoginComponent, RecoverPasswordComponent, ResetPasswordComponent, AuthComponent, MatchInputValidatorDirective],
	exports: []
})
export class AuthModule {

}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover/recover-password.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'auth',
                component: AuthComponent,
                children: [
                    {path: '', pathMatch: 'full', component: LoginComponent},
                    {path: 'login', component: LoginComponent},
                    {path: 'recover-password', component: RecoverPasswordComponent},
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}

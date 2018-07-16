"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_component_1 = require("./auth.component");
var login_component_1 = require("./login/login.component");
var recover_password_component_1 = require("./recover/recover-password.component");
var reset_password_component_1 = require("./reset/reset-password.component");
var AuthRoutingModule = (function () {
    function AuthRoutingModule() {
    }
    AuthRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild([
                    {
                        path: 'auth',
                        component: auth_component_1.AuthComponent,
                        children: [
                            { path: 'login', component: login_component_1.LoginComponent },
                            { path: 'recover-pass', component: recover_password_component_1.RecoverPasswordComponent },
                            { path: 'reset-pass/:token', component: reset_password_component_1.ResetPasswordComponent },
                            { path: '', pathMatch: 'full', component: login_component_1.LoginComponent },
                        ]
                    }
                ])
            ],
            exports: [router_1.RouterModule]
        })
    ], AuthRoutingModule);
    return AuthRoutingModule;
}());
exports.AuthRoutingModule = AuthRoutingModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hdXRoL2F1dGgtcm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUF5QztBQUN6QywwQ0FBK0M7QUFDL0MsbURBQWlEO0FBQ2pELDJEQUF5RDtBQUN6RCxtRkFBZ0Y7QUFDaEYsNkVBQTBFO0FBbUIxRTtJQUFBO0lBQ0EsQ0FBQztJQURZLGlCQUFpQjtRQWpCN0IsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLHFCQUFZLENBQUMsUUFBUSxDQUFDO29CQUNsQjt3QkFDSSxJQUFJLEVBQUUsTUFBTTt3QkFDWixTQUFTLEVBQUUsOEJBQWE7d0JBQ3hCLFFBQVEsRUFBRTs0QkFDTixFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGdDQUFjLEVBQUM7NEJBQzFDLEVBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUscURBQXdCLEVBQUM7NEJBQzNELEVBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRSxpREFBc0IsRUFBQzs0QkFDOUQsRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGdDQUFjLEVBQUM7eUJBQzNEO3FCQUNKO2lCQUNKLENBQUM7YUFDTDtZQUNELE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUM7U0FDMUIsQ0FBQztPQUNXLGlCQUFpQixDQUM3QjtJQUFELHdCQUFDO0NBREQsQUFDQyxJQUFBO0FBRFksOENBQWlCIiwiZmlsZSI6ImFwcC9hdXRoL2F1dGgtcm91dGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXV0aENvbXBvbmVudCB9IGZyb20gJy4vYXV0aC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tICcuL2xvZ2luL2xvZ2luLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWNvdmVyUGFzc3dvcmRDb21wb25lbnQgfSBmcm9tICcuL3JlY292ZXIvcmVjb3Zlci1wYXNzd29yZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVzZXRQYXNzd29yZENvbXBvbmVudCB9IGZyb20gJy4vcmVzZXQvcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogJ2F1dGgnLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogQXV0aENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICB7cGF0aDogJ2xvZ2luJywgY29tcG9uZW50OiBMb2dpbkNvbXBvbmVudH0sXG4gICAgICAgICAgICAgICAgICAgIHtwYXRoOiAncmVjb3Zlci1wYXNzJywgY29tcG9uZW50OiBSZWNvdmVyUGFzc3dvcmRDb21wb25lbnR9LFxuICAgICAgICAgICAgICAgICAgICB7cGF0aDogJ3Jlc2V0LXBhc3MvOnRva2VuJywgY29tcG9uZW50OiBSZXNldFBhc3N3b3JkQ29tcG9uZW50fSxcbiAgICAgICAgICAgICAgICAgICAge3BhdGg6ICcnLCBwYXRoTWF0Y2g6ICdmdWxsJywgY29tcG9uZW50OiBMb2dpbkNvbXBvbmVudH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgZXhwb3J0czogW1JvdXRlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgQXV0aFJvdXRpbmdNb2R1bGUge1xufVxuIl19

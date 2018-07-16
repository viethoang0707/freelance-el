"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var base_component_1 = require("../../shared/components/base/base.component");
var RecoverPasswordComponent = (function (_super) {
    __extends(RecoverPasswordComponent, _super);
    function RecoverPasswordComponent() {
        var _this = _super.call(this) || this;
        _this.buildMode = "prod";
        return _this;
    }
    RecoverPasswordComponent.prototype.ngOnInit = function () {
    };
    RecoverPasswordComponent.prototype.recoverPassword = function () {
        var _this = this;
        this.accApiService.resetPasswordRequest(this.recover_email, this.cloudid).subscribe(function () {
            _this.success('Instruction to reset passwrod will be sent to your email.');
        }, function (err) {
            _this.error(err["message"]);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RecoverPasswordComponent.prototype, "recover_email", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RecoverPasswordComponent.prototype, "cloudid", void 0);
    RecoverPasswordComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'recover-password',
            template: "<div class=\"login-body\">     <div class=\"login-panel ui-fluid\">         <div class=\"login-panel-content\">             <form class=\"form-horizontal form-simple\" (ngSubmit)=\"f.form.valid && recoverPassword()\" #f=\"ngForm\" novalidate>                 <div class=\"ui-g\">                     <div class=\" ui-g-12 \">                         <h1>{{'Password Recovery Form'|translate}}             </h1>                     </div>                                          <div class=\" ui-g-12 \" [hidden]=\"buildMode=='prod'\">                         <span class=\"md-inputfield\">                 <input type=\"text\"  pInputText name=\"cloudid\" [(ngModel)]=\"cloudid\">                 <label for=\"cloudid\">{{'Cloud ID' | translate}}</label>             </span>                     </div>                     <div class=\" ui-g-12 \">                         <span class=\"md-inputfield\">                 <input type=\"email\" pInputText name=\"email\" [(ngModel)]=\"recover_email\" #email=\"ngModel\" required>                 <label for=\"email\">{{'Email'|translate}}</label>                 <div *ngIf=\"email.invalid && (email.dirty || email.touched)\" class=\"ui-message ui-messages-error ui-corner-all\">                     <div *ngIf=\"email.errors.required\">                         {{'Email is required' | translate}}                     </div>                 </div>             </span>                     </div>                     <div class=\"ui-g-12\">                         <button pButton type=\"submit\" icon=\"fa ui-icon-send\" label=\"{{'Submit'}}\"></button>                     </div>                     <div class=\"ui-g-12\">                         <a routerLink=\"/auth/login\">{{'Return to login'|translate}}</a>                     </div>                 </div>             </form>         </div>     </div> </div>"
        }),
        __metadata("design:paramtypes", [])
    ], RecoverPasswordComponent);
    return RecoverPasswordComponent;
}(base_component_1.BaseComponent));
exports.RecoverPasswordComponent = RecoverPasswordComponent;

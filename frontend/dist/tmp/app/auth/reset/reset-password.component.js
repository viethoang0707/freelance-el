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
var router_1 = require("@angular/router");
var base_component_1 = require("../../shared/components/base/base.component");
var ResetPasswordComponent = (function (_super) {
    __extends(ResetPasswordComponent, _super);
    function ResetPasswordComponent(route, router) {
        var _this = _super.call(this) || this;
        _this.route = route;
        _this.router = router;
        _this.buildMode = "prod";
        return _this;
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.token = params['token'];
        });
    };
    ResetPasswordComponent.prototype.resetPassword = function () {
        var _this = this;
        this.accApiService.resetPasswordExecute(this.token, this.new_pass, this.cloudid).subscribe(function () {
            _this.success('Your password has been reset successfully.');
        }, function (err) {
            _this.error(err["message"]);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ResetPasswordComponent.prototype, "new_pass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ResetPasswordComponent.prototype, "confirm_pass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ResetPasswordComponent.prototype, "cloudid", void 0);
    ResetPasswordComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'reset-password',
            template: "<div class=\"login-body\">   <div class=\"login-panel ui-fluid\">     <div class=\"login-panel-content\">       <form class=\"form-horizontal form-simple\" (ngSubmit)=\"f.form.valid && resetPassword()\" #f=\"ngForm\" novalidate>         <div class=\"ui-g\">           <div class=\" ui-g-12 \">             <h1>{{'Password Reset Form'|translate}}             </h1>           </div>           <div class=\" ui-g-12 \" [hidden]=\"buildMode=='prod'\">             <span class=\"md-inputfield\">                 <input type=\"text\"  pInputText name=\"cloudid\" [(ngModel)]=\"cloudid\">                 <label for=\"cloudid\">{{'Cloud ID' | translate}}</label>             </span>           </div>           <div class=\" ui-g-12 \">             <span class=\"md-inputfield\">                 <input type=\"password\" pInputText name=\"new_pass\" [(ngModel)]=\"new_pass\" #new_pass_input=\"ngModel\" required>                 <label for=\"new_pass\">{{'Enter new password'|translate}}</label>                 <div *ngIf=\"new_pass_input.invalid && (new_pass_input.dirty || new_pass_input.touched)\" class=\"ui-message ui-messages-error ui-corner-all\">                     <div *ngIf=\"new_pass_input.errors.required\">                         {{'New password is required' | translate}}                     </div>                 </div>             </span>           </div>            <div class=\" ui-g-12 \">             <span class=\"md-inputfield\">                 <input type=\"password\" pInputText name=\"confirm_pass\" [(ngModel)]=\"confirm_pass\" #confirm_pass_input=\"ngModel\" matchInput={{new_pass}}>                 <label for=\"Confirm_pass\">{{'Confirm new password'|translate}}</label>                  <div *ngIf=\"confirm_pass_input.invalid && (confirm_pass_input.dirty || confirm_pass_input.touched)\" class=\"ui-message ui-messages-error ui-corner-all\">                     <div *ngIf=\"confirm_pass_input.errors.matchInput\">                       {{'Password not matching'|translate}}                     </div>                   </div>             </span>           </div>           <div class=\"ui-g-12\">             <button pButton type=\"submit\" icon=\"fa ui-icon-send\" label=\"{{'Submit'}}\"></button>           </div>           <div class=\"ui-g-12\">             <a routerLink=\"/auth/login\">{{'Return to login'|translate}}</a>           </div>         </div>       </form>     </div>   </div> </div>"
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}(base_component_1.BaseComponent));
exports.ResetPasswordComponent = ResetPasswordComponent;

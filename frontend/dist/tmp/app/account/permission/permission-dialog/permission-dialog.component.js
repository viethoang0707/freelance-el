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
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var PermissionDialog = (function (_super) {
    __extends(PermissionDialog, _super);
    function PermissionDialog() {
        return _super.call(this) || this;
    }
    PermissionDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'permission-dialog',
            template: "<form novalidate (ngSubmit)=\"f.form.valid && save()\" #f=\"ngForm\" autocomplete=\"off\">     <p-dialog header=\"{{'Permission'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"600\" [responsive]=\"true\">         <div class=\"spinner\" [hidden]=\"!loading\"></div>         <div class=\"ui-g ui-fluid form-group\">             <div class=\"ui-g-12 \">                 <span class=\"md-inputfield\">                     <input type=\"text\" pInputText [(ngModel)]=\"object.name\" #name=\"ngModel\" name=\"name\" required>                     <label>{{'Name'|translate}}</label>                     <div *ngIf=\"name.invalid && (name.dirty || name.touched)\" class=\"ui-message ui-messages-error ui-corner-all\">                         <div *ngIf=\"name.errors.required\">                             {{'Name is required' | translate}}                         </div>                     </div>                 </span>             </div>         </div>         <p-footer>             <button type=\"submit\" pButton icon=\"fa-check\" label=\"{{'Save'|translate}}\" ></button>             <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>         </p-footer>     </p-dialog> </form>",
        }),
        __metadata("design:paramtypes", [])
    ], PermissionDialog);
    return PermissionDialog;
}(base_dialog_1.BaseDialog));
exports.PermissionDialog = PermissionDialog;

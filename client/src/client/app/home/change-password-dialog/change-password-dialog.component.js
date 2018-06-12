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
var ChangePasswordDialog = (function (_super) {
    __extends(ChangePasswordDialog, _super);
    function ChangePasswordDialog() {
        var _this = _super.call(this) || this;
        _this.new_pass = '';
        _this.old_pass = '';
        _this.display = false;
        return _this;
    }
    ChangePasswordDialog.prototype.show = function () {
        this.display = true;
    };
    ChangePasswordDialog.prototype.hide = function () {
        this.display = false;
    };
    ChangePasswordDialog.prototype.changePass = function () {
        var _this = this;
        this.authService.changePass(this.old_pass, this.new_pass).subscribe(function (resp) {
            if (resp.success) {
                _this.success('Action completed');
                _this.hide();
            }
            else {
                _this.success('Action failed');
            }
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ChangePasswordDialog.prototype, "old_pass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ChangePasswordDialog.prototype, "new_pass", void 0);
    ChangePasswordDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'change-password-dialog',
            templateUrl: 'change-password-dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], ChangePasswordDialog);
    return ChangePasswordDialog;
}(base_component_1.BaseComponent));
exports.ChangePasswordDialog = ChangePasswordDialog;
//# sourceMappingURL=change-password-dialog.component.js.map
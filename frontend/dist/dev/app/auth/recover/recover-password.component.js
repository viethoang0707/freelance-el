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
        _this.buildMode = "dev";
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
            templateUrl: 'recover-password.component.html'
        }),
        __metadata("design:paramtypes", [])
    ], RecoverPasswordComponent);
    return RecoverPasswordComponent;
}(base_component_1.BaseComponent));
exports.RecoverPasswordComponent = RecoverPasswordComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hdXRoL3JlY292ZXIvcmVjb3Zlci1wYXNzd29yZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXlEO0FBRXpELDhFQUE0RTtBQVU1RTtJQUE4Qyw0Q0FBYTtJQVF2RDtRQUFBLFlBQ0UsaUJBQU8sU0FDUjtRQVJPLGVBQVMsR0FBVyxtQkFBbUIsQ0FBQzs7SUFRaEQsQ0FBQztJQUVELDJDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsa0RBQWUsR0FBZjtRQUFBLGlCQU1DO1FBTEcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDaEYsS0FBSSxDQUFDLE9BQU8sQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1FBQzlFLENBQUMsRUFBRSxVQUFDLEdBQUc7WUFDTCxLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWpCUTtRQUFSLFlBQUssRUFBRTs7bUVBQXVCO0lBQ3RCO1FBQVIsWUFBSyxFQUFFOzs2REFBaUI7SUFMaEIsd0JBQXdCO1FBTnBDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixXQUFXLEVBQUUsaUNBQWlDO1NBQy9DLENBQUM7O09BRVcsd0JBQXdCLENBc0JwQztJQUFELCtCQUFDO0NBdEJELEFBc0JDLENBdEI2Qyw4QkFBYSxHQXNCMUQ7QUF0QlksNERBQXdCIiwiZmlsZSI6ImFwcC9hdXRoL3JlY292ZXIvcmVjb3Zlci1wYXNzd29yZC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2Nsb3VkL3Rva2VuLm1vZGVsJztcblxuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdyZWNvdmVyLXBhc3N3b3JkJyxcbiAgdGVtcGxhdGVVcmw6ICdyZWNvdmVyLXBhc3N3b3JkLmNvbXBvbmVudC5odG1sJ1xufSlcblxuZXhwb3J0IGNsYXNzIFJlY292ZXJQYXNzd29yZENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHJpdmF0ZSBidWlsZE1vZGU6IHN0cmluZyA9IFwiPCU9IEJVSUxEX1RZUEUgJT5cIjtcbiAgICBcbiAgICBASW5wdXQoKSByZWNvdmVyX2VtYWlsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgY2xvdWRpZDogc3RyaW5nO1xuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgXG4gICAgICBzdXBlcigpOyBcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbiAgICByZWNvdmVyUGFzc3dvcmQoKSB7XG4gICAgICAgIHRoaXMuYWNjQXBpU2VydmljZS5yZXNldFBhc3N3b3JkUmVxdWVzdCh0aGlzLnJlY292ZXJfZW1haWwsIHRoaXMuY2xvdWRpZCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3VjY2VzcygnSW5zdHJ1Y3Rpb24gdG8gcmVzZXQgcGFzc3dyb2Qgd2lsbCBiZSBzZW50IHRvIHlvdXIgZW1haWwuJyk7XG4gICAgICAgIH0sIChlcnIpPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3IoZXJyW1wibWVzc2FnZVwiXSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuIl19

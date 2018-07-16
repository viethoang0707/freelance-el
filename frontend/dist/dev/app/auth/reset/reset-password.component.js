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
        _this.buildMode = "dev";
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
            templateUrl: 'reset-password.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}(base_component_1.BaseComponent));
exports.ResetPasswordComponent = ResetPasswordComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hdXRoL3Jlc2V0L3Jlc2V0LXBhc3N3b3JkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUQ7QUFDekQsMENBQXlEO0FBQ3pELDhFQUE0RTtBQVU1RTtJQUE0QywwQ0FBYTtJQVN2RCxnQ0FBb0IsS0FBcUIsRUFBVSxNQUFjO1FBQWpFLFlBQ0UsaUJBQU8sU0FDUjtRQUZtQixXQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFlBQU0sR0FBTixNQUFNLENBQVE7UUFOekQsZUFBUyxHQUFXLG1CQUFtQixDQUFDOztJQVFoRCxDQUFDO0lBRUQseUNBQVEsR0FBUjtRQUFBLGlCQUlDO1FBSEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUNoQyxLQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw4Q0FBYSxHQUFiO1FBQUEsaUJBTUM7UUFMQyxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3pGLEtBQUksQ0FBQyxPQUFPLENBQUMsNENBQTRDLENBQUMsQ0FBQztRQUM3RCxDQUFDLEVBQUUsVUFBQyxHQUFHO1lBQ0wsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFwQlE7UUFBUixZQUFLLEVBQUU7OzREQUFrQjtJQUNqQjtRQUFSLFlBQUssRUFBRTs7Z0VBQXNCO0lBQ3JCO1FBQVIsWUFBSyxFQUFFOzsyREFBaUI7SUFQZCxzQkFBc0I7UUFObEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFdBQVcsRUFBRSwrQkFBK0I7U0FDN0MsQ0FBQzt5Q0FXMkIsdUJBQWMsRUFBa0IsZUFBTTtPQVR0RCxzQkFBc0IsQ0EwQmxDO0lBQUQsNkJBQUM7Q0ExQkQsQUEwQkMsQ0ExQjJDLDhCQUFhLEdBMEJ4RDtBQTFCWSx3REFBc0IiLCJmaWxlIjoiYXBwL2F1dGgvcmVzZXQvcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9jbG91ZC90b2tlbi5tb2RlbCc7XG5cblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAncmVzZXQtcGFzc3dvcmQnLFxuICB0ZW1wbGF0ZVVybDogJ3Jlc2V0LXBhc3N3b3JkLmNvbXBvbmVudC5odG1sJ1xufSlcblxuZXhwb3J0IGNsYXNzIFJlc2V0UGFzc3dvcmRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwcml2YXRlIHRva2VuOiBzdHJpbmc7XG4gIHByaXZhdGUgYnVpbGRNb2RlOiBzdHJpbmcgPSBcIjwlPSBCVUlMRF9UWVBFICU+XCI7XG5cbiAgQElucHV0KCkgbmV3X3Bhc3M6IHN0cmluZztcbiAgQElucHV0KCkgY29uZmlybV9wYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNsb3VkaWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgIHRoaXMudG9rZW4gPSBwYXJhbXNbJ3Rva2VuJ107XG4gICAgfSk7XG4gIH1cblxuICByZXNldFBhc3N3b3JkKCkge1xuICAgIHRoaXMuYWNjQXBpU2VydmljZS5yZXNldFBhc3N3b3JkRXhlY3V0ZSh0aGlzLnRva2VuLCB0aGlzLm5ld19wYXNzLCB0aGlzLmNsb3VkaWQpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnN1Y2Nlc3MoJ1lvdXIgcGFzc3dvcmQgaGFzIGJlZW4gcmVzZXQgc3VjY2Vzc2Z1bGx5LicpO1xuICAgIH0sIChlcnIpID0+IHtcbiAgICAgIHRoaXMuZXJyb3IoZXJyW1wibWVzc2FnZVwiXSk7XG4gICAgfSk7XG4gIH1cbn1cblxuIl19

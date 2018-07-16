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
var credential_model_1 = require("../../shared/models/credential.model");
var LoginComponent = (function (_super) {
    __extends(LoginComponent, _super);
    function LoginComponent(route, router) {
        var _this = _super.call(this) || this;
        _this.route = route;
        _this.router = router;
        _this.buildMode = "dev";
        _this.credential = new credential_model_1.Credential();
        return _this;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.credential = this.authService.StoredCredential || new credential_model_1.Credential();
        this.remember = this.authService.Remember;
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.authService.login(this.credential, this.cloudid).subscribe(function (resp) {
            var user = resp["user"];
            _this.appEvent.userLogin(user);
            _this.authService.Remember = _this.remember;
            if (_this.remember)
                _this.authService.StoredCredential = _this.credential;
            user.getPermission(_this).subscribe(function (permission) {
                _this.authService.UserPermission = permission;
                _this.router.navigate([_this.returnUrl]);
            });
        }, function (error) {
            _this.error('Login failed.');
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LoginComponent.prototype, "remember", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LoginComponent.prototype, "cloudid", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: 'login.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}(base_component_1.BaseComponent));
exports.LoginComponent = LoginComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hdXRoL2xvZ2luL2xvZ2luLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUQ7QUFDekQsMENBQXlEO0FBQ3pELDhFQUE0RTtBQUM1RSx5RUFBa0U7QUFhbEU7SUFBb0Msa0NBQWE7SUFTN0Msd0JBQW9CLEtBQXFCLEVBQVUsTUFBYztRQUFqRSxZQUNJLGlCQUFPLFNBRVY7UUFIbUIsV0FBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxZQUFNLEdBQU4sTUFBTSxDQUFRO1FBTHpELGVBQVMsR0FBVyxtQkFBbUIsQ0FBQztRQU81QyxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksNkJBQVUsRUFBRSxDQUFDOztJQUN2QyxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUNyRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLElBQUksSUFBSSw2QkFBVSxFQUFFLENBQUM7UUFDeEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztJQUM5QyxDQUFDO0lBRUQsOEJBQUssR0FBTDtRQUFBLGlCQWdCQztRQWZHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FDM0QsVUFBQSxJQUFJO1lBQ0EsSUFBSSxJQUFJLEdBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdCLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUM7WUFDMUMsSUFBSSxLQUFJLENBQUMsUUFBUTtnQkFDYixLQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUM7WUFDeEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxVQUFVO2dCQUN6QyxLQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUM7Z0JBQzdDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLEVBQ0QsVUFBQSxLQUFLO1lBQ0QsS0FBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUE5QlE7UUFBUixZQUFLLEVBQUU7O29EQUFtQjtJQUNsQjtRQUFSLFlBQUssRUFBRTs7bURBQWlCO0lBUGhCLGNBQWM7UUFOMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsT0FBTztZQUNqQixXQUFXLEVBQUUsc0JBQXNCO1NBQ3RDLENBQUM7eUNBVzZCLHVCQUFjLEVBQWtCLGVBQU07T0FUeEQsY0FBYyxDQXFDMUI7SUFBRCxxQkFBQztDQXJDRCxBQXFDQyxDQXJDbUMsOEJBQWEsR0FxQ2hEO0FBckNZLHdDQUFjIiwiZmlsZSI6ImFwcC9hdXRoL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDcmVkZW50aWFsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9jcmVkZW50aWFsLm1vZGVsJztcbmltcG9ydCB7IFNldHRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3NldHRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2RlbHMvY2xvdWQvdG9rZW4ubW9kZWwnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgUGVybWlzc2lvbiB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3Blcm1pc3Npb24ubW9kZWwnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnbG9naW4nLFxuICAgIHRlbXBsYXRlVXJsOiAnbG9naW4uY29tcG9uZW50Lmh0bWwnXG59KVxuXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHByaXZhdGUgY3JlZGVudGlhbDogQ3JlZGVudGlhbDtcbiAgICBwcml2YXRlIHJldHVyblVybDogc3RyaW5nO1xuICAgIHByaXZhdGUgYnVpbGRNb2RlOiBzdHJpbmcgPSBcIjwlPSBCVUlMRF9UWVBFICU+XCI7XG5cbiAgICBASW5wdXQoKSByZW1lbWJlcjogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBjbG91ZGlkOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmNyZWRlbnRpYWwgPSBuZXcgQ3JlZGVudGlhbCgpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnJldHVyblVybCA9IHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXNbJ3JldHVyblVybCddIHx8ICcvJztcbiAgICAgICAgdGhpcy5jcmVkZW50aWFsID0gdGhpcy5hdXRoU2VydmljZS5TdG9yZWRDcmVkZW50aWFsIHx8IG5ldyBDcmVkZW50aWFsKCk7XG4gICAgICAgIHRoaXMucmVtZW1iZXIgPSB0aGlzLmF1dGhTZXJ2aWNlLlJlbWVtYmVyO1xuICAgIH1cblxuICAgIGxvZ2luKCkge1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmxvZ2luKHRoaXMuY3JlZGVudGlhbCwgdGhpcy5jbG91ZGlkKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICByZXNwID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdXNlcjpVc2VyID0gcmVzcFtcInVzZXJcIl07XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBFdmVudC51c2VyTG9naW4odXNlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoU2VydmljZS5SZW1lbWJlciA9IHRoaXMucmVtZW1iZXI7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVtZW1iZXIpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2UuU3RvcmVkQ3JlZGVudGlhbCA9IHRoaXMuY3JlZGVudGlhbDtcbiAgICAgICAgICAgICAgICB1c2VyLmdldFBlcm1pc3Npb24odGhpcykuc3Vic2NyaWJlKHBlcm1pc3Npb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLlVzZXJQZXJtaXNzaW9uID0gcGVybWlzc2lvbjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMucmV0dXJuVXJsXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IoJ0xvZ2luIGZhaWxlZC4nKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbiJdfQ==

"use strict";
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
var auth_service_1 = require("../services/auth.service");
var AdminGuard = (function () {
    function AdminGuard(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    AdminGuard.prototype.canActivate = function (route, state) {
        if (this.authService.UserProfile && this.authService.UserProfile.IsAdmin) {
            return true;
        }
        this.router.navigate(['/home']);
        return false;
    };
    AdminGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService])
    ], AdminGuard);
    return AdminGuard;
}());
exports.AdminGuard = AdminGuard;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvZ3VhcmRzL2FkbWluLmd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLDBDQUFtRztBQUNuRyx5REFBc0Q7QUFHdEQ7SUFFSSxvQkFBb0IsTUFBYyxFQUFVLFdBQXdCO1FBQWhELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFJLENBQUM7SUFFekUsZ0NBQVcsR0FBWCxVQUFZLEtBQTZCLEVBQUUsS0FBMEI7UUFDakUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7WUFFdEUsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNoQyxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBWFEsVUFBVTtRQUR0QixpQkFBVSxFQUFFO3lDQUdtQixlQUFNLEVBQXVCLDBCQUFXO09BRjNELFVBQVUsQ0FZdEI7SUFBRCxpQkFBQztDQVpELEFBWUMsSUFBQTtBQVpZLGdDQUFVIiwiZmlsZSI6ImFwcC9zaGFyZWQvZ3VhcmRzL2FkbWluLmd1YXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBDYW5BY3RpdmF0ZSwgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUm91dGVyU3RhdGVTbmFwc2hvdCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBdXRoU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFkbWluR3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkgeyB9XG5cbiAgICBjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0aFNlcnZpY2UuVXNlclByb2ZpbGUgJiYgdGhpcy5hdXRoU2VydmljZS5Vc2VyUHJvZmlsZS5Jc0FkbWluKSB7XG4gICAgICAgICAgICAvLyBsb2dnZWQgaW4gc28gcmV0dXJuIHRydWVcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2hvbWUnXSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iXX0=

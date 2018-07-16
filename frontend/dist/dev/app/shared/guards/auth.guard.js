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
var AuthGuard = (function () {
    function AuthGuard(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (this.authService.UserProfile && this.authService.UserProfile.id && !this.authService.UserProfile.banned) {
            return true;
        }
        this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    AuthGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvZ3VhcmRzL2F1dGguZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MsMENBQW1HO0FBQ25HLHlEQUFzRDtBQUd0RDtJQUVJLG1CQUFvQixNQUFjLEVBQVUsV0FBd0I7UUFBaEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUksQ0FBQztJQUV6RSwrQkFBVyxHQUFYLFVBQVksS0FBNkIsRUFBRSxLQUEwQjtRQUNqRSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtZQUV6RyxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUMsQ0FBQyxDQUFDO1FBQzFFLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFYUSxTQUFTO1FBRHJCLGlCQUFVLEVBQUU7eUNBR21CLGVBQU0sRUFBdUIsMEJBQVc7T0FGM0QsU0FBUyxDQVlyQjtJQUFELGdCQUFDO0NBWkQsQUFZQyxJQUFBO0FBWlksOEJBQVMiLCJmaWxlIjoiYXBwL3NoYXJlZC9ndWFyZHMvYXV0aC5ndWFyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgQ2FuQWN0aXZhdGUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlU25hcHNob3QgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoR3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkgeyB9XG5cbiAgICBjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0aFNlcnZpY2UuVXNlclByb2ZpbGUgJiYgdGhpcy5hdXRoU2VydmljZS5Vc2VyUHJvZmlsZS5pZCAmJiAhdGhpcy5hdXRoU2VydmljZS5Vc2VyUHJvZmlsZS5iYW5uZWQpIHtcbiAgICAgICAgICAgIC8vIGxvZ2dlZCBpbiBzbyByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvYXV0aCddLCB7IHF1ZXJ5UGFyYW1zOiB7IHJldHVyblVybDogc3RhdGUudXJsIH19KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiJdfQ==

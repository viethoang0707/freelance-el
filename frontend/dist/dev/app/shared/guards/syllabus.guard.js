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
var Rx_1 = require("rxjs/Rx");
var router_1 = require("@angular/router");
var auth_service_1 = require("../services/auth.service");
var model_api_service_1 = require("../services/api/model-api.service");
var lms_profile_service_1 = require("../services/lms-profile.service");
var SyllabusGuard = (function () {
    function SyllabusGuard(apiService, authService, lmsService, router) {
        this.lmsService = lmsService;
        this.router = router;
        this.apiService = apiService;
        this.authService = authService;
    }
    SyllabusGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        var courseId = route.params.courseId;
        var memberId = route.params.memberId;
        if (!courseId || !memberId)
            return Rx_1.Observable.of(false);
        return this.lmsService.init(this)
            .map(function () {
            var member = _this.lmsService.courseMemberById(memberId);
            return member != null && (member.role == 'editor' || member.role == 'supervisor');
        }).catch(function () {
            return Rx_1.Observable.of(false);
        });
    };
    SyllabusGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [model_api_service_1.ModelAPIService, auth_service_1.AuthService, lms_profile_service_1.LMSProfileService, router_1.Router])
    ], SyllabusGuard);
    return SyllabusGuard;
}());
exports.SyllabusGuard = SyllabusGuard;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvZ3VhcmRzL3N5bGxhYnVzLmd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLDhCQUE4QztBQUM5QywwQ0FBbUc7QUFDbkcseURBQXVEO0FBQ3ZELHVFQUFvRTtBQUlwRSx1RUFBb0U7QUFHcEU7SUFLQyx1QkFBWSxVQUEyQixFQUFFLFdBQXdCLEVBQVUsVUFBNkIsRUFBVSxNQUFjO1FBQXJELGVBQVUsR0FBVixVQUFVLENBQW1CO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUMvSCxJQUFJLENBQUMsVUFBVSxHQUFJLFVBQVUsQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNoQyxDQUFDO0lBRUQsbUNBQVcsR0FBWCxVQUFZLEtBQTZCLEVBQUUsS0FBMEI7UUFBckUsaUJBWUM7UUFYQSxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNyQyxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUTtZQUN6QixPQUFPLGVBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDaEMsR0FBRyxDQUFDO1lBQ0osSUFBSSxNQUFNLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvQyxPQUFPLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBRSxNQUFNLENBQUMsSUFBSSxJQUFJLFFBQVEsSUFBSyxNQUFNLENBQUMsSUFBSSxJQUFJLFlBQVksQ0FBRSxDQUFDO1FBQ3pGLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNMLE9BQU8sZUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNWLENBQUM7SUF0QlcsYUFBYTtRQUR6QixpQkFBVSxFQUFFO3lDQU1ZLG1DQUFlLEVBQWUsMEJBQVcsRUFBc0IsdUNBQWlCLEVBQWtCLGVBQU07T0FMcEgsYUFBYSxDQXVCekI7SUFBRCxvQkFBQztDQXZCRCxBQXVCQyxJQUFBO0FBdkJZLHNDQUFhIiwiZmlsZSI6ImFwcC9zaGFyZWQvZ3VhcmRzL3N5bGxhYnVzLmd1YXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgUm91dGVyLCBDYW5BY3RpdmF0ZSwgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUm91dGVyU3RhdGVTbmFwc2hvdCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQVBJQ29udGV4dCB9IGZyb20gJy4uL21vZGVscy9jb250ZXh0JztcbmltcG9ydCB7IENvdXJzZU1lbWJlciB9IGZyb20gJy4uL21vZGVscy9lbGVhcm5pbmcvY291cnNlLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgTE1TUHJvZmlsZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9sbXMtcHJvZmlsZS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN5bGxhYnVzR3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSwgQVBJQ29udGV4dCB7XG5cblx0YXBpU2VydmljZTogTW9kZWxBUElTZXJ2aWNlO1xuXHRhdXRoU2VydmljZTogQXV0aFNlcnZpY2U7XG5cblx0Y29uc3RydWN0b3IoYXBpU2VydmljZTogTW9kZWxBUElTZXJ2aWNlLCBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIHByaXZhdGUgbG1zU2VydmljZTogTE1TUHJvZmlsZVNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcblx0XHR0aGlzLmFwaVNlcnZpY2UgPSAgYXBpU2VydmljZTtcblx0XHR0aGlzLmF1dGhTZXJ2aWNlID0gYXV0aFNlcnZpY2U7XG5cdH1cblxuXHRjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpIHtcblx0XHR2YXIgY291cnNlSWQgPSByb3V0ZS5wYXJhbXMuY291cnNlSWQ7XG5cdFx0dmFyIG1lbWJlcklkID0gcm91dGUucGFyYW1zLm1lbWJlcklkO1xuXHRcdGlmICghY291cnNlSWQgfHwgIW1lbWJlcklkKVxuXHRcdFx0cmV0dXJuIE9ic2VydmFibGUub2YoZmFsc2UpO1xuXHRcdHJldHVybiB0aGlzLmxtc1NlcnZpY2UuaW5pdCh0aGlzKVxuXHRcdC5tYXAoKCk9PiB7XG5cdFx0XHR2YXIgbWVtYmVyID0gdGhpcy5sbXNTZXJ2aWNlLmNvdXJzZU1lbWJlckJ5SWQobWVtYmVySWQpO1xuICAgICAgICAgICAgcmV0dXJuIG1lbWJlciAhPSBudWxsICYmICggbWVtYmVyLnJvbGUgPT0gJ2VkaXRvcicgfHwgIG1lbWJlci5yb2xlID09ICdzdXBlcnZpc29yJyApO1xuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihmYWxzZSk7XG4gICAgICAgIH0pO1xuXHR9XG59Il19

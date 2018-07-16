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
var ExamGuard = (function () {
    function ExamGuard(apiService, authService, lmsService, router) {
        this.lmsService = lmsService;
        this.router = router;
        this.apiService = apiService;
        this.authService = authService;
    }
    ExamGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        var examId = route.params.examId;
        var memberId = route.params.memberId;
        if (!examId || !memberId)
            return Rx_1.Observable.of(false);
        return this.lmsService.init(this)
            .map(function () {
            var member = _this.lmsService.examMemberById(memberId);
            return member != null && (member.role == 'editor' || member.role == 'supervisor');
        }).catch(function () {
            return Rx_1.Observable.of(false);
        });
    };
    ExamGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [model_api_service_1.ModelAPIService, auth_service_1.AuthService, lms_profile_service_1.LMSProfileService, router_1.Router])
    ], ExamGuard);
    return ExamGuard;
}());
exports.ExamGuard = ExamGuard;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvZ3VhcmRzL2V4YW0uZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MsOEJBQThDO0FBQzlDLDBDQUFtRztBQUNuRyx5REFBdUQ7QUFDdkQsdUVBQW9FO0FBSXBFLHVFQUFvRTtBQUdwRTtJQUtDLG1CQUFZLFVBQTJCLEVBQUUsV0FBd0IsRUFBVSxVQUE2QixFQUFVLE1BQWM7UUFBckQsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQy9ILElBQUksQ0FBQyxVQUFVLEdBQUksVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ2hDLENBQUM7SUFFRCwrQkFBVyxHQUFYLFVBQVksS0FBNkIsRUFBRSxLQUEwQjtRQUFyRSxpQkFZQztRQVhBLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2pDLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLE9BQU8sZUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNoQyxHQUFHLENBQUM7WUFDSixJQUFJLE1BQU0sR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QyxPQUFPLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBRSxNQUFNLENBQUMsSUFBSSxJQUFJLFFBQVEsSUFBSyxNQUFNLENBQUMsSUFBSSxJQUFJLFlBQVksQ0FBRSxDQUFDO1FBQ3pGLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNMLE9BQU8sZUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNWLENBQUM7SUF0QlcsU0FBUztRQURyQixpQkFBVSxFQUFFO3lDQU1ZLG1DQUFlLEVBQWUsMEJBQVcsRUFBc0IsdUNBQWlCLEVBQWtCLGVBQU07T0FMcEgsU0FBUyxDQXVCckI7SUFBRCxnQkFBQztDQXZCRCxBQXVCQyxJQUFBO0FBdkJZLDhCQUFTIiwiZmlsZSI6ImFwcC9zaGFyZWQvZ3VhcmRzL2V4YW0uZ3VhcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBSb3V0ZXIsIENhbkFjdGl2YXRlLCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSb3V0ZXJTdGF0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBUElDb250ZXh0IH0gZnJvbSAnLi4vbW9kZWxzL2NvbnRleHQnO1xuaW1wb3J0IHsgRXhhbU1lbWJlciB9IGZyb20gJy4uL21vZGVscy9lbGVhcm5pbmcvZXhhbS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IExNU1Byb2ZpbGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbG1zLXByb2ZpbGUuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFeGFtR3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSwgQVBJQ29udGV4dCB7XG5cblx0YXBpU2VydmljZTogTW9kZWxBUElTZXJ2aWNlO1xuXHRhdXRoU2VydmljZTogQXV0aFNlcnZpY2U7XG5cblx0Y29uc3RydWN0b3IoYXBpU2VydmljZTogTW9kZWxBUElTZXJ2aWNlLCBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIHByaXZhdGUgbG1zU2VydmljZTogTE1TUHJvZmlsZVNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcblx0XHR0aGlzLmFwaVNlcnZpY2UgPSAgYXBpU2VydmljZTtcblx0XHR0aGlzLmF1dGhTZXJ2aWNlID0gYXV0aFNlcnZpY2U7XG5cdH1cblxuXHRjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpIHtcblx0XHR2YXIgZXhhbUlkID0gcm91dGUucGFyYW1zLmV4YW1JZDtcblx0XHR2YXIgbWVtYmVySWQgPSByb3V0ZS5wYXJhbXMubWVtYmVySWQ7XG5cdFx0aWYgKCFleGFtSWQgfHwgIW1lbWJlcklkKVxuXHRcdFx0cmV0dXJuIE9ic2VydmFibGUub2YoZmFsc2UpO1xuXHRcdHJldHVybiB0aGlzLmxtc1NlcnZpY2UuaW5pdCh0aGlzKVxuXHRcdC5tYXAoKCk9PiB7XG5cdFx0XHR2YXIgbWVtYmVyID0gdGhpcy5sbXNTZXJ2aWNlLmV4YW1NZW1iZXJCeUlkKG1lbWJlcklkKTtcbiAgICAgICAgICAgIHJldHVybiBtZW1iZXIgIT0gbnVsbCAmJiAoIG1lbWJlci5yb2xlID09ICdlZGl0b3InIHx8ICBtZW1iZXIucm9sZSA9PSAnc3VwZXJ2aXNvcicgKTtcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YoZmFsc2UpO1xuICAgICAgICB9KTtcblx0fVxufSJdfQ==

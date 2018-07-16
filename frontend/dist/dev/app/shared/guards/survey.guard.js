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
var SurveyGuard = (function () {
    function SurveyGuard(apiService, authService, lmsService, router) {
        this.lmsService = lmsService;
        this.router = router;
        this.apiService = apiService;
        this.authService = authService;
    }
    SurveyGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        var surveyId = route.params.surveyId;
        var memberId = route.params.memberId;
        if (!surveyId || !memberId)
            return Rx_1.Observable.of(false);
        return this.lmsService.init(this)
            .map(function () {
            var member = _this.lmsService.surveyMemberById(memberId);
            return member != null && (member.role == 'editor' || member.role == 'supervisor');
        }).catch(function () {
            return Rx_1.Observable.of(false);
        });
    };
    SurveyGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [model_api_service_1.ModelAPIService, auth_service_1.AuthService, lms_profile_service_1.LMSProfileService, router_1.Router])
    ], SurveyGuard);
    return SurveyGuard;
}());
exports.SurveyGuard = SurveyGuard;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvZ3VhcmRzL3N1cnZleS5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyw4QkFBOEM7QUFDOUMsMENBQW1HO0FBQ25HLHlEQUF1RDtBQUN2RCx1RUFBb0U7QUFJcEUsdUVBQW9FO0FBR3BFO0lBS0MscUJBQVksVUFBMkIsRUFBRSxXQUF3QixFQUFVLFVBQTZCLEVBQVUsTUFBYztRQUFyRCxlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDL0gsSUFBSSxDQUFDLFVBQVUsR0FBSSxVQUFVLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDaEMsQ0FBQztJQUVELGlDQUFXLEdBQVgsVUFBWSxLQUE2QixFQUFFLEtBQTBCO1FBQXJFLGlCQVlDO1FBWEEsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDckMsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVE7WUFDekIsT0FBTyxlQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2hDLEdBQUcsQ0FBQztZQUNKLElBQUksTUFBTSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0MsT0FBTyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUUsTUFBTSxDQUFDLElBQUksSUFBSSxRQUFRLElBQUssTUFBTSxDQUFDLElBQUksSUFBSSxZQUFZLENBQUUsQ0FBQztRQUN6RixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDTCxPQUFPLGVBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDVixDQUFDO0lBdEJXLFdBQVc7UUFEdkIsaUJBQVUsRUFBRTt5Q0FNWSxtQ0FBZSxFQUFlLDBCQUFXLEVBQXNCLHVDQUFpQixFQUFrQixlQUFNO09BTHBILFdBQVcsQ0F1QnZCO0lBQUQsa0JBQUM7Q0F2QkQsQUF1QkMsSUFBQTtBQXZCWSxrQ0FBVyIsImZpbGUiOiJhcHAvc2hhcmVkL2d1YXJkcy9zdXJ2ZXkuZ3VhcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBSb3V0ZXIsIENhbkFjdGl2YXRlLCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSb3V0ZXJTdGF0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBUElDb250ZXh0IH0gZnJvbSAnLi4vbW9kZWxzL2NvbnRleHQnO1xuaW1wb3J0IHsgU3VydmV5TWVtYmVyIH0gZnJvbSAnLi4vbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXktbWVtYmVyLm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBMTVNQcm9maWxlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2xtcy1wcm9maWxlLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3VydmV5R3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSwgQVBJQ29udGV4dCB7XG5cblx0YXBpU2VydmljZTogTW9kZWxBUElTZXJ2aWNlO1xuXHRhdXRoU2VydmljZTogQXV0aFNlcnZpY2U7XG5cblx0Y29uc3RydWN0b3IoYXBpU2VydmljZTogTW9kZWxBUElTZXJ2aWNlLCBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIHByaXZhdGUgbG1zU2VydmljZTogTE1TUHJvZmlsZVNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcblx0XHR0aGlzLmFwaVNlcnZpY2UgPSAgYXBpU2VydmljZTtcblx0XHR0aGlzLmF1dGhTZXJ2aWNlID0gYXV0aFNlcnZpY2U7XG5cdH1cblxuXHRjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpIHtcblx0XHR2YXIgc3VydmV5SWQgPSByb3V0ZS5wYXJhbXMuc3VydmV5SWQ7XG5cdFx0dmFyIG1lbWJlcklkID0gcm91dGUucGFyYW1zLm1lbWJlcklkO1xuXHRcdGlmICghc3VydmV5SWQgfHwgIW1lbWJlcklkKVxuXHRcdFx0cmV0dXJuIE9ic2VydmFibGUub2YoZmFsc2UpO1xuXHRcdHJldHVybiB0aGlzLmxtc1NlcnZpY2UuaW5pdCh0aGlzKVxuXHRcdC5tYXAoKCk9PiB7XG5cdFx0XHR2YXIgbWVtYmVyID0gdGhpcy5sbXNTZXJ2aWNlLnN1cnZleU1lbWJlckJ5SWQobWVtYmVySWQpO1xuICAgICAgICAgICAgcmV0dXJuIG1lbWJlciAhPSBudWxsICYmICggbWVtYmVyLnJvbGUgPT0gJ2VkaXRvcicgfHwgIG1lbWJlci5yb2xlID09ICdzdXBlcnZpc29yJyApO1xuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihmYWxzZSk7XG4gICAgICAgIH0pO1xuXHR9XG59Il19

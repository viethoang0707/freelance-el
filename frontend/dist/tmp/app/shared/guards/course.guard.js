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
var CourseGuard = (function () {
    function CourseGuard(apiService, authService, lmsService, router) {
        this.lmsService = lmsService;
        this.router = router;
        this.apiService = apiService;
        this.authService = authService;
    }
    CourseGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        var courseId = route.params.courseId;
        var memberId = route.params.memberId;
        if (!courseId || !memberId)
            return Rx_1.Observable.of(false);
        return this.lmsService.init(this)
            .map(function () {
            var member = _this.lmsService.courseMemberById(memberId);
            return member != null && (member.role == 'teacher' || member.role == 'supervisor');
        }).catch(function () {
            return Rx_1.Observable.of(false);
        });
    };
    CourseGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [model_api_service_1.ModelAPIService, auth_service_1.AuthService, lms_profile_service_1.LMSProfileService, router_1.Router])
    ], CourseGuard);
    return CourseGuard;
}());
exports.CourseGuard = CourseGuard;

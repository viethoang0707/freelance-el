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
var api_service_1 = require("../services/api.service");
var exam_member_model_1 = require("../models/elearning/exam-member.model");
var SupervisorGuard = (function () {
    function SupervisorGuard(apiService, authService, router) {
        this.router = router;
        this.apiService = apiService;
        this.authService = authService;
        this.dataAccessService = dataAccessService;
    }
    SupervisorGuard.prototype.canActivate = function (route, state) {
        var examId = route.params.examId;
        if (!examId)
            return Rx_1.Observable.of(false);
        return exam_member_model_1.ExamMember.byExamAndUser(this, this.authService.UserProfile.id, examId)
            .map(function (member) {
            if (member && member.role == 'supervisor') {
                return true;
            }
            else
                return false;
        }).catch(function () {
            return Rx_1.Observable.of(false);
        });
    };
    SupervisorGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.APIService, auth_service_1.AuthService, router_1.Router])
    ], SupervisorGuard);
    return SupervisorGuard;
}());
exports.SupervisorGuard = SupervisorGuard;
//# sourceMappingURL=supervisor.guard.js.map
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
var env_config_1 = require("../../env.config");
require("rxjs/add/operator/map");
var windonw_ref_1 = require("../helpers/windonw.ref");
var auth_service_1 = require("../services/auth.service");
var MeetingService = (function () {
    function MeetingService(winRef, authService) {
        this.winRef = winRef;
        this.authService = authService;
        this.nativeWindow = winRef.getNativeWindow();
    }
    MeetingService.prototype.join = function (room_ref, member_ref) {
        this.nativeWindow.open(env_config_1.Config.CONFERENCE_ENDPOINT + "?room=" + room_ref + "&member=" + member_ref + "&cloudid=" + this.authService.CloudAcc.id);
    };
    MeetingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [windonw_ref_1.WindowRef, auth_service_1.AuthService])
    ], MeetingService);
    return MeetingService;
}());
exports.MeetingService = MeetingService;
//# sourceMappingURL=meeting.service.js.map
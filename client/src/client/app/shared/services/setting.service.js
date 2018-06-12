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
var auth_service_1 = require("./auth.service");
require("rxjs/add/operator/map");
var Rx_1 = require("rxjs/Rx");
var constants_1 = require("../models/constants");
var SettingService = (function () {
    function SettingService(authService) {
        this.authService = authService;
        this.viewModeEventReceiver = new Rx_1.Subject();
        this.viewModeEvents = this.viewModeEventReceiver.asObservable();
    }
    Object.defineProperty(SettingService.prototype, "ViewMode", {
        get: function () {
            if (this.viewMode)
                return this.viewMode;
            if (this.authService.UserProfile)
                return this.authService.UserProfile.IsAdmin ? 'admin' : 'lms';
            return null;
        },
        set: function (data) {
            this.viewMode = data;
            this.viewModeEventReceiver.next(data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingService.prototype, "Lang", {
        get: function () {
            if (localStorage.getItem('language'))
                return localStorage.getItem('language');
            else
                return constants_1.DEFAULT_LANG;
        },
        set: function (lang) {
            localStorage.setItem('language', lang);
        },
        enumerable: true,
        configurable: true
    });
    SettingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [auth_service_1.AuthService])
    ], SettingService);
    return SettingService;
}());
exports.SettingService = SettingService;
//# sourceMappingURL=setting.service.js.map
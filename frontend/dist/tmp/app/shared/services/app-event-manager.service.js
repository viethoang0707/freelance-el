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
require("rxjs/add/operator/mergeMap");
var AppEventManager = (function () {
    function AppEventManager() {
        this.onStartHTTPReceiver = new Rx_1.Subject();
        this.onFinishHTTPReceiver = new Rx_1.Subject();
        this.onLoginReceiver = new Rx_1.Subject();
        this.onLogoutReceiver = new Rx_1.Subject();
        this.onTokenExpiredReceiver = new Rx_1.Subject();
        this.onUnauthorizedAccessReceiver = new Rx_1.Subject();
        this.onStartHTTP = this.onStartHTTPReceiver.asObservable();
        this.onFinishHTTP = this.onFinishHTTPReceiver.asObservable();
        this.onLogin = this.onLoginReceiver.asObservable();
        this.onLogout = this.onLogoutReceiver.asObservable();
        this.onTokenExpired = this.onTokenExpiredReceiver.asObservable();
        this.onUnauthorizedAccess = this.onUnauthorizedAccessReceiver.asObservable();
    }
    AppEventManager.prototype.startHttpTransaction = function () {
        this.onStartHTTPReceiver.next();
    };
    AppEventManager.prototype.finishHttpTransaction = function () {
        this.onFinishHTTPReceiver.next();
    };
    AppEventManager.prototype.userLogin = function (user) {
        this.onLoginReceiver.next(user);
    };
    AppEventManager.prototype.userLogout = function () {
        this.onLogoutReceiver.next();
    };
    AppEventManager.prototype.tokenExpired = function () {
        this.onTokenExpiredReceiver.next();
    };
    AppEventManager.prototype.accessDenied = function () {
        this.onUnauthorizedAccessReceiver.next();
    };
    AppEventManager = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], AppEventManager);
    return AppEventManager;
}());
exports.AppEventManager = AppEventManager;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var Rx_1 = require("rxjs/Rx");
var HomeEventManager = (function () {
    function HomeEventManager() {
        this.showProfileEventReceiver = new Rx_1.Subject();
        this.changePasswordEventReceiver = new Rx_1.Subject();
        this.logoutEventReceiver = new Rx_1.Subject();
        this.menuEventReceiver = new Rx_1.Subject();
        this.topbarMenuEventReceiver = new Rx_1.Subject();
        this.topbarMobileMenuEventReceiver = new Rx_1.Subject();
        this.topbarRootItemEventReceiver = new Rx_1.Subject();
        this.sidebarEventReceiver = new Rx_1.Subject();
        this.toggleMenuEventReceiver = new Rx_1.Subject();
        this.switchViewModeEventReceiver = new Rx_1.Subject();
        this.showProfileEvents = this.showProfileEventReceiver.asObservable();
        this.changePasswordEvents = this.changePasswordEventReceiver.asObservable();
        this.logoutEvents = this.logoutEventReceiver.asObservable();
        this.topbarMenuEvents = this.topbarMenuEventReceiver.asObservable();
        this.topbarMobileMenuEvents = this.topbarMobileMenuEventReceiver.asObservable();
        this.menuEvents = this.menuEventReceiver.asObservable();
        this.topbarRootItemEvents = this.topbarRootItemEventReceiver.asObservable();
        this.sidebarEvents = this.sidebarEventReceiver.asObservable();
        this.toggleMenuEvents = this.toggleMenuEventReceiver.asObservable();
        this.switchViewModeEvents = this.switchViewModeEventReceiver.asObservable();
    }
    HomeEventManager.prototype.showProfile = function () {
        this.showProfileEventReceiver.next();
    };
    HomeEventManager.prototype.changePassword = function () {
        this.changePasswordEventReceiver.next();
    };
    HomeEventManager.prototype.logout = function () {
        this.logoutEventReceiver.next();
    };
    HomeEventManager.prototype.topbarMenuClick = function () {
        this.topbarMenuEventReceiver.next();
    };
    HomeEventManager.prototype.topbarMobileMenuClick = function () {
        this.topbarMobileMenuEventReceiver.next();
    };
    HomeEventManager.prototype.menuClick = function () {
        this.menuEventReceiver.next();
    };
    HomeEventManager.prototype.topbarRootItemClick = function (profile) {
        this.topbarRootItemEventReceiver.next(profile);
    };
    HomeEventManager.prototype.sidebarClick = function () {
        this.sidebarEventReceiver.next();
    };
    HomeEventManager.prototype.toggleMenuClick = function () {
        this.toggleMenuEventReceiver.next();
    };
    HomeEventManager.prototype.swithViewMode = function (isAdmin) {
        this.switchViewModeEventReceiver.next(isAdmin);
    };
    HomeEventManager = __decorate([
        core_1.Injectable()
    ], HomeEventManager);
    return HomeEventManager;
}());
exports.HomeEventManager = HomeEventManager;
//# sourceMappingURL=home-manager.service.js.map
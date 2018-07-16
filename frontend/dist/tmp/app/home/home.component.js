"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var base_component_1 = require("../shared/components/base/base.component");
var home_manager_service_1 = require("./home-manager.service");
var profile_dialog_component_1 = require("../account/user/profile-dialog/profile-dialog.component");
var log_model_1 = require("../shared/models/elearning/log.model");
var group_model_1 = require("../shared/models/elearning/group.model");
var base_model_1 = require("../shared/models/base.model");
var HomeComponent = (function (_super) {
    __extends(HomeComponent, _super);
    function HomeComponent(router, eventManager) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.eventManager = eventManager;
        _this.appEvent.onTokenExpired.subscribe(function () {
            _this.warn('Your token has been expired');
            _this.authService.logout();
            _this.router.navigate(['/auth']);
        });
        _this.appEvent.onLogout.subscribe(function () {
            log_model_1.UserLog.logout(_this, _this.ContextUser.id).subscribe();
            _this.authService.logout();
            _this.router.navigate(['/auth']);
        });
        _this.appEvent.onLogin.subscribe(function (user) {
            log_model_1.UserLog.login(_this, user.id).subscribe();
            _this.success("Hello " + user.name);
            _this.settingService.ViewMode = user.IsAdmin ? 'admin' : 'lms';
        });
        _this.appEvent.onUnauthorizedAccess.subscribe(function () {
            _this.error('Access denied. You must login again!');
            _this.authService.logout();
        });
        return _this;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.router.navigate(['/dashboard']);
        base_model_1.BaseModel.bulk_search(this, group_model_1.Group.__api__all()).subscribe();
    };
    HomeComponent.prototype.onWrapperClick = function () {
        if (!this.menuClick && !this.menuButtonClick) {
            this.mobileMenuActive = false;
        }
        if (!this.topbarMenuClick && !this.topbarMenuButtonClick) {
            this.topbarMenuActive = false;
            this.activeTopbarItem = null;
        }
        this.menuClick = false;
        this.menuButtonClick = false;
        this.topbarMenuClick = false;
        this.topbarMenuButtonClick = false;
    };
    HomeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.eventManager.showProfileEvents.subscribe(function () {
            _this.userProfileDialog.show(_this.ContextUser);
        });
        this.eventManager.topbarMenuEvents.subscribe(function () {
            _this.topbarMenuClick = true;
        });
        this.eventManager.topbarRootItemEvents.subscribe(function (item) {
            if (_this.activeTopbarItem === item) {
                _this.activeTopbarItem = null;
            }
            else {
                _this.activeTopbarItem = item;
            }
        });
        this.eventManager.menuEvents.subscribe(function () {
            _this.menuButtonClick = true;
            if (_this.isMobile()) {
                _this.mobileMenuActive = !_this.mobileMenuActive;
            }
        });
        this.eventManager.topbarMobileMenuEvents.subscribe(function () {
            _this.topbarMenuButtonClick = true;
            _this.topbarMenuActive = !_this.topbarMenuActive;
        });
        this.eventManager.sidebarEvents.subscribe(function () {
            _this.menuClick = true;
        });
        this.eventManager.toggleMenuEvents.subscribe(function () {
            _this.layoutStatic = !_this.layoutStatic;
        });
    };
    HomeComponent.prototype.isMobile = function () {
        return window.innerWidth < 640;
    };
    __decorate([
        core_1.ViewChild(profile_dialog_component_1.UserProfileDialog),
        __metadata("design:type", profile_dialog_component_1.UserProfileDialog)
    ], HomeComponent.prototype, "userProfileDialog", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-home',
            template: "<div class=\"layout-wrapper\" (click)=\"onWrapperClick()\" [ngClass]=\"{'layout-wrapper-static': layoutStatic,     'layout-wrapper-active': mobileMenuActive}\">     <app-menu></app-menu>     <div class=\"layout-main\">         <app-navbar></app-navbar>         <app-breadcrumb></app-breadcrumb>         <div class=\"layout-content\">             <p-growl ></p-growl>             <router-outlet>             </router-outlet>             <div class=\"footer\">                 <app-footer></app-footer>             </div>         </div>         <div class=\"layout-main-mask\" *ngIf=\"mobileMenuActive\"></div>     </div> </div> <p-confirmDialog header=\"{{'Confirmation'|translate}}\" width=\"300\"></p-confirmDialog> <user-profile-dialog></user-profile-dialog>",
            styles: [""],
        }),
        __metadata("design:paramtypes", [router_1.Router, home_manager_service_1.HomeEventManager])
    ], HomeComponent);
    return HomeComponent;
}(base_component_1.BaseComponent));
exports.HomeComponent = HomeComponent;

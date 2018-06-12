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
var change_password_dialog_component_1 = require("./change-password-dialog/change-password-dialog.component");
var base_component_1 = require("../shared/components/base/base.component");
var home_manager_service_1 = require("./home-manager.service");
var profile_dialog_component_1 = require("../account/user/profile-dialog/profile-dialog.component");
var loading_service_1 = require("../shared/services/loading.service");
var log_model_1 = require("../shared/models/elearning/log.model");
var HomeComponent = (function (_super) {
    __extends(HomeComponent, _super);
    function HomeComponent(router, eventManager, loadingService) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.eventManager = eventManager;
        _this.loading = false;
        loadingService.onStart.subscribe(function () {
            _this.loading = true;
        });
        loadingService.onFinish.subscribe(function () {
            _this.loading = false;
        });
        router.navigate(['/dashboard']);
        return _this;
    }
    HomeComponent.prototype.ngOnInit = function () {
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
        this.eventManager.changePasswordEvents.subscribe(function () {
            _this.passwordDialog.show();
        });
        this.eventManager.showProfileEvents.subscribe(function () {
            var user = _this.authService.UserProfile;
            _this.userProfileDialog.show(user);
        });
        this.eventManager.logoutEvents.subscribe(function () {
            log_model_1.UserLog.logout(_this, _this.authService.UserProfile.id).subscribe();
            _this.authService.logout();
            _this.router.navigate(['/auth']);
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
        core_1.ViewChild(change_password_dialog_component_1.ChangePasswordDialog),
        __metadata("design:type", change_password_dialog_component_1.ChangePasswordDialog)
    ], HomeComponent.prototype, "passwordDialog", void 0);
    __decorate([
        core_1.ViewChild(profile_dialog_component_1.UserProfileDialog),
        __metadata("design:type", profile_dialog_component_1.UserProfileDialog)
    ], HomeComponent.prototype, "userProfileDialog", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-home',
            templateUrl: 'home.component.html',
            styleUrls: ['home.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.Router, home_manager_service_1.HomeEventManager, loading_service_1.LoadingService])
    ], HomeComponent);
    return HomeComponent;
}(base_component_1.BaseComponent));
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map
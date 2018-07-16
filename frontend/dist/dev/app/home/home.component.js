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
            templateUrl: 'home.component.html',
            styleUrls: ['home.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.Router, home_manager_service_1.HomeEventManager])
    ], HomeComponent);
    return HomeComponent;
}(base_component_1.BaseComponent));
exports.HomeComponent = HomeComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2hvbWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFrRztBQUNsRywwQ0FBeUQ7QUFFekQsMkVBQXlFO0FBRXpFLCtEQUEwRDtBQUMxRCxvR0FBNEY7QUFFNUYsa0VBQStEO0FBQy9ELHNFQUErRDtBQUMvRCwwREFBd0Q7QUFTeEQ7SUFBbUMsaUNBQWE7SUFlNUMsdUJBQXFCLE1BQWMsRUFBVSxZQUE4QjtRQUEzRSxZQUNJLGlCQUFPLFNBb0JWO1FBckJvQixZQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsa0JBQVksR0FBWixZQUFZLENBQWtCO1FBRXZFLEtBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztZQUNuQyxLQUFJLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDekMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMxQixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7WUFDN0IsbUJBQU8sQ0FBQyxNQUFNLENBQUMsS0FBSSxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdEQsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMxQixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFTO1lBQ3RDLG1CQUFPLENBQUMsS0FBSyxDQUFDLEtBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxD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QUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO1lBQ3RDLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7WUFDekMsS0FBSSxDQUFDLFlBQVksR0FBRyxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0QsZ0NBQVEsR0FBUjtRQUNJLE9BQU8sTUFBTSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7SUFDbkMsQ0FBQztJQTdGNkI7UUFBN0IsZ0JBQVMsQ0FBQyw0Q0FBaUIsQ0FBQztrQ0FBb0IsNENBQWlCOzREQUFDO0lBRjFELGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUscUJBQXFCO1lBQ2xDLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDO1NBQ3BDLENBQUM7eUNBZ0IrQixlQUFNLEVBQXdCLHVDQUFnQjtPQWZsRSxhQUFhLENBaUd6QjtJQUFELG9CQUFDO0NBakdELEFBaUdDLENBakdrQyw4QkFBYSxHQWlHL0M7QUFqR1ksc0NBQWEiLCJmaWxlIjoiYXBwL2hvbWUvaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFJlbmRlcmVyLCBPbkluaXQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IEhvbWVFdmVudE1hbmFnZXIgfSBmcm9tICcuL2hvbWUtbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJQcm9maWxlRGlhbG9nIH0gZnJvbSAnLi4vYWNjb3VudC91c2VyL3Byb2ZpbGUtZGlhbG9nL3Byb2ZpbGUtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBcHBFdmVudE1hbmFnZXIgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvYXBwLWV2ZW50LW1hbmFnZXIuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyTG9nIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvbG9nLm1vZGVsJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2FwcC1ob21lJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2hvbWUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydob21lLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG4gICAgQFZpZXdDaGlsZChVc2VyUHJvZmlsZURpYWxvZykgdXNlclByb2ZpbGVEaWFsb2c6IFVzZXJQcm9maWxlRGlhbG9nO1xuXG4gICAgbWVudUNsaWNrOiBib29sZWFuO1xuICAgIG1lbnVCdXR0b25DbGljazogYm9vbGVhbjtcbiAgICB0b3BiYXJNZW51QnV0dG9uQ2xpY2s6IGJvb2xlYW47XG4gICAgdG9wYmFyTWVudUNsaWNrOiBib29sZWFuO1xuICAgIHRvcGJhck1lbnVBY3RpdmU6IGJvb2xlYW47XG4gICAgYWN0aXZlVG9wYmFySXRlbTogRWxlbWVudDtcbiAgICBsYXlvdXRTdGF0aWM6IGJvb2xlYW47XG4gICAgc2lkZWJhckFjdGl2ZTogYm9vbGVhbjtcbiAgICBtb2JpbGVNZW51QWN0aXZlOiBib29sZWFuO1xuICAgIGRhcmtNZW51OiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZXZlbnRNYW5hZ2VyIDpIb21lRXZlbnRNYW5hZ2VyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYXBwRXZlbnQub25Ub2tlbkV4cGlyZWQuc3Vic2NyaWJlKCgpPT4ge1xuICAgICAgICAgICAgdGhpcy53YXJuKCdZb3VyIHRva2VuIGhhcyBiZWVuIGV4cGlyZWQnKTtcbiAgICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2UubG9nb3V0KCk7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9hdXRoJ10pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hcHBFdmVudC5vbkxvZ291dC5zdWJzY3JpYmUoKCk9PiB7XG4gICAgICAgICAgICBVc2VyTG9nLmxvZ291dCh0aGlzLCB0aGlzLkNvbnRleHRVc2VyLmlkKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2UubG9nb3V0KCk7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9hdXRoJ10pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hcHBFdmVudC5vbkxvZ2luLnN1YnNjcmliZSgodXNlcjpVc2VyKT0+IHtcbiAgICAgICAgICAgIFVzZXJMb2cubG9naW4odGhpcywgdXNlci5pZCkuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3MoYEhlbGxvICR7dXNlci5uYW1lfWApXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdTZXJ2aWNlLlZpZXdNb2RlID0gIHVzZXIuSXNBZG1pbj8nYWRtaW4nOidsbXMnXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFwcEV2ZW50Lm9uVW5hdXRob3JpemVkQWNjZXNzLnN1YnNjcmliZSgoKT0+IHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoJ0FjY2VzcyBkZW5pZWQuIFlvdSBtdXN0IGxvZ2luIGFnYWluIScpXG4gICAgICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmxvZ291dCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy8gRmlsbCB0aGUgY2FjaGVcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xuICAgICAgICBCYXNlTW9kZWwuYnVsa19zZWFyY2godGhpcyxHcm91cC5fX2FwaV9fYWxsKCkpLnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIG9uV3JhcHBlckNsaWNrKCkge1xuICAgICAgICBpZiAoIXRoaXMubWVudUNsaWNrICYmICF0aGlzLm1lbnVCdXR0b25DbGljaykge1xuICAgICAgICAgICAgdGhpcy5tb2JpbGVNZW51QWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMudG9wYmFyTWVudUNsaWNrICYmICF0aGlzLnRvcGJhck1lbnVCdXR0b25DbGljaykge1xuICAgICAgICAgICAgdGhpcy50b3BiYXJNZW51QWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVRvcGJhckl0ZW0gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWVudUNsaWNrID0gZmFsc2U7XG4gICAgICAgIHRoaXMubWVudUJ1dHRvbkNsaWNrID0gZmFsc2U7XG4gICAgICAgIHRoaXMudG9wYmFyTWVudUNsaWNrID0gZmFsc2U7XG4gICAgICAgIHRoaXMudG9wYmFyTWVudUJ1dHRvbkNsaWNrID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlci5zaG93UHJvZmlsZUV2ZW50cy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51c2VyUHJvZmlsZURpYWxvZy5zaG93KHRoaXMuQ29udGV4dFVzZXIpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnRvcGJhck1lbnVFdmVudHMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudG9wYmFyTWVudUNsaWNrID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnRvcGJhclJvb3RJdGVtRXZlbnRzLnN1YnNjcmliZSgoaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVUb3BiYXJJdGVtID09PSBpdGVtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVUb3BiYXJJdGVtID0gbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVUb3BiYXJJdGVtID0gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLm1lbnVFdmVudHMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVudUJ1dHRvbkNsaWNrID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTW9iaWxlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vYmlsZU1lbnVBY3RpdmUgPSAhdGhpcy5tb2JpbGVNZW51QWN0aXZlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIudG9wYmFyTW9iaWxlTWVudUV2ZW50cy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50b3BiYXJNZW51QnV0dG9uQ2xpY2sgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy50b3BiYXJNZW51QWN0aXZlID0gIXRoaXMudG9wYmFyTWVudUFjdGl2ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnNpZGViYXJFdmVudHMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVudUNsaWNrID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnRvZ2dsZU1lbnVFdmVudHMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0U3RhdGljID0gIXRoaXMubGF5b3V0U3RhdGljO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGlzTW9iaWxlKCkge1xuICAgICAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggPCA2NDA7XG4gICAgfVxuXG59XG4iXX0=

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
        this.menuEventReceiver = new Rx_1.Subject();
        this.topbarMenuEventReceiver = new Rx_1.Subject();
        this.topbarMobileMenuEventReceiver = new Rx_1.Subject();
        this.topbarRootItemEventReceiver = new Rx_1.Subject();
        this.sidebarEventReceiver = new Rx_1.Subject();
        this.toggleMenuEventReceiver = new Rx_1.Subject();
        this.switchViewModeEventReceiver = new Rx_1.Subject();
        this.showProfileEvents = this.showProfileEventReceiver.asObservable();
        this.changePasswordEvents = this.changePasswordEventReceiver.asObservable();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2hvbWUtbWFuYWdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUEsc0NBQTJDO0FBQzNDLGlDQUErQjtBQUMvQiw4QkFBOEM7QUFHOUM7SUFEQTtRQUVZLDZCQUF3QixHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQ3ZELGdDQUEyQixHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQzFELHNCQUFpQixHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQ2hELDRCQUF1QixHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQ3RELGtDQUE2QixHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQzVELGdDQUEyQixHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQzFELHlCQUFvQixHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQ25ELDRCQUF1QixHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQ3RELGdDQUEyQixHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBRWxFLHNCQUFpQixHQUFvQixJQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbEYseUJBQW9CLEdBQW9CLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4RixxQkFBZ0IsR0FBb0IsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2hGLDJCQUFzQixHQUFvQixJQUFJLENBQUMsNkJBQTZCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDNUYsZUFBVSxHQUFvQixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEUseUJBQW9CLEdBQW9CLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4RixrQkFBYSxHQUFvQixJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDMUUscUJBQWdCLEdBQW9CLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNoRix5QkFBb0IsR0FBb0IsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBd0M1RixDQUFDO0lBckNHLHNDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELHlDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVELDBDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELGdEQUFxQixHQUFyQjtRQUNJLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQsb0NBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsOENBQW1CLEdBQW5CLFVBQW9CLE9BQU87UUFDdkIsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsdUNBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsMENBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsd0NBQWEsR0FBYixVQUFjLE9BQWU7UUFDekIsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBeERRLGdCQUFnQjtRQUQ1QixpQkFBVSxFQUFFO09BQ0EsZ0JBQWdCLENBMkQ1QjtJQUFELHVCQUFDO0NBM0RELEFBMkRDLElBQUE7QUEzRFksNENBQWdCIiwiZmlsZSI6ImFwcC9ob21lL2hvbWUtbWFuYWdlci5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhvbWVFdmVudE1hbmFnZXIge1xuICAgIHByaXZhdGUgc2hvd1Byb2ZpbGVFdmVudFJlY2VpdmVyOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuICAgIHByaXZhdGUgY2hhbmdlUGFzc3dvcmRFdmVudFJlY2VpdmVyOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuICAgIHByaXZhdGUgbWVudUV2ZW50UmVjZWl2ZXI6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgcHJpdmF0ZSB0b3BiYXJNZW51RXZlbnRSZWNlaXZlcjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcbiAgICBwcml2YXRlIHRvcGJhck1vYmlsZU1lbnVFdmVudFJlY2VpdmVyOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuICAgIHByaXZhdGUgdG9wYmFyUm9vdEl0ZW1FdmVudFJlY2VpdmVyOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuICAgIHByaXZhdGUgc2lkZWJhckV2ZW50UmVjZWl2ZXI6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgcHJpdmF0ZSB0b2dnbGVNZW51RXZlbnRSZWNlaXZlcjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcbiAgICBwcml2YXRlIHN3aXRjaFZpZXdNb2RlRXZlbnRSZWNlaXZlcjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblxuICAgIHNob3dQcm9maWxlRXZlbnRzOk9ic2VydmFibGU8YW55PiA9ICB0aGlzLnNob3dQcm9maWxlRXZlbnRSZWNlaXZlci5hc09ic2VydmFibGUoKTtcbiAgICBjaGFuZ2VQYXNzd29yZEV2ZW50czpPYnNlcnZhYmxlPGFueT4gPSAgdGhpcy5jaGFuZ2VQYXNzd29yZEV2ZW50UmVjZWl2ZXIuYXNPYnNlcnZhYmxlKCk7XG4gICAgdG9wYmFyTWVudUV2ZW50czpPYnNlcnZhYmxlPGFueT4gPSAgdGhpcy50b3BiYXJNZW51RXZlbnRSZWNlaXZlci5hc09ic2VydmFibGUoKTtcbiAgICB0b3BiYXJNb2JpbGVNZW51RXZlbnRzOk9ic2VydmFibGU8YW55PiA9ICB0aGlzLnRvcGJhck1vYmlsZU1lbnVFdmVudFJlY2VpdmVyLmFzT2JzZXJ2YWJsZSgpO1xuICAgIG1lbnVFdmVudHM6T2JzZXJ2YWJsZTxhbnk+ID0gIHRoaXMubWVudUV2ZW50UmVjZWl2ZXIuYXNPYnNlcnZhYmxlKCk7XG4gICAgdG9wYmFyUm9vdEl0ZW1FdmVudHM6T2JzZXJ2YWJsZTxhbnk+ID0gIHRoaXMudG9wYmFyUm9vdEl0ZW1FdmVudFJlY2VpdmVyLmFzT2JzZXJ2YWJsZSgpO1xuICAgIHNpZGViYXJFdmVudHM6T2JzZXJ2YWJsZTxhbnk+ID0gIHRoaXMuc2lkZWJhckV2ZW50UmVjZWl2ZXIuYXNPYnNlcnZhYmxlKCk7XG4gICAgdG9nZ2xlTWVudUV2ZW50czpPYnNlcnZhYmxlPGFueT4gPSAgdGhpcy50b2dnbGVNZW51RXZlbnRSZWNlaXZlci5hc09ic2VydmFibGUoKTtcbiAgICBzd2l0Y2hWaWV3TW9kZUV2ZW50czpPYnNlcnZhYmxlPGFueT4gPSAgdGhpcy5zd2l0Y2hWaWV3TW9kZUV2ZW50UmVjZWl2ZXIuYXNPYnNlcnZhYmxlKCk7XG5cblxuICAgIHNob3dQcm9maWxlKCkge1xuICAgICAgICB0aGlzLnNob3dQcm9maWxlRXZlbnRSZWNlaXZlci5uZXh0KCk7XG4gICAgfVxuXG4gICAgY2hhbmdlUGFzc3dvcmQoKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlUGFzc3dvcmRFdmVudFJlY2VpdmVyLm5leHQoKTtcbiAgICB9XG5cbiAgICB0b3BiYXJNZW51Q2xpY2soKSB7XG4gICAgICAgIHRoaXMudG9wYmFyTWVudUV2ZW50UmVjZWl2ZXIubmV4dCgpO1xuICAgIH1cblxuICAgIHRvcGJhck1vYmlsZU1lbnVDbGljaygpIHtcbiAgICAgICAgdGhpcy50b3BiYXJNb2JpbGVNZW51RXZlbnRSZWNlaXZlci5uZXh0KCk7XG4gICAgfVxuXG4gICAgbWVudUNsaWNrKCkge1xuICAgICAgICB0aGlzLm1lbnVFdmVudFJlY2VpdmVyLm5leHQoKTtcbiAgICB9XG5cbiAgICB0b3BiYXJSb290SXRlbUNsaWNrKHByb2ZpbGUpIHtcbiAgICAgICAgdGhpcy50b3BiYXJSb290SXRlbUV2ZW50UmVjZWl2ZXIubmV4dChwcm9maWxlKTtcbiAgICB9XG5cbiAgICBzaWRlYmFyQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuc2lkZWJhckV2ZW50UmVjZWl2ZXIubmV4dCgpO1xuICAgIH1cblxuICAgIHRvZ2dsZU1lbnVDbGljaygpIHtcbiAgICAgICAgdGhpcy50b2dnbGVNZW51RXZlbnRSZWNlaXZlci5uZXh0KCk7XG4gICAgfVxuXG4gICAgc3dpdGhWaWV3TW9kZShpc0FkbWluOmJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5zd2l0Y2hWaWV3TW9kZUV2ZW50UmVjZWl2ZXIubmV4dChpc0FkbWluKTtcbiAgICB9XG5cblxufVxuIl19

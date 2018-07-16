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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXBwLWV2ZW50LW1hbmFnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyw4QkFBOEM7QUFDOUMsc0NBQW9DO0FBVXBDO0lBZUk7UUFiUSx3QkFBbUIsR0FBaUIsSUFBSSxZQUFPLEVBQUUsQ0FBQztRQUNsRCx5QkFBb0IsR0FBaUIsSUFBSSxZQUFPLEVBQUUsQ0FBQztRQUNuRCxvQkFBZSxHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQzlDLHFCQUFnQixHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQy9DLDJCQUFzQixHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQ3JELGlDQUE0QixHQUFnQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQ2xFLGdCQUFXLEdBQW9CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2RSxpQkFBWSxHQUFvQixJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekUsWUFBTyxHQUFvQixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQy9ELGFBQVEsR0FBb0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2pFLG1CQUFjLEdBQW9CLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM3RSx5QkFBb0IsR0FBb0IsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFlBQVksRUFBRSxDQUFDO0lBR3pGLENBQUM7SUFFRCw4Q0FBb0IsR0FBcEI7UUFDSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELCtDQUFxQixHQUFyQjtRQUNJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsbUNBQVMsR0FBVCxVQUFVLElBQVM7UUFDZixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsb0NBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsc0NBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsc0NBQVksR0FBWjtRQUNJLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBeENRLGVBQWU7UUFEM0IsaUJBQVUsRUFBRTs7T0FDQSxlQUFlLENBMEMzQjtJQUFELHNCQUFDO0NBMUNELEFBMENDLElBQUE7QUExQ1ksMENBQWUiLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy9hcHAtZXZlbnQtbWFuYWdlci5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tZXJnZU1hcCc7XG5pbXBvcnQgeyBDcmVkZW50aWFsIH0gZnJvbSAnLi4vbW9kZWxzL2NyZWRlbnRpYWwubW9kZWwnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4uL21vZGVscy9jbG91ZC90b2tlbi5tb2RlbCc7XG5pbXBvcnQgeyBNYXBVdGlscyB9IGZyb20gJy4uL2hlbHBlcnMvbWFwLnV0aWxzJztcbmltcG9ydCB7IFNldHRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3NldHRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFwcEV2ZW50TWFuYWdlciB7XG5cbiAgICBwcml2YXRlIG9uU3RhcnRIVFRQUmVjZWl2ZXI6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgcHJpdmF0ZSBvbkZpbmlzaEhUVFBSZWNlaXZlcjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcbiAgICBwcml2YXRlIG9uTG9naW5SZWNlaXZlcjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcbiAgICBwcml2YXRlIG9uTG9nb3V0UmVjZWl2ZXI6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgcHJpdmF0ZSBvblRva2VuRXhwaXJlZFJlY2VpdmVyOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuICAgIHByaXZhdGUgb25VbmF1dGhvcml6ZWRBY2Nlc3NSZWNlaXZlcjpTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuICAgIG9uU3RhcnRIVFRQOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLm9uU3RhcnRIVFRQUmVjZWl2ZXIuYXNPYnNlcnZhYmxlKCk7XG4gICAgb25GaW5pc2hIVFRQOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLm9uRmluaXNoSFRUUFJlY2VpdmVyLmFzT2JzZXJ2YWJsZSgpO1xuICAgIG9uTG9naW46IE9ic2VydmFibGU8YW55PiA9IHRoaXMub25Mb2dpblJlY2VpdmVyLmFzT2JzZXJ2YWJsZSgpO1xuICAgIG9uTG9nb3V0OiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLm9uTG9nb3V0UmVjZWl2ZXIuYXNPYnNlcnZhYmxlKCk7XG4gICAgb25Ub2tlbkV4cGlyZWQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMub25Ub2tlbkV4cGlyZWRSZWNlaXZlci5hc09ic2VydmFibGUoKTtcbiAgICBvblVuYXV0aG9yaXplZEFjY2VzczogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5vblVuYXV0aG9yaXplZEFjY2Vzc1JlY2VpdmVyLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgc3RhcnRIdHRwVHJhbnNhY3Rpb24oKSB7XG4gICAgICAgIHRoaXMub25TdGFydEhUVFBSZWNlaXZlci5uZXh0KCk7XG4gICAgfVxuXG4gICAgZmluaXNoSHR0cFRyYW5zYWN0aW9uKCkge1xuICAgICAgICB0aGlzLm9uRmluaXNoSFRUUFJlY2VpdmVyLm5leHQoKTtcbiAgICB9XG5cbiAgICB1c2VyTG9naW4odXNlcjpVc2VyKSB7XG4gICAgICAgIHRoaXMub25Mb2dpblJlY2VpdmVyLm5leHQodXNlcik7XG4gICAgfVxuXG4gICAgdXNlckxvZ291dCgpIHtcbiAgICAgICAgdGhpcy5vbkxvZ291dFJlY2VpdmVyLm5leHQoKTtcbiAgICB9XG5cbiAgICB0b2tlbkV4cGlyZWQoKSB7XG4gICAgICAgIHRoaXMub25Ub2tlbkV4cGlyZWRSZWNlaXZlci5uZXh0KCk7XG4gICAgfVxuXG4gICAgYWNjZXNzRGVuaWVkKCkge1xuICAgICAgICB0aGlzLm9uVW5hdXRob3JpemVkQWNjZXNzUmVjZWl2ZXIubmV4dCgpO1xuICAgIH1cblxufVxuIl19

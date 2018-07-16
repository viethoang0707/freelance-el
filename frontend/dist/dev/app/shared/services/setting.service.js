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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvc2V0dGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBRzNDLCtDQUE2QztBQUM3QyxpQ0FBK0I7QUFDL0IsOEJBQXdEO0FBQ3hELGlEQUFtRDtBQUduRDtJQUlFLHdCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUdwQywwQkFBcUIsR0FBb0IsSUFBSSxZQUFPLEVBQUUsQ0FBQztRQUMvRCxtQkFBYyxHQUF1QixJQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFIL0UsQ0FBQztJQU1ELHNCQUFJLG9DQUFRO2FBQVo7WUFDRSxJQUFJLElBQUksQ0FBQyxRQUFRO2dCQUNmLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUN2QixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVztnQkFDOUIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ2hFLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQzthQUVELFVBQWEsSUFBWTtZQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLENBQUM7OztPQUxBO0lBT0Qsc0JBQUksZ0NBQUk7YUFJUjtZQUNFLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7Z0JBQ2xDLE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7Z0JBRXhDLE9BQU8sd0JBQVksQ0FBQztRQUN4QixDQUFDO2FBVEQsVUFBUyxJQUFZO1lBQ25CLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUM7OztPQUFBO0lBMUJVLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0FLc0IsMEJBQVc7T0FKakMsY0FBYyxDQW1DMUI7SUFBRCxxQkFBQztDQW5DRCxBQW1DQyxJQUFBO0FBbkNZLHdDQUFjIiwiZmlsZSI6ImFwcC9zaGFyZWQvc2VydmljZXMvc2V0dGluZy5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UsIFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi8uLi9lbnYuY29uZmlnJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IERFRkFVTFRfTEFORyB9IGZyb20gJy4uL21vZGVscy9jb25zdGFudHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2V0dGluZ1NlcnZpY2Uge1xuXG4gIHByaXZhdGUgdmlld01vZGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xuICB9XG5cbiAgcHJpdmF0ZSB2aWV3TW9kZUV2ZW50UmVjZWl2ZXI6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0KCk7XG4gIHZpZXdNb2RlRXZlbnRzOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLnZpZXdNb2RlRXZlbnRSZWNlaXZlci5hc09ic2VydmFibGUoKTtcblxuXG4gIGdldCBWaWV3TW9kZSgpIHtcbiAgICBpZiAodGhpcy52aWV3TW9kZSlcbiAgICAgIHJldHVybiB0aGlzLnZpZXdNb2RlO1xuICAgIGlmICh0aGlzLmF1dGhTZXJ2aWNlLlVzZXJQcm9maWxlKVxuICAgICAgcmV0dXJuIHRoaXMuYXV0aFNlcnZpY2UuVXNlclByb2ZpbGUuSXNBZG1pbiA/ICdhZG1pbicgOiAnbG1zJztcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHNldCBWaWV3TW9kZShkYXRhOiBzdHJpbmcpIHtcbiAgICB0aGlzLnZpZXdNb2RlID0gZGF0YTtcbiAgICB0aGlzLnZpZXdNb2RlRXZlbnRSZWNlaXZlci5uZXh0KGRhdGEpO1xuICB9XG5cbiAgc2V0IExhbmcobGFuZzogc3RyaW5nKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xhbmd1YWdlJywgbGFuZyk7XG4gIH1cblxuICBnZXQgTGFuZygpOiBzdHJpbmcge1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFuZ3VhZ2UnKSlcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFuZ3VhZ2UnKTtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gREVGQVVMVF9MQU5HO1xuICB9XG5cbn0iXX0=

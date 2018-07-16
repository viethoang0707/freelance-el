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
var http_1 = require("@angular/http");
var env_config_1 = require("../../../env.config");
require("rxjs/add/operator/map");
var Rx_1 = require("rxjs/Rx");
var app_event_manager_service_1 = require("../app-event-manager.service");
var AccountAPIService = (function () {
    function AccountAPIService(http, appEvent) {
        this.http = http;
        this.appEvent = appEvent;
    }
    AccountAPIService.prototype.login = function (username, password, cloud_code) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var endpoint = env_config_1.Config.CLOUD_ENDPOINT + '/account/login';
        var params = { username: username, password: password, cloud_code: cloud_code };
        this.appEvent.startHttpTransaction();
        return this.http.post(endpoint, JSON.stringify(params), options)
            .map(function (response) { return response.json(); }).do(function () {
            _this.appEvent.finishHttpTransaction();
        })
            .catch(function (e) {
            console.log(e);
            return Rx_1.Observable.throw(e.json());
        });
    };
    AccountAPIService.prototype.resetPasswordRequest = function (email, cloud_code) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var endpoint = env_config_1.Config.CLOUD_ENDPOINT + '/account/resetpass/request';
        var params = { email: email, cloud_code: cloud_code };
        this.appEvent.startHttpTransaction();
        return this.http.post(endpoint, JSON.stringify(params), options)
            .map(function (response) { return response.json(); }).do(function () {
            _this.appEvent.finishHttpTransaction();
        })
            .catch(function (e) {
            console.log(e);
            return Rx_1.Observable.throw(e.json());
        });
    };
    AccountAPIService.prototype.resetPasswordExecute = function (token, new_pass, cloud_code) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var endpoint = env_config_1.Config.CLOUD_ENDPOINT + '/account/resetpass/execute';
        var params = { new_pass: new_pass, token: token, cloud_code: cloud_code };
        this.appEvent.startHttpTransaction();
        return this.http.post(endpoint, JSON.stringify(params), options)
            .map(function (response) { return response.json(); }).do(function () {
            _this.appEvent.finishHttpTransaction();
        })
            .catch(function (e) {
            console.log(e);
            return Rx_1.Observable.throw(e.json());
        });
    };
    AccountAPIService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, app_event_manager_service_1.AppEventManager])
    ], AccountAPIService);
    return AccountAPIService;
}());
exports.AccountAPIService = AccountAPIService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXBpL2FjY291bnQtYXBpLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXdFO0FBQ3hFLGtEQUE2QztBQUM3QyxpQ0FBK0I7QUFDL0IsOEJBQThDO0FBQzlDLDBFQUErRDtBQUcvRDtJQUNJLDJCQUFvQixJQUFVLEVBQVUsUUFBeUI7UUFBN0MsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQWlCO0lBQUksQ0FBQztJQUV0RSxpQ0FBSyxHQUFMLFVBQU0sUUFBZSxFQUFFLFFBQWdCLEVBQUUsVUFBaUI7UUFBMUQsaUJBY0M7UUFiRyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sQ0FBQyxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUM7UUFDbEUsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDdkQsSUFBSSxRQUFRLEdBQUcsbUJBQU0sQ0FBQyxjQUFjLEdBQUcsZ0JBQWdCLENBQUM7UUFDeEQsSUFBSSxNQUFNLEdBQUcsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBQyxDQUFBO1FBQzdFLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQzthQUMzRCxHQUFHLENBQUMsVUFBQyxRQUFrQixJQUFLLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM3QyxLQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixFQUFFLENBQUM7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SUFBRCx3QkFBQztDQW5ERCxBQW1EQyxJQUFBO0FBbkRZLDhDQUFpQiIsImZpbGUiOiJhcHAvc2hhcmVkL3NlcnZpY2VzL2FwaS9hY2NvdW50LWFwaS5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UsIFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi8uLi8uLi9lbnYuY29uZmlnJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IEFwcEV2ZW50TWFuYWdlciB9IGZyb20gJy4uL2FwcC1ldmVudC1tYW5hZ2VyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWNjb3VudEFQSVNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCwgcHJpdmF0ZSBhcHBFdmVudDogQXBwRXZlbnRNYW5hZ2VyKSB7IH1cblxuICAgIGxvZ2luKHVzZXJuYW1lOnN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgY2xvdWRfY29kZTpzdHJpbmcpOk9ic2VydmFibGU8YW55PntcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgdmFyIGVuZHBvaW50ID0gQ29uZmlnLkNMT1VEX0VORFBPSU5UICsgJy9hY2NvdW50L2xvZ2luJztcbiAgICAgICAgdmFyIHBhcmFtcyA9IHt1c2VybmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZCwgY2xvdWRfY29kZTogY2xvdWRfY29kZX0gXG4gICAgICAgIHRoaXMuYXBwRXZlbnQuc3RhcnRIdHRwVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGVuZHBvaW50LCBKU09OLnN0cmluZ2lmeShwYXJhbXMpLCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpLmRvKCgpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwRXZlbnQuZmluaXNoSHR0cFRyYW5zYWN0aW9uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGUuanNvbigpKTtcbiAgICAgICAgICAgIH0gKTtcbiAgICB9XG5cbiAgICByZXNldFBhc3N3b3JkUmVxdWVzdChlbWFpbDpzdHJpbmcsIGNsb3VkX2NvZGU6c3RyaW5nKTpPYnNlcnZhYmxlPGFueT57XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIHZhciBlbmRwb2ludCA9IENvbmZpZy5DTE9VRF9FTkRQT0lOVCArICcvYWNjb3VudC9yZXNldHBhc3MvcmVxdWVzdCc7XG4gICAgICAgIHZhciBwYXJhbXMgPSB7ZW1haWw6IGVtYWlsLCAgY2xvdWRfY29kZTogY2xvdWRfY29kZX0gXG4gICAgICAgIHRoaXMuYXBwRXZlbnQuc3RhcnRIdHRwVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGVuZHBvaW50LCBKU09OLnN0cmluZ2lmeShwYXJhbXMpLCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpLmRvKCgpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwRXZlbnQuZmluaXNoSHR0cFRyYW5zYWN0aW9uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGUuanNvbigpKTtcbiAgICAgICAgICAgIH0gKTtcbiAgICB9XG5cbiAgICByZXNldFBhc3N3b3JkRXhlY3V0ZSh0b2tlbjpzdHJpbmcsIG5ld19wYXNzOnN0cmluZywgY2xvdWRfY29kZTpzdHJpbmcpOk9ic2VydmFibGU8YW55PntcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgdmFyIGVuZHBvaW50ID0gQ29uZmlnLkNMT1VEX0VORFBPSU5UICsgJy9hY2NvdW50L3Jlc2V0cGFzcy9leGVjdXRlJztcbiAgICAgICAgdmFyIHBhcmFtcyA9IHtuZXdfcGFzczogbmV3X3Bhc3MsIHRva2VuOiB0b2tlbiwgIGNsb3VkX2NvZGU6IGNsb3VkX2NvZGV9IFxuICAgICAgICB0aGlzLmFwcEV2ZW50LnN0YXJ0SHR0cFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChlbmRwb2ludCwgSlNPTi5zdHJpbmdpZnkocGFyYW1zKSwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKS5kbygoKT0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcEV2ZW50LmZpbmlzaEh0dHBUcmFuc2FjdGlvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCggKGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlLmpzb24oKSk7XG4gICAgICAgICAgICB9ICk7XG4gICAgfVxuXG59Il19

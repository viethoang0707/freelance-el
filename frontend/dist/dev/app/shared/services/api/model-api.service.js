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
var ModelAPIService = (function () {
    function ModelAPIService(http, appEvent) {
        this.http = http;
        this.appEvent = appEvent;
    }
    ModelAPIService.prototype.execute = function (api, token) {
        var _this = this;
        if (!token || !token.IsValid) {
            this.appEvent.tokenExpired();
            return Rx_1.Observable.throw('Token expired');
        }
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var params = api.params;
        console.log(params);
        params["token"] = token.code;
        var endpoint = env_config_1.Config.CLOUD_ENDPOINT + api.Method;
        this.appEvent.startHttpTransaction();
        return this.http.post(endpoint, JSON.stringify(params), options)
            .map(function (response) { return response.json(); }).do(function () {
            _this.appEvent.finishHttpTransaction();
        })
            .catch(function (e) {
            console.log(e);
            if (e["status"] == 401)
                _this.appEvent.accessDenied();
            return Rx_1.Observable.throw(e.json());
        });
    };
    ModelAPIService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, app_event_manager_service_1.AppEventManager])
    ], ModelAPIService);
    return ModelAPIService;
}());
exports.ModelAPIService = ModelAPIService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RTtBQUN4RSxrREFBNkM7QUFDN0MsaUNBQStCO0FBQy9CLDhCQUE4QztBQUU5QywwRUFBK0Q7QUFJL0Q7SUFDSSx5QkFBb0IsSUFBVSxFQUFVLFFBQXlCO1FBQTdDLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFpQjtJQUFJLENBQUM7SUFFdEUsaUNBQU8sR0FBUCxVQUFRLEdBQVksRUFBQyxLQUFXO1FBQWhDLGlCQXNCQztRQXJCRyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzdCLE9BQU8sZUFBVSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtTQUMzQztRQUNELElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQztRQUNsRSxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN2RCxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDN0IsSUFBSSxRQUFRLEdBQUcsbUJBQU0sQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDckMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLENBQUM7YUFDM0QsR0FBRyxDQUFDLFVBQUMsUUFBa0IsSUFBSyxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDN0MsS0FBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzFDLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBRSxVQUFDLENBQUM7WUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUUsR0FBRztnQkFDaEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNqQyxPQUFPLGVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFFLENBQUM7SUFDWixDQUFDO0lBekJRLGVBQWU7UUFEM0IsaUJBQVUsRUFBRTt5Q0FFaUIsV0FBSSxFQUFvQiwyQ0FBZTtPQUR4RCxlQUFlLENBNEIzQjtJQUFELHNCQUFDO0NBNUJELEFBNEJDLElBQUE7QUE1QlksMENBQWUiLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSwgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2Vudi5jb25maWcnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgQmFzZUFQSSB9IGZyb20gJy4uL2FwaS9iYXNlLmFwaSc7XG5pbXBvcnQgeyBBcHBFdmVudE1hbmFnZXIgfSBmcm9tICcuLi9hcHAtZXZlbnQtbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Nsb3VkL3Rva2VuLm1vZGVsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vZGVsQVBJU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIGFwcEV2ZW50OiBBcHBFdmVudE1hbmFnZXIpIHsgfVxuXG4gICAgZXhlY3V0ZShhcGk6IEJhc2VBUEksdG9rZW46VG9rZW4pOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmICghdG9rZW4gfHwgIXRva2VuLklzVmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwRXZlbnQudG9rZW5FeHBpcmVkKCk7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdygnVG9rZW4gZXhwaXJlZCcpXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgdmFyIHBhcmFtcyA9IGFwaS5wYXJhbXM7XG4gICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcyk7XG4gICAgICAgIHBhcmFtc1tcInRva2VuXCJdID0gdG9rZW4uY29kZTtcbiAgICAgICAgdmFyIGVuZHBvaW50ID0gQ29uZmlnLkNMT1VEX0VORFBPSU5UICsgYXBpLk1ldGhvZDtcbiAgICAgICAgdGhpcy5hcHBFdmVudC5zdGFydEh0dHBUcmFuc2FjdGlvbigpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoZW5kcG9pbnQsIEpTT04uc3RyaW5naWZ5KHBhcmFtcyksIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSkuZG8oKCk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBFdmVudC5maW5pc2hIdHRwVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgaWYgKGVbXCJzdGF0dXNcIl09PTQwMSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBFdmVudC5hY2Nlc3NEZW5pZWQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlLmpzb24oKSk7XG4gICAgICAgICAgICB9ICk7XG4gICAgfVxuXG5cbn1cbiJdfQ==

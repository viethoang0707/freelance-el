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

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
var FileAPIService = (function () {
    function FileAPIService(http, appEvent) {
        this.http = http;
        this.appEvent = appEvent;
    }
    FileAPIService.prototype.upload = function (file, cloudid) {
        var _this = this;
        var formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('cloudid', cloudid.toString());
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        this.appEvent.startHttpTransaction();
        return this.http.post(env_config_1.Config.CLOUD_ENDPOINT + '/file/upload', formData, options)
            .map(function (res) { return res.json(); })
            .do(function () {
            _this.appEvent.finishHttpTransaction();
        })
            .catch(function (error) {
            _this.appEvent.finishHttpTransaction();
            return Rx_1.Observable.throw(error.json());
        });
    };
    FileAPIService.prototype.unzip = function (filename, cloudid) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.appEvent.startHttpTransaction();
        return this.http.post(env_config_1.Config.CLOUD_ENDPOINT + '/file/unzip', JSON.stringify({ cloudid: cloudid, filename: filename }), options)
            .map(function (res) { return res.json(); })
            .do(function () {
            _this.appEvent.finishHttpTransaction();
        })
            .catch(function (error) {
            _this.appEvent.finishHttpTransaction();
            return Rx_1.Observable.throw(error);
        });
    };
    FileAPIService.prototype.convert2Pdf = function (filename, cloudid) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.appEvent.startHttpTransaction();
        return this.http.post(env_config_1.Config.CLOUD_ENDPOINT + '/file/convert2pdf', JSON.stringify({ cloudid: cloudid, filename: filename }), options)
            .map(function (res) { return res.json(); })
            .do(function () {
            _this.appEvent.finishHttpTransaction();
        })
            .catch(function (error) {
            _this.appEvent.finishHttpTransaction();
            return Rx_1.Observable.throw(error);
        });
    };
    FileAPIService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, app_event_manager_service_1.AppEventManager])
    ], FileAPIService);
    return FileAPIService;
}());
exports.FileAPIService = FileAPIService;

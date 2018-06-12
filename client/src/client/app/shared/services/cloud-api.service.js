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
var env_config_1 = require("../../env.config");
require("rxjs/add/operator/map");
var Rx_1 = require("rxjs/Rx");
var CloudAPIService = (function () {
    function CloudAPIService(http) {
        this.http = http;
    }
    CloudAPIService.prototype.cloudInfo = function (code) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(env_config_1.Config.CLOUD_ENDPOINT + '/cloud/account', JSON.stringify({ code: code }), options)
            .map(function (response) { return response.json(); });
    };
    CloudAPIService.prototype.upload = function (file, cloudid) {
        var formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('cloudid', cloudid.toString());
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(env_config_1.Config.CLOUD_ENDPOINT + '/cloud/file', formData, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error); });
    };
    CloudAPIService.prototype.unzip = function (filename, cloudid) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(env_config_1.Config.CLOUD_ENDPOINT + '/cloud/unzip', JSON.stringify({ cloudid: cloudid, filename: filename }), options)
            .map(function (response) { return response.json(); });
    };
    CloudAPIService.prototype.convert2Pdf = function (filename, cloudid) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(env_config_1.Config.CLOUD_ENDPOINT + '/cloud/convert2pdf', JSON.stringify({ cloudid: cloudid, filename: filename }), options)
            .map(function (response) { return response.json(); });
    };
    CloudAPIService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], CloudAPIService);
    return CloudAPIService;
}());
exports.CloudAPIService = CloudAPIService;
//# sourceMappingURL=cloud-api.service.js.map
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
require("rxjs/add/operator/map");
var model_api_service_1 = require("./api/model-api.service");
var execute_api_1 = require("../services/api/execute.api");
var NotificationService = (function () {
    function NotificationService(apiService) {
        this.apiService = apiService;
    }
    NotificationService.prototype.broadcast = function (context, subject, body, recipients) {
        var params = { subject: subject, body: body, recipients: recipients };
        var executeApi = new execute_api_1.ExecuteAPI('etraining.notification_service', 'broadcastMail', params, null);
        return this.apiService.execute(executeApi, context.authService.LoginToken);
    };
    NotificationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [model_api_service_1.ModelAPIService])
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;

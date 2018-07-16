"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var env_config_1 = require("../../env.config");
var io = require("socket.io-client");
core_1.Injectable();
var WebSocketService = (function () {
    function WebSocketService() {
        var _this = this;
        this.onNotifyReceiver = new Subject_1.Subject();
        this.onNotify = this.onNotifyReceiver.asObservable();
        this.socket = io(env_config_1.Config.SOCKET_ENDPOINT + '/notification');
        this.socket.on('notify', function (data) {
            console.log('notify', data);
            _this.onNotifyReceiver.next(data);
        });
    }
    WebSocketService.prototype.sendMessage = function (event, message) {
        this.socket.emit(event, JSON.stringify({ data: message }));
    };
    WebSocketService.prototype.close = function () {
        this.leave();
        this.socket.disconnect();
    };
    WebSocketService.prototype.join = function (user, cloudid) {
        var message = {
            user: user,
            cloudid: cloudid
        };
        this.sendMessage('join', message);
    };
    WebSocketService.prototype.leave = function () {
        this.sendMessage('leave', {});
    };
    WebSocketService.prototype.notify = function (title, user, cloudid) {
        var message = {
            title: title,
            user: user,
            cloudid: cloudid
        };
        this.sendMessage('notify', message);
    };
    return WebSocketService;
}());
exports.WebSocketService = WebSocketService;

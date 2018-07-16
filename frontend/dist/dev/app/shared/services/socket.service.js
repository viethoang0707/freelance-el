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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvc29ja2V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msd0NBQXVDO0FBSXZDLCtDQUEwQztBQUMxQyxxQ0FBdUM7QUFFdkMsaUJBQVUsRUFBRSxDQUFBO0FBQ1o7SUFPQztRQUFBLGlCQVFDO1FBWk8scUJBQWdCLEdBQWlCLElBQUksaUJBQU8sRUFBRSxDQUFDO1FBQ3ZELGFBQVEsR0FBb0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBSWhFLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLG1CQUFNLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFDLElBQUk7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUVKLENBQUM7SUFFRCxzQ0FBVyxHQUFYLFVBQVksS0FBSyxFQUFFLE9BQU87UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxnQ0FBSyxHQUFMO1FBQ0MsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsK0JBQUksR0FBSixVQUFLLElBQVksRUFBRSxPQUFlO1FBQ2pDLElBQUksT0FBTyxHQUFHO1lBQ2IsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsT0FBTztTQUNoQixDQUFBO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELGdDQUFLLEdBQUw7UUFDQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsaUNBQU0sR0FBTixVQUFPLEtBQWEsRUFBRSxJQUFZLEVBQUUsT0FBZTtRQUNsRCxJQUFJLE9BQU8sR0FBRztZQUNiLEtBQUssRUFBRSxLQUFLO1lBQ1osSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsT0FBTztTQUNoQixDQUFBO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUlGLHVCQUFDO0FBQUQsQ0FqREEsQUFpREMsSUFBQTtBQWpEWSw0Q0FBZ0IiLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy9zb2NrZXQuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ3J4anMvT2JzZXJ2ZXInO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vLi4vZW52LmNvbmZpZyc7XG5pbXBvcnQgKiBhcyBpbyBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcblxuSW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2ViU29ja2V0U2VydmljZSB7XG5cblx0cHJpdmF0ZSBzb2NrZXQ7XG5cdHByaXZhdGUgb25Ob3RpZnlSZWNlaXZlcjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblx0b25Ob3RpZnk6IE9ic2VydmFibGU8YW55PiA9IHRoaXMub25Ob3RpZnlSZWNlaXZlci5hc09ic2VydmFibGUoKTtcblxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuc29ja2V0ID0gaW8oQ29uZmlnLlNPQ0tFVF9FTkRQT0lOVCArICcvbm90aWZpY2F0aW9uJyk7XG5cblx0XHR0aGlzLnNvY2tldC5vbignbm90aWZ5JywgKGRhdGEpID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKCdub3RpZnknLCBkYXRhKTtcblx0XHRcdHRoaXMub25Ob3RpZnlSZWNlaXZlci5uZXh0KGRhdGEpO1xuXHRcdH0pO1xuXG5cdH1cblxuXHRzZW5kTWVzc2FnZShldmVudCwgbWVzc2FnZSkge1xuXHRcdHRoaXMuc29ja2V0LmVtaXQoZXZlbnQsIEpTT04uc3RyaW5naWZ5KHsgZGF0YTogbWVzc2FnZSB9KSk7XG5cdH1cblxuXHRjbG9zZSgpIHtcblx0XHR0aGlzLmxlYXZlKCk7XG5cdFx0dGhpcy5zb2NrZXQuZGlzY29ubmVjdCgpO1xuXHR9XG5cblx0am9pbih1c2VyOiBudW1iZXIsIGNsb3VkaWQ6IG51bWJlcikge1xuXHRcdHZhciBtZXNzYWdlID0ge1xuXHRcdFx0dXNlcjogdXNlcixcblx0XHRcdGNsb3VkaWQ6IGNsb3VkaWRcblx0XHR9XG5cdFx0dGhpcy5zZW5kTWVzc2FnZSgnam9pbicsIG1lc3NhZ2UpO1xuXHR9XG5cblx0bGVhdmUoKSB7XG5cdFx0dGhpcy5zZW5kTWVzc2FnZSgnbGVhdmUnLCB7fSk7XG5cdH1cblxuXHRub3RpZnkodGl0bGU6IHN0cmluZywgdXNlcjogbnVtYmVyLCBjbG91ZGlkOiBudW1iZXIpIHtcblx0XHR2YXIgbWVzc2FnZSA9IHtcblx0XHRcdHRpdGxlOiB0aXRsZSxcblx0XHRcdHVzZXI6IHVzZXIsXG5cdFx0XHRjbG91ZGlkOiBjbG91ZGlkXG5cdFx0fVxuXHRcdHRoaXMuc2VuZE1lc3NhZ2UoJ25vdGlmeScsIG1lc3NhZ2UpO1xuXHR9XG5cblxuXG59Il19
